const EventEmitter = require('event-emitter-es6')
const Vue = require('vue')
const VueLongPress = require('vue-long-press-directive')
const LXPieMenu = require('./menu')

module.exports = class LXView extends EventEmitter {
    constructor () {
        super()
        // setup vue object
        Vue.filter('pluralize', (word, amount) => amount !== 1 ? `${word}s` : word)
        this.vue = new Vue({
            el: '#app-container',
            data: {
                app_components: [],
                map: false
            }
        })
        Vue.use(VueLongPress, { duration: 750 })
        this.data = this.vue.$data
        this.menu = new LXPieMenu()
    }
}
