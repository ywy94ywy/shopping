<template>
  <div>
    <transition name="cover">
      <div class="bg" @click="close" v-if="userPanel.show">
      </div>
    </transition>
    <transition name="panel">
      <div class="user_panel" v-if="userPanel.show">
        <div class="x" @click="close">X</div>
        <div class="login-block pointer" :class="{active:userPanel.state=='login'}" @click="login_panel">登&nbsp;&nbsp;录</div>
        <div class="register-block pointer" :class="{active:userPanel.state=='register'}" @click="register_panel">注&nbsp;&nbsp;册</div>
        <br/>
        <login v-if="userPanel.state=='login'" />
        <register v-if="userPanel.state=='register'" />
      </div>
    </transition>
  </div>

</template>

<script>
import login from './login'
import register from './register'
export default {
  data() {
    return {}
  },
  computed: {
    userPanel: {
      get() {
        return this.$store.state.userPanel
      },
      set(data) {
        this.$store.state.userPanel = data
      }
    }
  },
  methods: {
    close() {
      // document.body.style.overflowY = 'visible'
      // document.getElementById('home').style.filter = 'none'
      this.userPanel.show = false
    },
    login_panel() {
      // document.body.style.overflowY = 'hidden'

      this.userPanel.state = 'login'
    },
    register_panel() {
      // document.body.style.overflowY = 'hidden'
      this.userPanel.state = 'register'
    }
  },
  components: {
    login,
    register
  }
}
</script>


<style scoped>
.cover-enter-active,
.cover-leave-active {
  transition: all 0.5s ease;
}
.cover-enter,
.cover-leave-to {
  opacity: 0 !important;
}
.cover-enter-to,
.cover-leave {
  opacity: 0.5;
}
.panel-enter-active,
.panel-leave-active {
  transition: all 0.5s ease;
}
.panel-enter,
.panel-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0.5;
  background: #2b2b2b;
}
.user_panel {
  position: fixed;
  width: 500px;
  height: 490px;
  left: 50%;
  top: 50%;
  margin-left: -295px;
  margin-top: -245px;
  z-index: 101;
  background: white;
  box-shadow: 0px 0px 30px #333;
}
.x {
  text-align: right;
  font-size: 25px;
  font-family: arial;
  opacity: 0.7;
  margin: 5px 10px;
}
.x:hover {
  opacity: 1;
  cursor: pointer;
}
.login-block {
  float: left;
  margin-left: 10px;
  margin-bottom: 35px;
  width: 240px;
  height: 42px;
  font: 20px '微软雅黑';
  line-height: 42px;
  background: #646464;
  text-align: center;
  color: white;
}
.register-block {
  float: left;
  width: 240px;
  height: 42px;
  font: 20px '微软雅黑';
  line-height: 42px;
  background: #646464;
  text-align: center;
  color: white;
}
.active {
  background: #7bb313 url(../../assets/img/login/loginActive.png) no-repeat
    205px 15px;
}
.login-row {
  width: auto;
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  font-family: '微软雅黑';
  margin-left: 80px;
  margin-bottom: 15px;
}
.login-row img {
  margin-left: 20px;
  vertical-align: middle;
}
.login-row input {
  line-height: 30px;
  font-size: 15px;
  text-indent: 0.5em;
  background: white;
}
.try-login {
  margin: 30px auto;
  margin-bottom: 10px;
  width: 220px;
  height: 42px;
  font: 18px '微软雅黑';
  line-height: 42px;
  text-align: center;
  background: #7bb313;
  color: white;
}
#login-err {
  margin-left: 100px;
  height: 1em;
}
</style>
