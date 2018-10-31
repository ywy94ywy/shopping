import Vue from 'vue'
import VRouter from 'vue-router'
Vue.use(VRouter)
//欢迎页
const welcome = () =>
  import('@/components/welcome')
//首页
const home = () =>
  import('@/components/home')
const admin = () =>
  import('@/components/admin')
const Goods = () =>
  import('@/components/header/Goods')
const allGoods = () =>
  import('@/components/aside/allGoods')
const seekGoods = () =>
  import('@/components/header/seekGoods')
const order = () =>
  import('@/components/order')
const addGoods = () =>
  import('@/components/header/addGoods')
const addSeeking = () =>
  import('@/components/header/addSeeking')
const person = () =>
  import('@/components/tools/person')
const personDetails = () =>
  import('@/components/tools/person/personDetails')
const releasedGoods = () =>
  import('@/components/tools/person/releasedGoods')
const releasedSeeking = () =>
  import('@/components/tools/person/releasedSeeking')
const soldGoods = () =>
  import('@/components/tools/person/soldGoods')
const goodsDetails = () =>
  import('@/components/goodsDetails')

export default new VRouter({
  routes: [{
      path: '/',
      component: welcome,
    },
    {
      path: '/home',
      component: home,
      children: [{
          path: 'Goods',
          alias: '/',
          component: Goods,
        },
        {
          path: 'Goods/:goodsType',
          name: 'goods',
          component: Goods,
        },
        {
          path: 'searchGoods/:searchInfo',
          name: 'searchGoods',
          component: Goods,
        },
        {
          path: 'seekGoods',
          component: seekGoods,
        },
        {
          path: 'order',
          component: order,
        },
        {
          path: 'admin',
          component: admin,
        },
        {
          path: 'addGoods',
          component: addGoods,
        },
        {
          path: 'addSeeking',
          component: addSeeking,
        },
        {

          path: 'goodsDetails/:goods',
          component: goodsDetails,
        },
        {
          path: 'person',
          component: person,
          children: [{
            path: '/',
            alias: 'personDetails',
            component: personDetails,
          }, {
            path: 'releasedGoods',
            component: releasedGoods,
          }, {
            path: 'releasedSeeking',
            component: releasedSeeking,
          }, {
            path: 'soldGoods',
            component: soldGoods,
          }]
        }
      ]
    }
  ]
})
