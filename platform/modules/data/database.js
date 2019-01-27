const EventEmitter = require('event-emitter-es6')
const Gun = require('gun')

const rel_ = Gun.val.rel._ // '#'
const node_ = Gun.node._ // '_'

Gun.chain.unset = function (node) {
    this.put({ [node[node_].put[node_][rel_]]: null })
    return this
}

module.exports = class LXDatabase extends EventEmitter {
    constructor (uri) {
        super()
        this.uri = uri
        this.namespace = '__LX__'
        this.stor = Gun(this.uri) // database instance
        this.root_node = this.stor.get(this.namespace) // root node
    }

    // -------------------------------------------------------------------------
    get logPrefix () {
        return `[database]`.padEnd(20, ' ')
    }

    // -------------------------------------------------------------------------
    /**
    * Ensure expected nodes are available to work with
    */
    setup (force) {
        return new Promise((resolve, reject) => {
            // don't encourage full-overwrite
            let init = (force ? null : {})

            this.root_node.once((v, k) => {
                if (v) {
                    console.log(`${this.logPrefix} database ready`)
                } else {
                    console.log(`${this.logPrefix} database ready but empty`)
                }

                // @todo add messages to data structure
                let expected = ['org', 'pkg', 'itm']
                expected.forEach((key) => {
                    if (!v || !v.hasOwnProperty(key) || v[key] === null) {
                        console.log(`${this.logPrefix} adding top-level node: ${key}`)
                        this.root_node.get(key).put(null).put({}, (ack) => {
                            if (ack.err) {
                                reject('failed_create_node_' + key)
                            } else {
                                console.log(`${this.logPrefix} created top-level node: ${key}`)
                            }
                        })
                    }
                })
                this.emit('ready')
                resolve()
            })
        })
    }

    // -------------------------------------------------------------------------
    /**
    * Get node from within root namespace
    */
    get () {
        return this.root_node.get.apply(this.root_node, arguments)
    }

    /**
    * Sets value from within root namespace
    */
    put () {
        return this.root_node.put.apply(this.root_node, arguments)
    }

    // -------------------------------------------------------------------------

    /**
    * Prints out value of a node selected by a path/to/node
    */
    print (path, pointer, node) {
        // recursive attempt to narrow down to target node
        if (!pointer) pointer = path
        if (!node) node = this.root_node
        let split = pointer.split('/')
        node.get(split[0]).once((v, k) => {
            if (split.length > 1) {
                let newPointer = split.slice(1).join('/')
                node = node.get(k)
                this.print(path, newPointer, node)
            } else {
                // we reached the target node here
                console.log(`[DB] ${path} = `, v)
            }
        })
        return split.length
    }

    /**
    * Output basic node on .once or .map
    */
    log (v, k) {
        if (!k) {
            // assume get request
            this.get(v).once((v, k) => {
                return this.log(v, k)
            })
        } else {
            let pre = this.logPrefix || '[database]'
            if (v && typeof (v) === 'object') {
                console.log(`${pre} ${k} =`)
                Object.keys(v).forEach((key) => {
                    console.log(`${pre}     ${key}:`, v[key])
                })
            } else {
                console.log(`${pre} ${k} =`, v)
            }
        }
    }

    /**
    *  Print out the graph structure of a specified node
    */
    inspect (showDeleted, json, level) {
        let self = this
        if (!json) {
            return self.jsonify().then((newJSON) => {
                this.inspect(showDeleted, newJSON, level)
            })
        }

        level = level || ''

        Object.keys(json).forEach(k => {
            if (k === '#') return

            let v = json[k]

            // printable value
            let vp = v
            if (typeof (v) === 'String') {
                vp = v.truncate(30)
            }

            if (v === null) {
                if (showDeleted) {
                    console.log(`${level}[ø] ${k}`)
                }
            } else if (typeof (v) === 'object') {
                console.log(`${level}[+] ${k}`)
                self.inspect(showDeleted, v, level + '  ')
            } else {
                console.log(`${level}|- ${k} = `, vp)
            }
        })
    }

    /**
    * Exports data structure to a basic JSON object with hierarchy
    */
    jsonify (node, tree, pointer) {
        let self = this
        node = node || self.root_node
        tree = tree || {}
        pointer = pointer || tree

        return new Promise((resolve, reject) => {
            if (!node) {
                return reject('Root node missing')
            }

            node.once((v, k) => {
                pointer[k] = {}
                let promises = []
                if (v) {
                    let items = Object.keys(v).filter(key => key !== '_')
                    items.forEach((item) => {
                        var promise
                        let val = v[item]

                        if (item === 'organization' || item === 'packages') {
                            // special rule for packages to avoid circular display of organization data
                            promise = new Promise((resolve, reject) => {
                                node.get(item).once((val, key) => {
                                    let names = {}

                                    if (val.name) {
                                        pointer[k][item] = val.name
                                        return resolve(val.name)
                                    }

                                    Object.keys(val).forEach((name) => {
                                        if (name !== '_') names[name] = true
                                    })

                                    pointer[k][item] = names
                                    resolve(names)
                                })
                            })
                        } else if (val !== null && typeof (val) === 'object') {
                            promise = self.jsonify.apply(self, [node.get(item), tree, pointer[k]])
                        } else {
                            promise = pointer[k][item] = val
                        }
                        promises.push(promise)
                    })
                }

                Promise.all(promises).then((val) => {
                    resolve(tree)
                })
            })
        })
    };
}
