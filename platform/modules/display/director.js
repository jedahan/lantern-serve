const EventEmitter = require('event-emitter-es6')
const LXView = require('./view')
const LXAtlas = require('../mapping/atlas')
const LXDatabase = require('../data/database')
const LXUser = require('../data/user')
const LXApp = require('../display/app')
const origin = window.location.origin
const fetch = window.fetch

module.exports = class LXDirector extends EventEmitter {
    constructor () {
        super()
        this.ready = false
        this.apps = {}
        this.view = new LXView()
        this.atlas = new LXAtlas()
        // define database and user to work with decentralized network
        this.db = new LXDatabase(origin + '/gun')
        this.user = new LXUser(this.db)
    }

    withUser (fn) {
        if (this.user && this.user.username) {
            fn(this.user)
        } else {
            this.user.once('auth', function () {
                fn(this.user)
            }.bind(this))
        }
    }

    loadApps () {
        return new Promise((resolve, reject) => {
            // info that may be useful to the browser or environment
            let info = {
                apps: [],
                online: null,
                cloud: null
            }

            // load in dynamic apps
            fetch('/api/apps', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((result) => {
                    if (result.status == 200) {
                        info.online = result.headers.get('X-Lantern-Online')
                        info.cloud = result.headers.get('X-Lantern-Cloud')
                        return result.json()
                    } else {
                        reject(result)
                    }
                })
                .then((json) => {
                    json.forEach(item => {
                        this.createApp(item)
                        info.apps.push(item.name)
                    })
                    resolve(info)
                })
                .catch((err) => {
                    console.warn('[Direct] No available apps to work with')
                })
        })
    }

    loadStylesheet (uri) {
        var el = document.createElement('link')
        el.rel = 'stylesheet'
        el.href = uri
        el.type = 'text/css'
        document.head.appendChild(el)
    }

    // ------------------------------------------------------------------------
    createApp (item) {
        if (!item.children) {
            console.warn('[Direct] Ignoring app directory with no children:', item.name)
            return
        }

        if (!this.apps.hasOwnProperty(item.name)) {
            this.withUser((user) => {
                let obj = this.apps[item.name] = new LXApp(item)

                obj.on('load', (page) => {
                    // console.log("[Direct] App loads page: ", page.componentID );
                })

                obj.on('open', (componentID) => {
                    // console.log("[Direct] App opens component:", componentID);
                    this.view.data.app_components.push(componentID)
                })

                obj.on('close', (componentID) => {
                    // console.log("[Direct] App closes component:", componentID);
                    this.view.data.app_components.remove(componentID)
                })
            })
        }
    }

    // ------------------------------------------------------------------------
    closeOneApp (appID) {
        if (this.apps.hasOwnProperty(appID)) {
            this.apps[appID].unload()
        }
    }

    openOneApp (appID) {
        if (this.apps.hasOwnProperty(appID)) {
            this.apps[appID].pages.forEach((page) => {
                this.apps[appID].open(`lx-app-${appID}-${page.id}`)
            })
        }
    }
}
