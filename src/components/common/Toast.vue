<template>
  <div :visible.sync="show">
    <x-dialog v-model="showToast">
      <div class="my-dialog">
        <span class="title">
          <span>{{title}}</span>
          <!-- <span class="title-icon"
                          @click='showToast = false'>
                        <img src="../../assets/img/close1.png"
                             alt="">
                    </span> -->
        </span>
        <!-- <slot  name='header'></slot> -->
        <div class="content">
          {{content}}
          <!-- <slot  name='content'></slot> -->
        </div>
        <div class='bottom'>
          <div class="left"
               @click='onCancel' v-show='cancelShow'>{{rightBtnText}}</div>
          <div class="right"
               @click='onConfirm'>{{leftBtnText}}</div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>
<script>
import { XDialog } from "vux";
export default {
  name: "Toast",
  components: {
    XDialog
  },
  props: {
    visible: {}
  },
  computed: {
    show: {
      get(val) {
        return this.visible;
      },
      set(val) {
        // this.show = val;
        return this.$emit("update:visible", val);
      }
    }
  },
  methods: {
    onCancel() {
      if (!this.cancel) {
        this.showToast = false;
      }
      this.$emit("cancel");
    },
    onConfirm() {
      //  this.showToast = false
      this.$emit("success");
    }
  },
  watch: {
    showToast(val) { 
      if (val) {// 设置弹框出现不能滚动
        window.global.$root.eventHub.$emit("LodingShow");
      } else {
        window.global.$root.eventHub.$emit("LodingHide");
      }
    }
  },
  data() {
    return {
      title: "提示",
      showToast: false,
      rightBtnText: "取消",
      leftBtnText: "确定",
      content: "",
      cancelShow:true //有无取消按钮
    };
  }
};
</script>
<style lang="scss" scoped>
.my-dialog {
  font-size: 32px;
  height: 368px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    font-size: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    height: 80px;
    padding: 10px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #cccccc;
    justify-content: center;
    position: relative;
    .title-icon {
      width: 50px;
      height: 50px;
      right: 10px;
      top: 0;
      position: absolute;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
  .content {
    font-size: 30px;
    flex: 5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bottom {
    flex: 3;
    display: flex;
    // flex-direction: row;
    width: 100%;
    // align-items: center;
    justify-content: space-around;
    
    // .left {
    //   padding: 10px;
    //   // flex: 1;
    //   width:50%;
    //   margin-left: 20px;
    //   border: 2px solid #ffcb16;
    //   margin-right: 10px;
    //   border-radius: 10px;
    //   box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.04);
    // }
    .right ,.left{
      padding: 10px;
      // flex: 1;
      height: 80px;
      line-height: 60px;
      width:50%;
      background: #ffcb16;
      margin-right: 20px;
      margin-left: 10px;
      border-radius: 10px;
      box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.04);
    }
    .left{
      border: 2px solid #ffcb16;
      background: none;
    }
  }
}
</style>


