(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
!function(){function t(n,o){function e(t){return t.split("/").slice(-1).toString().replace(".js","")}return o?require(n):n.slice?t[e(n)]:function(o,i){n(o={exports:{}}),t[e(i)]=o.exports}}var n;"undefined"!=typeof window&&(n=window),"undefined"!=typeof global&&(n=global),n=n||{};var o=n.console||{log:function(){}};if("undefined"!=typeof module)var e=module;t(function(t){var n={};n.fn={is:function(t){return!!t&&"function"==typeof t}},n.bi={is:function(t){return t instanceof Boolean||"boolean"==typeof t}},n.num={is:function(t){return!e(t)&&(t-parseFloat(t)+1>=0||1/0===t||-(1/0)===t)}},n.text={is:function(t){return"string"==typeof t}},n.text.ify=function(t){return n.text.is(t)?t:"undefined"!=typeof JSON?JSON.stringify(t):t&&t.toString?t.toString():t},n.text.random=function(t,n){var o="";for(t=t||24,n=n||"0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz";t>0;)o+=n.charAt(Math.floor(Math.random()*n.length)),t--;return o},n.text.match=function(t,o){function e(t,n){for(var o,e=-1,i=0;o=n[i++];)if(!~(e=t.indexOf(o,e+1)))return!1;return!0}var i=!1;if(t=t||"",o=n.text.is(o)?{"=":o}:o||{},n.obj.has(o,"~")&&(t=t.toLowerCase(),o["="]=(o["="]||o["~"]).toLowerCase()),n.obj.has(o,"="))return t===o["="];if(n.obj.has(o,"*")){if(t.slice(0,o["*"].length)!==o["*"])return!1;i=!0,t=t.slice(o["*"].length)}if(n.obj.has(o,"!")){if(t.slice(-o["!"].length)!==o["!"])return!1;i=!0}if(n.obj.has(o,"+")&&n.list.map(n.list.is(o["+"])?o["+"]:[o["+"]],function(n){return t.indexOf(n)>=0?void(i=!0):!0}))return!1;if(n.obj.has(o,"-")&&n.list.map(n.list.is(o["-"])?o["-"]:[o["-"]],function(n){return t.indexOf(n)<0?void(i=!0):!0}))return!1;if(n.obj.has(o,">")){if(!(t>o[">"]))return!1;i=!0}if(n.obj.has(o,"<")){if(!(t<o["<"]))return!1;i=!0}if(n.obj.has(o,"?")){if(!e(t,o["?"]))return!1;i=!0}return i},n.list={is:function(t){return t instanceof Array}},n.list.slit=Array.prototype.slice,n.list.sort=function(t){return function(n,o){return n&&o?(n=n[t],o=o[t],o>n?-1:n>o?1:0):0}},n.list.map=function(t,n,o){return u(t,n,o)},n.list.index=1,n.obj={is:function(t){return t?t instanceof Object&&t.constructor===Object||"Object"===Object.prototype.toString.call(t).match(/^\[object (\w+)\]$/)[1]:!1}},n.obj.put=function(t,n,o){return(t||{})[n]=o,t},n.obj.has=function(t,n){return t&&Object.prototype.hasOwnProperty.call(t,n)},n.obj.del=function(t,n){return t?(t[n]=null,delete t[n],t):void 0},n.obj.as=function(t,n,o,e){return t[n]=t[n]||(e===o?{}:o)},n.obj.ify=function(t){if(r(t))return t;try{t=JSON.parse(t)}catch(n){t={}}return t},function(){function t(t,n){a(this,n)&&o!==this[n]||(this[n]=t)}var o;n.obj.to=function(n,o){return o=o||{},u(n,t,o),o}}(),n.obj.copy=function(t){return t?JSON.parse(JSON.stringify(t)):t},function(){function t(t,n){var o=this.n;if(!o||!(n===o||r(o)&&a(o,n)))return n?!0:void 0}n.obj.empty=function(n,o){return n&&u(n,t,{n:o})?!1:!0}}(),function(){function t(n,o){return 2===arguments.length?(t.r=t.r||{},void(t.r[n]=o)):(t.r=t.r||[],void t.r.push(n))}var i=Object.keys;n.obj.map=function(u,s,f){var c,l,p,d,h,v=0,g=o(s);if(t.r=null,i&&r(u)&&(d=i(u),h=!0),e(u)||d)for(l=(d||u).length;l>v;v++){var m=v+n.list.index;if(g){if(p=h?s.call(f||this,u[d[v]],d[v],t):s.call(f||this,u[v],m,t),p!==c)return p}else if(s===u[h?d[v]:v])return d?d[v]:m}else for(v in u)if(g){if(a(u,v)&&(p=f?s.call(f,u[v],v,t):s(u[v],v,t),p!==c))return p}else if(s===u[v])return v;return g?t.r:n.list.index?0:-1}}(),n.time={},n.time.is=function(t){return t?t instanceof Date:+(new Date).getTime()};var o=n.fn.is,e=n.list.is,i=n.obj,r=i.is,a=i.has,u=i.map;t.exports=n})(t,"./type"),t(function(t){t.exports=function n(t,o,e){if(!t)return{to:n};var i,t=(this.tag||(this.tag={}))[t]||(this.tag[t]={tag:t,to:n._={next:function(t){var n;(n=this.to)&&n.next(t)}}});if(o instanceof Function){var r={off:n.off||(n.off=function(){return this.next===n._.next?!0:(this===this.the.last&&(this.the.last=this.back),this.to.back=this.back,this.next=n._.next,this.back.to=this.to,void(this.the.last===this.the&&delete this.on.tag[this.the.tag]))}),to:n._,next:o,the:t,on:this,as:e};return(r.back=t.last||t).to=r,t.last=r}return(t=t.to)&&i!==o&&t.next(o),t}})(t,"./onto"),t(function(t){function n(t,n,e,i,r){if(n>t)return{defer:!0};if(e>n)return{historical:!0};if(n>e)return{converge:!0,incoming:!0};if(n===e){if(i=o(i)||"",r=o(r)||"",i===r)return{state:!0};if(r>i)return{converge:!0,current:!0};if(i>r)return{converge:!0,incoming:!0}}return{err:"Invalid CRDT Data: "+i+" to "+r+" at "+n+" to "+e+"!"}}if("undefined"==typeof JSON)throw new Error("JSON is not included in this browser. Please load it first: ajax.cdnjs.com/ajax/libs/json2/20110223/json2.js");var o=JSON.stringify;t.exports=n})(t,"./HAM"),t(function(n){var o=t("./type"),e={};e.is=function(t){return t===i?!1:null===t?!0:t===1/0?!1:s(t)||a(t)||u(t)?!0:e.rel.is(t)||!1},e.link=e.rel={_:"#"},function(){function t(t,n){var o=this;return o.id?o.id=!1:n==r&&s(t)?void(o.id=t):o.id=!1}e.rel.is=function(n){if(n&&n[r]&&!n._&&c(n)){var o={};if(p(n,t,o),o.id)return o.id}return!1}}(),e.rel.ify=function(t){return l({},r,t)},o.obj.has._=".";var i,r=e.link._,a=o.bi.is,u=o.num.is,s=o.text.is,f=o.obj,c=f.is,l=f.put,p=f.map;n.exports=e})(t,"./val"),t(function(n){var o=t("./type"),e=t("./val"),i={_:"_"};i.soul=function(t,n){return t&&t._&&t._[n||p]},i.soul.ify=function(t,n){return n="string"==typeof n?{soul:n}:n||{},t=t||{},t._=t._||{},t._[p]=n.soul||t._[p]||l(),t},i.soul._=e.link._,function(){function t(t,n){return n!==i._?e.is(t)?void(this.cb&&this.cb.call(this.as,t,n,this.n,this.s)):!0:void 0}i.is=function(n,o,e){var r;return u(n)&&(r=i.soul(n))?!f(n,t,{as:e,cb:o,s:r,n:n}):!1}}(),function(){function t(t,n){var o,i,r=this.o;return r.map?(o=r.map.call(this.as,t,""+n,r.node),void(i===o?s(r.node,n):r.node&&(r.node[n]=o))):void(e.is(t)&&(r.node[n]=t))}i.ify=function(n,o,e){return o?"string"==typeof o?o={soul:o}:o instanceof Function&&(o={map:o}):o={},o.map&&(o.node=o.map.call(e,n,r,o.node||{})),(o.node=i.soul.ify(o.node||{},o))&&f(n,t,{o:o,as:e}),o.node}}();var r,a=o.obj,u=a.is,s=a.del,f=a.map,c=o.text,l=c.random,p=i.soul._;n.exports=i})(t,"./node"),t(function(n){function o(){var t;return t=r(),t>a?(u=0,a=t+o.drift):a=t+(u+=1)/s+o.drift}{var e=t("./type"),i=t("./node"),r=e.time.is,a=-(1/0),u=0,s=1e3,f="undefined"!=typeof performance?performance.timing&&performance:!1;f&&f.timing&&f.timing.navigationStart||(f=!1)}o._=">",o.drift=0,o.is=function(t,n,e){var i=n&&t&&t[x]&&t[x][o._]||e;if(i)return b(i=i[n])?i:-(1/0)},o.lex=function(){return o().toString(36).replace(".","")},o.ify=function(t,n,e,r,a){if(!t||!t[x]){if(!a)return;t=i.soul.ify(t,a)}var u=p(t[x],o._);return c!==n&&n!==x&&(b(e)&&(u[n]=e),c!==r&&(t[n]=r)),t},o.to=function(t,n,e){var r=(t||{})[n];return h(r)&&(r=g(r)),o.ify(e,n,o.is(t,n),r,i.soul(t))},function(){function t(t,n){x!==n&&o.ify(this.o,n,this.s)}o.map=function(n,e,i){var r,a=h(a=n||e)?a:null;return n=y(n=n||e)?n:null,a&&!n?(e=b(e)?e:o(),a[x]=a[x]||{},v(a,t,{o:a,s:e}),a):(i=i||h(e)?e:r,e=b(e)?e:o(),function(o,a,u,s){return n?(n.call(i||this||{},o,a,u,s),void(d(u,a)&&r===u[a]||t.call({o:u,s:e},o,a))):(t.call({o:u,s:e},o,a),o)})}}();var c,l=e.obj,p=l.as,d=l.has,h=l.is,v=l.map,g=l.copy,m=e.num,b=m.is,k=e.fn,y=k.is,x=i._;n.exports=o})(t,"./state"),t(function(n){var o=t("./type"),e=t("./val"),i=t("./node"),r={};!function(){function t(t,o){return t&&o===i.soul(t)&&i.is(t,this.fn,this.as)?void(this.cb&&(n.n=t,n.as=this.as,this.cb.call(n.as,t,o,n))):!0}function n(t){t&&i.is(n.n,t,n.as)}r.is=function(n,o,e,i){return n&&s(n)&&!l(n)?!d(n,t,{cb:o,fn:e,as:i}):!1}}(),function(){function t(t,o){var r;return(r=p(t,o))?r:(o.env=t,o.soul=u,i.ify(o.obj,n,o)&&(o.rel=o.rel||e.rel.ify(i.soul(o.node)),o.obj!==t.shell&&(t.graph[e.rel.is(o.rel)]=o.node)),o)}function n(n,o,r){var u,s,p=this,d=p.env;if(i._===o&&c(n,e.rel._))return r._;if(u=l(n,o,r,p,d)){if(o||(p.node=p.node||r||{},c(n,i._)&&i.soul(n)&&(p.node._=h(n._)),p.node=i.soul.ify(p.node,e.rel.is(p.rel)),p.rel=p.rel||e.rel.ify(i.soul(p.node))),(s=d.map)&&(s.call(d.as||{},n,o,r,p),c(r,o))){if(n=r[o],a===n)return void f(r,o);if(!(u=l(n,o,r,p,d)))return}if(!o)return p.node;if(!0===u)return n;if(s=t(d,{obj:n,path:p.path.concat(o)}),s.node)return s.rel}}function u(t){var n=this,o=e.link.is(n.rel),r=n.env.graph;n.rel=n.rel||e.rel.ify(t),n.rel[e.rel._]=t,n.node&&n.node[i._]&&(n.node[i._][e.rel._]=t),c(r,o)&&(r[t]=r[o],f(r,o))}function l(t,n,i,r,a){var u;return e.is(t)?!0:s(t)?1:(u=a.invalid)?(t=u.call(a.as||{},t,n,i),l(t,n,i,r,a)):(a.err="Invalid value at '"+r.path.concat(n).join(".")+"'!",void(o.list.is(t)&&(a.err+=" Use `.set(item)` instead of an Array.")))}function p(t,n){for(var o,e=t.seen,i=e.length;i--;)if(o=e[i],n.obj===o.obj)return o;e.push(n)}r.ify=function(n,o,i){var r={path:[],obj:n};return o?"string"==typeof o?o={soul:o}:o instanceof Function&&(o.map=o):o={},o.soul&&(r.rel=e.rel.ify(o.soul)),o.shell=(i||{}).shell,o.graph=o.graph||{},o.seen=o.seen||[],o.as=o.as||i,t(o,r),o.root=r.node,o.graph}}(),r.node=function(t){var n=i.soul(t);if(n)return p({},n,t)},function(){function t(t,n){var o,a;if(i._===n){if(l(t,e.rel._))return;return void(this.obj[n]=h(t))}return(o=e.rel.is(t))?(a=this.opt.seen[o])?void(this.obj[n]=a):void(this.obj[n]=this.opt.seen[o]=r.to(this.graph,o,this.opt)):void(this.obj[n]=t)}r.to=function(n,o,e){if(n){var i={};return e=e||{seen:{}},d(n[o],t,{obj:i,graph:n,opt:e}),i}}}();var a,u=(o.fn.is,o.obj),s=u.is,f=u.del,c=u.has,l=u.empty,p=u.put,d=u.map,h=u.copy;n.exports=r})(t,"./graph"),t(function(n){t("./onto"),n.exports=function(t,n){if(this.on){if(!(t instanceof Function)){if(!t||!n)return;var o=t["#"]||t,e=(this.tag||empty)[o];if(!e)return;return e=this.on(o,n),clearTimeout(e.err),!0}var o=n&&n["#"]||Math.random().toString(36).slice(2);if(!t)return o;var i=this.on(o,t,n);return i.err=i.err||setTimeout(function(){i.next({err:"Error: No ACK received yet.",lack:!0}),i.off()},(this.opt||{}).lack||9e3),o}}})(t,"./ask"),t(function(n){function o(t){var n={s:{}};return t=t||{max:1e3,age:9e3},n.check=function(t){var o;return(o=n.s[t])?o.pass?o.pass=!1:n.track(t):!1},n.track=function(o,r){var a=n.s[o]||(n.s[o]={});return a.was=i(),r&&(a.pass=!0),n.to||(n.to=setTimeout(function(){var o=i();e.obj.map(n.s,function(i,r){i&&t.age>o-i.was||e.obj.del(n.s,r)}),n.to=null},t.age+9)),a},n}var e=t("./type"),i=e.time.is;n.exports=o})(t,"./dup"),t(function(n){function i(t){return t instanceof i?(this._={gun:this,$:this}).$:this instanceof i?i.create(this._={gun:this,$:this,opt:t}):new i(t)}i.is=function(t){return t instanceof i||t&&t._&&t===t._.$||!1},i.version=.9,i.chain=i.prototype,i.chain.toJSON=function(){};var r=t("./type");r.obj.to(r,i),i.HAM=t("./HAM"),i.val=t("./val"),i.node=t("./node"),i.state=t("./state"),i.graph=t("./graph"),i.on=t("./onto"),i.ask=t("./ask"),i.dup=t("./dup"),function(){function t(n){var o,e,r=this,u=r.as,s=u.at||u,f=s.$;return(e=n["#"])||(e=n["#"]=c(9)),(o=s.dup).check(e)?void(u.out===n.out&&(n.out=a,r.to.next(n))):(o.track(e),s.ask(n["@"],n)||(n.get&&i.on.get(n,f),n.put&&i.on.put(n,f)),r.to.next(n),void(u.out||(n.out=t,s.on("out",n))))}i.create=function(n){n.root=n.root||n,n.graph=n.graph||{},n.on=n.on||i.on,n.ask=n.ask||i.ask,n.dup=n.dup||i.dup();var o=n.$.opt(n.opt);return n.once||(n.on("in",t,n),n.on("out",t,{at:n,out:t}),i.on("create",n),n.on("create",n)),n.once=1,o}}(),function(){function t(t,n,o,e){var r=this,a=i.state.is(o,n);if(!a)return r.err="Error: No state on '"+n+"' in node '"+e+"'!";var u=r.graph[e]||k,s=i.state.is(u,n,!0),f=u[n],c=i.HAM(r.machine,a,s,t,f);return c.incoming?(r.put[e]=i.state.to(o,n,r.put[e]),(r.diff||(r.diff={}))[e]=i.state.to(o,n,r.diff[e]),void(r.souls[e]=!0)):void(c.defer&&(r.defer=a<(r.defer||1/0)?a:r.defer))}function n(t,n){var i=this,a=i.$._,u=(a.next||k)[n];if(!u){if(!(a.opt||k)["super"])return void(i.souls[n]=!1);u=i.$.get(n)._}var s=i.map[n]={put:t,get:n,$:u.$},f={ctx:i,msg:s};i.async=!!a.tag.node,i.ack&&(s["@"]=i.ack),v(t,o,f),i.async&&(i.and||a.on("node",function(t){this.to.next(t),t===i.map[t.get]&&(i.souls[t.get]=!1,v(t.put,e,t),v(i.souls,function(t){return t?t:void 0})||i.c||(i.c=1,this.off(),v(i.map,r,i)))}),i.and=!0,a.on("node",s))}function o(t,n){var o=this.ctx,e=o.graph,r=this.msg,a=r.get,u=r.put,s=r.$._;e[a]=i.state.to(u,n,e[a]),o.async||(s.put=i.state.to(u,n,s.put))}function e(t,n){var o=this,e=o.put,r=o.$._;r.put=i.state.to(e,n,r.put)}function r(t){t.$&&(this.cat.stop=this.stop,t.$._.on("in",t),this.cat.stop=null)}i.on.put=function(o,e){var u=e._,s={$:e,graph:u.graph,put:{},map:{},souls:{},machine:i.state(),ack:o["@"],cat:u,stop:{}};return i.graph.is(o.put,null,t,s)||(s.err="Error: Invalid graph!"),s.err?u.on("in",{"@":o["#"],err:i.log(s.err)}):(v(s.put,n,s),s.async||v(s.map,r,s),a!==s.defer&&setTimeout(function(){i.on.put(o,e)},s.defer-s.machine),void(s.diff&&u.on("put",h(o,{put:s.diff}))))},i.on.get=function(t,n){var o,e=n._,r=t.get,a=r[m],u=e.graph[a],s=r[b],f=e.next||(e.next={}),c=f[a];if(d(a,"*")){var l={};i.obj.map(e.graph,function(t,n){i.text.match(n,a)&&(l[n]=i.obj.copy(t))}),i.obj.empty(l)||e.on("in",{"@":t["#"],how:"*",put:l,$:n})}if(!u)return e.on("get",t);if(s){if(!d(u,s))return e.on("get",t);u=i.state.to(u,s)}else u=i.obj.copy(u);u=i.graph.node(u),o=(c||k).ack,e.on("in",{"@":t["#"],how:"mem",put:u,$:n}),e.on("get",t)}}(),function(){i.chain.opt=function(t){t=t||{};var n=this,o=n._,e=t.peers||t;return p(t)||(t={}),p(o.opt)||(o.opt=t),f(e)&&(e=[e]),u(e)&&(e=v(e,function(t,n,o){o(t,{url:t})}),p(o.opt.peers)||(o.opt.peers={}),o.opt.peers=h(e,o.opt.peers)),o.opt.peers=o.opt.peers||{},h(t,o.opt),i.on("opt",o),o.opt.uuid=o.opt.uuid||function(){return g()+c(12)},n}}();var a,u=i.list.is,s=i.text,f=s.is,c=s.random,l=i.obj,p=l.is,d=l.has,h=l.to,v=l.map,g=(l.copy,i.state.lex),m=i.val.rel._,b=".",k=(i.node._,i.val.link.is,{});o.debug=function(t,n){return o.debug.i&&t===o.debug.i&&o.debug.i++&&(o.log.apply(o,arguments)||n)},i.log=function(){return!i.log.off&&o.log.apply(o,arguments),[].slice.call(arguments).join(" ")},i.log.once=function(t,n,o){return(o=i.log.once)[t]=o[t]||0,o[t]++||i.log(n)},i.log.once("welcome","Hello wonderful person! :) Thanks for using GUN, feel free to ask for help on https://gitter.im/amark/gun and ask StackOverflow questions tagged with 'gun'!"),"undefined"!=typeof window&&((window.GUN=window.Gun=i).window=window);try{"undefined"!=typeof e&&(e.exports=i)}catch(y){}n.exports=i})(t,"./root"),t(function(){var n=t("./root");n.chain.back=function(t,i){var r;if(t=t||1,-1===t||1/0===t)return this._.root.$;if(1===t)return(this._.back||this._).$;var a=this,u=a._;if("string"==typeof t&&(t=t.split(".")),!(t instanceof Array)){if(t instanceof Function){for(var s,r={back:u};(r=r.back)&&o===(s=t(r,i)););return s}return n.num.is(t)?(u.back||u).$.back(t-1):this}var f=0,c=t.length,r=u;for(f;c>f;f++)r=(r||e)[t[f]];return o!==r?i?a:r:(r=u.back)?r.$.back(t,i):void 0};var o,e={}})(t,"./back"),t(function(){function n(t){var n,o,e,i=this.as,r=i.back,a=i.root;if(t.I||(t.I=i.$),t.$||(t.$=i.$),this.to.next(t),o=t.get){if(o["#"]||i.soul){if(o["#"]=o["#"]||i.soul,t["#"]||(t["#"]=b(9)),r=a.$.get(o["#"])._,o=o["."]){if(h(r.put,o)&&(n=r.$.get(o)._,(e=n.ack)||(n.ack=-1),r.on("in",{$:r.$,put:c.state.to(r.put,o),get:r.get}),e))return}else{if(e=r.ack,e||(r.ack=-1),h(r,"put")&&r.on("in",r),e)return;t.$=r.$}return a.ask(f,t),a.on("in",t)}if(a.now&&(a.now[i.id]=a.now[i.id]||!0,i.pass={}),o["."])return i.get?(t={get:{".":i.get},$:i.$},r.ask||(r.ask={}),r.ask[i.get]=t.$._,r.on("out",t)):(t={get:{},$:i.$},r.on("out",t));if(i.ack=i.ack||-1,i.get)return t.$=i.$,o["."]=i.get,(r.ask||(r.ask={}))[i.get]=t.$._,r.on("out",t)}return r.on("out",t)}function o(t){var n,o,r=this,s=r.as,f=s.root,d=t.$,b=(d||p)._||p,k=t.put;if(s.get&&t.get!==s.get&&(t=g(t,{get:s.get})),s.has&&b!==s&&(t=g(t,{$:s.$}),b.ack&&(s.ack=b.ack)),l===k){if(o=b.put,r.to.next(t),s.soul)return;if(l===o&&l!==b.put)return;return i(s,t,r),s.has&&u(s,t),v(b.echo,s.id),void v(s.map,b.id)}if(s.soul)return r.to.next(t),i(s,t,r),void(s.next&&m(k,a,{msg:t,cat:s}));if(!(n=c.val.link.is(k)))return c.val.is(k)?(s.has||s.soul?u(s,t):(b.has||b.soul)&&((b.echo||(b.echo={}))[s.id]=b.echo[b.id]||s,(s.map||(s.map={}))[b.id]=s.map[b.id]||{at:b}),r.to.next(t),void i(s,t,r)):(s.has&&b!==s&&h(b,"put")&&(s.put=b.put),(n=c.node.soul(k))&&b.has&&(b.put=s.root.$.get(n)._.put),o=(f.stop||{})[b.id],r.to.next(t),e(s,t,b,n),i(s,t,r),void(s.next&&m(k,a,{msg:t,cat:s})));f.stop;o=f.stop||{},o=o[b.id]||(o[b.id]={}),o.is=o.is||b.put,o[s.id]=b.put||!0,r.to.next(t),e(s,t,b,n),i(s,t,r)}function e(t,n,o,i){if(i&&k!==t.get){var r=t.root.$.get(i)._;t.has?o=r:o.has&&e(o,n,o,i),o!==t&&(o.$||(o={}),(o.echo||(o.echo={}))[t.id]=o.echo[t.id]||t,t.has&&!(t.map||p)[o.id]&&u(t,n),r=o.id?(t.map||(t.map={}))[o.id]=t.map[o.id]||{at:o}:{},(i!==r.link||r.pass||t.pass)&&(t.pass&&(c.obj.map(t.map,function(t){t.pass=!0}),v(t,"pass")),r.pass&&v(r,"pass"),t.has&&(t.link=i),s(t,r.link=i)))}}function i(t,n){t.echo&&m(t.echo,r,n)}function r(t){t&&t.on&&t.on("in",this)}function a(t,n){var o,e,i,r=this.cat,a=r.next||p,u=this.msg;(k!==n||a[n])&&(e=a[n])&&(e.has?(l!==e.put&&c.val.link.is(t)||(e.put=t),o=e.$):(i=u.$)&&(i=(o=u.$.get(n))._,l!==i.put&&c.val.link.is(t)||(i.put=t)),e.on("in",{put:t,get:n,$:o,via:u}))}function u(t,n){if(t.has||t.soul){{var o=t.map;t.root}t.map=null,t.has&&(t.link=null),(t.pass||n["@"]||null!==o)&&(l===o&&c.val.link.is(t.put)||(m(o,function(n){(n=n.at)&&v(n.echo,t.id)}),o=t.put,m(t.next,function(n,e){return l===o&&l!==t.put?!0:(n.put=l,n.ack&&(n.ack=-1),void n.on("in",{get:e,$:n.$,put:l}))})))}}function s(t,n){var o=t.root.$.get(n)._;(!t.ack||(o.on("out",{get:{"#":n}}),t.ask))&&(o=t.ask,c.obj.del(t,"ask"),m(o||t.next,function(t,o){t.on("out",{get:{"#":n,".":o}})}),c.obj.del(t,"ask"))}function f(t){var n=this.as,o=n.get||p,e=n.$._,i=(t.put||p)[o["#"]];if(e.ack&&(e.ack=e.ack+1||1),!t.put||o["."]&&!h(i,e.get)){if(e.put!==l)return;return void e.on("in",{get:e.get,put:e.put=l,$:e.$,"@":t["@"]})}return k==o["."]?void e.on("in",{get:e.get,put:c.val.link.ify(o["#"]),$:e.$,"@":t["@"]}):(t.$=e.root.$,void c.on.put(t,e.root.$))}var c=t("./root");c.chain.chain=function(t){var e,i=this,r=i._,a=new(t||i).constructor(i),u=a._;return u.root=e=r.root,u.id=++e.once,u.back=i._,u.on=c.on,u.on("in",o,u),u.on("out",n,u),a};var l,p={},d=c.obj,h=d.has,v=(d.put,d.del),g=d.to,m=d.map,b=c.text.random,k=(c.val.rel._,c.node._)})(t,"./chain"),t(function(){function n(t,n){var o=n._,e=o.next,i=n.chain(),r=i._;return e||(e=o.next={}),e[r.get=t]=r,n===o.root.$?r.soul=t:(o.soul||o.has)&&(r.has=t),r}function o(t,n,o,e){var i,r=t._,u=0;return(i=r.soul)?(n(i,e,r),t):(i=r.link)?(n(i,e,r),t):(t.get(function(t,o){if(!(a===t.put&&(i=(s(r.root.opt.peers,function(t,n,o){o(n)})||[]).length)&&u++<=i)){o.rid(t);var f=(f=t.$)&&f._||{};i=f.link||f.soul||l.is(t.put)||p(t.put)||f.dub,n(i,e,t,o)}},{out:{get:{".":!0}}}),t)}function e(t){var n,o=this,e=o.as,i=e.at,u=i.root,s=t.$,c=(s||{})._||{},p=t.put||c.put;if((n=u.now)&&o!==n[e.now])return o.to.next(t);if(o.seen&&c.id&&o.seen[c.id])return o.to.next(t);if((n=p)&&n[l._]&&(n=l.is(n))&&(n=(t.$$=c.root.gun.get(n))._,a!==n.put&&(t=f(t,{put:p=n.put}))),(n=u.mum)&&c.id){var d=c.id+(o.id||(o.id=r.text.random(9)));if(n[d])return;a===p||l.is(p)||(n[d]=!0)}return e.use(t,o),o.stun?void(o.stun=null):void o.to.next(t)}function i(t){var n=this.on;if(!t||n.soul||n.has)return this.off();if(t=(t=(t=t.$||t)._||t).id){{var o,e;n.map}return(o=(e=this.seen||(this.seen={}))[t])?!0:void(e[t]=!0)}}var r=t("./root");r.chain.get=function(t,a,u){var s,f;if("string"!=typeof t){if(t instanceof Function){if(!0===a)return o(this,t,a,u);s=this;var p,h=s._,v=h.root,f=v.now;u=a||{},u.at=h,u.use=t,u.out=u.out||{},u.out.get=u.out.get||{},(p=h.on("in",e,u)).rid=i,(v.now={$:1})[u.now=h.id]=p;var g=v.mum;return v.mum={},h.on("out",u.out),v.mum=g,v.now=f,s}return c(t)?this.get(""+t,a,u):(f=l.is(t))?this.get(f,a,u):((u=this.chain())._.err={err:r.log("Invalid get request!",t)},a&&a.call(u,u._.err),u)}var m=this,b=m._,k=b.next||d;return(s=k[t])||(s=n(t,m)),s=s.$,(f=b.stun)&&(s._.stun=s._.stun||f),a&&a instanceof Function&&s.get(a,u),s};var a,u=r.obj,s=u.map,f=(u.has,r.obj.to),c=r.num.is,l=r.val.link,p=r.node.soul,d=(r.node._,{})})(t,"./get"),t(function(){function n(t){t.batch=i;var n=t.opt||{},o=t.env=c.state.map(a,n.state);return o.soul=t.soul,t.graph=c.graph.ify(t.data,o,t),o.err?((t.ack||m).call(t,t.out={err:c.log(o.err)}),void(t.res&&t.res())):void t.batch()}function e(t){return void(t&&t())}function i(){var t=this;t.graph&&!v(t.stun,r)&&(t.res=t.res||function(t){t&&t()},t.res(function(){var n=t.$.back(-1)._,o=n.ask(function(o){n.root.on("ack",o),o.err&&c.log(o),o.lack||this.off(),t.ack&&t.ack(o,this)},t.opt),e=n.root.now;p.del(n.root,"now");var i=n.root.mum;n.root.mum={},t.ref._.on("out",{$:t.ref,put:t.out=t.env.graph,opt:t.opt,"#":o}),n.root.mum=i?p.to(i,n.root.mum):i,n.root.now=e},t),t.res&&t.res())}function r(t){return t?!0:void 0}function a(t,n,o,e){var i=this,r=c.is(t);!n&&e.path.length&&(i.res||b)(function(){var n=e.path,o=i.ref,a=(i.opt,0),s=n.length;for(a;s>a;a++)o=o.get(n[a]);r&&(o=t);var f=o._.dub;return f||(f=c.node.soul(e.obj))?(o.back(-1).get(f),void e.soul(f)):((i.stun=i.stun||{})[n]=!0,void o.get(u,!0,{as:{at:e,as:i,p:n}}))},{as:i,at:e})}function u(t,n,o,e){var n=n.as,i=n.at;n=n.as;var r=((o||{}).$||{})._||{};return t=r.dub=r.dub||t||c.node.soul(i.obj)||c.node.soul(o.put||r.put)||c.val.rel.is(o.put||r.put)||(n.via.back("opt.uuid")||c.text.random)(),e&&(e.stun=!0),t?void s(r,r.dub=t,i,n):void r.via.back("opt.uuid")(function(t,o){return t?c.log(t):void s(r,r.dub=r.dub||o,i,n)})}function s(t,n,o,e){t.$.back(-1).get(n),o.soul(n),e.stun[o.path]=!1,e.batch()}function f(t,n,e,i){if(n=n.as,e.$&&e.$._){if(e.err)return void o.log("Please report this as an issue! Put.any.err");var r,a=e.$._,u=a.put,s=n.opt||{};if(!(r=n.ref)||!r._.now){if(i&&(i.stun=!0),n.ref!==n.$){if(r=n.$._.get||a.get,!r)return void o.log("Please report this as an issue! Put.no.get");n.data=h({},r,n.data),r=null}if(l===u){if(!a.get)return;t||(r=a.$.back(function(t){return t.link||t.soul?t.link||t.soul:void(n.data=h({},t.get,n.data))})),r=r||a.soul||a.link||a.dub,a=r?a.root.$.get(r)._:a,n.soul=r,u=n.data}return n.not||(n.soul=n.soul||t)||(n.path&&d(n.data)?n.soul=(s.uuid||n.via.back("opt.uuid")||c.text.random)():(k==a.get&&(n.soul=(a.put||g)["#"]||a.dub),n.soul=n.soul||a.soul||a.soul||(s.uuid||n.via.back("opt.uuid")||c.text.random)()),n.soul)?void n.ref.put(n.data,n.soul,n):void n.via.back("opt.uuid")(function(t,o){return t?c.log(t):void n.ref.put(n.data,n.soul=o,n)})}}}var c=t("./root");c.chain.put=function(t,o,i){var r,a=this,u=a._,s=u.root.$;return i=i||{},i.data=t,i.via=i.$=i.via||i.$||a,"string"==typeof o?i.soul=o:i.ack=i.ack||o,u.soul&&(i.soul=u.soul),i.soul||s===a?d(i.data)?(i.soul=i.soul||(i.not=c.node.soul(i.data)||(i.via.back("opt.uuid")||c.text.random)()),i.soul?(i.$=s.get(i.soul),i.ref=i.$,n(i),a):(i.via.back("opt.uuid")(function(t,n){return t?c.log(t):void(i.ref||i.$).put(i.data,i.soul=n,i)}),a)):((i.ack||m).call(i,i.out={err:c.log("Data saved to the root level of the graph must be a node (an object), not a",typeof i.data,'of "'+i.data+'"!')}),i.res&&i.res(),a):c.is(t)?(t.get(function(t,n,e){return!t&&c.val.is(e.put)?c.log("The reference you are saving is a",typeof e.put,'"'+e.put+'", not a node (object)!'):void a.put(c.val.rel.ify(t),o,i)},!0),a):(i.ref=i.ref||s._===(r=u.back)?a:r.$,i.ref._.soul&&c.val.is(i.data)&&u.get?(i.data=h({},u.get,i.data),i.ref.put(i.data,i.soul,i),a):(i.ref.get(f,!0,{as:i}),i.out||(i.res=i.res||e,i.$._.stun=i.ref._.stun),a))};var l,p=c.obj,d=p.is,h=p.put,v=p.map,g={},m=function(){},b=function(t,n){t.call(n||g)},k=c.node._})(t,"./put"),t(function(n){var o=t("./root");t("./chain"),t("./back"),t("./put"),t("./get"),n.exports=o})(t,"./index"),t(function(){function n(t,n){{var o,e=this,r=t.$,a=(r||{})._||{},u=a.put||t.put;e.at}if(i!==u){if(o=t.$$){if(o=t.$$._,i===o.put)return;u=o.put}e.change&&(u=t.put),e.as?e.ok.call(e.as,t,n):e.ok.call(r,u,t.get,t,n)}}function o(t,n,r){var u,f,c=this.as,l=(c.at,t.$),p=l._,d=p.put||t.put;return(f=t.$$)&&(u=f=t.$$._,i!==u.put&&(d=u.put)),(f=n.wait)&&(f=f[p.id])&&clearTimeout(f),!r&&(i===d||p.soul||p.link||u&&!(0<u.ack))||i===d&&(f=(a(p.root.opt.peers,function(t,n,o){o(n)})||[]).length)&&!r&&(u||p).ack<=f?void(f=(n.wait={})[p.id]=setTimeout(function(){o.call({as:c},t,n,f||1)},c.wait||99)):(u&&i===u.put&&(f=s.is(d))&&(d=e.node.ify({},f)),n.rid(t),void c.ok.call(l||c.$,d,t.get))}var e=t("./index");e.chain.on=function(t,o,e,i){var r,a=this,u=a._;if("string"==typeof t)return o?(r=u.on(t,o,e||u,i),e&&e.$&&(e.subs||(e.subs=[])).push(r),a):u.on(t);var s=o;return s=!0===s?{change:!0}:s||{},s.at=u,s.ok=t,a.get(n,s),a},e.chain.val=function(t,n){return e.log.once("onceval","Future Breaking API Change: .val -> .once, apologies unexpected."),this.once(t,n)},e.chain.once=function(t,n){var r=this,a=r._,u=a.put;if(0<a.ack&&i!==u)return(t||f).call(r,u,a.get),r;if(!t){e.log.once("valonce","Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");var s=r.chain();return s._.nix=r.once(function(){s._.on("in",r._)}),s}return(n=n||{}).ok=t,n.at=a,n.out={"#":e.text.random(9)},r.get(o,{as:n}),n.async=!0,r},e.chain.off=function(){var t,n=this,o=n._,e=o.back;return e?((t=e.next)&&t[o.get]&&u(t,o.get),(t=e.ask)&&u(t,o.get),(t=e.put)&&u(t,o.get),(t=o.soul)&&u(e.root.graph,t),(t=o.map)&&a(t,function(t){t.link&&e.root.$.get(t.link).off()}),(t=o.next)&&a(t,function(t){t.$.off()}),o.on("off",{}),n):void 0};var i,r=e.obj,a=r.map,u=(r.has,r.del),s=(r.to,e.val.link),f=function(){}})(t,"./on"),t(function(){function n(t){return!t.put||e.val.is(t.put)?this.to.next(t):(this.as.nix&&this.off(),r(t.put,o,{at:this.as,msg:t}),void this.to.next(t))}function o(t,n){if(u!==n){var o=this.msg,e=o.$,i=this.at,r=e.get(n)._;(r.echo||(r.echo={}))[i.id]=r.echo[i.id]||i}}var e=t("./index");e.chain.map=function(t){var o,r=this,u=r._;return t?(e.log.once("mapfn","Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it."),o=r.chain(),r.map().on(function(n,r,u,s){var f=(t||a).call(this,n,r,u,s);if(i!==f)return n===f?o._.on("in",u):e.is(f)?o._.on("in",f._):void o._.on("in",{get:r,put:f})}),o):(o=u.each)?o:(u.each=o=r.chain(),o._.nix=r.back("nix"),r.on("in",n,o._),o)};var i,r=e.obj.map,a=function(){},u=e.node._})(t,"./map"),t(function(){var n=t("./index");n.chain.set=function(t,o,e){var i,r=this;return o=o||function(){},e=e||{},e.item=e.item||t,(i=n.node.soul(t))&&(t=n.obj.put({},i,n.val.link.ify(i))),n.is(t)?(t.get(function(t,i,a){return t?void r.put(n.obj.put({},t,n.val.link.ify(t)),o,e):o.call(r,{err:n.log('Only a node can be linked! Not "'+a.put+'"!')})},!0),t):(n.obj.is(t)&&(t=r.back(-1).get(i=i||n.node.soul(t)||r.back("opt.uuid")()).put(t)),r.get(i||n.state.lex()+n.text.random(7)).put(t,o,e))}})(t,"./set"),t(function(){if("undefined"!=typeof Gun){var t,n=function(){};try{t=(Gun.window||n).localStorage}catch(e){}t||(o.log("Warning: No localStorage exists to persist data to!"),t={setItem:function(t,n){this[t]=n},removeItem:function(t){delete this[t]},getItem:function(t){return this[t]}}),Gun.on("create",function(n){function o(t){if(!t.err&&t.ok){var n=t["@"];setTimeout(function(){Gun.obj.map(u,function(t,o){Gun.obj.map(t,function(o,e){n===o&&delete t[e]}),s(t)&&delete u[o]}),p()},i.wait||1)}}var e=this.to,i=n.opt;if(n.once)return e.next(n);i.prefix=i.file||"gun/";var r,a,u=Gun.obj.ify(t.getItem("gap/"+i.prefix))||{},s=Gun.obj.empty;if(!s(u)){var f=Gun.obj.ify(t.getItem(i.prefix))||{},c={};Gun.obj.map(u,function(t,n){Gun.obj.map(t,function(t,o){c[n]=Gun.state.to(f[n],o,c[n])})}),setTimeout(function(){n.on("out",{put:c,"#":n.ask(o),I:n.$})},1)}n.on("out",function(t){t.lS||(t.I&&t.put&&!t["@"]&&!s(i.peers)&&(r=t["#"],Gun.graph.is(t.put,null,l),a||(a=setTimeout(p,i.wait||1))),this.to.next(t))}),n.on("ack",o),e.next(n);var l=function(t,n,o,e){(u[e]||(u[e]={}))[n]=r},p=function(){clearTimeout(a),a=!1;try{t.setItem("gap/"+i.prefix,JSON.stringify(u))}catch(n){Gun.log(err=n||"localStorage failure")}}}),Gun.on("create",function(n){this.to.next(n);var o=n.opt;if(!n.once&&!1!==o.localStorage){o.prefix=o.file||"gun/";var e,i=(n.graph,{}),r=0,a=Gun.obj.ify(t.getItem(o.prefix))||{};n.on("localStorage",a),n.on("put",function(t){return this.to.next(t),Gun.graph.is(t.put,null,u),t["@"]||(i[t["#"]]=!0),r+=1,r>=(o.batch||1e3)?s():void(e||(e=setTimeout(s,o.wait||1)))}),n.on("get",function(t){function e(){if(s&&(i=s["#"])){var e=s["."];r=a[i]||u,r&&e&&(r=Gun.state.to(r,e)),(r||Gun.obj.empty(o.peers))&&n.on("in",{"@":t["#"],put:Gun.graph.node(r),how:"lS",lS:t.I})}}this.to.next(t);var i,r,u,s=t.get;Gun.debug?setTimeout(e,1):e()});var u=function(t,n,o,e){a[e]=Gun.state.to(o,n,a[e])},s=function(u){var f;r=0,clearTimeout(e),e=!1;var c=i;i={},u&&(a=u);try{t.setItem(o.prefix,JSON.stringify(a))}catch(l){Gun.log(f=(l||"localStorage failure")+" Consider using GUN's IndexedDB plugin for RAD for more storage space, temporary example at https://github.com/amark/gun/blob/master/test/tmp/indexedDB.html ."),n.on("localStorage:error",{err:f,file:o.prefix,flush:a,retry:s})}(f||Gun.obj.empty(o.peers))&&Gun.obj.map(c,function(t,o){n.on("in",{"@":o,err:f,ok:0})})}}})}})(t,"./adapters/localStorage"),t(function(n){function e(t){var n=function(){},u=t.opt||{};return u.log=u.log||o.log,u.gap=u.gap||u.wait||1,u.pack=u.pack||.3*(u.memory?1e3*u.memory*1e3:1399e6),n.out=function(o){var e;return this.to&&this.to.next(o),(e=o["@"])&&(e=t.dup.s[e])&&(e=e.it)&&e.mesh?(n.say(o,e.mesh.via,1),void(e["##"]=o["##"])):void n.say(o)},t.on("create",function(o){o.opt.pid=o.opt.pid||i.text.random(9),this.to.next(o),t.on("out",n.out)}),n.hear=function(o,e){if(o){var r,a,s,f=t.dup,c=o[0];if(u.pack<=o.length)return n.say({dam:"!",err:"Message too big!"},e);try{s=JSON.parse(o)}catch(l){u.log("DAM JSON parse error",l)}if("{"===c){if(!s)return;if(f.check(r=s["#"]))return;if(f.track(r,!0).it=s,(c=s["@"])&&s.put&&(a=s["##"]||(s["##"]=n.hash(s)),(c+=a)!=r)){if(f.check(c))return;(c=f.s)[a]=c[r]}return(s.mesh=function(){}).via=e,(c=s["><"])&&(s.mesh.to=i.obj.map(c.split(","),function(t,n,o){o(t,!0)})),s.dam?void((c=n.hear[s.dam])&&c(s,e,t)):void t.on("in",s)}if("["!==c);else{if(!s)return;for(var p,d=0;p=s[d++];)n.hear(p,e)}}},function(){function o(t){var n=t.batch;if(n&&(t.batch=t.tail=null,n.length))try{e(JSON.stringify(n),t)}catch(o){u.log("DAM JSON stringify error",o)}}function e(t,n){var o=n.wire;try{o.send?o.send(t):n.say&&n.say(t)}catch(e){(n.queue=n.queue||[]).push(t)}}n.say=function(r,s,f){if(!s)return void i.obj.map(u.peers,function(t){n.say(r,t)});var c,l,p,d=s.wire||u.wire&&u.wire(s);if(d&&(l=r.mesh||a,s!==l.via&&((p=l.raw)||(p=n.raw(r)),!((c=r["@"])&&(c=t.dup.s[c])&&(c=c.it)&&c.get&&c["##"]&&c["##"]===r["##"]||(c=l.to)&&(c[s.url]||c[s.id])&&!f)))){if(s.batch){if(s.tail=(s.tail||0)+p.length,s.tail<=u.pack)return void s.batch.push(p);o(s)}s.batch=[],setTimeout(function(){o(s)},u.gap),e(p,s)}}}(),function(){function o(t,n){var o;return n instanceof Object?(i.obj.map(Object.keys(n).sort(),a,{to:o={},on:n}),o):n}function a(t){this.to[t]=this.on[t]}n.raw=function(e){if(!e)return"";var a,c,l,p=t.dup,d=e.mesh||{};if(l=d.raw)return l;if("string"==typeof e)return e;e["@"]&&(l=e.put)&&((c=e["##"])||(a=s(l,o)||"",c=n.hash(e,a),e["##"]=c),(l=p.s)[c=e["@"]+c]=l[e["#"]],e["#"]=c||e["#"],a&&((e=i.obj.to(e)).put=f));var h=0,v=[];i.obj.map(u.peers,function(t){return v.push(t.url||t.id),++h>9?!0:void 0}),e["><"]=v.join();var g=s(e);return r!==a&&(l=g.indexOf(f,g.indexOf("put")),g=g.slice(0,l-1)+a+g.slice(l+f.length+1)),d&&(d.raw=g),g},n.hash=function(t,n){return e.hash(n||s(t.put,o)||"")||t["#"]||i.text.random(9)};var s=JSON.stringify,f=":])([:"}(),n.hi=function(o){var e=o.wire||{};o.id||o.url?(u.peers[o.url||o.id]=o,i.obj.del(u.peers,e.id)):(e=e.id=e.id||i.text.random(9),n.say({dam:"?"},u.peers[e]=o)),e.hied||t.on(e.hied="hi",o),e=o.queue,o.queue=[],i.obj.map(e,function(t){n.say(t,o)})},n.bye=function(n){
i.obj.del(u.peers,n.id),t.on("bye",n)},n.hear["!"]=function(t){u.log("Error:",t.err)},n.hear["?"]=function(t,o){return t.pid?(o.id=o.id||t.pid,void n.hi(o)):n.say({dam:"?",pid:u.pid,"@":t["#"]},o)},n}var i=t("../type");e.hash=function(t){if("string"!=typeof t)return{err:1};var n=0;if(!t.length)return n;for(var o,e=0,i=t.length;i>e;++e)o=t.charCodeAt(e),n=(n<<5)-n+o,n|=0;return n};var r,a={};Object.keys=Object.keys||function(t){return map(t,function(t,n,o){o(n)})};try{n.exports=e}catch(u){}})(t,"./adapters/mesh"),t(function(){var n=t("../index");n.Mesh=t("./mesh"),n.on("opt",function(t){function o(t){try{if(!t||!t.url)return o&&o(t);var n=t.url.replace("http","ws"),o=t.wire=new i.WebSocket(n);return o.onclose=function(){i.mesh.bye(t),e(t)},o.onerror=function(n){e(t),n&&"ECONNREFUSED"===n.code},o.onopen=function(){i.mesh.hi(t)},o.onmessage=function(n){n&&i.mesh.hear(n.data||n,t)},o}catch(r){}}function e(t){clearTimeout(t.defer),t.defer=setTimeout(function(){o(t)},2e3)}this.to.next(t);var i=t.opt;if(!t.once&&!1!==i.WebSocket){var r;"undefined"!=typeof window&&(r=window),"undefined"!=typeof global&&(r=global),r=r||{};var a=i.WebSocket||r.WebSocket||r.webkitWebSocket||r.mozWebSocket;if(a){i.WebSocket=a;{i.mesh=i.mesh||n.Mesh(t),i.wire}i.wire=o}}})})(t,"./adapters/websocket")}();
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
},{"buffer":23}],3:[function(require,module,exports){
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
(function (process,global,setImmediate){
/*!
 * Vue.js v2.5.17
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */
'use strict';

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (process.env.NODE_ENV !== 'production') {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.17';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    process.env.NODE_ENV !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (process.env.NODE_ENV !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (process.env.NODE_ENV !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (process.env.NODE_ENV !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (process.env.NODE_ENV !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (process.env.NODE_ENV !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        process.env.NODE_ENV !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (process.env.NODE_ENV !== 'production') {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (process.env.NODE_ENV !== 'production') {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (process.env.NODE_ENV !== 'production') {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (process.env.NODE_ENV !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (process.env.NODE_ENV !== 'production') {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (process.env.NODE_ENV !== 'production') {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (process.env.NODE_ENV !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (process.env.NODE_ENV !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (process.env.NODE_ENV !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (process.env.NODE_ENV !== 'production') {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      process.env.NODE_ENV !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (process.env.NODE_ENV !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      process.env.NODE_ENV !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (process.env.NODE_ENV !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (process.env.NODE_ENV !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"_process":25,"timers":26}],14:[function(require,module,exports){
///#source 1 1 /js/source/wheelnav.core.js
/* ======================================================================================= */
/*                                   wheelnav.js - v1.7.1                                  */
/* ======================================================================================= */
/* This is a small JavaScript library for animated SVG based wheel navigation.             */
/* Requires Raphaël JavaScript Vector Library (http://dmitrybaranovskiy.github.io/raphael/)*/
/* ======================================================================================= */
/* Check http://wheelnavjs.softwaretailoring.net for samples.                              */
/* Fork https://github.com/softwaretailoring/wheelnav for contribution.                    */
/* ======================================================================================= */
/* Copyright © 2014-2017 Gábor Berkesi (http://softwaretailoring.net)                      */
/* Licensed under MIT (https://github.com/softwaretailoring/wheelnav/blob/master/LICENSE)  */
/* ======================================================================================= */

/* ======================================================================================= */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/core.html          */
/* ======================================================================================= */

wheelnav = function (divId, raphael, divWidth, divHeight) {

    this.holderId = "wheel";

    if (divId !== undefined &&
        divId !== null) {
        this.holderId = divId;
    }

    var holderDiv = document.getElementById(divId);

    if ((holderDiv === null ||
        holderDiv === undefined) &&
        (raphael === undefined ||
        raphael === null)) {
        return this;
    }
    
    //Prepare raphael object and set the width
    var canvasWidth;
    var clearContent = true;

    if (raphael === undefined ||
        raphael === null) {

        var removeChildrens = [];
        for (var i = 0; i < holderDiv.children.length; i++) {
            if (holderDiv.children[i].localName === "svg") {
                removeChildrens.push(holderDiv.children[i]);
            }
        }

        for (var i = 0; i < removeChildrens.length; i++) {
            holderDiv.removeChild(removeChildrens[i]);
        }

        if (divWidth !== undefined &&
            divWidth !== null) {
            if (divHeight === undefined ||
                divHeight === null) {
                divHeight = divWidth;
            }
            this.raphael = new Raphael(divId, divWidth, divHeight);
            canvasWidth = divWidth;
        }
        else {
            this.raphael = new Raphael(divId);
            canvasWidth = holderDiv.clientWidth;
        }

        this.raphael.setViewBox(0, 0, this.raphael.width, this.raphael.height, true);
    }
    else {
        //The divId parameter has to be the identifier of the wheelnav in this case.
        this.raphael = raphael;
        canvasWidth = this.raphael.width;
        clearContent = false;
    }

    //Public properties
    this.centerX = canvasWidth / 2;
    this.centerY = canvasWidth / 2;
    this.wheelRadius = canvasWidth / 2;
    this.navAngle = 0;
    this.sliceAngle = null;
    this.titleRotateAngle = null;
    this.initTitleRotate = false;
    this.clickModeRotate = true;
    this.rotateRound = false;
    this.rotateRoundCount = 0;
    this.clickModeSpreadOff = false;
    this.animatetimeCalculated = false; // In clickModeRotate, when animatetimeCalculated is true, the navItem.animatetime calculated by wheelnav.animatetime and current rotationAngle. In this case, the wheelnav.animatetime belongs to the full rotation.
    this.animateRepeatCount = 0;
    this.clockwise = true;
    this.multiSelect = false;
    this.hoverPercent = 1;
    this.selectedPercent = 1;
    this.clickablePercentMin = 0;
    this.clickablePercentMax = 1;
    this.currentPercent = null;
    this.cssMode = false;
    this.selectedToFront = true;
    this.selectedNavItemIndex = 0;

    this.navItemCount = 0;
    this.navItemCountLabeled = false;
    this.navItemCountLabelOffset = 0;
    this.navItems = [];
    this.navItemsEnabled = true;
    this.animateFinishFunction = null;

    // These settings are useful when navItem.sliceAngle < 360 / this.navItemCount
    this.navItemsContinuous = false; 
    this.navItemsCentered = true; // This is reasoned when this.navItemsContinuous = false;

    this.colors = colorpalette.defaultpalette;
    this.titleSpreadScale = null;

    //Spreader settings
    this.spreaderEnable = false;
    this.spreaderRadius = 20;
    this.spreaderStartAngle = 0;
    this.spreaderSliceAngle = 360;
    this.spreaderPathFunction = spreaderPath().PieSpreader;
    this.spreaderPathCustom = null;
    this.spreaderInPercent = 1;
    this.spreaderOutPercent = 1;
    this.spreaderInTitle = "+";
    this.spreaderOutTitle = "-";
    this.spreaderTitleFont = null;
    this.spreaderPathInAttr = null;
    this.spreaderPathOutAttr = null;
    this.spreaderTitleInAttr = null;
    this.spreaderTitleOutAttr = null;
    this.spreaderInTitleWidth = null;
    this.spreaderInTitleHeight = null;
    this.spreaderOutTitleWidth = null;
    this.spreaderOutTitleHeight = null;

    //Percents
    this.minPercent = 0.01;
    this.maxPercent = 1;
    this.initPercent = 1;

    //Marker settings
    this.markerEnable = false;
    this.markerPathFunction = markerPath().TriangleMarker;
    this.markerPathCustom = null;

    //Private properties
    this.currentClick = 0;
    this.animateLocked = false;

    //NavItem default settings. These are configurable between initWheel() and createWheel().
    this.slicePathAttr = null;
    this.sliceHoverAttr = null;
    this.sliceSelectedAttr = null;
    
    this.titleFont = '100 24px Impact, Charcoal, sans-serif';
    this.titleAttr = null;
    this.titleHoverAttr = null;
    this.titleSelectedAttr = null;
    //When navTitle start with 'imgsrc:' it can parse as URL of image or data URI. These properties are available for images and paths.
    this.titleWidth = null;
    this.titleHeight = null;
    this.titleHoverWidth = null;
    this.titleHoverHeight = null;
    this.titleSelectedWidth = null;
    this.titleSelectedHeight = null;

    this.linePathAttr = null;
    this.lineHoverAttr = null;
    this.lineSelectedAttr = null;

    this.slicePathCustom = null;
    this.sliceClickablePathCustom = null;
    this.sliceSelectedPathCustom = null;
    this.sliceHoverPathCustom = null;
    this.sliceInitPathCustom = null;

    this.sliceTransformCustom = null;
    this.sliceSelectedTransformCustom = null;
    this.sliceHoverTransformCustom = null;
    this.sliceInitTransformCustom = null;

    this.animateeffect = null;
    this.animatetime = null;
    if (slicePath()["PieSlice"] !== undefined) {
        this.slicePathFunction = slicePath().PieSlice;
    }
    else {
        this.slicePathFunction = slicePath().NullSlice;
    }
    this.sliceClickablePathFunction = null;
    this.sliceTransformFunction = null;
    this.sliceSelectedPathFunction = null;
    this.sliceSelectedTransformFunction = null;
    this.sliceHoverPathFunction = null;
    this.sliceHoverTransformFunction = null;
    this.sliceInitPathFunction = null;
    this.sliceInitTransformFunction = null;

    this.keynavigateEnabled = false;
    this.keynavigateOnlyFocus = false;
    this.keynavigateDownCode = 37; // left arrow
    this.keynavigateDownCodeAlt = 40; // down arrow
    this.keynavigateUpCode = 39; // right arrow
    this.keynavigateUpCodeAlt = 38; // up arrow

    this.parseWheel(holderDiv);

    return this;
};

wheelnav.prototype.initWheel = function (titles) {

    //Init slices and titles
    this.styleWheel();

    var navItem;
    if (this.navItemCount === 0) {

        if (titles === undefined ||
            titles === null ||
            !Array.isArray(titles)) {
            titles = ["title-0", "title-1", "title-2", "title-3"];
        }

        this.navItemCount = titles.length;
    }
    else {
        titles = null;
    }

    for (i = 0; i < this.navItemCount; i++) {

        var itemTitle = "";

        if (this.navItemCountLabeled) {
            itemTitle = (i + this.navItemCountLabelOffset).toString();
        }
        else {
            if (titles !== null)
                { itemTitle = titles[i]; }
            else
                { itemTitle = ""; }
        }

        navItem = new wheelnavItem(this, itemTitle, i);
        this.navItems.push(navItem);
    }

    //Init colors
    var colorIndex = 0;
    for (i = 0; i < this.navItems.length; i++) {
        this.navItems[i].fillAttr = this.colors[colorIndex];
        colorIndex++;
        if (colorIndex === this.colors.length) { colorIndex = 0;}
    }
};

wheelnav.prototype.createWheel = function (titles, withSpread) {

    if (this.currentPercent === null) {
        if (withSpread) {
            this.currentPercent = this.minPercent;
        }
        else {
            this.currentPercent = this.maxPercent;
        }
    }

    if (this.navItems.length === 0) {
        this.initWheel(titles);
    }

    if (this.selectedNavItemIndex !== null) {
        this.navItems[this.selectedNavItemIndex].selected = true;
    }

    for (i = 0; i < this.navItemCount; i++) {
        this.navItems[i].createNavItem();
    }

    if (this.keynavigateEnabled) {
        var thiswheelnav = this;
        var keyelement = window;

        if (this.keynavigateOnlyFocus) {
            keyelement = document.getElementById(this.holderId);
            if (!keyelement.hasAttribute("tabindex")) {
                keyelement.setAttribute("tabindex", 0);
            }
        }

        keyelement.addEventListener("keydown", this.keyNavigateFunction =  function (e) {
            e = e || window.e;
            var keyCodeEvent = e.which || e.keyCode;
            if ([thiswheelnav.keynavigateDownCode, thiswheelnav.keynavigateDownCodeAlt, thiswheelnav.keynavigateUpCode, thiswheelnav.keynavigateUpCodeAlt].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }

            var keynavigate = null;

            if (keyCodeEvent === thiswheelnav.keynavigateUpCode || keyCodeEvent === thiswheelnav.keynavigateUpCodeAlt) {
                if (thiswheelnav.currentClick === thiswheelnav.navItemCount - 1) {
                    keynavigate = 0;
                }
                else {
                    keynavigate = thiswheelnav.currentClick + 1;
                }
            }
            if (keyCodeEvent === thiswheelnav.keynavigateDownCode || keyCodeEvent === thiswheelnav.keynavigateDownCodeAlt) {
                if (thiswheelnav.currentClick === 0) {
                    keynavigate = thiswheelnav.navItemCount - 1;
                }
                else {
                    keynavigate = thiswheelnav.currentClick - 1;
                }
            }

            if (keynavigate !== null) {
                thiswheelnav.navigateWheel(keynavigate);
            }
        });
    }

    this.spreader = new spreader(this);

    this.marker = new marker(this);

    this.refreshWheel();

    if (withSpread !== undefined) {
        this.spreadWheel();
    }

    return this;
};

wheelnav.prototype.removeWheel = function () {
    this.raphael.remove();

    if (this.keynavigateEnabled) {
        var keyelement = window;

        if (this.keynavigateOnlyFocus) {
            keyelement = document.getElementById(this.holderId);
            if (keyelement.hasAttribute("tabindex")) {
                keyelement.removeAttribute("tabindex");
            }
        }

        keyelement.removeEventListener("keydown", this.keyNavigateFunction);
    }
};

wheelnav.prototype.refreshWheel = function (withPathAndTransform) {

    for (i = 0; i < this.navItemCount; i++) {
        var navItem = this.navItems[i];
        navItem.setWheelSettings(withPathAndTransform);
        navItem.refreshNavItem(withPathAndTransform);
    }

    this.marker.setCurrentTransform();
    this.spreader.setCurrentTransform();
};

wheelnav.prototype.navigateWheel = function (clicked) {

    this.animateUnlock(true);

    if (this.clickModeRotate) {
        this.animateLocked = true;
    }

    var navItem;

    for (i = 0; i < this.navItemCount; i++) {
        navItem = this.navItems[i];

        navItem.hovered = false;

        if (i === clicked) {
            if (this.multiSelect) {
                navItem.selected = !navItem.selected;
            } else {
                navItem.selected = true;
                this.selectedNavItemIndex = i;
            }
        }
        else {
            if (!this.multiSelect) {
                navItem.selected = false;
            }
        }

        if (this.clickModeRotate) {
            var rotationAngle = this.navItems[clicked].navAngle - this.navItems[this.currentClick].navAngle;

            if (this.rotateRound) {
                if (this.clockwise && rotationAngle < 0) {
                    rotationAngle = 360 + rotationAngle;
                }
                if (!this.clockwise && rotationAngle > 0) {
                    rotationAngle = rotationAngle - 360;
                }
            }

            navItem.currentRotateAngle -= rotationAngle;
            var currentAnimateTime;
            if (this.animatetime != null) {
                currentAnimateTime = this.animatetime;
            }
            else {
                currentAnimateTime = 1500;
            }

            if (this.animatetimeCalculated &&
                clicked !== this.currentClick) {
                navItem.animatetime = currentAnimateTime * (Math.abs(rotationAngle) / 360);
            }

            if (this.rotateRoundCount > 0) {
                if (this.clockwise) { navItem.currentRotateAngle -= this.rotateRoundCount * 360; }
                else { navItem.currentRotateAngle += this.rotateRoundCount * 360; }

                navItem.animatetime = currentAnimateTime * (this.rotateRoundCount + 1);
            }
        }
    }

    for (i = 0; i < this.navItemCount; i++) {
        navItem = this.navItems[i];
        navItem.setCurrentTransform(true, true);
        navItem.refreshNavItem();
    }

    this.currentClick = clicked;

    if (this.clickModeSpreadOff) {
        this.currentPercent = this.maxPercent;
        this.spreadWheel();
    }
    else {
        if (clicked !== null &&
            !this.clickModeRotate) {
            this.marker.setCurrentTransform(this.navItems[this.currentClick].navAngle);
        }
        else {
            this.marker.setCurrentTransform();
        }
        this.spreader.setCurrentTransform(true);
    }

    if (clicked !== null &&
        this.navItems[clicked].navigateFunction !== null) {
        this.navItems[clicked].navigateFunction();
    }
};

wheelnav.prototype.spreadWheel = function () {

    this.animateUnlock(true);
    this.animateLocked = true;

    if (this.currentPercent === this.maxPercent ||
        this.currentPercent === null) {
        this.currentPercent = this.minPercent;
    }
    else {
        this.currentPercent = this.maxPercent;
    }

    for (i = 0; i < this.navItemCount; i++) {
        var navItem = this.navItems[i];
        navItem.hovered = false;
        navItem.setCurrentTransform(true, false);
    }

    this.marker.setCurrentTransform();
    this.spreader.setCurrentTransform();

    return this;
};

wheelnav.prototype.animateUnlock = function (force, withFinishFunction) {

    if (force !== undefined && 
        force === true) {
        for (var f = 0; f < this.navItemCount; f++) {
            this.navItems[f].navSliceUnderAnimation = false;
            this.navItems[f].navTitleUnderAnimation = false;
            this.navItems[f].navLineUnderAnimation = false;
            this.navItems[f].navSlice.stop();
            this.navItems[f].navLine.stop();
            this.navItems[f].navTitle.stop();
        }
    }
    else {
        for (var i = 0; i < this.navItemCount; i++) {
            if (this.navItems[i].navSliceUnderAnimation === true ||
                this.navItems[i].navTitleUnderAnimation === true ||
                this.navItems[i].navLineUnderAnimation === true) {
                return;
            }
        }

        this.animateLocked = false;
        if (this.animateFinishFunction !== null &&
            withFinishFunction !== undefined &&
            withFinishFunction === true) {
            this.animateFinishFunction();
        }
    }
};

wheelnav.prototype.setTooltips = function (tooltips) {
    if (tooltips !== undefined &&
        tooltips !== null &&
        Array.isArray(tooltips) &&
        tooltips.length <= this.navItems.length) {
        for (var i = 0; i < tooltips.length; i++) {
            this.navItems[i].setTooltip(tooltips[i]);
        }
    }
};

wheelnav.prototype.getItemId = function (index) {
    return "wheelnav-" + this.holderId + "-item-" + index;
};
wheelnav.prototype.getSliceId = function (index) {
    return "wheelnav-" + this.holderId + "-slice-" + index;
};
wheelnav.prototype.getClickableSliceId = function (index) {
    return "wheelnav-" + this.holderId + "-clickableslice-" + index;
};
wheelnav.prototype.getTitleId = function (index) {
    return "wheelnav-" + this.holderId + "-title-" + index;
};
wheelnav.prototype.getLineId = function (index) {
    return "wheelnav-" + this.holderId + "-line-" + index;
};
wheelnav.prototype.getSpreaderId = function () {
    return "wheelnav-" + this.holderId + "-spreader";
};
wheelnav.prototype.getSpreaderTitleId = function () {
    return "wheelnav-" + this.holderId + "-spreadertitle";
};
wheelnav.prototype.getMarkerId = function () {
    return "wheelnav-" + this.holderId + "-marker";
};

///#source 1 1 /js/source/wheelnav.parse.js
/* ======================================================================================= */
/* Parse html5 data- attributes, the onmouseup events and anchor links                     */
/* ======================================================================================= */
/* ======================================================================================= */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/html5.html         */
/* ======================================================================================= */

wheelnav.prototype.parseWheel = function (holderDiv) {
    if (holderDiv !== undefined &&
        holderDiv !== null) {
        //data-wheelnav attribute is required
        var wheelnavData = holderDiv.hasAttribute("data-wheelnav");
        if (wheelnavData) {
            var parsedNavItems = [];
            var parsedNavItemsHref = [];
            var parsedNavItemsOnmouseup = [];
            var onlyInit = false;

            //data-wheelnav-slicepath
            var wheelnavSlicepath = holderDiv.getAttribute("data-wheelnav-slicepath");
            if (wheelnavSlicepath !== null) {
                if (slicePath()[wheelnavSlicepath] !== undefined) {
                    this.slicePathFunction = slicePath()[wheelnavSlicepath];
                }
            }
            //data-wheelnav-colors
            var wheelnavColors = holderDiv.getAttribute("data-wheelnav-colors");
            if (wheelnavColors !== null) {
                this.colors = wheelnavColors.split(',');
            }
            //data-wheelnav-wheelradius
            var wheelnavWheelradius = holderDiv.getAttribute("data-wheelnav-wheelradius");
            if (wheelnavWheelradius !== null) {
                this.wheelRadius = Number(wheelnavWheelradius);
            }
            //data-wheelnav-navangle
            var wheelnavNavangle = holderDiv.getAttribute("data-wheelnav-navangle");
            if (wheelnavNavangle !== null) {
                this.navAngle = Number(wheelnavNavangle);
            }
            //data-wheelnav-rotateoff
            var wheelnavRotateOff = holderDiv.getAttribute("data-wheelnav-rotateoff");
            if (wheelnavRotateOff !== null) {
                this.clickModeRotate = false;
            }
            //data-wheelnav-cssmode
            var wheelnavCssmode = holderDiv.getAttribute("data-wheelnav-cssmode");
            if (wheelnavCssmode !== null) {
                this.cssMode = true;
            }
            //data-wheelnav-spreader
            var wheelnavSpreader = holderDiv.getAttribute("data-wheelnav-spreader");
            if (wheelnavSpreader !== null) {
                this.spreaderEnable = true;
            }
            //data-wheelnav-spreaderradius
            var wheelnavSpreaderRadius = holderDiv.getAttribute("data-wheelnav-spreaderradius");
            if (wheelnavSpreaderRadius !== null) {
                this.spreaderRadius = Number(wheelnavSpreaderRadius);
            }
            //data-wheelnav-spreaderpath
            var wheelnavSpreaderPath = holderDiv.getAttribute("data-wheelnav-spreaderpath");
            if (wheelnavSpreaderPath !== null) {
                if (markerPath()[wheelnavSpreaderPath] !== undefined) {
                    this.spreaderPathFunction = spreaderPath()[wheelnavSpreaderPath];
                }
            }
            //data-wheelnav-marker
            var wheelnavMarker = holderDiv.getAttribute("data-wheelnav-marker");
            if (wheelnavMarker !== null) {
                this.markerEnable = true;
            }
            //data-wheelnav-markerpath
            var wheelnavMarkerPath = holderDiv.getAttribute("data-wheelnav-markerpath");
            if (wheelnavMarkerPath !== null) {
                if (markerPath()[wheelnavMarkerPath] !== undefined) {
                    this.markerPathFunction = markerPath()[wheelnavMarkerPath];
                }
            }
            //data-wheelnav-titlewidth
            var wheelnavTitleWidth = holderDiv.getAttribute("data-wheelnav-titlewidth");
            if (wheelnavTitleWidth !== null) {
                this.titleWidth = Number(wheelnavTitleWidth);
            }
            //data-wheelnav-titleheight
            var wheelnavTitleHeight = holderDiv.getAttribute("data-wheelnav-titleheight");
            if (wheelnavTitleHeight !== null) {
                this.titleHeight = Number(wheelnavTitleHeight);
            }

            //data-wheelnav-keynav
            var wheelnavKeynav = holderDiv.getAttribute("data-wheelnav-keynav");
            if (wheelnavKeynav !== null) {
                this.keynavigateEnabled = true;
            }
            //data-wheelnav-keynavonlyfocus
            var wheelnavKeynavOnlyfocus = holderDiv.getAttribute("data-wheelnav-keynavonlyfocus");
            if (wheelnavKeynavOnlyfocus !== null) {
                this.keynavigateOnlyFocus = true;
            }
            //data-wheelnav-keynavdowncode
            var wheelnavKeynavDowncode = holderDiv.getAttribute("data-wheelnav-keynavdowncode");
            if (wheelnavKeynavDowncode !== null) {
                this.keynavigateDownCode = Number(wheelnavKeynavDowncode);
            }
            //data-wheelnav-keynavdowncodealt
            var wheelnavKeynavDowncodeAlt = holderDiv.getAttribute("data-wheelnav-keynavdowncodealt");
            if (wheelnavKeynavDowncodeAlt !== null) {
                this.keynavigateDownCodeAlt = Number(wheelnavKeynavDowncodeAlt);
            }
            //data-wheelnav-keynavupcode
            var wheelnavKeynavUpcode = holderDiv.getAttribute("data-wheelnav-keynavupcode");
            if (wheelnavKeynavUpcode !== null) {
                this.keynavigateUpCode = Number(wheelnavKeynavUpcode);
            }
            //data-wheelnav-keynavupcodealt
            var wheelnavKeynavUpcodeAlt = holderDiv.getAttribute("data-wheelnav-keynavupcodealt");
            if (wheelnavKeynavUpcodeAlt !== null) {
                this.keynavigateUpCodeAlt = Number(wheelnavKeynavUpcodeAlt);
            }

            //data-wheelnav-init
            var wheelnavOnlyinit = holderDiv.getAttribute("data-wheelnav-init");
            if (wheelnavOnlyinit !== null) {
                onlyInit = true;
            }

            for (var i = 0; i < holderDiv.children.length; i++) {

                var wheelnavNavitemtext = holderDiv.children[i].getAttribute("data-wheelnav-navitemtext");
                var wheelnavNavitemicon = holderDiv.children[i].getAttribute("data-wheelnav-navitemicon");
                var wheelnavNavitemimg = holderDiv.children[i].getAttribute("data-wheelnav-navitemimg");
                if (wheelnavNavitemtext !== null ||
                    wheelnavNavitemicon !== null ||
                    wheelnavNavitemimg !== null) {
                    //data-wheelnav-navitemtext
                    if (wheelnavNavitemtext !== null) {
                        parsedNavItems.push(wheelnavNavitemtext);
                    }
                    //data-wheelnav-navitemicon
                    else if (wheelnavNavitemicon !== null) {
                        if (icon[wheelnavNavitemicon] !== undefined) {
                            parsedNavItems.push(icon[wheelnavNavitemicon]);
                        }
                        else {
                            parsedNavItems.push(wheelnavNavitemicon);
                        }
                    }
                    else if (wheelnavNavitemimg !== null) {
                        parsedNavItems.push("imgsrc:" + wheelnavNavitemimg);
                    }
                    else {
                        //data-wheelnav-navitemtext or data-wheelnav-navitemicon or data-wheelnav-navitemimg is required
                        continue;
                    }

                    //onmouseup event of navitem element for call it in the navigateFunction
                    if (holderDiv.children[i].onmouseup !== undefined) {
                        parsedNavItemsOnmouseup.push(holderDiv.children[i].onmouseup);
                    }
                    else {
                        parsedNavItemsOnmouseup.push(null);
                    }

                    //parse inner <a> tag in navitem element for use href in navigateFunction
                    var foundHref = false;
                    for (var j = 0; j < holderDiv.children[i].children.length; j++) {
                        if (holderDiv.children[i].children[j].getAttribute('href') !== undefined) {
                            parsedNavItemsHref.push(holderDiv.children[i].children[j].getAttribute('href'));
                        }
                    }
                    if (!foundHref) {
                        parsedNavItemsHref.push(null);
                    }
                }
            }

            if (parsedNavItems.length > 0) {
                this.initWheel(parsedNavItems);

                for (var i = 0; i < parsedNavItemsOnmouseup.length; i++) {
                    this.navItems[i].navigateFunction = parsedNavItemsOnmouseup[i];
                    this.navItems[i].navigateHref = parsedNavItemsHref[i];
                }

                if (!onlyInit) {
                    this.createWheel();
                }
            }
        }

        var removeChildrens = [];
        for (var i = 0; i < holderDiv.children.length; i++) {
            if (holderDiv.children[i].localName !== "svg") {
                removeChildrens.push(holderDiv.children[i]);
            }
        }

        for (var i = 0; i < removeChildrens.length; i++) {
            holderDiv.removeChild(removeChildrens[i]);
        }
    }
};


///#source 1 1 /js/source/wheelnav.navItem.js
/* ======================================================================================= */
/* Navigation item                                                                         */
/* ======================================================================================= */
/* ======================================================================================= */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/navItem.html       */
/* ======================================================================================= */

wheelnavItem = function (wheelnav, title, itemIndex) {

    this.wheelnav = wheelnav;
    this.wheelItemIndex = itemIndex;
    if (wheelnav.clockwise) {
        this.itemIndex = itemIndex;
    }
    else {
        this.itemIndex = -itemIndex;
    }

    this.enabled = wheelnav.navItemsEnabled;
    this.selected = false;
    this.hovered = false;

    //Private properties
    this.navItem = null;
    this.navSlice = null;
    this.navTitle = null;
    this.navLine = null;
    this.navClickableSlice = null;

    this.navSliceCurrentTransformString = null;
    this.navTitleCurrentTransformString = null;
    this.navLineCurrentTransformString = null;

    this.navSliceUnderAnimation = false;
    this.navTitleUnderAnimation = false;
    this.navLineUnderAnimation = false;

    this.currentRotateAngle = 0;

    this.setTitle(title);
    this.tooltip = null;
    
    //Default settings
    this.fillAttr = "#CCC";
    this.titleFont = this.wheelnav.titleFont;
    this.navigateHref = null;
    this.navigateFunction = null;
    //When navTitle start with 'imgsrc:' it can parse as URL of image or data URI. These properties are available for images and paths. Use after initWheel(), before createWheel()
    this.titleWidth = null;
    this.titleHeight = null;
    this.titleHoverWidth = null;
    this.titleHoverHeight = null;
    this.titleSelectedWidth = null;
    this.titleSelectedHeight = null;

    //Wheelnav properties
    this.animateeffect = null;
    this.animatetime = null;

    this.sliceInitPathFunction = null;
    this.sliceClickablePathFunction = null;
    this.slicePathFunction = null;
    this.sliceSelectedPathFunction = null;
    this.sliceHoverPathFunction = null;

    this.sliceTransformFunction = null;
    this.sliceSelectedTransformFunction = null;
    this.sliceHoverTransformFunction = null;
    this.sliceInitTransformFunction = null;

    this.slicePathCustom = null;
    this.sliceClickablePathCustom = null;
    this.sliceSelectedPathCustom = null;
    this.sliceHoverPathCustom = null;
    this.sliceInitPathCustom = null;

    this.sliceTransformCustom = null;
    this.sliceSelectedTransformCustom = null;
    this.sliceHoverTransformCustom = null;
    this.sliceInitTransformCustom = null;

    this.initPercent = null;
    this.minPercent = null;
    this.maxPercent = null;
    this.hoverPercent = null;
    this.selectedPercent = null;
    this.clickablePercentMin = null;
    this.clickablePercentMax = null;

    this.titleSpreadScale = null;
    this.sliceAngle = null;
    this.titleRotateAngle = null;

    //Default navitem styles
    this.styleNavItem();

    return this;
};

wheelnavItem.prototype.createNavItem = function () {

    //Wheel settings
    this.setWheelSettings(false);

    //Set href navigation
    if (this.navigateHref !== null) {
        this.navigateFunction = function () {
            window.location.href = this.navigateHref;
        };
    }

    //Set colors
    if (!this.wheelnav.cssMode) {
        this.slicePathAttr.fill = this.fillAttr;
        this.sliceHoverAttr.fill = this.fillAttr;
        this.sliceSelectedAttr.fill = this.fillAttr;
    }

    //Set attrs
    if (!this.enabled) {
        if (!this.wheelnav.cssMode) {
            this.slicePathAttr.cursor = "default";
            this.sliceHoverAttr.cursor = "default";
            this.titleAttr.cursor = "default";
            this.titleHoverAttr.cursor = "default";
            this.linePathAttr.cursor = "default";
            this.lineHoverAttr.cursor = "default";
        }

        this.sliceClickablePathAttr.cursor = "default";
        this.sliceClickableHoverAttr.cursor = "default";
    }

    //Set angles
    var prevItemIndex = this.wheelItemIndex - 1;
    var wheelSliceAngle = 360 / this.wheelnav.navItemCount;
    if (this.sliceAngle === null) {
        this.sliceAngle = 360 / this.wheelnav.navItemCount;
    }
    if (this.wheelnav.clockwise) {
        if (this.wheelnav.navItemsContinuous) {
            if (this.itemIndex === 0) {
                this.baseAngle = (this.itemIndex * this.sliceAngle) + ((-this.sliceAngle / 2) + this.wheelnav.navAngle);
            }
            else {
                this.baseAngle = this.wheelnav.navItems[prevItemIndex].baseAngle + this.wheelnav.navItems[prevItemIndex].sliceAngle;
            }
        }
        else {
            if (this.wheelnav.navItemsCentered) {
                this.baseAngle = (this.itemIndex * wheelSliceAngle) + ((-this.sliceAngle / 2) + this.wheelnav.navAngle);
            }
            else {
                this.baseAngle = (this.itemIndex * wheelSliceAngle) + ((-wheelSliceAngle / 2) + this.wheelnav.navAngle);
                this.currentRotateAngle += ((wheelSliceAngle / 2) - (this.wheelnav.navItems[0].sliceAngle / 2));
            }
        }
    }
    else {
        if (this.wheelnav.navItemsContinuous) {
            if (this.itemIndex === 0) {
                this.baseAngle = (this.itemIndex * this.sliceAngle) + ((-this.sliceAngle / 2) + this.wheelnav.navAngle);
            }
            else {
                this.baseAngle = this.wheelnav.navItems[prevItemIndex].baseAngle - this.wheelnav.navItems[this.wheelItemIndex].sliceAngle;
            }
        }
        else {
            if (this.wheelnav.navItemsCentered) {
                this.baseAngle = (this.itemIndex * wheelSliceAngle) + ((-this.sliceAngle / 2) + this.wheelnav.navAngle);
            }
            else {
                this.baseAngle = (this.itemIndex * wheelSliceAngle) + ((-wheelSliceAngle / 2) + this.wheelnav.navAngle) + (wheelSliceAngle - this.sliceAngle);
                this.currentRotateAngle -= ((wheelSliceAngle / 2) - (this.wheelnav.navItems[0].sliceAngle / 2));
            }
        }
    }

    this.navAngle = this.baseAngle + (this.sliceAngle / 2);

    if (this.wheelnav.animatetimeCalculated) {
        this.animatetime = this.wheelnav.animatetime / this.wheelnav.navItemCount;
    }

    this.initPathsAndTransforms();

    var sliceInitPath = this.sliceInitPath;

    //Create slice
    this.navSlice = this.wheelnav.raphael.path(sliceInitPath.slicePathString);
    this.navSlice.attr(this.slicePathAttr);
    this.navSlice.id = this.wheelnav.getSliceId(this.wheelItemIndex);
    this.navSlice.node.id = this.navSlice.id;

    //Create linepath
    this.navLine = this.wheelnav.raphael.path(sliceInitPath.linePathString);
    this.navLine.attr(this.linePathAttr);
    this.navLine.id = this.wheelnav.getLineId(this.wheelItemIndex);
    this.navLine.node.id = this.navLine.id;

    //Create title
    var currentTitle = this.initNavTitle;

    //Title defined by path
    if (wheelnavTitle().isPathTitle(this.title)) {
        this.navTitle = this.wheelnav.raphael.path(currentTitle.path);
    }
    //Title defined by image
    else if (wheelnavTitle().isImageTitle(this.title)) {
        this.navTitle = this.wheelnav.raphael.image(currentTitle.src, sliceInitPath.titlePosX - (this.titleWidth / 2), sliceInitPath.titlePosY - (this.titleHeight / 2), this.titleWidth, this.titleHeight);
    }
    //Title defined by text
    else {
        this.navTitle = this.wheelnav.raphael.text(sliceInitPath.titlePosX, sliceInitPath.titlePosY, currentTitle.title);
    }

    this.navTitle.attr(this.titleAttr);
    this.navTitle.id = this.wheelnav.getTitleId(this.wheelItemIndex);
    this.navTitle.node.id = this.navTitle.id;

    //Set transforms
    this.navSliceCurrentTransformString = "";
    if (this.initTransform.sliceTransformString !== "") { this.navSliceCurrentTransformString += this.initTransform.sliceTransformString; }

    this.navLineCurrentTransformString = "";
    if (this.initTransform.lineTransformString !== "") { this.navLineCurrentTransformString += this.initTransform.lineTransformString; }

    this.navTitleCurrentTransformString = "";
    this.navTitleCurrentTransformString += this.getTitleRotateString(this.wheelnav.initTitleRotate);
    if (this.initTransform.titleTransformString !== "") { this.navTitleCurrentTransformString += this.initTransform.titleTransformString; }
    if (this.wheelnav.currentPercent < 0.05) {
        this.navTitleCurrentTransformString += ",s0.05";
    }
    if (this.navTitleSizeTransform !== undefined) {
        this.navTitleCurrentTransformString += this.navTitleSizeTransform;
    }

    this.navSlice.attr({ transform: this.navSliceCurrentTransformString });
    this.navLine.attr({ transform: this.navLineCurrentTransformString });
    this.navTitle.attr({ transform: this.navTitleCurrentTransformString });
    
    //Create item set
    this.navItem = this.wheelnav.raphael.set();

    if (this.sliceClickablePathFunction !== null) {
        //Create clickable slice
        var sliceClickablePath = this.getCurrentClickablePath();
        this.navClickableSlice = this.wheelnav.raphael.path(sliceClickablePath.slicePathString).attr(this.sliceClickablePathAttr).toBack();
        this.navClickableSlice.id = this.wheelnav.getClickableSliceId(this.wheelItemIndex);
        this.navClickableSlice.node.id = this.navClickableSlice.id;
        
        this.navItem.push(
            this.navSlice,
            this.navLine,
            this.navTitle,
            this.navClickableSlice
        );
    }
    else {
        this.navItem.push(
            this.navSlice,
            this.navLine,
            this.navTitle
        );
    }

    this.setTooltip(this.tooltip);
    this.navItem.id = this.wheelnav.getItemId(this.wheelItemIndex);

    var thisWheelNav = this.wheelnav;
    var thisNavItem = this;
    var thisItemIndex = this.wheelItemIndex;

    if (this.enabled) {
        this.navItem.mouseup(function () {
            thisWheelNav.navigateWheel(thisItemIndex);
        });
        this.navItem.mouseover(function () {
            if (thisNavItem.hovered !== true) {
                thisNavItem.hoverEffect(thisItemIndex, true);
            }
        });
        this.navItem.mouseout(function () {
            thisNavItem.hovered = false;
            thisNavItem.hoverEffect(thisItemIndex, false);
        });
    }

    this.setCurrentTransform(true, false);
};

wheelnavItem.prototype.hoverEffect = function (hovered, isEnter) {

    if (this.wheelnav.animateLocked === false) {
        if (isEnter) {
            if (!this.selected) {
                this.hovered = true;
            }
        }

        this.refreshNavItem();

        if (this.hoverPercent !== 1 ||
            this.sliceHoverPathFunction !== null ||
            this.sliceHoverTransformFunction !== null ||
            this.titleHover !== this.title ||
            this.titleHoverWidth !== this.titleWidth ||
            this.titleHoverHeight !== this.titleHeight) {
            this.setCurrentTransform(false, false);
        }

        this.wheelnav.marker.setCurrentTransform();
        this.wheelnav.spreader.setCurrentTransform(true);
    }
};

wheelnavItem.prototype.setCurrentTransform = function (locked, withFinishFunction) {

    if (!this.wheelnav.clickModeRotate ||
        (!this.navSliceUnderAnimation &&
        !this.navTitleUnderAnimation &&
        !this.navLineUnderAnimation)) {

        if (locked !== undefined &&
            locked === true) {
            this.navSliceUnderAnimation = true;
            this.navTitleUnderAnimation = true;
            this.navLineUnderAnimation = true;
        }

        //Set transforms
        //  Slice
        this.navSliceCurrentTransformString = "";
        if (this.wheelnav.clickModeRotate) { this.navSliceCurrentTransformString += this.getItemRotateString(); }
        if (this.selected) {
            if (this.selectTransform.sliceTransformString !== undefined) { this.navSliceCurrentTransformString += this.selectTransform.sliceTransformString; }
        }
        else if (this.hovered) {
            if (this.hoverTransform.sliceTransformString !== undefined) { this.navSliceCurrentTransformString += this.hoverTransform.sliceTransformString; }
        }
        if (this.sliceTransform.sliceTransformString !== undefined) { this.navSliceCurrentTransformString += this.sliceTransform.sliceTransformString; }

        //  Line
        this.navLineCurrentTransformString = "";
        if (this.wheelnav.clickModeRotate) { this.navLineCurrentTransformString += this.getItemRotateString(); }
        if (this.selected) {
            if (this.selectTransform.lineTransformString !== undefined) { this.navLineCurrentTransformString += this.selectTransform.lineTransformString; }
        }
        else if (this.hovered) {
            if (this.hoverTransform.lineTransformString !== undefined) { this.navLineCurrentTransformString += this.hoverTransform.lineTransformString; }
        }
        if (this.sliceTransform.lineTransformString !== undefined) { this.navLineCurrentTransformString += this.sliceTransform.lineTransformString; }

        //  Title
        this.navTitleCurrentTransformString = "";
        this.navTitleCurrentTransformString += this.getTitleRotateString(true);

        if (this.selected) {
            if (this.navTitleSizeSelectedTransform !== undefined) {
                this.navTitleCurrentTransformString += this.navTitleSizeSelectedTransform;
            }
            if (this.selectTransform.titleTransformString === "" ||
                this.selectTransform.titleTransformString === undefined) {
                this.navTitleCurrentTransformString += ",s1";
            }
            else {
                this.navTitleCurrentTransformString += "," + this.selectTransform.titleTransformString;
            }
            if (this.wheelnav.currentPercent < 0.05) {
                this.navTitleCurrentTransformString += ",s0.05";
            }
        }
        else if (this.hovered) {
            if (this.navTitleSizeHoverTransform !== undefined) {
                this.navTitleCurrentTransformString += this.navTitleSizeHoverTransform;
            }
            if (this.hoverTransform.titleTransformString === "" ||
                this.hoverTransform.titleTransformString === undefined) {
                this.navTitleCurrentTransformString += ",s1";
            }
            else {
                this.navTitleCurrentTransformString += "," + this.hoverTransform.titleTransformString;
            }
        }
        else if (this.wheelnav.currentPercent < 0.05) {
            this.navTitleCurrentTransformString += ",s0.05";
        }
        else if (this.titleSpreadScale) {
            this.navTitleCurrentTransformString += ",s" + this.wheelnav.currentPercent;
        }
        else {
            if (this.navTitleSizeTransform !== undefined) {
                this.navTitleCurrentTransformString += this.navTitleSizeTransform;
            }
            if (this.sliceTransform.titleTransformString === "" ||
                this.sliceTransform.titleTransformString === undefined) {
                this.navTitleCurrentTransformString += ",s1";
            }
            else {
                this.navTitleCurrentTransformString += "," + this.sliceTransform.titleTransformString;
            }
        }

        //Set path
        var slicePath = this.getCurrentPath();

        var sliceTransformAttr = {};

        sliceTransformAttr = {
            path: slicePath.slicePathString,
            transform: this.navSliceCurrentTransformString
        };

        var sliceClickableTransformAttr = {};

        if (this.sliceClickablePathFunction !== null) {
            var sliceClickablePath = this.getCurrentClickablePath();

            sliceClickableTransformAttr = {
                path: sliceClickablePath.slicePathString,
                transform: this.navSliceCurrentTransformString
            };
        }

        var lineTransformAttr = {};

        lineTransformAttr = {
            path: slicePath.linePathString,
            transform: this.navLineCurrentTransformString
        };

        //Set title
        var currentTitle = this.getCurrentTitle();
        var titleTransformAttr = {};

        if (wheelnavTitle().isPathTitle(currentTitle.title)) {
            titleTransformAttr = {
                path: currentTitle.path,
                transform: this.navTitleCurrentTransformString
            };
        }
        else if (wheelnavTitle().isImageTitle(currentTitle.title)) {
            titleTransformAttr = {
                x: currentTitle.x,
                y: currentTitle.y,
                width: currentTitle.width,
                height: currentTitle.height,
                transform: this.navTitleCurrentTransformString
            };

            this.navTitle.attr({ src: currentTitle.src });
        }
        else {
            titleTransformAttr = {
                x: currentTitle.x,
                y: currentTitle.y,
                transform: this.navTitleCurrentTransformString
            };

            if (currentTitle.title !== null) {
                this.navTitle.attr({ text: currentTitle.title });
            }
        }

        var thisNavItem = this;
        var thisWheelnav = this.wheelnav;

        //Animate navitem
        this.animSlice = Raphael.animation(sliceTransformAttr, this.animatetime, this.animateeffect, function () {
            thisNavItem.navSliceUnderAnimation = false;
            thisWheelnav.animateUnlock(false, withFinishFunction);
        });
        this.animLine = Raphael.animation(lineTransformAttr, this.animatetime, this.animateeffect, function () {
            thisNavItem.navLineUnderAnimation = false;
            thisWheelnav.animateUnlock(false, withFinishFunction);
        });
        this.animTitle = Raphael.animation(titleTransformAttr, this.animatetime, this.animateeffect, function () {
            thisNavItem.navTitleUnderAnimation = false;
            thisWheelnav.animateUnlock(false, withFinishFunction);
        });

        if (this.navClickableSlice !== null) {
            this.animClickableSlice = Raphael.animation(sliceClickableTransformAttr, this.animatetime, this.animateeffect);
        }

        var animateRepeatCount = this.wheelnav.animateRepeatCount;

        if (locked !== undefined &&
            locked === true) {
            if (this.wheelItemIndex === this.wheelnav.navItemCount - 1) {

                for (i = 0; i < this.wheelnav.navItemCount; i++) {
                    var navItemSlice = this.wheelnav.navItems[i];
                    navItemSlice.navSlice.animate(navItemSlice.animSlice.repeat(animateRepeatCount));
                }
                for (i = 0; i < this.wheelnav.navItemCount; i++) {
                    var navItemLine = this.wheelnav.navItems[i];
                    navItemLine.navLine.animate(navItemLine.animLine.repeat(animateRepeatCount));
                }
                for (i = 0; i < this.wheelnav.navItemCount; i++) {
                    var navItemTitle = this.wheelnav.navItems[i];
                    navItemTitle.navTitle.animate(navItemTitle.animTitle.repeat(animateRepeatCount));
                }

                if (this.wheelnav.sliceClickablePathFunction !== null) {
                    for (i = 0; i < this.wheelnav.navItemCount; i++) {
                        var navItemClickableSlice = this.wheelnav.navItems[i];
                        if (navItemClickableSlice.navClickableSlice !== null) {
                            navItemClickableSlice.navClickableSlice.animate(navItemClickableSlice.animClickableSlice.repeat(animateRepeatCount));
                        }
                    }
                }
            }
        }
        else {
            this.navSlice.animate(this.animSlice.repeat(animateRepeatCount));
            this.navLine.animate(this.animLine.repeat(animateRepeatCount));
            this.navTitle.animate(this.animTitle.repeat(animateRepeatCount));

            if (this.navClickableSlice !== null) {
                this.navClickableSlice.animate(this.animClickableSlice.repeat(animateRepeatCount));
            }
        }
    }
};

wheelnavItem.prototype.setTitle = function (title) {
    if (title === undefined) {
        this.title = null;
    }
    else {
        this.title = title;
    }
    this.titleHover = this.title;
    this.titleSelected = this.title;
};

wheelnavItem.prototype.setTooltip = function (tooltip) {
    if (tooltip !== null) {
        this.navItem.attr({ title: tooltip });
    }
};

wheelnavItem.prototype.refreshNavItem = function (withPathAndTransform) {

    if (this.selected) {
        this.navSlice.attr(this.sliceSelectedAttr);
        this.navLine.attr(this.lineSelectedAttr);
        this.navTitle.attr(this.titleSelectedAttr);
        if (this.navClickableSlice !== null) { this.navClickableSlice.attr(this.sliceClickableSelectedAttr); }

        if (this.wheelnav.selectedToFront) {
            this.navSlice.toFront();
            this.navLine.toFront();
            this.navTitle.toFront();
            if (this.navClickableSlice !== null) { this.navClickableSlice.toFront(); }
        }
        else {
            if (this.navClickableSlice !== null) { this.navClickableSlice.toBack(); }
            this.navTitle.toBack();
            this.navLine.toBack();
            this.navSlice.toBack();
        }
    }
    else if (this.hovered) {
        this.navSlice.attr(this.sliceHoverAttr).toFront();
        this.navLine.attr(this.lineHoverAttr).toFront();
        this.navTitle.attr(this.titleHoverAttr).toFront();
        if (this.navClickableSlice !== null) { this.navClickableSlice.attr(this.sliceClickableHoverAttr).toFront(); }
    }
    else {
        this.navSlice.attr(this.slicePathAttr);
        this.navLine.attr(this.linePathAttr);
        this.navTitle.attr(this.titleAttr);
        if (this.navClickableSlice !== null) { this.navClickableSlice.attr(this.sliceClickablePathAttr); }

        if (this.navClickableSlice !== null) { this.navClickableSlice.toBack(); };
        this.navTitle.toBack();
        this.navLine.toBack();
        this.navSlice.toBack();
    }
    
    if (withPathAndTransform !== undefined &&
        withPathAndTransform === true) {
        this.initPathsAndTransforms();
        this.setCurrentTransform(false, false);
    }
};

wheelnavItem.prototype.setWheelSettings = function (force) {

    //Set slice from wheelnav
    if (this.wheelnav.slicePathAttr !== null) { this.slicePathAttr = JSON.parse(JSON.stringify(this.wheelnav.slicePathAttr)); }
    if (this.wheelnav.sliceHoverAttr !== null) { this.sliceHoverAttr = JSON.parse(JSON.stringify(this.wheelnav.sliceHoverAttr)); }
    if (this.wheelnav.sliceSelectedAttr !== null) { this.sliceSelectedAttr = JSON.parse(JSON.stringify(this.wheelnav.sliceSelectedAttr)); }
    
    //Set title from wheelnav
    if (this.wheelnav.titleAttr !== null) { this.titleAttr = JSON.parse(JSON.stringify(this.wheelnav.titleAttr)); }
    if (this.wheelnav.titleHoverAttr !== null) { this.titleHoverAttr = JSON.parse(JSON.stringify(this.wheelnav.titleHoverAttr)); }
    if (this.wheelnav.titleSelectedAttr !== null) { this.titleSelectedAttr = JSON.parse(JSON.stringify(this.wheelnav.titleSelectedAttr)); }
    if (this.wheelnav.titleRotateAngle !== null && this.titleRotateAngle === null) { this.titleRotateAngle = this.wheelnav.titleRotateAngle; }

    // Size
    if (this.wheelnav.titleWidth !== null && this.titleWidth === null) { this.titleWidth = this.wheelnav.titleWidth; }
    if (this.wheelnav.titleHeight !== null && this.titleHeight === null) { this.titleHeight = this.wheelnav.titleHeight; }
    if (this.titleWidth !== null && this.titleHeight === null) { this.titleHeight = this.titleWidth; }
    if (this.titleWidth === null && this.titleHeight !== null) { this.titleWidth = this.titleHeight; }
    if (wheelnavTitle().isImageTitle(this.title)) {
        // Image default value
        if (this.titleWidth === null) { this.titleWidth = 32; }
        if (this.titleHeight === null) { this.titleHeight = 32; }
    }

    if (this.wheelnav.titleHoverWidth !== null && this.titleHoverWidth === null) { this.titleHoverWidth = this.wheelnav.titleHoverWidth; }
    if (this.wheelnav.titleHoverHeight !== null && this.titleHoverHeight === null) { this.titleHoverHeight = this.wheelnav.titleHoverHeight; }
    if (this.titleHoverWidth !== null && this.titleHoverHeight === null) { this.titleHoverHeight = this.titleHoverWidth; }
    if (this.titleHoverWidth === null && this.titleHoverHeight !== null) { this.titleHoverWidth = this.titleHoverHeight; }

    if (this.wheelnav.titleSelectedWidth !== null && this.titleSelectedWidth === null) { this.titleSelectedWidth = this.wheelnav.titleSelectedWidth; }
    if (this.wheelnav.titleSelectedHeight !== null && this.titleSelectedHeight === null) { this.titleSelectedHeight = this.wheelnav.titleSelectedHeight; }
    if (this.titleSelectedWidth !== null && this.titleSelectedHeight === null) { this.titleSelectedHeight = this.titleSelectedWidth; }
    if (this.titleSelectedWidth === null && this.titleSelectedHeight !== null) { this.titleSelectedWidth = this.titleSelectedHeight; }

    if (this.titleHoverHeight === null) { this.titleHoverHeight = this.titleHeight; }
    if (this.titleHoverWidth === null) { this.titleHoverWidth = this.titleWidth; }
    if (this.titleSelectedHeight === null) { this.titleSelectedHeight = this.titleHeight; }
    if (this.titleSelectedWidth === null) { this.titleSelectedWidth = this.titleWidth; }

    //Set line from wheelnav
    if (this.wheelnav.linePathAttr !== null) { this.linePathAttr = JSON.parse(JSON.stringify(this.wheelnav.linePathAttr)); }
    if (this.wheelnav.lineHoverAttr !== null) { this.lineHoverAttr = JSON.parse(JSON.stringify(this.wheelnav.lineHoverAttr)); }
    if (this.wheelnav.lineSelectedAttr !== null) { this.lineSelectedAttr = JSON.parse(JSON.stringify(this.wheelnav.lineSelectedAttr)); }

    //Set animation from wheelnav
    if (this.animateeffect === null || force) {
        if (this.wheelnav.animateeffect !== null) { this.animateeffect = this.wheelnav.animateeffect; }
        else { this.animateeffect = "bounce"; }
    }
    if (this.animatetime === null || force) {
        if (this.wheelnav.animatetime !== null) { this.animatetime = this.wheelnav.animatetime; }
        else { this.animatetime = 1500; }
    }

    if (this.title !== null) {
        if (this.sliceInitPathFunction === null || force) { this.sliceInitPathFunction = this.wheelnav.sliceInitPathFunction; }
        if (this.sliceClickablePathFunction === null || force) { this.sliceClickablePathFunction = this.wheelnav.sliceClickablePathFunction; }
        if (this.slicePathFunction === null || force) { this.slicePathFunction = this.wheelnav.slicePathFunction; }
        if (this.sliceSelectedPathFunction === null || force) { this.sliceSelectedPathFunction = this.wheelnav.sliceSelectedPathFunction; }
        if (this.sliceHoverPathFunction === null || force) { this.sliceHoverPathFunction = this.wheelnav.sliceHoverPathFunction; }
            
        if (this.sliceTransformFunction === null || force) { this.sliceTransformFunction = this.wheelnav.sliceTransformFunction; }
        if (this.sliceSelectedTransformFunction === null || force) { this.sliceSelectedTransformFunction = this.wheelnav.sliceSelectedTransformFunction; }
        if (this.sliceHoverTransformFunction === null || force) { this.sliceHoverTransformFunction = this.wheelnav.sliceHoverTransformFunction; }
        if (this.sliceInitTransformFunction === null || force) { this.sliceInitTransformFunction = this.wheelnav.sliceInitTransformFunction; }
    }
    else {
        this.sliceInitPathFunction = slicePath().NullInitSlice;
        this.sliceClickablePathFunction = slicePath().NullSlice;
        this.slicePathFunction = slicePath().NullSlice;
        this.sliceSelectedPathFunction = null;
        this.sliceHoverPathFunction = null;
        this.sliceTransformFunction = null;
        this.sliceSelectedTransformFunction = null;
        this.sliceHoverTransformFunction = null;
        this.sliceInitTransformFunction = null;
    }

    if (this.slicePathCustom === null || force) { this.slicePathCustom = this.wheelnav.slicePathCustom; }
    if (this.sliceClickablePathCustom === null || force) { this.sliceClickablePathCustom = this.wheelnav.sliceClickablePathCustom; }
    if (this.sliceSelectedPathCustom === null || force) { this.sliceSelectedPathCustom = this.wheelnav.sliceSelectedPathCustom; }
    if (this.sliceHoverPathCustom === null || force) { this.sliceHoverPathCustom = this.wheelnav.sliceHoverPathCustom; }
    if (this.sliceInitPathCustom === null || force) { this.sliceInitPathCustom = this.wheelnav.sliceInitPathCustom; }

    if (this.sliceTransformCustom === null || force) { this.sliceTransformCustom = this.wheelnav.sliceTransformCustom; }
    if (this.sliceSelectedTransformCustom === null || force) { this.sliceSelectedTransformCustom = this.wheelnav.sliceSelectedTransformCustom; }
    if (this.sliceHoverTransformCustom === null || force) { this.sliceHoverTransformCustom = this.wheelnav.sliceHoverTransformCustom; }
    if (this.sliceInitTransformCustom === null || force) { this.sliceInitTransformCustom = this.wheelnav.sliceInitTransformCustom; }

    if (this.initPercent === null || force) { this.initPercent = this.wheelnav.initPercent; }
    if (this.minPercent === null || force) { this.minPercent = this.wheelnav.minPercent; }
    if (this.maxPercent === null || force) { this.maxPercent = this.wheelnav.maxPercent; }
    if (this.hoverPercent === null || force) { this.hoverPercent = this.wheelnav.hoverPercent; }
    if (this.selectedPercent === null || force) { this.selectedPercent = this.wheelnav.selectedPercent; }
    if (this.clickablePercentMin === null || force) { this.clickablePercentMin = this.wheelnav.clickablePercentMin; }
    if (this.clickablePercentMax === null || force) { this.clickablePercentMax = this.wheelnav.clickablePercentMax; }

    if (this.titleSpreadScale === null || force) {
        if (this.wheelnav.titleSpreadScale !== null) { this.titleSpreadScale = this.wheelnav.titleSpreadScale; }
        else { this.titleSpreadScale = false; }
    }
    if (this.sliceAngle === null || force) {
        if (this.wheelnav.sliceAngle !== null) { this.sliceAngle = this.wheelnav.sliceAngle; }
    }
};

wheelnavItem.prototype.initPathsAndTransforms = function () {

    this.sliceHelper = new pathHelper();
    this.sliceHelper.centerX = this.wheelnav.centerX;
    this.sliceHelper.centerY = this.wheelnav.centerY;
    this.sliceHelper.wheelRadius = this.wheelnav.wheelRadius;
    this.sliceHelper.startAngle = this.baseAngle;
    this.sliceHelper.sliceAngle = this.sliceAngle;
    this.sliceHelper.itemIndex = this.itemIndex;

    //Set min/max sliecePaths
    //Default - min
    this.slicePathMin = this.slicePathFunction(this.sliceHelper, this.minPercent, this.slicePathCustom);

    //Default - max
    this.slicePathMax = this.slicePathFunction(this.sliceHelper, this.maxPercent, this.slicePathCustom);

    //Selected - min
    if (this.sliceSelectedPathFunction !== null) {
        this.selectedSlicePathMin = this.sliceSelectedPathFunction(this.sliceHelper, this.selectedPercent * this.minPercent, this.sliceSelectedPathCustom);
    }
    else {
        this.selectedSlicePathMin = this.slicePathFunction(this.sliceHelper, this.selectedPercent * this.minPercent, this.sliceSelectedPathCustom);
    }

    //Selected - max
    if (this.sliceSelectedPathFunction !== null) {
        this.selectedSlicePathMax = this.sliceSelectedPathFunction(this.sliceHelper, this.selectedPercent * this.maxPercent, this.sliceSelectedPathCustom);
    }
    else {
        this.selectedSlicePathMax = this.slicePathFunction(this.sliceHelper, this.selectedPercent * this.maxPercent, this.sliceSelectedPathCustom);
    }

    //Hovered - min
    if (this.sliceHoverPathFunction !== null) {
        this.hoverSlicePathMin = this.sliceHoverPathFunction(this.sliceHelper, this.hoverPercent * this.minPercent, this.sliceHoverPathCustom);
    }
    else {
        this.hoverSlicePathMin = this.slicePathFunction(this.sliceHelper, this.hoverPercent * this.minPercent, this.sliceHoverPathCustom);
    }

    //Hovered - max
    if (this.sliceHoverPathFunction !== null) {
        this.hoverSlicePathMax = this.sliceHoverPathFunction(this.sliceHelper, this.hoverPercent * this.maxPercent, this.sliceHoverPathCustom);
    }
    else {
        this.hoverSlicePathMax = this.slicePathFunction(this.sliceHelper, this.hoverPercent * this.maxPercent, this.sliceHoverPathCustom);
    }

    //Set min/max sliececlickablePaths
    
    if (this.sliceClickablePathFunction !== null) {
        //Default - min
        this.clickableSlicePathMin = this.sliceClickablePathFunction(this.sliceHelper, this.clickablePercentMin, this.sliceClickablePathCustom);
        //Default - max
        this.clickableSlicePathMax = this.sliceClickablePathFunction(this.sliceHelper, this.clickablePercentMax, this.sliceClickablePathCustom);
    }

    //Initial path
    if (this.sliceInitPathFunction !== null) {
        this.sliceInitPath = this.sliceInitPathFunction(this.sliceHelper, this.initPercent, this.sliceInitPathCustom);
    }
    else {
        if (this.wheelnav.currentPercent === this.wheelnav.maxPercent) {
            this.sliceInitPath = this.slicePathFunction(this.sliceHelper, this.maxPercent, this.sliceInitPathCustom);
        }
        else {
            this.sliceInitPath = this.slicePathFunction(this.sliceHelper, this.minPercent, this.sliceInitPathCustom);
        }
    }

    //Set sliceTransforms
    //Default
    if (this.sliceTransformFunction !== null) {
        this.sliceTransform = this.sliceTransformFunction(this.wheelnav.centerX, this.wheelnav.centerY, this.wheelnav.wheelRadius, this.baseAngle, this.sliceAngle, this.titleRotateAngle, this.itemIndex, this.sliceTransformCustom);
    }
    else {
        this.sliceTransform = sliceTransform().NullTransform;
    }

    //Selected
    if (this.sliceSelectedTransformFunction !== null) {
        this.selectTransform = this.sliceSelectedTransformFunction(this.wheelnav.centerX, this.wheelnav.centerY, this.wheelnav.wheelRadius, this.baseAngle, this.sliceAngle, this.titleRotateAngle, this.itemIndex, this.sliceSelectedTransformCustom);
    }
    else {
        this.selectTransform = sliceTransform().NullTransform;
    }

    //Hovered
    if (this.sliceHoverTransformFunction !== null) {
        this.hoverTransform = this.sliceHoverTransformFunction(this.wheelnav.centerX, this.wheelnav.centerY, this.wheelnav.wheelRadius, this.baseAngle, this.sliceAngle, this.titleRotateAngle, this.itemIndex, this.sliceHoverTransformCustom);
    }
    else {
        this.hoverTransform = sliceTransform().NullTransform;
    }

    //Initial transform
    if (this.sliceInitTransformFunction !== null) {
        this.initTransform = this.sliceInitTransformFunction(this.wheelnav.centerX, this.wheelnav.centerY, this.wheelnav.wheelRadius, this.baseAngle, this.sliceAngle, this.titleRotateAngle, this.itemIndex, this.sliceInitTransformCustom);
    }
    else {
        this.initTransform = sliceTransform().NullTransform;
    }

    //Set titles
    if (wheelnavTitle().isPathTitle(this.title)) {
        initNavTitle = new wheelnavTitle(this.title, this.wheelnav.raphael.raphael);
        basicNavTitleMin = new wheelnavTitle(this.title, this.wheelnav.raphael.raphael);
        basicNavTitleMax = new wheelnavTitle(this.title, this.wheelnav.raphael.raphael);
        hoverNavTitleMin = new wheelnavTitle(this.titleHover, this.wheelnav.raphael.raphael);
        hoverNavTitleMax = new wheelnavTitle(this.titleHover, this.wheelnav.raphael.raphael);
        selectedNavTitleMin = new wheelnavTitle(this.titleSelected, this.wheelnav.raphael.raphael);
        selectedNavTitleMax = new wheelnavTitle(this.titleSelected, this.wheelnav.raphael.raphael);
        this.navTitleSizeTransform = basicNavTitleMax.getTitleSizeTransform(this.titleWidth, this.titleHeight);
        this.navTitleSizeHoverTransform = hoverNavTitleMax.getTitleSizeTransform(this.titleHoverWidth, this.titleHoverHeight);
        this.navTitleSizeSelectedTransform = selectedNavTitleMax.getTitleSizeTransform(this.titleSelectedWidth, this.titleSelectedHeight);
    }
    else {
        initNavTitle = new wheelnavTitle(this.title);
        basicNavTitleMin = new wheelnavTitle(this.title);
        basicNavTitleMax = new wheelnavTitle(this.title);
        hoverNavTitleMin = new wheelnavTitle(this.titleHover);
        hoverNavTitleMax = new wheelnavTitle(this.titleHover);
        selectedNavTitleMin = new wheelnavTitle(this.titleSelected);
        selectedNavTitleMax = new wheelnavTitle(this.titleSelected);
    }

    this.initNavTitle = initNavTitle.getTitlePercentAttr(this.sliceInitPath.titlePosX, this.sliceInitPath.titlePosY, this.titleWidth, this.titleHeight);
    this.basicNavTitleMin = basicNavTitleMin.getTitlePercentAttr(this.slicePathMin.titlePosX, this.slicePathMin.titlePosY, this.titleWidth, this.titleHeight);
    this.basicNavTitleMax = basicNavTitleMax.getTitlePercentAttr(this.slicePathMax.titlePosX, this.slicePathMax.titlePosY, this.titleWidth, this.titleHeight);
    this.hoverNavTitleMin = hoverNavTitleMin.getTitlePercentAttr(this.hoverSlicePathMin.titlePosX, this.hoverSlicePathMin.titlePosY, this.titleHoverWidth, this.titleHoverHeight);
    this.hoverNavTitleMax = hoverNavTitleMax.getTitlePercentAttr(this.hoverSlicePathMax.titlePosX, this.hoverSlicePathMax.titlePosY, this.titleHoverWidth, this.titleHoverHeight);
    this.selectedNavTitleMin = selectedNavTitleMin.getTitlePercentAttr(this.selectedSlicePathMin.titlePosX, this.selectedSlicePathMin.titlePosY, this.titleSelectedWidth, this.titleSelectedHeight);
    this.selectedNavTitleMax = selectedNavTitleMax.getTitlePercentAttr(this.selectedSlicePathMax.titlePosX, this.selectedSlicePathMax.titlePosY, this.titleSelectedWidth, this.titleSelectedHeight);
};

wheelnavItem.prototype.getCurrentPath = function () {
    var slicePath;

    if (this.wheelnav.currentPercent === this.wheelnav.maxPercent) {
        if (this.selected) {
            slicePath = this.selectedSlicePathMax;
        }
        else {
            if (this.hovered) {
                slicePath = this.hoverSlicePathMax;
            }
            else {
                slicePath = this.slicePathMax;
            }
        }
    }
    else {
        if (this.selected) {
            slicePath = this.selectedSlicePathMin;
        }
        else {
            if (this.hovered) {
                slicePath = this.hoverSlicePathMin;
            }
            else {
                slicePath = this.slicePathMin;
            }
        }
    }

    return slicePath;
};

wheelnavItem.prototype.getCurrentClickablePath = function () {
    var sliceClickablePath;

    if (this.wheelnav.currentPercent === this.wheelnav.maxPercent) {
        sliceClickablePath = this.clickableSlicePathMax;
    }
    else {
        sliceClickablePath = this.clickableSlicePathMin;
    }

    return sliceClickablePath;
};

wheelnavItem.prototype.getCurrentTitle = function () {
    var currentTitle;

    if (this.wheelnav.currentPercent === this.wheelnav.maxPercent) {
        if (this.selected) {
            currentTitle = this.selectedNavTitleMax;
        }
        else {
            if (this.hovered) {
                currentTitle = this.hoverNavTitleMax;
            }
            else {
                currentTitle = this.basicNavTitleMax;
            }
        }
    }
    else {
        if (this.selected) {
            currentTitle = this.selectedNavTitleMin;
        }
        else {
            if (this.hovered) {
                currentTitle = this.hoverNavTitleMin;
            }
            else {
                currentTitle = this.basicNavTitleMin;
            }
        }
    }

    return currentTitle;
};

wheelnavItem.prototype.getItemRotateString = function () {
    return "r," + (this.currentRotateAngle).toString() + "," + this.wheelnav.centerX + "," + this.wheelnav.centerY;
};

wheelnavItem.prototype.getTitleRotateString = function (withTitleRotateAngle) {

    var titleRotate = "";
    titleRotate += this.getItemRotateString();

    if (this.titleRotateAngle !== null && withTitleRotateAngle) {
        titleRotate += ",r," + (this.navAngle + this.titleRotateAngle).toString();
    }
    else {
        titleRotate += ",r," + (-this.currentRotateAngle).toString();
    }

    return titleRotate;
};

wheelnavTitle = function (title, raphael) {
    this.title = title;
    //Calculate relative path
    if (title !== null) {
        if (raphael !== undefined) {
            this.relativePath = raphael.pathToRelative(title);
            var bbox = raphael.pathBBox(this.relativePath);
            this.centerX = bbox.cx;
            this.centerY = bbox.cy;
            this.width = bbox.width;
            this.height = bbox.height;
            this.startX = this.relativePath[0][1];
            this.startY = this.relativePath[0][2];
        }
        this.title = title;
    }
    else {
        this.title = "";
    }

    this.isPathTitle = function (title) {
        if (title !== null &&
            (title.substr(0, 1) === "m" ||
            title.substr(0, 1) === "M") &&
            (title.substr(title.length - 1, 1) === "z" ||
            title.substr(title.length - 1, 1) === "Z") &&
            (title.indexOf(",") > -1 ||
            title.indexOf(" ") > -1)){
            return true;
        }
        else {
            return false;
        }
    };

    this.isImageTitle = function (title) {
        if (title === undefined) { title = this.title;}
        if (title !== null &&
            title.substr(0, 7) === "imgsrc:") {
            return true;
        }
        else {
            return false;
        }
    };

    return this;
};

wheelnavTitle.prototype.getTitlePercentAttr = function (currentX, currentY, titlewidth, titleheight) {

    var transformAttr = {};

    if (this.relativePath !== undefined) {
        var pathCx = currentX + (this.startX - this.centerX);
        var pathCy = currentY + (this.startY - this.centerY);

        this.relativePath[0][1] = pathCx;
        this.relativePath[0][2] = pathCy;

        transformAttr = {
            path: this.relativePath,
            title: this.title
        };
    }
    else {
        if (this.isImageTitle()) {
            transformAttr = {
                x: currentX - (titlewidth / 2),
                y: currentY - (titleheight / 2),
                width: titlewidth,
                height: titleheight,
                title: this.title,
                src: this.title.substr(7, this.title.length)
            };
        }
        else {
            transformAttr = {
                x: currentX,
                y: currentY,
                title: this.title
            };
        }
    }

    return transformAttr;
};

wheelnavTitle.prototype.getTitleSizeTransform = function (titlewidth, titleheight) {

    var transformAttr = "";

    //Calculate path width & height
    if (titlewidth !== null && titleheight !== null) {
        transformAttr = "s";
        if (this.height > this.width) {
            transformAttr += (titlewidth / this.height).toString() + ",";
            transformAttr += (titleheight / this.height).toString();
        }
        else {
            transformAttr += (titlewidth / this.width).toString() + ",";
            transformAttr += (titleheight / this.width).toString();
        }
    }

    return transformAttr;
};

///#source 1 1 /js/source/wheelnav.style.js
/* ======================================================================================= */
/* Default styles and available css classes                                                */
/* ======================================================================================= */
/* ======================================================================================= */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/css3.html          */
/* ======================================================================================= */

wheelnav.prototype.styleWheel = function () {
    if (!this.cssMode) {
        if (this.spreaderPathInAttr === undefined || this.spreaderPathInAttr === null) {
            this.spreaderPathInAttr = { fill: "#444", stroke: "#444", "stroke-width": 2, cursor: 'pointer' };
        }
        if (this.spreaderPathOutAttr === undefined || this.spreaderPathOutAttr === null) {
            this.spreaderPathOutAttr = { fill: "#444", stroke: "#444", "stroke-width": 2, cursor: 'pointer' };
        }
        if (this.spreaderTitleInAttr === undefined || this.spreaderTitleInAttr === null) {
            this.spreaderTitleInAttr = { fill: "#eee", stroke: "#444", cursor: 'pointer' };
        }
        if (this.spreaderTitleOutAttr === undefined || this.spreaderTitleOutAttr === null) {
            this.spreaderTitleOutAttr = { fill: "#eee", stroke: "#444", cursor: 'pointer' };
        }
        if (this.markerAttr === undefined || this.markerAttr === null) {
            this.markerAttr = { stroke: "#444", "stroke-width": 2 };
        }
    }
    else {
        this.spreaderPathInAttr = { "class": this.getSpreaderCssClass("in") };
        this.spreaderPathOutAttr = { "class": this.getSpreaderCssClass("out") };
        this.spreaderTitleInAttr = { "class": this.getSpreaderTitleCssClass("in") };
        this.spreaderTitleOutAttr = { "class": this.getSpreaderTitleCssClass("out") };
        this.markerAttr = { "class": this.getMarkerCssClass() };
    }
};

wheelnavItem.prototype.styleNavItem = function () {
    if (!this.wheelnav.cssMode) {
        this.slicePathAttr = { stroke: "#333", "stroke-width": 0, cursor: 'pointer', "fill-opacity": 1 };
        this.sliceHoverAttr = { stroke: "#222", "stroke-width": 0, cursor: 'pointer', "fill-opacity": 0.77 };
        this.sliceSelectedAttr = { stroke: "#111", "stroke-width": 0, cursor: 'default', "fill-opacity": 1 };

        this.titleAttr = { font: this.titleFont, fill: "#333", stroke: "none", cursor: 'pointer' };
        this.titleHoverAttr = { font: this.titleFont, fill: "#222", cursor: 'pointer', stroke: "none" };
        this.titleSelectedAttr = { font: this.titleFont, fill: "#fff", cursor: 'default' };

        this.linePathAttr = { stroke: "#444", "stroke-width": 1, cursor: 'pointer' };
        this.lineHoverAttr = { stroke: "#222", "stroke-width": 2, cursor: 'pointer' };
        this.lineSelectedAttr = { stroke: "#444", "stroke-width": 1, cursor: 'default' };
    }
    else {
        this.slicePathAttr = { "class": this.wheelnav.getSliceCssClass(this.wheelItemIndex, "basic") };
        this.sliceHoverAttr = { "class": this.wheelnav.getSliceCssClass(this.wheelItemIndex, "hover") };
        this.sliceSelectedAttr = { "class": this.wheelnav.getSliceCssClass(this.wheelItemIndex, "selected") };

        this.titleAttr = { "class": this.wheelnav.getTitleCssClass(this.wheelItemIndex, "basic") };
        this.titleHoverAttr = { "class": this.wheelnav.getTitleCssClass(this.wheelItemIndex, "hover") };
        this.titleSelectedAttr = { "class": this.wheelnav.getTitleCssClass(this.wheelItemIndex, "selected") };

        this.linePathAttr = { "class": this.wheelnav.getLineCssClass(this.wheelItemIndex, "basic") };
        this.lineHoverAttr = { "class": this.wheelnav.getLineCssClass(this.wheelItemIndex, "hover") };
        this.lineSelectedAttr = { "class": this.wheelnav.getLineCssClass(this.wheelItemIndex, "selected") };
    }

    this.sliceClickablePathAttr = { fill: "#FFF", stroke: "#FFF", "stroke-width": 0, cursor: 'pointer', "fill-opacity": 0.01 };
    this.sliceClickableHoverAttr = { stroke: "#FFF", "stroke-width": 0, cursor: 'pointer' };
    this.sliceClickableSelectedAttr = { stroke: "#FFF", "stroke-width": 0, cursor: 'default' };
}

wheelnav.prototype.getSliceCssClass = function (index, subclass) {
    return "wheelnav-" + this.holderId + "-slice-" + subclass + "-" + index;
};
wheelnav.prototype.getTitleCssClass = function (index, subclass) {
    return "wheelnav-" + this.holderId + "-title-" + subclass + "-" + index;
};
wheelnav.prototype.getLineCssClass = function (index, subclass) {
    return "wheelnav-" + this.holderId + "-line-" + subclass + "-" + index;
};
wheelnav.prototype.getSpreaderCssClass = function (state) {
    return "wheelnav-" + this.holderId + "-spreader-" + state;
};
wheelnav.prototype.getSpreaderTitleCssClass = function (state) {
    return "wheelnav-" + this.holderId + "-spreadertitle-" + state;
};
wheelnav.prototype.getMarkerCssClass = function () {
    return "wheelnav-" + this.holderId + "-marker";
};

///#source 1 1 /js/source/wheelnav.pathHelper.js
/* ======================================================================================= */
/* Slice path helper functions                                                                  */
/* ======================================================================================= */
/* ======================================================================================= */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/slicePath.html     */
/* ======================================================================================= */

var pathHelper = function () {

    this.sliceRadius = 0;
    this.startAngle = 0;
    this.middleAngle = 0;
    this.endAngle = 0;
    this.sliceAngle = 0;
    this.startTheta = 0;
    this.middleTheta = 0;
    this.endTheta = 0;
    this.titlePosX = 0;
    this.titlePosY = 0;
    this.titleRadius = 0;
    this.titleTheta = 0;
    this.custom = null;
    this.centerX = 0;
    this.centerY = 0;
    this.wheelRadius = 0;
    this.itemIndex = 0;
    this.navItemCount = 0;
    this.navAngle = 0;

    this.setBaseValue = function (percent, custom) {

        if (custom === null) {
            custom = new slicePathCustomization();
        }
        else {
            this.custom = custom;
        }

        this.sliceRadius = this.wheelRadius * percent * 0.9;

        this.middleAngle = this.startAngle + this.sliceAngle / 2;
        this.endAngle = this.startAngle + this.sliceAngle;

        this.startTheta = this.getTheta(this.startAngle);
        this.middleTheta = this.getTheta(this.middleAngle);
        this.endTheta = this.getTheta(this.endAngle);

        if (custom !== null) {
            if (custom.titleRadiusPercent !== null) {
                this.titleRadius = this.sliceRadius * custom.titleRadiusPercent;
            }
            if (custom.titleSliceAnglePercent !== null) {
                this.titleTheta = this.getTheta(this.startAngle + this.sliceAngle * custom.titleSliceAnglePercent);
            }
        }
        else {
            this.titleRadius = this.sliceRadius * 0.5;
            this.titleTheta = this.middleTheta;
        }

        this.setTitlePos();
    };

    this.setTitlePos = function () {
        this.titlePosX = this.titleRadius * Math.cos(this.titleTheta) + this.centerX;
        this.titlePosY = this.titleRadius * Math.sin(this.titleTheta) + this.centerY;
    };

    this.getX = function (angle, length) {
        return length * Math.cos(this.getTheta(angle)) + this.centerX;
    };

    this.getY = function (angle, length) {
        return length * Math.sin(this.getTheta(angle)) + this.centerY;
    };

    this.MoveTo = function (angle, length) {
        return ["M", this.getX(angle, length), this.getY(angle, length)];
    };

    this.MoveToCenter = function () {
        return ["M", this.centerX, this.centerY];
    };

    this.LineTo = function (angle, length, angleY, lengthY) {
        if (angleY === undefined) {
            angleY = angle;
        }
        if (lengthY === undefined) {
            lengthY = length;
        }
        return ["L", this.getX(angle, length), this.getY(angleY, lengthY)];
    };

    this.ArcTo = function (arcRadius, angle, length) {
        return ["A", arcRadius, arcRadius, 0, 0, 1, this.getX(angle, length), this.getY(angle, length)]
    };

    this.ArcBackTo = function (arcRadius, angle, length) {
        return ["A", arcRadius, arcRadius, 0, 0, 0, this.getX(angle, length), this.getY(angle, length)]
    };

    this.StartSpreader = function (spreaderPathString, angle, length) {
        if (this.endAngle - this.startAngle === 360) {
            spreaderPathString.push(this.MoveTo(angle, length));
        }
        else {
            spreaderPathString.push(this.MoveToCenter());
            spreaderPathString.push(this.LineTo(angle, length));
        }
    };

    this.Close = function () {
        return ["z"];
    };

    this.getTheta = function (angle) {
        return (angle % 360) * Math.PI / 180;
    };

    // Converts from degrees to radians.
    this.radians = function (degrees) {
        return degrees * Math.PI / 180;
    };

    // Converts from radians to degrees.
    this.degrees = function (radians) {
        return radians * 180 / Math.PI;
    };

    return this;
};

/* Custom properties
    - titleRadiusPercent
    - titleSliceAnglePercent
*/
var slicePathCustomization = function () {

    this.titleRadiusPercent = 0.5;
    this.titleSliceAnglePercent = 0.5;

    return this;
};

/* Custom properties
    - titleRadiusPercent
    - titleSliceAnglePercent
    - spreaderPercent
*/
var spreaderPathCustomization = function () {

    this.titleRadiusPercent = 0;
    this.titleSliceAnglePercent = 0.5;
    this.spreaderPercent = 1;

    return this;
};

/* Custom properties
    - titleRadiusPercent
    - titleSliceAnglePercent
    - markerPercent
*/
var markerPathCustomization = function () {

    this.titleRadiusPercent = 1;
    this.titleSliceAnglePercent = 0.5;
    this.markerPercent = 1.05;

    return this;
};


///#source 1 1 /js/source/slicePath/wheelnav.slicePath.js
///#source 1 1 /js/source/slicePath/wheelnav.slicePathStart.js
/* ======================================================================================= */
/* Slice path definitions.                                                                 */
/* ======================================================================================= */
/* ======================================================================================= */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/slicePath.html     */
/* ======================================================================================= */

slicePath = function () {

    this.NullSlice = function (helper, percent, custom) {

        helper.setBaseValue(percent, custom);

        return {
            slicePathString: "",
            linePathString: "",
            titlePosX: helper.titlePosX,
            titlePosY: helper.titlePosY
        };
    };

    this.NullInitSlice = function (helper, percent, custom) {

        helper.setBaseValue(percent, custom);

        slicePathString = [helper.MoveToCenter(),
                 helper.Close()];

        return {
            slicePathString: slicePathString,
            linePathString: slicePathString,
            titlePosX: helper.centerX,
            titlePosY: helper.centerY
        };
    };

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Pie.js

this.PieSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.titleRadiusPercent = 0.6;
    custom.arcBaseRadiusPercent = 1;
    custom.arcRadiusPercent = 1;
    custom.startRadiusPercent = 0;
    return custom;
};

this.PieSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = PieSliceCustomization();
    }

    helper.setBaseValue(percent, custom);

    var arcBaseRadius = helper.sliceRadius * custom.arcBaseRadiusPercent;
    var arcRadius = helper.sliceRadius * custom.arcRadiusPercent;

    slicePathString = [helper.MoveTo(helper.middleAngle, custom.startRadiusPercent * helper.sliceRadius),
                 helper.LineTo(helper.startAngle, arcBaseRadius),
                 helper.ArcTo(arcRadius, helper.middleAngle, arcBaseRadius),
                 helper.ArcTo(arcRadius, helper.endAngle, arcBaseRadius),
                 helper.Close()];
    
    return {
        slicePathString: slicePathString,
        linePathString: "",
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

this.FlowerSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = PieSliceCustomization();
        custom.titleRadiusPercent = 0.5;
        custom.arcBaseRadiusPercent = 0.65;
        custom.arcRadiusPercent = 0.14;
    }

    var slicePath = PieSlice(helper, percent, custom);

    return {
        slicePathString: slicePath.slicePathString,
        linePathString: "",
        titlePosX: slicePath.titlePosX,
        titlePosY: slicePath.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.PieArrow.js

this.PieArrowSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.titleRadiusPercent = 0.6;
    custom.arrowRadiusPercent = 1.1;

    return custom;
};

this.PieArrowSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = PieArrowSliceCustomization();
    }

    helper.setBaseValue(percent, custom);

    r = helper.sliceRadius;
    
    arrowAngleStart = helper.startAngle + helper.sliceAngle * 0.45;
    arrowAngleEnd = helper.startAngle + helper.sliceAngle * 0.55;

    var arrowRadius = r * custom.arrowRadiusPercent;

    slicePathString = [helper.MoveToCenter(),
                 helper.LineTo(helper.startAngle, r),
                 helper.ArcTo(r, arrowAngleStart, r),
                 helper.LineTo(helper.middleAngle, arrowRadius),
                 helper.LineTo(arrowAngleEnd, r),
                 helper.ArcTo(r, helper.endAngle, r),
                 helper.Close()];

    return {
        slicePathString: slicePathString,
        linePathString: "",
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

this.PieArrowBasePieSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = PieArrowSliceCustomization();
    }

    custom.arrowRadiusPercent = 1;
    var slicePath = PieArrowSlice(helper, percent, custom);

    return {
        slicePathString: slicePath.slicePathString,
        linePathString: "",
        titlePosX: slicePath.titlePosX,
        titlePosY: slicePath.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Donut.js

this.DonutSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.minRadiusPercent = 0.37;
    custom.maxRadiusPercent = 0.9;

    return custom;
};

this.DonutSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = DonutSliceCustomization();
    }

    maxRadius = helper.wheelRadius * percent * custom.maxRadiusPercent;
    minRadius = helper.wheelRadius * percent * custom.minRadiusPercent;

    helper.setBaseValue(percent, custom);

    helper.titleRadius = (maxRadius + minRadius) / 2;
    helper.setTitlePos();

    slicePathString = [helper.MoveTo(helper.startAngle, minRadius),
                 helper.LineTo(helper.startAngle, maxRadius),
                 helper.ArcTo(maxRadius, helper.middleAngle, maxRadius),
                 helper.ArcTo(maxRadius, helper.endAngle, maxRadius),
                 helper.LineTo(helper.endAngle, minRadius),
                 helper.ArcBackTo(minRadius, helper.middleAngle, minRadius),
                 helper.ArcBackTo(minRadius, helper.startAngle, minRadius),
                 helper.Close()];

    return {
        slicePathString: slicePathString,
        linePathString: "",
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Cog.js

this.CogSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.titleRadiusPercent = 0.55;
    custom.isBasePieSlice = false;

    return custom;
};

this.CogSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = CogSliceCustomization();
    }

    helper.setBaseValue(percent, custom);

    r = helper.sliceRadius;
    rbase = helper.wheelRadius * percent * 0.83;

    percentAngle0625 = helper.startAngle + helper.sliceAngle * 0.0625;
    percentAngle1250 = helper.startAngle + helper.sliceAngle * 0.125;
    percentAngle1875 = helper.startAngle + helper.sliceAngle * 0.1875;
    percentAngle2500 = helper.startAngle + helper.sliceAngle * 0.25;
    percentAngle3125 = helper.startAngle + helper.sliceAngle * 0.3125;
    percentAngle3750 = helper.startAngle + helper.sliceAngle * 0.375;
    percentAngle4375 = helper.startAngle + helper.sliceAngle * 0.4375;
    percentAngle5000 = helper.startAngle + helper.sliceAngle * 0.5;
    percentAngle5625 = helper.startAngle + helper.sliceAngle * 0.5625;
    percentAngle6250 = helper.startAngle + helper.sliceAngle * 0.625;
    percentAngle6875 = helper.startAngle + helper.sliceAngle * 0.6875;
    percentAngle7500 = helper.startAngle + helper.sliceAngle * 0.75;
    percentAngle8125 = helper.startAngle + helper.sliceAngle * 0.8125;
    percentAngle8750 = helper.startAngle + helper.sliceAngle * 0.875;
    percentAngle9375 = helper.startAngle + helper.sliceAngle * 0.9375;
    percentAngle9687 = helper.startAngle + helper.sliceAngle * 0.96875;

    if (custom.isBasePieSlice) {
        r = rbase;
        slicePathString = [helper.MoveToCenter(),
            helper.LineTo(helper.startAngle, r),
            helper.ArcTo(r, percentAngle0625, r),
            helper.ArcTo(r, percentAngle1250, r),
            helper.ArcTo(r, percentAngle1875, r),
            helper.ArcTo(r, percentAngle2500, r),
            helper.ArcTo(r, percentAngle3125, r),
            helper.ArcTo(r, percentAngle3750, r),
            helper.ArcTo(r, percentAngle4375, r),
            helper.ArcTo(r, percentAngle5000, r),
            helper.ArcTo(r, percentAngle5625, r),
            helper.ArcTo(r, percentAngle6250, r),
            helper.ArcTo(r, percentAngle6875, r),
            helper.ArcTo(r, percentAngle7500, r),
            helper.ArcTo(r, percentAngle8125, r),
            helper.ArcTo(r, percentAngle8750, r),
            helper.ArcTo(r, percentAngle9375, r),
            helper.ArcTo(r, percentAngle9687, r),
            helper.ArcTo(r, helper.endAngle, r),
            helper.Close()];
    }
    else {
        slicePathString = [helper.MoveToCenter(),
            helper.LineTo(helper.startAngle, r),
            helper.ArcTo(r, percentAngle0625, r),
            helper.LineTo(percentAngle0625, rbase),
            helper.ArcTo(rbase, percentAngle1875, rbase),
            helper.LineTo(percentAngle1875, r),
            helper.ArcTo(r, percentAngle3125, r),
            helper.LineTo(percentAngle3125, rbase),
            helper.ArcTo(rbase, percentAngle4375, rbase),
            helper.LineTo(percentAngle4375, r),
            helper.ArcTo(r, percentAngle5625, r),
            helper.LineTo(percentAngle5625, rbase),
            helper.ArcTo(rbase, percentAngle6875, rbase),
            helper.LineTo(percentAngle6875, r),
            helper.ArcTo(r, percentAngle8125, r),
            helper.LineTo(percentAngle8125, rbase),
            helper.ArcTo(rbase, percentAngle9375, rbase),
            helper.LineTo(percentAngle9375, r),
            helper.ArcTo(r, helper.endAngle, r),
            helper.Close()];
    }

    return {
        slicePathString: slicePathString,
        linePathString: "",
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

this.CogBasePieSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = CogSliceCustomization();
    }

    custom.isBasePieSlice = true;

    var slicePath = CogSlice(helper, percent, custom);

    return {
        slicePathString: slicePath.slicePathString,
        linePathString: "",
        titlePosX: slicePath.titlePosX,
        titlePosY: slicePath.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Star.js

this.StarSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.titleRadiusPercent = 0.44;
    custom.minRadiusPercent = 0.5;
    custom.isBasePieSlice = false;

    return custom;
};

this.StarSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = StarSliceCustomization();
    }

    helper.setBaseValue(percent, custom);

    r = helper.wheelRadius * percent;
    rbase = r * custom.minRadiusPercent;

    if (custom.isBasePieSlice) {
        r = helper.sliceRadius;
        slicePathString = [helper.MoveToCenter(),
                 helper.LineTo(helper.startAngle, r),
                 helper.ArcTo(r, helper.middleAngle, r),
                 helper.ArcTo(r, helper.endAngle, r),
                 helper.Close()];
    }
    else {
        slicePathString = [helper.MoveToCenter(),
                     helper.LineTo(helper.startAngle, rbase),
                     helper.LineTo(helper.middleAngle, r),
                     helper.LineTo(helper.endAngle, rbase),
                     helper.Close()];
    }

    return {
        slicePathString: slicePathString,
        linePathString: "",
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

this.StarBasePieSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = StarSliceCustomization();
    }

    custom.titleRadiusPercent = 0.6;
    custom.isBasePieSlice = true;

    var slicePath = StarSlice(helper, percent, custom);

    return {
        slicePathString: slicePath.slicePathString,
        linePathString: "",
        titlePosX: slicePath.titlePosX,
        titlePosY: slicePath.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Menu.js

this.MenuSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.menuRadius = 35;
    custom.titleRadiusPercent = 0.63;
    custom.isSelectedLine = false;
    custom.lineBaseRadiusPercent = 0;

    return custom;
};

