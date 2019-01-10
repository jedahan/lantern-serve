/* global LV, SEA */
'use strict'
const LX = window.LX || {}; if (!window.LX) window.LX = LX

LX.User = class User extends LV.EventEmitter {
  constructor (db) {
    super()
    this.local_db = new LV.PouchDB('lx-user')
    this.db = db
    this.node = this.db.stor.user()
    this.pair = null
    this.feed = new LX.Feed(this)

    this.once('auth', () => {
      this.listPackages().then((packages) => {
        this.feed.addManyPackages(packages)
      })
    })
  }

  get logPrefix () {
    return `[u:${this.username || 'anonymous'}]`.padEnd(20, ' ')
  }

  // -------------------------------------------------------------------------

  clearCredentials (creds) {
    console.warn(`${this.logPrefix}  removing invalid creds from storage`)
    return this.local_db.remove(creds).then(() => {
      console.warn(`${this.logPrefix}  waiting for valid sign in or registration...`)
    })
  }

  authOrRegister (skipCheck) {
    if (skipCheck) {
      console.log(`${this.logPrefix} make new credentials by explicit request`)
      this.register()
    } else {
      // check browser for known credentials for this user
      this.local_db.get('creds')
        .then((creds) => {
          let requirements = ['username', 'password']
          let isValid = true

          requirements.forEach((key) => {
            if (!creds.hasOwnProperty(key)) {
              isValid = false
              console.log(`${this.logPrefix} existing saved credentials missing required key: ${key}`)
            }
          })

          if (isValid) {
            this.authenticate(creds.username, creds.password)
              .catch(err => {
                this.clearCredentials(creds).then(this.register.bind(this))
              })
          } else {
            this.clearCredentials(creds).then(this.register.bind(this))
          }
        })
        .catch((e) => {
          if (e.name === 'not_found') {
            this.register()
          } else {
            console.log(`${this.logPrefix} error getting creds`, e)
          }
        })
    }
  }

  /**
    * Authenticates the user with decentralized database
    */
  authenticate (username, password) {
    return new Promise((resolve, reject) => {
      this.node.auth(username, password, (ack) => {
        if (ack.err) {
          console.warn(`${this.logPrefix} bad auth`, ack.err)
          reject(ack.err)
        } else {
          this.username = username
          console.log(`${this.logPrefix} good auth`)
          SEA.pair().then((pair) => {
            this.pair = pair
            this.emit('auth', this.pair)
            resolve(this.pair)
          })
        }
      })
    })
  }

  /**
    * Registers first-time user into the decentralized database
    */
  register () {
    return new Promise((resolve, reject) => {
      let username = LV.ShortID.generate()
      let password = LV.ShortID.generate()
      console.log(`${this.logPrefix} create user with username: ${username}`)
      this.node.create(username, password, (ack) => {
        if (ack.err) {
          console.log(`${this.logPrefix} unable to save`, ack.err)
          return reject(ack.err)
        }

        this.node.get('packages').put({})

        console.log(`${this.logPrefix} saved to browser`)

        let doc = {
          '_id': 'creds',
          'username': username,
          'password': password
        }
        this.local_db.put(doc)
          .then(() => {
            this.authenticate(username, password)
          })
          .catch((e) => {
            console.log(`${this.logPrefix}unable to save`, e)
          })

        this.emit('registered')
        resolve()
      })
    })
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
          if (pkg === '_' || pkg === '#' || v[pkg] == null) return
          if (typeof (v[pkg]) !== 'string') {
            console.warn(`${this.logPrefix} Nullifying non-string value for ${pkg} package:`, v[pkg])
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
    return new Promise((resolve, reject) => {
      this.node.get('packages')
        .get(pkg.name)
        .once((v, k) => {
          if (v) {
            console.log(`${this.logPrefix} already installed: ${pkg.id}`)
            resolve(pkg)
          } else {
            console.log(`${this.logPrefix} new install: ${pkg.id}`)

            // does not erase other key/value pairs here
            this.node.get('packages')
              .get(pkg.name)
              .put(pkg.version)
              .once((v, k) => {
                // id is name@version combined
                console.log(`${this.logPrefix} install done: ${pkg.id}`)
                this.emit('install', pkg.id)
                this.feed.addOnePackage(pkg.id)
                resolve(pkg)
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
          console.log(`${this.logPrefix} uninstalled package ${pkg.name}`)
          this.node.get('packages').get(pkg.name).put(null)
          this.feed.removeOnePackage(pkg.name)
          this.emit('uninstall', pkg.name)
          resolve()
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
        if (pkg === '_' || v[pkg] == null) return
        console.log(`${this.logPrefix} subscribed topics ${pkg}:`, v[pkg])
      })
    })
  }

  /**
    * Explicitly gather data on a given topic from available packages
    */
  subscribe (topic) {
    this.node.get('topics').get(topic).set(true).once(() => {
      console.log(`${this.logPrefix} subscribe to topic ${topic}`)
      this.emit('subscribe', name)
    })
  }

  /**
    * Remove and stop watching for data on a given topic
    */
  unsubscribe (topic) {
    this.node.get('topics').get(topic).set(false).once(() => {
      console.log(`${this.logPrefix} unsubscribe from topic ${topic}`)
      this.emit('subscribe', name)
    })
  }
}
