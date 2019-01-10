/* global fetch, LV */
'use strict'
const LX = window.LX || {}; if (!window.LX) window.LX = LX

LX.App = class App extends LV.EventEmitter {
  constructor (obj) {
    super()
    this.name = obj.name
    this.css_id = `lx-app-${this.name}-css`
    this.children = obj.children
    this.pages = []
    this.data = {}
    this.load()
    this._component_opened = {}
  }

  createPageComponent (pageId, body, logic) {
    let cmp = {
      template: body
    }

    let componentId = ['lx', 'app', this.name, pageId].join('-')

    let self = this

    let page = {
      'id': pageId,
      'componentId': componentId,
      'app': this
    }
    if (logic) {
      if (logic.data) {
        // keep multiple components in same app together with same data
        self.data = logic.data
        cmp.data = function () {
          return self.data
        }
      }

      if (logic.computed) {
        cmp.computed = logic.computed
      }
      if (logic.methods) {
        cmp.methods = {}
        for (var idx in logic.methods) {
          cmp.methods[idx] = logic.methods[idx]
        }
      }
      if (logic.mounted) {
        cmp.mounted = logic.mounted
      }
    }

    page.component = LV.Vue.component(componentId, cmp)

    self.pages.push(page)

    self.emit('load', page)

    if (logic) {
      if (logic.callback) {
        logic.callback.call(page)
      }
      if (logic.open) {
        self.open(componentId)
      }
    }
  }

  get logPrefix () {
    return `[a:lx-app-${this.name}]`.padEnd(20, ' ')
  }

  /**
    * Displays Vue component on the screen
    */
  open (componentId) {
    if (this._component_opened[componentId]) {
      // skip already opened app
      return
    }
    this._component_opened[componentId] = true
    // console.log(`${this.logPrefix} open`);
    this.emit('open', componentId)
  }

  /**
    * Hides Vue component but keeps style injection for other open components
    */
  close (componentId) {
    this._component_opened[componentId] = false
    // console.log(`${this.logPrefix} close`);
    this.emit('close', componentId)
  }

  /**
    * Checks whether this app is open
    */
  isOpen () {
    return this._opened
  }

  /**
    * Inject CSS into DOM, allowing apps to redefine global styles if needed
    */
  addCSS (css) {
    let head = document.getElementsByTagName('head')[0]
    let s = document.createElement('style')
    s.setAttribute('type', 'text/css')
    s.id = this.css_id
    if (s.styleSheet) { // IE
      s.styleSheet.cssText = css
    } else { // the world
      s.appendChild(document.createTextNode(css))
    }
    head.appendChild(s)
  }

  removeCSS () {
    let s = document.getElementById(this.css_id)
    s.parentNode.removeChild(s)
  }

  /**
    * Load a single HTML page into DOM using Vue
    */
  loadOnePage (filename, pageId, logic) {
    fetch(filename, {
      headers: {
        'Content-Type': 'text/html'
      }
    })
      .then((result) => {
        return result.text()
      })
      .then((html) => {
        // rewrite src attribute to point to proper web directory
        let imageRe = /(<img[\S\s]*?src=")([\S\s]*?)("[\S\s]*?>)/ig
        return html.replace(imageRe, '$1' + `/-/${this.name}/` + '$2$3')
      })
      .then((body) => {
        return this.createPageComponent(pageId, body, logic)
      })
  }

  /**
    * Load all HTML pages for app into DOM using Vue
    */
  loadAllPages (logic) {
    let files = {}
    this.children.forEach((child) => {
      // only load html pages
      if (child.extension !== '.html') return
      let filename = ['/-', this.name, child.name].join('/')
      let pageId = child.name.split('.')[0]
      this.loadOnePage(filename, pageId, logic)
    })
  }

  /**
    * Use fetch to retrieve any sort of file from app package
    */
  loadOneFile (name, json) {
    return new Promise((resolve, reject) => {
      let exists = false

      this.children.forEach((child) => {
        if (child.name !== name) return
        exists = true
      })

      if (!exists) return resolve()

      let filename = ['/-', this.name, name].join('/')
      return fetch(filename)
        .then((result) => {
          if (result.status === 200) {
            if (json) {
              return result.json()
            } else {
              return result.text()
            }
          }
        })
        .then((contents) => {
          resolve(contents)
        })
        .catch((e) => {
          console.warn(`${this.logPrefix} Could not load file for ${this.name}: ${name}`, e)
        })
    })
  }

  load () {
    let logic = {}
    let accepted = ['data', 'computed', 'methods', 'open', 'callback', 'mounted']
    this.loadOneFile('app.js')
      .then((result) => {
        if (!result) {
          return console.warn(`${this.logPrefix} Could not load app.js`)
        }
        result = eval(result)
        accepted.forEach((key) => {
          if (result.hasOwnProperty(key)) {
            logic[key] = result[key]
          }
        })
      })
      .then(() => {
        return this.loadOneFile('app.css')
          .then((css) => {
            if (css) {
              this.addCSS(css)
            }
          })
      })
      .then(() => {
        this.loadAllPages(logic)
      })
  }

  /**
    * Removes all Vue components and related code and style injection
    */
  unload () {
    this.pages.forEach((page) => {
      this.close(page.componentId)
    })
    setTimeout(() => {
      // allows vue to clear DOM to avoid flashes of content
      this.removeCSS()
    }, 300)
  }
}
