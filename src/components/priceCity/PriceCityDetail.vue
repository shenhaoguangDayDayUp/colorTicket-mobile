<template>
  <div class="goods">
    <div class='good-deital'>
      <div class="back"
           @click="back">

        <img src="../../assets/img/return@2x.png"
             alt="">

        <!-- <XIcon type="ios-arrow-right"></XIcon> -->
      </div>
      <swiper :list="bannerData"
              auto
              loop
               height="10rem"></swiper>
    </div>
    <div class="goods-detail-title">
      <div class="bar"></div>
      <div class='title'>{{detail.name}}</div>
      <div class="icon">
        <span><img src="../../assets/img/big_gold@2x.png"
               alt="" /></span>
        <div class="price">{{detail.price|currency}}</div>
      </div>
    </div>
    <div class="goods-content" ref='goods-content'
         v-html='detail.detail'>

    </div>
    <div class="goods-footer">
      <div class="btn-box ">
        <div class="btn-right"
             @click='addCart'>
          加入心愿单
        </div>
      </div>
      <div class="btn-box">
        <div class="btn"
             @click='rightChange'>
          立即兑换
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { Swiper, XHeader } from "vux";
import { getAllProductApi, heartCartApi, orderCheckOutApi } from "@/api/api";
import { common } from "@/logic";

export default {
  name: "peiceDetail",
  data() {
    return {
      detail: "",
      bannerData: [
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/1.jpg",
          // title: '送你一朵fua'
          fallbackImg: "https://static.vux.li/demo/3.jpg"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/2.jpg",
          // title: '送你一辆车'
          fallbackImg: "https://static.vux.li/demo/3.jpg"
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/5.jpg",
          // title: '送你一次旅行',
          fallbackImg: "https://static.vux.li/demo/3.jpg"
        }
      ]
    };
  },


updated() {
//  var nodeList = this.$refs['goods-content'].querySelectorAll('img')
//   for(var i=0;i<nodeList.length;i++){
//     nodeList[i].style.width='100%'
//   }
//   var table = this.$refs['goods-content'].querySelector('table')
//     if(table){
//     table.style.width = 'auto'
//     return
//   }
//  var div = this.$refs['goods-content'].querySelectorAll('div')
//   if(div){
//       for(var i=0;i<div.length;i++){
//     div[i].style.width='auto'
//     }
//     return
//   }


 
 },
  methods: {
    back(){
      if(this.$route.query.hasOwnProperty('showBack')){
      return  this.$router.push({name:'PrizeCity'})
      }
      this.$router.go(-1)
    },
    async addCart() {
      try {
        if (common.getCommon("TOKEN")) {
          var obj = { product: { code: this.$route.params.id }, quantity: 1 };
          var token = {
            headers: { "x-auth-token": common.getCommon("TOKEN") }
          };
          await heartCartApi.addOrdel(obj, token);
            this.$vux.toast.show({
            text: "加入成功",
            time: 2000
          });
          // this.$router.push({ name: "heart" });
        } else {
          this.$vux.toast.show({
            text: "请先登录",
            time: 1000
          });
          this.$router.push({ name: "Login" });
        }
      } catch (error) {}
    },
    async rightChange() {
      if (!this.detail.code) {
        this.$vux.toast.show({
          text: "请选择商品"
        });
      } else {
        
        var token = {
          headers: { "x-auth-token": common.getCommon("TOKEN") }
        };
        var personalInfo = {
          // receiverName: "Lin",
          // receiverMobileNumber: "17717396576",
          // receiverProvince: 2,
          // receiverCity: 2822,
          // receiverDistrict: 51979,
          // receiverStreet: "中信廣場",
          // items: [{ product: { code: this.detail.code }, quantity: 1 }]
          items:[{ product: { code: this.detail.code }, quantity: 1 }]
        };

        try {
          if (common.getCommon("TOKEN")) {
              var productInfo = JSON.stringify({ personalInfo: personalInfo });
          this.$router.push({
            name: "rightChange",
            query: { product: productInfo }
          });
            // const { data } = await orderCheckOutApi.checkout(
            //   personalInfo,
            //   token
            // );
            // var productInfo = JSON.stringify(data);
            // this.$router.push({
            //   name: "rightChange",
            //   query: { product: productInfo }
            // });
          } else {
            this.$vux.toast.show({
              text: "请先登录",
                time: 1000
            });
            this.$router.push({ name: "Login" });
          }
        } catch (error) {}
      }
    },

    async getInfo() {
      try {
        const { data } = await getAllProductApi.getDetail({
          id: this.$route.params.id
        });
        this.detail = data;
        this.bannerData = String(data.banners)
          .split(",")
          .map(item => {
            return { url: "javascript", img: item, fallbackImg: item };
          });
      } catch (err) {}
    }
  },
  mounted() {
    this.getInfo();
   
  },
  components: {
    Swiper,
    XHeader
  }
};
</script>
<style lang='scss' scoped>

.goods {
  color: #fff;
  background: #23262b;
  height: 100%;
  .good-deital {
    position: relative;
    .back {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // background: black;
      z-index: 100;
      position: absolute;
      top: 40px;
      left: 20px;
      line-height: 50px;
      text-align: center;
  
      img{
        width: 100%;
        height: 100%;
        padding-bottom: 5px;
         padding-right: 5px;
      }
    }
  }
  .goods-detail-title {
    padding-top:44px;
    padding-bottom: 44px;
    min-height: 124px;
    width: 100%;
    background: #2a2d36;
    display: flex;
    flex-direction: row;
    align-items: top;
    position: relative;
    justify-content: space-between;
    box-sizing: border-box;
    .bar {
      margin-top: 5px;
      width: 7px;
      height: 36px;
      margin-left: 20px;
      background: #ffcb16;
    }
    .title {
      font-size: 36px;
      color: white;
      margin-left: 20px;
      min-width: 300px;
    }
    .icon {
      text-align: right;
      align-self: flex-start;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // flex: 1;
      // width: 250px;
      text-align: right;
      vertical-align: middle;
      line-height: 45px;
      font-size: 36px;
      span {
        vertical-align: middle;
        align-self: center;
        img {
          width: 35px;
          height: 35px;
        }
      }
      .price {
        display: inline-block;
        margin-left: 16px;
        margin-right: 20px;
      }
    }
  }
  .goods-content {
    width: 100%;
    overflow: hidden;
    padding-bottom: 124px;
    .content_tpl{
      .formwork{
        .formwork_img{
          img{
            width: 100% !important;
          }
        }
      }
    }
    img{
      width: 100% !important;
    }
  }
  .goods-footer {
    z-index: 100;
    height: 124px;
    width: 100%;
    background: #2a2d36;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    & > .btn-box:last-child {
      padding-right: 20px;
    }
    .btn-box {
      flex: 1;
      height: 80px;
      padding-left: 20px;
      .btn {
        margin: 0;
        background: #ffcb16;
        height: 100%;
        border-radius: 10px;
        text-align: center;
        color: #000000;
        font-size: 32px;
        line-height: 80px;
      }
       .btn-right{
        margin: 0;
        height: 100%;
        border-radius: 10px;
        text-align: center;
        color: #000000;
        font-size: 32px;
        line-height: 80px;
        background: #fdd139
    }
    }
   
  }
}
</style>


