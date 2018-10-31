<template>

  <div>

    <div class="register-row">
      <span>用户名</span><input id="register-name" type="text" v-model="userName" placeholder="请输入用户名" @keyup.enter="register" />
      <span>请输入至少6位</span>
    </div>
    <div class="register-row">
      <span>登录密码</span><input id="register-password" type="password" v-model="password" placeholder="请输入密码" @keyup.enter="register" />
      <span>请输入密码</span>
    </div>
    <div class="register-row">
      <span>确认密码</span><input id="register-password2" type="password" v-model="passwordAgain" placeholder="请确认密码" @keyup.enter="register" />
      <span>请再次输入密码</span>
    </div>
    <div class="register-row">
      <span>手机号码</span><input id="register-telephone" type="text" v-model="telephone" placeholder="请输入手机号码" @keyup.enter="register" />
      <span>请输入手机号码</span>
    </div>
    <div class="register-row">
      <span>验证码</span><input type="text" v-model="captcha" placeholder="请输入验证码" size="10px;" @keyup.enter="register" />
      <span v-html="svg" class="captcha" @click="createCaptcha"></span>
      <!-- <img src=this.$store.state.server+"/captcha" id="captcha" alt=""> -->
    </div>
    <p class="errMessage">{{errMessage}}</p>
    <div class="try-register pointer" @click="register">注&nbsp;&nbsp;册</div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      userName: '',
      password: '',
      passwordAgain: '',
      telephone: '',
      captcha: '',
      errMessage: '',
      svg: ''
    }
  },
  mounted() {
    this.createCaptcha()
  },
  methods: {
    register() {
      let user = {
        name: this.userName,
        password: this.password,
        telephone: this.telephone
      }
      if (!user.name) {
        this.errMessage = '请输入用户名！'
        return
      } else if (!user.password) {
        this.errMessage = '请输入密码！'
        return
      } else if (user.password.length < 6) {
        this.errMessage = '密码长度不足6位！'
        return
      } else if (!this.passwordAgain) {
        this.errMessage = '请再次输入密码！'
        return
      } else if (user.password != this.passwordAgain) {
        this.errMessage = '两次输入密码不一致！'
        return
      } else if (!user.telephone) {
        this.errMessage = '请输入手机号码！'
        return
      } else if (user.telephone.length != 11) {
        this.errMessage = '请输入正确的手机号码！'
        return
      } else if (!this.captcha) {
        this.errMessage = '请输入验证码！'
        return
      }
      //检查验证码
      this.$axios
        .post(this.$store.state.server + '/captcha', {
          captcha: this.captcha
        })
        .then(res => {
          if (res.data.msg == '验证成功') {
            //验证用户名
            this.$axios
              .post(this.$store.state.server + '/user/register', user)
              .then(res => {
                if (res.data.msg == '插入成功') {
                  console.log(res.data.msg)
                  // self.close()
                  this.errMessage = '注册成功'
                    this.$store.state.userPanel.state = 'login'
                } else {
                  this.errMessage = '用户名已存在！'
                }
              })
              .catch(function(err) {
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
.register {
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
.register-row {
  height: 40px;
  line-height: 40px;
  font-size: 17px;
  font-family: '微软雅黑';
  margin-left: 50px;
  margin-bottom: 10px;
  position: relative;
}

.register-row input {
  line-height: 30px;
  font-size: 15px;
  text-indent: 0.5em;
  margin-left: 20px;
  background: white;
}
.register-row span:first-child {
  width: 55px;
  text-align: center;
  display: inline-block;
  font-size: 13px;
  color: #aaa;
}
.register-row span:last-child {
  text-align: center;
  display: inline-block;
  font-size: 13px;
  color: #aaa;
}
.captcha {
  position: absolute;

  top: -5px;
}
.errMessage {
  margin-left: 140px;
  height: 21px;
}
.try-register {
  margin: 20px auto;
  width: 220px;
  height: 42px;
  font: 18px '微软雅黑';
  line-height: 42px;
  text-align: center;
  background: #7bb313;
  color: white;
}
#register-err {
  margin-left: 70px;
  height: 1em;
}
#captcha {
  width: 150px;
  height: 40px;
  line-height: 40px;
}
</style>

