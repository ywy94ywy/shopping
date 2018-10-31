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
    <div class="Goods">
      <div class="showpic">
        <div class="showpic">
          <ul id="list" style="left:-1470px">
            <li><img :src="nanshen3" alt=""></li>
            <li><img :src="nanshen1" alt=""></li>
            <li><img :src="nanshen2" alt=""></li>
            <li><img :src="nanshen3" alt=""></li>
            <li><img :src="nanshen1" alt=""></li>
          </ul>
          <div class="switch pre pointer" id="pre">&lt;</div>
          <div class="switch next pointer" id="next">&gt;</div>
          <div class="switch-dot">
            <ul id="switch-dot">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="sort_total">
        <div class="sort">
          <ul>
            <li class="jiage pointer" :class="currentSort=='price'?'sortActive':'null'" @click='priceSort'>价格
              <img v-if="currentSort!='price'" :src="imgPrice1" class="kong" />
              <img v-if="currentSort=='price'" :src="ascPrice?imgPrice2:imgPrice3" class="kong" />
            </li>
            <li class="dianji pointer" :class="currentSort=='click'?'sortActive':'null'" @click='clickSort'>点击
              <img :src="currentSort=='click'?imgClick2:imgClick1" class="kong" />
            </li>
            <li class="shijian pointer" :class="currentSort=='time'?'sortActive':'null'" @click='timeSort'>最新
              <img :src="currentSort=='time'?imgTime2:imgTime1" class="kong" />
            </li>
          </ul>
        </div>
        <div class="total">
          <img :src="img5" />找到相关商品总共
          <span>{{goodsNumber}}</span>个
        </div>
      </div>
      <div class="sell">
        <div class="goods" v-for="goods in goodsList" :key="goods.idgoods" @click="addClick(goods)">
          <div class="imgcontent">
            <img :src="imgsrc+goods.img" :alt="goods.goodsName" />
          </div>

          <div class="prise">¥{{goods.price}}</div>
          <div class="name_contact">
            <div class="name">{{goods.goodsName}}</div>
            <div class="add_to_shoppingcart pointer" @click.stop="addToCart(goods)">加入购物车</div>
          </div>
          <div class="stock_click">
            <div class="stock">库存数量
              <span>{{goods.stock}}</span>
            </div>
            <div class="click">点击数
              <span>{{goods.click}}</span>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script >
