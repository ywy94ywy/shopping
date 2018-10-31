// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
//导入CSS
import '../static/css/main.css'
import '../static/css/component.css'
//使用axios
import Axios from 'axios'
Axios.defaults.withCredentials=true
Vue.prototype.$axios = Axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // template:'<App/>',
  // component:{
  //   App
  // },
  render: h => h(App)
})
