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
    <div class="main">
      <div class="content">
        <div class="goods">
          <div class="goods-left"><img :src="imgsrc+cgoods.img" alt="123">
            <p class="click">点击数：
              <span>{{cgoods.click}}</span>
            </p>
            <p class="contact">联系人：
              <span>{{contact}}</span>
            </p>
          </div>
          <div class="goods-right">
            <div class="title">
              {{cgoods.goodsName}}
            </div>
            <div class="price">价格
              <span>¥</span>
              <span>{{cgoods.price}}</span>
            </div>
            <div class="sold">已售出
              <span>0</span> 累计评价
              <span>{{messages}}</span>
            </div>
            <div class="details">详情描述
              <p>{{cgoods.goodsDetails?cgoods.goodsDetails:'无'}}</p>
            </div>
            <div class="number">
              数量
              <span><input type="text" v-model="number">
                <span class="up-down">
                  <span class="up pointer" @click="alter('add')"></span>
                  <span class="down pointer" @click="alter('minus')"></span>
                </span>
              </span>
              <span>库存：{{cgoods.stock}}</span>
            </div>
            <div class="trade">交易方式
              <select name="" id="" v-model="trading">
                <option value="校园代送">校园代送</option>
                <option value="当面交易">当面交易</option>
              </select>
            </div>
            <button class="pointer" @click="addToCartDetails">加入购物车</button>
          </div>
        </div>
        <div class="messages">
          <div class="msg-title">用户留言</div>
          <div class="msg-details" v-if="msg==''">
            <p>无</p>
          </div>
          <div class="msg-details" v-for="(msg,index) in msg" :key="index">
            <p>{{msg.message}}</p>
            <p>
              <span>{{msg.createDate}}</span>
              <span>{{msg.nickName?msg.nickName:msg.userName}}</span>
            </p>
          </div>
          <div class="msg-title">提交留言</div>
          <div class="user-message">
            <textarea name="" id="" cols="80" rows="8" v-model="userMessage"></textarea>
          </div>
          <div class="user-message2">
            <button class="submit pointer" @click="reset">重写</button>
            <button class="submit pointer" @click="submit">提交</button>
          </div>
          <br>
        </div>
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
      userId: null,
      contact: '',
      userMessage: '',
      imgsrc: this.$store.state.server + '/public/images/goods/',
      goods: [],
      msg: [],
      trading: '校园代送',
      number: 1,
      messages:0
    }
  },
  components: { modal },
  computed: {
    cgoods: {
      get() {
        return this.goods
      },
      set(data) {
        this.goods = data
      }
    }
  },
  methods: {
    getGoodsDetails() {
      this.$axios
        .post(this.$store.state.server + '/goods/goodsDetails', {
          iduser: this.cgoods.iduser
        })
        .then(res => {
          console.log(res.data)
          let userName = res.data.result[0].userName
          let nickName = res.data.result[0].nickName
          if (nickName) {
            this.contact = nickName
            return
          }
          if (userName) this.contact = userName
        })
        .catch(err => {
          console.log(err)
        })
    },
    getMsg() {
      this.$axios
        .post(this.$store.state.server + '/goods/message', {
          idgoods: this.cgoods.idgoods
        })
        .then(res => {
          var reg = /[^T]+.*?/
          for (var i in res.data.result)
            res.data.result[i].createDate = res.data.result[i].createDate.match(
              reg
            )[0]
          this.msg = res.data.result
          this.messages = res.data.result.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    alter(way) {
      if (way == 'add') {
        if (this.number < this.cgoods.stock) this.number++
      } else if (way == 'minus') {
        if (this.number > 1) this.number--
      }
    },
    reset() {
      this.userMessage = ''
    },
    submit() {
      if (this.$store.state.loginState) {
      } else {
        this.mdShow = true
        return
      }
      if (!this.userMessage) {
        alert('请输入留言！')
        return
      }
      var iduser = this.$store.state.userId
      this.$axios
        .post(this.$store.state.server + '/user/submitMsg', {
          iduser: this.$store.state.userId,
          message: this.userMessage,
          idgoods: this.cgoods.idgoods
        })
        .then(res => {
          alert('提交成功')
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCartDetails() {
      if (this.$store.state.loginState) {
      } else {
        this.mdShow = true
        return
      }
      var iduser = this.$store.state.userId
      var idgoods = this.cgoods.idgoods
      var number = this.number
      var trading = this.trading
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/addToCartDetails', {
          idgoods: idgoods,
          iduser: iduser,
          number: number,
          trading: trading
        })
        .then(res => {
          alert('加入成功！')
        })
        .catch(err => {
          console.log(err)
        })
    },
    closeModal() {
      this.mdShow = false
    }
  },
  mounted() {
    this.cgoods = JSON.parse(this.$route.params.goods)
    this.getMsg()
    this.getGoodsDetails()
  }
}
</script>

<style scoped>
.main {
  width: 1710px;
  color: rgb(150, 150, 150);
  font-size: 18px;

  position: relative;
  background: #f7f7f7;
  left: 210px;
  top: 60px;
  border: 1px solid transparent;
}
.content {
  width: 1488px;

  margin-top: 28px;
  margin-left: 44px;
  background: #fff;
}
.goods {
  width: 1488px;
  height: 585px;
  background: url(../assets/img/goodsDetails/nanshen.png) right top no-repeat;
  overflow: hidden;
}
.goods-left {
  width: 650px;
  height: 585px;
  box-sizing: border-box;
  padding: 22px;
  float: left;
}
.goods-left img {
  max-width: 606px;
  height: 450px;
  display: block;
  margin: 0 auto;
}
.goods-left .click {
  width: 303px;
  height: 65px;
  line-height: 65px;
  box-sizing: border-box;
  padding-left: 80px;
  float: left;
}
.goods-left .click span {
  margin-left: 10px;
}
.goods-left .contact {
  width: 303px;
  height: 65px;
  line-height: 65px;
  box-sizing: border-box;
  text-align: right;
  padding-right: 80px;
  float: right;
}
.goods-left .contact span {
  margin-left: 10px;
}
.goods-right {
  width: 540px;
  height: 585px;

  box-sizing: border-box;
  padding-left: 25px;
  float: left;
}
.goods-right .title {
  font-size: 25px;
  height: 105px;
  color: rgb(50, 50, 50);
  box-sizing: border-box;
  padding-top: 60px;
}
.goods-right .price {
  height: 95px;
  line-height: 95px;
}
.goods-right .price span:nth-child(1) {
  margin-left: 30px;
  font-size: 25px;
  color: red;
}
.goods-right .price span:nth-child(2) {
  margin-left: 5px;
  font-size: 40px;
  color: red;
}
.goods-right .sold {
  width: 490px;
  height: 45px;
  line-height: 45px;
  border-top: 2px dotted rgb(150, 150, 150);
  border-bottom: 2px dotted rgb(150, 150, 150);
}
.goods-right .sold span {
  margin-left: 10px;
  color: red;
}
.goods-right .sold span:nth-child(1) {
  margin-right: 100px;
}
.goods-right .details {
  height: 140px;
  box-sizing: border-box;
  padding-top: 10px;
}
.goods-right .number {
  color: rgb(50, 50, 50);
  height: 45px;
  line-height: 40px;
}
.goods-right .number input {
  width: 50px;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid rgb(150, 150, 150);
  outline: none;
  text-align: center;
}
.goods-right .number span .up-down {
  width: 50px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
}
.goods-right .number span .up-down .up {
  height: 14px;
  display: block;
  background: url(../assets/img/goodsDetails/up.png) no-repeat;
}
.goods-right .number span .up-down .down {
  height: 14px;
  margin-top: 2px;
  display: block;
  background: url(../assets/img/goodsDetails/down.png) no-repeat;
}
.goods-right .number span:nth-of-type(2) {
  color: rgb(150, 150, 150);
  font-size: 15px;
}
.goods-right .trade {
  color: rgb(50, 50, 50);

  height: 45px;
  line-height: 45px;
}
.goods-right .trade select {
  width: 80px;
  height: 30px;
}
.goods-right .trade select option {
}
.goods-right button {
  width: 265px;
  height: 50px;
  border: none;
  background: #009b4c;
  margin-left: 40px;
  font-size: 20px;
  color: #fff;
}

.msg-title {
  width: 1488px;
  height: 54px;
  line-height: 54px;
  box-sizing: border-box;
  padding-left: 40px;
  background: rgb(240, 240, 240);
}
.msg-details {
  width: 1488px;
  box-sizing: border-box;
  border-bottom: 2px solid rgb(150, 150, 150);
  padding-left: 40px;
}
.msg-details p:first-child {
  width: 1400px;
  text-indent: 2em;
  word-wrap: break-word;
  margin: 15px 0;
}
.msg-details p:last-child {
  height: 30px;
}

.msg-details span:nth-of-type(1) {
  float: left;
}
.msg-details span:nth-of-type(2) {
  float: right;
  margin-right: 40px;
}
.user-message {
  width: 600px;
  margin: 20px 10px 20px 50px;
  float: left;
}
.user-message2 {
  width: 600px;
  margin: 20px 0px;
  float: left;
}

.submit {
  width: 100px;
  height: 48px;
  border: 1px solid #069475;
  background: #fff;
  color: #069475;
  text-align: center;
  display: block;
}
.submit:hover {
  background: #069475;
  color: #fff;
}
.submit:last-child {
  margin-top: 20px;
}
</style>
