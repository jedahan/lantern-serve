(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
!function(){function t(n,o){function e(t){return t.split("/").slice(-1).toString().replace(".js","")}return o?require(n):n.slice?t[e(n)]:function(o,i){n(o={exports:{}}),t[e(i)]=o.exports}}var n;"undefined"!=typeof window&&(n=window),"undefined"!=typeof global&&(n=global),n=n||{};var o=n.console||{log:function(){}};if("undefined"!=typeof module)var e=module;t(function(t){var n={};n.fn={is:function(t){return!!t&&"function"==typeof t}},n.bi={is:function(t){return t instanceof Boolean||"boolean"==typeof t}},n.num={is:function(t){return!e(t)&&(t-parseFloat(t)+1>=0||1/0===t||-(1/0)===t)}},n.text={is:function(t){return"string"==typeof t}},n.text.ify=function(t){return n.text.is(t)?t:"undefined"!=typeof JSON?JSON.stringify(t):t&&t.toString?t.toString():t},n.text.random=function(t,n){var o="";for(t=t||24,n=n||"0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz";t>0;)o+=n.charAt(Math.floor(Math.random()*n.length)),t--;return o},n.text.match=function(t,o){function e(t,n){for(var o,e=-1,i=0;o=n[i++];)if(!~(e=t.indexOf(o,e+1)))return!1;return!0}var i=!1;if(t=t||"",o=n.text.is(o)?{"=":o}:o||{},n.obj.has(o,"~")&&(t=t.toLowerCase(),o["="]=(o["="]||o["~"]).toLowerCase()),n.obj.has(o,"="))return t===o["="];if(n.obj.has(o,"*")){if(t.slice(0,o["*"].length)!==o["*"])return!1;i=!0,t=t.slice(o["*"].length)}if(n.obj.has(o,"!")){if(t.slice(-o["!"].length)!==o["!"])return!1;i=!0}if(n.obj.has(o,"+")&&n.list.map(n.list.is(o["+"])?o["+"]:[o["+"]],function(n){return t.indexOf(n)>=0?void(i=!0):!0}))return!1;if(n.obj.has(o,"-")&&n.list.map(n.list.is(o["-"])?o["-"]:[o["-"]],function(n){return t.indexOf(n)<0?void(i=!0):!0}))return!1;if(n.obj.has(o,">")){if(!(t>o[">"]))return!1;i=!0}if(n.obj.has(o,"<")){if(!(t<o["<"]))return!1;i=!0}if(n.obj.has(o,"?")){if(!e(t,o["?"]))return!1;i=!0}return i},n.list={is:function(t){return t instanceof Array}},n.list.slit=Array.prototype.slice,n.list.sort=function(t){return function(n,o){return n&&o?(n=n[t],o=o[t],o>n?-1:n>o?1:0):0}},n.list.map=function(t,n,o){return u(t,n,o)},n.list.index=1,n.obj={is:function(t){return t?t instanceof Object&&t.constructor===Object||"Object"===Object.prototype.toString.call(t).match(/^\[object (\w+)\]$/)[1]:!1}},n.obj.put=function(t,n,o){return(t||{})[n]=o,t},n.obj.has=function(t,n){return t&&Object.prototype.hasOwnProperty.call(t,n)},n.obj.del=function(t,n){return t?(t[n]=null,delete t[n],t):void 0},n.obj.as=function(t,n,o,e){return t[n]=t[n]||(e===o?{}:o)},n.obj.ify=function(t){if(r(t))return t;try{t=JSON.parse(t)}catch(n){t={}}return t},function(){function t(t,n){a(this,n)&&o!==this[n]||(this[n]=t)}var o;n.obj.to=function(n,o){return o=o||{},u(n,t,o),o}}(),n.obj.copy=function(t){return t?JSON.parse(JSON.stringify(t)):t},function(){function t(t,n){var o=this.n;if(!o||!(n===o||r(o)&&a(o,n)))return n?!0:void 0}n.obj.empty=function(n,o){return n&&u(n,t,{n:o})?!1:!0}}(),function(){function t(n,o){return 2===arguments.length?(t.r=t.r||{},void(t.r[n]=o)):(t.r=t.r||[],void t.r.push(n))}var i=Object.keys;n.obj.map=function(u,s,f){var c,l,p,d,h,v=0,g=o(s);if(t.r=null,i&&r(u)&&(d=i(u),h=!0),e(u)||d)for(l=(d||u).length;l>v;v++){var m=v+n.list.index;if(g){if(p=h?s.call(f||this,u[d[v]],d[v],t):s.call(f||this,u[v],m,t),p!==c)return p}else if(s===u[h?d[v]:v])return d?d[v]:m}else for(v in u)if(g){if(a(u,v)&&(p=f?s.call(f,u[v],v,t):s(u[v],v,t),p!==c))return p}else if(s===u[v])return v;return g?t.r:n.list.index?0:-1}}(),n.time={},n.time.is=function(t){return t?t instanceof Date:+(new Date).getTime()};var o=n.fn.is,e=n.list.is,i=n.obj,r=i.is,a=i.has,u=i.map;t.exports=n})(t,"./type"),t(function(t){t.exports=function n(t,o,e){if(!t)return{to:n};var i,t=(this.tag||(this.tag={}))[t]||(this.tag[t]={tag:t,to:n._={next:function(t){var n;(n=this.to)&&n.next(t)}}});if(o instanceof Function){var r={off:n.off||(n.off=function(){return this.next===n._.next?!0:(this===this.the.last&&(this.the.last=this.back),this.to.back=this.back,this.next=n._.next,this.back.to=this.to,void(this.the.last===this.the&&delete this.on.tag[this.the.tag]))}),to:n._,next:o,the:t,on:this,as:e};return(r.back=t.last||t).to=r,t.last=r}return(t=t.to)&&i!==o&&t.next(o),t}})(t,"./onto"),t(function(t){function n(t,n,e,i,r){if(n>t)return{defer:!0};if(e>n)return{historical:!0};if(n>e)return{converge:!0,incoming:!0};if(n===e){if(i=o(i)||"",r=o(r)||"",i===r)return{state:!0};if(r>i)return{converge:!0,current:!0};if(i>r)return{converge:!0,incoming:!0}}return{err:"Invalid CRDT Data: "+i+" to "+r+" at "+n+" to "+e+"!"}}if("undefined"==typeof JSON)throw new Error("JSON is not included in this browser. Please load it first: ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js");var o=JSON.stringify;t.exports=n})(t,"./HAM"),t(function(n){var o=t("./type"),e={};e.is=function(t){return t===i?!1:null===t?!0:t===1/0?!1:s(t)||a(t)||u(t)?!0:e.rel.is(t)||!1},e.link=e.rel={_:"#"},function(){function t(t,n){var o=this;return o.id?o.id=!1:n==r&&s(t)?void(o.id=t):o.id=!1}e.rel.is=function(n){if(n&&n[r]&&!n._&&c(n)){var o={};if(p(n,t,o),o.id)return o.id}return!1}}(),e.rel.ify=function(t){return l({},r,t)},o.obj.has._=".";var i,r=e.link._,a=o.bi.is,u=o.num.is,s=o.text.is,f=o.obj,c=f.is,l=f.put,p=f.map;n.exports=e})(t,"./val"),t(function(n){var o=t("./type"),e=t("./val"),i={_:"_"};i.soul=function(t,n){return t&&t._&&t._[n||p]},i.soul.ify=function(t,n){return n="string"==typeof n?{soul:n}:n||{},t=t||{},t._=t._||{},t._[p]=n.soul||t._[p]||l(),t},i.soul._=e.link._,function(){function t(t,n){return n!==i._?e.is(t)?void(this.cb&&this.cb.call(this.as,t,n,this.n,this.s)):!0:void 0}i.is=function(n,o,e){var r;return u(n)&&(r=i.soul(n))?!f(n,t,{as:e,cb:o,s:r,n:n}):!1}}(),function(){function t(t,n){var o,i,r=this.o;return r.map?(o=r.map.call(this.as,t,""+n,r.node),void(i===o?s(r.node,n):r.node&&(r.node[n]=o))):void(e.is(t)&&(r.node[n]=t))}i.ify=function(n,o,e){return o?"string"==typeof o?o={soul:o}:o instanceof Function&&(o={map:o}):o={},o.map&&(o.node=o.map.call(e,n,r,o.node||{})),(o.node=i.soul.ify(o.node||{},o))&&f(n,t,{o:o,as:e}),o.node}}();var r,a=o.obj,u=a.is,s=a.del,f=a.map,c=o.text,l=c.random,p=i.soul._;n.exports=i})(t,"./node"),t(function(n){function o(){var t;return t=r(),t>a?(u=0,a=t+o.drift):a=t+(u+=1)/s+o.drift}{var e=t("./type"),i=t("./node"),r=e.time.is,a=-(1/0),u=0,s=1e3,f="undefined"!=typeof performance?performance.timing&&performance:!1;f&&f.timing&&f.timing.navigationStart||(f=!1)}o._=">",o.drift=0,o.is=function(t,n,e){var i=n&&t&&t[x]&&t[x][o._]||e;if(i)return b(i=i[n])?i:-(1/0)},o.lex=function(){return o().toString(36).replace(".","")},o.ify=function(t,n,e,r,a){if(!t||!t[x]){if(!a)return;t=i.soul.ify(t,a)}var u=p(t[x],o._);return c!==n&&n!==x&&(b(e)&&(u[n]=e),c!==r&&(t[n]=r)),t},o.to=function(t,n,e){var r=t[n];return h(r)&&(r=g(r)),o.ify(e,n,o.is(t,n),r,i.soul(t))},function(){function t(t,n){x!==n&&o.ify(this.o,n,this.s)}o.map=function(n,e,i){var r,a=h(a=n||e)?a:null;return n=y(n=n||e)?n:null,a&&!n?(e=b(e)?e:o(),a[x]=a[x]||{},v(a,t,{o:a,s:e}),a):(i=i||h(e)?e:r,e=b(e)?e:o(),function(o,a,u,s){return n?(n.call(i||this||{},o,a,u,s),void(d(u,a)&&r===u[a]||t.call({o:u,s:e},o,a))):(t.call({o:u,s:e},o,a),o)})}}();var c,l=e.obj,p=l.as,d=l.has,h=l.is,v=l.map,g=l.copy,m=e.num,b=m.is,k=e.fn,y=k.is,x=i._;n.exports=o})(t,"./state"),t(function(n){var o=t("./type"),e=t("./val"),i=t("./node"),r={};!function(){function t(t,o){return t&&o===i.soul(t)&&i.is(t,this.fn,this.as)?void(this.cb&&(n.n=t,n.as=this.as,this.cb.call(n.as,t,o,n))):!0}function n(t){t&&i.is(n.n,t,n.as)}r.is=function(n,o,e,i){return n&&s(n)&&!l(n)?!d(n,t,{cb:o,fn:e,as:i}):!1}}(),function(){function t(t,o){var r;return(r=p(t,o))?r:(o.env=t,o.soul=u,i.ify(o.obj,n,o)&&(o.rel=o.rel||e.rel.ify(i.soul(o.node)),o.obj!==t.shell&&(t.graph[e.rel.is(o.rel)]=o.node)),o)}function n(n,o,r){var u,s,p=this,d=p.env;if(i._===o&&c(n,e.rel._))return r._;if(u=l(n,o,r,p,d)){if(o||(p.node=p.node||r||{},c(n,i._)&&i.soul(n)&&(p.node._=h(n._)),p.node=i.soul.ify(p.node,e.rel.is(p.rel)),p.rel=p.rel||e.rel.ify(i.soul(p.node))),(s=d.map)&&(s.call(d.as||{},n,o,r,p),c(r,o))){if(n=r[o],a===n)return void f(r,o);if(!(u=l(n,o,r,p,d)))return}if(!o)return p.node;if(!0===u)return n;if(s=t(d,{obj:n,path:p.path.concat(o)}),s.node)return s.rel}}function u(t){var n=this,o=e.link.is(n.rel),r=n.env.graph;n.rel=n.rel||e.rel.ify(t),n.rel[e.rel._]=t,n.node&&n.node[i._]&&(n.node[i._][e.rel._]=t),c(r,o)&&(r[t]=r[o],f(r,o))}function l(t,n,i,r,a){var u;return e.is(t)?!0:s(t)?1:(u=a.invalid)?(t=u.call(a.as||{},t,n,i),l(t,n,i,r,a)):(a.err="Invalid value at '"+r.path.concat(n).join(".")+"'!",void(o.list.is(t)&&(a.err+=" Use `.set(item)` instead of an Array.")))}function p(t,n){for(var o,e=t.seen,i=e.length;i--;)if(o=e[i],n.obj===o.obj)return o;e.push(n)}r.ify=function(n,o,i){var r={path:[],obj:n};return o?"string"==typeof o?o={soul:o}:o instanceof Function&&(o.map=o):o={},o.soul&&(r.rel=e.rel.ify(o.soul)),o.shell=(i||{}).shell,o.graph=o.graph||{},o.seen=o.seen||[],o.as=o.as||i,t(o,r),o.root=r.node,o.graph}}(),r.node=function(t){var n=i.soul(t);if(n)return p({},n,t)},function(){function t(t,n){var o,a;if(i._===n){if(l(t,e.rel._))return;return void(this.obj[n]=h(t))}return(o=e.rel.is(t))?(a=this.opt.seen[o])?void(this.obj[n]=a):void(this.obj[n]=this.opt.seen[o]=r.to(this.graph,o,this.opt)):void(this.obj[n]=t)}r.to=function(n,o,e){if(n){var i={};return e=e||{seen:{}},d(n[o],t,{obj:i,graph:n,opt:e}),i}}}();var a,u=(o.fn.is,o.obj),s=u.is,f=u.del,c=u.has,l=u.empty,p=u.put,d=u.map,h=u.copy;n.exports=r})(t,"./graph"),t(function(n){t("./onto"),n.exports=function(t,n){if(this.on){if(!(t instanceof Function)){if(!t||!n)return;var o=t["#"]||t,e=(this.tag||empty)[o];if(!e)return;return e=this.on(o,n),clearTimeout(e.err),!0}var o=n&&n["#"]||Math.random().toString(36).slice(2);if(!t)return o;var i=this.on(o,t,n);return i.err=i.err||setTimeout(function(){i.next({err:"Error: No ACK received yet.",lack:!0}),i.off()},(this.opt||{}).lack||9e3),o}}})(t,"./ask"),t(function(n){function o(t){var n={s:{}};return t=t||{max:1e3,age:9e3},n.check=function(t){var o;return(o=n.s[t])?o.pass?o.pass=!1:n.track(t):!1},n.track=function(o,r){var a=n.s[o]||(n.s[o]={});return a.was=i(),r&&(a.pass=!0),n.to||(n.to=setTimeout(function(){var o=i();e.obj.map(n.s,function(i,r){i&&t.age>o-i.was||e.obj.del(n.s,r)}),n.to=null},t.age+9)),a},n}var e=t("./type"),i=e.time.is;n.exports=o})(t,"./dup"),t(function(n){function i(t){return t instanceof i?(this._={gun:this,$:this}).$:this instanceof i?i.create(this._={gun:this,$:this,opt:t}):new i(t)}i.is=function(t){return t instanceof i||t&&t._&&t===t._.$||!1},i.version=.9,i.chain=i.prototype,i.chain.toJSON=function(){};var r=t("./type");r.obj.to(r,i),i.HAM=t("./HAM"),i.val=t("./val"),i.node=t("./node"),i.state=t("./state"),i.graph=t("./graph"),i.on=t("./onto"),i.ask=t("./ask"),i.dup=t("./dup"),function(){function t(n){var o,e,r=this,u=r.as,s=u.at||u,f=s.$;return(e=n["#"])||(e=n["#"]=c(9)),(o=s.dup).check(e)?void(u.out===n.out&&(n.out=a,r.to.next(n))):(o.track(e),s.ask(n["@"],n)||(n.get&&i.on.get(n,f),n.put&&i.on.put(n,f)),r.to.next(n),void(u.out||(n.out=t,s.on("out",n))))}i.create=function(n){n.root=n.root||n,n.graph=n.graph||{},n.on=n.on||i.on,n.ask=n.ask||i.ask,n.dup=n.dup||i.dup();var o=n.$.opt(n.opt);return n.once||(n.on("in",t,n),n.on("out",t,{at:n,out:t}),i.on("create",n),n.on("create",n)),n.once=1,o}}(),function(){function t(t,n,o,e){var r=this,a=i.state.is(o,n);if(!a)return r.err="Error: No state on '"+n+"' in node '"+e+"'!";var u=r.graph[e]||k,s=i.state.is(u,n,!0),f=u[n],c=i.HAM(r.machine,a,s,t,f);return c.incoming?(r.put[e]=i.state.to(o,n,r.put[e]),(r.diff||(r.diff={}))[e]=i.state.to(o,n,r.diff[e]),void(r.souls[e]=!0)):void(c.defer&&(r.defer=a<(r.defer||1/0)?a:r.defer))}function n(t,n){var i=this,a=i.$._,u=(a.next||k)[n];if(!u){if(!(a.opt||k)["super"])return void(i.souls[n]=!1);u=i.$.get(n)._}var s=i.map[n]={put:t,get:n,$:u.$},f={ctx:i,msg:s};i.async=!!a.tag.node,i.ack&&(s["@"]=i.ack),v(t,o,f),i.async&&(i.and||a.on("node",function(t){this.to.next(t),t===i.map[t.get]&&(i.souls[t.get]=!1,v(t.put,e,t),v(i.souls,function(t){return t?t:void 0})||i.c||(i.c=1,this.off(),v(i.map,r,i)))}),i.and=!0,a.on("node",s))}function o(t,n){var o=this.ctx,e=o.graph,r=this.msg,a=r.get,u=r.put,s=r.$._;e[a]=i.state.to(u,n,e[a]),o.async||(s.put=i.state.to(u,n,s.put))}function e(t,n){var o=this,e=o.put,r=o.$._;r.put=i.state.to(e,n,r.put)}function r(t){t.$&&(this.cat.stop=this.stop,t.$._.on("in",t),this.cat.stop=null)}i.on.put=function(o,e){var u=e._,s={$:e,graph:u.graph,put:{},map:{},souls:{},machine:i.state(),ack:o["@"],cat:u,stop:{}};return i.graph.is(o.put,null,t,s)||(s.err="Error: Invalid graph!"),s.err?u.on("in",{"@":o["#"],err:i.log(s.err)}):(v(s.put,n,s),s.async||v(s.map,r,s),a!==s.defer&&setTimeout(function(){i.on.put(o,e)},s.defer-s.machine),void(s.diff&&u.on("put",h(o,{put:s.diff}))))},i.on.get=function(t,n){var o,e=n._,r=t.get,a=r[m],u=e.graph[a],s=r[b],f=e.next||(e.next={}),c=f[a];if(d(a,"*")){var l={};i.obj.map(e.graph,function(t,n){i.text.match(n,a)&&(l[n]=i.obj.copy(t))}),i.obj.empty(l)||e.on("in",{"@":t["#"],how:"*",put:l,$:n})}if(!u)return e.on("get",t);if(s){if(!d(u,s))return e.on("get",t);u=i.state.to(u,s)}else u=i.obj.copy(u);u=i.graph.node(u),o=(c||k).ack,e.on("in",{"@":t["#"],how:"mem",put:u,$:n}),e.on("get",t)}}(),function(){i.chain.opt=function(t){t=t||{};var n=this,o=n._,e=t.peers||t;return p(t)||(t={}),p(o.opt)||(o.opt=t),f(e)&&(e=[e]),u(e)&&(e=v(e,function(t,n,o){o(t,{url:t})}),p(o.opt.peers)||(o.opt.peers={}),o.opt.peers=h(e,o.opt.peers)),o.opt.peers=o.opt.peers||{},h(t,o.opt),i.on("opt",o),o.opt.uuid=o.opt.uuid||function(){return g()+c(12)},n}}();var a,u=i.list.is,s=i.text,f=s.is,c=s.random,l=i.obj,p=l.is,d=l.has,h=l.to,v=l.map,g=(l.copy,i.state.lex),m=i.val.rel._,b=".",k=(i.node._,i.val.link.is,{});o.debug=function(t,n){return o.debug.i&&t===o.debug.i&&o.debug.i++&&(o.log.apply(o,arguments)||n)},i.log=function(){return!i.log.off&&o.log.apply(o,arguments),[].slice.call(arguments).join(" ")},i.log.once=function(t,n,o){return(o=i.log.once)[t]=o[t]||0,o[t]++||i.log(n)},i.log.once("welcome","Hello wonderful person! :) Thanks for using GUN, feel free to ask for help on https://gitter.im/amark/gun and ask StackOverflow questions tagged with 'gun'!"),"undefined"!=typeof window&&((window.GUN=window.Gun=i).window=window);try{"undefined"!=typeof e&&(e.exports=i)}catch(y){}n.exports=i})(t,"./root"),t(function(){var n=t("./root");n.chain.back=function(t,i){var r;if(t=t||1,-1===t||1/0===t)return this._.root.$;if(1===t)return(this._.back||this._).$;var a=this,u=a._;if("string"==typeof t&&(t=t.split(".")),!(t instanceof Array)){if(t instanceof Function){for(var s,r={back:u};(r=r.back)&&o===(s=t(r,i)););return s}return n.num.is(t)?(u.back||u).$.back(t-1):this}var f=0,c=t.length,r=u;for(f;c>f;f++)r=(r||e)[t[f]];return o!==r?i?a:r:(r=u.back)?r.$.back(t,i):void 0};var o,e={}})(t,"./back"),t(function(){function n(t){var n,o,e,i=this.as,r=i.back,a=i.root;if(t.I||(t.I=i.$),t.$||(t.$=i.$),this.to.next(t),o=t.get){if(o["#"]||i.soul){if(o["#"]=o["#"]||i.soul,t["#"]||(t["#"]=b(9)),r=a.$.get(o["#"])._,o=o["."]){if(h(r.put,o)&&(n=r.$.get(o)._,(e=n.ack)||(n.ack=-1),r.on("in",{$:r.$,put:c.state.to(r.put,o),get:r.get}),e))return}else{if(e=r.ack,e||(r.ack=-1),h(r,"put")&&r.on("in",r),e)return;t.$=r.$}return a.ask(f,t),a.on("in",t)}if(a.now&&(a.now[i.id]=a.now[i.id]||!0,i.pass={}),o["."])return i.get?(t={get:{".":i.get},$:i.$},r.ask||(r.ask={}),r.ask[i.get]=t.$._,r.on("out",t)):(t={get:{},$:i.$},r.on("out",t));if(i.ack=i.ack||-1,i.get)return t.$=i.$,o["."]=i.get,(r.ask||(r.ask={}))[i.get]=t.$._,r.on("out",t)}return r.on("out",t)}function o(t){var n,o,r=this,s=r.as,f=s.root,d=t.$,b=(d||p)._||p,k=t.put;if(s.get&&t.get!==s.get&&(t=g(t,{get:s.get})),s.has&&b!==s&&(t=g(t,{$:s.$}),b.ack&&(s.ack=b.ack)),l===k){if(o=b.put,r.to.next(t),s.soul)return;if(l===o&&l!==b.put)return;return i(s,t,r),s.has&&u(s,t),v(b.echo,s.id),void v(s.map,b.id)}if(s.soul)return r.to.next(t),i(s,t,r),void(s.next&&m(k,a,{msg:t,cat:s}));if(!(n=c.val.link.is(k)))return c.val.is(k)?(s.has||s.soul?u(s,t):(b.has||b.soul)&&((b.echo||(b.echo={}))[s.id]=b.echo[b.id]||s,(s.map||(s.map={}))[b.id]=s.map[b.id]||{at:b}),r.to.next(t),void i(s,t,r)):(s.has&&b!==s&&h(b,"put")&&(s.put=b.put),(n=c.node.soul(k))&&b.has&&(b.put=s.root.$.get(n)._.put),o=(f.stop||{})[b.id],r.to.next(t),e(s,t,b,n),i(s,t,r),void(s.next&&m(k,a,{msg:t,cat:s})));f.stop;o=f.stop||{},o=o[b.id]||(o[b.id]={}),o.is=o.is||b.put,o[s.id]=b.put||!0,r.to.next(t),e(s,t,b,n),i(s,t,r)}function e(t,n,o,i){if(i&&k!==t.get){var r=t.root.$.get(i)._;t.has?o=r:o.has&&e(o,n,o,i),o!==t&&(o.$||(o={}),(o.echo||(o.echo={}))[t.id]=o.echo[t.id]||t,t.has&&!(t.map||p)[o.id]&&u(t,n),r=o.id?(t.map||(t.map={}))[o.id]=t.map[o.id]||{at:o}:{},(i!==r.link||r.pass||t.pass)&&(t.pass&&(c.obj.map(t.map,function(t){t.pass=!0}),v(t,"pass")),r.pass&&v(r,"pass"),t.has&&(t.link=i),s(t,r.link=i)))}}function i(t,n){t.echo&&m(t.echo,r,n)}function r(t){t&&t.on&&t.on("in",this)}function a(t,n){var o,e,i,r=this.cat,a=r.next||p,u=this.msg;(k!==n||a[n])&&(e=a[n])&&(e.has?(l!==e.put&&c.val.link.is(t)||(e.put=t),o=e.$):(i=u.$)&&(i=(o=u.$.get(n))._,l!==i.put&&c.val.link.is(t)||(i.put=t)),e.on("in",{put:t,get:n,$:o,via:u}))}function u(t,n){if(t.has||t.soul){{var o=t.map;t.root}t.map=null,t.has&&(t.link=null),(t.pass||n["@"]||null!==o)&&(l===o&&c.val.link.is(t.put)||(m(o,function(n){(n=n.at)&&v(n.echo,t.id)}),o=t.put,m(t.next,function(n,e){return l===o&&l!==t.put?!0:(n.put=l,n.ack&&(n.ack=-1),void n.on("in",{get:e,$:n.$,put:l}))})))}}function s(t,n){var o=t.root.$.get(n)._;(!t.ack||(o.on("out",{get:{"#":n}}),t.ask))&&(o=t.ask,c.obj.del(t,"ask"),m(o||t.next,function(t,o){t.on("out",{get:{"#":n,".":o}})}),c.obj.del(t,"ask"))}function f(t){var n=this.as,o=n.get||p,e=n.$._,i=(t.put||p)[o["#"]];if(e.ack&&(e.ack=e.ack+1||1),!t.put||o["."]&&!h(i,e.get)){if(e.put!==l)return;return void e.on("in",{get:e.get,put:e.put=l,$:e.$,"@":t["@"]})}return k==o["."]?void e.on("in",{get:e.get,put:c.val.link.ify(o["#"]),$:e.$,"@":t["@"]}):(t.$=e.root.$,void c.on.put(t,e.root.$))}var c=t("./root");c.chain.chain=function(t){var e,i=this,r=i._,a=new(t||i).constructor(i),u=a._;return u.root=e=r.root,u.id=++e.once,u.back=i._,u.on=c.on,u.on("in",o,u),u.on("out",n,u),a};var l,p={},d=c.obj,h=d.has,v=(d.put,d.del),g=d.to,m=d.map,b=c.text.random,k=(c.val.rel._,c.node._)})(t,"./chain"),t(function(){function n(t,n){var o=n._,e=o.next,i=n.chain(),r=i._;return e||(e=o.next={}),e[r.get=t]=r,n===o.root.$?r.soul=t:(o.soul||o.has)&&(r.has=t),r}function o(t,n,o,e){var i,r=t._;return(i=r.soul)?(n(i,e,r),t):(i=r.link)?(n(i,e,r),t):(t.get(function(t,o){o.rid(t);var r=(r=t.$)&&r._||{};i=r.link||r.soul||c.is(t.put)||l(t.put),n(i,e,t,o)},{out:{get:{".":!0}}}),t)}function e(t){var n,o=this,e=o.as,i=e.at,u=i.root,f=t.$,l=(f||{})._||{},p=t.put||l.put;if((n=u.now)&&o!==n[e.now])return o.to.next(t);if(o.seen&&l.id&&o.seen[l.id])return o.to.next(t);if((n=p)&&n[c._]&&(n=c.is(n))&&(n=(t.$$=l.root.gun.get(n))._,a!==n.put&&(t=s(t,{put:p=n.put}))),(n=u.mum)&&l.id){var d=l.id+(o.id||(o.id=r.text.random(9)));if(n[d])return;a===p||c.is(p)||(n[d]=!0)}return e.use(t,o),o.stun?void(o.stun=null):void o.to.next(t)}function i(t){var n=this.on;if(!t||n.soul||n.has)return this.off();if(t=(t=(t=t.$||t)._||t).id){{var o,e;n.map}return(o=(e=this.seen||(this.seen={}))[t])?!0:void(e[t]=!0)}}var r=t("./root");r.chain.get=function(t,a,u){var s,l;if("string"!=typeof t){if(t instanceof Function){if(!0===a)return o(this,t,a,u);s=this;var d,h=s._,v=h.root,l=v.now;u=a||{},u.at=h,u.use=t,u.out=u.out||{},u.out.get=u.out.get||{},(d=h.on("in",e,u)).rid=i,(v.now={$:1})[u.now=h.id]=d;var g=v.mum;return v.mum={},h.on("out",u.out),v.mum=g,v.now=l,s}return f(t)?this.get(""+t,a,u):(l=c.is(t))?this.get(l,a,u):((u=this.chain())._.err={err:r.log("Invalid get request!",t)},a&&a.call(u,u._.err),u)}var m=this,b=m._,k=b.next||p;return(s=k[t])||(s=n(t,m)),s=s.$,(l=b.stun)&&(s._.stun=s._.stun||l),a&&a instanceof Function&&s.get(a,u),s};var a,u=r.obj,s=(u.has,r.obj.to),f=r.num.is,c=r.val.link,l=r.node.soul,p=(r.node._,{})})(t,"./get"),t(function(){function n(t){t.batch=i;var n=t.opt||{},o=t.env=c.state.map(a,n.state);return o.soul=t.soul,t.graph=c.graph.ify(t.data,o,t),o.err?((t.ack||m).call(t,t.out={err:c.log(o.err)}),void(t.res&&t.res())):void t.batch()}function e(t){return void(t&&t())}function i(){var t=this;t.graph&&!v(t.stun,r)&&(t.res=t.res||function(t){t&&t()},t.res(function(){var n=t.$.back(-1)._,o=n.ask(function(o){n.root.on("ack",o),o.err&&c.log(o),o.lack||this.off(),t.ack&&t.ack(o,this)},t.opt),e=n.root.now;p.del(n.root,"now");var i=n.root.mum;n.root.mum={},t.ref._.on("out",{$:t.ref,put:t.out=t.env.graph,opt:t.opt,"#":o}),n.root.mum=i?p.to(i,n.root.mum):i,n.root.now=e},t),t.res&&t.res())}function r(t){return t?!0:void 0}function a(t,n,o,e){var i=this,r=c.is(t);!n&&e.path.length&&(i.res||b)(function(){var n=e.path,o=i.ref,a=(i.opt,0),s=n.length;for(a;s>a;a++)o=o.get(n[a]);r&&(o=t);var f=o._.dub;return f||(f=c.node.soul(e.obj))?(o.back(-1).get(f),void e.soul(f)):((i.stun=i.stun||{})[n]=!0,void o.get(u,!0,{as:{at:e,as:i,p:n}}))},{as:i,at:e})}function u(t,n,o,e){var n=n.as,i=n.at;n=n.as;var r=((o||{}).$||{})._||{};return t=r.dub=r.dub||t||c.node.soul(i.obj)||c.node.soul(o.put||r.put)||c.val.rel.is(o.put||r.put)||(n.via.back("opt.uuid")||c.text.random)(),e&&(e.stun=!0),t?void s(r,r.dub=t,i,n):void r.via.back("opt.uuid")(function(t,o){return t?c.log(t):void s(r,r.dub=r.dub||o,i,n)})}function s(t,n,o,e){t.$.back(-1).get(n),o.soul(n),e.stun[o.path]=!1,e.batch()}function f(t,n,e,i){if(n=n.as,e.$&&e.$._){if(e.err)return void o.log("Please report this as an issue! Put.any.err");var r,a=e.$._,u=a.put,s=n.opt||{};if(!(r=n.ref)||!r._.now){if(i&&(i.stun=!0),n.ref!==n.$){if(r=n.$._.get||a.get,!r)return void o.log("Please report this as an issue! Put.no.get");n.data=h({},r,n.data),r=null}if(l===u){if(!a.get)return;t||(r=a.$.back(function(t){return t.link||t.soul?t.link||t.soul:void(n.data=h({},t.get,n.data))})),r=r||a.get,a=a.root.$.get(r)._,n.soul=r,u=n.data}return n.not||(n.soul=n.soul||t)||(n.path&&d(n.data)?n.soul=(s.uuid||n.via.back("opt.uuid")||c.text.random)():(k==a.get&&(n.soul=(a.put||g)["#"]||a.dub),n.soul=n.soul||a.soul||a.soul||(s.uuid||n.via.back("opt.uuid")||c.text.random)()),n.soul)?void n.ref.put(n.data,n.soul,n):void n.via.back("opt.uuid")(function(t,o){return t?c.log(t):void n.ref.put(n.data,n.soul=o,n)})}}}var c=t("./root");c.chain.put=function(t,o,i){var r,a=this,u=a._,s=u.root.$;return i=i||{},i.data=t,i.via=i.$=i.via||i.$||a,"string"==typeof o?i.soul=o:i.ack=i.ack||o,u.soul&&(i.soul=u.soul),i.soul||s===a?d(i.data)?(i.soul=i.soul||(i.not=c.node.soul(i.data)||(i.via.back("opt.uuid")||c.text.random)()),i.soul?(i.$=a=s.get(i.soul),i.ref=i.$,n(i),a):(i.via.back("opt.uuid")(function(t,n){return t?c.log(t):void(i.ref||i.$).put(i.data,i.soul=n,i)}),a)):((i.ack||m).call(i,i.out={err:c.log("Data saved to the root level of the graph must be a node (an object), not a",typeof i.data,'of "'+i.data+'"!')}),i.res&&i.res(),a):c.is(t)?(t.get(function(t,n,e){return!t&&c.val.is(e.put)?c.log("The reference you are saving is a",typeof e.put,'"'+e.put+'", not a node (object)!'):void a.put(c.val.rel.ify(t),o,i)},!0),a):(i.ref=i.ref||s._===(r=u.back)?a:r.$,i.ref._.soul&&c.val.is(i.data)&&u.get?(i.data=h({},u.get,i.data),i.ref.put(i.data,i.soul,i),a):(i.ref.get(f,!0,{as:i}),i.out||(i.res=i.res||e,i.$._.stun=i.ref._.stun),a))};var l,p=c.obj,d=p.is,h=p.put,v=p.map,g={},m=function(){},b=function(t,n){t.call(n||g)},k=c.node._})(t,"./put"),t(function(n){var o=t("./root");t("./chain"),t("./back"),t("./put"),t("./get"),n.exports=o})(t,"./index"),t(function(){function n(t,n){{var o,e=this,r=t.$,a=(r||{})._||{},u=a.put||t.put;e.at}if(i!==u){if(o=t.$$){if(o=t.$$._,i===o.put)return;u=o.put}e.change&&(u=t.put),e.as?e.ok.call(e.as,t,n):e.ok.call(r,u,t.get,t,n)}}function o(t,n,r){var u,f,c=this.as,l=(c.at,t.$),p=l._,d=p.put||t.put;return(f=t.$$)&&(u=f=t.$$._,i!==u.put&&(d=u.put)),(f=n.wait)&&(f=f[p.id])&&clearTimeout(f),!r&&(i===d||p.soul||p.link||u&&!(0<u.ack))||i===d&&(f=(a(p.root.opt.peers,function(t,n,o){o(n)})||[]).length)&&!r&&(u||p).ack<=f?void(f=(n.wait={})[p.id]=setTimeout(function(){o.call({as:c},t,n,f||1)},c.wait||99)):(u&&i===u.put&&(f=s.is(d))&&(d=e.node.ify({},f)),n.rid(t),void c.ok.call(l||c.$,d,t.get))}var e=t("./index");e.chain.on=function(t,o,e,i){var r,a=this,u=a._;if("string"==typeof t)return o?(r=u.on(t,o,e||u,i),e&&e.$&&(e.subs||(e.subs=[])).push(r),a):u.on(t);var s=o;return s=!0===s?{change:!0}:s||{},s.at=u,s.ok=t,a.get(n,s),a},e.chain.val=function(t,n){return e.log.once("onceval","Future Breaking API Change: .val -> .once, apologies unexpected."),this.once(t,n)},e.chain.once=function(t,n){var r=this,a=r._,u=a.put;if(0<a.ack&&i!==u)return(t||f).call(r,u,a.get),r;if(!t){e.log.once("valonce","Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");var s=r.chain();return s._.nix=r.once(function(){s._.on("in",r._)}),s}return(n=n||{}).ok=t,n.at=a,n.out={"#":e.text.random(9)},r.get(o,{as:n}),n.async=!0,r},e.chain.off=function(){var t,n=this,o=n._,e=o.back;return e?((t=e.next)&&t[o.get]&&u(t,o.get),(t=e.ask)&&u(t,o.get),(t=e.put)&&u(t,o.get),(t=o.soul)&&u(e.root.graph,t),(t=o.map)&&a(t,function(t){t.link&&e.root.$.get(t.link).off()}),(t=o.next)&&a(t,function(t){t.$.off()}),o.on("off",{}),n):void 0};var i,r=e.obj,a=r.map,u=(r.has,r.del),s=(r.to,e.val.link),f=function(){}})(t,"./on"),t(function(){function n(t){return!t.put||e.val.is(t.put)?this.to.next(t):(this.as.nix&&this.off(),r(t.put,o,{at:this.as,msg:t}),void this.to.next(t))}function o(t,n){if(u!==n){var o=this.msg,e=o.$,i=this.at,r=e.get(n)._;(r.echo||(r.echo={}))[i.id]=r.echo[i.id]||i}}var e=t("./index");e.chain.map=function(t){var o,r=this,u=r._;return t?(e.log.once("mapfn","Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it."),o=r.chain(),r.map().on(function(n,r,u,s){var f=(t||a).call(this,n,r,u,s);if(i!==f)return n===f?o._.on("in",u):e.is(f)?o._.on("in",f._):void o._.on("in",{get:r,put:f})}),o):(o=u.each)?o:(u.each=o=r.chain(),o._.nix=r.back("nix"),r.on("in",n,o._),o)};var i,r=e.obj.map,a=function(){},u=e.node._})(t,"./map"),t(function(){var n=t("./index");n.chain.set=function(t,o,e){var i,r=this;if(o=o||function(){},e=e||{},e.item=e.item||t,i=n.node.soul(t))return r.set(r.back(-1).get(i),o,e);if(!n.is(t)){var a=r.back("opt.uuid")();return a&&n.obj.is(t)?r.set(r._.root.$.put(t,a),o,e):r.get(n.state.lex()+n.text.random(7)).put(t,o,e)}return t.get(function(t,i,a){return t?void r.put(n.obj.put({},t,n.val.link.ify(t)),o,e):o.call(r,{err:n.log('Only a node can be linked! Not "'+a.put+'"!')})},!0),t}})(t,"./set"),t(function(){if("undefined"!=typeof Gun){var t,n=function(){};try{t=(Gun.window||n).localStorage}catch(e){}t||(o.log("Warning: No localStorage exists to persist data to!"),t={setItem:function(t,n){this[t]=n},removeItem:function(t){delete this[t]},getItem:function(t){return this[t]}}),Gun.on("create",function(n){function o(t){if(!t.err&&t.ok){var n=t["@"];setTimeout(function(){Gun.obj.map(u,function(t,o){Gun.obj.map(t,function(o,e){n===o&&delete t[e]}),s(t)&&delete u[o]}),p()},i.wait||1)}}var e=this.to,i=n.opt;if(n.once)return e.next(n);i.prefix=i.file||"gun/";var r,a,u=Gun.obj.ify(t.getItem("gap/"+i.prefix))||{},s=Gun.obj.empty;if(!s(u)){var f=Gun.obj.ify(t.getItem(i.prefix))||{},c={};Gun.obj.map(u,function(t,n){Gun.obj.map(t,function(t,o){c[n]=Gun.state.to(f[n],o,c[n])})}),setTimeout(function(){n.on("out",{put:c,"#":n.ask(o),I:n.$})},1)}n.on("out",function(t){t.lS||(t.I&&t.put&&!t["@"]&&!s(i.peers)&&(r=t["#"],Gun.graph.is(t.put,null,l),a||(a=setTimeout(p,i.wait||1))),this.to.next(t))}),n.on("ack",o),e.next(n);var l=function(t,n,o,e){(u[e]||(u[e]={}))[n]=r},p=function(){clearTimeout(a),a=!1;try{t.setItem("gap/"+i.prefix,JSON.stringify(u))}catch(n){Gun.log(err=n||"localStorage failure")}}}),Gun.on("create",function(n){this.to.next(n);var o=n.opt;if(!n.once&&!1!==o.localStorage){o.prefix=o.file||"gun/";var e,i=(n.graph,{}),r=0,a=Gun.obj.ify(t.getItem(o.prefix))||{};n.on("localStorage",a),n.on("put",function(t){return this.to.next(t),Gun.graph.is(t.put,null,u),t["@"]||(i[t["#"]]=!0),r+=1,r>=(o.batch||1e3)?s():void(e||(e=setTimeout(s,o.wait||1)))}),n.on("get",function(t){function e(){if(s&&(i=s["#"])){var e=s["."];r=a[i]||u,r&&e&&(r=Gun.state.to(r,e)),(r||Gun.obj.empty(o.peers))&&n.on("in",{"@":t["#"],put:Gun.graph.node(r),how:"lS",lS:t.I})}}this.to.next(t);var i,r,u,s=t.get;Gun.debug?setTimeout(e,1):e()});var u=function(t,n,o,e){a[e]=Gun.state.to(o,n,a[e])},s=function(u){var f;r=0,clearTimeout(e),e=!1;var c=i;i={},u&&(a=u);try{t.setItem(o.prefix,JSON.stringify(a))}catch(l){Gun.log(f=(l||"localStorage failure")+" Consider using GUN's IndexedDB plugin for RAD for more storage space, temporary example at https://github.com/amark/gun/blob/master/test/tmp/indexedDB.html ."),n.on("localStorage:error",{err:f,file:o.prefix,flush:a,retry:s})}(f||Gun.obj.empty(o.peers))&&Gun.obj.map(c,function(t,o){n.on("in",{"@":o,err:f,ok:0})})}}})}})(t,"./adapters/localStorage"),t(function(n){function e(t){var n=function(){},u=t.opt||{};return u.log=u.log||o.log,u.gap=u.gap||u.wait||1,u.pack=u.pack||.3*(u.memory?1e3*u.memory*1e3:1399e6),n.out=function(o){var e;return this.to&&this.to.next(o),(e=o["@"])&&(e=t.dup.s[e])&&(e=e.it)&&e.mesh?(n.say(o,e.mesh.via,1),void(e["##"]=o["##"])):void n.say(o)},t.on("create",function(o){o.opt.pid=o.opt.pid||i.text.random(9),this.to.next(o),t.on("out",n.out)}),n.hear=function(o,e){if(o){var r,a,s,f=t.dup,c=o[0];if(u.pack<=o.length)return n.say({dam:"!",err:"Message too big!"},e);try{s=JSON.parse(o)}catch(l){u.log("DAM JSON parse error",l)}if("{"===c){if(!s)return;if(f.check(r=s["#"]))return;if(f.track(r,!0).it=s,(c=s["@"])&&s.put&&(a=s["##"]||(s["##"]=n.hash(s)),(c+=a)!=r)){if(f.check(c))return;(c=f.s)[a]=c[r]}return(s.mesh=function(){}).via=e,(c=s["><"])&&(s.mesh.to=i.obj.map(c.split(","),function(t,n,o){o(t,!0)})),s.dam?void((c=n.hear[s.dam])&&c(s,e,t)):void t.on("in",s)}if("["!==c);else{if(!s)return;for(var p,d=0;p=s[d++];)n.hear(p,e)}}},function(){function o(t){var n=t.batch;if(n&&(t.batch=t.tail=null,n.length))try{e(JSON.stringify(n),t)}catch(o){u.log("DAM JSON stringify error",o)}}function e(t,n){var o=n.wire;try{o.send?o.send(t):n.say&&n.say(t)}catch(e){(n.queue=n.queue||[]).push(t)}}n.say=function(r,s,f){if(!s)return void i.obj.map(u.peers,function(t){n.say(r,t)});var c,l,p,d=s.wire||u.wire&&u.wire(s);if(d&&(l=r.mesh||a,s!==l.via&&((p=l.raw)||(p=n.raw(r)),!((c=r["@"])&&(c=t.dup.s[c])&&(c=c.it)&&c.get&&c["##"]&&c["##"]===r["##"]||(c=l.to)&&(c[s.url]||c[s.id])&&!f)))){if(s.batch){if(s.tail=(s.tail||0)+p.length,s.tail<=u.pack)return void s.batch.push(p);o(s)}s.batch=[],setTimeout(function(){o(s)},u.gap),e(p,s)}}}(),function(){function o(t,n){var o;return n instanceof Object?(i.obj.map(Object.keys(n).sort(),a,{to:o={},on:n}),o):n}function a(t){this.to[t]=this.on[t]}n.raw=function(e){if(!e)return"";var a,c,l,p=t.dup,d=e.mesh||{};if(l=d.raw)return l;if("string"==typeof e)return e;e["@"]&&(l=e.put)&&((c=e["##"])||(a=s(l,o)||"",c=n.hash(e,a),e["##"]=c),(l=p.s)[c=e["@"]+c]=l[e["#"]],e["#"]=c||e["#"],a&&((e=i.obj.to(e)).put=f));var h=0,v=[];i.obj.map(u.peers,function(t){return v.push(t.url||t.id),++h>9?!0:void 0}),e["><"]=v.join();var g=s(e);return r!==a&&(l=g.indexOf(f,g.indexOf("put")),g=g.slice(0,l-1)+a+g.slice(l+f.length+1)),d&&(d.raw=g),g},n.hash=function(t,n){return e.hash(n||s(t.put,o)||"")||t["#"]||i.text.random(9)};var s=JSON.stringify,f=":])([:"}(),n.hi=function(o){var e=o.wire||{};o.id||o.url?(u.peers[o.url||o.id]=o,i.obj.del(u.peers,e.id)):(e=e.id=e.id||i.text.random(9),n.say({dam:"?"},u.peers[e]=o)),e.hied||t.on(e.hied="hi",o),e=o.queue,o.queue=[],i.obj.map(e,function(t){n.say(t,o)})},n.bye=function(n){i.obj.del(u.peers,n.id),t.on("bye",n)},n.hear["!"]=function(t){u.log("Error:",t.err)},n.hear["?"]=function(t,o){return t.pid?(o.id=o.id||t.pid,
void n.hi(o)):n.say({dam:"?",pid:u.pid,"@":t["#"]},o)},n}var i=t("../type");e.hash=function(t){if("string"!=typeof t)return{err:1};var n=0;if(!t.length)return n;for(var o,e=0,i=t.length;i>e;++e)o=t.charCodeAt(e),n=(n<<5)-n+o,n|=0;return n};var r,a={};Object.keys=Object.keys||function(t){return map(t,function(t,n,o){o(n)})};try{n.exports=e}catch(u){}})(t,"./adapters/mesh"),t(function(){var n=t("../index");n.Mesh=t("./mesh"),n.on("opt",function(t){function o(t){try{if(!t||!t.url)return o&&o(t);var n=t.url.replace("http","ws"),o=t.wire=new i.WebSocket(n);return o.onclose=function(){i.mesh.bye(t),e(t)},o.onerror=function(n){e(t),n&&"ECONNREFUSED"===n.code},o.onopen=function(){i.mesh.hi(t)},o.onmessage=function(n){n&&i.mesh.hear(n.data||n,t)},o}catch(r){}}function e(t){clearTimeout(t.defer),t.defer=setTimeout(function(){o(t)},2e3)}this.to.next(t);var i=t.opt;if(!t.once&&!1!==i.WebSocket){var r;"undefined"!=typeof window&&(r=window),"undefined"!=typeof global&&(r=global),r=r||{};var a=i.WebSocket||r.WebSocket||r.webkitWebSocket||r.mozWebSocket;if(a){i.WebSocket=a;{i.mesh=i.mesh||n.Mesh(t),i.wire}i.wire=o}}})})(t,"./adapters/websocket")}();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global,Buffer){
;(function(){

  /* UNBUILD */
  var root;
  if(typeof window !== "undefined"){ root = window }
  if(typeof global !== "undefined"){ root = global }
  root = root || {};
  var console = root.console || {log: function(){}};
  function USE(arg, req){
    return req? require(arg) : arg.slice? USE[R(arg)] : function(mod, path){
      arg(mod = {exports: {}});
      USE[R(path)] = mod.exports;
    }
    function R(p){
      return p.split('/').slice(-1).toString().replace('.js','');
    }
  }
  if(typeof module !== "undefined"){ var common = module }
  /* UNBUILD */

  ;USE(function(module){
    // Security, Encryption, and Authorization: SEA.js
    // MANDATORY READING: https://gun.eco/explainers/data/security.html
    // IT IS IMPLEMENTED IN A POLYFILL/SHIM APPROACH.
    // THIS IS AN EARLY ALPHA!

    if(typeof window !== "undefined"){ module.window = window }

    var tmp = module.window || module;
    var SEA = tmp.SEA || {};

    if(SEA.window = module.window){ SEA.window.SEA = SEA }

    try{ if(typeof common !== "undefined"){ common.exports = SEA } }catch(e){}
    module.exports = SEA;
  })(USE, './root');

  ;USE(function(module){
    var SEA = USE('./root');
    try{ if(SEA.window){
      if(location.protocol.indexOf('s') < 0
      && location.host.indexOf('localhost') < 0
      && location.protocol.indexOf('file:') < 0){
        location.protocol = 'https:'; // WebCrypto does NOT work without HTTPS!
      }
    } }catch(e){}
  })(USE, './https');

  ;USE(function(module){
    // This is Array extended to have .toString(['utf8'|'hex'|'base64'])
    function SeaArray() {}
    Object.assign(SeaArray, { from: Array.from })
    SeaArray.prototype = Object.create(Array.prototype)
    SeaArray.prototype.toString = function(enc, start, end) { enc = enc || 'utf8'; start = start || 0;
      const length = this.length
      if (enc === 'hex') {
        const buf = new Uint8Array(this)
        return [ ...Array(((end && (end + 1)) || length) - start).keys()]
        .map((i) => buf[ i + start ].toString(16).padStart(2, '0')).join('')
      }
      if (enc === 'utf8') {
        return Array.from(
          { length: (end || length) - start },
          (_, i) => String.fromCharCode(this[ i + start])
        ).join('')
      }
      if (enc === 'base64') {
        return btoa(this)
      }
    }
    module.exports = SeaArray;
  })(USE, './array');

  ;USE(function(module){
    // This is Buffer implementation used in SEA. Functionality is mostly
    // compatible with NodeJS 'safe-buffer' and is used for encoding conversions
    // between binary and 'hex' | 'utf8' | 'base64'
    // See documentation and validation for safe implementation in:
    // https://github.com/feross/safe-buffer#update
    var SeaArray = USE('./array');
    function SafeBuffer(...props) {
      console.warn('new SafeBuffer() is depreciated, please use SafeBuffer.from()')
      return SafeBuffer.from(...props)
    }
    SafeBuffer.prototype = Object.create(Array.prototype)
    Object.assign(SafeBuffer, {
      // (data, enc) where typeof data === 'string' then enc === 'utf8'|'hex'|'base64'
      from() {
        if (!Object.keys(arguments).length) {
          throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
        }
        const input = arguments[0]
        let buf
        if (typeof input === 'string') {
          const enc = arguments[1] || 'utf8'
          if (enc === 'hex') {
            const bytes = input.match(/([\da-fA-F]{2})/g)
            .map((byte) => parseInt(byte, 16))
            if (!bytes || !bytes.length) {
              throw new TypeError('Invalid first argument for type \'hex\'.')
            }
            buf = SeaArray.from(bytes)
          } else if (enc === 'utf8') {
            const length = input.length
            const words = new Uint16Array(length)
            Array.from({ length: length }, (_, i) => words[i] = input.charCodeAt(i))
            buf = SeaArray.from(words)
          } else if (enc === 'base64') {
            const dec = atob(input)
            const length = dec.length
            const bytes = new Uint8Array(length)
            Array.from({ length: length }, (_, i) => bytes[i] = dec.charCodeAt(i))
            buf = SeaArray.from(bytes)
          } else if (enc === 'binary') {
            buf = SeaArray.from(input)
          } else {
            console.info('SafeBuffer.from unknown encoding: '+enc)
          }
          return buf
        }
        const byteLength = input.byteLength // what is going on here? FOR MARTTI
        const length = input.byteLength ? input.byteLength : input.length
        if (length) {
          let buf
          if (input instanceof ArrayBuffer) {
            buf = new Uint8Array(input)
          }
          return SeaArray.from(buf || input)
        }
      },
      // This is 'safe-buffer.alloc' sans encoding support
      alloc(length, fill = 0 /*, enc*/ ) {
        return SeaArray.from(new Uint8Array(Array.from({ length: length }, () => fill)))
      },
      // This is normal UNSAFE 'buffer.alloc' or 'new Buffer(length)' - don't use!
      allocUnsafe(length) {
        return SeaArray.from(new Uint8Array(Array.from({ length : length })))
      },
      // This puts together array of array like members
      concat(arr) { // octet array
        if (!Array.isArray(arr)) {
          throw new TypeError('First argument must be Array containing ArrayBuffer or Uint8Array instances.')
        }
        return SeaArray.from(arr.reduce((ret, item) => ret.concat(Array.from(item)), []))
      }
    })
    SafeBuffer.prototype.from = SafeBuffer.from
    SafeBuffer.prototype.toString = SeaArray.prototype.toString

    module.exports = SafeBuffer;
  })(USE, './buffer');

  ;USE(function(module){
    const SEA = USE('./root')
    const Buffer = USE('./buffer')
    const api = {Buffer: Buffer}
    var o = {};

    if(SEA.window){
      api.crypto = window.crypto || window.msCrypto;
      api.subtle = (api.crypto||o).subtle || (api.crypto||o).webkitSubtle;
      api.TextEncoder = window.TextEncoder;
      api.TextDecoder = window.TextDecoder;
      api.random = (len) => Buffer.from(api.crypto.getRandomValues(new Uint8Array(Buffer.alloc(len))))
    }
    if(!api.crypto){try{
      var crypto = USE('crypto', 1);
      const { subtle } = USE('@trust/webcrypto', 1)             // All but ECDH
      const { TextEncoder, TextDecoder } = USE('text-encoding', 1)
      Object.assign(api, {
        crypto,
        subtle,
        TextEncoder,
        TextDecoder,
        random: (len) => Buffer.from(crypto.randomBytes(len))
      });
      //try{
        const WebCrypto = USE('node-webcrypto-ossl', 1)
        api.ossl = new WebCrypto({directory: 'ossl'}).subtle // ECDH
      //}catch(e){
        //console.log("node-webcrypto-ossl is optionally needed for ECDH, please install if needed.");
      //}
    }catch(e){
      console.log("@trust/webcrypto and text-encoding are not included by default, you must add it to your package.json!");
      console.log("node-webcrypto-ossl is temporarily needed for ECDSA signature verification, and optionally needed for ECDH, please install if needed (currently necessary so add them to your package.json for now).");
      TRUST_WEBCRYPTO_OR_TEXT_ENCODING_NOT_INSTALLED;
    }}

    module.exports = api
  })(USE, './shim');

  ;USE(function(module){
    const SEA = USE('./root');
    const Buffer = USE('./buffer')
    const settings = {}
    // Encryption parameters
    const pbkdf2 = { hash: 'SHA-256', iter: 100000, ks: 64 }

    const ecdsaSignProps = { name: 'ECDSA', hash: { name: 'SHA-256' } }
    const ecdsaKeyProps = { name: 'ECDSA', namedCurve: 'P-256' }
    const ecdhKeyProps = { name: 'ECDH', namedCurve: 'P-256' }

    const _initial_authsettings = {
      validity: 12 * 60 * 60, // internally in seconds : 12 hours
      hook: (props) => props  // { iat, exp, alias, remember }
      // or return new Promise((resolve, reject) => resolve(props)
    }
    // These are used to persist user's authentication "session"
    const authsettings = Object.assign({}, _initial_authsettings)
    // This creates Web Cryptography API compliant JWK for sign/verify purposes
    const keysToEcdsaJwk = (pub, d) => {  // d === priv
      //const [ x, y ] = Buffer.from(pub, 'base64').toString('utf8').split(':') // old
      const [ x, y ] = pub.split('.') // new
      var jwk = { kty: "EC", crv: "P-256", x: x, y: y, ext: true }
      jwk.key_ops = d ? ['sign'] : ['verify'];
      if(d){ jwk.d = d }
      return jwk;
    }

    Object.assign(settings, {
      pbkdf2: pbkdf2,
      ecdsa: {
        pair: ecdsaKeyProps,
        sign: ecdsaSignProps
      },
      ecdh: ecdhKeyProps,
      jwk: keysToEcdsaJwk,
      recall: authsettings
    })
    SEA.opt = settings;
    module.exports = settings
  })(USE, './settings');

  ;USE(function(module){
    module.exports = (props) => {
      try {
        if(props.slice && 'SEA{' === props.slice(0,4)){
          props = props.slice(3);
        }
        return props.slice ? JSON.parse(props) : props
      } catch (e) {}  //eslint-disable-line no-empty
      return props
    }
  })(USE, './parse');

  ;USE(function(module){
    const shim = USE('./shim');
    const Buffer = USE('./buffer')
    const parse = USE('./parse')
    const { pbkdf2 } = USE('./settings')
    // This internal func returns SHA-256 hashed data for signing
    const sha256hash = async (mm) => {
      const m = parse(mm)
      const hash = await shim.subtle.digest({name: pbkdf2.hash}, new shim.TextEncoder().encode(m))
      return Buffer.from(hash)
    }
    module.exports = sha256hash
  })(USE, './sha256');

  ;USE(function(module){
    // This internal func returns SHA-1 hashed data for KeyID generation
    const __shim = USE('./shim')
    const subtle = __shim.subtle
    const ossl = __shim.ossl ? __shim.ossl : subtle
    const sha1hash = (b) => ossl.digest({name: 'SHA-1'}, new ArrayBuffer(b))
    module.exports = sha1hash
  })(USE, './sha1');

  ;USE(function(module){
    var SEA = USE('./root');
    var shim = USE('./shim');
    var S = USE('./settings');
    var sha = USE('./sha256');
    var u;

    SEA.work = SEA.work || (async (data, pair, cb, opt) => { try { // used to be named `proof`
      var salt = (pair||{}).epub || pair; // epub not recommended, salt should be random!
      var opt = opt || {};
      if(salt instanceof Function){
        cb = salt;
        salt = u;
      }
      salt = salt || shim.random(9);
      if('SHA-256' === opt.name){
        var rsha = shim.Buffer.from(await sha(data), 'binary').toString(opt.encode || 'base64')
        if(cb){ try{ cb(rsha) }catch(e){console.log(e)} }
        return rsha;
      }
      const key = await (shim.ossl || shim.subtle).importKey(
        'raw', new shim.TextEncoder().encode(data), { name: opt.name || 'PBKDF2' }, false, ['deriveBits']
      )
      const result = await (shim.ossl || shim.subtle).deriveBits({
        name: opt.name || 'PBKDF2',
        iterations: opt.iterations || S.pbkdf2.iter,
        salt: new shim.TextEncoder().encode(opt.salt || salt),
        hash: opt.hash || S.pbkdf2.hash,
      }, key, opt.length || (S.pbkdf2.ks * 8))
      data = shim.random(data.length)  // Erase data in case of passphrase
      const r = shim.Buffer.from(result, 'binary').toString(opt.encode || 'base64')
      if(cb){ try{ cb(r) }catch(e){console.log(e)} }
      return r;
    } catch(e) { 
      SEA.err = e;
      if(SEA.throw){ throw e }
      if(cb){ cb() }
      return;
    }});

    module.exports = SEA.work;
  })(USE, './work');

  ;USE(function(module){
    var SEA = USE('./root');
    var shim = USE('./shim');
    var S = USE('./settings');
    var Buff = (typeof Buffer !== 'undefined')? Buffer : shim.Buffer;

    SEA.name = SEA.name || (async (cb, opt) => { try {
      if(cb){ try{ cb() }catch(e){console.log(e)} }
      return;
    } catch(e) {
      console.log(e);
      SEA.err = e;
      if(SEA.throw){ throw e }
      if(cb){ cb() }
      return;
    }});

    //SEA.pair = async (data, proof, cb) => { try {
    SEA.pair = SEA.pair || (async (cb, opt) => { try {

      const ecdhSubtle = shim.ossl || shim.subtle
      // First: ECDSA keys for signing/verifying...
      var sa = await shim.subtle.generateKey(S.ecdsa.pair, true, [ 'sign', 'verify' ])
      .then(async (keys) => {
        // privateKey scope doesn't leak out from here!
        //const { d: priv } = await shim.subtle.exportKey('jwk', keys.privateKey)
        const key = {};
        key.priv = (await shim.subtle.exportKey('jwk', keys.privateKey)).d;
        const pub = await shim.subtle.exportKey('jwk', keys.publicKey)
        //const pub = Buff.from([ x, y ].join(':')).toString('base64') // old
        key.pub = pub.x+'.'+pub.y // new
        // x and y are already base64
        // pub is UTF8 but filename/URL safe (https://www.ietf.org/rfc/rfc3986.txt)
        // but split on a non-base64 letter.
        return key;
      })
      
      // To include PGPv4 kind of keyId:
      // const pubId = await SEA.keyid(keys.pub)
      // Next: ECDH keys for encryption/decryption...

      try{
      var dh = await ecdhSubtle.generateKey(S.ecdh, true, ['deriveKey'])
      .then(async (keys) => {
        // privateKey scope doesn't leak out from here!
        const key = {};
        key.epriv = (await ecdhSubtle.exportKey('jwk', keys.privateKey)).d;
        const pub = await ecdhSubtle.exportKey('jwk', keys.publicKey)
        //const epub = Buff.from([ ex, ey ].join(':')).toString('base64') // old
        key.epub = pub.x+'.'+pub.y // new
        // ex and ey are already base64
        // epub is UTF8 but filename/URL safe (https://www.ietf.org/rfc/rfc3986.txt)
        // but split on a non-base64 letter.
        return key;
      })
      }catch(e){
        if(SEA.window){ throw e }
        if(e == 'Error: ECDH is not a supported algorithm'){ console.log('Ignoring ECDH...') }
        else { throw e }
      } dh = dh || {};

      const r = { pub: sa.pub, priv: sa.priv, /* pubId, */ epub: dh.epub, epriv: dh.epriv }
      if(cb){ try{ cb(r) }catch(e){console.log(e)} }
      return r;
    } catch(e) {
      console.log(e);
      SEA.err = e;
      if(SEA.throw){ throw e }
      if(cb){ cb() }
      return;
    }});

    module.exports = SEA.pair;
  })(USE, './pair');

  ;USE(function(module){
    var SEA = USE('./root');
    var shim = USE('./shim');
    var S = USE('./settings');
    var sha256hash = USE('./sha256');
    var u;

    SEA.sign = SEA.sign || (async (data, pair, cb, opt) => { try {
      opt = opt || {};
      if(!(pair||opt).priv){
        pair = await SEA.I(null, {what: data, how: 'sign', why: opt.why});
      }
      const pub = pair.pub
      const priv = pair.priv
      const jwk = S.jwk(pub, priv)
      const hash = await sha256hash(JSON.stringify(data))
      const sig = await (shim.ossl || shim.subtle).importKey('jwk', jwk, S.ecdsa.pair, false, ['sign'])
      .then((key) => (shim.ossl || shim.subtle).sign(S.ecdsa.sign, key, new Uint8Array(hash))) // privateKey scope doesn't leak out from here!
      const r = 'SEA'+JSON.stringify({m: data, s: shim.Buffer.from(sig, 'binary').toString(opt.encode || 'base64')});

      if(cb){ try{ cb(r) }catch(e){console.log(e)} }
      return r;
    } catch(e) {
      console.log(e);
      SEA.err = e;
      if(SEA.throw){ throw e }
      if(cb){ cb() }
      return;
    }});

    module.exports = SEA.sign;
  })(USE, './sign');

  ;USE(function(module){
    var SEA = USE('./root');
    var shim = USE('./shim');
    var S = USE('./settings');
    var sha256hash = USE('./sha256');
    var parse = USE('./parse');
    var u;

    SEA.verify = SEA.verify || (async (data, pair, cb, opt) => { try {
      const json = parse(data)
      if(false === pair){ // don't verify!
        const raw = (json !== data)?
          (json.s && json.m)? parse(json.m) : data
        : json;
        if(cb){ try{ cb(raw) }catch(e){console.log(e)} }
        return raw;
      }
      opt = opt || {};
      // SEA.I // verify is free! Requires no user permission.
      if(json === data){ throw "No signature on data." }
      const pub = pair.pub || pair
      const jwk = S.jwk(pub)
      const key = await (shim.ossl || shim.subtle).importKey('jwk', jwk, S.ecdsa.pair, false, ['verify'])
      const hash = await sha256hash(json.m)
      var buf; var sig; var check; try{
        buf = shim.Buffer.from(json.s, opt.encode || 'base64') // NEW DEFAULT!
        sig = new Uint8Array(buf)
        check = await (shim.ossl || shim.subtle).verify(S.ecdsa.sign, key, sig, new Uint8Array(hash))
        if(!check){ throw "Signature did not match." }
      }catch(e){
        buf = shim.Buffer.from(json.s, 'utf8') // AUTO BACKWARD OLD UTF8 DATA!
        sig = new Uint8Array(buf)
        check = await (shim.ossl || shim.subtle).verify(S.ecdsa.sign, key, sig, new Uint8Array(hash))
        if(!check){ throw "Signature did not match." }
      }
      const r = check? parse(json.m) : u;

      if(cb){ try{ cb(r) }catch(e){console.log(e)} }
      return r;
    } catch(e) {
      console.log(e); // mismatched owner FOR MARTTI
      SEA.err = e;
      if(SEA.throw){ throw e }
      if(cb){ cb() }
      return;
    }});

    module.exports = SEA.verify;
  })(USE, './verify');

  ;USE(function(module){
    var shim = USE('./shim');
    var sha256hash = USE('./sha256');

    const importGen = async (key, salt, opt) => {
      //const combo = shim.Buffer.concat([shim.Buffer.from(key, 'utf8'), salt || shim.random(8)]).toString('utf8') // old
      var opt = opt || {};
      const combo = key + (salt || shim.random(8)).toString('utf8'); // new
      const hash = shim.Buffer.from(await sha256hash(combo), 'binary')
      return await shim.subtle.importKey('raw', new Uint8Array(hash), opt.name || 'AES-GCM', false, ['encrypt', 'decrypt'])
    }
    module.exports = importGen;
  })(USE, './aeskey');

  ;USE(function(module){
    var SEA = USE('./root');
    var shim = USE('./shim');
    var S = USE('./settings');
    var aeskey = USE('./aeskey');

    SEA.encrypt = SEA.encrypt || (async (data, pair, cb, opt) => { try {
      opt = opt || {};
      var key = (pair||opt).epriv || pair;
      if(!key){
        pair = await SEA.I(null, {what: data, how: 'encrypt', why: opt.why});
        key = pair.epriv || pair;
      }
      const msg = JSON.stringify(data)
      const rand = {s: shim.random(8), iv: shim.random(16)};
      const ct = await aeskey(key, rand.s, opt)
      .then((aes) => (/*shim.ossl ||*/ shim.subtle).encrypt({ // Keeping the AES key scope as private as possible...
        name: opt.name || 'AES-GCM', iv: new Uint8Array(rand.iv)
      }, aes, new shim.TextEncoder().encode(msg)))
      const r = 'SEA'+JSON.stringify({
        ct: shim.Buffer.from(ct, 'binary').toString(opt.encode || 'base64'),
        iv: rand.iv.toString(opt.encode || 'base64'),
        s: rand.s.toString(opt.encode || 'base64')
      });

      if(cb){ try{ cb(r) }catch(e){console.log(e)} }
      return r;
    } catch(e) { 
      SEA.err = e;
      if(SEA.throw){ throw e }
      if(cb){ cb() }
      return;
    }});

    module.exports = SEA.encrypt;
  })(USE, './encrypt');

  ;USE(function(module){
    var SEA = USE('./root');
    var shim = USE('./shim');
    var S = USE('./settings');
    var aeskey = USE('./aeskey');
    var parse = USE('./parse');

    SEA.decrypt = SEA.decrypt || (async (data, pair, cb, opt) => { try {
      opt = opt || {};
      var key = (pair||opt).epriv || pair;
      if(!key){
        pair = await SEA.I(null, {what: data, how: 'decrypt', why: opt.why});
        key = pair.epriv || pair;
      }
      const json = parse(data)

      var buf; try{buf = shim.Buffer.from(json.s, opt.encode || 'base64') // NEW DEFAULT!
      }catch(e){buf = shim.Buffer.from(json.s, 'utf8')} // AUTO BACKWARD OLD UTF8 DATA!
      var bufiv; try{bufiv = shim.Buffer.from(json.iv, opt.encode || 'base64') // NEW DEFAULT!
      }catch(e){bufiv = shim.Buffer.from(json.iv, 'utf8')} // AUTO BACKWARD OLD UTF8 DATA!
      var bufct; try{bufct = shim.Buffer.from(json.ct, opt.encode || 'base64') // NEW DEFAULT!
      }catch(e){bufct = shim.Buffer.from(json.ct, 'utf8')} // AUTO BACKWARD OLD UTF8 DATA!

      const ct = await aeskey(key, buf, opt)
      .then((aes) => (/*shim.ossl ||*/ shim.subtle).decrypt({  // Keeping aesKey scope as private as possible...
        name: opt.name || 'AES-GCM', iv: new Uint8Array(bufiv)
      }, aes, new Uint8Array(bufct)))
      const r = parse(new shim.TextDecoder('utf8').decode(ct))
      if(cb){ try{ cb(r) }catch(e){console.log(e)} }
      return r;
    } catch(e) { 
      SEA.err = e;
      if(SEA.throw){ throw e }
      if(cb){ cb() }
      return;
    }});

    module.exports = SEA.decrypt;
  })(USE, './decrypt');

  ;USE(function(module){
    var SEA = USE('./root');
    var shim = USE('./shim');
    var S = USE('./settings');
    // Derive shared secret from other's pub and my epub/epriv 
    SEA.secret = SEA.secret || (async (key, pair, cb, opt) => { try {
      opt = opt || {};
      if(!pair || !pair.epriv || !pair.epub){
        pair = await SEA.I(null, {what: key, how: 'secret', why: opt.why});
      }
      const pub = key.epub || key
      const epub = pair.epub
      const epriv = pair.epriv
      const ecdhSubtle = shim.ossl || shim.subtle
      const pubKeyData = keysToEcdhJwk(pub)
      const props = Object.assign(
        S.ecdh,
        { public: await ecdhSubtle.importKey(...pubKeyData, true, []) }
      )
      const privKeyData = keysToEcdhJwk(epub, epriv)
      const derived = await ecdhSubtle.importKey(...privKeyData, false, ['deriveKey'])
      .then(async (privKey) => {
        // privateKey scope doesn't leak out from here!
        const derivedKey = await ecdhSubtle.deriveKey(props, privKey, { name: 'AES-GCM', length: 256 }, true, [ 'encrypt', 'decrypt' ])
        return ecdhSubtle.exportKey('jwk', derivedKey).then(({ k }) => k)
      })
      const r = derived;
      if(cb){ try{ cb(r) }catch(e){console.log(e)} }
      return r;
    } catch(e) { 
      SEA.err = e;
      if(SEA.throw){ throw e }
      if(cb){ cb() }
      return;
    }});

    const keysToEcdhJwk = (pub, d) => { // d === priv
      //const [ x, y ] = Buffer.from(pub, 'base64').toString('utf8').split(':') // old
      const [ x, y ] = pub.split('.') // new
      const jwk = d ? { d: d } : {}
      return [  // Use with spread returned value...
        'jwk',
        Object.assign(
          jwk,
          { x: x, y: y, kty: 'EC', crv: 'P-256', ext: true }
        ), // ??? refactor
        S.ecdh
      ]
    }

    module.exports = SEA.secret;
  })(USE, './secret');

  ;USE(function(module){
    var shim = USE('./shim');
    // Practical examples about usage found from ./test/common.js
    var SEA = USE('./root');
    SEA.work = USE('./work');
    SEA.sign = USE('./sign');
    SEA.verify = USE('./verify');
    SEA.encrypt = USE('./encrypt');
    SEA.decrypt = USE('./decrypt');

    SEA.random = SEA.random || shim.random;

    // This is Buffer used in SEA and usable from Gun/SEA application also.
    // For documentation see https://nodejs.org/api/buffer.html
    SEA.Buffer = SEA.Buffer || USE('./buffer');

    // These SEA functions support now ony Promises or
    // async/await (compatible) code, use those like Promises.
    //
    // Creates a wrapper library around Web Crypto API
    // for various AES, ECDSA, PBKDF2 functions we called above.
    // Calculate public key KeyID aka PGPv4 (result: 8 bytes as hex string)
    SEA.keyid = SEA.keyid || (async (pub) => {
      try {
        // base64('base64(x):base64(y)') => Buffer(xy)
        const pb = Buffer.concat(
          pub.replace(/-/g, '+').replace(/_/g, '/').split('.')
          .map((t) => Buffer.from(t, 'base64'))
        )
        // id is PGPv4 compliant raw key
        const id = Buffer.concat([
          Buffer.from([0x99, pb.length / 0x100, pb.length % 0x100]), pb
        ])
        const sha1 = await sha1hash(id)
        const hash = Buffer.from(sha1, 'binary')
        return hash.toString('hex', hash.length - 8)  // 16-bit ID as hex
      } catch (e) {
        console.log(e)
        throw e
      }
    });
    // all done!
    // Obviously it is missing MANY necessary features. This is only an alpha release.
    // Please experiment with it, audit what I've done so far, and complain about what needs to be added.
    // SEA should be a full suite that is easy and seamless to use.
    // Again, scroll naer the top, where I provide an EXAMPLE of how to create a user and sign in.
    // Once logged in, the rest of the code you just read handled automatically signing/validating data.
    // But all other behavior needs to be equally easy, like opinionated ways of
    // Adding friends (trusted public keys), sending private messages, etc.
    // Cheers! Tell me what you think.
    var Gun = (SEA.window||{}).Gun || USE('./gun', 1);
    Gun.SEA = SEA;
    SEA.GUN = SEA.Gun = Gun;

    module.exports = SEA
  })(USE, './sea');

  ;USE(function(module){
    var Gun = USE('./sea').Gun;
    Gun.chain.then = function(cb){
      var gun = this, p = (new Promise(function(res, rej){
        gun.once(res);
      }));
      return cb? p.then(cb) : p;
    }
  })(USE, './then');

  ;USE(function(module){
    var SEA = USE('./sea');
    var Gun = SEA.Gun;
    var then = USE('./then');

    function User(root){ 
      this._ = {$: this};
    }
    User.prototype = (function(){ function F(){}; F.prototype = Gun.chain; return new F() }()) // Object.create polyfill
    User.prototype.constructor = User;

    // let's extend the gun chain with a `user` function.
    // only one user can be logged in at a time, per gun instance.
    Gun.chain.user = function(pub){
      var gun = this, root = gun.back(-1), user;
      if(pub){ return root.get('~'+pub) }
      if(user = root.back('user')){ return user }
      var root = (root._), at = root, uuid = at.opt.uuid || Gun.state.lex;
      (at = (user = at.user = gun.chain(new User))._).opt = {};
      at.opt.uuid = function(cb){
        var id = uuid(), pub = root.user;
        if(!pub || !(pub = pub.is) || !(pub = pub.pub)){ return id }
        id = id + '~' + pub + '.';
        if(cb && cb.call){ cb(null, id) }
        return id;
      }
      return user;
    }
    Gun.User = User;
    module.exports = User;
  })(USE, './user');

  ;USE(function(module){
    // TODO: This needs to be split into all separate functions.
    // Not just everything thrown into 'create'.

    var SEA = USE('./sea');
    var User = USE('./user');
    var authsettings = USE('./settings');
    var Gun = SEA.Gun;

    var noop = function(){};

    // Well first we have to actually create a user. That is what this function does.
    User.prototype.create = function(alias, pass, cb, opt){
      var gun = this, cat = (gun._), root = gun.back(-1);
      cb = cb || noop;
      if(cat.ing){
        cb({err: Gun.log("User is already being created or authenticated!"), wait: true});
        return gun;
      }
      cat.ing = true;
      opt = opt || {};
      var act = {}, u;
      act.a = function(pubs){
        act.pubs = pubs;
        if(pubs && !opt.already){
          // If we can enforce that a user name is already taken, it might be nice to try, but this is not guaranteed.
          var ack = {err: Gun.log('User already created!')};
          cat.ing = false;
          cb(ack);
          gun.leave();
          return;
        }
        act.salt = Gun.text.random(64); // pseudo-randomly create a salt, then use PBKDF2 function to extend the password with it.
        SEA.work(pass, act.salt, act.b); // this will take some short amount of time to produce a proof, which slows brute force attacks.
      }
      act.b = function(proof){
        act.proof = proof;
        SEA.pair(act.c); // now we have generated a brand new ECDSA key pair for the user account.
      }
      act.c = function(pair){ var tmp;
        act.pair = pair || {};
        if(tmp = cat.root.user){
          tmp._.sea = pair;
          tmp.is = {pub: pair.pub, epub: pair.epub, alias: alias};
        }
        // the user's public key doesn't need to be signed. But everything else needs to be signed with it! // we have now automated it! clean up these extra steps now!
        act.data = {pub: pair.pub};
        SEA.sign(alias, pair, act.d); 
      }
      act.d = function(sig){
        act.data.alias = alias || sig;
        SEA.sign(act.pair.epub, act.pair, act.e);
      }
      act.e = function(epub){
        act.data.epub = act.pair.epub || epub; 
        SEA.encrypt({priv: act.pair.priv, epriv: act.pair.epriv}, act.proof, act.f); // to keep the private key safe, we AES encrypt it with the proof of work!
      }
      act.f = function(auth){
        act.data.auth = JSON.stringify({ek: auth, s: act.salt}); 
        SEA.sign({ek: auth, s: act.salt}, act.pair, act.g);
      }
      act.g = function(auth){ var tmp;
        act.data.auth = act.data.auth || auth;
        root.get(tmp = '~'+act.pair.pub).put(act.data); // awesome, now we can actually save the user with their public key as their ID.
        root.get('~@'+alias).put(Gun.obj.put({}, tmp, Gun.val.link.ify(tmp))); // next up, we want to associate the alias with the public key. So we add it to the alias list.
        setTimeout(function(){ // we should be able to delete this now, right?
        cat.ing = false;
        cb({ok: 0, pub: act.pair.pub}); // callback that the user has been created. (Note: ok = 0 because we didn't wait for disk to ack)
        if(noop === cb){ gun.auth(alias, pass) } // if no callback is passed, auto-login after signing up.
        },10);
      }
      root.get('~@'+alias).once(act.a);
      return gun;
    }
    // now that we have created a user, we want to authenticate them!
    User.prototype.auth = function(alias, pass, cb, opt){
      var gun = this, cat = (gun._), root = gun.back(-1);
      cb = cb || function(){};
      if(cat.ing){
        cb({err: Gun.log("User is already being created or authenticated!"), wait: true});
        return gun;
      }
      cat.ing = true;
      opt = opt || {};
      var pair = (alias && (alias.pub || alias.epub))? alias : (pass && (pass.pub || pass.epub))? pass : null;
      var act = {}, u;
      act.a = function(data){
        if(!data){ return act.b() }
        if(!data.pub){
          var tmp = [];
          Gun.node.is(data, function(v){ tmp.push(v) })
          return act.b(tmp);
        }
        if(act.name){ return act.f(data) }
        act.c((act.data = data).auth);
      }
      act.b = function(list){
        var get = (act.list = (act.list||[]).concat(list||[])).shift();
        if(u === get){
          if(act.name){ return act.err('Your user account is not published for dApps to access, please consider syncing it online, or allowing local access by adding your device as a peer.') }
          return act.err('Wrong user or password.') 
        }
        root.get(get).once(act.a);
      }
      act.c = function(auth){
        if(u === auth){ return act.b() }
        if(Gun.text.is(auth)){ return act.c(Gun.obj.ify(auth)) } // new format
        SEA.work(pass, (act.auth = auth).s, act.d, act.enc); // the proof of work is evidence that we've spent some time/effort trying to log in, this slows brute force.
      }
      act.d = function(proof){
        SEA.decrypt(act.auth.ek, proof, act.e, act.enc);
      }
      act.e = function(half){
        if(u === half){
          if(!act.enc){ // try old format
            act.enc = {encode: 'utf8'};
            return act.c(act.auth);
          } act.enc = null; // end backwards
          return act.b();
        }
        act.half = half;
        act.f(act.data);
      }
      act.f = function(data){
        if(!data || !data.pub){ return act.b() }
        var tmp = act.half || {};
        act.g({pub: data.pub, epub: data.epub, priv: tmp.priv, epriv: tmp.epriv});
      }
      act.g = function(pair){
        act.pair = pair;
        var user = (root._).user, at = (user._);
        var tmp = at.tag;
        var upt = at.opt;
        at = user._ = root.get('~'+pair.pub)._;
        at.opt = upt;
        // add our credentials in-memory only to our root user instance
        user.is = {pub: pair.pub, epub: pair.epub, alias: alias};
        at.sea = act.pair;
        cat.ing = false;
        if(pass && !Gun.text.is(act.data.auth)){ opt.shuffle = opt.change = pass; } // migrate UTF8 + Shuffle! Test against NAB alias test_sea_shuffle + passw0rd
        opt.change? act.z() : cb(at);
        if(SEA.window && ((gun.back('user')._).opt||opt).remember){
          // TODO: this needs to be modular.
          try{var sS = {};
          sS = window.sessionStorage;
          sS.recall = true;
          sS.alias = alias;
          sS.tmp = pass;
          }catch(e){}
        }
        try{
          (root._).on('auth', at) // TODO: Deprecate this, emit on user instead! Update docs when you do.
          //at.on('auth', at) // Arrgh, this doesn't work without event "merge" code, but "merge" code causes stack overflow and crashes after logging in & trying to write data.
        }catch(e){
          Gun.log("Your 'auth' callback crashed with:", e);
        }
      }
      act.z = function(){
        // password update so encrypt private key using new pwd + salt
        act.salt = Gun.text.random(64); // pseudo-random
        SEA.work(opt.change, act.salt, act.y);
      }
      act.y = function(proof){
        SEA.encrypt({priv: act.pair.priv, epriv: act.pair.epriv}, proof, act.x);
      }
      act.x = function(auth){
        act.w(JSON.stringify({ek: auth, s: act.salt}));
        //SEA.sign({ek: auth, s: act.salt}, act.pair, act.w);
      }
      act.w = function(auth){
        if(opt.shuffle){ // delete in future!
          var tmp = Gun.obj.to(act.data);
          Gun.obj.del(tmp, '_');
          tmp.auth = auth;
          console.log('migrate core account from UTF8 & shuffle', tmp);
          root.get('~'+act.pair.pub).put(tmp);
        } // end delete
        root.get('~'+act.pair.pub).get('auth').put(auth, cb);
      }
      act.err = function(e){
        var ack = {err: Gun.log(e || 'User cannot be found!')};
        cat.ing = false;
        cb(ack);
      }
      act.plugin = function(name){
        if(!(act.name = name)){ return act.err() }
        var tmp = [name];
        if('~' !== name[0]){
          tmp[1] = '~'+name;
          tmp[2] = '~@'+name;
        }
        act.b(tmp);
      }
      if(pair){
        act.g(pair);
      } else
      if(alias){
        root.get('~@'+alias).once(act.a);
      } else
      if(!alias && !pass){
        SEA.name(act.plugin);
      }
      return gun;
    }
    User.prototype.pair = function(){
      console.log("user.pair() IS DEPRECATED AND WILL BE DELETED!!!");
      var user = this;
      if(!user.is){ return false }
      return user._.sea;
    }
    User.prototype.leave = function(opt, cb){
      var gun = this, user = (gun.back(-1)._).user;
      if(user){
        delete user.is;
        delete user._.is;
        delete user._.sea;
      }
      if(SEA.window){
        try{var sS = {};
        sS = window.sessionStorage;
        delete sS.alias;
        delete sS.tmp;
        delete sS.recall;
        }catch(e){};
      }
      return gun;
    }
    // If authenticated user wants to delete his/her account, let's support it!
    User.prototype.delete = async function(alias, pass, cb){
      var gun = this, root = gun.back(-1), user = gun.back('user');
      try {
        user.auth(alias, pass, function(ack){
          var pub = (user.is||{}).pub;
          // Delete user data
          user.map().once(function(){ this.put(null) });
          // Wipe user data from memory
          user.leave();
          (cb || noop)({ok: 0});
        });
      } catch (e) {
        Gun.log('User.delete failed! Error:', e);
      }
      return gun;
    }
    User.prototype.recall = function(opt, cb){
      var gun = this, root = gun.back(-1), tmp;
      opt = opt || {};
      if(opt && opt.sessionStorage){
        if(SEA.window){
          try{var sS = {};
          sS = window.sessionStorage;
          if(sS){
            (root._).opt.remember = true;
            ((gun.back('user')._).opt||opt).remember = true;
            if(sS.recall || (sS.alias && sS.tmp)){
              root.user().auth(sS.alias, sS.tmp, cb);
            }
          }
          }catch(e){}
        }
        return gun;
      }
      /*
        TODO: copy mhelander's expiry code back in.
        Although, we should check with community,
        should expiry be core or a plugin?
      */
      return gun;
    }
    User.prototype.alive = async function(){
      const gunRoot = this.back(-1)
      try {
        // All is good. Should we do something more with actual recalled data?
        await authRecall(gunRoot)
        return gunRoot._.user._
      } catch (e) {
        const err = 'No session!'
        Gun.log(err)
        throw { err }
      }
    }
    User.prototype.trust = async function(user){
      // TODO: BUG!!! SEA `node` read listener needs to be async, which means core needs to be async too.
      //gun.get('alice').get('age').trust(bob);
      if (Gun.is(user)) {
        user.get('pub').get((ctx, ev) => {
          console.log(ctx, ev)
        })
      }
    }
    User.prototype.grant = function(to, cb){
      console.log("`.grant` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
      var gun = this, user = gun.back(-1).user(), pair = user.pair(), path = '';
      gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
      (async function(){
      var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
      sec = await SEA.decrypt(sec, pair);
      if(!sec){
        sec = SEA.random(16).toString();
        enc = await SEA.encrypt(sec, pair);
        user.get('trust').get(pair.pub).get(path).put(enc);
      }
      var pub = to.get('pub').then();
      var epub = to.get('epub').then();
      pub = await pub; epub = await epub;
      var dh = await SEA.secret(epub, pair);
      enc = await SEA.encrypt(sec, dh);
      user.get('trust').get(pub).get(path).put(enc, cb);
      }());
      return gun;
    }
    User.prototype.secret = function(data, cb){
      console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
      var gun = this, user = gun.back(-1).user(), pair = user.pair(), path = '';
      gun.back(function(at){ if(at.is){ return } path += (at.get||'') });
      (async function(){
      var enc, sec = await user.get('trust').get(pair.pub).get(path).then();
      sec = await SEA.decrypt(sec, pair);
      if(!sec){
        sec = SEA.random(16).toString();
        enc = await SEA.encrypt(sec, pair);
        user.get('trust').get(pair.pub).get(path).put(enc);
      }
      enc = await SEA.encrypt(data, sec);
      gun.put(enc, cb);
      }());
      return gun;
    }
    module.exports = User
  })(USE, './create');

  ;USE(function(module){
    const SEA = USE('./sea')
    const Gun = SEA.Gun;
    // After we have a GUN extension to make user registration/login easy, we then need to handle everything else.

    // We do this with a GUN adapter, we first listen to when a gun instance is created (and when its options change)
    Gun.on('opt', function(at){
      if(!at.sea){ // only add SEA once per instance, on the "at" context.
        at.sea = {own: {}};
        at.on('in', security, at); // now listen to all input data, acting as a firewall.
        at.on('out', signature, at); // and output listeners, to encrypt outgoing data.
        at.on('node', each, at);
      }
      this.to.next(at); // make sure to call the "next" middleware adapter.
    });

    // Alright, this next adapter gets run at the per node level in the graph database.
    // This will let us verify that every property on a node has a value signed by a public key we trust.
    // If the signature does not match, the data is just `undefined` so it doesn't get passed on.
    // If it does match, then we transform the in-memory "view" of the data into its plain value (without the signature).
    // Now NOTE! Some data is "system" data, not user data. Example: List of public keys, aliases, etc.
    // This data is self-enforced (the value can only match its ID), but that is handled in the `security` function.
    // From the self-enforced data, we can see all the edges in the graph that belong to a public key.
    // Example: ~ASDF is the ID of a node with ASDF as its public key, signed alias and salt, and
    // its encrypted private key, but it might also have other signed values on it like `profile = <ID>` edge.
    // Using that directed edge's ID, we can then track (in memory) which IDs belong to which keys.
    // Here is a problem: Multiple public keys can "claim" any node's ID, so this is dangerous!
    // This means we should ONLY trust our "friends" (our key ring) public keys, not any ones.
    // I have not yet added that to SEA yet in this alpha release. That is coming soon, but beware in the meanwhile!
    function each(msg){ // TODO: Warning: Need to switch to `gun.on('node')`! Do not use `Gun.on('node'` in your apps!
      // NOTE: THE SECURITY FUNCTION HAS ALREADY VERIFIED THE DATA!!!
      // WE DO NOT NEED TO RE-VERIFY AGAIN, JUST TRANSFORM IT TO PLAINTEXT.
      var to = this.to, vertex = (msg.$._).put, c = 0, d;
      Gun.node.is(msg.put, function(val, key, node){ c++; // for each property on the node
        // TODO: consider async/await use here...
        SEA.verify(val, false, function(data){ c--; // false just extracts the plain data.
          var tmp = data;
          data = SEA.opt.unpack(data, key, node);
          node[key] = val = data; // transform to plain value.
          if(d && !c && (c = -1)){ to.next(msg) }
        });
      });
      d = true;
      if(d && !c){ to.next(msg) }
      return;
    }

    // signature handles data output, it is a proxy to the security function.
    function signature(msg){
      if(msg.user){
        return this.to.next(msg);
      }
      var ctx = this.as;
      msg.user = ctx.user;
      security.call(this, msg);
    }

    // okay! The security function handles all the heavy lifting.
    // It needs to deal read and write of input and output of system data, account/public key data, and regular data.
    // This is broken down into some pretty clear edge cases, let's go over them:
    function security(msg){
      var at = this.as, sea = at.sea, to = this.to;
      if(msg.get){
        // if there is a request to read data from us, then...
        var soul = msg.get['#'];
        if(soul){ // for now, only allow direct IDs to be read.
          if(typeof soul !== 'string'){ return to.next(msg) } // do not handle lexical cursors.
          if('alias' === soul){ // Allow reading the list of usernames/aliases in the system?
            return to.next(msg); // yes.
          } else
          if('~@' === soul.slice(0,2)){ // Allow reading the list of public keys associated with an alias?
            return to.next(msg); // yes.
          } else { // Allow reading everything?
            return to.next(msg); // yes // TODO: No! Make this a callback/event that people can filter on.
          }
        }
      }
      if(msg.put){
        // potentially parallel async operations!!!
        var check = {}, each = {}, u;
        each.node = function(node, soul){
          if(Gun.obj.empty(node, '_')){ return check['node'+soul] = 0 } // ignore empty updates, don't reject them.
          Gun.obj.map(node, each.way, {soul: soul, node: node});
        };
        each.way = function(val, key){
          var soul = this.soul, node = this.node, tmp;
          if('_' === key){ return } // ignore meta data
          if('~@' === soul){  // special case for shared system data, the list of aliases.
            each.alias(val, key, node, soul); return;
          }
          if('~@' === soul.slice(0,2)){ // special case for shared system data, the list of public keys for an alias.
            each.pubs(val, key, node, soul); return;
          }
          if('~' === soul.slice(0,1) && 2 === (tmp = soul.slice(1)).split('.').length){ // special case, account data for a public key.
            each.pub(val, key, node, soul, tmp, msg.user); return;
          }
          each.any(val, key, node, soul, msg.user); return;
          return each.end({err: "No other data allowed!"});
        };
        each.alias = function(val, key, node, soul){ // Example: {_:#~@, ~@alice: {#~@alice}}
          if(!val){ return each.end({err: "Data must exist!"}) } // data MUST exist
          if('~@'+key === Gun.val.link.is(val)){ return check['alias'+key] = 0 } // in fact, it must be EXACTLY equal to itself
          each.end({err: "Mismatching alias."}); // if it isn't, reject.
        };
        each.pubs = function(val, key, node, soul){ // Example: {_:#~@alice, ~asdf: {#~asdf}}
          if(!val){ return each.end({err: "Alias must exist!"}) } // data MUST exist
          if(key === Gun.val.link.is(val)){ return check['pubs'+soul+key] = 0 } // and the ID must be EXACTLY equal to its property
          each.end({err: "Alias must match!"}); // that way nobody can tamper with the list of public keys.
        };
        each.pub = function(val, key, node, soul, pub, user){ // Example: {_:#~asdf, hello:SEA{'world',fdsa}}
          if('pub' === key){
            if(val === pub){ return (check['pub'+soul+key] = 0) } // the account MUST match `pub` property that equals the ID of the public key.
            return each.end({err: "Account must match!"});
          }
          check['user'+soul+key] = 1;
          if(user && user.is && pub === user.is.pub){
            //var id = Gun.text.random(3);
            SEA.sign([soul, key, val, Gun.state.is(node, key)], (user._).sea, function(data){ var rel;
              if(u === data){ return each.end({err: SEA.err || 'Pub signature fail.'}) }
              if(rel = Gun.val.link.is(val)){
                (at.sea.own[rel] = at.sea.own[rel] || {})[pub] = true;
              }
              node[key] = data;
              check['user'+soul+key] = 0;
              each.end({ok: 1});
            });
            // TODO: Handle error!!!!
            return;
          }
          SEA.verify(val, pub, function(data){ var rel, tmp;
            data = SEA.opt.unpack(data, key, node);
            if(u === data){ // make sure the signature matches the account it claims to be on.
              return each.end({err: "Unverified data."}); // reject any updates that are signed with a mismatched account.
            }
            if((rel = Gun.val.link.is(data)) && pub === relpub(rel)){
              (at.sea.own[rel] = at.sea.own[rel] || {})[pub] = true;
            }
            check['user'+soul+key] = 0;
            each.end({ok: 1});
          });
        };
        function relpub(s){
          if(!s){ return }
          s = s.split('~');
          if(!s || !(s = s[1])){ return }
          s = s.split('.');
          if(!s || 2 > s.length){ return }
          s = s.slice(0,2).join('.');
          return s;
        }
        each.any = function(val, key, node, soul, user){ var tmp, pub;
          if(!user || !user.is){
            if(tmp = relpub(soul)){
              check['any'+soul+key] = 1;
              SEA.verify(val, pub = tmp, function(data){ var rel;
                data = SEA.opt.unpack(data, key, node);
                if(u === data){ return each.end({err: "Mismatched owner on '" + key + "'."}) } // thanks @rogowski !
                if((rel = Gun.val.link.is(data)) && pub === relpub(rel)){
                  (at.sea.own[rel] = at.sea.own[rel] || {})[pub] = true;
                }
                check['any'+soul+key] = 0;
                each.end({ok: 1});
              });
              return;
            }
            check['any'+soul+key] = 1;
            at.on('secure', function(msg){ this.off();
              check['any'+soul+key] = 0;
              if(at.opt.secure){ msg = null }
              each.end(msg || {err: "Data cannot be modified."});
            }).on.on('secure', msg);
            //each.end({err: "Data cannot be modified."});
            return;
          }
          if(!(tmp = relpub(soul))){
            if(at.opt.secure){
              each.end({err: "Soul is missing public key at '" + key + "'."});
              return;
            }
            if(val && val.slice && 'SEA{' === (val).slice(0,4)){
              check['any'+soul+key] = 0;
              each.end({ok: 1});
              return;
            }
            //check['any'+soul+key] = 1;
            //SEA.sign(val, user, function(data){
             // if(u === data){ return each.end({err: 'Any signature failed.'}) }
            //  node[key] = data;
              check['any'+soul+key] = 0;
              each.end({ok: 1});
            //});
            return;
          }
          if(!msg.I || (pub = tmp) !== (user.is||noop).pub){
            each.any(val, key, node, soul);
            return;
          }
          /*var other = Gun.obj.map(at.sea.own[soul], function(v, p){
            if((user.is||{}).pub !== p){ return p }
          });
          if(other){
            each.any(val, key, node, soul);
            return;
          }*/
          check['any'+soul+key] = 1;
          SEA.sign([soul, key, val, Gun.state.is(node, key)], (user._).sea, function(data){
            if(u === data){ return each.end({err: 'My signature fail.'}) }
            node[key] = data;
            check['any'+soul+key] = 0;
            each.end({ok: 1});
          });
        }
        each.end = function(ctx){ // TODO: Can't you just switch this to each.end = cb?
          if(each.err){ return }
          if((each.err = ctx.err) || ctx.no){
            console.log('NO!', each.err, msg.put); // 451 mistmached data FOR MARTTI
            return;
          }
          if(!each.end.ed){ return }
          if(Gun.obj.map(check, function(no){
            if(no){ return true }
          })){ return }
          to.next(msg);
        };
        Gun.obj.map(msg.put, each.node);
        each.end({end: each.end.ed = true});
        return; // need to manually call next after async.
      }
      to.next(msg); // pass forward any data we do not know how to handle or process (this allows custom security protocols).
    }
    SEA.opt.unpack = function(data, key, node){
      if(u === data){ return }
      var tmp = data, soul = Gun.node.soul(node), s = Gun.state.is(node, key);
      if(tmp && 4 === tmp.length && soul === tmp[0] && key === tmp[1] && s === tmp[3]){
        return tmp[2];
      }
      if(s < SEA.opt.shuffle_attack){
        return data;
      }
    }
    SEA.opt.shuffle_attack = 1546329600000; // Jan 1, 2019
    var noop = {}, u;

  })(USE, './index');
}());

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("buffer").Buffer)
},{"buffer":25}],3:[function(require,module,exports){
/**
 * Secure random string generator with custom alphabet.
 *
 * Alphabet must contain 256 symbols or less. Otherwise, the generator
 * will not be secure.
 *
 * @param {generator} random The random bytes generator.
 * @param {string} alphabet Symbols to be used in new random string.
 * @param {size} size The number of symbols in new random string.
 *
 * @return {string} Random string.
 *
 * @example
 * const format = require('nanoid/format')
 *
 * function random (size) {
 *   const result = []
 *   for (let i = 0; i < size; i++) {
 *     result.push(randomByte())
 *   }
 *   return result
 * }
 *
 * format(random, "abcdef", 5) //=> "fbaef"
 *
 * @name format
 * @function
 */
module.exports = function (random, alphabet, size) {
  var mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1
  var step = Math.ceil(1.6 * mask * size / alphabet.length)

  var id = ''
  while (true) {
    var bytes = random(step)
    for (var i = 0; i < step; i++) {
      var byte = bytes[i] & mask
      if (alphabet[byte]) {
        id += alphabet[byte]
        if (id.length === size) return id
      }
    }
  }
}

/**
 * @callback generator
 * @param {number} bytes The number of bytes to generate.
 * @return {number[]} Random bytes.
 */

},{}],4:[function(require,module,exports){
'use strict';
module.exports = require('./lib/index');

},{"./lib/index":8}],5:[function(require,module,exports){
'use strict';

var randomFromSeed = require('./random/random-from-seed');

var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
var alphabet;
var previousSeed;

var shuffled;

function reset() {
    shuffled = false;
}

function setCharacters(_alphabet_) {
    if (!_alphabet_) {
        if (alphabet !== ORIGINAL) {
            alphabet = ORIGINAL;
            reset();
        }
        return;
    }

    if (_alphabet_ === alphabet) {
        return;
    }

    if (_alphabet_.length !== ORIGINAL.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. You submitted ' + _alphabet_.length + ' characters: ' + _alphabet_);
    }

    var unique = _alphabet_.split('').filter(function(item, ind, arr){
       return ind !== arr.lastIndexOf(item);
    });

    if (unique.length) {
        throw new Error('Custom alphabet for shortid must be ' + ORIGINAL.length + ' unique characters. These characters were not unique: ' + unique.join(', '));
    }

    alphabet = _alphabet_;
    reset();
}

function characters(_alphabet_) {
    setCharacters(_alphabet_);
    return alphabet;
}

function setSeed(seed) {
    randomFromSeed.seed(seed);
    if (previousSeed !== seed) {
        reset();
        previousSeed = seed;
    }
}

function shuffle() {
    if (!alphabet) {
        setCharacters(ORIGINAL);
    }

    var sourceArray = alphabet.split('');
    var targetArray = [];
    var r = randomFromSeed.nextValue();
    var characterIndex;

    while (sourceArray.length > 0) {
        r = randomFromSeed.nextValue();
        characterIndex = Math.floor(r * sourceArray.length);
        targetArray.push(sourceArray.splice(characterIndex, 1)[0]);
    }
    return targetArray.join('');
}

function getShuffled() {
    if (shuffled) {
        return shuffled;
    }
    shuffled = shuffle();
    return shuffled;
}

/**
 * lookup shuffled letter
 * @param index
 * @returns {string}
 */
function lookup(index) {
    var alphabetShuffled = getShuffled();
    return alphabetShuffled[index];
}

function get () {
  return alphabet || ORIGINAL;
}

module.exports = {
    get: get,
    characters: characters,
    seed: setSeed,
    lookup: lookup,
    shuffled: getShuffled
};

},{"./random/random-from-seed":11}],6:[function(require,module,exports){
'use strict';

var generate = require('./generate');
var alphabet = require('./alphabet');

// Ignore all milliseconds before a certain time to reduce the size of the date entropy without sacrificing uniqueness.
// This number should be updated every year or so to keep the generated id short.
// To regenerate `new Date() - 0` and bump the version. Always bump the version!
var REDUCE_TIME = 1459707606518;

// don't change unless we change the algos or REDUCE_TIME
// must be an integer and less than 16
var version = 6;

// Counter is used when shortid is called multiple times in one second.
var counter;

// Remember the last time shortid was called in case counter is needed.
var previousSeconds;

/**
 * Generate unique id
 * Returns string id
 */
function build(clusterWorkerId) {
    var str = '';

    var seconds = Math.floor((Date.now() - REDUCE_TIME) * 0.001);

    if (seconds === previousSeconds) {
        counter++;
    } else {
        counter = 0;
        previousSeconds = seconds;
    }

    str = str + generate(version);
    str = str + generate(clusterWorkerId);
    if (counter > 0) {
        str = str + generate(counter);
    }
    str = str + generate(seconds);
    return str;
}

module.exports = build;

},{"./alphabet":5,"./generate":7}],7:[function(require,module,exports){
'use strict';

var alphabet = require('./alphabet');
var random = require('./random/random-byte');
var format = require('nanoid/format');

function generate(number) {
    var loopCounter = 0;
    var done;

    var str = '';

    while (!done) {
        str = str + format(random, alphabet.get(), 1);
        done = number < (Math.pow(16, loopCounter + 1 ) );
        loopCounter++;
    }
    return str;
}

module.exports = generate;

},{"./alphabet":5,"./random/random-byte":10,"nanoid/format":3}],8:[function(require,module,exports){
'use strict';

var alphabet = require('./alphabet');
var build = require('./build');
var isValid = require('./is-valid');

// if you are using cluster or multiple servers use this to make each instance
// has a unique value for worker
// Note: I don't know if this is automatically set when using third
// party cluster solutions such as pm2.
var clusterWorkerId = require('./util/cluster-worker-id') || 0;

/**
 * Set the seed.
 * Highly recommended if you don't want people to try to figure out your id schema.
 * exposed as shortid.seed(int)
 * @param seed Integer value to seed the random alphabet.  ALWAYS USE THE SAME SEED or you might get overlaps.
 */
function seed(seedValue) {
    alphabet.seed(seedValue);
    return module.exports;
}

/**
 * Set the cluster worker or machine id
 * exposed as shortid.worker(int)
 * @param workerId worker must be positive integer.  Number less than 16 is recommended.
 * returns shortid module so it can be chained.
 */
function worker(workerId) {
    clusterWorkerId = workerId;
    return module.exports;
}

/**
 *
 * sets new characters to use in the alphabet
 * returns the shuffled alphabet
 */
function characters(newCharacters) {
    if (newCharacters !== undefined) {
        alphabet.characters(newCharacters);
    }

    return alphabet.shuffled();
}

/**
 * Generate unique id
 * Returns string id
 */
function generate() {
  return build(clusterWorkerId);
}

// Export all other functions as properties of the generate function
module.exports = generate;
module.exports.generate = generate;
module.exports.seed = seed;
module.exports.worker = worker;
module.exports.characters = characters;
module.exports.isValid = isValid;

},{"./alphabet":5,"./build":6,"./is-valid":9,"./util/cluster-worker-id":12}],9:[function(require,module,exports){
'use strict';
var alphabet = require('./alphabet');

function isShortId(id) {
    if (!id || typeof id !== 'string' || id.length < 6 ) {
        return false;
    }

    var nonAlphabetic = new RegExp('[^' +
      alphabet.get().replace(/[|\\{}()[\]^$+*?.-]/g, '\\$&') +
    ']');
    return !nonAlphabetic.test(id);
}

module.exports = isShortId;

},{"./alphabet":5}],10:[function(require,module,exports){
'use strict';

var crypto = typeof window === 'object' && (window.crypto || window.msCrypto); // IE 11 uses window.msCrypto

var randomByte;

if (!crypto || !crypto.getRandomValues) {
    randomByte = function(size) {
        var bytes = [];
        for (var i = 0; i < size; i++) {
            bytes.push(Math.floor(Math.random() * 256));
        }
        return bytes;
    };
} else {
    randomByte = function(size) {
        return crypto.getRandomValues(new Uint8Array(size));
    };
}

module.exports = randomByte;

},{}],11:[function(require,module,exports){
'use strict';

// Found this seed-based random generator somewhere
// Based on The Central Randomizer 1.3 (C) 1997 by Paul Houle (houle@msc.cornell.edu)

var seed = 1;

/**
 * return a random number based on a seed
 * @param seed
 * @returns {number}
 */
function getNextValue() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed/(233280.0);
}

function setSeed(_seed_) {
    seed = _seed_;
}

module.exports = {
    nextValue: getNextValue,
    seed: setSeed
};

},{}],12:[function(require,module,exports){
'use strict';

module.exports = 0;

},{}],13:[function(require,module,exports){
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.getIndexForObjectWithKey = function(key, value) {
    for (var idx in this) {
        var item = this[idx];
        if (item.hasOwnProperty(key) && item[key] == value) {
           return idx;
        }
    }
}
},{}],14:[function(require,module,exports){
Math.limit = function(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}
},{}],15:[function(require,module,exports){
String.prototype.truncate = function (strLen, separator) {
    if (this.length <= strLen) return this;

    separator = separator || '...';

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return this.substr(0, frontChars) + 
           separator + 
           this.substr(this.length - backChars);
};
},{}],16:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.MarkerItem = class MarkerItem extends LX.SharedItem {
    
    constructor(id, data) {



        // now set defaults for key compression
        super(id, data, {
           "geohash": ["g"],
            "tags": ["t", []],
            "owner": ["o"]
        });

        this._icon = null;
        this._set = null;
        this.layer = null;


        this.on("remove", () => {
            this.hide();
        });

        this.on("mode", (mode) => {
            if (this.layer) {
                // keep dom updated to reflect mode
                this.layer.setIcon(this.getDivIcon());
                //console.log(`${this.log_prefix} mode = `, mode);
            }
        });

        // intercept to see if we have a cached version in our atlas already
        if (LT.atlas.markers[id]) {
            console.warn(`${this.log_prefix} using cached marker from atlas`);
            return LT.atlas.markers[id];
        }
    }



    //-------------------------------------------------------------------------
    /**
    * Defines geographic position on map
    *
    * Automatically create a new map layer if not already defined
    */
    set geohash(val) {
        if (val) {

            let starting_val = this._data.geohash;

            try {

                if (val == starting_val) {
                    return;
                }

                this._data.geohash = val;
                //console.log(`${this.log_prefix} location = ${this.geohash}`);


                if (this.layer) {
                    this.layer.setLatLng(this.latlng);
                }
                if (starting_val) {
                    this.emit("move", val);
                }
            }
            catch(e) {
                console.error(`${this.log_prefix} error with geohash`, e);
            }
        }
    }

    get latlng() {
        return LV.Geohash.decode(this._data.geohash);
    }

    get geohash() {
        return this._data.geohash;
    }

 
 
    //-------------------------------------------------------------------------
    /**
    * Show on map
    */
    show() {

        if (this.layer !== null) {
            return;
        }
        else if (!this.latlng) {
            console.error(`${this.log_prefix} cannot show marker with missing geolocation`);
            return;
        }

        //console.log(`${this.log_prefix} showing marker`, this);

        let self = this;
        this.layer = L.marker(this.latlng, {
            icon: this.getDivIcon(),
            draggable: false,
            autoPan: true
        });

        LT.atlas.addToMap(this);

        //console.log(`${this.log_prefix} Show`, this.layer);

        this.layer.on("dragend", function(e) {
            let latlng = e.target._latlng;
            self.geohash = LV.Geohash.encode(latlng.lat, latlng.lng); 
        });
        this.emit("show", self);
    }

    /**
    * Hide from the map without altering stored data
    */
    hide() {
        //console.log(`${this.log_prefix} Hide`);
        if (this.layer && this.layer._map) {
            LT.atlas.removeFromMap(this);
            this.emit("hide", this);            
        }
    }



    //-------------------------------------------------------------------------
    getDivIcon() {
        let cls = "fa";
        if (this._icon) {
            cls += " fa-"+this._icon;
        }
        return L.divIcon({
            html: `<i class="${cls}"></i>`,
            className: `lx-marker lx-marker-${this.mode} ${this.tags.join(" ")}`
        });
    }
    

    getIcon() {
        return this._icon;
    }

    setIcon(value) {
        if (!this.layer) {
            console.error(`${this.log_prefix} marker must have layer before icon can be set`);
            return;
        }

        if (value) {
            // console.log(`${this.log_prefix} icon = ${value}`);
        }
        else {
            // console.log(`${this.log_prefix} clearing icon`); 
        }
        this._icon = value;
        this.layer.setIcon(this.getDivIcon());
    }

    /**
    * Display custom icon based on marker class names
    */
    setIcons(map) {
        this.tags.forEach((tag) => {
            if (map.hasOwnProperty(tag)) {
                this.setIcon(map[tag]);
            }
        });
    }



}
},{}],17:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.SharedDatabase = class SharedDatabase extends LV.EventEmitter {

    constructor(uri) {
        super();

        this.namespace = "__LX__";
        this.root_node = null; // root node
        this.template = {
            "pkg": {},
            "org": {}
        } // template for creating a root node
        this.stor = LV.GraphDB(uri); // database instance

        this.check(this.namespace)
            .then((root) => {
                if (!root) {
                    this.initialize(this.namespace, {force: true});
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    /**
    * Check for integrity of database to make sure we have expected data
    */
    check(namespace) {  
        let self = this;
        return new Promise((resolve, reject) => {
            // do we have good structure in the database?
            let top_level_node = self.stor.get(namespace);
            top_level_node
                .once(function(v,k) {
                    let invalid_keys = [];

                    if (typeof(v) != "object") {
                        // database does not exist yet
                         return resolve();
                    }

                    // compare to our template for the node to make sure nodes are expected
                    Object.keys(v).forEach(key => {
                        if (key != "_" && !self.template.hasOwnProperty(key)) {
                            if ( v[key] === null) {
                                // already nullified
                                return;
                            }
                            // nullify bad value
                            top_level_node.get(key).put(null);
                            console.log("[DB] Nullify bad value for key: " + key);
                            invalid_keys.push(key);
                        }
                        else if (self.template.hasOwnProperty(key) && v[key] === null) {
                            console.log(`[DB] Value ${key} is null but should not be`);
                            top_level_node.get(key).put(self.template[key]);
                        }
                    });
                            
                    if (invalid_keys.length > 0) {
                        reject(`[DB] Cleared unexpected keys at root of node ${namespace}: ${invalid_keys.join(", ")}`);
                    }
                    // expected all nodes. good to go!
                    self.root_node = top_level_node;
                    //console.log("[DB] Check completed successfully for namespace: " + namespace);
                    self.emit("check");
                    self.emit("load");
                    resolve(self.root_node);
                });
        });
    }

    /**
    * Create entirely new database at our selected root
    */
    initialize(namespace, opts) {
        console.log(`[DB] Initializing at namespace: ${namespace}`);
        let self = this;
        opts = opts || {};
        return new Promise((resolve, reject) => {
            let root = self.stor.get(namespace);
            root.once(function(v,k) {
                // caution: forced initialization is possible here but will reset entire database
                if (v == undefined || opts.force) {

                    self.stor.get(namespace)
                        .put(self.template)
                        .once((v,k) => {
                            console.log(`[DB] Created root node: ${namespace}`);
                            self.root_node = root;
                            self.emit("initialize");
                            self.emit("load");
                            resolve(namespace);
                        });
                }
                else {
                    console.log(`[DB] Existing root node found: ${namespace}`);                       
                    self.root_node = root;
                    self.emit("load");
                    resolve(namespace);
                }

            });
        });
    }


    //-------------------------------------------------------------------------
    /**
    * Get node from within root namespace
    */
    get() {
        return this.root_node.get.apply(this.root_node, arguments);
    }

    /**
    * Sets value from within root namespace
    */
    put() {
        return this.root_node.put.apply(this.root_node, arguments);
    }



    //-------------------------------------------------------------------------
   
    /**
    * Prints out value of a node selected by a path/to/node
    */
    print(path,pointer,node) {
        // recursive attempt to narrow down to target node
        if (!pointer) pointer = path;
        if (!node) node = this.root_node;
        let split = pointer.split(".");
        node.get(split[0]).once((v,k) => {
            if (split.length > 1) {
                let new_pointer = split.slice(1).join(".");
                node = node.get(k);
                this.print(path,new_pointer,node);
            }
            else {
                // we reached the target node here
                console.log(`[DB] ${path} = `, v);
            }
        });
        return split.length;
    }


    /**
    * Output basic node on .once or .map
    */
    log(v,k) {
        console.log(`[db] Key ${k} =`, v);
    }



    /**
    *  Print out the graph structure of a specified node
    */
    inspect(show_deleted,json,level) {
        let self = this;
        if (!json) {
            return self.jsonify().then((new_json) => {
                this.inspect(show_deleted, new_json, level);
            });
        }

        level = level || "";
        
        Object.keys(json).forEach(k => {

            if (k == "#") return;

            let v = json[k];

            // printable value
            let vp = v;
            if (typeof(v) == "String") {
                vp = v.truncate(30);
            }

            if (v === null) {
                if (show_deleted) {
                    console.log(`${level}[ø] ${k}`);
                }
            }
            else if (typeof(v) == "object") {
                let length = Object.keys(v).length;
                console.log(`${level}[+] ${k}`);
                self.inspect(show_deleted,v,level+"  ");

            }
            else {
                console.log(`${level}|- ${k} = `, vp);
            }
        });
    }


    /**
    * Exports data structure to a basic JSON object with hierarchy
    */
    jsonify(node, tree, pointer) {

        let self = this;
        node = node || self.root_node;
        tree = tree || {};
        pointer = pointer || tree;

        return new Promise((resolve, reject) => {
            node.once((v,k) => {
                pointer[k] = {};
                let promises = [];
                if (v) {


                    let items = Object.keys(v).filter(key => key != "_");
                    items.forEach((item) => {
                        var promise;
                        let val = v[item];


                        if (item == "organization" || item == "packages") {
                            // special rule for packages to avoid circular display of organization data
                            promise = new Promise((resolve, reject) => {
                                node.get(item).once((val,key) => {
                                    let names = {};
                                    
                                    if (val.name) {
                                        pointer[k][item] = val.name;
                                        return resolve(val.name);
                                    }

                                    Object.keys(val).forEach((name) => {
                                        if (name != "_") names[name] = true;
                                    });
                                    
                                    pointer[k][item] = names;
                                    resolve(names);
                                });
                            });
                        }
                        else if (val !== null && typeof(val) == "object") {
                            promise = self.jsonify.apply(self, [node.get(item), tree, pointer[k]]);
                        }
                        else {
                            promise = pointer[k][item] = val;
                        }
                        promises.push(promise);
                    });
                }
              
                Promise.all(promises).then((val) => {
                    resolve(tree);
                });
            });
        });
    };

}
},{}],18:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.SharedItem = class SharedItem extends LV.EventEmitter {
    constructor(id, data, defaults) {
        super();
        this.id = id || LV.ShortID.generate();
        this._mode = "draft";

        // create data space for data we allow to be exported to shared database
        this._data = {};
        for (var idx in defaults) {
            this._data[idx] = defaults[idx][1] || null;
        }

        this._key_table = {};
        this._key_table_reverse = {};
        for (var idx in defaults) {
            this._key_table[idx] = defaults[idx][0];
            this._key_table_reverse[defaults[idx][0]] = idx;
        }


        if (data) {
            this.mode = "shared";
            this.update(data);
        }

        return this;
    }



    //-------------------------------------------------------------------------
    get log_prefix() {
        return `[i:${this.id}]`.padEnd(20, " ")
    }

    get data() {
        return this._data;
    }

    set tags(val) {
        if (!val || val.length == 0 ) return;

        if (typeof(val) == "object") {
            val.forEach(this.tag.bind(this));
        }
    }

    get tags() {
        return this._data.tags || [];
    }


    set mode(val) {
        this._mode = val;
        this.emit("mode", val);
    }

    get mode() {
        return this._mode;
    }


    set owner(val) {
        this._data.owner = val;
    }



    //-------------------------------------------------------------------------
    inspect() {
        console.log(`${this.log_prefix} data = ${JSON.stringify(this._data)}`);
    }




    //-------------------------------------------------------------------------
    /**
    * Add tag for data filtering and user interface display
    */
    tag(tag) {
        tag = this.sanitizeTag(tag);

        this._data.tags = this._data.tags || [];
        //console.log(`${this.log_prefix} tag = `, tag);

        // don't allow duplicate tags
        if(this._data.tags.indexOf(tag) > -1) {
            return;
        }

        this._data.tags.push(tag);
        this.emit("tag", tag);
        return this.tags;
    }
    
    /**
    * Remove tag
    */
    untag(tag) {
        tag = this.sanitizeTag(tag);
        this._data.tags.remove(tag);
        this.emit("untag", tag);
        return this.tags;
    }
    

    /**
    * Remove all tags
    */
    untagAll() {
        this._data.tags.forEach((tag) => {
            this.emit("untag", tag);
        });
        this._data.tags = [];
        return this.tags;
    }
    
    /**
    * Keep tags lowercase and with dash seperators
    */
    sanitizeTag(tag) {
        return tag.toLowerCase().replace(/[^a-z0-9\-]+/g, '');
    }



    //-------------------------------------------------------------------------
    /**
    * Compresses and formats data for storage in shared database
    *
    * Requires that all data variables are pre-defined in our map for safety
    */
    pack(obj) {
        let new_obj = {};
        for (var idx in obj) {
            let v = obj[idx];
            if (this._key_table.hasOwnProperty(idx)) {
                let k = this._key_table[idx];
                if (v && v.constructor === Array) {
                    new_obj[k] = "Å"+v.join(",");
                }
                else if (v) {
                    new_obj[k] = v;
                }

            }
        }
        //console.log(`${this.log_prefix} Packed:`, obj, new_obj);
        return new_obj;
    }

    /**
    * Extracts data from shared database and places back in javascript object
    *
    * Requires that all data variables are pre-defined in our map for safety
    */
    unpack(obj) {
        let new_obj = {};

        for (var idx in obj) {
            let v = obj[idx];

            if (this._key_table_reverse.hasOwnProperty(idx)) {
                let k = this._key_table_reverse[idx];
                if (v[0] == "Å") {
                    // this is an array. expand it...
                    v = v.replace("Å", "").split(",");
                }
                new_obj[k] = v;
            }
        }
        //console.log(`${this.log_prefix} Unpacked:`, obj, new_obj);
        return new_obj; 
    }

    /*
    * Updates the local item with packed data
    */
    update(data) {
        let new_data = this.unpack(data);
        
        // only access approved data keys from our map
        for (var idx in new_data) {
            if (JSON.stringify(this[idx]) != JSON.stringify(new_data[idx])) {
                if (this[idx]) {
                    /*if (typeof(this[idx]) == "object") {
                        console.log(`${this.log_prefix} updating ${idx} object to ${new_data[idx]}`);
                    }
                    else {
                        console.log(`${this.log_prefix} updating ${idx} from ${this[idx]} to ${new_data[idx]}`);
                    }*/
                }
                this[idx] = new_data[idx];
            }
        }
        this.emit("update");
    }




    //-------------------------------------------------------------------------
    /**
    * Stores the composed item into a decentralized database
    */
    save(package_name, field, version) {

        return new Promise((resolve, reject) => {

            if (!LT.db) {
                console.log(`${this.log_prefix} Requires database to publish to`);
                return reject("db_required");
            }

            if (!package_name) {
                console.log(`${this.log_prefix} Requires package to publish to`);
                return reject("name_required");
            }

            this.mode = "locked"; // lock mode

            // record owner when item is first exported...
            if (!this._data["owner"]) {
                this._data["owner"] = LT.user.username;
            }


            // are we trying to change just a partial?
            let val = (field ? this._data[field] : this._data);
            let data = {};

            if (field) {
                if (!val) {
                    return console.error(`${this.log_prefix} unable to save missing field`, field);
                }
                let obj = {};
                obj[field] = val;
                data = this.pack(obj);
            }
            else if (val) {
                data = this.pack(val);
            }

            // save to our shared database...
            let package_node = LT.db.get("pkg")
                .get(package_name);

            const completeSave = (version) => {
                this.node = package_node.get("data")
                    .get(version)
                    .get(this.id);

                this.node.put(data)
                    .once((v,k) => {
                        this.mode = "shared"; // shared mode
                        this.emit("save");
                        return resolve();
                    });
            }


            package_node.get("version").then(completeSave);
        });
    }



    /**
    * Clears the value of the item and nullifies in database (full delete not possible)
    */
    drop(package_name, version) {

        return new Promise((resolve, reject) => {

            if (!LT.db) {
                console.error(`${this.log_prefix} requires database to remove from`);
                return reject("db_required");
            }
            else if (this.mode == "dropped") {
                // already deleted... skip...
                return resolve();
            }
            
            if (!package_name) {
                return console.error(`${this.log_prefix} requires package to remove from`);
            }

            let package_node = LT.db.get("pkg")
                .get(package_name);

            const completeDrop = (version) => {
                let original_data = {};
                package_node
                    .get("data")
                    .get(version)
                    .get(this.id)
                    .once((v,k) => {
                        original_data = v;
                    })
                    .put(null)
                    .once(() => {
                        console.log(`${this.log_prefix} Dropped`);
                        this.mode = "dropped";
                        this.emit("drop");
                        resolve();
                    });
            }

            if (version) {
                completeDrop(version);
            }
            else {
                package_node.get("version").then(completeDrop); 
            }

        });
    }
}

},{}],19:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.Organization = class Organization extends LV.EventEmitter {

    constructor(id, db) {
        super()
        if (!id) {
            return console.error("[Organization] requires id to construct");
        }
        if (!db) {
            return console.error("[Organization] requires database to construct");
        }
        this.id = id;
        this.name = null;

        this.db = db;
        this.node = db.get("org")
            .get(id);

        //console.log(`${this.log_prefix} id = ${this.id}`)

        this.node.on((v,k) => {
            // always keep object up-to-date as data changes
            if (v && v.hasOwnProperty("name")) {
                //console.log(`${this.log_prefix} name --> ${v.name}`);
                this.name = v.name;
            }
        })
    }
    


    //-------------------------------------------------------------------------
    get log_prefix() {
        return `[o:${this.id || "Organization"}]`.padEnd(20, " ")
    }

    //-------------------------------------------------------------------------
    /**
    * Publish a new data package to the network
    */
    register(name) {
        return new Promise((resolve, reject) => {
            if (!name) {
                console.error(`${this.log_prefix} please name your organization to register`);
                return reject("name_required");
            }
        
            this.node.once((v,k) => {
                if (v) {
                    console.warn(`${this.log_prefix} organization already exists`,v);
                    return resolve(v);
                }

                this.node.put({
                        "name": name,
                        "members": {},
                        "packages": {}
                    }, (ack) => {
                        if (ack.err) {
                            reject(ack.err);
                        }
                        else {
                            this.emit("register");
                            return resolve(this.node);
                        }
                    });
            });

        });

    }

    unregister() {
        return new Promise((resolve, reject) => {
            this.node.put(null)
                .once((v,k) => {
                    console.log(`${this.log_prefix} unregistered ${this.id}`)
                    this.emit("unregister");
                    return resolve();
                });
            });
    }


    getOrRegister(name) {
        return new Promise((resolve, reject) => {
            this.node.once((v,k) => {
                if (v) return resolve(v);
                return this.register(name).then(resolve);
            })
        });
    }



    //-------------------------------------------------------------------------
    /**
    * Add member user to the organization
    */
    addOneMember(user) {
        return new Promise((resolve, reject) => {
            this.node.get("members")
                .set(user)
                .once(resolve);
            });
    }

    /**
    * Remove member user from the organization
    */
    removeOneMember(user) {
        return new Promise((resolve, reject) => {
            this.node.get("members")
                .unset(user)
                .once(resolve);
            });
    }

}
},{}],20:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.Package =  class Package extends LV.EventEmitter {

	constructor(name, org) {
		super();

		if (!name) {
            console.error(`${this.log_prefix} please name your package to publish`);
            throw new Error("missing_name")
        }	

        if (!org || !org.db) {
            console.error(`${this.log_prefix} please identify a valid organization for this package`);
            throw new Error("missing_org");  	
        }

		this.db = org.db;
		this.organization = org;
		this.node = this.db.get("pkg").get(name);
		this._data = {
			"name": name,
			"public": true, // only supporting public packages, for now
			"version": "0.0.1", // default version number
			//"organization": org.node // reference link to owning organization
		}
	}



    //-------------------------------------------------------------------------
    get log_prefix() {
    	return `[p:${this.name || "new package"}@${this.version}]`.padEnd(20, " ");
    }

	get name() {
		return this._data.name;
	}

	set name(val) {
		this._data.name = val;
	}


	get version() {
		return this._data.version;
	}

	set version(val) {
		this._data.version = val;
	}

	get id() {
		return this._data.name +"@"+this._data.version;
	}


    //-------------------------------------------------------------------------
    /**
    * Find latest version of data
    */
    getNodeForVersion(version) {
    	return this.node.get("data").get(version);
    }

    /**
    * Ensures we have a valid package node to work with
    */
    ensureNode() {
    	return new Promise((resolve, reject) => {
	    	this.node.get("name").once((v,k) => {
	    		if (v) {
	    			resolve(this.node);
	    		}
	    		else {
	    			console.log(`${this.log_prefix} creating node`, this._data);
	    			this.node.put(this._data, (ack) => {
	    				if (ack.err) {
	    					reject(ack.err)
	    				}
	    				else {
	    					resolve(this.node)
	    				}
	    			});
	    		}
	    	})
    	});
    }

    /**
    * Defines the owning organization for this package
    */
    linkOrganization(node) {
    	this.node.get("organization").put(node);
    	node.get("packages").get(this.name).put(this.node);
    }


    /**
    * Saves object data directly to a desired version
    */
    saveVersionData(version, data, force) {
    	if (typeof(data) != "object") {
    		return console.warn(
    			`${this.log_prefix} data to save for ${version} must have object format`
    		);
    	}
		return new Promise((resolve, reject) => {
	    	// identify target data node to write to
		    let version_node = this.getNodeForVersion(version);
	    	version_node.once((v,k) => {
	    		// do not over-write pre-existing version
	    		if (v && !force) {
	                console.log(`${this.log_prefix} version ${version} already published`);
	                resolve(version_node)
	    		}
	    		else {
			    	version_node.put(data, (ack) => {
		    		    if (ack.err) {
		                    reject(ack.err);
		                }
		                else {
		                    console.log(`${this.log_prefix} published version ${version}`);
		                    this.emit("publish", name);
		                    resolve(version_node);
		                }
			    	});
			    }
			});
		});
    }

    //-------------------------------------------------------------------------
	/**
    * Publish a new data package to the network
    */
    publish(version, data) {
    	version = version || this._data.version; // allow default version
		// make sure we have a package node to work with
		return this.ensureNode().then((node) => {
			this.linkOrganization(this.organization.node);
			return this.saveVersionData(version, data || {});
		});
	}

    /*
    * Unpublish removes a data package from the network
    */
    unpublish(version) {
        return new Promise((resolve, reject) => {

            const cb = (v,k) => {
                this.emit("unpublish", name);
                return resolve();
            }
            if (!version) {
                // unpublish all versions
                this.node.put(null, cb);
            }
            else {
            	let version_node = this.getNodeForVersion(version);
            	version_node.put(null, () => {
            		node.get("version").put(null);
            	});
            } 
        });
    }
}
},{}],21:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.Feed = class Feed extends LV.EventEmitter {

	constructor(user) {
		super();
        this.user = user;
		this.db = user.db;    
		this.packages = {};  // only watch these
		this.topics = {}; // only watch these

	}
    


    //-------------------------------------------------------------------------
    get log_prefix() {
    	return `[f:${this.user.username}]`.padEnd(20, " ");
    }


    onDataUpdate(val, id, pkg_id) {
        var data;

        if (val !== null && typeof(val) == "object") {
            data = {};
            Object.keys(val).forEach(k => {
                if (k != "_") {
                    data[k] = val[k];
                }
            });
        }

        let event = {
            id: id,
            package: pkg_id,
            data: data
        };

        if (this.packages[pkg_id]) {
            this.emit("update", event);
        }
        else {
            console.log("skipping", event)
        }
    }

    /**
    * Allows for manual refresh of data from the feed
    */
    refreshData() {
        Object.keys(this.packages).forEach(id => {
            if (this.packages[id] == false) {
                return;
            }

            console.log(`${this.log_prefix} refreshing data for:`, id)
            let parts = id.split("@");
            let name = parts[0];
            let version = parts[1];
            let package_node = this.db.get("pkg").get(name)
            package_node.get("data")
                .get(version).once((v,k) => {
                    Object.keys(v).forEach((item) => {
                        package_node.get("data").get(version).get(item)
                        .once((v,k) => {
                            this.onDataUpdate(v,k, id);
                        });
                    });

                });
        });
    }



    //-------------------------------------------------------------------------
  	addManyPackages(packages) {
    	packages.forEach(this.addOnePackage.bind(this));
    }

    addOnePackage(id) {
        var parts,name,version;
        try {
            parts = id.split("@");
            name = parts[0];
            version = parts[1];            
        }
        catch(e) {
            console.error(`${this.log_prefix} invalid identifier provided to add package:`, id);
            return;
        }

    	if (this.packages[id]) {
            console.log(`${this.log_prefix} already watching package:`, id);
            return;
        }

    	console.log(`${this.log_prefix} watching changes for package:`, id)


        if (!this.packages.hasOwnProperty(id)) {

            this.packages[id] = true;
            let package_node = this.db.get("pkg").get(name);
            package_node.get("data")
                .get(version).map()
                .on((v,k) => {
                    this.onDataUpdate(v,k,id);
                });
   
        }
        else {
            this.packages[id] = true;
        }

    }


    removeManyPackages(packages) {
    	packages.forEach(this.removeOnePackage.bind(this));
    }

    removeOnePackage(id) {
         try {
            let parts = id.split("@");         
        }
        catch(e) {
            console.error(`${this.log_prefix} invalid identifier provided to remove package ${id}`);
            return;
        }

    	console.log(`${this.log_prefix} unwatch changes for ${id}`)    	
    	this.packages[id] = false;
    }




    //-------------------------------------------------------------------------
    addManyTopics(topics) {
    	topics.forEach(this.addOneTopic.bind(this));
    }

    addOneTopic(name) {    	
    	console.log(`${this.log_prefix} add topic ${name}`)
    	this.topics[name] = true;
    }


    removeManyTopics(topics) {
    	topics.forEach(this.removeOneTopic.bind(this));
    }
    removeOneTopic(name) {
    	console.log(`${this.log_prefix} remove topic ${name}`)
    	this.topics[name] = false;
    }
}
},{}],22:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.User = class User extends LV.EventEmitter {

    constructor(db) {
        super();
        this.local_db = new LV.PouchDB("lx-user");
        this.db = db;
        this.node = this.db.stor.user();
        this.pair = null;
        this.feed = new LX.Feed(this);

        this.on("auth", () => {
            this.listPackages().then((packages) => {
                this.feed.addManyPackages(packages);
            });
        });

    }

    get log_prefix() {
        return `[u:${this.username || "anonymous" }]`.padEnd(20, " ");
    }


    //-------------------------------------------------------------------------


    authOrRegister(skip_check) {
        if (skip_check) {
            console.log(`${this.log_prefix} make new credentials by explicit request`)
            this.register();
        }
        else {
            // check browser for known credentials for this user
            this.local_db.get("creds")
                .then((creds) => {
                    let requirements = ["username", "password"];
                    let is_valid = true;
                    requirements.forEach((key) =>  {
                        if (!creds.hasOwnProperty(key)) {
                            is_valid = false;
                            console.log(`${this.log_prefix} existing saved credentials missing required key: ${key}`);
                        }
                    });
                    if (is_valid) {
                        this.authenticate(creds.username, creds.password)
                            .catch(err => {
                                console.log(`${this.log_prefix}  removing invalid creds from storage`);
                                this.local_db.remove(creds).then(() => { 
                                    this.register();
                                });
                            });
                    }
                    else {
                        console.log(`${this.log_prefix}  removing invalid creds from storage`);
                        this.local_db.remove(creds).then(() => { 
                            this.register();
                        });
                    }
                })
                .catch((e) => {
                    if (e.name == "not_found") {
                        this.register()
                    }
                    else {
                        console.log(`${this.log_prefix} error getting creds`, e);
                    }
                });
        }
    }
    
    /**
    * Authenticates the user with decentralized database
    */
    authenticate(username, password) {
        return new Promise((resolve, reject) => {
            this.node.auth(username, password, (ack) => {
                if (ack.err) {
                    console.log(`${this.log_prefix} bad auth`, ack.err);
                    reject(ack.err);
                }
                else {
                    this.username = username;
                    console.log(`${this.log_prefix} good auth`);
                    SEA.pair().then((pair) => {
                        this.pair = pair;
                        this.emit("auth", this.pair);
                        resolve(this.pair);
                    });
                }
            });
        });
    }


    /**
    * Registers first-time user into the decentralized database
    */
    register() {
        return new Promise((resolve, reject) => {

            let username = LV.ShortID.generate();
            let password = LV.ShortID.generate();
            this.username = username;
            console.log(`${this.log_prefix} create user with username: ${username}`);
            this.node.create(username, password, (ack) => {
                if (ack.err) {
                    console.log(`${this.log_prefix} unable to save`, ack.err);
                    return reject(ack.err);
                }

                console.log(`${this.log_prefix} saved to browser`);

                let doc = {
                    "_id" : "creds",
                    "username": username,
                    "password": password
                }
                this.local_db.put(doc)
                    .then(() => {
                        this.authenticate(username, password);
                    })
                    .catch((e) => {
                        console.log(`${this.log_prefix}unable to save`, e);
                    });


                this.emit("registered");
                resolve();
            });
        });
    }


    //-------------------------------------------------------------------------

    /**
    * List packages which are installed for this user
    */
    listPackages() {
        return new Promise((resolve, reject) => {
            let node = this.node.get("packages");
            node.once((v,k) => {
                let packages = [];
                if (!v) {
                    return resolve(packages);
                }
                Object.keys(v).forEach((pkg) => {
                    if (pkg == "_"  || pkg == "#" || v[pkg] == null) return;
                    if (typeof(v[pkg]) != "string") {
                        console.warn(`${this.log_prefix} Nullifying non-string value for ${pkg} package:`, v[pkg]);
                        node.get(pkg).put(null);
                    }
                    else {
                        packages.push(pkg + "@" + v[pkg]);
                    }
                });
                resolve(packages);
            });
        });

    }
    /**
    * Installs a package for a given user and thereby makes available to end-user device
    */
    install(pkg) {
        return new Promise((resolve, reject) => {
            let node_to_install = this.node.get("packages").get(pkg.name)

            node_to_install.once((v, k) => {
                    if (v) {
                        console.log(`${this.log_prefix} ${pkg.name}@${pkg.version} package already installed`);
                        resolve(pkg);
                    }
                    else {
                        console.log("package not yet installed", this.node.get("packages"), pkg.name);

                        // does not erase other key/value pairs here
                        this.node.get("packages").get(pkg.name).put(pkg.version, (ack) => {
                            if (ack.err) {
                                reject(ack.err)
                            }
                            else {
                                // id is name@version combined
                                console.log(`${this.log_prefix} ${pkg.id} installed`);
                                this.feed.addOnePackage(pkg.id);
                                this.emit("install", pkg.id);                            
                                resolve(pkg);
                            }
                        });
                    }
                });
        });
    }

     /**
    * Removes a package for a given user and cleans up references to related data
    */
    uninstall(pkg) {
        return new Promise((resolve, reject) => {
             this.node.get("packages").get(pkg.name)
                .put(null)
                .once((v,k) => {
                        console.log(`${this.log_prefix} uninstalled package ${pkg.name}`);
                        this.node.get("packages").get(pkg.name).put(null);
                        this.feed.removeOnePackage(pkg.name);
                        this.emit("uninstall", pkg.name);
                        resolve();
                    });
            });

    }




    //-------------------------------------------------------------------------

    /**
    * List topics the user has subscribed to and wants to receive data for
    */
    listTopics() {
        this.node.get("topics").once((v,k) => {
            if (!v) return;
            Object.keys(v).forEach((pkg) => {
                if (pkg == "_" || v[pkg] == null) return;
                console.log(`${this.log_prefix} subscribed topics ${pkg}:`, v[pkg]);
            });
        });
    }

    /**
    * Explicitly gather data on a given topic from available packages
    */
    subscribe(topic) {
        this.node.get("topics").get(topic).set(true).once(() => {
            console.log(`${this.log_prefix} subscribe to topic ${topic}`);
            this.emit("subscribe", name);
        });
    }
    
    /**
    * Remove and stop watching for data on a given topic
    */
    unsubscribe(topic) {
        this.node.get("topics").get(topic).set(false).once(() => {
            console.log(`${this.log_prefix} unsubscribe from topic ${topic}`);        
            this.emit("subscribe", name);
        });
    }

}

},{}],23:[function(require,module,exports){
"use strict";

const LV = window.LV || {}; if (!window.LV) window.LV = LV;

LV.GraphDB = require("gun");
LV.SEA = require("sea");
LV.ShortID = require("shortid");
/** 
* gun-unset
* https://github.com/d3x0r/gun-unset
**/
const rel_ = LV.GraphDB.val.rel._;  // '#'
const node_ = LV.GraphDB.node._;  // '_'

LV.GraphDB.chain.unset = function(node){
    if( this && node && node[node_] && node[node_].put && node[node_].put[node_] && node[node_].put[node_][rel_] )
        this.put( { [node[node_].put[node_][rel_]]:null} );
    return this;
}
},{"gun":1,"sea":2,"shortid":4}],24:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],25:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":24,"ieee754":26}],26:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}]},{},[13,15,14,23,18,16,17,21,22,19,20]);
