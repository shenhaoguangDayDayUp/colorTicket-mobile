<template>
    <div class="rigth-item">
         <div class="right-img">
             <img v-lazy="item.product.imagePath" alt="">
         </div>
         <div class="left-content">
             <div class="content">
                 {{item.product.name}}
             </div>
              <div class="price-box">
                    <div class="price-left">
                      <img src="../../assets/img/big_gold@2x.png"/>
                    <span class='price' v-if='item.price'>{{item.price|currency}}</span>
                      <span class='price' v-else>{{item.product.price|currency}}</span>
                    </div>
                     <div class="price-quntity">
                         x{{item.quantity}}
                    </div>
                         
               
              </div>
         </div>
    </div>
</template>
<script>
export default {
    props:{
    item:{
       type:[Object,String],
       default(){
         return ''
       }
    }
  }
};
</script>
<style lang='scss' scoped>
.rigth-item {
  padding-top:30px;
  padding-bottom: 43px;
  padding-right: 22px; 
  padding-left: 22px; 
  height: 271px;
  width: 100%;
  background: #2a2d36;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  font-size: 33px;
    .right-img {
        margin-right:30px;
        width: 198px;
        height: 198px;
        // background: red
        img{
           width: 100%;
           height: 100%;
        }
    

    }
    .left-content{
        font-size: 27px;
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        height: 198px;
        .content{

        }
        .price-box{
            display: flex;
            flex-direction: row;
            width: 100%;
            height: 35px;
            position: absolute;
            left: 0;
            bottom: 0;
            .price-left{
                flex: 1;
                line-height: 36px;
                vertical-align: middle;
                img{
                    height: 34px;
                     width: 34px;
                        vertical-align: middle;
                }
                .price{
                    color: #ffcb16;
                    font-size: 36px;
                  vertical-align: middle;
                }
            }
            .price-quntity{
                 flex: 1;
                 text-align: right;
                 font-size: 34px;
            }
        }
 
    }
        
    
}
</style>


