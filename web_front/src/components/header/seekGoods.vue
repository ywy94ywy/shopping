<template>
  <div class="transportation">

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
          <li class="shijian pointer" :class="currentSort=='time'?'sortActive':'null'" @click='timeSort'>最新
            <img :src="currentSort=='time'?imgTime2:imgTime1" class="kong" />
          </li>
        </ul>
      </div>
      <div class="total">
        <img :src="img5" />找到相关商品总共
        <span>{{seekingsNumber}}</span>个
      </div>
    </div>
    <div class="sell">
      <div class="info " :class="selectBg(index)" v-for="(seekings,index) in seekingsList" :key="seekings.idseekings">
        <div class="img"><img :src="selectSrc(seekings)" :alt="seekings.seekingsName" />
        </div>
        <div class="details">
          <div class="d-left">
            <p class="i-name">{{seekings.seekingsName}}</p>
            <p class="price-name">期望价格：
              <span class="price">¥{{seekings.price}}</span>
            </p>
            <p>交易方式：{{seekings.trading}}</p>
            <p>商品类别：{{seekings.category}}</p>
          </div>
          <div class="d-right">
            <div>详情描述：</div>
            <p class="">{{seekings.details}}</p>
          </div>
          <div class="d-bottom">
            <p>手机：{{seekings.telephone}} QQ：{{seekings.qq}} 微信：{{seekings.wechat}} </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      seekingsList: [],
      seekingsNumber: 0,
      currentSort: 'null',
      ascPrice: true,
      imgsrc: this.$store.state.server + '/public/images/goods/',
      imgPrice1: require('@/assets/img/content/public/jiage_1.png'),
      imgPrice2: require('@/assets/img/content/public/jiage_2.png'),
      imgPrice3: require('@/assets/img/content/public/jiage_3.png'),
      imgClick1: require('@/assets/img/content/public/dianji_1.png'),
      imgClick2: require('@/assets/img/content/public/dianji_2.png'),
      imgTime1: require('@/assets/img/content/public/shijian_1.png'),
      imgTime2: require('@/assets/img/content/public/shijian_2.png'),
      nanshen1: require('@/assets/img/content/public/nanshen1.jpg'),
      nanshen2: require('@/assets/img/content/public/nanshen2.jpg'),
      nanshen3: require('@/assets/img/content/public/nanshen3.jpg'),
      img5: require('@/assets/img/content/public/zhaodao.png'),
      books: require('@/assets/img/content/seekings/books.png'),
      electronics: require('@/assets/img/content/seekings/electronics.png'),
      instruments: require('@/assets/img/content/seekings/instruments.png'),
      livingGoods: require('@/assets/img/content/seekings/livingGoods.png'),
      rests: require('@/assets/img/content/seekings/rests.png'),
      sports: require('@/assets/img/content/seekings/sports.png'),
      transports: require('@/assets/img/content/seekings/transports.png')
    }
  },
  methods: {
    priceSort() {
      this.currentSort = 'price'
      if (this.ascPrice) {
        this.ascPrice = false
        this.seekingsList.sort(function(a, b) {
          return b.price - a.price
        })
      } else {
        this.ascPrice = true
        this.seekingsList.sort(function(a, b) {
          return a.price - b.price
        })
      }
    },
    timeSort() {
      this.currentSort = 'time'
      this.seekingsList.sort(function(a, b) {
        return a.createdDateTime < b.createdDateTime ? 1 : -1
      })
    },
    getSeekings() {
      this.currentSort = 'null'
      this.$axios
        .get(this.$store.state.server + '/seekings')
        .then(res => {
          this.seekingsList = res.data.result.list
          this.seekingsNumber = this.seekingsList.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    selectSrc(seekings) {
      if (seekings.img) {
        return this.imgsrc + seekings.img
      } else {
        switch (seekings.category) {
          case '书籍教材':
            return this.books
            break
          case '电子产品':
            return this.electronics
            break
          case '乐器':
            return this.instruments
            break
          case '生活用品':
            return this.livingGoods
            break
          case '其他':
            return this.rests
            break
          case '体育健身':
            return this.sports
            break
          case '代步工具':
            return this.transports
            break
        }
      }
    },
    selectBg(index) {
      switch (index % 4) {
        case 0:
          return 'info-img1'
          break
        case 1:
          return 'info-img2'
          break
        case 2:
          return 'info-img3'
          break
        case 3:
          return 'info-img4'
          break
      }
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
    this.getSeekings()
    this.showPicture()
  }
}
</script>

<style scoped>
.transportation {
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
  margin-left: 70px;
}
.sell .info {
  width: 1272px;
  height: 171px;
  margin-bottom: 40px;
  padding-left: 25px;
  padding-top: 20px;
}
.info-img1 {
  background: url('../../assets/img/content/seekings/1.png');
}
.info-img2 {
  background: url('../../assets/img/content/seekings/2.png');
}
.info-img3 {
  background: url('../../assets/img/content/seekings/3.png');
}
.info-img4 {
  background: url('../../assets/img/content/seekings/4.png');
}
.sell img {
  width: 170px;
  height: 145px;
  background: white;
  text-align: center;
  float: left;
}

.sell .details {
  width: 945px;
  height: 145px;
  font-family: 'Microsoft YaHei', serif;
  padding-left: 20px;
  float: left;
}
.d-left {
  width: 270px;
  height: 125px;
  float: left;
  line-height: 1.9rem;
}
.d-left p.i-name {
  color: #009b4c;
  font-size: 1.3rem;
  font-weight: bold;
}
.d-left p.price-name {
  font-size: 1.1rem;
}
.d-left span.price {
  font-size: 1.3rem;
  color: red;
  font-weight: bold;
  margin-left: 10px;
}
.d-right {
  width: 675px;
  height: 120px;
  padding-top: 5px;
  line-height: 1.7rem;
  float: left;
}
.d-right p {
  text-indent: 2em;
}
.d-bottom {
  width: 945px;
  height: 20px;

  clear: both;
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
