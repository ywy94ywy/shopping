import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userPanel: {
      show: false,
      state: "login"
    },
    userId:null,
    loginState: false,
    shoppingCart: false,
    // server:'http://localhost:3030',
    server:'http://47.106.185.141:3030'
    // server: 'http://yangwenyuan.top:3030'
  }

})
