<template>
  <div class="bottom">
    <div>
      <img :src="img1" />
      <p>&nbsp;&nbsp;&nbsp;&nbsp;淘学校园是一个以二手交易切入</p>
      <p>校园的生活服务平台,目前只服务于</p>
      <p>南京审计大学。</p>
     
    </div>
    <div>
      <h3>赞助我们</h3>
      <img :src="img2" />
    </div>
    <div>
      <h3>联系我们</h3>
      <p>QQ:529042309</p>
      <p>地址:南京审计大学</p>
    </div>
    <div>
      <h3>友情链接</h3>
      <p>
        <a href="http://www.nau.edu.cn">南京审计大学</a>
      </p>
      <p>
        <a href="http://www.baidu.com">百度</a>
      </p>
      <p>
        <a href="http://www.runoob.com">菜鸟教程</a>
      </p>
    </div>
    <div id="copyright">版权所有© All Rights Reserved</div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      img1: require('../assets/img/footer/logo2.png'),
      img2: require('../assets/img/footer/zhifubao.png')
    }
  }
}
</script>

<style >
.bottom {
  position: relative;
  top: 60px;
  left: 210px;
  width: 1710px;
  height: 280px;
  background: #262b30;
}

.bottom p {
  line-height: 1.5;
  color: #757575;
}

.bottom p a {
  color: #757575;
}

.bottom img {
  margin-bottom: 5px;
}

.bottom h3 {
  margin-bottom: 20px;
  letter-spacing: 0.2em;
}

.bottom div {
  width: 270px;
  height: 190px;
  float: left;
  border-left: 1px solid #5f5d5d;
  margin-top: 35px;
  text-align: center;
  color: #fff;
}

.bottom > div:first-child {
  width: 506px;
  height: 190px;
  margin-left: 130px;
  text-align: left;
  border-left: none;
}

#copyright {
  width: 350px;
  height: 20px;
  margin: 10px;
  float: right;
  border: none;
}
</style>
