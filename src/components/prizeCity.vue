
<template>

  <div class="prizeCity">
    <Header title="奖品展示">
      <span class="heart"
            slot="right">
        <img src="../assets/img/heart@2x.png"
             alt=""
             @click.stop='$router.push({name:"heart"})'
             class="heart-img">
        <img @click.stop='$router.push({name:"orderLsit"})'
             src="../assets/img/order@2x.png"
             alt="">
      </span>
    </Header>
    <div class="prizeCityContent">
      <div class="index_banner_1">
        <div @click='indexToDetail'>
          <swiper :list="bannerList"
                  :show-dots="false"
                  loop
                  v-model="index"
                  auto
                  height="5rem"
                  dots-class="custom-bottom"
                  dots-position="center"></swiper>
        </div>
        <div class="box">
          <span class="icon"></span>
          <span class="title">热门推荐</span>
          <span class="icon"></span>
          <!-- <span class="span">更多></span> -->
        </div>
        <div class="hot-box">
          <div class='hot'>
            <template v-for="(good,gidx) in recommodList">
              <router-link :key="gidx"
                           :to="{name:'商品详情',params: {id: good.code}}"
                           class="shop_item_3">
                <div class="shop_item_3_img">
                  <img v-lazy='good.imagePath'>
                </div>
                <div class="shop_item_3_msg">
                  {{good.name}}
                </div>
                <div class="shop_item_3_price">
                  <span><img src="../assets/img/big_gold@2x.png"
                         alt=""></span>
                  <span>{{good.price|currency}}</span>
                </div>
              </router-link>
            </template>
          </div>

          <div class="box">
            <span class="icon"></span>
            <span class="title">全部商品</span>
            <span class="icon"></span>
            <!-- <span class="span">更多></span> -->
          </div>
        </div>
        <div class="list-goods">
          <div class="list_content"
               v-infinite-scroll="loadMore"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
            <router-link class="list_item "
                         :class="{'linear_item_linear':!isGrid}"
                         :to="{name:'商品详情',params: {id: item.code}}"
                         v-for="(item,index) in goods"
                         :key="index"
                         tag="a">
              <div class="list_item_imgBox">
                <!-- <img class="list_logo"
                   src="static/img/list_logo.png"> -->
                <img v-lazy="item.imagePath"
                     class="list_img" />
              </div>
              <div class="list_item_title">
                {{item.name}}
              </div>
              <div class="list_item_description">
                <span><img src="../assets/img/big_gold@2x.png"
                       alt=""></span>
                <span class="gold">{{item.price|currency}}</span>
              </div>
            </router-link>
          </div>
          <div>

          </div>
          <div class="load-more">
          <load-more v-if='loading&&goods.length'
                     :tip="'正在加载'"></load-more>
          <divider  v-if='noMoreData&&goods.length'>没有更多商品</divider>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Header from "./common/Header.vue";
