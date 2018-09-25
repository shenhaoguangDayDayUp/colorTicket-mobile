<template>
    <div>
        <div class='sd__quantity'>
            <div class='sd__quantity__btn '
                 @click.stop='doMinus'>
                <img class='icon'
                     src='../../assets/img/jianhao@2x.png'>
            </div>
            <div class='sd__quantity__input' :num.sync='quntity'>
                {{quntity}}
            </div>
            <!-- <input class='sd__quantity__input' @blur='onInputChange' v-model='value' type='number'/> -->

            <div class='sd__quantity__btn'
                 @click.stop='doPlus'>
                <img class='icon'
                     src='../../assets/img/jiahao@2x.png' />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    num: {
      default() {
        return 1;
      }
    },
    max: {
      default() {
        return -1;
      }
    },
    index: {
     
    }
  },
  name: "HearCard",
  computed: {
    quntity: {
      get() {
        return this.num||1;
      },
      set(val) {
        this.$emit("update:num", val);
      }
    }
  },
  methods: {
    doMinus() {
     
     let value = parseInt(this.quntity);
      value = isNaN(value) ? 0 : value;
      value -= 1;
      if(value <= 0){
     return   this.$vux.toast.show({
          text: "不能再少了"
        });
        value = 1;
      }
     this.quntity = value
        console.log(this.quntity )
      this.$emit('valueChange', { value: this.quntity, index: this.index,type:-1 });
    },
    doPlus() {
     let value = parseInt(this.quntity);
      value = isNaN(value) ? 0 : value;
      value += 1;
      if(this.max > 0 && value > this.max){
        return;
      }
      this.quntity = value
      this.$emit('valueChange', { value:  this.quntity , index: this.index,type:1 });
    }
  }
};
</script>
<style lang='scss'>
.sd__quantity {
  width: 164px;
  height: 52px;
  background-color:#2a2c35;
  display: flex;
  flex-direction: row;
  position: relative;
  box-sizing: border-box;
}
.sd__quantity::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  // border: 1px solid #ccc;
  transform: scale(0.5);
  transform-origin: 0 0;
}
.sd__quantity__btn {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  position: relative;
  &:hover {
    //   .sd__quantity__btn-hightlighted {
    // background-color: rgba(40, 40, 40, 0.1);
    // }
  }
}

.sd__quantity__btn .icon {
  width: 30px;
  height: 30rx;
}
.sd__quantity__input {
  position: relative;
  height: 100%;
  flex: 1;
  font-size: 24px;
  color: white;
  box-sizing: border-box;
  text-align: center;
  vertical-align: middle;
  line-height: 2;
}
.sd__quantity__input::before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  // border-left: 1px solid #ccc;
  transform: scaleX(0.5);
  transform-origin: 0 0;
}
.sd__quantity__input::after {
  content: " ";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  // border-right: 1px solid #ccc;
  transform: scaleX(0.5);
  transform-origin: 0 0;
}
</style>

