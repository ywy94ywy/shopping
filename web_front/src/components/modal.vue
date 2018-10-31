<template>
  <div v-if="mdShow">
    <slot/>
  </div>
</template>

<script>
export default {
  props: ['mdShow'],
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.cover {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 200;
  opacity: 0.5;
  background: #2b2b2b;
}
.msgBox {
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -250px;
  margin-top: -75px;
  z-index: 201;
  width: 500px;
  height: 150px;
  background: #fff;
  box-shadow: 0 0 10px 2px #7c7c7c;
}
.message {
  text-align: center;
  color: #5f5f5f;
  margin: 30px auto;
  font-size: 18px;
}
.twoButton {
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0px;
}
.btn {
  width: 120px;
  height: 40px;
  background: #fff;
  border: 2px solid #7bb313;
  color: #7bb313;
  margin: 20px 50px;
  text-align: center;
  font-size: 15px;
  letter-spacing: 0.4em;
  outline: none;
}
.btn-1 {
  float: left;
}
.btn-1:hover {
  transition: all 0.2s;
  background-color: #7bb313;
  color: #fff;
}
.btn-2 {
  float: right;
}
.btn-2:hover {
  transition: all 0.2s;
  background-color: #7bb313;
  color: #fff;
}
</style>
