<template>
  <div class="person-details">
    <div class="details-title">个人资料</div>
    <div class="portrait"></div>
    <div class="person-info">
      <p>用户名：<input type="text" v-if="update" :value="user.userName" disabled/>
        <span v-if="!update">{{user.userName}}</span>
      </p>
      <p>昵称：<input type="text" v-if="update" v-model="user.nickName" />
        <span v-if="!update">{{user.nickName}}</span>
      </p>
      <p>个性签名：<input type="text" v-if="update" v-model="user.sign" />
        <span v-if="!update">{{user.sign}}</span>
      </p>
      <p>手机：<input type="text" v-if="update" v-model="user.telephone" />
        <span v-if="!update">{{user.telephone}}</span>
      </p>
      <p>QQ：<input type="text" v-if="update" v-model="user.qq" />
        <span v-if="!update">{{user.qq}}</span>
      </p>
      <p>微信：<input type="text" v-if="update" v-model="user.wechat" />
        <span v-if="!update">{{user.wechat}}</span>
      </p>
    </div>
    <br/>
    <div class="person-button pointer">
      <span v-if="update" @click="changeModel('cancel')">取消</span>
      <span v-if="!update" @click="changeModel('update')">修改</span>
    </div>
    <div class="person-button pointer" v-if="update" @click="submit">保存</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      update: false,
      user: []
    }
  },
  computed: {
    loginState() {
      return this.$store.state.loginState
    }
  },
  watch: {
    loginState: function(val) {
      console.log('change')
      this.getUserInfo()
      console.log('changeover')
    }
  },
  methods: {
    getUserInfo() {
      this.$axios
        .get(this.$store.state.server+'/user/userInfo')
        .then(res => {
          this.user = res.data.result[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateUserInfo() {
      this.$axios.post('')
    },
    changeModel(p) {
      if (p == 'update') {
        this.update = true
      } else {
        this.update = false
      }
    },
    submit() {
      this.$axios
        .post(this.$store.state.server+'/user/updateUserInfo', {
          user: this.user
        })
        .then(res => {
          this.getUserInfo()
            this.update = false
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getUserInfo()
  }
}
</script>

<style scoped>
.person-details {
  width: 1225px;
  height: 409px;
  background: #fff;
  padding: 18px 65px;
  margin-left: 60px;
  margin-bottom: 30px;
  border: 1px solid transparent;
}
.details-title {
  width: 1125px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #069475;
  color: #069475;
  font-size: 18px;
  letter-spacing: 0.2em;
}
.portrait {
  width: 225px;
  height: 200px;
  background: url(../../../assets/img/content/person/schoolIcon.png) no-repeat
    center;
  margin-left: 127px;
  margin-top: 55px;
  display: inline-block;
  vertical-align: middle;
}
.person-info {
  width: 500px;
  height: 200px;
  display: inline-block;
  margin-left: 27px;
  margin-top: 55px;
  vertical-align: middle;
}
.person-info p{
line-height: 30px;

}
.person-info input{
font-size: 1rem;
}
.person-button {
  width: 48px;
  height: 27px;
  line-height: 27px;
  background: #069475;
  color: #fff;
  text-align: center;
  float: right;
  margin-right: 30px;
}

</style>
