/* global LV */
'use strict'
const LX = window.LX || {}; if (!window.LX) window.LX = LX

LX.Package = class Package extends LV.EventEmitter {
  constructor (name, org) {
    super()

    if (!name) {
      console.error(`${this.logPrefix} please name your package to publish`)
      throw new Error('missing_name')
    }

    if (!org || !org.db) {
      console.error(`${this.logPrefix} please identify a valid organization for this package`)
      throw new Error('missing_org')
    }

    this.db = org.db
    this.organization = org
    this._data = {
      'name': name,
      'public': true, // only supporting public packages, for now
      'version': '0.0.1' // default version number
      // "organization": org.node // reference link to owning organization
    }

    this.node = this.db.get('pkg').get(name)
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
    * Publish a new data package to the network
    */
  publish (version, data) {
    return new Promise((resolve, reject) => {
      const completePublish = () => {
        let workingNode = this.node.get('data').get(version || this._data.version)

        workingNode.once((v, k) => {
          // do not over-write pre-existing version
          if (v) {
            console.log(`${this.logPrefix} already published: ${this.id}`)
            resolve(v)
          } else {
            console.log(`${this.logPrefix} will publish: ${this.id}`)

            // we know organization exists, so first link that
            workingNode.put(data || {})
              .once((v, k) => {
                this.node.get('version').put(version || this._data.version)

                console.log(`${this.logPrefix} new published version: ${this.id}`)
                this.emit('publish')
                resolve()
              })
          }
        })
      }

      this.node.get('organization')
        .put(this.organization.node)
        .once(() => {
          this.organization.node.get('packages').get(this.name).put(this.node)
        })
        .once(completePublish)
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
}
