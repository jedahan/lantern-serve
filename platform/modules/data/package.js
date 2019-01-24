const EventEmitter = require('event-emitter-es6')

module.exports = class LXPackage extends EventEmitter {
    constructor (name, db) {
        super()

        if (!name) {
            console.error(`${this.logPrefix} please name your package to publish`)
            throw new Error('missing_name')
        }

        let version = '0.0.1' // default version

        if (name.indexOf('@') !== -1) {
            let parts = name.split('@')
            name = parts[0]
            version = parts[1]
        }

        this._data = {
            'name': name,
            'public': true, // only supporting public packages, for now
            'data': null,
            'version': version
        }
        this.db = db
        this.node = this.db.get('pkg').get(this._data.name)
    }

    // -------------------------------------------------------------------------
    get logPrefix () {
        return `[p:${this.name || 'new package'}@${this.version}]`.padEnd(20, ' ')
    }

    get name () {
        return this._data.name
    }

    set name (val) {
        this._data.name = val
    }

    get version () {
        return this._data.version
    }

    set version (val) {
        this._data.version = val
    }

    get id () {
        return this._data.name + '@' + this._data.version
    }

    // -------------------------------------------------------------------------
    /**
    * Ensures that package exists in database before we work with it
    */
    setup () {
        return new Promise((resolve, reject) => {
            this.node.once((v, k) => {
                if (v && v.hasOwnProperty('name') && v.hasOwnProperty('public') && v.hasOwnProperty('data') && v.hasOwnProperty('version')) {
                    resolve(this)
                } else {
                    console.log(`${this.logPrefix} creating package setup`, this._data)
                    // required null put to make sure we have a node to work with
                    this.node.put(null).put(this._data, (ack) => {
                        if (ack.err) {
                            return reject('package_setup_err')
                        } else {
                            console.log(`${this.logPrefix} package setup successfully`)
                            resolve()
                        }
                    })
                }
            })
        })
    }

    /**
    * Looks up node and makes sure the expected version exists
    */
    hasVersion (version) {
        return new Promise((resolve, reject) => {
            // make sure package node exists
            this.setup().then(() => {
                this.node.get('data').once((v, k) => {
                    if (v === null) {
                        this.node.get('data').put({})
                    }
                }).get(version).once((v, k) => {
                    resolve(!!v)
                })
            })
        })
    }

    // -------------------------------------------------------------------------
    /**
    * Publish a new data package to the network
    */
    publish (version, data) {
        return new Promise((resolve, reject) => {
            // publishing defaults
            version = version || this._data.version
            data = data || {}

            this.hasVersion(version)
                .then((exists) => {
                    // do not over-write pre-existing version
                    if (exists) {
                        console.log(`${this.logPrefix} already published: ${this.id}`)
                        resolve()
                    } else {
                        console.log(`${this.logPrefix} will publish: ${this.id}`)

                        // required null put to make sure we have a node to work with
                        this.node.get('data').get(version).put(null).put(data, (ack) => {
                            if (ack.err) {
                                return reject('packaged_publish_data_failed')
                            }
                            this.node.get('version').put(version, (ack) => {
                                if (ack.err) {
                                    return reject('package_publish_version_failed')
                                }
                                console.log(`${this.logPrefix} new published version: ${this.id}`)
                                resolve()
                                this.emit('publish')
                            })
                        })
                    }
                })
        })
    }

    /*
    * Unpublish removes a data package from the network
    */
    unpublish (version) {
        return new Promise((resolve, reject) => {
            if (!version) {
                console.error(`${this.logPrefix} please specify version to unpublish`)
                return reject('missing_version')
            }

            this.node.get('data').get(version || this.version)
                .put(null, (v, k) => {
                    this.emit('unpublish')
                    return resolve()
                })
        })
    }

    // -------------------------------------------------------------------------
    /**
    * Adds an item to the current version of this package
    */
    add (item) {
        return new Promise((resolve, reject) => {
            // accept string id or item object
            let id = item.id || item

            console.log(`${this.logPrefix} adding item: ${id}`, item)

            // attach item to the package graph
            let item_node = this.db.get('itm').get(id)
            this.node.get('data').get(this.version).set(item_node)
        })
    }

    remove (item) {
        return new Promise((resolve, reject) => {
            // accept string id or item object
            let id = item.id || item

            console.log(`${this.logPrefix} removing item: ${id}`, item)

            // attach item to the package graph
            let item_node = this.node.get('data').get(this.version).get(id)
            this.node.get('data').get(this.version).unset(item_node)
        })
    }

    // -------------------------------------------------------------------------
    /**
    * Gets a list of all items in the current version of this package
    */
    getItems () {
        return new Promise((resolve, reject) => {
            this.node.get('data').get(this.version).once((v, k) => {
                let item_list = []
                Object.keys(v).forEach((item) => {
                    if (item != '_') {
                        item_list.push(item)
                    }
                })
                resolve(item_list)
            })
        })
    }
}
