/* global LV */
'use strict'
const LX = window.LX || {}; if (!window.LX) window.LX = LX

LX.Feed = class Feed extends LV.EventEmitter {
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

  onDataChange (val, id, pkgId) {
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
      package: pkgId,
      data: data
    }

    if (this.packages[pkgId]) {
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
      if (!(this.packages[id])) return

      // console.log(`${this.logPrefix} refreshing data for:`, id)
      let parts = id.split('@')
      let name = parts[0]
      let version = parts[1]
      let packageNode = this.db.get('pkg').get(name)
      packageNode.get('data')
        .get(version).once((v, k) => {
          if (!v) return

          Object.keys(v).forEach((item) => {
            if (item === '_') return
            packageNode.get('data').get(version).get(item)
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

    console.log(`${this.logPrefix} watching changes: ${id}`)

    if (!this.packages.hasOwnProperty(id)) {
      this.packages[id] = true
      let packageNode = this.db.get('pkg').get(name)
      packageNode.get('data')
        .get(version).map()
        .on((v, k) => {
          // known issue with GunDB prevents new items from triggering this event
          // @todo replace work-around that polls for refreshData once fix is available
          // https://github.com/amark/gun/issues/663
          this.onDataChange(v, k, id)
        })
    } else {
      this.packages[id] = true
    }
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
