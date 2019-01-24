/**
* Lantern Database Watcher
*
*/
const util = require('./util')
const log = util.Logger
const path = require('path')
const spawnSync = require('child_process').spawnSync

module.exports = (app) => {
    let node = app.locals.db.get('__LX__').get('pkg')
    let packages = {}
    let items = {}
    let changeHooks = {
        'add': null,
        'update': null,
        'drop': null
    }
    let loaded = false

    /**
    * Check to see if we have any change hooks from environment
    */
    Object.keys(changeHooks).forEach((key) => {
        let envVar = 'HOOK_' + key.toUpperCase()
        if (process.env.hasOwnProperty(envVar)) {
            changeHooks[key] = path.resolve(__dirname + '/../' + process.env[envVar])
        }
    })

    /**
    * Get sequence number from database to help track intended priorities
    */
    const getSeq = () => {
        return app.locals.db._.root.once
    }

    /**
    * Run an executable to process a change on external system
    */
    const runChangeHook = (key, msg) => {
        if (changeHooks.hasOwnProperty(key)) {
            let msgKey = util.getSimpleMessage(msg)
            if (app.locals.inbox.hasOwnProperty(msgKey)) {
                // prevent echo of incoming message
                log.debug(`watcher -- ${(msg[1] === '|' ? ' ' : '')}${msg}`)
            } else if (typeof (changeHooks[key]) === 'string') {
                log.debug(`watcher -- ${(msg[1] === '|' ? ' ' : '')}${msg} --> ${key} hook`)
                let result = spawnSync(changeHooks[key], [msg])
            } else {
                log.debug(`watcher -- ${(msg[1] === '|' ? ' ' : '')}${msg}`)
            }
        }
    }

    /**
    * Watch for and announce changes to given package
    */
    const watchPackage = (v, packageName) => {
        if (v === null) {
            log.warn('watcher -- package dropped: ' + packageName)
            return
        }

        if (v.hasOwnProperty('version')) {
            // only attempt to watch a package with a current version set

            let pkgID = `${packageName}@${v.version}`

            if (packages[pkgID]) {
                // log.warn("watcher -- already watching: " + pkgID);
                return
            }
            packages[pkgID] = true
            // listen for new and existing items
            node.get(packageName).get('data').get(v.version).map().on((itemData, itemID) => {
                watchItem(itemID, itemData, pkgID)
            })
        }
    }

    /**
    * Watch for and announce changes to given item
    */
    const watchItem = (itemID, itemData, packageID) => {
        // detected drop
        if (itemData === null) {
            // this can be triggered when an item is first created due to the way we use put(null)
            // therefore, only indicate deletions if we already know about a valid item
            if (loaded && items[itemID]) {
                let msg = `${getSeq()}|${packageID}-${itemID}`
                runChangeHook('drop', msg)
            }
            return
        }

        // detected add
        if (items[itemID]) return

        items[itemID] = true
        if (loaded) {
            let msg = `${getSeq()}|${packageID}+${itemID}`
            runChangeHook('add', msg)
        }
        let packageName = packageID.split('@')[0]
        let version = packageID.split('@')[1]

        // watch for field changes
        node.get(packageName)
            .get('data')
            .get(version)
            .get(itemID)
            .map().on((v, fieldID) => {
                // @todo identify issue where inbox can trigger this code
                // to run twice for the same database update
                if (loaded) {
                    let msg = `${getSeq()}|${packageID}^${itemID}.${fieldID}=${v}`
                    runChangeHook('update', msg)
                }
            })
    }

    // listen for updates
    node.once(() => {
        // don't output initial data load
        setTimeout(() => {
            log.debug('watcher -- waiting for changes...')
            loaded = true
        }, 300)
    }).map().on(watchPackage)
}
