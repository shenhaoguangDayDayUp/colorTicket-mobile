<template>
  <transition :name="transition">
    <div class="empty-box"
         v-if='show'>
      <img src="../../assets/img/dizhi@2x.png"
           alt="">
    </div>

  </transition>
</template>
<script>
export default {
  name: "Empty",
  model: {
    prop: "show",
    event: "change"
  },
  props: {
    show: {
      type:Boolean,
      default(){
        return false
      }
    },
    transition: {
      type: String,
      default: "show"
    }
  },
  watch: {
    show(val) {
      this.$emit("update:show", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.empty-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: auto;
  text-align: center;
  img {
    width: 300px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
.show-enter,
.show-leave-active {
  // opacity: 0;
  // transition: opacity 1000ms;
}
// .show-leave-active,
// .show-enter-active {
//   transition: opacity 300ms;
// }
</style>


