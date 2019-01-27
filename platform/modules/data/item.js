const EventEmitter = require('event-emitter-es6')

module.exports = class LXItem extends EventEmitter {
    constructor (id, data, defaults) {
        super()
        this.id = id
        this._mode = 'draft'

        // create data space for data we allow to be exported to shared database
        this._data = {}
        this._new = {}

        // always include these defaults
        let globalDefaults = {
            'owner': ['o'],
            'editors': ['e', []],
            'tags': ['t', []]
        }

        defaults = Object.assign(globalDefaults, defaults)

        for (var idx in defaults) {
            this._data[idx] = defaults[idx][1] || null
            this._new[idx] = false
        }

        this._key_table = {}
        this._key_table_reverse = {}
        for (var idy in defaults) {
            this._key_table[idy] = defaults[idy][0]
            this._key_table_reverse[defaults[idy][0]] = idy
        }

        if (data) {
            this.mode = 'shared'
            let unpackagedData = this.unpack(data)
            Object.keys(unpackagedData).forEach((key) => {
                let val = unpackagedData[key]
                this._data[key] = val
            })
        }

        if (!window.LT.db) {
            throw new Error('Requires database to be defined')
        }

        this.db = window.LT.db

        return this
    }

    // -------------------------------------------------------------------------
    inspect () {
        console.log(`${this.logPrefix} data = ${JSON.stringify(this._data)}`)
    }

    get logPrefix () {
        return `[i:${this.id}]`.padEnd(20, ' ')
    }

    get data () {
        return this._data
    }

    // ------------------------------------------------------------------- OWNER
    /**
    * User that created this item / has primary control of this item
    */
    get owner () {
        return this._data.owner
    }

    /**
    * Defines the owner for this item
    */
    set owner (val) {
        if (!val) return
        if (val !== this._data.owner) {
            this._data.owner = val
            this._new.owner = true
        }
    }

    // ----------------------------------------------------------------- EDITORS
    /**
    * Gets a list of all item editors
    */
    get editors () {
        return this._data.editors
    }

    /**
    * Sets the entire list of editors for this item
    */
    set editors (val) {
        if (!val || val.length === 0) return

        if (typeof (val) === 'object') {
            val.forEach(this.editor.bind(this))
        }
    }

    /**
    * Adds a new editor to the item
    */
    editor (val) {
        if (!val) return
        if (this._data.editors.indexOf(val) > -1) {
            return
        }
        this._data.editors.push(val)
        this._new.editors = true
        this.emit('editor', val)
    }

    // -------------------------------------------------------------------- MODE
    get mode () {
        return this._mode
    }
    set mode (val) {
        if (!val) return
        this._mode = val
        this.emit('mode', val)
    }

    // -------------------------------------------------------------------- TAGS
    /**
    * Gets a list of all tags, often used to alter per-app display or logic
    */
    get tags () {
        if (this._data.tags && typeof (this._data.tags) === 'object') {
            return this._data.tags
        } else {
            return []
        }
    }

    /**
    * Sets the entire list of tags with specified array
    */
    set tags (val) {
        if (!val || val.length === 0) return

        if (typeof (val) === 'object') {
            val.forEach(this.tag.bind(this))
        }
    }

    /**
    * Add tag for data filtering and user interface display
    */
    tag (tag) {
        if (!tag) return
        tag = this.sanitizeTag(tag)

        this._data.tags = this._data.tags || []
        // console.log(`${this.logPrefix} tag = `, tag);

        // don't allow duplicate tags
        if (this._data.tags.indexOf(tag) > -1) {
            return
        }

        this._new.tags = true
        this._data.tags.push(tag)
        this.emit('tag', tag)
        return this.tags
    }

    /**
    * Remove tag
    */
    untag (tag) {
        if (!tag) return
        tag = this.sanitizeTag(tag)
        this._data.tags.remove(tag)
        this.emit('untag', tag)
        return this.tags
    }

    /**
    * Remove all tags
    */
    untagAll () {
        this._data.tags.forEach((tag) => {
            this.emit('untag', tag)
        })
        this._data.tags = []
        return this.tags
    }

    /**
    * Keep tags lowercase and with dash seperators
    */
    sanitizeTag (tag) {
        return tag.toLowerCase().replace(/[^a-z0-9\-]+/g, '')
    }

    // -------------------------------------------------------------------------
    /**
    * Compresses and formats data for storage in shared database
    *
    * Requires that all data variables are pre-defined in our map for safety
    */
    pack (obj) {
        let newObj = {}
        for (var idx in obj) {
            let v = obj[idx]
            if (this._key_table.hasOwnProperty(idx)) {
                let k = this._key_table[idx]
                if (v && v.constructor === Array) {
                    if (v.length) {
                        newObj[k] = '%' + v.join(',')
                    }
                    // do not store empty arrays at all
                } else if (v) {
                    newObj[k] = v
                }
            }
        }
        // console.log(`${this.logPrefix} Packed:`, obj, newObj);
        return newObj
    }

    /**
    * Extracts data from shared database and places back in javascript object
    *
    * Requires that all data variables are pre-defined in our map for safety
    */
    unpack (obj) {
        let newObj = {}

        for (var idx in obj) {
            let v = obj[idx]

            if (this._key_table_reverse.hasOwnProperty(idx)) {
                let k = this._key_table_reverse[idx]
                if (v[0] === 'Å') {
                    // @todo this is deprecated. remove later...
                    v = v.replace('Å', '%')
                }

                if (v[0] === '%') {
                    // this is an array. expand it...
                    v = v.replace('%', '').split(',')
                }

                newObj[k] = v
            }
        }
        // console.log(`${this.logPrefix} Unpacked:`, obj, newObj);
        return newObj
    }

    /*
    * Updates the local item with packed data
    */
    refresh (data) {
        let newData = this.unpack(data)
        // only access approved data keys from our map
        // only listen for changes when we have a getter/setter pair
        for (var idx in newData) {
            let pointer = this[idx] || this._data[idx] // try to use a getter if available

            if (JSON.stringify(pointer) !== JSON.stringify(newData[idx])) {
                if (pointer) {
                    if (typeof (pointer) === 'object') {
                        if (pointer.length) {
                            console.log(`${this.logPrefix} changing ${idx} object to ${newData[idx]}`)
                        }
                    } else if (pointer) {
                        console.log(`${this.logPrefix} changing ${idx} from ${this[idx]} to ${newData[idx]}`)
                    }
                }

                // default to use setter if available
                if (this[idx]) {
                    this[idx] = newData[idx]
                } else {
                    this._data[idx] = newData[idx]
                }
            }
        }
    }

    // -------------------------------------------------------------------------

    /**
    * Stores the composed item into a decentralized database
    */
    save (fields) {
        return new Promise((resolve, reject) => {
            // do not operate on locked items
            if (this.mode === 'locked') {
                return reject(new Error('save_failed_locked'))
            }

            // if we have fields to work with, update existing object
            if (fields) {
                return this.update(fields).then(resolve).catch(reject)
            }

            // otherwise, create a new item in the database
            if (!this.owner) {
                this.owner = window.LT.user.username
            }
            let obj = this.pack(this._data)
            this.mode = 'locked'

            // save to our shared database...
            this.db.get('itm').set(obj, (ack) => {
                // clear new state once saved
                Object.keys(this._new).forEach((item) => {
                    this._new[item] = false
                })
                // acknowledge this item is now shared with network
                this.mode = 'shared'
            }).once((v, k) => {
                // database assigns unique identifier
                this.id = k
                // now let our application know we are saved
                console.log(`${this.logPrefix} saved`, obj)
                this.emit('save')
                resolve(v)
            })
        })
    }

    /**
    * Updates only specific fields for an item
    */
    update (fields) {
        return new Promise((resolve, reject) => {
            // do not operate on locked items
            if (this.mode === 'locked') {
                return reject(new Error('update_failed_locked'))
            }

            // require an array of fields
            if (fields.constructor !== Array) {
                console.log(`${this.logPrefix} Update requires fields in array format: ${fields}`)
                return reject(new Error('update_failed_invalid_fields'))
            }

            this.mode = 'locked'
            let data = {}
            if (fields.constructor === Array) {
                fields.forEach((field) => {
                    // make sure we have an update for this field before saving
                    // prevents extraneous data sent over network
                    if (this._new[field]) {
                        data[field] = this._data[field]
                    }
                })
            } else if (typeof (fields) === 'string') {
                data[fields] = this._data[fields]
            }

            let obj = this.pack(data)
            let item = this.db.get('itm').get(this.id)
            item.once((v, k) => {
                if (!v) {
                    // trying to update a non-existing item
                    return reject(new Error('update_failed_missing'))
                }

                item.put(obj, (ack) => {
                    if (ack.err) {
                        return reject(new Error('update_failed_ack'))
                    }

                    Object.keys(obj).forEach((key) => {
                        let val = obj[key]
                        console.log(`${this.logPrefix} saved`, key, val)
                    })

                    this.emit('save', fields)
                    this.emit('update', fields)
                    this.mode = 'shared'
                    return resolve()
                })
            })
        })
    }

    /**
    * Clears the value of the item and nullifies in database (full delete not possible)
    */
    drop () {
        return new Promise((resolve, reject) => {
            // do not operate on locked items
            if (this.mode === 'locked') {
                return reject(new Error('drop_failed_locked'))
            }

            if (this.mode === 'dropped') {
                // already deleted... skip...
                return resolve()
            }

            console.log(this)
            let item = this.db.get('itm').get(this.id)

            item.once((v, k) => {
                if (!v) {
                    // already dropped
                    console.log(`${this.logPrefix} already dropped`)
                    return resolve()
                }

                item.put(null, (ack) => {
                    if (ack.err) {
                        return reject(new Error('drop_failed'))
                    }
                    console.log(`${this.logPrefix} Dropped`)
                    this.mode = 'dropped'
                    this.emit('drop')
                    return resolve()
                })
            })
        })
    }
}
