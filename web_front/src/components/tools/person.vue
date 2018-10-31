<template>
  <div class="person">

    <div class="brief" :style="'backgroundImage: url('+imgSchool+')'">
      <div class="brief-logo" :style="'backgroundImage: url('+imgSchoolIcon+')'"></div>
      <div class="big-i"></div>
      <div class="brief-introduction">
        <p> 简介</p>
        <p>ntroduction</p>
      </div>
      <div class="brief-person">
        <div class="person-green">
          <p>{{nickName}}</p>
        </div>
        <div class="person-grey">
          <p>共有{{releasedLength}}件商品，已卖出0件商品</p>

          <p>学校：南京审计大学</p>
        </div>
        <p>个性签名: </p>
        <p>{{user.sign}}</p>
      </div>
    </div>
    <div class="title-content">
      <router-link to="/home/person/personDetails">
        <div class="content-title ">个人资料</div>
      </router-link>
      <router-link to="/home/person/releasedGoods">
        <div class="content-title">发布的商品</div>
      </router-link>
      <router-link to="/home/person/releasedSeeking">
        <div class="content-title">发布的求购</div>
      </router-link>
      <router-link to="/home/person/soldGoods">
        <div class="content-title">售出的商品</div>
      </router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      releasedLength: 0,
      imgSchool: require('@/assets/img/content/person/school.png'),
      imgSchoolIcon: require('@/assets/img/content/person/schoolIcon.png'),
      user: []
    }
  },

  computed: {
    loginState() {
      return this.$store.state.loginState
    },
    nickName() {
      if (this.user.nickName) return this.user.nickName
      else {
        return this.user.userName
      }
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
        .get(this.$store.state.server + '/user/userInfo')
        .then(res => {
          this.user = res.data.result[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    getReleasedLength() {
      this.$axios
        .get(this.$store.state.server + '/user/getReleasedGoods')
        .then(res => {
          this.releasedLength = res.data.result.length
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getUserInfo()
    this.getReleasedLength()
    if (!this.$store.state.loginState) {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.person {
  width: 1710px;
  height: auto;
  position: relative;
  background: #f7f7f7;
  left: 210px;
  top: 60px;
  border: 1px solid transparent;
}
.brief {
  width: 1430px;
  height: 280px;
  margin-left: 40px;
  margin-top: 37px;
  background: #262b30 top right no-repeat;
  position: relative;
}
.brief-logo {
  width: 182px;
  height: 182px;
  background: #fff center no-repeat;
  position: absolute;
  left: 69px;
  top: 43px;
  border: 6px solid #ccc;
  border-radius: 107.5px;
}
.big-i {
  position: absolute;
  top: 0px;
  left: 300px;
  width: 7px;
  height: 74px;
  background: #fff;
}
.brief-introduction {
  position: absolute;
  top: 13px;
  left: 315px;
  color: #fff;
}
.brief-introduction p {
  font-size: 20px;
}
.brief-introduction p:first-child {
  font-size: 30px;
  letter-spacing: 0.3em;
}
.brief-person {
  position: absolute;
  left: 330px;
  top: 85px;
  color: #fff;
  line-height: 1.7;
}
.person-green {
  font-size: 27px;
  letter-spacing: 0.2em;
  color: #7bb313;
  font-weight: bold;
}
.person-grey {
  color: #ccc;
  margin: 0 0 5px;
}
.title-content {
  width: 1355px;
  height: 45px;
  margin-left: 60px;
  margin-top: 15px;
  border-bottom: 4px solid #069475;
}
.title-content a {
  width: 215px;
  height: 45px;
  float: left;
  color: #000;
}
.content-title {
  width: 215px;
  height: 45px;
  line-height: 45px;

  text-align: center;
  font-size: 18px;
  letter-spacing: 0.2em;
  float: left;
}
.router-link-active {
  background: #069475;
  color: white !important;
}
</style>
