<template>
    <div class="goods-list" v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div class="goods-item">
            <div class="goods-item-icon"></div>
            <div class="goods-item__content">
                <div class="goods-item-title line_1">上海测试发大水发放大发大水</div>
                 <div class="goods-item-price">1111</div>
            </div>
        </div>
          <div class="goods-item">
            <div class="goods-item-icon"></div>
            <div class="goods-item__content">
                <div class="goods-item-title line_1">上海测试</div>
                 <div class="goods-item-price">
                     <div>
                       <span><img src="../../assets/img/big_gold@2x.png"
                       alt=""></span>
                       <span class="gold">{{10000}}</span>
                     </div>
             
                 </div>
            </div>
        </div>
          <div class="goods-item">
            <div class="goods-item-icon"></div>
            <div class="goods-item__content">
                <div class="goods-item-title line_1">上海测试</div>
                 <div class="goods-item-price">1111</div>
            </div>
        </div>
        
    </div>
</template>
<script>
import { InfiniteScroll } from "mint-ui";
export default {
    directives: {
        InfiniteScroll
    },
    data(){
        return{
            loading:false
        } 
    },
    methods:{
        loadMore(){
            console.log(1121)
        }
    }
};
</script>
<style lang="scss" scoped>
.line_1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.goods-list {
  margin-bottom: 98px;  
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background: white;
  .goods-item {
   position: relative;
    width: 50%;
    height: 490px;
    background-color: #fff;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .goods-item-icon {
      margin-top: 30px;
      width: 314px;
      height: 314px;
      background-color: #f8f8f8;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .goods-item__content {
      width: 314px;
      flex: 1;
      display: flex;
      flex-direction: column;
      .goods-item-title {
        text-align: center;
        max-width: 314px;
        font-size: 30px;
        color: #262626;
        margin-top: 16px;
      }
      .goods-item-price {
        font-size: 28px;
        color: #d0021b;
        line-height: 34px;
        margin-top: 12px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        img{
       width: 25px;
        height:25px;
        }
      }
    }
  }
  .goods-item:nth-child(odd)::before {
    content: " ";
    position: absolute;
    right: 0;
    top: 70px;
    bottom: 190px;
    border-right: 4px solid #666a74;
    transform: scaleX(0.5);
    transform-origin: 100% 0;
  }
}
</style>


