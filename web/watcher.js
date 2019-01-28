/**
* Lantern Database Watcher
*
*/
const util = require('./util')
const log = util.Logger
const path = require('path')
const execFile = require('child_process').execFile

module.exports = (app) => {
    let node = app.locals.db.get('__LX__').get('itm')
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
            changeHooks[key] = path.resolve(process.env[envVar])
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
                log.debug(`${util.logPrefix('watcher')} ${msg} <<`)
            } else if (typeof (changeHooks[key]) === 'string') {
                let ps = execFile(changeHooks[key], [msg])
                ps.stdout.on('data', (data) => {
                    log.debug(`${util.logPrefix('watcher')} ${msg} >> `)
                    //log.debug(`${key} hook output: ${data}`)
                })

                ps.stderr.on('data', (err) => {
                    log.warn(`${util.logPrefix('watcher')} ${msg} !! `)
                    log.warn(`${key} hook could not run: ${err}`)
                })

            } else {
                log.debug(`${util.logPrefix('watcher')} ${msg}`)
            }
        }
    }

    /**
    * Watch for and announce changes to given item
    */
    const watchItem = (itemData, itemID) => {
        // detected drop
        if (itemData === null) {
            // this can be triggered when an item is first created due to the way we use put(null)
            // therefore, only indicate deletions if we already know about a valid item
            if (loaded && items[itemID]) {
                let msg = `${getSeq()}-${itemID}`
                runChangeHook('drop', msg)
            }
            return
        }

        // detected add
        if (items[itemID]) return

        items[itemID] = true
        if (loaded) {
            let msg = `${getSeq()}+${itemID}`
            runChangeHook('add', msg)
        }

        // watch for field changes
        node.get(itemID)
            .map().on((v, fieldID) => {
                // @todo identify issue where inbox can trigger this code
                // to run twice for the same database update
                if (loaded) {
                    let msg = `${getSeq()}^${itemID}.${fieldID}=${v}`
                    runChangeHook('update', msg)
                }
            })
    }

    // listen for updates
    node.once(() => {
        // don't output initial data load
        setTimeout(() => {
            log.debug(`${util.logPrefix('watcher')} waiting for changes...`)
            loaded = true
        }, 300)
    }).map().on(watchItem)
}