import modal from '@/components/modal'
export default {
  data() {
    return {
      server: this.$store.state.server,
      mdShow: false,
      goodsList: [],
      goodsNumber: 0,
      currentSort: 'null',
      ascPrice: true,
      imgsrc: this.$store.state.server + '/public/images/goods/',
      nanshen1: require('@/assets/img/content/public/nanshen1.jpg'),
      nanshen2: require('@/assets/img/content/public/nanshen2.jpg'),
      nanshen3: require('@/assets/img/content/public/nanshen3.jpg'),
      imgPrice1: require('@/assets/img/content/public/jiage_1.png'),
      imgPrice2: require('@/assets/img/content/public/jiage_2.png'),
      imgPrice3: require('@/assets/img/content/public/jiage_3.png'),
      imgClick1: require('@/assets/img/content/public/dianji_1.png'),
      imgClick2: require('@/assets/img/content/public/dianji_2.png'),
      imgTime1: require('@/assets/img/content/public/shijian_1.png'),
      imgTime2: require('@/assets/img/content/public/shijian_2.png'),
      img5: require('@/assets/img/content/public/zhaodao.png')
    }
  },
  watch: {
    $route(to, from) {
      var goodsType = this.$route.params.goodsType
      var searchInfo = this.$route.params.searchInfo
      if (goodsType)
        switch (goodsType) {
          case 'allGoods':
            this.getGoods('allGoods')
            break
          case 'transports':
            this.getGoods('transports')
            break
          case 'electronics':
            this.getGoods('electronics')
            break
          case 'livingGoods':
            this.getGoods('livingGoods')
            break
          case 'books':
            this.getGoods('books')
            break
          case 'sports':
            this.getGoods('sports')
            break
          case 'instruments':
            this.getGoods('instruments')
            break
          case 'rests':
            this.getGoods('rests')
            break
        }
      else if (searchInfo) {
        this.searchGoods(searchInfo)
      }
    }
  },
  components: {
    modal
  },
  methods: {
    closeModal() {
      this.mdShow = false
    },
    getGoods(Type) {
      this.currentSort = 'null'
      this.$axios
        .get(this.server + '/goods/' + Type)
        .then(res => {
          this.goodsList = res.data.result.list
          this.goodsNumber = this.goodsList.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchGoods(info) {
      this.currentSort = 'null'
      this.$axios
        .post(this.server + '/goods/searchGoods', { searchInfo: info })
        .then(res => {
          this.goodsList = res.data.result.list
          this.goodsNumber = this.goodsList.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    priceSort() {
      this.currentSort = 'price'
      if (this.ascPrice) {
        this.ascPrice = false
        this.goodsList.sort(function(a, b) {
          return b.price - a.price
        })
      } else {
        this.ascPrice = true
        this.goodsList.sort(function(a, b) {
          return a.price - b.price
        })
      }
    },
    clickSort() {
      this.currentSort = 'click'
      this.goodsList.sort(function(a, b) {
        return b.click - a.click
      })
    },
    timeSort() {
      this.currentSort = 'time'
      this.goodsList.sort(function(a, b) {
        return a.createdDateTime < b.createdDateTime ? 1 : -1
      })
    },
    addToCart(goods) {
      let idgoods = goods.idgoods
      this.$axios
        .post(this.server + '/shoppingCart/addToCart', {
          idgoods: idgoods
        })
        .then(res => {
          if (res.data.msg == '当前未登录！') {
            this.mdShow = true
          } else {
            alert('加入成功')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    addClick(goods) {
      var jgoods = JSON.stringify(goods)
      this.$router.push({ path: `/home/goodsDetails/${jgoods}` })
      this.$axios
        .post(this.server + '/addThings/addClick', {
          idgoods: goods.idgoods
        })
        .then(res => {
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      goods.click += 1
    },
    closeModal() {
      this.mdShow = false
    },
    showPicture() {
      var list = document.getElementById('list')
      var pre = document.getElementById('pre')
      var next = document.getElementById('next')
      var button = document
        .getElementById('switch-dot')
        .getElementsByTagName('li')
      var index = 0
      var myIndex = 0
      button[0].className = 'active'
      var animated = false
      function animate(offset) {
        var l = parseInt(list.style.left) + offset
        var time = 1470
        var interval = 15
        var speed = offset / (time / interval)
        function go() {
          if (
            (speed < 0 && parseInt(list.style.left) > l) ||
            (speed > 0 && parseInt(list.style.left) < l)
          ) {
            animated = true
            list.style.left = parseInt(list.style.left) + speed + 'px'
            setTimeout(go, interval)
          } else {
            animated = false
            if (parseInt(list.style.left) > -1470) {
              list.style.left = '-4410px'
            }
            if (parseInt(list.style.left) < -4410) {
              list.style.left = '-1470px'
            }
          }
        }
        go()
      }
      function btnIndex(index) {
        for (var a = 0; a < button.length; a++) button[a].className = ''
        button[index].className = 'active'
      }
      pre.onclick = function() {
        if (!animated) animate(1470)
        if (index == 0) {
          index = 2
        } else {
          index--
        }
        myIndex = index
        btnIndex(index)
      }
      next.onclick = function() {
        if (!animated) animate(-1470)

        if (index == 2) {
          index = 0
        } else {
          index++
        }
        myIndex = index
        btnIndex(index)
      }
      for (var i = 0; i < button.length; i++) {
        ;(function(i) {
          button[i].onclick = function() {
            if (!animated) {
              animate(1470 * (myIndex - i))
              myIndex = i
              btnIndex(i)
            }
          }
        })(i)
      }
      function s() {
        setInterval(function() {
          next.onclick()
        }, 4500)
      }
      setTimeout(function() {
        s()
      }, 3000)
      setTimeout(function() {
        next.onclick()
      }, 3000)
    }
  },
  mounted() {
    var self = this
    var path = this.$route.path
    var goodsType = this.$route.params.goodsType
    var searchInfo = this.$route.params.searchInfo
    if (path == '/home/Goods/allGoods' || path == '/home') {
      this.getGoods('allGoods')
    } else {
      let name = this.$route.name
      if (name == 'goods') {
        self.getGoods(goodsType)
      } else if (name == 'searchGoods') {
        self.searchGoods(searchInfo)
      }
    }
    this.showPicture()
  }
}
</script>

<style scoped>
.Goods {
  width: 1710px;
  box-sizing: border-box;
  height: auto;
  position: relative;
  background: #f7f7f7;
  left: 210px;
  top: 60px;
  padding-left: 44px;
  padding-top: 28px;
  border: 1px solid transparent;
}

.sort_total {
  width: 1460px;
  height: 60px;
  padding-left: 50px;
  margin-top: 10px;
  position: relative;
}

.sort {
  float: left;
  width: auto;
  height: 50px;
  padding-top: 10px;
  font-size: 0px;
}

.sort ul li {
  width: 63px;
  height: 37px;
  line-height: 37px;
  font-family: 微软雅黑, serif;
  color: #806f66;
  font-size: 17px;
  display: inline-block;
  padding-left: 10px;
  border: 2px solid #ccc;
}

.jiage {
  border-right: none !important;
}

.dianji {
  border-right: none !important;
}

.shijian {
  color: inhret;
}
.sortActive {
  background: #f1edec;
  color: red !important;
}
.kong {
  margin-left: 5px;
}

.total {
  width: 322px;
  height: 45px;
  float: right;
  color: #c9caca;
  font-size: 20px;
  margin-right: 100px;
  border-bottom: 3px solid #cacaca;
}

.total span {
  display: inline-block;
  text-align: center;
  font-size: 28px;
  color: #7bb313;
  width: 100px;
}

.sell {
  width: 1436px;
  height: auto;
  padding-top: 21px;
  margin-left: 30px;
}

.goods {
  max-width: 277px;
  height: 300px;

  font-family: 微软雅黑, serif;
  text-align: center;
  display: inline-block;
  margin-left: 50px;
  margin-bottom: 30px;
  padding-top: 10px;
  background: #fff;
  outline: 5px solid transparent;
  transition: outline 0.5s;
}
.imgcontent {
  width: 257px;
  height: 192px;
  vertical-align: middle;
  display: table-cell;
}
.imgcontent img {
  max-width: 257px;
  max-height: 192px;
}
.goods:hover {
  outline: 5px solid #7bb313;
}

.prise {
  color: red;
  width: 257px;
  height: 41px;
  line-height: 41px;
  text-align: left;
  font-size: 25px;
  letter-spacing: 0.1em;
  padding-left: 20px;
}

.name_contact {
  width: 257px;
  height: 33px;
  line-height: 28px;
  margin: 0 auto;
}

.name {
  color: #009b4c;
  float: left;
  font-weight: bold;
  height: 33px;
  font-size: 18px;
  padding-left: 20px;
}

.add_to_shoppingcart {
  color: #009b4c;
  border: solid 1px #009b4c;
  float: right;
  width: 80px;
  height: 28px;
  text-align: center;
  font-size: 15px;
  padding: 0 10px;
  margin-top: -10px;
  margin-right: 10px;
  transition: background-color, color 0.3s ease;
}
.add_to_shoppingcart:hover {
  color: #fff;
  background-color: #009b4c;
}
.stock_click {
  clear: both;
  width: 257px;
  height: 28px;
  font-size: 13px;
  line-height: 28px;
  margin: 0 auto;
}

.stock {
  float: left;
  text-align: left;
  color: #b6b6b7;
  width: 118px;
  height: 28px;
  border-top: 1px solid #cacaca;
  border-right: 1px solid #cacaca;
  padding-left: 10px;
}

.click {
  color: #b6b6b7;
  text-align: left;
  float: right;
  width: 118px;
  height: 28px;
  border-top: 1px solid #cacaca;
  padding-left: 10px;
}

.showpic {
  width: 1470px;
  height: 302px;
  position: relative;
  overflow: hidden;
}
.showpic ul {
  width: 7430px;
  height: 302px;
  position: absolute;
}
.showpic ul li {
  width: 1470px;
  height: 302px;
  float: left;
}
.showpic ul li img {
  width: 1470px;
  height: 302px;
}
.switch {
  width: 50px;
  height: 90px;
  line-height: 90px;
  text-align: center;
  background: #000;
  position: absolute;
  color: #fff;
  font-size: 40px;
  top: 50%;
  margin-top: -45px;
  opacity: 0.5;
}
.switch-dot {
  width: 100px;
  height: 20px;
  position: absolute;
  bottom: 10px;
  right: 40px;
}
.switch-dot ul li {
  width: 15px;
  height: 15px;
  margin-left: 20px;
  background: #fff;
  opacity: 0.5;
  cursor: pointer;
}
.switch-dot ul li:hover {
  opacity: 0.8;
}
.pre {
  left: 0;
}
.next {
  right: 0;
}
.pre:hover,
.next:hover {
  opacity: 0.8;
}
.active {
  opacity: 0.8 !important;
}
</style>
