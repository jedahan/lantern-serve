LX.User = class User extends LV.EventEmitter {
    constructor (db) {
        super()
        this.db = db
        this.node = this.db.stor.user()
        this.pair = null
        this.feed = new LX.Feed(this)

        this.once('auth', () => {
            console.log(`${this.log_prefix} sign-in complete`)
            this.listPackages().then((packages) => {
                console.log(`${this.log_prefix} installed packages: ${packages.length}`)
                this.feed.addManyPackages(packages)
            })
        })
    }

    get log_prefix () {
        return `[u:${this.username || 'anonymous'}]`.padEnd(20, ' ')
    }

    // -------------------------------------------------------------------------

    /**
    * Authenticates the user with decentralized database
    */
    authenticate (username, password) {
        return new Promise((resolve, reject) => {
            const completeAuth = () => {
                SEA.pair().then((pair) => {
                    this.pair = pair
                    this.emit('auth', this.pair)
                    resolve(this.pair)
                })
            }

            this.node.auth(username, password, (ack) => {
                if (ack.err) {
                    console.warn(`${this.log_prefix} invalid auth`, ack.err)
                    reject('user_auth_failed')
                } else {
                    this.username = username
                    completeAuth()
                }
            })
        })
    }

    /**
    * Registers first-time user into the decentralized database
    */
    register (username, password) {
        return new Promise((resolve, reject) => {
            username = username || LV.ShortID.generate()
            password = password || LV.ShortID.generate()
            console.log(`${this.log_prefix} create user with username: ${username}`)
            this.node.create(username, password, (ack) => {
                if (ack.err) {
                    console.log(`${this.log_prefix} unable to save`, ack.err)
                    return reject('user_register_failed')
                }
                console.log(`${this.log_prefix} saved to browser`)
                let creds = localStorage.setItem('lx-auth', [username, password].join(':'))
                this.authenticate(username, password)
                this.emit('registered')
                resolve()
            })
        })
    }

    authOrRegister (skip_check) {
        if (skip_check) {
            console.log(`${this.log_prefix} make new credentials by explicit request`)
            return this.register()
        } else {
            // check browser for known credentials for this user
            let creds = localStorage.getItem('lx-auth')
            if (!creds) {
                return this.register()
            } else {
                try {
                    let u = creds.split(':')[0]
                    let p = creds.split(':')[1]
                    return this.authenticate(u, p)
                        .catch(err => {
                            // this database may not know about our user yet, so create it...
                            // we assume local storage is a better indicator of truth than database peer
                            return this.register(u, p)
                        })
                } catch (e) {
                    this.clearCredentials()
                    return this.register()
                }
            }
        }
    }

    clearCredentials () {
        console.warn(`${this.log_prefix}  removing invalid creds from storage`)
        localStorage.removeItem('lx-auth')
        console.warn(`${this.log_prefix}  waiting for valid sign in or registration...`)
    }

    // -------------------------------------------------------------------------

    /**
    * List packages which are installed for this user
    */
    listPackages () {
        return new Promise((resolve, reject) => {
            let node = this.node.get('packages')
            node.once((v, k) => {
                let packages = []
                if (!v) {
                    return resolve(packages)
                }
                Object.keys(v).forEach((pkg) => {
                    if (pkg == '_' || pkg == '#' || v[pkg] == null) return
                    if (typeof (v[pkg]) !== 'string') {
                        console.warn(`${this.log_prefix} Nullifying non-string value for ${pkg} package:`, v[pkg])
                        node.get(pkg).put(null)
                    } else {
                        packages.push(pkg + '@' + v[pkg])
                    }
                })
                resolve(packages)
            })
        })
    }
    /**
    * Installs a package for a given user and thereby makes available to end-user device
    */
    install (pkg) {
        // allows either a package object or a string representation of pkg@version

        let pkg_id = pkg

        if (typeof (pkg) === 'object') {
            pkg_id = `${pkg.name}@${pkg.version}`
        }

        let pkg_name = pkg_id.split('@')[0]
        let pkg_version = pkg_id.split('@')[1]

        return new Promise((resolve, reject) => {
            this.node.get('packages')
                .get(pkg_name)
                .once((v, k) => {
                    if (v) {
                        console.log(`${this.log_prefix} already installed: ${pkg_id}`)
                        resolve(pkg_id)
                    } else {
                        console.log(`${this.log_prefix} new install: ${pkg_id}`)

                        // does not erase other key/value pairs here
                        this.node.get('packages')
                            .once((v, k) => {
                                if (!v) {
                                    console.log(`${this.log_prefix} initializing packages list for user`)
                                    this.node.get('packages').put({})
                                }
                            })
                            .get(pkg_name)
                            .put(pkg_version, (ack) => {
                                if (ack.err) {
                                    return reject('user_install_package_failed')
                                }
                                // id is name@version combined
                                console.log(`${this.log_prefix} install done: ${pkg_id}`)
                                this.emit('install', pkg_id)
                                this.feed.addOnePackage(pkg_id)
                                resolve(pkg_id)
                            })
                    }
                })
        })
    }

    /**
    * Removes a package for a given user and cleans up references to related data
    */
    uninstall (pkg) {
        return new Promise((resolve, reject) => {
            this.node.get('packages').get(pkg.name)
                .put(null)
                .once((v, k) => {
                    console.log(`${this.log_prefix} uninstalled package ${pkg.name}`)
                    this.node.get('packages').get(pkg.name).put(null)
                    this.feed.removeOnePackage(pkg.name)
                    this.emit('uninstall', pkg.name)
                    resolve()
                })
        })
    }

    // -------------------------------------------------------------------------
    encrypt (data) {
        return new Promise((resolve, reject) => {
            SEA.encrypt(data, this.pair, (enc) => {
                SEA.sign(enc, this.pair, (signed_data) => {
                    console.log(`${this.log_prefix} encrypted / signed data: ${signed_data}`)
                    resolve(signed_data)
                })
            })
        })
    }

    // -------------------------------------------------------------------------

    /**
    * List topics the user has subscribed to and wants to receive data for
    */
    listTopics () {
        this.node.get('topics').once((v, k) => {
            if (!v) return
            Object.keys(v).forEach((pkg) => {
                if (pkg == '_' || v[pkg] == null) return
                console.log(`${this.log_prefix} subscribed topics ${pkg}:`, v[pkg])
            })
        })
    }

    /**
    * Explicitly gather data on a given topic from available packages
    */
    subscribe (topic) {
        this.node.get('topics').get(topic).set(true).once(() => {
            console.log(`${this.log_prefix} subscribe to topic ${topic}`)
            this.emit('subscribe', name)
        })
    }

    /**
    * Remove and stop watching for data on a given topic
    */
    unsubscribe (topic) {
        this.node.get('topics').get(topic).set(false).once(() => {
            console.log(`${this.log_prefix} unsubscribe from topic ${topic}`)
            this.emit('subscribe', name)
        })
    }
}
