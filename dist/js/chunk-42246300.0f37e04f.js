(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-42246300"],{"00de":function(t,e,a){},"07c6":function(t,e,a){"use strict";var n=a("7157"),r=a.n(n);r.a},3055:function(t,e,a){"use strict";var n=a("00de"),r=a.n(n);r.a},"3a5e":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("div",{staticClass:"loading"})])}],s={name:"loading"},i=s,c=(a("3055"),a("2877")),o=Object(c["a"])(i,n,r,!1,null,"922edc96",null);o.options.__file="Loading.vue";e["a"]=o.exports},7101:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[t.isLoading?n("loading"):n("main",{staticClass:"main"},[n("div",{staticClass:"logo-box"},[n("img",{staticClass:"logo",attrs:{src:a("7130"),alt:""}})]),n("form",{attrs:{action:""}},[n("el-input",{staticClass:"account",attrs:{placeholder:"请输入账号"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),n("el-input",{staticClass:"pwd",attrs:{type:"password",placeholder:"请输入密码"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),n("div",{staticClass:"verification"},[n("el-input",{staticClass:"code-input",attrs:{placeholder:"请输入验证码"},model:{value:t.verification,callback:function(e){t.verification=e},expression:"verification"}}),n("img",{staticClass:"code-img",attrs:{src:t.verificationCode,alt:""},on:{click:t.getVerfication}})],1),n("el-button",{staticClass:"login-btn",attrs:{type:"success"},on:{click:function(e){t.login("accountLogin")}}},[t._v("登录")])],1)]),n("my-footer",{attrs:{showCompanyInfo:!0}})],1)},r=[],s=a("c93e"),i=(a("96cf"),a("3040")),c=a("3a5e"),o=a("0ee4"),u=a("2f62"),l=a("bdaa"),d={data:function(){return{username:"xixi",password:"123456",verification:"",verificationCode:"",isLoading:!1}},name:"Login",components:{Loading:c["a"],MyFooter:o["a"]},mounted:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["l"])();case 2:e=t.sent,this.verificationCode=e.data.code;case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),methods:Object(s["a"])({},Object(u["b"])(["RECORD_USERINFO"]),{login:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e,a,n=arguments;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:e=n.length>0&&void 0!==n[0]?n[0]:"accountLogin",console.log(e),t.t0=e,t.next="accountLogin"===t.t0?5:24;break;case 5:return this.isLoading=!0,t.next=8,Object(l["a"])(this.username,this.password,this.verification);case 8:a=t.sent,this.isLoading=!1,t.t1=a.data.status,t.next=0===t.t1?13:1===t.t1?15:2===t.t1?19:3===t.t1?21:23;break;case 13:return this.$message.error("登录失败"),t.abrupt("break",23);case 15:return this.$message({message:"登录成功",type:"success"}),this.RECORD_USERINFO({userId:a.data.data.userInfo.user_id,username:a.data.data.userInfo.username}),this.$router.go(-1),t.abrupt("break",23);case 19:return this.$message.error("验证码错误"),t.abrupt("break",23);case 21:return this.$message.error("密码错误"),t.abrupt("break",23);case 23:return t.abrupt("break",24);case 24:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}(),getVerfication:function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["l"])();case 2:e=t.sent,this.verificationCode=e.data.code;case 4:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()})},f=d,p=(a("8823"),a("07c6"),a("2877")),g=Object(p["a"])(f,n,r,!1,null,"704c613c",null);g.options.__file="Login.vue";e["default"]=g.exports},7130:function(t,e,a){t.exports=a.p+"img/login-logo.8168d123.svg"},7157:function(t,e,a){},8823:function(t,e,a){"use strict";var n=a("c92b"),r=a.n(n);r.a},c92b:function(t,e,a){}}]);
//# sourceMappingURL=chunk-42246300.0f37e04f.js.map