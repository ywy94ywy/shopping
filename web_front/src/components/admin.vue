<template>
  <div class="main">
    <div class="content">
      <ul>
        <li @click="getAllUsers">查看所有用户</li>
        <li @click="getAllGoods">查看所有商品</li>
        <li @click="getAllOrders">查看所有订单</li>
      </ul>
      <table class="table" v-if="show=='allUsers'">
        <tr>
          <td>用户名</td>
          <td>密码</td>
          <td>昵称</td>
          <td>个性签名</td>
          <td>手机</td>
          <td>QQ</td>
          <td>微信</td>
          <td>操作</td>
        </tr>
        <tr v-for="(a,index) in allUsers" :key="index">
          <td>{{a.userName}}</td>
          <td>{{a.password}}</td>
          <td>{{a.nickName}}</td>
          <td>{{a.sign}}</td>
          <td>{{a.telephone}}</td>
          <td>{{a.qq}}</td>
          <td>{{a.wechat}}</td>
          <td class="pointer" @click="alert">删除</td>
        </tr>
      </table>
      <table class="table" v-if="show=='allGoods'">
        <tr>
          <td>名称</td>
          <td>价格</td>
          <td>库存</td>
          <td>类别</td>
          <td>创建日期</td>
          <td>点击数</td>
          <td>详情</td>
          <td>操作</td>
        </tr>
        <tr v-for="(a,index) in allGoods" :key="index">
          <td>{{a.goodsName}}</td>
          <td>{{a.price}}</td>
          <td>{{a.stock}}</td>
          <td>{{a.category}}</td>
          <td>{{a.createdDateTime}}</td>
          <td>{{a.click}}</td>
          <td>{{a.goodsDetails}}</td>
          <td class="pointer" @click="alert">删除</td>
        </tr>
      </table>
      <table class="table" v-if="show=='allOrders'">
        <tr>
          <td>订单编号</td>
          <td>用户</td>
          <td>商品</td>
          <td>数量</td>
          <td>交易方式</td>
          <td>创建日期</td>
          <td>操作</td>
        </tr>
        <tr v-for="(a,index) in allOrders" :key="index">
          <td>{{a.iduo}}</td>
          <td>{{a.userName}}</td>
          <td>{{a.goodsName}}</td>
          <td>{{a.number}}</td>
          <td>{{a.trading}}</td>
          <td>{{a.createDate}}</td>
          <td class="pointer" @click="alert">删除</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allUsers: [],
      allGoods: [],
      allOrders: [],
      show: null
    }
  },
  methods: {
    getAllUsers() {
      if (this.allUsers != '') {
        this.show = 'allUsers'
        return
      }
      this.$axios
        .get(this.$store.state.server + '/admin/getAllUsers')
        .then(res => {
          this.allUsers = res.data.result
          this.show = 'allUsers'
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllGoods() {
      if (this.allGoods != '') {
        this.show = 'allGoods'
        return
      }
      this.$axios
        .get(this.$store.state.server + '/admin/getAllGoods')
        .then(res => {
          var reg = /[^T]+.*?/
          for (var i in res.data.result) {
            res.data.result[i].createdDateTime = res.data.result[
              i
            ].createdDateTime.match(reg)[0]
          }
          this.allGoods = res.data.result
          this.show = 'allGoods'
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllOrders() {
      if (this.allOrders != '') {
        this.show = 'allOrders'
        return
      }
      this.$axios
        .get(this.$store.state.server + '/admin/getAllOrders')
        .then(res => {
          var reg = /[^T]+.*?/
          for (var i in res.data.result) {
            res.data.result[i].createDate = res.data.result[i].createDate.match(
              reg
            )[0]
          }
          this.allOrders = res.data.result
          this.show = 'allOrders'
        })
        .catch(err => {
          console.log(err)
        })
    },
    alert() {
      alert('禁止删除！')
    }
  },
  mounted() {
    this.getAllUsers()
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
.content {
  width: 1480px;
  height: 800px;
  padding: 30px;
  font-size: 20px;
  background: #fff;
}
.content ul {
  overflow: hidden;
}
.content ul li {
  float: left;
  width: 150px;
  height: 30px;
  color: #fff;
  background: #629600;
  text-align: center;
  margin-left: 45px;
  cursor: pointer;
}
.table {
  margin-top: 20px;
  width: 1400px;
  border-collapse: collapse;
}
.table tr:nth-child(odd) {
  background: rgb(246, 246, 246);
}
.table tr:first-child {
  background: rgb(226, 226, 226);
  color: black;
}
.table td {
  border: 1px solid rgb(206, 206, 206);
  text-align: center;
}
.table tr:first-child td {
  text-align: center;
}
</style>
