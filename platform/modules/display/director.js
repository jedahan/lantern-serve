/* global fetch, LV */
'use strict'
const LX = window.LX || {}; if (!window.LX) window.LX = LX

LX.Director = class Director extends LV.EventEmitter {
  constructor () {
    super()
    this.ready = false
    this.apps = {}
    this.db = null
    this.view = new LX.View()
    this.atlas = LX.Atlas
    this.user = null
  }

  start () {
    // load in dynamic apps
    fetch('/api/apps', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((result) => {
        if (result.status === 200) {
          return result.json()
        } else {
          reject(result)
        }
      })
      .then((json) => {
        json.forEach(this.createApp.bind(this))
      })
      .catch((err) => {
        console.warn('[Direct] No available apps to work with')
      })

    // define database and user to work with decentralized network
    this.db = new LX.Database(window.location.origin + '/gun')
    this.user = new LX.User(this.db)
    this.user.authOrRegister()
    this.emit('start')
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

  // ------------------------------------------------------------------------
  createApp (appFiles) {
    if (!appFiles.children) {
      console.warn('[Direct] Ignoring app directory with no children:', appFiles.name)
      return
    }

    if (!this.apps.hasOwnProperty(appFiles.name)) {
      let obj = this.apps[appFiles.name] = new LX.App(appFiles)

      obj.on('load', (page) => {
        // console.log("[Direct] App loads page: ", page.componentId );
      })

      obj.on('open', (componentId) => {
        // console.log("[Direct] App opens component:", componentId);
        this.view.data.app_components.push(componentId)
      })

      obj.on('close', (componentId) => {
        // console.log("[Direct] App closes component:", componentId);
        this.view.data.app_components.remove(componentId)
      })
    }
  }

  // ------------------------------------------------------------------------
  closeOneApp (appId) {
    if (this.apps.hasOwnProperty(appId)) {
      this.apps[appId].unload()
    }
  }

  openOneApp (appId) {
    if (this.apps.hasOwnProperty(appId)) {
      this.apps[appId].pages.forEach((page) => {
        this.apps[appId].open(`lx-app-${appId}-${page.id}`)
      })
    }
  }
}
