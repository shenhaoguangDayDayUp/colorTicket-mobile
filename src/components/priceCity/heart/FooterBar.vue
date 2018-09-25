<template>
    <div class="footer-bar">
        <div class="select-all-img" @click.stop='selectClick'>
            <img v-if='allSelect'  src="../../../assets/img/fuxuan2@1x.png"
                 alt="">
            <img v-else src="../../../assets/img/yuan@1x.png"
                 alt="">
        </div>
        <div class="select-all-quntity">
            共
            <span>{{amount}}</span>件,
        </div>
        <div class="select-all-score">
            <span>{{total|currency}}积分</span>
        </div>
        <div :class="[amount?'select-all-button':'select-all-button-disabled']">
            <div :class="[amount?'select-all-pay':'select-all-pay-disabled']" @click.prevent='gotoChange'>兑换</div>
        </div>
    </div>
</template>
<script>
export default {
  mounted(){


  },
   methods:{
      gotoChange(){
        this.$emit('gotoChange')
      },
       selectClick(){
      
             this.$emit('update:allSelect', !this.allSelect)
               this.$emit("selectAll");
    
          
  
 
       }
   },
  props: {
    amount: {
      type: [Number, String],
      default() {
        return 0;
      }
    },
    total: {
      type: [Number, String],
      default() {
        return 0;
      }
    },
    allSelect: {
      type: [Boolean],
      default() {
        return false;
      }
    }

  }
};
</script>
<style lang="scss" scoped>
.footer-bar {
  z-index: 10;
  width: 100%;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  height: 122px;
  border-top: 1px solid #323540;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #23262b;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 28px;
  .select-all-img {
    margin-right: 10px;
    img{
       width: 30px;
       height: 30px;
       line-height:122px

    }
  }
  .select-all-quntity {
    span {
      color: #ffcb16;
    }
  }
  .select-all-score {
    color: #ffcb16;
    margin-left: 10px;
  }
  .select-all-button {
         font-size: 32px;
    margin-left: 20px;
    background: #ffcb16;
    height: 80px;
    padding: 20px;
    flex: 1;
    text-align: center;
    border-radius: 10px;
    .select-all-pay {
      color: black;
    }
  }
  .select-all-button-disabled {
   font-size: 32px;
    margin-left: 20px;
    background:#666;
    height: 80px;
    padding: 20px;
    flex: 1;
    text-align: center;
    border-radius: 10px;
    .select-all-pay-disabled {
      color:#000;
    }
  }
}
</style>


