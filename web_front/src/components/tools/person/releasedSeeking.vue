<template>
    <div class="releasedSeeking">
        <div class="releasedSeeking-title">发布的求购</div>
        <div v-for="seeking in realeasedSeekings" :key="seeking.idseekings">
            <p>商品名称：
                <span v-if="!seeking.show">{{seeking.seekingsName}}</span> <input type="text" v-if="seeking.show" v-model="seeking.seekingsName" /></p>
            <p>期望价格：
                <span v-if="!seeking.show">{{seeking.price}}</span><input type="text" v-if="seeking.show" v-model="seeking.price" /></p>
            <p>商品种类：
                <span v-if="!seeking.show">{{seeking.category}}</span>
                <select v-model="seeking.category" v-if="seeking.show">
                    <option value="代步工具">代步工具</option>
                    <option value="电子产品">电子产品</option>
                    <option value="生活用品">生活用品</option>
                    <option value="书籍教材">书籍教材</option>
                    <option value="体育健身">体育健身</option>
                    <option value="乐器">乐器</option>
                    <option value="其他">其他</option>
                </select>
            </p>
            <p>商品详情：</p>
            <span v-if="!seeking.show">{{seeking.details}}</span>
            <textarea name="" id="" v-model="seeking.details" cols="30" rows="5" v-if="seeking.show"></textarea>
            <p>
                <button class="seekings-button pointer" @click="deleteSeekings(seeking.idseekings)">删除</button>
                <button class="seekings-button pointer" @click="updateSeekings(seeking,true)" v-if="!seeking.show">修改</button>
                <button class="seekings-button pointer" @click="updateSeekings(seeking,false)" v-if="seeking.show">取消</button>
                <button class="seekings-button pointer" @click="updateSeekings(seeking,'post')" v-if="seeking.show">保存</button>
            </p>

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      realeasedSeekings: []
    }
  },
  methods: {
    getRealeasedSeekings() {
      this.$axios
        .get(this.$store.state.server+'/user/getRealeasedSeekings')
        .then(res => {
          this.realeasedSeekings = res.data.result
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateSeekings(seeking, b) {
      if (b != 'post') this.$set(seeking, 'show', b)
      else {
        this.$axios
          .post(this.$store.state.server+'/user/updateSeekings', {
            seeking: seeking
          })
          .then(res => {
            this.$set(seeking, 'show', false)
            this.getRealeasedSeekings()
            console.log(res.data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    deleteSeekings(idseekings) {
      this.$axios
        .post(this.$store.state.server+'/user/deleteSeekings', {
          idseekings: idseekings
        })
        .then(res => {
          this.getRealeasedSeekings()
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getRealeasedSeekings()
  }
}
</script>

<style>
.releasedSeeking {
  width: 1225px;
  height: auto;
  background: #fff;
  padding: 18px 65px;
  margin-left: 60px;
  margin-bottom: 30px;
  border: 1px solid transparent;
}
.releasedSeeking-title {
  width: 1125px;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid #069475;
  color: #069475;
  font-size: 18px;
  letter-spacing: 0.2em;
}
.seekings-button {
  width: 48px;
  height: 27px;
  line-height: 27px;
  background: #fff;
  color: #069475;
  text-align: center;
  border: 1px solid #069475;
  margin: 10px 15px;
  outline: none;
}
.seekings-button:hover{
     background: #069475;
  color: #fff;
}
</style>
