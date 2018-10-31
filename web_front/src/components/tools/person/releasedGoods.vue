<template>
    <div>
        <modal :mdShow="mdShow">
            <div class="msgBox">
                <p class="message">确认下架所选商品吗？</p>
                <div class="twoButton">
                    <button class="btn btn-1 pointer" @click="confirm">确定</button>
                    <button class="btn btn-2 pointer" @click="closeModal">关闭</button>
                </div>
            </div>
        </modal>
        <div class="releasedGoods-details">
            <div class="releasedGoods-title">发布的商品</div>
            <div class="releasedGood" v-for="(goods,index) in releasedGoods" :key="index">
                <img :src="imgsrc+goods.img" :alt="goods.goodsName" class="releasedGood-img">
                <div class="releasedGood-details">
                    <p>
                        <span v-show="!goods.show" class="goods-name">{{goods.goodsName}}</span>
                        <span v-show="goods.show">商品名称：<input type="text" v-model="goods.goodsName" size="9"></span>
                    </p>
                    <p>
                        <span v-show="!goods.show" class="goods-price">¥{{goods.price}}</span>
                        <span v-show="goods.show">价格：<input type="text" v-model="goods.price" v-show="goods.show" size="5"></span>
                    </p>
                    <p>库存数量:
                        <span v-show="!goods.show">{{goods.stock}}</span><input type="text" v-model="goods.stock" v-show="goods.show" size="3"></p>
                    <p>商品种类:
                        <span v-show="!goods.show">{{goods.category}}</span>
                        <select type="text" v-model="goods.category" v-show="goods.show">
                            <option value="代步工具">代步工具</option>
                            <option value="电子产品">电子产品</option>
                            <option value="生活用品">生活用品</option>
                            <option value="书籍教材">书籍教材</option>
                            <option value="体育健身">体育健身</option>
                            <option value="乐器">乐器</option>
                            <option value="其他">其他</option>
                        </select>
                    </p>
                    <p>上架日期:
                        <span v-show="!goods.show">{{goods.createdDateTime}}</span><input type="text" :value="goods.createdDateTime" disabled v-show="goods.show" size="8"></p>
                </div>
                <div class="releasedGood-opration">
                    <div class="releasedGood-xiajia pointer" @click="holder(goods)">下架</div>
                    <div class="releasedGood-xiugai pointer">
                        <p v-if="!goods.show" @click="update(goods,'show')">修改</p>
                        <p v-if="goods.show" @click="updateReleasedGoods(goods)" class="weitiao">保存
                        </p>
                        <p v-if="goods.show" @click="update(goods,'hide')">取消
                        </p>
                    </div>
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
      imgsrc: this.$store.state.server+'/public/images/goods/',
      releasedGoods: [],
      curGoods: null
    }
  },
  components: {
    modal
  },
  methods: {
    getReleasedGoods() {
      this.$axios
        .get(this.$store.state.server+'/user/getReleasedGoods')
        .then(res => {
          this.releasedGoods = res.data.result
          for (var x in this.releasedGoods) {
            this.releasedGoods[x].createdDateTime = this.regDateTime(
              this.releasedGoods[x].createdDateTime
            )
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateReleasedGoods(goods) {
      this.$axios
        .post(this.$store.state.server+'/user/updateReleasedGoods', {
          goods: goods
        })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      this.update(goods, 'hide')
    },
    deleteGoods(goods) {
      this.$axios
        .post(this.$store.state.server+'/user/deleteGoods', {
          idgoods: goods.idgoods
        })
        .then(res => {
          this.getReleasedGoods()
          this.curGoods = null
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    regDateTime(time) {
      let reg = /([\S\s]*)T/
      return time.match(reg)[1]
    },
    update(goods, show) {
      if (show == 'show') this.$set(goods, 'show', true)
      else this.$set(goods, 'show', false)
    },
    holder(goods) {
      this.curGoods = goods
      this.mdShow = true
    },
    confirm() {
      if (this.curGoods) {
        this.deleteGoods(this.curGoods)
        this.mdShow = false
      }
    },
    closeModal() {
      this.mdShow = false
    }
  },
  mounted() {
    this.getReleasedGoods()
  }
}
</script>

<style>
.releasedGoods-details {
  width: 1225px;
  height: auto;
  background: #fff;
  padding: 18px 65px;
  margin-left: 60px;
  margin-bottom: 30px;
  border: 1px solid transparent;
  overflow: hidden;
}
.releasedGoods-title {
  width: 1125px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #069475;
  color: #069475;
  font-size: 18px;
  letter-spacing: 0.2em;
}
.releasedGood {
  width: 450px;
  height: 170px;
  float: left;
  margin-left: 70px;
  margin-top: 10px;
  border-bottom: 2px solid #069475;
}
.releasedGood-img {
  max-width: 140px;
  height: 125px;
  background: #ccc;
  float: left;
  margin-left: 15px;
  margin-top: 18px;
}
.releasedGood-details {
  width: 165px;
  height: 125px;
  line-height: 1.5;
  float: left;
  margin-left: 30px;
  margin-top: 25px;
}
.releasedGood-details p {
  font-size: 13px;
  color: #aaa;
}
.goods-name {
  font-size: 18px;
  color: #069475;
}
.goods-price {
  font-size: 20px !important;
  color: red !important;
}
.releasedGood-opration {
  width: 100px;
  margin-top: 33px;
  position: relative;
  float: right;
}
.releasedGood-xiajia {
  width: 27px;
  height: 48px;
  line-height: 24px;
  margin-left: 70px;
  text-align: center;
  margin-bottom: 10px;
  display: block;
  background: #b1b1b1;
  color: white;
}
.releasedGood-xiajia:hover {
  background: #777;
  color: white;
}
.releasedGood-xiugai {
  width: 100px;
  height: 48px;
  margin-left: 70px;
  color: #069475;
  text-align: center;
  display: block;
}
.releasedGood-xiugai p {
  width: 27px;
  height: 48px;
  line-height: 24px;
  float: left;
}
.weitiao {
  margin-left: -30px;
}
.releasedGood-xiugai p:hover {
  background: #069475;
  color: white;
}
</style>
