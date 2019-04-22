(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{84:function(e,a,t){},85:function(e,a,t){},86:function(e,a,t){},87:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(16),l=(t(84),t(15));t(85);function i(e){var a=e.matchUrl,t={className:"admin-nav__link",activeClassName:"admin-nav__link--active"};return r.a.createElement("nav",{className:"admin-nav"},r.a.createElement(l.c,Object.assign({},t,{to:a+"/orders"}),"\u0421\u043f\u0438\u0441\u043e\u043a \u0437\u0430\u043a\u0430\u0437\u043e\u0432"),r.a.createElement(l.c,Object.assign({},t,{to:a+"/products"}),"\u0422\u043e\u0432\u0430\u0440\u044b"))}var u=t(33),o=t(10),s=t(11),m=t(13),d=t(12),v=t(14),h=t(17),p=t.n(h),f=(t(86),t(32));function g(e){var a=e.children,t=e.placeholder;return e.loaded?a:t}var E=t(3),b=function(e){function a(){var e,t;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(t=Object(m.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(r)))).state={products:null,values:null,oldValues:null,loading:!0},t.onChange=function(e){var a=e.target,n="checkbox"===a.type?a.checked:a.value,r=a.name,c=r.split("-");r=c.pop();var l=Object(E.d)(t.state.values);c.reduce(function(e,a){return e[a]},l)[r]=parseInt(n),t.fixMinMax(l),t.setState({values:l})},t.fixMinMax=function(e){var a=t.state.values,n=Object(E.f)(a,e);for(var r in n){var c=n[r];(c.width||c.height)&&(c.width&&(t.validateMinMax(c.width,a[r].width),e[r].width=c.width),c.height&&(t.validateMinMax(c.height,a[r].height),e[r].height=c.height))}},t.saveValues=function(){var e=Object(E.f)(t.state.oldValues,t.state.values);if(e){t.setState({loading:!0});var a={};for(var n in e)a[n]={},a[n].fields=e[n];p.a.put("/api/products",a).then(function(e){var a=e.data;t.setValues(a)}).catch(function(e){t.setState({loading:!1})})}},t}return Object(v.a)(a,e),Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;p.a.get("/api/products?extended=true").then(function(a){var t=a.data;return e.setValues(t)}).catch(function(a){e.props.history.push("/admin")})}},{key:"setValues",value:function(e){var a=this;e=e.map(function(e){return delete e.fields.type,e});var t=this.getValues(e),n=Object(E.d)(t);this.setState({products:e,values:t,oldValues:n,loading:!1},function(){return console.log(a.state)})}},{key:"getValues",value:function(e){var a={},t=!0,n=!1,r=void 0;try{for(var c,l=e[Symbol.iterator]();!(t=(c=l.next()).done);t=!0){var i=c.value,u=i.fields,o={};for(var s in a[i.product_key]=o,u){var m=u[s];o[s]={},"range"!==m.type?"select"!==m.type||(o[s]=this.getSelectValues(m)):o[s]=this.getRangeValues(m)}}}catch(d){n=!0,r=d}finally{try{t||null==l.return||l.return()}finally{if(n)throw r}}return a}},{key:"getRangeValues",value:function(e){return{min:e.min,max:e.max}}},{key:"getSelectValues",value:function(e){var a=e.values,t={};for(var n in a)void 0!==a[n].price&&(t[n]={},t[n].price=a[n].price);return{values:t}}},{key:"validateMinMax",value:function(e,a){void 0===e.min?void 0===e.max||(e.min=Math.min(a.min,e.max)):e.max=Math.max(e.min,a.max)}},{key:"render",value:function(){return r.a.createElement("div",{className:"products"},r.a.createElement("h1",{className:"products__heading"},"\u0422\u043e\u0432\u0430\u0440\u044b"),r.a.createElement(g,{loaded:!this.state.loading,placeholder:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."},r.a.createElement(y,{products:this.state.products,values:this.state.values,onChange:this.onChange}),r.a.createElement("button",{className:"products__save",onClick:this.saveValues},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c")))}}]),a}(n.Component);function y(e){var a=e.products,t=e.values,n=e.onChange;return a.map(function(e){var a=e.product_key;return r.a.createElement(r.a.Fragment,{key:a},r.a.createElement("section",{className:"product"},r.a.createElement("h2",{className:"product__name"},e.name),r.a.createElement(_,{values:t[a],onChange:n,product:e.fields,name:a})),r.a.createElement("hr",null))})}function _(e){var a=e.product,t=e.values,n=e.onChange,c=e.name,l=[];for(var i in a)l.push(r.a.createElement("div",{className:"product-group",key:i},r.a.createElement("h3",{className:"product-group__name"},a[i].label),r.a.createElement("div",{className:"product-group__row"},r.a.createElement(x,{group:a[i],values:t[i],onChange:n,name:"".concat(c,"-").concat(i)}))));return l}function x(e){var a=e.group,t=e.values,n=e.onChange,c=e.name;if("range"===a.type)return[r.a.createElement(k,{label:"\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f",name:"".concat(c,"-min"),value:t.min,min:500,onChange:n,key:"min-".concat(t.min)}),r.a.createElement(k,{label:"\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f",name:"".concat(c,"-max"),value:t.max,min:500,onChange:n,key:"max-".concat(t.max)})];if("select"===a.type){var l=[];for(var i in a.values){var u=a.values[i];u.price&&l.push(r.a.createElement(k,{key:i,label:u.text,name:"".concat(c,"-values-").concat(i,"-price"),onChange:n,value:t.values[i].price}))}return l}return null}function k(e){var a=e.label,t=Object(u.a)(e,["label"]);return r.a.createElement("label",{className:"product-group__input"},a,r.a.createElement(f.a,Object.assign({min:1},t)))}function w(e){var a=e.match.url;return r.a.createElement("div",{className:"admin__container"},r.a.createElement("aside",{className:"admin__sidebar"},r.a.createElement(i,{matchUrl:a})),r.a.createElement("main",{className:"admin__main-container"},r.a.createElement(c.d,null,r.a.createElement(c.b,{path:a+"/products",component:b}),r.a.createElement(c.b,{path:a+"/orders",component:function(){return"\u0417\u0430\u043a\u0430\u0437\u044b"}}),r.a.createElement(c.a,{to:a+"/orders"}))))}t.d(a,"default",function(){return w})}}]);
//# sourceMappingURL=3.f108d9dd.chunk.js.map