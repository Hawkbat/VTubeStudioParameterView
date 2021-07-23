(this["webpackJsonpvtube-studio-parameter-view"]=this["webpackJsonpvtube-studio-parameter-view"]||[]).push([[0],{17:function(e,t,n){},19:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var o=n(4),i=n.n(o),r=n(11),s=n.n(r),c=(n(17),n(0)),a=n.n(c),u=n(12),l=n(7),d=(n(19),n(8)),v=n(10),h=n(1),f=n(3),p=function(){function e(t,n){Object(h.a)(this,e),this.ws=void 0,this._url=void 0,this._protocols=void 0,this.bufferedSends=[],this.eventListeners=new Map,this.reconnectHandle=null,this.reconnectTimeout=0,this.onopen=null,this.onmessage=null,this.onerror=null,this.onclose=null,this._url=t,this._protocols=n,this.performReconnect()}return Object(f.a)(e,[{key:"url",get:function(){return this._url},set:function(e){e!==this._url&&(this._url=e,this.performReconnect())}},{key:"protocol",get:function(){return this.ws.protocol}},{key:"readyState",get:function(){return this.ws.readyState}},{key:"binaryType",get:function(){return this.ws.binaryType},set:function(e){this.ws.binaryType=e}},{key:"bufferedAmount",get:function(){return this.ws.bufferedAmount}},{key:"extensions",get:function(){return this.ws.extensions}},{key:"CLOSED",get:function(){return this.ws.CLOSED}},{key:"CLOSING",get:function(){return this.ws.CLOSING}},{key:"CONNECTING",get:function(){return this.ws.CONNECTING}},{key:"OPEN",get:function(){return this.ws.OPEN}},{key:"addEventListener",value:function(e,t,n){var o,i=null!==(o=this.eventListeners.get(e))&&void 0!==o?o:[];i.push({listener:t,options:n}),this.eventListeners.set(e,i),this.ws.addEventListener(e,t,n)}},{key:"removeEventListener",value:function(e,t,n){var o,i=null!==(o=this.eventListeners.get(e))&&void 0!==o?o:[],r=i.findIndex((function(e){return e.listener===t&&(e.options===n||"object"===typeof e.options&&"object"===typeof n&&e.options.capture===n.capture)}));r>=0&&i.splice(r,1),this.ws.removeEventListener(e,t,n)}},{key:"dispatchEvent",value:function(e){return this.ws.dispatchEvent(e)}},{key:"close",value:function(e,t){this.ws.close(e,t)}},{key:"send",value:function(e){this.ws.readyState===this.ws.OPEN?this.ws.send(e):this.bufferedSends.unshift(e)}},{key:"performReconnect",value:function(){var e=this;try{var t,n,o,i,r,s=this.ws;s&&s.readyState===s.OPEN&&s.close(3012,"Reconnecting");var c=new WebSocket(s?this._url:"wss://echo.websocket.org",this._protocols);c.binaryType=null!==(t=null===s||void 0===s?void 0:s.binaryType)&&void 0!==t?t:c.binaryType,c.onopen=null!==(n=null===s||void 0===s?void 0:s.onopen)&&void 0!==n?n:c.onopen,c.onmessage=null!==(o=null===s||void 0===s?void 0:s.onmessage)&&void 0!==o?o:c.onmessage,c.onerror=null!==(i=null===s||void 0===s?void 0:s.onerror)&&void 0!==i?i:c.onerror,c.onclose=null!==(r=null===s||void 0===s?void 0:s.onclose)&&void 0!==r?r:c.onclose,this.ws=c,s||this.reconnect();var a,u=Object(v.a)(this.eventListeners.entries());try{for(u.s();!(a=u.n()).done;){var d,h=Object(l.a)(a.value,2),f=h[0],p=h[1],m=Object(v.a)(p);try{for(m.s();!(d=m.n()).done;){var b=d.value;s&&s.removeEventListener(f,b.listener,b.options),c.addEventListener(f,b.listener,b.options)}}catch(y){m.e(y)}finally{m.f()}}}catch(y){u.e(y)}finally{u.f()}c.addEventListener("open",(function(t){var n;if(c===e.ws)for(e.reconnectTimeout=0,null===(n=e.onopen)||void 0===n||n.call(e,t);e.bufferedSends.length;)c.send(e.bufferedSends.pop());else c.close(3012,"Reconnecting")})),c.addEventListener("message",(function(t){var n;null===(n=e.onmessage)||void 0===n||n.call(e,t)})),c.addEventListener("error",(function(t){var n;null===(n=e.onerror)||void 0===n||n.call(e,t)})),c.addEventListener("close",(function(t){var n;null===(n=e.onclose)||void 0===n||n.call(e,t),c===e.ws&&e.reconnect()}))}catch(w){console.error(w),this.reconnect()}}},{key:"reconnect",value:function(){var e=this;this.reconnectHandle&&(clearTimeout(this.reconnectHandle),this.reconnectHandle=null),this.reconnectHandle=setTimeout((function(){return e.performReconnect()}),this.reconnectTimeout),this.reconnectTimeout=Math.min(8e3,2*Math.max(1e3,this.reconnectTimeout))}}]),e}(),m=n(2);function b(e){return Math.round(1e3*e)/1e3}var y=function(){var e=Object(o.useState)(!1),t=Object(l.a)(e,2),n=t[0],i=t[1],r=Object(o.useState)(),s=Object(l.a)(r,2),c=s[0],v=s[1];return Object(o.useEffect)((function(){var e,t="vtstudio-parameter-view-token",n=new p("ws://localhost:8001"),o=new d.c(n),r=new d.a(o),s=null!==(e=localStorage.getItem(t))&&void 0!==e?e:void 0,c=new d.b(r,"Parameter View","Hawkbar",void 0,s,(function(e){return localStorage.setItem(t,e)})),l={active:!0};n.addEventListener("open",(function(){return i(!0)})),n.addEventListener("close",(function(){return i(!1)}));var h=function(){var e=Object(u.a)(a.a.mark((function e(){var t,n,o;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c.apiClient.live2DParameterList();case 3:t=e.sent,n=t.modelLoaded,o=t.parameters,v(n?o:null),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:requestAnimationFrame(h);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return h(),function(){l.active=!1}}),[]),Object(m.jsx)("div",{className:"App",children:n?Object(m.jsx)("div",{style:{display:"grid",gridTemplateColumns:"auto 60px 1fr 60px 60px"},children:c?c.map((function(e){return Object(m.jsxs)(o.Fragment,{children:[Object(m.jsx)("div",{children:e.name}),Object(m.jsx)("div",{children:b(e.min)}),Object(m.jsx)("input",{type:"range",min:e.min,max:e.max,step:"any",value:b(e.value)}),Object(m.jsx)("div",{children:b(e.max)}),Object(m.jsx)("div",{children:b(e.value)})]},e.name)})):Object(m.jsx)("i",{children:"No model loaded."})}):Object(m.jsx)("i",{children:"Not connected to VTube Studio."})})},w=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,o=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),o(e),i(e),r(e),s(e)}))};s.a.render(Object(m.jsx)(i.a.StrictMode,{children:Object(m.jsx)(y,{})}),document.getElementById("root")),w()}},[[21,1,2]]]);
//# sourceMappingURL=main.1c78a015.chunk.js.map