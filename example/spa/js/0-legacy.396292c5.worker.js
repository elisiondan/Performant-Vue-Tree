(function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="/",r(r.s="d071")})({"5bc3":function(e,n){function r(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function t(e,n,t){return n&&r(e.prototype,n),t&&r(e,t),e}e.exports=t},"970b":function(e,n){function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}e.exports=r},a692:function(e,n,r){"use strict";function t(e){return!!e&&("object"===typeof e||"function"===typeof e)&&"function"===typeof e.then}function o(e){function n(e,n,r,t){function o(n){"function"!==typeof self.postMessage?e.ports[0].postMessage(n):self.postMessage(n)}r?("undefined"!==typeof console&&"error"in console&&console.error("Worker caught an error:",r),o([n,{message:r.message}])):o([n,null,t])}function r(e,n){try{return{res:e(n)}}catch(r){return{err:r}}}function o(e,o,u,i){var a=r(o,i);a.err?n(e,u,a.err):t(a.res)?a.res.then((function(r){n(e,u,null,r)}),(function(r){n(e,u,r)})):n(e,u,null,a.res)}function u(r){var t=r.data;if(Array.isArray(t)&&2===t.length){var u=t[0],i=t[1];"function"!==typeof e?n(r,u,new Error("Please pass a function into register().")):o(r,e,u,i)}}self.addEventListener("message",u)}e.exports=o},d071:function(e,n,r){"use strict";r.r(n);var t=r("a692"),o=r.n(t),u=r("970b"),i=r.n(u),a=r("5bc3"),f=r.n(a),s=function(){function e(){i()(this,e)}return f()(e,[{key:"traverseAllTrees",value:function(e,n,r,t){var o=this;return e.forEach((function(e){o.traverseTree(e,n,r,t)})),e}},{key:"traverseTree",value:function(e,n,r,t){var o=this;t&&n.forEach((function(n){n.handleNode(e,r)})),e.children.forEach((function(e){return o.traverseTree(e,n,r,t)})),t||n.forEach((function(n){n.handleNode(e,r)}))}}]),e}(),c=r("df27"),l=r.n(c),p=new s;n["default"]=o()((function(e){var n=e.trees,r=e.topToBottom||!1,t=(e.nodeEvaluators||[]).map((function(e){return l.a.parse(e)})),o=e.nodeEvaluatorsData,u=p.traverseAllTrees(n,t,o,r);return u}))},df27:function(module,exports,__webpack_require__){(function(exports){"use strict";exports.stringify=function(e){return JSON.stringify(e,(function(e,n){var r;return n instanceof Function||"function"==typeof n?(r=n.toString(),r.length<8||"function"!==r.substring(0,8)?"_NuFrRa_"+r:r):n instanceof RegExp?"_PxEgEr_"+n:n}))},exports.parse=function(str,date2obj){var iso8061=!!date2obj&&/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;return JSON.parse(str,(function(key,value){var prefix;return"string"!=typeof value||value.length<8?value:(prefix=value.substring(0,8),iso8061&&value.match(iso8061)?new Date(value):"function"===prefix?eval("("+value+")"):"_PxEgEr_"===prefix||"_NuFrRa_"===prefix?eval(value.slice(8)):value)}))},exports.clone=function(e,n){return exports.parse(exports.stringify(e),n)}})(exports)}});
//# sourceMappingURL=0-legacy.396292c5.worker.js.map