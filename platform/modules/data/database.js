/* global LV */
'use strict'
const LX = window.LX || {}; if (!window.LX) window.LX = LX

LX.Database = class Database extends LV.EventEmitter {
  constructor (uri) {
    super()
    this.uri = uri
    this.namespace = '__LX__'
    this.stor = LV.GraphDB(this.uri) // database instance
    this.root_node = this.stor.get(this.namespace) // root node

    this.root_node.get('org').once((v, k) => {
      if (!v) {
        this.root_node.get('org').put({})
      }
    })

    this.root_node.get('pkg').once((v, k) => {
      if (!v) {
        this.root_node.get('pkg').put({})
      }
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
    console.log(`[db] Key ${k} =`, v)
  }

  /**
    *  Print out the graph structure of a specified node
    */
  inspect (showDeleted, json, level) {
    let self = this
    if (!json) {
      return self.jsonify().then((newJson) => {
        this.inspect(showDeleted, newJson, level)
      })
    }

    level = level || ''

    Object.keys(json).forEach(k => {
      if (k === '#') return

      let v = json[k]

      // printable value
      let vp = v
      if (typeof (v) === 'string') {
        vp = v.truncate(30)
      }

      if (v === null) {
        if (showDeleted) {
          console.log(`${level}[ø] ${k}`)
        }
      } else if (typeof (v) === 'object') {
        let length = Object.keys(v).length
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
        return reject(new Error('Root node missing'))
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
