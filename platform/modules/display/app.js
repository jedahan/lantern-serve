LX.App = class App extends LV.EventEmitter {
    constructor (obj) {
        super()
        this.name = obj.name
        this.css_id = `lx-app-${this.name}-css`
        this.children = obj.children
        this.pages = []
        this._component_opened = {}
        this.data = {}
        this.load()
    }

    // ------------------------------------------------------------------------
    createPageComponent (page_id, body, logic) {
        let cmp = {
            template: body
        }

        let component_id = ['lx', 'app', this.name, page_id].join('-')

        let self = this

        let page = {
            'id': page_id,
            'component_id': component_id,
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

        page.component = LV.Vue.component(component_id, cmp)

        self.pages.push(page)

        self.emit('load', page)

        if (logic) {
            if (logic.callback) {
                logic.callback.call(page)
            }
            if (logic.open) {
                self.open(component_id)
            }
        }
    }

    get log_prefix () {
        return `[a:lx-app-${this.name}]`.padEnd(20, ' ')
    }

    // ------------------------------------------------------------------------
    /**
    * Setup the VueComponent with logic as defined by developer
    */
    load () {
        let accepted = ['data', 'computed', 'methods', 'open', 'callback', 'mounted']
        let image_re = /(<img[\S\s]*?src=")([\S\s]*?)("[\S\s]*?>)/ig

        let logic = {}

        this.children.forEach((child) => {
            if (child.extension == '.css' && child.body) {
                this.addCSS(child.body)
            } else if (child.extension == '.js' && child.body) {
                let js = eval(child.body)
                accepted.forEach((key) => {
                    if (js.hasOwnProperty(key)) {
                        logic[key] = js[key]
                    }
                })
            }
        })

        this.children.forEach((child) => {
            if (child.extension == '.html' && child.body) {
                let html = child.body.replace(image_re, '$1' + `/-/${this.name}/` + '$2$3')
                let page_id = child.name.split('.')[0]
                this.createPageComponent(page_id, html, logic)
            }
        })
    }

    /**
    * Removes all Vue components and related code and style injection
    */
    unload () {
        this.pages.forEach((page) => {
            this.close(page.component_id)
        })
        setTimeout(() => {
            // allows vue to clear DOM to avoid flashes of content
            this.removeCSS()
        }, 300)
    }

    // ------------------------------------------------------------------------
    /**
    * Displays Vue component on the screen
    */
    open (component_id) {
        if (this._component_opened[component_id]) {
            // skip already opened app
            return
        }
        this._component_opened[component_id] = true
        // console.log(`${this.log_prefix} open`);
        this.emit('open', component_id)
    }

    /**
    * Hides Vue component but keeps style injection for other open components
    */
    close (component_id) {
        this._component_opened[component_id] = false
        // console.log(`${this.log_prefix} close`);
        this.emit('close', component_id)
    }

    /**
    * Checks whether this app is open
    */
    isOpen () {
        return this._opened
    }

    // ------------------------------------------------------------------------
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
}
