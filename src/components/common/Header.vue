<template>
  <div class="nav-bar">
    <span class="left-back"
          v-if="isShow">
       <slot name='left'>
           <img src="../../assets/img/close.png"
             alt=""
             @click='back'>
       </slot>
    </span>
    <span class="left-back"
          v-else>
    </span>
    <div class="nav-title">
      {{title}}
    </div>
    <span class="nav-right">
      <slot name='right'></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "Header",
  methods:{
    back(){
      if(this.$route.query.hasOwnProperty('routeName')){
        return this.$router.push({name:this.$route.query.routeName})
      }
      this.$router.go(-1)
      this.$emit('clickRtn');
    }
  },
  props: {
    title: {
      type: [String],
      default() {
        return "";
      }
    },
    isShow: {
      type: [Boolean],
      default() {
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-bar {
  font-size: 34px;
  color: #fff;
  position: relative;
  height: 94px;
  width: 100%;
  background: #1b1a20;
  box-shadow: 0px 9px 9px 0px rgba(0, 0, 0, 0.09);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-right: 20px;
  padding-left: 20px;
  position: fixed;
  top:0;
  left:0;
  z-index:999;
  .left-back {
    flex: 1;
    img {
      width: 20px;
      height: 34px;
    }
  }
  .nav-title {
    // flex: 1;
    text-align: center;
  }
  .nav-right {
    flex: 1;
    text-align: right;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>


