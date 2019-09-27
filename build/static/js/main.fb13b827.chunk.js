(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(39)},20:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(13),c=n.n(l),u=(n(20),n(14)),o=n(2),i=function(e){return r.a.createElement("div",{className:"filter"},"Filter shown with",r.a.createElement("input",{value:e.filteredName,onChange:e.handleFilter}))},m=function(e){return r.a.createElement("div",null,r.a.createElement("form",{className:"form",onSubmit:e.handleSubmit,onReset:e.resetForm},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("label",null,"Name"),r.a.createElement("input",{className:"input",value:e.newName,onChange:e.handleNameChange})),r.a.createElement("div",null,r.a.createElement("label",null,"Number"),r.a.createElement("input",{className:"input",value:e.newNumber,onChange:e.handleNumberChange}))),r.a.createElement("div",null,r.a.createElement("button",{className:"add",type:"submit"},"add"),r.a.createElement("button",{className:"clear",type:"reset"},"clear"))))},s=function(e){var t=e.persons.filter(function(t){return 0===e.filteredName.length||t.name.toLowerCase().startsWith(e.filteredName.toLowerCase())}).map(function(t){return r.a.createElement("div",{key:t.id,className:"contact"},r.a.createElement("span",null,t.name," ",t.number,r.a.createElement("button",{className:"button",value:t.name,onClick:function(){return e.deleteContact(t.id,t.name)}},r.a.createElement("label",null,"delete"))))});return r.a.createElement("div",null,t)},f=n(3),d=n.n(f),b="http://localhost:3001/persons",h=function(){return d.a.get(b).then(function(e){return e.data})},p=function(e){return d.a.post(b,e).then(function(e){return e.data})},E=function(e){return d.a.delete("".concat(b,"/").concat(e)).then(function(e){return e.data})},v=function(e,t){return d.a.put("".concat(b,"/").concat(e),t).then(function(e){return e.data})},O=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"notification"},r.a.createElement("b",null,t))},g=function(e){var t=e.errorMessage;return null===t?null:r.a.createElement("div",{className:"error"},r.a.createElement("b",null,t))};n(38);function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}var N=function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],l=t[1],c=Object(a.useState)(""),f=Object(o.a)(c,2),d=f[0],b=f[1],N=Object(a.useState)(""),j=Object(o.a)(N,2),y=j[0],C=j[1],S=Object(a.useState)(""),k=Object(o.a)(S,2),P=k[0],D=k[1],F=Object(a.useState)(null),T=Object(o.a)(F,2),A=T[0],J=T[1],L=Object(a.useState)(null),M=Object(o.a)(L,2),x=M[0],B=M[1];Object(a.useEffect)(function(){h().then(function(e){l(e)})},[]);return r.a.createElement("div",null,r.a.createElement("h2",{className:"header"},"Phonebook"),r.a.createElement(O,{message:A}),r.a.createElement(g,{errorMessage:x}),r.a.createElement(i,{handleFilter:function(e){D(e.target.value)}}),r.a.createElement("h2",null,"Add a new"),r.a.createElement(m,{resetForm:function(){return b("")},handleNameChange:function(e){b(e.target.value)},handleNumberChange:function(e){C(e.target.value)},handleSubmit:function(e){e.preventDefault();var t={name:d,number:y},a=n.filter(function(e){return e.name===t.name});if(0===d.length||0===y.length)alert("Please complete the fields");else if(0!==a.length){var r=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(n,!0).forEach(function(t){Object(u.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},n.find(function(e){return e.name===t.name}),{number:y});window.confirm(" ".concat(r.name," is already in the phonebook, replace the old number with the new one?"))&&v(r.id,r).then(function(e){l(n.map(function(t){return t.id!==r.id?t:e})),J("".concat(r.name," has been updated")),setTimeout(function(){J(null)},5e3)}).catch(function(e){B("".concat(r.name," has already been removed from server")),setTimeout(function(){B(null)},5e3)})}else p(t).then(function(e){l(n.concat(e)),J("".concat(t.name," has been added to the phonebook")),setTimeout(function(){J(null)},5e3)})}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(s,{persons:n,filteredName:P,deleteContact:function(e){var t=n.filter(function(t){return t.id!==e}),a=n.find(function(t){return t.id===e});window.confirm("Are you sure you want to delete ".concat(a.name," ?"))&&E(e).then(l(t))}}))};c.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.fb13b827.chunk.js.map