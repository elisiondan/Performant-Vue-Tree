(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{376:function(e,t,a){"use strict";a.r(t);var s=a(41),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"tree-traversal"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tree-traversal"}},[e._v("#")]),e._v(" Tree traversal")]),e._v(" "),a("p",[e._v("As outlined in "),a("a",{attrs:{href:"/advanced/node-evaluators"}},[e._v("node evaluators")]),e._v(" section, you can register custom functions that are evaluated during tree traversal. There are some events that trigger the traversal internally, for instance when you search for a term when enabled in "),a("a",{attrs:{href:"/guide/options"}},[e._v("options")]),e._v(".")]),e._v(" "),a("p",[e._v("However, you can trigger the traversal by yourself. For this you'd use "),a("code",[e._v("treeObserver")]),e._v(" instance that is installed to the Vue's prototype.")]),e._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// within any method in the script part of your component")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("$treeObserver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("notify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("...")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n")])])]),a("p",[e._v("The "),a("code",[e._v("treeObserver")]),e._v(" provides following methods")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("subscribe (id: string | number, callback: (payload: any) => void)")])])]),e._v(" "),a("p",[e._v("Subscribe to events emitted by the observer and perform an action")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("notify(payload: any)")])])]),e._v(" "),a("p",[e._v("Fire an event and pass the payload to all subscribers.")]),e._v(" "),a("p",[e._v("As you can see, it follows a standard observer pattern. So in theory, you can subscribe your custom functions as well. This can be useful when you need to log some events or store them in Vuex for instance.")]),e._v(" "),a("p",[e._v("However, it's likely you'll mostly need "),a("code",[e._v("notify")]),e._v(" method only. The tree component is subscribed to the "),a("em",[e._v("treeObserver")]),e._v(" instance and with each event the whole tree is traversed, modified and then re-rendered. The traversal is performed in the background thread with usage of web workers, so the operation is very efficient. During the traversal, each node is handled by all the "),a("a",{attrs:{href:"/advanced/node-evaluators"}},[e._v("node evaluators")]),e._v(" available.")]),e._v(" "),a("h2",{attrs:{id:"example"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example"}},[e._v("#")]),e._v(" Example")]),e._v(" "),a("p",[e._v("To put it to work, we simply need to trigger an event and define appropriate payload argument so we target the right node evaluators.")]),e._v(" "),a("div",{staticClass:"language-javascript extra-class"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[e._v("methods"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("expandAll")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("$treeObserver"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("notify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n            expandAll"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("...")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])])]),a("p",[e._v("We defined an "),a("code",[e._v("expandAllEvaluator")]),e._v(" in "),a("a",{attrs:{href:"/advanced/node-evaluators"}},[e._v("node evaluators")]),e._v(" section which expects "),a("em",[e._v("expandAll")]),e._v(" attribute. You can use this "),a("code",[e._v("expandAll")]),e._v(" method anywhere in you app. When triggered, each node that contains children will be expanded.")])])}),[],!1,null,null,null);t.default=n.exports}}]);