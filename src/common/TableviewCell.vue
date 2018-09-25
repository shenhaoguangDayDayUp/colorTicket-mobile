<template>
    <div class="left-delete">
        <div class="move"
             @touchstart="_touchStart"
             @touchmove="_touchMove"
             @touchend="_touchEnd"
             :style="txtStyle">
            <slot></slot>
        </div>
        <div class="deleteIcon" :style="zIndex"  @click.prevent="deleteItem(index)">
            <div class="deleteBtn">删除</div>
            
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            index: Number
        },
        data() {
            return {
                startX: 0,       //触摸位置
                  moveX: 0,       //滑动时的位置
                  disX: 0,       //移动距离
                  txtStyle: '',
                delWidth: 200,
                top: '',
                zIndex: 'z-index:-1',
            }
        },
        methods: {
            _endEditing(){
     this.txtStyle = "transform:translateX(0rem);transition:0.5s;"+"-webkit-transform:translateX(0rem);-webkit-transition:0.5s";
            },
            _touchStart: function(ev) {
                ev = ev || event;
                if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                }
                this.$emit('tachStart',this.index)
            },
            _touchMove: function(ev) {
                ev = ev || event;
                if(ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // console.log('disX==>',this.disX)
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if(this.disX < 0 || this.disX == 0) {
                        // console.log('没有移动');
                        this.txtStyle = "transform:translateX(0rem);transition:0.5s;"+"-webkit-transform:translateX(0rem);-webkit-transition:0.5s;";
                    }else if (this.disX > 100) {

                        this.txtStyle = "transform:translateX(-" + this.disX/100 + "rem)";
                        if (this.disX >= this.delWidth/100) {
                            this.txtStyle = "transform:translateX(-" + this.delWidth/100 + "rem);transition:0.5s;"+
                            "-webkit-transform:translateX(-" + this.delWidth/100 + "rem);-webkit-transition:0.5s;" ;
                            this.zIndex = "z-index:" + 10 + "rem";
                        }
                    }
                }
            },
            _touchEnd: function(ev) {
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    this.zIndex = "z-index:" + -1 + "rem";
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            deleteItem: function(index) {
                this.$emit('deleteItem', index);
            }
        }
    }
</script>

<style scoped lang='scss'>
    .left-delete{
        font-size: 28px;
        box-sizing: border-box;
        width:100%;
        height:100%;
        position:relative;
        z-index:2;
        /* display: flex;
        flex-direction: row;
        align-items: center; */
  


    }
    .move{
        background: #23262b;
        position: relative;
        height: 100%;
    }
    .deleteIcon{
        border-top: 2px solid #23262b;
        border-bottom: 2px solid #23262b;
        width: 2rem;
        height:100%;
        line-height: 100%;
        position: absolute;
        right:0;
        top:0;
        background: red;
        text-align: center;
        .deleteBtn{
            line-height: 258px;
       
        }
        /* background:url(../assets/img/ic_minus.png) no-repeat;
        background-size: contain; */
    }
</style>