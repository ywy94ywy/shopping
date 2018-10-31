<template>
    <div class="left">
        <div class="school">
            <a href="http://www.nau.edu.cn">
                <img :src="img1" />
            </a>
            <div class="school_name">
                <p>南京审计大学</p>
                <p class="school_name_en">Nanjing Audit University</p>
            </div>
        </div>
        <div class="type">
            <ul>
                <router-link :to="{ name: 'goods', params: { goodsType: 'allGoods' }}">
                    <li>
                        <div class=type_icon>
                            <img :src="img2" class="img_middle" />
                        </div>全部商品</li>
                </router-link>
                <router-link :to="{ name: 'goods', params: { goodsType: 'transports' }}">
                    <li>
                        <div class=type_icon>
                            <img :src="img3" class="img_middle" />
                        </div>代步工具</li>
                </router-link>
                <router-link :to="{ name: 'goods', params: { goodsType: 'electronics' }}">
                    <li>
                        <div class=type_icon>
                            <img :src="img4" class="img_middle" />
                        </div>电子产品</li>
                </router-link>
                <router-link :to="{ name: 'goods', params: { goodsType: 'livingGoods' }}">
                    <li>
                        <div class=type_icon>
                            <img :src="img5" class="img_middle" />
                        </div>生活用品</li>
                </router-link>
                <router-link :to="{ name: 'goods', params: { goodsType: 'books' }}">
                    <li>
                        <div class=type_icon>
                            <img :src="img6" class="img_middle" />
                        </div>书籍教材</li>
                </router-link>
                <router-link :to="{ name: 'goods', params: { goodsType: 'sports' }}">
                    <li>
                        <div class=type_icon>
                            <img :src="img7" class="img_middle" />
                        </div>体育健身</li>
                </router-link>
                <router-link :to="{ name: 'goods', params: { goodsType: 'instruments' }}">
                    <li>
                        <div class=type_icon>
                            <img :src="img8" class="img_middle" />
                        </div>乐器</li>
                </router-link>
                <router-link :to="{ name: 'goods', params: { goodsType: 'rests' }}">
                    <li>
                        <div class=type_icon>
                            <img :src="img9" class="img_middle" />
                        </div>其他</li>
                </router-link>
            </ul>
        </div>

    </div>
</template>

<script>
var path = '../assets/img/aside/'
export default {
  data() {
    return {
      img1: require('../assets/img/aside/school.png'),
      img2: require('../assets/img/aside/quanbu.png'),
      img3: require('../assets/img/aside/daibu.png'),
      img4: require('../assets/img/aside/dianzi.png'),
      img5: require('../assets/img/aside/shenghuo.png'),
      img6: require('../assets/img/aside/shuji.png'),
      img7: require('../assets/img/aside/tiyu.png'),
      img8: require('../assets/img/aside/yueqi.png'),
      img9: require('../assets/img/aside/qita.png'),
      imglist: [
        { name: '乐器', src: require('../assets/img/aside/yueqi.png') },
        { name: '其他', src: require('../assets/img/aside/qita.png') }
      ]
    }
  }
}
</script>

<style scoped>
.left {
  width: 210px;
  height: 1020px;
  background: #262b30;
  position: fixed;
  left: 0px;
  top: 60px;
  z-index: 1;
}
.router-link-active {
  background: #7bb313;
}
.school {
  margin-top: 30px;
  font-size: 20px;
  font-family: 微软雅黑, serif;
  text-align: center;
  color: #757575;
}

.school_name {
  margin-top: 10px;
}

.school_name_en {
  margin-top: 5px;
  font-size: 15px;
}

.type {
  width: 210px;
  height: auto;
  color: #fff;
  font-size: 17px;
  font-family: "Microsoft YaHei", serif;
  letter-spacing: 0.25em;
  margin-top: 15px;
}

.type ul li {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid #555;
  color: #fff;
}

.type ul li:hover {
  background: #7bb313;
  cursor: pointer;
}
.type ul a{
    display: block;
  width: 210px;
  height: auto;
    
}
.img_middle {
  vertical-align: middle;
}

.type_icon {
  float: left;
  width: 40px;
  height: auto;
  margin-left: 20px;
  margin-right: 10px;
  text-align: center;
}
</style>
