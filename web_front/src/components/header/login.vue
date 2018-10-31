<template>
  <div>
    <div class="login-row">
      <span>用户名</span> <img src="../../assets/img/login/1.png" alt="">
      <input type="text" v-model="userName" placeholder="请输入用户名" @keyup.enter="login"/>
    </div>
    <div class="login-row">
      <span>密码</span> <img src="../../assets/img/login/2.png" alt="">
      <input type="password" v-model="password" placeholder="请输入密码" @keyup.enter="login"/>
    </div>
    <div class="login-row">
      <span>验证码</span> <img src="../../assets/img/login/3.png" alt="">
      <input type="text" v-model="captcha" placeholder="请输入验证码" size="10px;" @keyup.enter="login"/>
      <span class="captcha" v-html="svg" @click="createCaptcha"></span>
    </div>
    <p class="errMessage">{{errMessage}}</p>
    <div class="try-login pointer" @click="login" >登&nbsp;&nbsp;录</div>
    <p style="float:right;margin-right:80px;font-family:微软雅黑;">忘记密码</p>
    <br/>
    <p style="margin-left:60px;margin-top:40px;font-family:微软雅黑;">温馨提示：如果您忘了密码，就重新注册一个账号吧</p>
  </div>

</template>

<script>
import qs from 'qs'
export default {
  data() {
    return {
      userName: '',
      password: '',
      captcha: '',
      svg: '',
      errMessage: ''
    }
  },
  mounted() {
    this.createCaptcha()
  },
  methods: {
    login() {
      let user = {
        name: this.userName,
        password: this.password
      }
      if (!user.name) {
        this.errMessage = '请输入用户名！'
        return
      } else if (!user.password) {
        this.errMessage = '请输入密码！'
        return
      } else if (!this.captcha) {
        this.errMessage = '请输入验证码！'
        return
      }
      this.$axios
        .post(this.$store.state.server + '/captcha', {
          captcha: this.captcha
        })
        .then(res => {
          if (res.data.msg == '验证成功') {
            this.$axios
              .post(
                this.$store.state.server + '/user/login',
                qs.stringify(user)
              )
              .then(res => {
                let msg = res.data.msg
                if (msg == '用户名或密码错误！') {
                  this.errMessage = '用户名或密码错误！'
                  return
                }
                if (msg == '登录成功') {
                  let userName = res.data.result.user[0].userName
                  let nickName = res.data.result.user[0].nickName
                  let iduser = res.data.result.user[0].iduser
                  this.errMessage = 'success'
                  this.$store.state.userPanel.show = false
                  this.$store.state.loginState = true
                  this.$store.state.userName = userName
                  this.$store.state.userId = iduser
                  var d = new Date()
                  d.setHours(d.getHours() + 24 * 7)
                  document.cookie =
                    'userId=' + iduser + ';expires=' + d + ';path=/;'
                  document.cookie =
                    'userName=' + userName + ';expires=' + d + ';path=/;'
                  document.cookie =
                    'nickName=' + nickName + ';expires=' + d + ';path=/;'
                  location.reload()
                } else {
                  this.errMessage = '用户名或密码错误！'
                }
              })
              .catch(err => {
                console.log(err)
              })
          } else {
            this.errMessage = '验证码错误！'
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    createCaptcha() {
      this.$axios
        .get(this.$store.state.server + '/captcha')
        .then(res => {
          this.svg = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.login {
  position: fixed;
  width: 500px;
  height: 490px;
  left: 50%;
  top: 50%;
  margin-left: -295px;
  margin-top: -245px;
  z-index: 101;
  background: white;
  opacity: 1;

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
  position: relative;
}
.login-row span {
  width: 60px;
  height: 40px;
  text-align: center;
  display: inline-block;
}
.login-row:nth-child(2) span {
  letter-spacing: 0.5em;
}
.login-row img {
  width: 36px;
  height: 36px;
  margin-left: 20px;
  vertical-align: middle;
}
.login-row input {
  line-height: 32px;
  font-size: 15px;
  text-indent: 0.5em;
  background: white;
  margin-left: -5px;
}
.captcha {
  position: absolute;
  top: -5px;
}
.errMessage {
  margin-left: 140px;
  height: 21px;
}
.try-login {
  margin: 20px auto;
 
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

