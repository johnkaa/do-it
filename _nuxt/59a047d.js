(window.webpackJsonp=window.webpackJsonp||[]).push([[76,12],{366:function(t,e,o){var content=o(384);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("4d4475e8",content,!0,{sourceMap:!1})},383:function(t,e,o){"use strict";o(366)},384:function(t,e,o){var n=o(28)(!1);n.push([t.i,".modal-mask[data-v-56cdcf20]{position:fixed;z-index:9998;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);display:table;transition:opacity .3s ease}.modal-wrapper[data-v-56cdcf20]{display:table-cell;vertical-align:middle}.modal-container[data-v-56cdcf20]{width:700px;margin:0 auto;background-color:#0b1729;border-radius:10px;box-shadow:0 2px 8px rgba(11,23,41,.33);transition:all .3s ease;position:relative;padding:50px 150px}.modal-close[data-v-56cdcf20]{width:32px;height:32px;right:16px;top:16px;cursor:pointer;position:absolute}.modal-header[data-v-56cdcf20]{margin-top:0;text-align:center;text-transform:uppercase;font-weight:700;font-size:20px}.modal-body[data-v-56cdcf20]{margin:20px 0}.modal-default-button[data-v-56cdcf20]{float:right}.modal-enter[data-v-56cdcf20],.modal-leave-active[data-v-56cdcf20]{opacity:0}.modal-enter .modal-container[data-v-56cdcf20],.modal-leave-active .modal-container[data-v-56cdcf20]{transform:scale(1.1)}",""]),t.exports=n},393:function(t,e,o){"use strict";o.r(e);var n={name:"Modal"},r=(o(383),o(13)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"modal"}},[o("div",{staticClass:"modal-mask"},[o("div",{staticClass:"modal-wrapper"},[o("div",{staticClass:"modal-container"},[o("img",{staticClass:"modal-close",attrs:{src:"/images/icons/exit.svg",alt:""},on:{click:function(e){return t.$emit("close")}}}),t._v(" "),o("div",{staticClass:"modal-header"},[t._t("header",(function(){return[t._v("\n            default header\n          ")]}))],2),t._v(" "),o("div",{staticClass:"modal-body"},[t._t("body",(function(){return[t._v("\n            default body\n          ")]}))],2),t._v(" "),o("div",{staticClass:"modal-footer"},[t._t("footer",(function(){return[o("my-button",{staticClass:"modal-default-button"},[t._v("Send")])]}))],2)])])])])}),[],!1,null,"56cdcf20",null);e.default=component.exports;installComponents(component,{MyButton:o(208).default})},448:function(t,e,o){var content=o(537);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(29).default)("194fec4a",content,!0,{sourceMap:!1})},536:function(t,e,o){"use strict";o(448)},537:function(t,e,o){var n=o(28)(!1);n.push([t.i,".shop__items[data-v-62842033]{display:flex;justify-content:center;grid-gap:30px;gap:30px;flex-wrap:wrap}.shop__item[data-v-62842033]{text-align:center}.shop__item-title[data-v-62842033]{color:#8996a3;line-height:16px}.shop__item-info[data-v-62842033]{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.shop-modal__title[data-v-62842033]{text-align:center}.shop-modal__footer[data-v-62842033]{display:flex;justify-content:center;grid-gap:30px;gap:30px}.shop-modal__btn[data-v-62842033]{width:150px}",""]),t.exports=n},656:function(t,e,o){"use strict";o.r(e);var n=o(4),r=(o(50),o(82),o(22),o(38)),c={asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var o,n,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t.$fire,n=o.database.ref("shop"),e.prev=2,e.next=5,n.once("value");case 5:return r=e.sent,c=r.val(),e.abrupt("return",{items:c});case 10:e.prev=10,e.t0=e.catch(2),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[2,10]])})))()},computed:Object(r.b)(["getUser"]),data:function(){return{items:{},showModal:!1,price:0,weapon:""}},methods:{buy:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var o,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o=+t.price.slice(1),!(t.getUser.eur<o)){e.next=3;break}return e.abrupt("return",t.$toasted.error("You don't have enough money"));case 3:return e.prev=3,n=t.$fire.database.ref("users/".concat(t.getUser.id,"/eur")),r=t.$fire.database.ref("users/".concat(t.getUser.id,"/items/").concat((+new Date-+new Date%100)/10)),e.next=8,n.set(t.getUser.eur-o);case 8:return e.next=10,r.set({id:(+new Date-+new Date%100)/10,name:t.weapon});case 10:e.next=15;break;case 12:return e.prev=12,e.t0=e.catch(3),e.abrupt("return",t.$toasted.error(e.t0));case 15:t.showModal=!1,t.$toasted.success("You successful buy ".concat(t.weapon));case 17:case"end":return e.stop()}}),e,null,[[3,12]])})))()}}},l=(o(536),o(13)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"shop"},[t.showModal?o("my-modal",{staticClass:"shop__modal",on:{close:function(e){t.showModal=!1}}},[o("h2",{attrs:{slot:"header"},slot:"header"},[t._v("Buy item")]),t._v(" "),o("div",{staticClass:"shop-modal__body",attrs:{slot:"body"},slot:"body"},[o("div",{staticClass:"shop-modal__title"},[t._v("Are you sure?")])]),t._v(" "),o("div",{staticClass:"shop-modal__footer",attrs:{slot:"footer"},slot:"footer"},[o("div",{staticClass:"shop-modal__btn",on:{click:function(e){t.showModal=!1}}},[o("my-button",{staticClass:"secondary"},[t._v("No")])],1),t._v(" "),o("div",{staticClass:"shop-modal__btn",on:{click:t.buy}},[o("my-button",[t._v("Yes")])],1)])]):t._e(),t._v(" "),o("div",{staticClass:"shop__items"},[t._l(t.items,(function(e){return o("div",{staticClass:"shop__item"},[o("div",{staticClass:"shop__item-img"},[o("img",{attrs:{src:e.img,alt:""}})]),t._v(" "),o("div",{staticClass:"shop__item-info"},[o("div",{staticClass:"shop__item-title"},[t._v(t._s(e.name))]),t._v(" "),o("div",{staticClass:"shop__item-price"},[t._v(t._s(e.price))])]),t._v(" "),o("div",{staticClass:"shop__item-button",on:{click:function(o){t.showModal=!0,t.price=e.price,t.weapon=e.name}}},[o("my-button",[t._v("Buy")])],1)])})),t._v(" "),t._l(t.items,(function(e){return o("div",{staticClass:"shop__item"},[o("div",{staticClass:"shop__item-img"},[o("img",{attrs:{src:e.img,alt:""}})]),t._v(" "),o("div",{staticClass:"shop__item-info"},[o("div",{staticClass:"shop__item-title"},[t._v(t._s(e.name))]),t._v(" "),o("div",{staticClass:"shop__item-price"},[t._v(t._s(e.price))])]),t._v(" "),o("div",{staticClass:"shop__item-button",on:{click:function(o){t.showModal=!0,t.price=e.price,t.weapon=e.name}}},[o("my-button",[t._v("Buy")])],1)])})),t._v(" "),t._l(t.items,(function(e){return o("div",{staticClass:"shop__item"},[o("div",{staticClass:"shop__item-img"},[o("img",{attrs:{src:e.img,alt:""}})]),t._v(" "),o("div",{staticClass:"shop__item-info"},[o("div",{staticClass:"shop__item-title"},[t._v(t._s(e.name))]),t._v(" "),o("div",{staticClass:"shop__item-price"},[t._v(t._s(e.price))])]),t._v(" "),o("div",{staticClass:"shop__item-button",on:{click:function(o){t.showModal=!0,t.price=e.price,t.weapon=e.name}}},[o("my-button",[t._v("Buy")])],1)])}))],2)],1)}),[],!1,null,"62842033",null);e.default=component.exports;installComponents(component,{MyButton:o(208).default,MyModal:o(393).default})}}]);