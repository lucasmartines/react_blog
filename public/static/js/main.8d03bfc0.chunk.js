(this.webpackJsonpmy_blog=this.webpackJsonpmy_blog||[]).push([[0],{20:function(e,t,n){e.exports=n(32)},25:function(e,t,n){},26:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var a=n(0),l=n.n(a),o=n(17),c=n.n(o),r=n(11),i=n(1),u=(n(25),n(9)),m=(n(26),function(e){var t=e.posts;console.log("arr:",t);return l.a.createElement("div",null,l.a.createElement("h2",null," Ultimos Posts "),l.a.createElement("ul",{className:"flex-column"},t&&(null===t||void 0===t?void 0:t.map((function(e){var t=e.title,n=e.body;return l.a.createElement("li",{key:t},l.a.createElement("img",{className:"float-left",src:"https://via.placeholder.com/150"}),l.a.createElement("h2",null,t),l.a.createElement("p",null," ",n))})))))});var s=function(e){var t=Object(a.useState)([]),n=Object(u.a)(t,2),o=n[0],c=n[1],r=Object(i.f)();return Object(a.useEffect)((function(){fetch("https://jsonplaceholder.typicode.com/posts").then((function(e){return e.json()})).then((function(e){c(e.splice(0,10))})),console.log(r)}),[r]),l.a.createElement("div",{className:"FrontPage"},l.a.createElement(m,{posts:o}))},f=n(8),E=n(14),d=n(19);c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(r.a,null,l.a.createElement(i.c,null,l.a.createElement(i.a,{path:"/",exact:!0,component:s}),l.a.createElement(i.a,{path:"/admin",exact:!0,component:function(e){Object(d.a)(e);var t=Object(a.useState)({titulo:"",conteudo:""}),n=Object(u.a)(t,2),o=n[0],c=n[1],r=function(e){var t=e.target,n=t.name,a=t.value;c(Object(E.a)(Object(E.a)({},o),{},Object(f.a)({},n,a)))},i=function(e){e.preventDefault(),console.log("ff::",e.target.file.files[0]),o.titulo.length&&o.conteudo.length&&console.log(o)};return l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",null," Admin Blog "),l.a.createElement("div",{className:"admin-page"},l.a.createElement("form",{onSubmit:i},l.a.createElement("label",{for:"titulo"},"Nome"),l.a.createElement("input",{name:"titulo",value:o.titulo,onChange:r}),l.a.createElement("label",{for:"file"},"File"),l.a.createElement("input",{name:"file",type:"file"}),l.a.createElement("label",{for:"conteudo"},"Conteudo"),l.a.createElement("textarea",{rows:10,cols:60,name:"conteudo",value:o.conteudo,onChange:r}),l.a.createElement("button",{onClick:function(){return i}}," Inserir/Atualizar Post")),l.a.createElement("div",null,l.a.createElement("ul",null,l.a.createElement("li",null," Blog 1 "),l.a.createElement("li",null," Blog 2 "),l.a.createElement("li",null," Blog 3 ")))))}})))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.8d03bfc0.chunk.js.map