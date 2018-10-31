<template>
    <div class="main">
        <div class="title">
            <div class="left-title">
                <p>校园代送</p>
            </div>
            <div class="right-title">
                <p>当面交易</p>
            </div>
        </div>
        <div class="content">
            <div class="content-left">
                <div class="goods-delivery" v-for="(d,index) in delivery" :key="index">
                    <div class="delivery-img">
                        <img :src="imgsrc+d.img" alt="">
                    </div>
                    <div class="delivery-space">订单号:<span>{{d.iduo}}</span></div>
                    <div class="delivery-row">单价
                        <span class="r">¥{{d.price}}</span>
                    </div>
                    <div class="delivery-row">数量
                        <span>{{d.number}}</span>
                    </div>
                    <div class="delivery-row">代送费
                        <span class="r">+5</span>
                    </div>
                    <div class="delivery-name">{{d.goodsName}}</div>
                    <div class="delivery-price">¥{{d.number*d.price+5}}</div>
                </div>
            </div>
            <div class="content-right">
                <div v-for="(d,index) in directly" :key="index">
                    <div class="goods-directly">
                        <div class="delivery-img">
                            <img :src="imgsrc+d.img" alt="">
                        </div>
                        <div class="delivery-space">订单号:<span>{{d.iduo}}</span></div>
                        <div class="delivery-row">单价
                            <span class="r">¥{{d.price}}</span>
                        </div>
                        <div class="delivery-row">数量
                            <span>{{d.number}}</span>
                        </div>
                        <div class="delivery-row">总计
                            <span><img src="../assets/img/order/row.png" alt=""></span>
                        </div>
                        <div class="delivery-name">{{d.goodsName}}</div>
                        <div class="delivery-price">¥{{d.number*d.price+5}}</div>
                    </div>
                    <div class="goods-message">
                      <div class="message-row">卖家联系方式：
                        </div>
                        <div class="message-row">用户
                            <span>{{d.nickName?d.nickName:'无'}}</span>
                        </div>
                        <div class="message-row">手机
                            <span>{{d.telephone?d.telephone:'无'}}</span>
                        </div>
                        <div class="message-row">QQ
                            <span>{{d.qq?d.qq:'无'}}</span>
                        </div>
                        <div class="message-row">wechat
                            <span>{{d.wechat?d.wechat:'无'}}</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
        <div class="order-bottom"></div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      imgsrc: this.$store.state.server + '/public/images/goods/',
      delivery: [],
      directly: []
    }
  },
  computed:{
nickName() {
      if (this.directly.nickName) return this.directly.nickName
      else {
        return this.directly.userName
      }
    }
  },
  methods: {
    getOrders() {
      this.$axios
        .get(this.$store.state.server + '/user/getOrders')
        .then(res => {
          for (var i in res.data.result) {
            if (res.data.result[i].trading == '校园代送')
              this.delivery.push(res.data.result[i])
            else this.directly.push(res.data.result[i])
          }
          console.log(this.delivery, this.directly)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getOrders()
  }
}
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.main {
  width: 1710px;
  color: rgb(150, 150, 150);
  font-size: 18px;
  position: relative;
  background: #f7f7f7;
  padding: 30px 50px;
  left: 210px;
  top: 60px;
  border: 1px solid transparent;
}
.title {
  width: 1480px;
  height: 77px;
  font-size: 20px;
  background: #f8ffed;
}
.left-title {
  width: 740px;
  height: 77px;
  float: left;
}
.title p {
  width: 175px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #000;
  border-bottom: 2px solid #629600;
  margin: 15px auto;
}
.right-title {
  width: 740px;
  height: 77px;
  float: right;
}
.content {
  width: 1480px;
  background: #f8ffed;

  overflow: hidden;
}
.content-left {
  width: 740px;
  border-right: 2px dashed #629600;
  float: left;
}
.goods-delivery {
  width: 304px;
  height: 200px;
  background: #fff;
  margin: 44px 0 0 47px;
  float: left;
  overflow: hidden;
  border: 2px solid #629600;
}
.delivery-img {
  width: 160px;
  height: 150px;
  float: left;
}
.delivery-img img {
  max-width: 160px;
  max-height: 150px;
}
.delivery-space {
  width: 140px;
  height: 45px;
  line-height: 45px;
  float: right;
}
.delivery-row {
  padding: 5px 10px;
  width: 140px;
  height: 35px;
  float: right;
  color: #000;
  font-size: 16px;
   border-bottom: 1px solid #629600;
}
.delivery-row span {
  float: right;
}
.r {
  color: red;
}
.delivery-name {
  width: 140px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  float: left;
  color: #fff;
  background: #629600;
}
.delivery-price {
  width: 160px;
  height: 35px;
  float: right;
  text-align: right;
  padding: 10px 10px;
  color: red;
  border-bottom: 2px solid #629600;
}
.content-right {
  width: 740px;

  float: right;
}
.goods-directly {
  width: 304px;
  height: 200px;
  background: #fff;
  margin: 44px 0 0 47px;
  float: left;
   border: 2px solid #629600;
}
.goods-message {
  width: 304px;
  height: 200px;
  background: #fff;
  margin: 44px 0 0 47px;
  padding: 8px 0;
  float: left;
   border: 2px solid #629600;
}
.message-row {
  padding: 5px 20px;
  width: 300px;
  height: 35px;
  float: right;
  color: #000;
  font-size: 16px;
    border-bottom: 1px solid #629600;
}
.message-row span {
    float: right;
}
.order-bottom {
  width: 1480px;
  height: 160px;
  background: #f8ffed;
}
</style>
