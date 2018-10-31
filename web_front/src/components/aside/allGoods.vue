<template>
  <div class="sell">
    <div class="goods" v-for="goods in goodsList" :key="goods.id">
      <img id="test5" :src="imgsrc+goods.img" width="257px" height="192px" />
      <div class="prise">¥{{goods.price}}</div>
      <div class="name_contact">
        <div class="name">{{goods.name}}</div>
        <div class="contact">{{goods.contact}}</div>
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
<button @click='test'>sadsad</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgsrc: 'http://localhost:3000/public/images/goods/',
      goodsList: [],
      goodsNumber: 0
    }
  },
  methods: {
    getAll() {
      this.$axios
        .get('http://localhost:3000/goods')
        .then(res => {
          this.goodsList = res.data.result.list
          this.goodsNumber = this.goodsList.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    getTransports() {
      this.$axios
        .get('http://localhost:3000/goods/daibugongju')
        .then(res => {
          this.goodsList = res.data.result.list
          this.goodsNumber = this.goodsList.length
        })
        .catch(err => {
          console.log(err)
        })
    },
    goodsSort(s) {
      if (s == 'asc') {
        this.goodsList.sort(function(a, b) {
          return a.price - b.price
        })
      } else if (s == 'desc') {
        this.goodsList.sort(function(a, b) {
          return b.price - a.price
        })
      }
    },
    clickSort() {
      this.goodsList.sort(function(a, b) {
        return b.click - a.click
      })
    },
    timeSort() {
      this.goodsList.sort(function(a, b) {
        return a.createdDate < b.createdDate ? 1 : -1
      })
    }
  },
  mounted() {
    
    this.getAll()
     
  }
}
</script>

<style>

</style>