this.MenuSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = MenuSliceCustomization();
    }

    helper.setBaseValue(percent, custom);
    x = helper.centerX;
    y = helper.centerY;

    var r = helper.wheelRadius * percent;
    helper.titleRadius = r * custom.titleRadiusPercent;
    helper.setTitlePos();

    var menuRadius = percent * custom.menuRadius;

    if (percent <= 0.05) { menuRadius = 10; }

    middleTheta = helper.middleTheta;

    slicePathString = [["M", helper.titlePosX - (menuRadius * Math.cos(middleTheta)), helper.titlePosY - (menuRadius * Math.sin(middleTheta))],
                ["A", menuRadius, menuRadius, 0, 0, 1, helper.titlePosX + (menuRadius * Math.cos(middleTheta)), helper.titlePosY + (menuRadius * Math.sin(middleTheta))],
                ["A", menuRadius, menuRadius, 0, 0, 1, helper.titlePosX - (menuRadius * Math.cos(middleTheta)), helper.titlePosY - (menuRadius * Math.sin(middleTheta))],
                ["z"]];

    if (percent <= 0.05) {
        linePathString = [["M", x, y],
                ["A", 1, 1, 0, 0, 1, x + 1, y + 1]];
    }
    else {
        if (!custom.isSelectedLine) {
            linePathString = [helper.MoveTo(helper.middleAngle, custom.lineBaseRadiusPercent * r),
                              helper.ArcTo(r / 2, helper.middleAngle, helper.titleRadius - menuRadius)];
        }
        else {
            linePathString = [helper.MoveTo(helper.middleAngle, custom.lineBaseRadiusPercent * r),
                              helper.ArcTo(r / 3, helper.middleAngle, helper.titleRadius - menuRadius)];
        }
    }

    return {
        slicePathString: slicePathString,
        linePathString: linePathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

this.MenuSliceSelectedLine = function (helper, percent, custom) {

    if (custom === null) {
        custom = MenuSliceCustomization();
    }

    custom.isSelectedLine = true;

    var slicePath = MenuSlice(helper, percent, custom);

    return {
        slicePathString: slicePath.slicePathString,
        linePathString: slicePath.linePathString,
        titlePosX: slicePath.titlePosX,
        titlePosY: slicePath.titlePosY
    };
};

this.MenuSliceWithoutLine = function (helper, percent, custom) {

    var slicePath = MenuSlice(helper, percent, custom);

    return {
        slicePathString: slicePath.slicePathString,
        linePathString: "",
        titlePosX: slicePath.titlePosX,
        titlePosY: slicePath.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Line.js

this.LineSlice = function (helper, percent, custom) {

    helper.setBaseValue(percent, custom);

    r = helper.sliceRadius;

    if (helper.sliceAngle > 60 &&
        helper.sliceAngle < 180) {
        helper.titleRadius = r * ((180 / helper.sliceAngle) / 5);
        helper.setTitlePos();
    }
    else {
        helper.titleRadius = r * 0.55;
        helper.setTitlePos();
    }

    if (helper.sliceAngle < 180) {
        slicePathString = [helper.MoveToCenter(),
                 helper.LineTo(helper.startAngle, r),
                 helper.LineTo(helper.endAngle, r),
                 helper.Close()];
    }
    else {
        if (helper.startAngle === 180 ||
            helper.startAngle === 0 ||
            helper.startAngle === -180 ||
            helper.startAngle === 360) {
            slicePathString = [helper.MoveToCenter(),
                 helper.LineTo(helper.startAngle, r),
                 helper.LineTo(helper.startAngle, r, helper.middleAngle, r),
                 helper.LineTo(helper.endAngle, r, helper.middleAngle, r),
                 helper.LineTo(helper.endAngle, r),
                 helper.Close()];
        }
        else {
            slicePathString = [helper.MoveToCenter(),
             helper.LineTo(helper.startAngle, r),
             helper.LineTo(helper.middleAngle, r, helper.startAngle, r),
             helper.LineTo(helper.middleAngle, r, helper.endAngle, r),
             helper.LineTo(helper.endAngle, r),
             helper.Close()];
        }
    }

    return {
        slicePathString: slicePathString,
        linePathString: "",
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Eye.js

this.EyeSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.titleRadiusPercent = 0.68;

    return custom;
};

this.EyeSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = EyeSliceCustomization();
    }

    helper.setBaseValue(percent, custom);

    r = helper.wheelRadius * percent * 0.7;

    if (percent === 0) {
        r = 0.01;
    }

    startAngle = helper.startAngle;
    endAngle = helper.endAngle;

    if (helper.sliceAngle === 180) {
        startAngle = helper.startAngle + helper.sliceAngle / 4;
        endAngle = helper.startAngle + helper.sliceAngle - helper.sliceAngle / 4;
    }

    slicePathString = [helper.MoveTo(endAngle, r),
                 helper.ArcTo(r, startAngle, r),
                 helper.ArcTo(r, endAngle, r),
                 helper.Close()];

    return {
        slicePathString: slicePathString,
        linePathString: "",
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Wheel.js

this.WheelSlice = function (helper, percent, custom) {

    helper.setBaseValue(percent, custom);
    x = helper.centerX;
    y = helper.centerY;

    r = helper.sliceRadius;

    startTheta = helper.startTheta;
    middleTheta = helper.middleTheta;
    endTheta = helper.endTheta;

    var innerRadiusPercent;
    var startendRadiusPercent;

    if (helper.sliceAngle < 120) {
        helper.titleRadius = r * 0.57;
        innerRadiusPercent = 0.9;
        middleRadiusPercent = 0.87;
        startendRadiusPercent = 0.87;
    }
    else if (helper.sliceAngle < 180) {
        helper.titleRadius = r * 0.52;
        innerRadiusPercent = 0.91;
        middleRadiusPercent = 0.87;
        startendRadiusPercent = 0.87;
    }
    else {
        helper.titleRadius = r * 0.45;
        innerRadiusPercent = 0.873;
        middleRadiusPercent = 0.87;
        startendRadiusPercent = 0.94;
    }

    slicePathString = [helper.MoveTo(helper.middleAngle, r * 0.07),
                 ["L", (r * 0.07) * Math.cos(middleTheta) + (r * startendRadiusPercent) * Math.cos(startTheta) + x, (r * 0.07) * Math.sin(middleTheta) + (r * startendRadiusPercent) * Math.sin(startTheta) + y],
                 ["A", (r * innerRadiusPercent), (r * innerRadiusPercent), 0, 0, 1, (r * 0.07) * Math.cos(middleTheta) + (r * middleRadiusPercent) * Math.cos(middleTheta) + x, (r * 0.07) * Math.sin(middleTheta) + (r * middleRadiusPercent) * Math.sin(middleTheta) + y],
                 ["A", (r * innerRadiusPercent), (r * innerRadiusPercent), 0, 0, 1, (r * 0.07) * Math.cos(middleTheta) + (r * startendRadiusPercent) * Math.cos(endTheta) + x, (r * 0.07) * Math.sin(middleTheta) + (r * startendRadiusPercent) * Math.sin(endTheta) + y],
                 helper.Close()];

    linePathString = [helper.MoveTo(helper.startAngle, r),
                 helper.ArcTo(r, helper.middleAngle, r),
                 helper.ArcTo(r, helper.endAngle, r),
                 helper.ArcBackTo(r, helper.middleAngle, r),
                 helper.ArcBackTo(r, helper.startAngle, r)];

    helper.setTitlePos();

    return {
        slicePathString: slicePathString,
        linePathString: linePathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.OuterStroke.js

this.OuterStrokeSlice = function (helper, percent, custom) {

    helper.setBaseValue(percent, custom);
    x = helper.centerX;
    y = helper.centerY;

    r = helper.sliceRadius;
    innerRadius = r / 4;

    if (helper.sliceAngle < 120) { helper.titleRadius = r * 0.57; }
    else if (helper.sliceAngle < 180) { helper.titleRadius = r * 0.52; }
    else { helper.titleRadius = r * 0.45; }

    linePathString = [helper.MoveTo(helper.startAngle, innerRadius),
                 helper.LineTo(helper.startAngle, r),
                 helper.MoveTo(helper.endAngle, innerRadius),
                 helper.LineTo(helper.endAngle, r)];

    slicePathString = [helper.MoveTo(helper.startAngle, r),
                 helper.ArcTo(r, helper.middleAngle, r),
                 helper.ArcTo(r, helper.endAngle, r),
                 helper.ArcBackTo(r, helper.middleAngle, r),
                 helper.ArcBackTo(r, helper.startAngle, r),
                 helper.MoveTo(helper.startAngle, innerRadius),
                 helper.ArcTo(innerRadius, helper.middleAngle, innerRadius),
                 helper.ArcTo(innerRadius, helper.endAngle, innerRadius),
                 helper.ArcBackTo(innerRadius, helper.middleAngle, innerRadius),
                 helper.ArcBackTo(innerRadius, helper.startAngle, innerRadius)];

    helper.setTitlePos();

    return {
        slicePathString: slicePathString,
        linePathString: linePathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Tab.js

this.TabSlice = function (helper, percent, custom) {

    var rOriginal = helper.wheelRadius * 0.9;
    var navItemCount = 360 / helper.sliceAngle;
    var itemSize = 2 * rOriginal / navItemCount;

    x = helper.centerX;
    y = helper.centerY;
    itemIndex = helper.itemIndex;

    titlePosX = x;
    titlePosY = itemIndex * itemSize + y + (itemSize / 2) - rOriginal;

    slicePathString = [["M", x - (itemSize / 2), itemIndex * itemSize + y - rOriginal],
                 ["L", (itemSize / 2) + x, itemIndex * itemSize + y - rOriginal],
                 ["L", (itemSize / 2) + x, (itemIndex + 1) * itemSize + y - rOriginal],
                 ["L", x - (itemSize / 2), (itemIndex + 1) * itemSize + y - rOriginal],
                 ["z"]];

    return {
        slicePathString: slicePathString,
        linePathString: "",
        titlePosX: titlePosX,
        titlePosY: titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.YinYang.js

this.YinYangSlice = function (helper, percent, custom) {

    helper.setBaseValue(percent, custom);

    r = helper.sliceRadius;

    slicePathString = [helper.MoveToCenter(),
                 helper.ArcTo(r / 2, helper.startAngle, r),
                 helper.ArcTo(r, helper.middleAngle, r),
                 helper.ArcTo(r, helper.endAngle, r),
                 helper.ArcBackTo(r / 2, 0, 0),
                 helper.Close()];

    titlePosX = helper.getX(helper.startAngle, r / 2);
    titlePosY = helper.getY(helper.startAngle, r / 2);

    return {
        slicePathString: slicePathString,
        linePathString: slicePathString,
        titlePosX: titlePosX,
        titlePosY: titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Web.js

this.WebSlice = function (helper, percent, custom) {

    helper.setBaseValue(percent, custom);

    r = helper.sliceRadius;

    helper.titleRadius = r * 0.55;
    helper.setTitlePos();

    linePathString = [helper.MoveToCenter(),
                 helper.LineTo(helper.startAngle, r * 1.1),
                 helper.MoveToCenter(),
                 helper.LineTo(helper.endAngle, r * 1.1),
                 helper.MoveTo(helper.startAngle, r * 0.15),
                 helper.LineTo(helper.endAngle, r * 0.15),
                 helper.MoveTo(helper.startAngle, r * 0.35),
                 helper.LineTo(helper.endAngle, r * 0.35),
                 helper.MoveTo(helper.startAngle, r * 0.55),
                 helper.LineTo(helper.endAngle, r * 0.55),
                 helper.MoveTo(helper.startAngle, r * 0.75),
                 helper.LineTo(helper.endAngle, r * 0.75),
                 helper.MoveTo(helper.startAngle, r * 0.95),
                 helper.LineTo(helper.endAngle, r * 0.95),
                 helper.Close()];

    return {
        slicePathString: "",
        linePathString: linePathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Winter.js

this.WinterSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.titleRadiusPercent = 0.85;
    custom.arcRadiusPercent = 1;
    return custom;
};

this.WinterSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = WinterSliceCustomization();
    }

    helper.setBaseValue(percent, custom);

    sliceAngle = helper.sliceAngle;

    parallelAngle = helper.startAngle + sliceAngle / 4;
    parallelAngle2 = helper.startAngle + ((sliceAngle / 4) * 3);
    borderAngle1 = helper.startAngle + (sliceAngle / 200);
    borderAngle2 = helper.startAngle + (sliceAngle / 2) - (sliceAngle / 200);
    borderAngle3 = helper.startAngle + (sliceAngle / 2) + (sliceAngle / 200);
    borderAngle4 = helper.startAngle + sliceAngle - (sliceAngle / 200);

    var arcRadius = helper.sliceRadius * custom.arcRadiusPercent;

    slicePathString = [helper.MoveToCenter(),
                 helper.MoveTo(parallelAngle, arcRadius / 100),
                 helper.LineTo(borderAngle1, arcRadius / 2),
                 helper.LineTo(parallelAngle, arcRadius - (arcRadius / 100)),
                 helper.LineTo(borderAngle2, arcRadius / 2),
                 helper.LineTo(parallelAngle, arcRadius / 100),
                 helper.MoveTo(parallelAngle2, arcRadius / 100),
                 helper.LineTo(borderAngle4, arcRadius / 2),
                 helper.LineTo(parallelAngle2, arcRadius - (arcRadius / 100)),
                 helper.LineTo(borderAngle3, arcRadius / 2),
                 helper.LineTo(parallelAngle2, arcRadius / 100),
                 helper.Close()];

    linePathString = [helper.MoveTo(parallelAngle, arcRadius),
                 helper.LineTo(borderAngle2, arcRadius / 2),
                 helper.MoveTo(borderAngle3, arcRadius / 2),
                 helper.LineTo(parallelAngle2, arcRadius)];

    return {
        slicePathString: slicePathString,
        linePathString: linePathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePath.Tutorial.js

this.TutorialSliceCustomization = function () {

    var custom = new slicePathCustomization();
    custom.titleRadiusPercent = 0.6;
    custom.isMoveTo = false;
    custom.isLineTo = false;
    custom.isArcTo = false;
    custom.isArcBackTo = false;
    return custom;
};

this.TutorialSlice = function (helper, percent, custom) {

    if (custom === null) {
        custom = TutorialSliceCustomization();
    }

    helper.setBaseValue(percent, custom);

    slicePathString = [];

    slicePathString.push(helper.MoveToCenter());
    if (custom.isMoveTo === true) {
        slicePathString.push(helper.MoveTo(helper.middleAngle, helper.sliceRadius / 4));
    }
    if (custom.isLineTo) {
        slicePathString.push(helper.LineTo(helper.startAngle, helper.sliceRadius));
    }
    if (custom.isArcTo) {
        slicePathString.push(helper.ArcTo(helper.sliceRadius, helper.middleAngle, helper.sliceRadius));
    }
    if (custom.isArcBackTo) {
        slicePathString.push(helper.ArcBackTo(helper.sliceRadius, helper.endAngle, helper.sliceRadius));
    }
    slicePathString.push(helper.Close());

    linePathString = [helper.MoveToCenter(),
                 helper.LineTo(helper.startAngle, helper.sliceRadius),
                 helper.ArcTo(helper.sliceRadius, helper.middleAngle, helper.sliceRadius),
                 helper.ArcTo(helper.sliceRadius, helper.endAngle, helper.sliceRadius),
                 helper.Close()];

    return {
        slicePathString: slicePathString,
        linePathString: linePathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/slicePath/wheelnav.slicePathEnd.js

    return this;
};




///#source 1 1 /js/source/wheelnav.sliceTransform.js
/* ======================================================================================== */
/* Slice transform definitions                                                              */
/* ======================================================================================== */
/* ======================================================================================== */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/sliceTransform.html */
/* ======================================================================================== */


var sliceTransform = function () {

    this.startAngle = 0;
    this.startTheta = 0;
    this.middleTheta = 0;
    this.endTheta = 0;

    var setBaseValue = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {
        this.startAngle = baseAngle;
        this.startTheta = getTheta(startAngle);
        this.middleTheta = getTheta(startAngle + sliceAngle / 2);
        this.endTheta = getTheta(startAngle + sliceAngle);
    };

    var getTheta = function (angle) {
        return (angle % 360) * Math.PI / 180;
    };

    this.NullTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {
        return {
            sliceTransformString: "",
            lineTransformString: "",
            titleTransformString: ""
        };
    };

    this.MoveMiddleTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        setBaseValue(x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex);
        var sliceTransformString = "t" + (rOriginal / 10 * Math.cos(middleTheta)).toString() + "," + (rOriginal / 10 * Math.sin(middleTheta)).toString();

        var baseTheta;
        if (titleRotateAngle !== null) {
            baseTheta = getTheta(-titleRotateAngle);
        }
        else {
            var wheelBaseAngle = baseAngle - (itemIndex * sliceAngle);
            baseTheta = getTheta(wheelBaseAngle + sliceAngle / 2);
        }

        var titleTransformString = "s1,r0,t" + (rOriginal / 10 * Math.cos(baseTheta)).toString() + "," + (rOriginal / 10 * Math.sin(baseTheta)).toString();

        return {
            sliceTransformString: sliceTransformString,
            lineTransformString: sliceTransformString,
            titleTransformString: titleTransformString
        };
    };

    this.RotateTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        var sliceTransformString = "s1,r360";

        return {
            sliceTransformString: sliceTransformString,
            lineTransformString: sliceTransformString,
            titleTransformString: sliceTransformString
        };
    };

    this.RotateHalfTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        var sliceTransformString = "s1,r90";

        return {
            sliceTransformString: sliceTransformString,
            lineTransformString: sliceTransformString,
            titleTransformString: sliceTransformString
        };
    };

    this.RotateTitleTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        var titleTransformString = "s1,r360";

        return {
            sliceTransformString: "",
            lineTransformString: "",
            titleTransformString: titleTransformString
        };
    };

    this.ScaleTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        var sliceTransformString = "s1.2";

        return {
            sliceTransformString: sliceTransformString,
            lineTransformString: "",
            titleTransformString: sliceTransformString
        };
    };

    this.ScaleTitleTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        return {
            sliceTransformString: "",
            lineTransformString: "",
            titleTransformString: "s1.3"
        };
    };

    this.RotateScaleTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        var sliceTransformString = "r360,s1.3";

        return {
            sliceTransformString: sliceTransformString,
            lineTransformString: "",
            titleTransformString: sliceTransformString
        };
    };

    this.CustomTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        var sliceTransformString = custom.scaleString + "," + custom.rotateString;

        return {
            sliceTransformString: sliceTransformString,
            lineTransformString: sliceTransformString,
            titleTransformString: sliceTransformString
        };
    };

    this.CustomTitleTransform = function (x, y, rOriginal, baseAngle, sliceAngle, titleRotateAngle, itemIndex, custom) {

        var titleTransformString = custom.scaleString + "," + custom.rotateString;

        return {
            sliceTransformString: "",
            lineTransformString: "",
            titleTransformString: titleTransformString
        };
    };

    return this;
};

/* Custom properties
    - scaleString
    - rotateString
*/
var sliceTransformCustomization = function () {

    this.scaleString = "s1";
    this.rotateString = "r0";

    return this;
};




///#source 1 1 /js/source/spreader/wheelnav.spreader.js
///#source 1 1 /js/source/spreader/wheelnav.spreader.core.js
/* ======================================================================================= */
/* Spreader of wheel                                                                       */
/* ======================================================================================= */
/* ======================================================================================= */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/spreader.html      */
/* ======================================================================================= */

spreader = function (wheelnav) {

    this.wheelnav = wheelnav;
    if (this.wheelnav.spreaderEnable) {

        this.spreaderHelper = new pathHelper();
        this.spreaderHelper.centerX = this.wheelnav.centerX;
        this.spreaderHelper.centerY = this.wheelnav.centerY;
        this.spreaderHelper.navItemCount = this.wheelnav.navItemCount;
        this.spreaderHelper.navAngle = this.wheelnav.navAngle;
        this.spreaderHelper.wheelRadius = this.wheelnav.spreaderRadius;
        this.spreaderHelper.startAngle = this.wheelnav.spreaderStartAngle;
        this.spreaderHelper.sliceAngle = this.wheelnav.spreaderSliceAngle;

        var thisWheelNav = this.wheelnav;
        this.animateeffect = "bounce";
        this.animatetime = 1500;
        //Set animation from wheelnav
        if (this.wheelnav.animateeffect !== null) { this.animateeffect = this.wheelnav.animateeffect; }
        if (this.wheelnav.animatetime !== null) { this.animatetime = this.wheelnav.animatetime; }

        if (this.wheelnav.spreaderTitleFont !== null) { this.fontAttr = { font: this.wheelnav.spreaderTitleFont }; }
        else { this.fontAttr = { font: '100 32px Impact, Charcoal, sans-serif' }; }

        this.spreaderPathIn = this.wheelnav.spreaderPathFunction(this.spreaderHelper, this.wheelnav.spreaderInPercent, this.wheelnav.spreaderPathCustom);
        this.spreaderPathOut = this.wheelnav.spreaderPathFunction(this.spreaderHelper, this.wheelnav.spreaderOutPercent, this.wheelnav.spreaderPathCustom);

        var currentPath = this.spreaderPathOut;
        if (thisWheelNav.initPercent < thisWheelNav.maxPercent) {
            currentPath = this.spreaderPathIn;
        }

        this.spreaderPath = this.wheelnav.raphael.path(currentPath.spreaderPathString);
        this.spreaderPath.attr(thisWheelNav.spreaderPathAttr);
        this.spreaderPath.id = thisWheelNav.getSpreaderId();
        this.spreaderPath.node.id = this.spreaderPath.id;
        this.spreaderPath.click(function () {
            thisWheelNav.spreadWheel();
        });

        //Set titles
        this.inTitleWidth = this.wheelnav.spreaderInTitleWidth;
        this.inTitleHeight = this.wheelnav.spreaderInTitleHeight;
        this.outTitleWidth = this.wheelnav.spreaderOutTitleWidth;
        this.outTitleHeight = this.wheelnav.spreaderOutTitleHeight;

        if (this.inTitleWidth !== null && this.inTitleHeight === null) { this.inTitleHeight = this.inTitleWidth; }
        if (this.inTitleWidth === null && this.inTitleHeight !== null) { this.inTitleWidth = this.inTitleHeight; }
        if (this.outTitleWidth !== null && this.outTitleHeight === null) { this.outTitleHeight = this.outTitleWidth; }
        if (this.outTitleWidth === null && this.outTitleHeight !== null) { this.outTitleWidth = this.outTitleHeight; }

        if (wheelnavTitle().isImageTitle(this.wheelnav.spreaderOutTitle)) {
            // Image default value
            if (this.inTitleWidth === null) { this.inTitleWidth = 32; }
            if (this.inTitleHeight === null) { this.inTitleHeight = 32; }
            if (this.outTitleWidth === null) { this.outTitleWidth = 32; }
            if (this.outTitleHeight === null) { this.outTitleHeight = 32; }
        }

        if (wheelnavTitle().isPathTitle(this.wheelnav.spreaderInTitle)) {
            inTitle = new wheelnavTitle(this.wheelnav.spreaderInTitle, this.wheelnav.raphael.raphael);
        }
        else {
            inTitle = new wheelnavTitle(this.wheelnav.spreaderInTitle);
        }
        this.inTitleSizeTransform = inTitle.getTitleSizeTransform(this.inTitleWidth, this.inTitleHeight);
        this.inTitle = inTitle.getTitlePercentAttr(this.spreaderPathIn.titlePosX, this.spreaderPathIn.titlePosY, this.inTitleWidth, this.inTitleHeight);

        if (wheelnavTitle().isPathTitle(this.wheelnav.spreaderOutTitle)) {
            outTitle = new wheelnavTitle(this.wheelnav.spreaderOutTitle, this.wheelnav.raphael.raphael);
        }
        else {
            outTitle = new wheelnavTitle(this.wheelnav.spreaderOutTitle);
        }
        this.outTitleSizeTransform = outTitle.getTitleSizeTransform(this.outTitleWidth, this.outTitleHeight);
        this.outTitle = outTitle.getTitlePercentAttr(this.spreaderPathOut.titlePosX, this.spreaderPathOut.titlePosY, this.outTitleWidth, this.outTitleHeight);

        var currentTitle = this.outTitle;
        var currentTitleAttr = this.wheelnav.spreaderTitleOutAttr;
        var currentTitleWidth = this.outTitleWidth;
        var currentTitleHeight = this.outTitleHeight;
        var currentTitleSizeTransform = this.outTitleSizeTransform;
        if (thisWheelNav.initPercent < thisWheelNav.maxPercent) {
            currentTitle = this.inTitle;
            currentTitleAttr = this.wheelnav.spreaderTitleInAttr;
            currentTitleWidth = this.inTitleWidth;
            currentTitleHeight = this.inTitleHeight;
            currentTitleSizeTransform = this.inTitleSizeTransform;
        }

        if (wheelnavTitle().isPathTitle(this.wheelnav.spreaderOutTitle)) {
            this.spreaderTitle = thisWheelNav.raphael.path(currentTitle.path);
        }
        else if (wheelnavTitle().isImageTitle(this.wheelnav.spreaderOutTitle)) {
            this.spreaderTitle = this.wheelnav.raphael.image(currentTitle.src, currentPath.titlePosX - (currentTitleWidth / 2), currentPath.titlePosY - (currentTitleHeight / 2), currentTitleWidth, currentTitleHeight);
        }
        else {
            this.spreaderTitle = thisWheelNav.raphael.text(currentPath.titlePosX, currentPath.titlePosY, currentTitle.title);
        }
        
        this.spreaderTitle.attr(this.fontAttr);
        this.spreaderTitle.attr(currentTitleAttr);
        this.spreaderTitle.attr({ transform: currentTitleSizeTransform });
        this.spreaderTitle.id = thisWheelNav.getSpreaderTitleId();
        this.spreaderTitle.node.id = this.spreaderTitle.id;
        this.spreaderTitle.click(function () {
            thisWheelNav.spreadWheel();
        });

        this.setCurrentTransform();
    }

    return this;
};

spreader.prototype.setCurrentTransform = function (withoutAnimate) {
    if (this.wheelnav.spreaderEnable) {

        if (withoutAnimate === undefined ||
            withoutAnimate === false) {
            
            if (this.wheelnav.currentPercent > this.wheelnav.minPercent) {
                currentPath = this.spreaderPathOut.spreaderPathString;
            }
            else {
                currentPath = this.spreaderPathIn.spreaderPathString;
            }

            spreaderTransformAttr = {
                path: currentPath
            };

            //Animate spreader
            this.spreaderPath.animate(spreaderTransformAttr, this.animatetime, this.animateeffect);

            //titles
            var currentTitle;
            var titleTransformAttr;
            var titleSizeTransform;

            if (this.wheelnav.currentPercent === this.wheelnav.maxPercent) {
                currentTitle = this.outTitle;
                titleTransformAttr = this.wheelnav.spreaderTitleOutAttr;
                this.spreaderPath.attr(this.wheelnav.spreaderPathOutAttr);
                titleSizeTransform = this.outTitleSizeTransform;
            }
            else {
                currentTitle = this.inTitle;
                titleTransformAttr = this.wheelnav.spreaderTitleInAttr;
                this.spreaderPath.attr(this.wheelnav.spreaderPathInAttr);
                titleSizeTransform = this.inTitleSizeTransform;
            }

            if (wheelnavTitle().isPathTitle(currentTitle.title)) {
                titleTransformAttr.path = currentTitle.path;
                titleTransformAttr.transform = titleSizeTransform;
            }
            else if (wheelnavTitle().isImageTitle(currentTitle.title)) {
                titleTransformAttr.x = currentTitle.x;
                titleTransformAttr.y = currentTitle.y;
                titleTransformAttr.width = currentTitle.width;
                titleTransformAttr.height = currentTitle.height;
                this.spreaderTitle.attr({ src: currentTitle.src });
            }
            else {
                //Little hack for proper appearance of "-" sign
                offYOffset = 0;
                if (currentTitle.title === "-") { offYOffset = 3; };

                titleTransformAttr.x = currentTitle.x;
                titleTransformAttr.y = currentTitle.y - offYOffset;

                if (currentTitle.title !== null) {
                    this.spreaderTitle.attr({ text: currentTitle.title });
                }
            }

            //Animate title
            this.spreaderTitle.animate(titleTransformAttr, this.animatetime, this.animateeffect);
        }

        this.spreaderPath.toFront();
        this.spreaderTitle.toFront();
    }
};

///#source 1 1 /js/source/spreader/wheelnav.spreaderPathStart.js
/* ======================================================================================= */
/* Spreader path definitions.                                                              */
/* ======================================================================================= */

spreaderPath = function () {

    this.NullSpreader = function (helper, custom) {

        if (custom === null) {
            custom = new spreaderPathCustomization();
        }

        helper.setBaseValue(custom.spreaderPercent, custom);

        return {
            spreaderPathString: "",
            titlePosX: helper.titlePosX,
            titlePosY: helper.titlePosY
        };
    };



///#source 1 1 /js/source/spreader/wheelnav.spreaderPath.Pie.js

this.PieSpreaderCustomization = function () {

    var custom = new spreaderPathCustomization();
    custom.spreaderRadius = 25;
    custom.arcBaseRadiusPercent = 1;
    custom.arcRadiusPercent = 1;
    custom.startRadiusPercent = 0;
    return custom;
};

this.PieSpreader = function (helper, percent, custom) {

    if (custom === null) {
        custom = PieSpreaderCustomization();
    }

    helper.setBaseValue(custom.spreaderPercent * percent, custom);

    var arcBaseRadius = helper.sliceRadius * custom.arcBaseRadiusPercent;
    var arcRadius = helper.sliceRadius * custom.arcRadiusPercent;

    spreaderPathString = [];
    helper.StartSpreader(spreaderPathString, helper.startAngle, arcBaseRadius);
    spreaderPathString.push(helper.ArcTo(arcRadius, helper.middleAngle, arcBaseRadius));
    spreaderPathString.push(helper.ArcTo(arcRadius, helper.endAngle, arcBaseRadius));
    spreaderPathString.push(helper.Close());

    return {
        spreaderPathString: spreaderPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};

///#source 1 1 /js/source/spreader/wheelnav.spreaderPath.Star.js

this.StarSpreaderCustomization = function () {

    var custom = new spreaderPathCustomization();
    custom.minRadiusPercent = 0.5;

    return custom;
};

this.StarSpreader = function (helper, percent, custom) {

    if (custom === null) {
        custom = StarSpreaderCustomization();
    }

    helper.setBaseValue(custom.spreaderPercent * percent, custom);
    rbase = helper.wheelRadius * custom.spreaderPercent * custom.minRadiusPercent * percent;
    r = helper.sliceRadius;

    spreaderPathString = [];

    sliceAngle = helper.sliceAngle / helper.navItemCount;
    baseAngle = helper.navAngle;
    if (helper.endAngle - helper.startAngle < 360) { baseAngle = helper.startAngle; }

    helper.StartSpreader(spreaderPathString, baseAngle, r);

    for (var i = 0; i < helper.navItemCount; i++) {
        startAngle = i * sliceAngle + (baseAngle + sliceAngle / 2);
        middleAngle = startAngle + (sliceAngle / 2);
        endAngle = startAngle + sliceAngle;
        if (helper.endAngle - helper.startAngle < 360) {
            if (i === helper.navItemCount - 1) { endAngle = middleAngle; }
        }
        spreaderPathString.push(helper.LineTo(startAngle, rbase));
        spreaderPathString.push(helper.LineTo(middleAngle, r));
        spreaderPathString.push(helper.LineTo(endAngle, rbase));
    }

    spreaderPathString.push(helper.Close());

    return {
        spreaderPathString: spreaderPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/spreader/wheelnav.spreaderPath.AntiStar.js

this.AntiStarSpreaderCustomization = function () {

    var custom = new spreaderPathCustomization();
    custom.minRadiusPercent = 0.21;

    return custom;
};

this.AntiStarSpreader = function (helper, percent, custom) {

    if (custom === null) {
        custom = AntiStarSpreaderCustomization();
    }

    helper.setBaseValue(custom.spreaderPercent * percent, custom);
    rbase = helper.wheelRadius * custom.spreaderPercent * custom.minRadiusPercent * percent;
    r = helper.sliceRadius;

    spreaderPathString = [];

    sliceAngle = helper.sliceAngle / helper.navItemCount;
    baseAngle = helper.navAngle;
    if (helper.endAngle - helper.startAngle < 360) {
        baseAngle = helper.startAngle;
        helper.StartSpreader(spreaderPathString, baseAngle, rbase);
    }
    else {
        spreaderPathString.push(helper.MoveTo(helper.startAngle + (helper.navAngle + sliceAngle / 2), rbase));
    }

    for (var i = 0; i < helper.navItemCount; i++) {
        startAngle = i * sliceAngle + (baseAngle + sliceAngle / 2);
        middleAngle = startAngle + (sliceAngle / 2);
        endAngle = startAngle + sliceAngle;

        if (helper.endAngle - helper.startAngle < 360) {
            if (i === helper.navItemCount - 1) { endAngle = middleAngle; }
        }

        spreaderPathString.push(helper.LineTo(startAngle, r));
        spreaderPathString.push(helper.LineTo(middleAngle, rbase));
        spreaderPathString.push(helper.LineTo(endAngle, r));
    }

    spreaderPathString.push(helper.Close());

    return {
        spreaderPathString: spreaderPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/spreader/wheelnav.spreaderPath.Flower.js

this.FlowerSpreaderCustomization = function () {

    var custom = new spreaderPathCustomization();
    custom.minRadiusPercent = 0.63
    custom.menuRadius = 7;;

    return custom;
};

this.FlowerSpreader = function (helper, percent, custom) {

    if (custom === null) {
        custom = FlowerSpreaderCustomization();
    }

    helper.setBaseValue(custom.spreaderPercent * percent, custom);
    rbase = helper.wheelRadius * custom.spreaderPercent * custom.minRadiusPercent * percent;
    r = helper.sliceRadius;

    spreaderPathString = [];

    sliceAngle = helper.sliceAngle / helper.navItemCount;
    baseAngle = helper.navAngle;
    if (helper.endAngle - helper.startAngle < 360) {
        baseAngle = helper.startAngle;
        helper.StartSpreader(spreaderPathString, baseAngle, rbase);
    }
    else {
        spreaderPathString.push(helper.MoveTo(helper.startAngle + (helper.navAngle + sliceAngle / 2), rbase));
    }
    
    for (var i = 0; i < helper.navItemCount; i++) {
        startAngle = i * sliceAngle + (baseAngle + sliceAngle / 2);
        middleAngle = startAngle + (sliceAngle / 2);
        endAngle = startAngle + sliceAngle;

        if (helper.endAngle - helper.startAngle < 360) {
            if (i === 0) { spreaderPathString.push(helper.ArcTo(custom.menuRadius, startAngle, rbase)); }
            if (i === helper.navItemCount - 1) { endAngle = middleAngle; }
        }
        else {
            spreaderPathString.push(helper.LineTo(startAngle, rbase));
        }

        spreaderPathString.push(helper.ArcTo(custom.menuRadius, endAngle, rbase));
    }

    spreaderPathString.push(helper.Close());

    return {
        spreaderPathString: spreaderPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/spreader/wheelnav.spreaderPath.Holder.js

this.HolderSpreaderCustomization = function () {

    var custom = new spreaderPathCustomization();
    custom.minRadiusPercent = 0.5;
    custom.menuRadius = 37;

    return custom;
};

this.HolderSpreader = function (helper, percent, custom) {

    if (custom === null) {
        custom = HolderSpreaderCustomization();
    }

    helper.setBaseValue(custom.spreaderPercent * percent, custom);
    rbase = helper.wheelRadius * custom.spreaderPercent * custom.minRadiusPercent * percent;
    r = helper.sliceRadius;

    spreaderPathString = [];

    sliceAngle = helper.sliceAngle / helper.navItemCount;
    baseAngle = helper.navAngle;
    if (helper.endAngle - helper.startAngle < 360) {
        baseAngle = helper.startAngle;
        helper.StartSpreader(spreaderPathString, baseAngle, rbase);
    }
    else {
        spreaderPathString.push(helper.MoveTo(helper.startAngle + (helper.navAngle + sliceAngle / 2), rbase));
    }

    for (var i = 0; i < helper.navItemCount; i++) {
        startAngle = i * sliceAngle + (baseAngle + sliceAngle / 2);
        middleAngle = startAngle + (sliceAngle / 4);
        endAngle = startAngle + sliceAngle;

        if (helper.endAngle - helper.startAngle < 360) {
            if (i === helper.navItemCount - 1) { endAngle = middleAngle; }
        }
        else {
            spreaderPathString.push(helper.LineTo(startAngle, rbase));
        }

        spreaderPathString.push(helper.LineTo(startAngle, r));
        spreaderPathString.push(helper.ArcBackTo(custom.menuRadius, middleAngle, rbase));
        spreaderPathString.push(helper.ArcTo(custom.menuRadius, endAngle, r));
    }

    spreaderPathString.push(helper.Close());

    return {
        spreaderPathString: spreaderPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/spreader/wheelnav.spreaderPath.Line.js

this.LineSpreaderCustomization = function () {

    var custom = new spreaderPathCustomization();
    custom.minRadiusPercent = 0.5;

    return custom;
};

this.LineSpreader = function (helper, percent, custom) {

    if (custom === null) {
        custom = LineSpreaderCustomization();
    }

    helper.setBaseValue(custom.spreaderPercent * percent, custom);
    rbase = helper.wheelRadius * custom.spreaderPercent * custom.minRadiusPercent * percent;
    r = helper.sliceRadius;

    spreaderPathString = [];

    sliceAngle = helper.sliceAngle / helper.navItemCount;
    baseAngle = helper.navAngle;
    if (helper.endAngle - helper.startAngle < 360) { baseAngle = helper.startAngle; }

    spreaderPathString.push(helper.MoveTo(baseAngle + sliceAngle / 2, r));

    for (var i = 0; i < helper.navItemCount; i++) {
        startAngle = i * sliceAngle + (baseAngle + sliceAngle / 2);
        endAngle = startAngle + sliceAngle;
        if (helper.navItemCount === 2) {
            endAngle -= 90;
        }

        spreaderPathString.push(helper.LineTo(startAngle, r));
        spreaderPathString.push(helper.LineTo(endAngle, r));
    }

    spreaderPathString.push(helper.Close());

    return {
        spreaderPathString: spreaderPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/spreader/wheelnav.spreaderPathEnd.js

    return this;
};




///#source 1 1 /js/source/marker/wheelnav.marker.js
///#source 1 1 /js/source/marker/wheelnav.marker.core.js
/* ======================================================================================= */
/* Marker of wheel                                                                         */
/* ======================================================================================= */
/* ======================================================================================= */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/marker.html        */
/* ======================================================================================= */

marker = function (wheelnav) {

    this.wheelnav = wheelnav;
    if (this.wheelnav.markerEnable) {

        this.markerHelper = new pathHelper();
        this.markerHelper.centerX = this.wheelnav.centerX;
        this.markerHelper.centerY = this.wheelnav.centerY;
        this.markerHelper.navItemCount = this.wheelnav.navItemCount;
        this.markerHelper.navAngle = this.wheelnav.navAngle;
        this.markerHelper.wheelRadius = this.wheelnav.wheelRadius * this.wheelnav.maxPercent;
        this.markerHelper.sliceAngle = this.wheelnav.navItems[0].sliceAngle;
        this.markerHelper.startAngle = this.markerHelper.navAngle - (this.markerHelper.sliceAngle / 2);

        this.animateeffect = "bounce";
        this.animatetime = 1500;
        //Set animation from wheelnav
        if (this.wheelnav.animateeffect !== null) { this.animateeffect = this.wheelnav.animateeffect; }
        if (this.wheelnav.animatetime !== null) { this.animatetime = this.wheelnav.animatetime; }

        this.markerPathMin = this.wheelnav.markerPathFunction(this.markerHelper, this.wheelnav.minPercent, this.wheelnav.markerPathCustom);
        this.markerPathMax = this.wheelnav.markerPathFunction(this.markerHelper, this.wheelnav.maxPercent, this.wheelnav.markerPathCustom);
        this.marker = this.wheelnav.raphael.path(this.markerPathMax.markerPathString);
        this.marker.attr(this.wheelnav.markerAttr);
        this.marker.id = this.wheelnav.getMarkerId();
        this.marker.node.id = this.marker.id;
    }

    return this;
};

marker.prototype.setCurrentTransform = function (navAngle) {

    if (this.wheelnav.markerEnable) {
        var currentPath = "";

        if (this.wheelnav.currentPercent === this.wheelnav.maxPercent) {
            currentPath = this.markerPathMax.markerPathString;
        }
        else {
            currentPath = this.markerPathMin.markerPathString;
        }

        if (navAngle !== undefined) {
            var rotationAngle = navAngle - this.markerHelper.navAngle;

            markerTransformAttr = {
                transform: "r," + (rotationAngle).toString() + "," + this.wheelnav.centerX + "," + this.wheelnav.centerY,
                path: currentPath
            };
        }
        else {
            markerTransformAttr = {
                path: currentPath
            };
        }

        //Animate marker
        this.marker.animate(markerTransformAttr, this.animatetime, this.animateeffect);
        this.marker.toFront();
    }
};



///#source 1 1 /js/source/marker/wheelnav.markerPathStart.js
/* ======================================================================================= */
/* Marker path definitions.                                                                */
/* ======================================================================================= */

markerPath = function () {

    this.NullMarker = function (helper, custom) {

        if (custom === null) {
            custom = new markerPathCustomization();
        }

        helper.setBaseValue(custom);

        return {
            markerPathString: "",
            titlePosX: helper.titlePosX,
            titlePosY: helper.titlePosY
        };
    };



///#source 1 1 /js/source/marker/wheelnav.markerPath.Triangle.js

this.TriangleMarkerCustomization = function () {

    var custom = new markerPathCustomization();
    custom.arcBaseRadiusPercent = 1.09;
    custom.arcRadiusPercent = 1.2;
    custom.startRadiusPercent = 0;
    return custom;
};

this.TriangleMarker = function (helper, percent, custom) {

    if (custom === null) {
        custom = TriangleMarkerCustomization();
    }

    helper.setBaseValue(custom.markerPercent * percent, custom);

    var arcBaseRadius = helper.sliceRadius * custom.arcBaseRadiusPercent;
    var arcRadius = helper.sliceRadius * custom.arcRadiusPercent;
    var startAngle = helper.startAngle + helper.sliceAngle * 0.46;
    var endAngle = helper.startAngle + helper.sliceAngle * 0.54;

    markerPathString = [helper.MoveTo(helper.navAngle, arcBaseRadius),
                 helper.LineTo(startAngle, arcRadius),
                 helper.LineTo(endAngle, arcRadius),
                 helper.Close()];
    
    return {
        markerPathString: markerPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/marker/wheelnav.markerPath.PieLine.js

this.PieLineMarkerCustomization = function () {

    var custom = new markerPathCustomization();
    custom.arcBaseRadiusPercent = 1;
    custom.arcRadiusPercent = 1;
    custom.startRadiusPercent = 0;
    custom.sliceAngle = null;
    return custom;
};

this.PieLineMarker = function (helper, percent, custom) {

    if (custom === null) {
        custom = PieLineMarkerCustomization();
    }

    helper.setBaseValue(custom.markerPercent * percent, custom);

    var arcBaseRadius = helper.sliceRadius * custom.arcBaseRadiusPercent;
    var arcRadius = helper.sliceRadius * custom.arcRadiusPercent;

    if (custom.sliceAngle !== null) {
        helper.startAngle = helper.navAngle - (custom.sliceAngle / 2);
        helper.endAngle = helper.navAngle + (custom.sliceAngle / 2);
    }

    markerPathString = [helper.MoveTo(helper.startAngle, arcBaseRadius),
                 helper.ArcTo(arcRadius, helper.endAngle, arcBaseRadius),
                 helper.ArcBackTo(arcRadius, helper.startAngle, arcBaseRadius),
                 helper.Close()];

    return {
        markerPathString: markerPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};




///#source 1 1 /js/source/marker/wheelnav.markerPath.Menu.js

this.MenuMarkerCustomization = function () {

    var custom = new markerPathCustomization();
    custom.menuRadius = 40;
    custom.titleRadiusPercent = 0.63;
    custom.lineBaseRadiusPercent = 0;
    return custom;
};

this.MenuMarker = function (helper, percent, custom) {

    if (custom === null) {
        custom = MenuMarkerCustomization();
    }

    helper.setBaseValue(custom.markerPercent * percent, custom);

    x = helper.centerX;
    y = helper.centerY;

    helper.titleRadius = helper.wheelRadius * custom.titleRadiusPercent * percent;
    helper.setTitlePos();

    var menuRadius = custom.menuRadius * percent;
    if (percent <= 0.05) { menuRadius = 11; }

    middleTheta = helper.middleTheta;

    markerPathString = [["M", helper.titlePosX - (menuRadius * Math.cos(middleTheta)), helper.titlePosY - (menuRadius * Math.sin(middleTheta))],
                ["A", menuRadius, menuRadius, 0, 0, 1, helper.titlePosX + (menuRadius * Math.cos(middleTheta)), helper.titlePosY + (menuRadius * Math.sin(middleTheta))],
                ["A", menuRadius, menuRadius, 0, 0, 1, helper.titlePosX - (menuRadius * Math.cos(middleTheta)), helper.titlePosY - (menuRadius * Math.sin(middleTheta))],
                ["z"]];
    
    return {
        markerPathString: markerPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/marker/wheelnav.markerPath.Line.js

this.LineMarkerCustomization = function () {

    var custom = new markerPathCustomization();
    custom.arcBaseRadiusPercent = 1.05;
    custom.arcRadiusPercent = 1.2;
    custom.startRadiusPercent = 0;
    return custom;
};

this.LineMarker = function (helper, percent, custom) {

    if (custom === null) {
        custom = LineMarkerCustomization();
    }

    helper.setBaseValue(custom.markerPercent * percent, custom);

    var arcBaseRadius = helper.sliceRadius * custom.arcBaseRadiusPercent;
    var arcRadius = helper.sliceRadius * custom.arcRadiusPercent;

    markerPathString = [helper.MoveTo(helper.navAngle, arcBaseRadius),
                 helper.LineTo(helper.navAngle, arcRadius),
                 helper.Close()];
    
    return {
        markerPathString: markerPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/marker/wheelnav.markerPath.Drop.js

this.DropMarkerCustomization = function () {

    var custom = new markerPathCustomization();
    custom.dropBaseRadiusPercent = 0;
    custom.dropRadiusPercent = 0.15;
    return custom;
};

this.DropMarker = function (helper, percent, custom) {

    if (custom === null) {
        custom = DropMarkerCustomization();
    }

    helper.setBaseValue(custom.markerPercent * percent, custom);

    var arcBaseRadius = helper.sliceRadius * custom.dropBaseRadiusPercent;
    var startAngle = helper.startAngle + helper.sliceAngle * 0.2;
    var startAngle2 = helper.startAngle;
    var endAngle = helper.startAngle + helper.sliceAngle * 0.8;
    var endAngle2 = helper.startAngle + helper.sliceAngle;
    var dropRadius = helper.sliceRadius * custom.dropRadiusPercent;

    markerPathString = [helper.MoveTo(0, dropRadius),
        helper.ArcTo(dropRadius, 180, dropRadius),
        helper.ArcTo(dropRadius, 360, dropRadius),
        helper.MoveTo(helper.navAngle, arcBaseRadius),
                helper.LineTo(startAngle, dropRadius),
                 helper.LineTo(startAngle2, dropRadius),
                 helper.LineTo(helper.navAngle, dropRadius * 1.6),
                helper.LineTo(endAngle2, dropRadius),
                 helper.LineTo(endAngle, dropRadius),
                 helper.Close()];
    return {
        markerPathString: markerPathString,
        titlePosX: helper.titlePosX,
        titlePosY: helper.titlePosY
    };
};


///#source 1 1 /js/source/marker/wheelnav.markerPathEnd.js

    return this;
};




///#source 1 1 /js/source/wheelnav.colorPalettes.js
/* ======================================================================================== */
/* Color palettes for slices from http://www.colourlovers.com                               */
/* ======================================================================================== */
/* ======================================================================================== */
/* Documentation: http://wheelnavjs.softwaretailoring.net/documentation/colorPalettes.html  */
/* ======================================================================================== */

var colorpalette = {
    defaultpalette: new Array("#2D9E46", "#F5BE41", "#F77604", "#D63C22", "#006BA6", "#92ADAF"),
    purple: new Array("#4F346B", "#623491", "#9657D6", "#AD74E7", "#CBA3F3"),
    greenred: new Array("#17B92A", "#FF3D00", "#17B92A", "#FF3D00"),
    greensilver: new Array("#1F700A", "#79CC3C", "#D4E178", "#E6D5C3", "#AC875D"),
    oceanfive: new Array("#00A0B0", "#6A4A3C", "#CC333F", "#EB6841", "#EDC951"),
    garden: new Array("#648A4F", "#2B2B29", "#DF6126", "#FFA337", "#F57C85"),
    gamebookers: new Array("#FF9900", "#DCDCDC", "#BCBCBC", "#3299BB", "#727272"),
    parrot: new Array("#D80351", "#F5D908", "#00A3EE", "#929292", "#3F3F3F"),
    pisycholand: new Array("#FF1919", "#FF5E19", "#FF9F19", "#E4FF19", "#29FF19"),
    makeLOVEnotWAR: new Array("#2C0EF0", "#B300FF", "#6751F0", "#FF006F", "#8119FF"),
    theworldismine: new Array("#F21D1D", "#FF2167", "#B521FF", "#7E2AA8", "#000000"),
    fractalloveone: new Array("#002EFF", "#00FFF7", "#00FF62", "#FFAA00", "#FFF700"),
    fractallovetwo: new Array("#FF9500", "#FF0000", "#FF00F3", "#AA00FF", "#002EFF"),
    fractallove: new Array("#002EFF", "#00FFF7", "#00FF62", "#FFAA00", "#F5D908", "#FF0000", "#FF00F3", "#AA00FF"),
    sprinkles: new Array("#272523", "#FFACAC", "#FFD700", "#00590C", "#08006D"),
    goldenyellow: new Array("#D8B597", "#8C4006", "#B6690F", "#E3C57F", "#FFEDBE"),
    hotaru: new Array("#364C4A", "#497C7F", "#92C5C0", "#858168", "#CCBCA5")
};

},{}],15:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;

LX.App = class App extends LV.EventEmitter {
    

    constructor(obj) {
        super();
        this.name = obj.name;
        this.css_id = `lx-app-${this.name}-css`;
        this.children = obj.children;
        this.pages = [];
        this.data = {};
        this.load();
        this._opened = false;
    }



    createPageComponent(page_id, body, logic) {
        let cmp = {
            template: body
        };

        let component_id = ["lx", "app", this.name, page_id].join("-");

        let self = this;
        
        let page = {
            "id": page_id,
            "component_id": component_id,
            "app": this
        }
        if (logic) {
             if (logic.data) {
                // keep multiple components in same app together with same data
                self.data = logic.data;
                cmp.data = function() {
                    return self.data;
                }
            }

            if (logic.computed) {
                cmp.computed = logic.computed;
            }
            if (logic.methods) {
                cmp.methods = {};
                for (var idx in logic.methods) {
                    cmp.methods[idx] = logic.methods[idx];
                }
            }
            if (logic.mounted) {
                cmp.mounted = logic.mounted;
            }
        }


        page.component = LV.Vue.component(component_id, cmp);
        
        self.pages.push(page)


        self.emit("load", page);

        if (logic) {
            if (logic.callback) {
                logic.callback.call(page);
            }
            if (logic.open) {
                self.open(component_id);
            }            
        }

    }

    get log_prefix() {
        return `[a:lx-app-${this.name}]`.padEnd(20, " ");
    }

    /**
    * Displays Vue component on the screen
    */
    open(component_id) {
        if (this._opened) {
            // skip already opened app
            return;
        }
        this._opened = true;
        //console.log(`${this.log_prefix} open`);
        this.emit("open", component_id);
    }

    /**
    * Hides Vue component but keeps style injection for other open components
    */
    close(component_id) {
        this._opened = false;
        //console.log(`${this.log_prefix} close`);
        this.emit("close", component_id);
    }

    /**
    * Checks whether this app is open
    */
    isOpen() {
        return this._opened;
    }


    /**
    * Inject CSS into DOM, allowing apps to redefine global styles if needed
    */
    addCSS(css) {
        let head = document.getElementsByTagName('head')[0];
        let s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        s.id = this.css_id
        if (s.styleSheet) {   // IE
            s.styleSheet.cssText = css;
        } else {                // the world
            s.appendChild(document.createTextNode(css));
        }
        head.appendChild(s);
    }
    
    removeCSS() {
        let s = document.getElementById(this.css_id);
        s.parentNode.removeChild(s);
    }

    /**
    * Load a single HTML page into DOM using Vue
    */
    loadOnePage(filename, page_id, logic) {
        fetch(filename)
            .then((result) => {
                return result.text();
            })
            .then((html) => {
                // rewrite src attribute to point to proper web directory
                let image_re = /(<img[\S\s]*?src=")([\S\s]*?)("[\S\s]*?>)/ig;
                return html.replace(image_re, "$1"+ `/-/${this.name}/` + "$2$3");
            })
            .then((body) => {
                return this.createPageComponent(page_id, body, logic);
            });
    }

    /**
    * Load all HTML pages for app into DOM using Vue
    */
    loadAllPages(logic) {
        let files = {};
        this.children.forEach((child) => {
            // only load html pages
            if (child.extension != ".html") return;
            let filename = ["/-", this.name, child.name].join("/");
            let page_id = child.name.split(".")[0];
            this.loadOnePage(filename, page_id, logic);
        });    
    }
    
    /**
    * Use fetch to retrieve any sort of file from app package
    */
    loadOneFile(name,json) {
        return new Promise((resolve, reject) => {
            let exists = false;

            this.children.forEach((child) => {
                if (child.name !=  name) return;
                exists = true;
            });   
            
            if (!exists) return resolve();

            let filename = ["/-", this.name,  name].join("/");  
            return fetch(filename)
                .then((result) => {
                    if (result.status == 200) {
                        if (json) {
                            return result.json();
                        }
                        else {
                            return result.text();
                        }
                    }
                })
                .then((contents) => {
                    resolve(contents);
                })
                .catch((e) => {
                    console.warn(`${this.log_prefix} Could not load file for ${this.name}: ${name}`, e);
                })
        });
    }

    load() {
        let logic = {};
        let accepted = ["data", "computed", "methods", "open", "callback", "mounted"];
        this.loadOneFile("app.js")
            .then((result) => {
                if (!result) {
                    return console.warn(`${this.log_prefix} Could not load app.js`);
                }
                result = eval(result);
                accepted.forEach((key) => {
                    if (result.hasOwnProperty(key)) {
                        logic[key] = result[key];
                    }
                });
            })
            .then(() => {
                return this.loadOneFile("app.css")
                    .then((css)  => {
                        if (css) {
                            this.addCSS(css);
                        }
                    });
            })
            .then(() => {
                this.loadAllPages(logic)
            });
    }

    /**
    * Removes all Vue components and related code and style injection
    */
    unload() {
        this.pages.forEach((page) => {
            this.close(page.component_id);
        });
        setTimeout(() => {
            // allows vue to clear DOM to avoid flashes of content
            this.removeCSS();
        }, 300);
    }


}

},{}],16:[function(require,module,exports){
"use strict";

const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.Director = class Director extends LV.EventEmitter {

    constructor() {
        super();
        this.ready = false;
        this.apps = {};
        this.db = null;
        this.view = new LX.View();
        this.atlas = LX.Atlas;
        this.menu = null;
        this.user = null;
    }

    start() {
        this.db = new LX.SharedDatabase(document.baseURI + "gun");

        // require database be ready before apps start
        this.db.on("load", () => {
            
            // get or create a unique profile for this user / device
            this.user = new LX.User(this.db);

            this.user.on("auth", function() {
                this.view.data.user.username = this.user.username;
                // load in dynamic apps
                fetch("/api/apps")
                    .then((result) => {
                        if (result.status == 200) {
                            return result.json()
                        }
                        else {
                            reject(result);
                        }
                    })
                    .then((json) => {
                        json.forEach(this.createApp.bind(this));
                    })
                    .catch((err) => {
                        console.warn("[Direct] No available apps to work with");
                    });
                this.emit("start");

             }.bind(this));

            this.user.authOrRegister();
        });        


    }



    //------------------------------------------------------------------------
    createApp(app_files) {
        if (!app_files.children) {
            console.warn("[Direct] Ignoring app directory with no children:", app_files.name);
            return;
        }
        let obj = new LX.App(app_files);

        this.apps[obj.name] = obj;
        obj.on("load", (page) => {
            //console.log("[Direct] App loads page: ", page.component_id );
        });

        obj.on("open", (component_id) => {
            //console.log("[Direct] App opens component:", component_id);
            this.view.data.app_components.push(component_id);
        });

        obj.on("close", (component_id) => {
            //console.log("[Direct] App closes component:", component_id);
            this.view.data.app_components.remove(component_id);
        });
    }



    //------------------------------------------------------------------------
    closeOneApp(app_id) {
        if (this.apps.hasOwnProperty(app_id)) {
            this.apps[app_id].unload();
        }
    }
    
    openOneApp(app_id) {
        if (this.apps.hasOwnProperty(app_id)) {
            this.apps[app_id].pages.forEach((page) => {
                this.apps[app_id].open(`lx-app-${app_id}-${page.id}`);
            });
        }
    }
}
},{}],17:[function(require,module,exports){
"use strict";
const LX = window.LX || {}; if (!window.LX) window.LX = LX;


LX.PieMenu = class PieMenu extends LV.EventEmitter {

    constructor() {
        super();
        this._locked = false;
        this.wheel = null;
        this.element = document.getElementById("pie-menu");
        this.mask_element = document.getElementById("pie-menu-mask");
        this.mask_element.onclick = () => {
            this.close();
        };
    }    

    /**
    * Display menu on canvas on top of a mask
    */
    open(items, pos) {
        if (!items || !items.length) {
            return console.log("[PieMenu] Refusing to show menu with zero items");
        }

        if (this._locked) {
            return console.log("[PieMenu] Refusing to open while menu is in locked state");
        }


        // create icons for menu
        let final_items = [];

        items.forEach((item) => {
            if (item.icon) {
                let icon = "imgsrc:/_/@fortawesome/fontawesome-free/svgs/solid/" + item.icon + ".svg";
                final_items.push(icon);                
            }
            else if (item.label) {
                final_items.push(item.label);
            }
        });

        // create wheel menu
        this.wheel = new wheelnav("pie-menu");
        this.wheel.titleWidth = 22;
        this.wheel.navAngle = 30;
        this.wheel.wheelRadius = 100;
        this.wheel.selectedNavItemIndex = null;;
        this.wheel.createWheel(final_items);

        // define custom methods to handle menu selection
        this.wheel.navItems.forEach((item) => {
        
            item.navigateFunction = () => {
                let matched_item = items[item.itemIndex];

                let event_data = null;
                if(matched_item.method) {
                    event_data = matched_item.method();
                }
                if (matched_item.event) {
                    this.emit(matched_item.event, event_data);
                }
                this.close.call(this);
            }
        });

        // create mask for behind the menu
        this.mask_element.classList = "active";

        // set x/y location for pie menu
        if(pos.x && pos.y) {
            let svg = this.element.childNodes[0];
            let width = svg.width.baseVal.valueAsString;
            let height = svg.height.baseVal.valueAsString;
            this.element.style.left = (pos.x - width/2)+"px";
            this.element.style.top = (pos.y - height/2)+"px";
        }

        this.element.classList = "active";
        this.emit("open");
    }
    
    /**
    * Hide menu from canvas and remove mask
    */
    close() {
        this.element.classList.remove("active")
        this.mask_element.classList.remove("active");
        this.emit("close");
    }


    lock() {
        this._locked = true;
        this.emit("lock");
    }

    unlock() {
        this._locked = false;
        this.emit("unlock");
    }

    isLocked() {
        return this._locked;
    }
}

},{}],18:[function(require,module,exports){
LX.View = class View extends LV.EventEmitter {

    constructor() {
        super();
        // setup vue object
        LV.Vue.filter('pluralize', (word, amount) => amount != 1 ? `${word}s` : word)
        this.vue = new LV.Vue({
            el: '#app-container',
            data: {
                app_components: [],
                user: {
                    username: null
                },
                map: false
            }
        });
        this.data = this.vue.$data;
        this.menu = new LX.PieMenu();
    }
}
},{}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
"use strict";

const LV = window.LV || {}; if (!window.LV) window.LV = LV;

LV.Vue = require("vue");
LV.Wheelnav = require("wheelnav");
},{"vue":13,"wheelnav":14}],21:[function(require,module,exports){
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
},{"gun":1,"sea":2,"shortid":4}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"base64-js":22,"ieee754":24}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],26:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":25,"timers":26}]},{},[20,21,19,16,15,18,17]);
