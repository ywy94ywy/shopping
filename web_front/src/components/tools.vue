<template>
  <transition name="tool">
    <div class="right" v-if="loginState">
      <router-link to="/home/person">
        <div class="right_content">
          <div class="right_logo1">
            <div class="right_img1">
            </div>
          </div>
        </div>
      </router-link>
      <div class="right_content" @click="shoppingCar">
        <div class="right_logo2">
          <div class="right_img2">
          </div>
        </div>
      </div>
      <router-link to="/home/order">
        <div class="right_content">
          <div class="right_logo5">
            <div class="right_img5">
            </div>
          </div>
        </div>
      </router-link>
      <router-link to="/home/addSeeking">
        <div class="right_content">
          <div class="right_logo3">
            <div class="right_img3">
            </div>
          </div>
        </div>
      </router-link>
      <router-link to="/home/addGoods">
        <div class="right_content">
          <div class="right_logo4">
            <div class="right_img4">
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </transition>
</template>

<script>
export default {
  computed: {
    loginState: {
      get() {
        return this.$store.state.loginState
      },
      set(data) {
        this.$store.state.loginState = data
      }
    }
  },
  methods: {
    shoppingCar() {
      this.$store.state.shoppingCart = true
    }
  }
}
</script>

<style >
.tool-enter-active,
.tool-leave-active {
  transition: all 1s ease;
}
.tool-enter,
.tool-leave-to {
  transform: translateX(40px);
  opacity: 0;
}
.right {
  position: fixed;
  right: 30px;
  top: 100px;
  z-index: 1;
  border: 1 solid #000;
}

.right_content {
  width: auto;
  height: 65px;
  display: block;
  margin: 20px 0;
}

.right_logo1,
.right_logo2,
.right_logo3,
.right_logo4,
.right_logo5 {
  position: relative;
  float: right;
  width: 65px;
  height: 65px;
  background: #fff;
  border-radius: 32.5px;
  box-shadow: 5px 5px 5px #ccc;
  transition: width 0.5s;
}

.right_img1,
.right_img2,
.right_img3,
.right_img4,
.right_img5 {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  top: 18px;
}

.right_img1 {
  background: url(../assets/img/right/xinxi.png) no-repeat;
}

.right_logo1:hover .right_img1 {
  background: url(../assets/img/right/xinxi2.png) no-repeat;
}

.right_img2 {
  background: url(../assets/img/right/gouwu.png) no-repeat;
}

.right_logo2:hover .right_img2 {
  background: url(../assets/img/right/gouwu2.png) no-repeat;
}

.right_img3 {
  background: url(../assets/img/right/shuxie.png) no-repeat;
}

.right_logo3:hover .right_img3 {
  background: url(../assets/img/right/shuxie2.png) no-repeat;
}

.right_img4 {
  background: url(../assets/img/right/feiji.png) no-repeat;
}

.right_logo4:hover .right_img4 {
  background: url(../assets/img/right/feiji2.png) no-repeat;
}
.right_img5 {
  background: url(../assets/img/right/order1.png) no-repeat;
}

.right_logo5:hover .right_img5 {
  background: url(../assets/img/right/order2.png) no-repeat;
}

.right_logo1::before,
.right_logo2::before,
.right_logo3::before,
.right_logo4::before,
.right_logo5::before {
  position: absolute;
  top: 19px;
  left: 17px;
  font-size: 20px;
  font-family: 微软雅黑, serif;
  letter-spacing: 0.1em;
  color: #fff;
  opacity: 0;
  transition: opacity 0.5s;
}

.right_logo1::before {
  content: '个人信息';
}

.right_logo2::before {
  content: '购物车';
  top: 17px;
  left: 20px;
  font-size: 22px;
  letter-spacing: 0.2em;
}

.right_logo3::before {
  content: '发布求购';
}

.right_logo4::before {
  content: '发布商品';
}
.right_logo5::before {
  content: '我的订单';
}

.right_logo1:hover,
.right_logo2:hover,
.right_logo3:hover,
.right_logo4:hover,
.right_logo5:hover {
  width: 160px;
  background: #7ab312;
}

.right_logo1:hover::before,
.right_logo2:hover::before,
.right_logo3:hover::before,
.right_logo4:hover::before,
.right_logo5:hover::before {
  opacity: 1;
}
</style>