import { Swiper, LoadMore, Divider } from "vux";
import { InfiniteScroll } from "mint-ui";
import { common } from "@/logic";
import {
  getAllProductApi,
  brandListApi,
  rewordRecommenApi,
  adverApi
} from "@/api/api";
import Vue from "vue";
import config from "@/api/config";
export default {
  name: "prizeCity",
  data() {
    return {
      index: 0,
      bannerList: [],
      recommodList: [],
      hasMore: true,
      allLoaded: false,
      noMoreData: false,
      page: 1,
      count: 0,
      param: {
        limit: 16,
        offset: 0,
        total: 1
      },
      goods: [
        // { url: "https://static.vux.li/demo/1.jpg", id: 1 },
        // { url: "https://static.vux.li/demo/1.jpg", id: 2 },
        // { url: "https://static.vux.li/demo/1.jpg", id: 3 },
        // { url: "https://static.vux.li/demo/1.jpg", id: 4 }
      ],
      loading: false,
      isGrid: true,
      goodsList: [
        {
          url: "https://static.vux.li/demo/1.jpg"
        },
        {
          url: "https://static.vux.li/demo/1.jpg"
        },
        {
          url: "https://static.vux.li/demo/1.jpg"
        },
        {
          url: "https://static.vux.li/demo/1.jpg"
        },
        {
          url: "https://static.vux.li/demo/3.jpg"
        }
      ],
      bannerData: [
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/1.jpg"
          // title: '送你一朵fua'
        },
        {
          url: "javascript:",
          img: "https://static.vux.li/demo/2.jpg"
          // title: '送你一辆车'
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
  created() {
    this.getBanner();
    this.getRecommondList();
    this.getList();
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.getBanner();
  //   });
  // },


  
  beforeRouteLeave(to,from,next){
        if(to.name==='商品详情'){
            from.meta.keepAlive=true;
            next();
        }else{
            from.meta.keepAlive=false;
            next();
        }
    },
  activated() {
    // this.getBanner();
  },
  methods: {
    indexToDetail() {
      var data = this.bannerList[this.index];
      window.location.href = data.link;
    },
    async getBanner() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };

      try {
        var imgPrifex = config.imgUrl[config.env.NODE_ENV];
        const { data } = await adverApi.get({ id: "MOBILE_STORE" }, token);
        var bannerList = data.map(item => {
          return { ...item, img: imgPrifex + item.image };
        });
        this.bannerList = bannerList;
      } catch (error) {}
    },
    async getRecommondList() {
      try {
        const { data } = await rewordRecommenApi.get();
        this.recommodList = data;
      } catch (error) {}
    },
    needData(data) {},
    loadBottom() {
      // this.allLoaded = true;
      // this.$refs.loadmore.onBottomLoaded();
    },
    async getList() {
      this.loading = true;
      //  this.page
      try {
        const { data } = await getAllProductApi.getList({
          id: this.page
        });
        // const { data } = await brandListApi.query({categoryId:178,brandId:134,partionId:314,sortBy:'together',sortOrder:'ASC',limit:this.param.limit,offset:this.param.offset});
        // this.param.limit = data.limit;
        // this.param.offset = data.offset;
        // this.param.total = data.total;
        this.loading = false;
        for (let index = 0; index < data.records.length; index++) {
          const element = data.records[index];
          this.goods.push(element);
        }
        this.count = data.count;
        console.log(data);
        console.log(this.goods);
        // this.goods = data.items;
      } catch (err) {}
    },
    loadMore() {
      if (this.goods.length >= this.count) {
        this.loading = false;
        this.noMoreData = true;
        return;
      }
      this.page += 1;
      this.getList();
    },
    bannerHandle() {}
  },
  components: {
    Swiper,
    LoadMore,
    Header,
    Divider
  },
  directives: {
    InfiniteScroll
  }
};
</script>
<style lang="scss" scoped>
.prizeCity {
   .load-more{
    margin-top:10px;
    margin-bottom: 98px;
  }
  .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img {
    display: block;
    width: 100%;
    height: 100%;
    background: 100% 5rem no-repeat;
    background-size: contain;
  }
  // .vux-img{
  //   width: 100% !important;
  // }
  height: 100%;
  // overflow: auto;
  .prizeCityContent {
    // margin-top: 94px;
  }
  .gold {
    color: #ffcb16;
  }
  color: #fff;
  background: #23262b;
  height: 100%;
  .heart {
    box-sizing: border-box;
    width: 100px; // padding-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 94px;
    img {
      // width: 35px;
      // height: 40px;
      // height:36px;
      height: 100%; // width:31.5px;
    }
    .heart-img {
      // width:40px;
      // height:35px;
      // height:30.625px;
      // width:35px;
      height: 95%;
    }
    .gold {
      color: #ffcb16;
    }
    color: #fff;
    // background: #23262b;
    height: 100%;
    .heart {
      box-sizing: border-box;
      width: 60%; // padding-right: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 94px;
      img {
        // align-self: flex-start;
        //  padding-top: 5px;
        //  padding-bottom: 5px;
        padding: 7px; //  padding-right: 20px;
        //  margin-left: 10px;
        width: 50px;
        height: 50px;
      }
    }
    .index_banner_1 {
      background: #23262b;
      margin-top: 94px;
    }
    .box {
      position: relative;
      text-align: center;
      height: 94px;
      line-height: 94px;
      font-size: 34px;
    }
    .title {
      margin: 0 15px;
    }
    .icon {
      display: inline-block;
      height: 16px;
      width: 16px;
      line-height: 8px;
      border-radius: 9px;
      background-color: #fdcd00;
    }
    .span {
      position: absolute;
      right: 0;
      font-size: 27px;
      color: #afb0b4;
    }
    .hot-box {
      padding: 0 20px;
    }
    .hot {
      box-sizing: border-box;
      height: 340px;
      width: 100%; // height: 100%;
      border: none;
    }
  }
  .box {
    position: relative;
    text-align: center;
    height: 94px;
    line-height: 94px;
    font-size: 34px;
  }
  .title {
    margin: 0 15px;
  }
  .icon {
    display: inline-block;
    height: 16px;
    width: 16px;
    line-height: 8px;
    border-radius: 9px;
    background-color: #fdcd00;
  }
  .span {
    position: absolute;
    right: 0;
    font-size: 27px;
    color: #afb0b4;
  }
  .hot-box {
    padding: 0 20px;
  }
  .hot {
    box-sizing: border-box; // height: 360px;
    // height: auto;

    width: 100%;
    padding: 0 20px;
    background: white;
    border-radius: 10px;
    overflow-x: scroll;
    -webkit-overflow-x: scroll;
    padding-right: 20px;
    padding-top: 20px;
    padding-bottom: 20px;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    &::-webkit-scrollbar {
      background-color: transparent;
    }
  }
  .shop_item_3:last-child {
    margin-right: 0;
  }
  .shop_item_3 {
    // display: inline-block;
    margin-right: 20px;
    width: 210px;
  }
  .shop_item_3_img {
    // border: 1px solid #e6e6e6;
    height: 210px;
    width: 210px;
    position: relative;
  }
  .shop_item_3_img::after {
    content: " ";
    position: absolute;
    top: 20px;
    bottom: 20px;
    right: -12px;
    border-right: 2px solid #666a74; // border-right: 2px solid #282828;
    // transform: scaleX(0.5);
    transform-origin: 100% 100%;
  }
  .shop_item_3:last-child {
    .shop_item_3_img::after {
      content: none;
    }
  }
  .shop_item_3_img img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .shop_item_3_msg {
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    color: #333333;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all; // display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .shop_item_3_price {
    color: #ffcb16;
    height: 25px; // line-height: 64px;
    text-align: center;
  }
  .shop_item_3_price span {
    font-size: 22px;
    img {
      width: 25px;
      height: 25px;
    } // margin-right: 0.4rem;
  }
  .shop_item_3_price del {
    font-size: 0.26667rem;
    color: #999;
  }
  .list-goods {
    padding: 0 20px 20px 20px;
    // padding-bottom:100px;
    .list_content {
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
      padding: 0 30px;
      position: relative;
      &:nth-child(even) .list_item {
        margin-left: 0px !important;
      }
      .list_item {
        margin-top: 30px;
        width: 50%; // margin-left: 12px;
        display: inline-block;
        vertical-align: top;
        position: relative;
        &:nth-child(odd)::after {
          content: " ";
          position: absolute;
          top: 60px;
          bottom: 150px;
          right: -2px;
          border-right: 2px solid #666a74; // transform: scaleX(0.5);
          transform-origin: 100% 100%;
        }
        &:nth-child(even) .list_item_imgBox {
          margin-left: 30px;
          //  padding-right: 0 !important;
        }
        &:nth-child(odd) .list_item_imgBox {
          margin-right: 30px;
          //  padding-right: 0 !important;
        }
        .list_item_imgBox {
          //   padding-top: 30px;
          //  padding-bottom:30px;
          // padding-right: 50px;

          // padding-left: 50px;
          // border: 1px solid rgb(230, 230, 230)
          .list_logo {
            position: absolute;
            display: inline-block;
            width: 42px;
            height: 21px;
          }
          .list_img {
            display: inline-block;
            width: 100%;
            height: 260px; //position: absolute
          }
        }
        .list_item_title {
          text-align: center;
          height: 46px;
          line-height: 30px;
          font-size: 24px;
          color: rgb(51, 51, 51);
          padding: 15px 15px; // border-bottom: 1px solid rgb(230, 230, 230);
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .list_item_description {
          font-size: 22px;
          color: #999999;
          text-align: center;
          padding: 10px 0px;
          line-height: 30px;
          span img {
            width: 25px;
            height: 25px;
          }
        }
        .list_item_orice {
          font-size: 24px;
          color: rgb(51, 51, 51);
          padding: 10px 0px;
        }
      }
      .linear_item_linear {
        display: block !important;
        padding: 27px 0px 27px 235px;
        position: relative;
        width: auto;
        .list_item_imgBox {
          position: absolute;
          left: 0;
          padding: 0px;
          border: none !important;
          // border: 1px solid rgb(230, 230, 230);
          .list_logo {
            position: absolute;
            display: inline-block;
            width: 42px;
            height: 21px;
          }
          .list_img {
            display: inline-block;
            width: 165px;
            height: 165px; //position: absolute
          }
        }
        .list_item_title {
          height: 46px;
          line-height: 30px;
          font-size: 24px;
          color: rgb(51, 51, 51);
          padding: 15px 0px;
          border-bottom: none;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .list_item_description {
          font-size: 22px;
          color: #979797;
          text-align: left;
          padding: 10px 0px;
          line-height: 30px;
        }
        .list_item_orice {
          font-size: 24px;
          color: #000000;
          padding: 10px 0px;
        }
      }
    }
  }
}
</style>
<style lang="scss" >
.prizeCity .nav-bar .nav-right {
  height: 35px;
 
}
</style>




               