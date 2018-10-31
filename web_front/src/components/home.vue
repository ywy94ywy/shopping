<template>
  <!-- <test/> -->
  <div>
    <userPanel/>
    <shoppingCar/>
    <div id="home">
      <userHeader/>
      <userAside/>
      <router-view></router-view>
      <userFooter/>
      <tools/>
    </div>
  </div>
</template>

<script>
import userPanel from './header/userPanel'
import userHeader from './header'
import userAside from './aside'
import userFooter from './footer'
import tools from './tools'
import shoppingCar from './tools/shoppingCar'
import test from './test'
export default {
  components: {
    userHeader,
    userAside,
    tools,
    userFooter,
    userPanel,
    shoppingCar,
    test
  }
}
</script>

<style >
</style>

