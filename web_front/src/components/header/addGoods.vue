<template>
  <div class="addGoods">
        <div id="mm">
            <div id="main">
                <div class="content">
                    <img class="upimg" src="" alt="" ref="img"> 
                    <div class="upfile">
                    <input id="imgUpLoad" type="file" name="info" class="sctp pointer" src="1.PNG" @change="change" ref="input" />
                    </div>
                </div>
                <br>
                <div class="kk">
                    <label class="form-label">
                        商品名称</label>

                    <div class="input-inline">
                        <input type="text" name="title" autocomplete="off" placeholder="请输入商品名称" class="input" v-model="goods.name">
                    </div>
                    <div class="form-mid-zs">
                        14个字以内</div>
                    <div class="clear">
                    </div>
                </div>
                <div class="kk">
                    <label class="form-label">
                        商品类别</label>

                    <div class="input-inline">
                        <select name="categorys" id="categorys" v-model="goods.category">
                            <option value="代步工具">代步工具</option>
                            <option value="电子产品">电子产品</option>
                            <option value="生活用品">生活用品</option>
                            <option value="书籍教材">书籍教材</option>
                            <option value="体育健身">体育健身</option>
                            <option value="乐器">乐器</option>
                            <option value="其他">其他</option>
                        </select>
                    </div>
                    <div class="clear">
                    </div>
                </div>
                <div class="kk">
                    <label class="form-label2">
                        商品详情</label>
                    <div class="input-block">
                        <textarea placeholder="请输入商品详情" class="textarea-goods-des" rows="7" v-model="goods.goodsDetails"></textarea>
                    </div>
                </div>
                <div class="kk">

                    <label class="form-label">
                        价格</label>
                    <div class="input-inline">
                        <input type="text" name="title" placeholder="请输入价格" class="input" v-model="goods.price" />
                    </div>
                    <div class="form-mid-zs">
                        元
                    </div>
                    <label class="form-label d2">
                        库存</label>
                    <div class="input-inline">
                        <input type="text" name="title" placeholder="请输入库存" class="input" v-model="goods.stock"/>
                    </div>
                    <div class="form-mid-zs">
                        个/件
                    </div>
                    <div class="clear">
                    </div>
                </div>
                <div class="publish-submit">
                    <button class="btn-submit pointer" @click="submit">
                        确认发布</button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: {
        name: '',
        price: '',
        img: '',
        stock: '',
        category: '书籍教材',
        createdDateTime: '',
        goodsDetails:''
      }
    }
  },
  methods: {
    submit() {
      console.log(this.goods)
      this.getDateTime()
      var imgFile = document.getElementById('imgUpLoad').files[0]
      if (imgFile) this.goods.img = imgFile.name
      else {
        return alert('请添加图片')
      }
      this.uploadImg(imgFile)
      this.$axios
        .post(this.$store.state.server + '/addThings/addGoods', {
          data: this.goods
        })
        .then(res => {
          console.log(res)
          alert('添加成功！')
        })
        .catch(err => {
          console.log(err)
        })
    },
    uploadImg(avatar) {
      let data = new FormData()
      data.append('avatar', avatar)
      return this.$axios.post(
        this.$store.state.server + '/addThings/uploadImg',
        data,
        {
          headers: { 'content-type': 'multipart/form-data' }
        }
      )
    },
    getDateTime() {
      var a = new Date().toJSON().replace(/T/, ' ')
      var b = /(\S*\s*\S*)\./i
      this.goods.createdDateTime = a.match(b)[1]
    },
    change() {
      //预览图片
      var elInput = this.$refs.input
      var elImg = this.$refs.img
      const reader = new FileReader()
      reader.onload = e => {
        const src = e.target.result
        elImg.src = src
      }
      if (elInput.files && elInput.files[0]) {
        reader.readAsDataURL(elInput.files[0])
      }
    }
  },
  mounted() {
    if (!this.$store.state.loginState) {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.addGoods {
  width: 1710px;
  height: auto;
  position: relative;
  background: #f7f7f7;
  left: 210px;
  top: 60px;
  border: 1px solid transparent;
}
.upimg{
  
  height: 150px;
}

#main {
  margin: 0px 100px;
  width: 1410px;
  background-color: white;
  overflow: hidden;
}

.content{
    width: 1400px;
    height: 180px;
    text-align: center;
    margin-top:40px;
}
.upimg{
   height: 180px;
   vertical-align: middle;
    display: inline-block;
}
.upfile{
      height: 180px;
  width: 180px;
  background: url(../../assets/img/add/upimg.jpg);
  outline: 1px solid #ccc;
   vertical-align: middle;
    display: inline-block;
}
.sctp {
  height: 180px;
  width: 180px;
     vertical-align: middle;
opacity: 0;
  outline: 1px solid #7bb313;
    display: inline-block;
}

.clear {
  clear: both;
}

.kk {
  width: 1310px;
  margin: 30px 50px;
  background-color: White;
}

.form-label {
  float: left;
  background-color: rgb(251, 251, 251);
  font: 13px '微软雅黑';
  color: rgb(51, 51, 51);
  border: 1px double rgb(80%, 80%, 80%);
  width: 200px;
  text-align: center;
  height: 30px;
  line-height: 30px;
}

.form-label2 {
  float: left;
  background-color: rgb(251, 251, 251);
  font: 13px '微软雅黑';
  color: rgb(51, 51, 51);
  border: 1px double rgb(80%, 80%, 80%);
  width: 1237px;
  padding-left: 73px;
  height: 30px;
  line-height: 30px;
}

.input-inline {
  float: left;
}

.input-inline:hover {
  outline: 1px solid #7bb313;
}

.input-block {
  font: 13px '微软雅黑';
  color: rgb(51, 51, 51);
  line-height: 30px;
}

.form-mid-zs {
  float: left;
  font-size: 10px;
  color: #666666;
  line-height: 30px;
  margin-left: 10px;
}

.textarea-goods-des {
  width: 1310px;
  padding: 0;
  color: rgb(51, 51, 51);
  font-family: '微软雅黑';
}

.textarea-goods-des:hover {
  outline: 1px solid #7bb313;
}

.publish-submit {
  text-align: center;
}

.btn-submit {
  background-color: #7bb313;
  font: 18px '微软雅黑';
  color: White;
  border: none;
  height: 50px;
  width: 150px;
  margin:0px auto;
  margin-bottom: 50px;
}

#categorys {
  height: 32px;
  font: 13px '微软雅黑';
  color: rgb(51, 51, 51);
}

.input {
  height: 28px;
  color: rgb(51, 51, 51);
  font-family: '微软雅黑';
}

.d2 {
  margin-left: 20px;
}

</style>
