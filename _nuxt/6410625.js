(window.webpackJsonp=window.webpackJsonp||[]).push([[34,3],{313:function(t,e,r){var content=r(323);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("3c28ca68",content,!0,{sourceMap:!1})},322:function(t,e,r){"use strict";r(313)},323:function(t,e,r){var n=r(28),o=r(108),c=r(324),d=n(!1),l=o(c);d.push([t.i,'.admin__top[data-v-53e4550e]{display:flex;align-items:center;justify-content:space-between;margin-bottom:40px}.admin__search[data-v-53e4550e]{position:relative}.admin__search-input[data-v-53e4550e]{background-color:transparent;border:none;border-bottom:2px solid #20252b;width:244px;color:#fff;padding-bottom:2px;padding-right:20px}.admin__search-input[data-v-53e4550e]::-moz-placeholder{color:#434951}.admin__search-input[data-v-53e4550e]:-ms-input-placeholder{color:#434951}.admin__search-input[data-v-53e4550e]::placeholder{color:#434951}.admin__search-input[data-v-53e4550e]:focus{outline:none;border-color:#6f6f6f}.admin__search[data-v-53e4550e]:after{content:"";background-image:url('+l+");width:18px;height:18px;position:absolute;right:0}.admin__filter-items[data-v-53e4550e]{display:flex;grid-gap:8px;gap:8px}.admin__filter-item[data-v-53e4550e]{border:2px solid #20252b;cursor:pointer;width:44px;height:44px;padding:6px}.admin__filter-item.active[data-v-53e4550e]{background-color:#fff}.admin__btns[data-v-53e4550e]{display:flex;grid-gap:16px;gap:16px}.admin__btn[data-v-53e4550e]{max-width:190px!important}@media (max-width:900px){.admin__top[data-v-53e4550e]{flex-wrap:wrap;justify-content:center;grid-gap:10px;gap:10px}}",""]),t.exports=d},324:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMTFIMTEuNzFMMTEuNDMgMTAuNzNDMTIuNDEgOS41OSAxMyA4LjExIDEzIDYuNUMxMyAyLjkxIDEwLjA5IDAgNi41IDBDMi45MSAwIDAgMi45MSAwIDYuNUMwIDEwLjA5IDIuOTEgMTMgNi41IDEzQzguMTEgMTMgOS41OSAxMi40MSAxMC43MyAxMS40M0wxMSAxMS43MVYxMi41TDE2IDE3LjQ5TDE3LjQ5IDE2TDEyLjUgMTFaTTYuNSAxMUM0LjAxIDExIDIgOC45OSAyIDYuNUMyIDQuMDEgNC4wMSAyIDYuNSAyQzguOTkgMiAxMSA0LjAxIDExIDYuNUMxMSA4Ljk5IDguOTkgMTEgNi41IDExWiIgZmlsbD0iIzIwMjUyQiIvPgo8L3N2Zz4K"},328:function(t,e,r){"use strict";r.r(e);var n=r(4),o=(r(109),r(33),r(141),r(22),{props:["addText","edit","editDisable","filterDisable"],fetch:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.$fire.database.ref("games"),e.prev=1,e.next=4,r.once("value");case 4:n=e.sent,t.games=n.val(),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(1),t.$toasted.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))()},mounted:function(){var t=this;setTimeout((function(){t.edit&&(t.editInner=t.edit)}),500)},data:function(){return{search:"",games:{},game:"",editInner:!1}},methods:{updateSearch:function(){this.$emit("updateSearch",this.search)},updateFilter:function(t){if(this.game===t)return this.game="",this.$emit("updateFilter",this.game);this.game=t,this.$emit("updateFilter",this.game)},updateEdit:function(){this.editInner=!this.editInner,this.$emit("setEdit",this.editInner)},add:function(){this.$emit("add")},cancel:function(){this.updateEdit(),this.$emit("cancel")},save:function(){this.updateEdit(),this.$emit("save")}}}),c=(r(322),r(13)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"admin__top"},[t.filterDisable?t._e():r("div",{staticClass:"admin__filter-items"},t._l(t.games,(function(e){return r("div",{staticClass:"admin__filter-item",class:{active:e.title===t.game},on:{click:function(r){return t.updateFilter(e.title)}}},[r("img",{attrs:{src:e.gameIconImg,alt:""}})])})),0),t._v(" "),r("div",{staticClass:"admin__search"},[r("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],staticClass:"admin__search-input",attrs:{placeholder:"Search by name, prize, signed, etc."},domProps:{value:t.search},on:{input:[function(e){e.target.composing||(t.search=e.target.value)},t.updateSearch]}})]),t._v(" "),t.editInner?t._e():r("div",{staticClass:"admin__btns"},[t.editDisable?t._e():r("div",{staticClass:"admin__btn",on:{click:t.updateEdit}},[r("my-button",{staticClass:"secondary"},[t._v("Edit mode")])],1),t._v(" "),r("div",{staticClass:"admin__btn",on:{click:t.add}},[r("my-button",{staticClass:"secondary"},[t._v("+ Add "+t._s(t.addText))])],1)]),t._v(" "),t.editInner&&!t.editDisable?r("div",{staticClass:"admin__btns"},[r("div",{staticClass:"admin__btn",on:{click:t.cancel}},[r("my-button",{staticClass:"secondary"},[t._v("Cancel")])],1),t._v(" "),r("div",{staticClass:"admin__btn",on:{click:t.save}},[r("my-button",{staticClass:"secondary"},[t._v("Save changes")])],1),t._v(" "),r("div",{staticClass:"admin__btn",on:{click:t.add}},[r("my-button",{staticClass:"secondary"},[t._v("+ Add "+t._s(t.addText))])],1)]):t._e()])}),[],!1,null,"53e4550e",null);e.default=component.exports;installComponents(component,{MyButton:r(208).default})},330:function(t,e,r){"use strict";var n=r(7),o=r(5),c=r(70),d=r(35),l=r(51),m=r(15),_=r(8),v=r(209),f=r(142),y=r(331),h=r(332),x=r(83),M=r(333),C=[],I=o(C.sort),D=o(C.push),w=_((function(){C.sort(void 0)})),A=_((function(){C.sort(null)})),T=f("sort"),k=!_((function(){if(x)return x<70;if(!(y&&y>3)){if(h)return!0;if(M)return M<603;var code,t,e,r,n="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(r=0;r<47;r++)C.push({k:t+r,v:e})}for(C.sort((function(a,b){return b.v-a.v})),r=0;r<C.length;r++)t=C[r].k.charAt(0),n.charAt(n.length-1)!==t&&(n+=t);return"DGBEFHACIJK"!==n}}));n({target:"Array",proto:!0,forced:w||!A||!T||!k},{sort:function(t){void 0!==t&&c(t);var e=d(this);if(k)return void 0===t?I(e):I(e,t);var r,n,o=[],_=l(e);for(n=0;n<_;n++)n in e&&D(o,e[n]);for(v(o,function(t){return function(e,r){return void 0===r?-1:void 0===e?1:void 0!==t?+t(e,r)||0:m(e)>m(r)?1:-1}}(t)),r=o.length,n=0;n<r;)e[n]=o[n++];for(;n<_;)delete e[n++];return e}})},331:function(t,e,r){var n=r(67).match(/firefox\/(\d+)/i);t.exports=!!n&&+n[1]},332:function(t,e,r){var n=r(67);t.exports=/MSIE|Trident/.test(n)},333:function(t,e,r){var n=r(67).match(/AppleWebKit\/(\d+)\./);t.exports=!!n&&+n[1]},334:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyNCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMTZMMTIgMjFMMTcgMTZIN1oiIGZpbGw9IiM0MDQ2NEMiLz4KPHBhdGggZD0iTTcgMTRMMTIgOUwxNyAxNEg3WiIgZmlsbD0iIzQwNDY0QyIvPgo8L3N2Zz4K"},335:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMTRMMTIgOUwxNyAxNEg3WiIgZmlsbD0iIzQwNDY0QyIvPgo8L3N2Zz4K"},434:function(t,e,r){var content=r(509);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("011960ee",content,!0,{sourceMap:!1})},508:function(t,e,r){"use strict";r(434)},509:function(t,e,r){var n=r(28),o=r(108),c=r(334),d=r(335),l=n(!1),m=o(c),_=o(d);l.push([t.i,".players__items[data-v-037c39d9]{border:2px solid #20252b;padding:13px 30px 0}.players__item[data-v-037c39d9]{display:grid;grid-template-columns:repeat(8,1fr);text-align:center}.players__item-title[data-v-037c39d9]{color:#e6e6e6;font-weight:700;cursor:pointer;display:flex;justify-content:center;align-items:center;margin-bottom:10px}.players__item-title[data-v-037c39d9]:hover{background-color:rgba(103,112,122,.3)}.players__item-title[data-v-037c39d9]:after{content:url("+m+");display:inline-block;margin-top:8px}.players__item-title.active[data-v-037c39d9]:after{content:url("+_+");transform:rotate(180deg);margin-top:0}.players__item-info[data-v-037c39d9]{color:#67707a;margin-bottom:15px}.players__item-info.edit[data-v-037c39d9]{color:#cccdcd;cursor:pointer}.players__item.edit[data-v-037c39d9]{grid-template-columns:repeat(9,1fr)}@media (max-width:950px){.players__item[data-v-037c39d9]{display:flex;justify-content:space-between}}",""]),t.exports=l},641:function(t,e,r){"use strict";r.r(e);r(32),r(68),r(69);var n=r(4),o=r(34),c=(r(22),r(49),r(10),r(80),r(81),r(33),r(141),r(39),r(37),r(44),r(330),r(38));function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={computed:l(l({},Object(c.b)(["getPlayers"])),{},{searchedPlayers:function(){var t=this;return this.players.filter((function(element){return element.username.toLowerCase().includes(t.search.toLowerCase())||element.name.toLowerCase().includes(t.search.toLowerCase())||element.rank.toLowerCase().includes(t.search.toLowerCase())}))}}),mounted:function(){var t=this;Object.keys(this.getPlayers).forEach((function(e){t.players.push(t.getPlayers[e])})),this.$route.query.edit&&(this.edit=!0)},data:function(){return{filterGame:"",search:"",players:[],sort:"",edit:!1}},methods:{updateFilter:function(t){this.filterGame=t},updateSearch:function(t){this.search=t},setEdit:function(t){this.edit=t},addPlayer:function(){this.$router.push("/admin/edit/player/".concat((+new Date-+new Date%100)/100))},cancel:function(){var t=this;this.$store.dispatch("setPlayersAction"),this.players=[],Object.keys(this.getPlayers).forEach((function(e){t.players.push(t.getPlayers[e])}))},save:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$fire.database.ref("users");case 2:return r=e.sent,e.prev=3,e.next=6,r.set(t.getPlayers);case 6:e.next=11;break;case 8:return e.prev=8,e.t0=e.catch(3),e.abrupt("return",t.$toasted.error(e.t0));case 11:t.$toasted.success("Changes have been save");case 12:case"end":return e.stop()}}),e,null,[[3,8]])})))()},sortByUsername:function(){this.sort="username",this.players.sort((function(a,b){return a.username.localeCompare(b.username)}))},sortByPassword:function(){this.sort="password",this.players.sort((function(a,b){return a.password.localeCompare(b.password)}))},sortByName:function(){this.sort="name",this.players.sort((function(a,b){return a.name.localeCompare(b.name)}))},sortByCountry:function(){this.sort="country",this.players.sort((function(a,b){return a.country.localeCompare(b.country)}))},sortByTeam:function(){this.sort="team",this.players.sort((function(a,b){return a.mainTeam.localeCompare(b.mainTeam)}))},sortByAge:function(){this.sort="age",this.players.sort((function(a,b){return a.age-b.age}))},sortByCreated:function(){this.sort="created",this.players.sort((function(a,b){return a.dateRegistration.localeCompare(b.dateRegistration)}))},sortByRank:function(){this.sort="rank",this.players.sort((function(a,b){return a.rank.localeCompare(b.rank)}))}}},_=(r(508),r(13)),component=Object(_.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"players"},[r("admin-panel",{staticClass:"players__top",attrs:{addText:"player",edit:t.edit,filterDisable:!0},on:{updateSearch:t.updateSearch,updateFilter:t.updateFilter,setEdit:t.setEdit,add:t.addPlayer,cancel:t.cancel,save:t.save}}),t._v(" "),r("div",{staticClass:"players__items"},[r("div",{staticClass:"players__item",class:{edit:t.edit}},[r("div",{staticClass:"players__item-title",class:{active:"username"===t.sort},on:{click:t.sortByUsername}},[t._v("Nickname")]),t._v(" "),r("div",{staticClass:"players__item-title",class:{active:"password"===t.sort},on:{click:t.sortByPassword}},[t._v("Password")]),t._v(" "),r("div",{staticClass:"players__item-title",class:{active:"country"===t.sort},on:{click:t.sortByCountry}},[t._v("Country")]),t._v(" "),r("div",{staticClass:"players__item-title",class:{active:"team"===t.sort},on:{click:t.sortByTeam}},[t._v("Team")]),t._v(" "),r("div",{staticClass:"players__item-title",class:{active:"name"===t.sort},on:{click:t.sortByName}},[t._v("Name")]),t._v(" "),r("div",{staticClass:"players__item-title",class:{active:"created"===t.sort},on:{click:t.sortByCreated}},[t._v("Created")]),t._v(" "),r("div",{staticClass:"players__item-title",class:{active:"age"===t.sort},on:{click:t.sortByAge}},[t._v("Age")]),t._v(" "),r("div",{staticClass:"players__item-title",class:{active:"rank"===t.sort},on:{click:t.sortByRank}},[t._v("Rank")])]),t._v(" "),t._l(t.searchedPlayers,(function(e){return r("div",{staticClass:"players__item",class:{edit:t.edit}},[r("div",{staticClass:"players__item-info"},[t._v(t._s(e.username))]),t._v(" "),r("div",{staticClass:"players__item-info"},[t._v(t._s(e.password.replace(/[^\s]/g,"*")))]),t._v(" "),r("div",{staticClass:"players__item-info"},[t._v(t._s(e.country.substr(0,14)))]),t._v(" "),r("div",{staticClass:"players__item-info"},[t._v(t._s(e.mainTeam))]),t._v(" "),r("div",{staticClass:"players__item-info"},[t._v(t._s(e.name))]),t._v(" "),r("div",{staticClass:"players__item-info"},[t._v(t._s(e.dateRegistration))]),t._v(" "),r("div",{staticClass:"players__item-info"},[t._v(t._s(e.age))]),t._v(" "),r("div",{staticClass:"players__item-info"},[t._v(t._s(e.rank))]),t._v(" "),t.edit?r("nuxt-link",{staticClass:"players__item-info edit",attrs:{to:"/admin/edit/player/"+e.id}},[t._v("edit")]):t._e()],1)}))],2)],1)}),[],!1,null,"037c39d9",null);e.default=component.exports;installComponents(component,{AdminPanel:r(328).default})}}]);