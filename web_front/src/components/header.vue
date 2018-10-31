<template>
  <div>
    <modal :mdShow="mdShow">
      <div class="msgBox">
        <p class="message">当前未登录！</p>
        <div class="twoButton">
          <button class="btn btn-2 pointer" @click="closeModal">关闭</button>
        </div>
      </div>
    </modal>
    <div class="top">
      <div class="top_logo pointer" @click="welcome">
        <img :src="logo" />
      </div>
      <div class="top_nav">
        <ul>
          <router-link to="/">
            <li>
              <a>首页</a>
            </li>
          </router-link>
          <router-link :to="{ name: 'goods', params: { goodsType: 'allGoods' }}">
            <li>
              <a>二手信息</a>
            </li>
          </router-link>
          <router-link to="/home/seekGoods">
            <li>
              <a>求购信息</a>
            </li>
          </router-link>
          <li @click="addSeekingInterception">
            <a>发布求购</a>
          </li>
          <li @click="addGoodsInterception">
            <a>发布商品</a>
          </li>
        </ul>
      </div>
      <div class="top_search">
        <div class="search_left">
          <form>
            <input type="text" v-model='searchInfo' placeholder="请输入商品名称" @keyup.enter="searchGoods" value="寻找商品" />
          </form>
        </div>
        <div class="search_icon">
          <img :src="searchImg" />
        </div>
        <router-link :to="{ name: 'searchGoods', params: { searchInfo: getsearchInfo }}">
          <div class="search_right pointer">搜索</div>
        </router-link>
      </div>
      <div class="top_state_login" v-if="loginState">
        <span>{{NewUserName}}</span>
        <span class="pointer" @click="logout">注销</span>
      </div>
      <div class="top_state" id="login-state" v-if="!loginState">
        <div class="login-btn pointer" @click="login">登&nbsp;&nbsp;录</div>
        <div>/</div>
        <div class="pointer" @click="register">注&nbsp;册</div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/components/modal'
export default {
  data() {
    return {
      mdShow: false,
      userName: '',
      searchInfo: '',
      logo: require('../assets/img/header/logo.png'),
      searchImg: require('../assets/img/header/search.png')
    }
  },
  components: {
    modal
  },
  computed: {
    getsearchInfo() {
      if (this.searchInfo) return this.searchInfo
      else return ' '
    },
    loginState: {
      get() {
        return this.$store.state.loginState
      },
      set(data) {
        this.$store.state.loginState = data
      }
    },
    NewUserName() {
      let reg1 = /(^| )+userName=+([^;]+.*?)/
      let reg2 = /(^| )+nickName=+([^;]+.*?)/
      let userName = document.cookie.match(reg1)
      let nickName = document.cookie.match(reg2)
   console.log(userName,nickName)
      if (nickName[2]!='null') return nickName[2]
      else if (userName[2]!='null') return userName[2]
      else return null
    }
  },

  methods: {
    welcome() {
      this.$router.push({ path: '/' })
    },
    login() {
      this.$store.state.userPanel = {
        show: true,
        state: 'login'
      }
    },
    register() {
      this.$store.state.userPanel = {
        show: true,
        state: 'register'
      }
    },
    logout() {
      this.$axios
        .post(this.$store.state.server + '/user/logout')
        .then(res => {
          var d = new Date()
          d.setHours(d.getHours() - 1 * 24)
          document.cookie = 'userName=' + ';expires=' + d + ';path=/;'
          document.cookie = 'nickName=' + ';expires=' + d + ';path=/;'
          document.cookie = 'userId=' + ';expires=' + d + ';path=/;'
          this.$router.push('/home')
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchGoods() {
      this.$router.push({
        name: 'searchGoods',
        params: { searchInfo: this.getsearchInfo }
      })
    },
    addSeekingInterception() {
      if (this.loginState) {
        this.$router.push('/home/addSeeking')
      } else {
        this.mdShow = true
      }
    },
    addGoodsInterception() {
      if (this.loginState) {
        this.$router.push('/home/addGoods')
      } else {
        this.mdShow = true
      }
    },
    closeModal() {
      this.mdShow = false
    }
  },
  mounted() {
    let reg = /(^| )+userName=+([^;]+.*?)/
    let reg2 = /(^| )+userId=+([^;]+.*?)/
    let id = document.cookie.match(reg2)
    let name = document.cookie.match(reg)

    if (name) {
      this.loginState = true
      this.username = name[2]
      this.$store.state.userId = id[2]
    } else {
      this.loginState = false
    }
  }
}
</script>

<style scoped>
/*--------------------------------
顶部导航条*/

.top {
  width: 100%;
  height: 60px;
  background: #262b30;
  font-size: 17px;
  font-family: 'Microsoft YaHei', serif;
  color: #fff;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 1;
}

.top_logo {
  width: 214px;
  height: 50px;
  padding-left: 30px;
  padding-top: 10px;
  float: left;
}

.top_nav ul li {
  float: left;
  height: 60px;
  width: auto;
  line-height: 60px;
  margin-left: 50px;
}

.top_nav ul li a {
  position: relative;
  transition: color 0.3s;
  letter-spacing: 0.1em;
  color: #fff;
}

.top_nav ul li ::before {
  position: absolute;
  transform: translateX(5px);
  content: '[';
  left: -7px;
  opacity: 0;
  transition: opacity 0.2s, transform 0.3s;
}

.top_nav ul li ::after {
  position: absolute;
  content: ']';
  transform: translateX(-5px);
  opacity: 0;
  transition: opacity 0.2s, transform 0.3s;
}

.top_nav ul li a:hover {
  color: #7bb313;
  cursor: pointer;
}

.top_nav ul li a:hover::before {
  transform: translateX(-5px);
  opacity: 1;
}

.top_nav ul li a:hover::after {
  transform: translateX(5px);
  opacity: 1;
}

.top_search {
  width: 300px;
  height: 33px;
  position: absolute;
  right: 170px;
}
.top_search a {
  text-decoration: none;
  color: #fff;
}
.search_left {
  display: inline-block;
}

.search_left input {
  height: 34px;
  width: 150px;
  font-size: 14px;
  color: #757575;
  display: inline-block;
  margin-right: -5px;
  margin-top: 13px;
  padding-top: 1px;
  text-indent: 1em;
  border: none;
  outline: none;
}

.search_icon {
  width: 25px;
  height: 34px;
  line-height: 33px;
  background: #fff;
  display: inline-block;
  padding-bottom: 1px;
  margin-right: -5px;
}

.search_icon img {
  vertical-align: middle;
}

.search_right {
  position: relative;
  width: auto;
  height: 34px;
  line-height: 33px;
  padding: 0 10px;
  padding-bottom: 1px;
  background: #7bb313;
  display: inline-block;
}

.top_state {
  height: 60px;
  line-height: 60px;
  position: absolute;
  right: 30px;
}
.top_state_login {
  width: 150px;
  height: 60px;
  line-height: 60px;
  position: absolute;
  right: 20px;
}
.top_state div {
  float: right;
  margin-right: 10px;
}

.login-btn {
  border-radius: 10px;
  width: 80px;
  margin-top: 12px;
  height: 35px;
  line-height: 35px;
  background: #7bb313;
  text-align: center;
}
</style>
