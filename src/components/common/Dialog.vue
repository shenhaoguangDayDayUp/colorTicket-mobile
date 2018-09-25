<template>
    <div :visible.sync="show">
        <x-dialog v-model="show">
            <div class="my-dialog">
                <div class="title" slot="header">
                    <slot  name='header'></slot>
                </div>
                <div class="content">
                     <slot  name='content'></slot>
                </div>
                <div class='bottom'>
                    <div class="left"
                         @click='gotoCancel'>取消
                    </div>
                    <div class="right"
                         @click='gotoConfirm'>确定
                    </div>
                </div>
            </div>
        </x-dialog>
    </div>
</template>
<script>
import {  XDialog } from "vux";
export default {
    name:'Dialog',
    components:{
        XDialog
    },
    props:{
        visible:{

        }
    },
    computed:{
        show:{
            get(val){
              return this.visible
            },
            set(val){
                // this.show = val;
             return  this.$emit('update:visible',val) 
            }
        }
    },
    methods:{
        gotoCancel(){
             this.show = false
            this.$emit('cancel')
        },
        gotoConfirm(){
            this.show = false
             this.$emit('success')
        }
    },
    data(){
        return {
            showToast:true
        }
    }  
}
</script>
<style lang="scss" scoped>
.my-dialog {
  font-size: 32px;
  height: 368px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .title {
    height: 60px;
    padding: 10px;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #cccccc;
  }
  .content {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bottom {
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    .left {
      padding: 10px;
      flex: 1;
      margin-left: 20px;
      border: 1px solid #ffcb16;
      margin-right: 10px;
      border-radius: 5px;
    }
    .right {
      padding: 10px;
      flex: 1;
      background: #ffcb16;
      margin-right: 20px;
      margin-left: 10px;
      border-radius: 5px;
    }
  }
}
</style>


