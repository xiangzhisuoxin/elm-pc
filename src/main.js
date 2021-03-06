import Vue from 'vue'
import ElementUI from 'element-ui'
import zh from 'element-ui/lib/locale/lang/zh-CN';
import App from './App.vue'
import router from './router'
import store from './store/store'

import "./style/common.scss";
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.css';



Vue.use(ElementUI,{locale:zh});
Vue.config.productionTip = false

// graphql
import ApolloClient from "apollo-boost"
import VueApollo from "vue-apollo"

let graphqlUrl='';
if(process.env.NODE_ENV === 'development'){
  graphqlUrl="http://localhost:8003/graphql"
} else{
  graphqlUrl="http://39.97.160.25:8003/graphql"
}

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
    uri:graphqlUrl
  })
})

Vue.use(VueApollo) 

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
