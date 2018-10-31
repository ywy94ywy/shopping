<template>
  <div>
    <modal :mdShow="mdShow">
      <div class="msgBox">
        <p class="message">确认删除所选商品吗？</p>
        <div class="twoButton">
          <button class="btn btn-1 pointer" @click="confirm">确定</button>
          <button class="btn btn-2 pointer" @click="closeModal">关闭</button>
        </div>
      </div>
    </modal>
    <transition name="cover">
      <div class="bg" v-if="shoppingCart" @click="close">
      </div>
    </transition>
    <transition name="shoppingCart">
      <div class="shoppingcart-content" v-if="shoppingCart">
        <!-- 购物车主体 -->
        <div class="shopping-car">
          <div>
            <img class="car" src="../../assets/img/shoppingCar/car.png" alt="car">
            <div class="my-car">
              <p>我的购物车</p>
              <p>MY SHOPPING CART</p>
            </div>
            <p class="shopping-x pointer" @click="close">x</p>
          </div>
          <br>
          <div class="shopping-content">
            <div class="shopping-title">
              <div class="shopping-info">商品信息</div>
              <div class="shopping-trading">交易方式</div>
              <div class="shopping-number">数量</div>
              <div class="shopping-price">单价</div>
              <div class="shopping-tprice">价格</div>
              <div class="shopping-opration">操作</div>
            </div>
            <div class="shopping-goods">
              <div class="shopping-good" v-for="goods in goodsList" :key="goods.idgoods">
                <div class="shopping-info">
                  <div class="select-goods"><input type="checkbox" v-model="goods.checked" @click="checkGoods(goods)" /></div>
                  <div class="imgcontent"><img :src="imgsrc+goods.img" alt="" /></div>
                  <div class="goods-info">
                    <p class="goods-name">{{goods.goodsName}}</p>
                    <br>
                    <p class="goods-stock"></p>
                    <p class="goods-stock">库存：{{goods.stock}}</p>
                  </div>
                  <div class="goods-trading">
                    <select name="" id="" v-model="goods.trading" @change="updateTrading(goods)">
                      <option value="校园代送">校园代送</option>
                      <option value="当面交易">当面交易</option>
                    </select>
                  </div>
                </div>
                <div class="shopping-number">
                  <div class="shopping-number-center">
                    <div class="reduce pointer" @click="number('reduce',goods)">一</div>
                    <input class="goods-number" type="text" v-model="goods.number" @keyup="number(null,goods)">
                    <div class="add pointer" @click="number('add',goods)">十</div>
                  </div>
                </div>
                <div class="shopping-price">¥{{goods.price}}

                </div>
                <div class="shopping-tprice">¥{{goods.trading=='校园代送'?goods.number*goods.price+5:goods.number*goods.price}}
                  <p v-if="goods.trading=='校园代送'">
                    <span>代送费：</span>+5</p>
                </div>
                <div class="shopping-opration">
                  <div class="delete-goods pointer" @click="deleteFromCart(goods)">删除</div>
                </div>
              </div>
            </div>
          </div>
          <br/>
          <div class="delete-all"><input type="checkbox" v-model="checkAll" @click="allChecked" />
            <span class="pointer" @click="allChecked">全选</span>
            <span class="pointer" @click="mdShow='true'">批量删除</span>
          </div>
          <div class="total-price">总金额：
            <span>¥{{totalPrice}}</span>
          </div>
          <br/>
          <div>
            <div class="shopping-back pointer" @click="close">再逛逛</div>
            <div class="shopping-buy pointer" @click="jiesuan">去结算</div>
          </div>
        </div>
        <!-- END购物车主体 -->
        <!-- 购物车地址 -->
        <div class="shopping-address">
          <div class="address-title">
            <img class="address-logo" src="../../assets/img/shoppingCar/address.png" alt="car">
            <div class="my-address">
              <p>我的地址</p>
              <p>MY SHOPPING CART</p>
            </div>
          </div>
          <div class="address-wrap">
            <div class="address pointer" :class="a.defaultAddress?'default-border':''" v-for="(a,index) in addressList" :key="index" @click="selectAddress(a)">
              <img src="../../assets/img/order/垃圾桶.png" alt="" @click.stop="deleteAddress(a)">
              <p>{{a.address}}</p>
              <p class="default-hint" v-if="a.defaultAddress">默认地址</p>
            </div>
          </div>
          <div class="new-address " v-if="alter">
            <div class="alter">
              <input type="text" @keyup.enter="submit" v-model="address">
              <button class="pointer" @click="submit">确认</button>
              <button class="pointer" @click="cancelAlter">取消</button>
            </div>
          </div>
          <div class="new-address pointer" v-if="!alter" @click="alterbtn">
            <img src="../../assets/img/order/添加地址.png" alt="">
          </div>
        </div>
        <!-- END购物车地址 -->
      </div>
    </transition>
  </div>
