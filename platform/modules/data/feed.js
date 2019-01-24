const EventEmitter = require('event-emitter-es6')

module.exports = class LXFeed extends EventEmitter {
    constructor (user) {
        super()
        this.user = user
        this.db = user.db
        this.packages = {} // only watch these
        this.topics = {} // only watch these
    }

    // -------------------------------------------------------------------------
    get logPrefix () {
        return `[f:${this.user.username}]`.padEnd(20, ' ')
    }

    onDataChange (val, id, pkgID) {
        var data

        if (val !== null && typeof (val) === 'object') {
            data = {}
            Object.keys(val).forEach(k => {
                if (k !== '_') {
                    data[k] = val[k]
                }
            })
        }

        let event = {
            id: id,
            package: pkgID,
            data: data
        }

        if (this.packages[pkgID]) {
            this.emit('change', event)
        } else {
            console.log('skipping', event)
        }
    }

    /**
    * Allows for manual refresh of data from the feed
    */
    refreshData () {
        Object.keys(this.packages).forEach(id => {
            if (this.packages[id] === false) {
                return
            }

            // console.log(`${this.logPrefix} refreshing data for:`, id)
            let parts = id.split('@')
            let name = parts[0]
            let version = parts[1]
            let pkgNode = this.db.get('pkg').get(name)
            pkgNode.get('data')
                .get(version).once((v, k) => {
                    if (!v) return

                    Object.keys(v).forEach((item) => {
                        if (item === '_') return
                        pkgNode.get('data').get(version).get(item)
                            .once((value, key) => {
                                this.onDataChange(value, key, id)
                            })
                    })
                })
        })
    }

    // -------------------------------------------------------------------------
    addManyPackages (packages) {
        packages.forEach(this.addOnePackage.bind(this))
    }

    addOnePackage (id) {
        var parts, name, version
        try {
            parts = id.split('@')
            name = parts[0]
            version = parts[1]
        } catch (e) {
            console.error(`${this.logPrefix} invalid identifier provided to add package: ${id}`)
            return
        }

        if (this.packages[id]) {
            console.log(`${this.logPrefix} already watching: ${id}`)
            return
        }

        // optimistically assume package exists
        this.packages[id] = true

        this.db.get('pkg').get(name).get('data')
            .once((v, k) => {
                if (v.hasOwnProperty(version)) {
                    // verified that version exists
                    console.log(`${this.logPrefix} watching changes: ${id}`)
                } else {
                    // disable our package subscription if we find out it is missing
                    this.packages[id] = false
                    console.warn(`${this.logPrefix} missing package version to watch: ${id}`)
                }
            })
            .get(version)
            .map()
            .on((v, k) => {
                // start watching for changes
                this.onDataChange(v, k, id)
            })
    }

    removeManyPackages (packages) {
        packages.forEach(this.removeOnePackage.bind(this))
    }

    removeOnePackage (id) {
        try {
            let parts = id.split('@')
        } catch (e) {
            console.error(`${this.logPrefix} invalid identifier provided to remove package ${id}`)
            return
        }

        console.log(`${this.logPrefix} unwatch changes for ${id}`)
        this.packages[id] = false
    }

    // -------------------------------------------------------------------------
    addManyTopics (topics) {
        topics.forEach(this.addOneTopic.bind(this))
    }

    addOneTopic (name) {
        console.log(`${this.logPrefix} add topic ${name}`)
        this.topics[name] = true
    }

    removeManyTopics (topics) {
        topics.forEach(this.removeOneTopic.bind(this))
    }
    removeOneTopic (name) {
        console.log(`${this.logPrefix} remove topic ${name}`)
        this.topics[name] = false
    }
}
