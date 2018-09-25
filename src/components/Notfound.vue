<template>
  <div class="notfound">
    <Header title="啊哦~" :isShow="false">
    </Header>
    <div class="notFoundImg">
      <img src="../assets/img/404.png" alt="">
      <div>亲，您访问的页面走丢了！</div>
    </div>
  </div>
</template>
<script>
  import Header from "./common/Header.vue";
  export default {
    name: 'NotFound',
    components: {
      Header
    },
  }
</script>
<style lang="scss" scoped>
  .notfound {
      background-color: #23262b;
      height: 100%;
    .notFoundImg {
      margin-top:200px;
        text-align: center;
        color:#fff;
      img {
        width: 50%;
      }
      div{
        padding:20px 0;
        font-size:30px;
      }
    }
  }
</style>