</template>

<script>
import modal from '@/components/modal'
export default {
  data() {
    return {
      address: '',
      mdShow: false,
      checkAll: false,
      imgsrc: this.$store.state.server + '/public/images/goods/',
      goodsList: [],
      alter: false,
      addressList: [],
      goodsNumber: 1
    }
  },
  components: {
    modal
  },
  computed: {
    shoppingCart: {
      get() {
        return this.$store.state.shoppingCart
      },
      set(data) {
        this.$store.state.shoppingCart = data
      }
    },
    totalPrice() {
      let sum = 0
      for (var index in this.goodsList) {
        let goods = this.goodsList[index]
        if (goods.number <= goods.stock && goods.number > 0) {
        } else {
          alert('数量超出范围！')
          goods.number = 1
        }
        if (goods.checked) {
          if (goods.trading == '校园代送') sum += goods.number * goods.price + 5
          else {
            sum += goods.number * goods.price
          }
        }
      }
      return sum
    }
  },
  watch: {
    shoppingCart(curVal, oldVal) {
      if (curVal) {
        this.getAddress()
        this.getGoods()
      }
    }
  },
  methods: {
    close() {
      this.shoppingCart = false
    },
    getGoods() {
      this.$axios
        .get(this.$store.state.server + '/shoppingCart')
        .then(res => {
          this.goodsList = res.data.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteFromCart(goods) {
      let idgoods = goods.idgoods
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/deleteFromCart', {
          idgoods: idgoods
        })
        .then(res => {
          console.log(res.data.result)
          this.getGoods()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteInBatches() {
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/deleteInBatches')
        .then(res => {
          console.log(res.data.result)
          this.getGoods()
        })
        .catch(err => {
          console.log(err)
        })
    },
    number(cal, goods) {
      if (cal == 'add') {
        if (goods.number < goods.stock) goods.number++
      } else if (cal == 'reduce') {
        if (goods.number > 1) goods.number--
      }
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/updateNumber', {
          number: goods.number,
          idgoods: goods.idgoods
        })
        .then(res => {})
        .catch(err => {
          console.log(err)
        })
    },
    updateTrading(goods) {
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/updateTrading', {
          trading: goods.trading,
          idgoods: goods.idgoods
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkGoods(goods) {
      let checked = -1
      if (goods.checked || goods.checked == 1) {
        checked = 0
      } else {
        checked = 1
      }
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/updateCheck', {
          checked: checked,
          idgoods: goods.idgoods
        })
        .then(res => {})
        .catch(err => {
          console.log(err)
        })
    },
    allChecked() {
      let checked = -1
      this.checkAll = !this.checkAll
      if (this.checkAll) {
        checked = 1
      } else {
        checked = 0
      }
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/allChecked', {
          checked: checked
        })
        .then(res => {
          this.getGoods()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    confirm() {
      this.deleteInBatches()
      this.mdShow = false
    },
    closeModal() {
      this.mdShow = false
    },
    alterbtn() {
      this.alter = true
    },
    cancelAlter() {
      this.alter = false
    },
    getAddress() {
      this.$axios
        .get(this.$store.state.server + '/shoppingCart/getAddress')
        .then(res => {
          var t
          for (var i in res.data.result) {
            if (res.data.result[i].defaultAddress == 1) {
              t = res.data.result[0]
              res.data.result[0] = res.data.result[i]
              res.data.result[i] = t
            }
          }
          this.addressList = res.data.result
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteAddress(a) {
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/deleteAddress', {
          idaddress: a.idaddress
        })
        .then(res => {
          this.getAddress()
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectAddress(a) {
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/selectAddress', {
          idaddress: a.idaddress
        })
        .then(res => {
          this.getAddress()
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit() {
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/addAddress', {
          address: this.address
        })
        .then(res => {
          this.getAddress()
          this.alter = false
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDateTime() {
      var a = new Date().toJSON().replace(/T/, ' ')
      var b = /(\S*\s*\S*)\./i
      return a.match(b)[1]
    },
    jiesuan() {
      var time = this.getDateTime()
      var arr = []
      for (var i in this.goodsList) {
        if (this.goodsList[i].checked) {
          arr.push(this.goodsList[i])
        }
      }
      this.$axios
        .post(this.$store.state.server + '/shoppingCart/jiesuan', {
          goods: arr,
          time: time
        })
        .then(res => {
          this.close()
          alert(arr.length + '件商品订购成功')
          this.$router.push('/home/order')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {}
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
.shoppingCart-enter-active,
.shoppingCart-leave-active {
  transition: all 0.5s ease;
}
.shoppingCart-enter,
.shoppingCart-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  opacity: 0.5;
  background: #2b2b2b;
}
.shoppingcart-content {
  position: fixed;
  width: 1470px;
  height: 750px;
  z-index: 101;
  left: 50%;
  top: 50%;
  margin-left: -735px;
  margin-top: -375px;
}
.shopping-address {
  width: 370px;
  height: 650px;
  z-index: 101;
  float: left;
  background: white;
  box-shadow: 0px 0px 30px #333;
  font-family: '微软雅黑';
}
.address-title {
  width: 370px;
  height: 98px;
}
.address:nth-child(1) {
  margin-top: 0px;
}
.address {
  width: 300px;
  height: 100px;
  background: #f8ffed;
  margin: 30px 0 0 35px;
  padding: 10px 18px;
  box-sizing: border-box;
  overflow: hidden;
}
.address img {
  float: right;
}
.address p:nth-of-type(1) {
  height: 47px;
  clear: both;
}
.default-border {
  border: 2px solid #629600;
}
.address .default-hint {
  font-size: 14px;
  color: #629600;
}
.address-wrap {
  width: 370px;
  max-height: 380px;
  overflow: auto;
}
.new-address {
  width: 300px;
  height: 100px;
  padding-top: 10px;
  /* border: 1px solid #ccc; */
  background: #f8ffed;
  box-sizing: border-box;
  margin: 30px 0 0 35px;
  text-align: center;
}
.new-address .alter {
  width: 264px;
  display: block;
  height: 60px;
  line-height: 30px;
  margin: 25px auto;
}
.new-address input {
  width: 150px;
  height: 30px;
  border: none;
  border: 1px solid black;
  float: left;
}
.new-address button {
  width: 50px;
  height: 32px;
  background: #009b4c;
  border: none;
  color: #fff;
  float: left;
  margin-left: 5px;
}
.address-logo {
  float: left;
  margin-left: 45px;
  margin-top: 35px;
}
.my-address {
  float: left;
  margin-left: 10px;
  margin-top: 35px;
}
.shopping-car {
  width: 1100px;
  height: 750px;
  z-index: 101;
  float: right;
  background: white;
  box-shadow: 0px 0px 30px #333;

  font-family: '微软雅黑';
}
.car {
  float: left;
  margin-left: 60px;
  margin-top: 35px;
}
.my-car {
  float: left;
  margin-left: 10px;
  margin-top: 35px;
}
.shopping-x {
  font-family: Arial;
  font-size: 40px;
  float: right;
  margin-right: 30px;
  margin-top: 25px;
  opacity: 0.7;
}
.shopping-x:hover {
  opacity: 1;
}
.shopping-content {
  width: 1020px;
  margin: 0 auto;
}
.shopping-title {
  margin-top: 10px;
  width: 1020px;
  height: 34px;
  color: white;
  line-height: 34px;
  background: #629600;
  border: 1px solid transparent;
}
.shopping-title div {
  float: left;
}

.shopping-title .shopping-info {
  width: 140px;
  padding-left: 110px;
  float: left;
}
.shopping-title .shopping-trading {
  width: 150px;
  text-align: center;
  float: left;
}
.shopping-goods .shopping-info {
  width: 400px;
  float: left;
  display: table;
}
.select-goods {
  width: 30px;
  height: 150px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.imgcontent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 150px;
}
.imgcontent img {
  max-width: 150px;
  height: 120px;
}
.goods-info {
  width: 100px;
  height: 150px;
  position: relative;
  float: left;
}
.goods-trading {
  width: 100px;
  height: 150px;
  float: left;
  line-height: 150px;
  text-align: center;
}
.goods-name {
  position: absolute;
  color: #009b4c;
  font-size: 18px;
  top: 55px;
}
.goods-stock {
  position: absolute;
  height: 1em;
  bottom: 30px;
  color: #b1b1b1;
}
.shopping-title .shopping-number {
  width: 170px;
  text-align: center;
  float: left;
}
.shopping-goods .shopping-number {
  width: 170px;
  text-align: center;
  float: left;
}
.shopping-title .shopping-price {
  width: 115px;
  text-align: center;
  float: left;
}
.shopping-goods .shopping-price {
  width: 115px;
  text-align: center;
  line-height: 150px;
  float: left;
  color: red;
  font-size: 25px;
  font-family: arial;
}

.shopping-title .shopping-tprice {
  width: 165px;
  text-align: center;
  float: left;
}
.shopping-goods .shopping-tprice {
  width: 165px;
  text-align: center;
  line-height: 150px;
  float: left;
  color: red;
  font-size: 25px;
  font-family: arial;
  position: relative;
}
.shopping-goods .shopping-tprice span {
  color: #b1b1b1;
  font-size: 15px;
}
.shopping-goods .shopping-tprice p {
  position: absolute;
  color: red;
  font-size: 20px;
  top: 30px;
  left: 50px;
}
.shopping-title .shopping-opration {
  width: 115px;
  padding-left: 55px;
  float: left;
}
.shopping-goods .shopping-opration {
  width: 150px;
  float: left;
}
.shopping-goods {
  width: 1020px;
  height: 450px;
  overflow: auto;
}
.shopping-good {
  height: 150px;
  border-bottom: 1px solid #ccc;
}

.shopping-number-center {
  width: 110px;
  height: 22px;
  margin: 64px auto;
}

.reduce {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 1px solid black;
  border-radius: 10px;
  font-family: '微软雅黑';
  text-align: center;
  float: left;
}
.goods-number {
  width: 50px;
  height: 20px;
  line-height: 20px;
  border: 1px solid transparent;
  background: #629600;
  color: white;
  border-radius: 10px;
  font-family: '微软雅黑';
  text-align: center;
  margin-left: 7px;
  float: left;
  outline: none;
}
.add {
  width: 20px;
  height: 20px;
  line-height: 20px;
  border: 1px solid black;
  border-radius: 10px;
  font-family: '微软雅黑';
  text-align: center;
  margin-left: 7px;
  float: left;
}
.delete-goods {
  width: 100px;
  height: 20px;
  border-radius: 10px;
  background: #629600;
  color: white;
  text-align: center;
  margin-left: 22px;
  margin-top: 64px;
}
.delete-all {
  width: 150px;
  height: 50px;
  float: left;
  margin-left: 50px;
}
.delete-all span {
  margin-right: 10px;
  margin-left: 3px;
}
.total-price {
  width: 500px;
  height: 50px;
  text-align: right;
  float: right;
  margin-right: 70px;
}
.total-price span {
  color: red;
  font-size: 30px;
}
.shopping-back {
  width: 215px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 0.3em;
  border-radius: 25px;
  border: 1px solid black;
  text-align: center;
  float: left;
  margin-left: 80px;
  margin-top: 15px;
}
.shopping-back:hover {
  background: #e6e6e6;
  border: none;
}
.shopping-back::before {
  content: url(../../assets/img/shoppingCar/1.png);
  position: absolute;
  margin-left: -20px;
  margin-top: -2px;
}
.shopping-buy {
  width: 215px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  letter-spacing: 0.3em;
  border-radius: 25px;
  border: 1px solid transparent;
  background: #629600;
  color: white;
  text-align: center;
  float: right;
  margin-right: 80px;
  margin-top: 15px;
}
.shopping-buy::after {
  content: url(../../assets/img/shoppingCar/2.png);
  position: absolute;
  margin-left: 10px;
  margin-top: -2px;
}
</style>
