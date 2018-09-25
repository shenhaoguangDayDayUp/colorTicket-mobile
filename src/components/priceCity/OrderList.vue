<template>
  <div class="order-list">
    <Header title="订单清单"
            :isShow="true"></Header>
     <div class="order-list-container">
        <tab v-model="tabActive"
         prevent-default
         active-color='#fdcd00'
         bar-active-color="#fdcd00"
         default-color='#ffffff'
         @on-before-index-change="switchTabItem">
      <tab-item>待支付</tab-item>
      <tab-item>待收货</tab-item>
      <tab-item>全部</tab-item>
    </tab>
    <div>
      <div v-infinite-scroll="loadMore"
           infinite-scroll-disabled="loading"
           infinite-scroll-distance="10">
        <div class="order-content"
             @click='$router.push({name:"order",query:{code:item.code}})'
             v-for="(item,key) in list"
             :key='key'>
          <div class="content-title">
            <div class="title-left">{{item.placeAt|dateFilter('yyyy-MM-dd hh:mm')}}</div>
            <!-- <div class="title-center">{{item.status|orderStatus}}</div> -->
            <div class="title-right">
              <span>
                <img src="../../assets/img/big_gold@2x.png" alt="">
              </span>
              {{item.grandTotal|currency}}
            </div>
          </div>
          <div class="content-list">
            <div class="img-content">
              <div class="content"
                   v-for="(items,keys) in item.items"
                   :key='keys'
                   v-if='keys<3'>
                <img v-lazy="items.product.imagePath"
                     alt="">
              </div>
            </div>
            <div class="content-right">
              <span class="right-arrow"></span>
            </div>
          </div>
        </div>
  
        <load-more v-if='loading&&list.length'
                   :tip="'正在加载'"></load-more>
        <divider class="divider"
                 v-if='noMoreData&&list.length'>我是有底线的</divider>

      </div>
    </div>
      <Empty :show.sync= 'show'></Empty>
      </div>       
    <!-- <Header title="订单清单"
            :isShow='true'></Header> -->

   
  </div>
</template>

<script>
import { Tab, TabItem, LoadMore, Divider } from "vux";
import Header from "@/components/common/Header.vue";
import { orderListApi } from "@/api/api";
import { common } from "@/logic";
import { InfiniteScroll } from "mint-ui";
import { timingSafeEqual } from "crypto";

export default {
  // computed:{
  //   show:{
  //     get(){
  //       return this.list.length > 0?false:true
  //     },
  //     set(val){

  //     }
  //   }
  // },
  directives: {
    InfiniteScroll
  },
  data() {
    return {
      showToast: false,
      loading: false,
      tabActive: Number(this.$route.query.index) || 0,
      page: 1,
      count: 0,
      noMoreData: false,
      list: [],
      show:false,
      isPay:true
    };
  },
async  mounted() {
    window.global.$root.eventHub.$on('loding',res=>{
        this.loading = false;
            this.getList();
  
      })
   await this.getList();
   this.show =  this.list.length > 0?false:true
  },
  components: {
    Tab,
    TabItem,
    Header,
    LoadMore,
    Divider,
  },
  methods: {
    pasEnd(){

    },
    cancel() {},
    success() {
      this.$router.push({ name: "Login" });
    },
    loadMore() {
      if (this.list.length >= this.count) {
        this.loading = false;
        this.noMoreData = true;
        return;
      }
      this.page += 1;
      this.getList();
    },
    async getList() {
      this.show = false
      this.loading = true;
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      if (!common.getCommon("TOKEN")) {
        this.$$message.confirm.show({
          confirm(vm, resolve) {
            vm.$router.push({ name: "Login" });
            resolve();
          },
          cancel(vm, resolve) {
            vm.$router.push({ name: "gameCenter" });
            resolve();
          },
          title: "您还没有登录",
          content: "是否前往登录?",
          rightBtnText: "随便看看",
          leftBtnText: "确定",
          cancelShow:true
        });
      } else {
        var dataList = [];
        var count = 0;
        if (this.tabActive == 0) {
          try {
            const { data } = await orderListApi.unpaid(
              { id: this.page },
              token
            );
            dataList = data.records;
            this.show =  dataList.length > 0?false:true
            this.count = data.count;
            this.loading = false;
          } catch (error) {}
        } else if (this.tabActive == 1) {
          try {
            const { data } = await orderListApi.unreceived(
              { id: this.page },
              token
            );
            dataList = data.records;
            this.show =  dataList.length > 0?false:true
            this.count = data.count;
            this.loading = false;
          } catch (error) {}
        } else {
          try {
            const { data } = await orderListApi.all({ id: this.page }, token);
            dataList = data.records;
            this.count = data.count;
            this.loading = false;
            this.show =  dataList.length > 0?false:true
          } catch (error) {}
        }
   
        for (let index = 0; index < dataList.length; index++) {
          const element = dataList[index];
          this.list.push(element);
        }
      }
    },
    switchTabItem(index) {
      this.tabActive = index;
      this.page = 1;
      this.list = [];
      this.getList();
    }
  }
};
</script>

<style lang='scss' scoped>
.order-list-container{
  
}
.divider {
  padding-top: 40px;
  padding-bottom: 40px;
}
.right-arrow {
    display: inline-block;
    border-right: 5px solid #ccc;
    border-bottom: 5px solid #ccc;
    width: 22px;
    height: 22px;
    transform: rotate(315deg);
    -webkit-transform: rotate(315deg);
  }
.order-list {
  overflow:auto;
  color: #fff;
  background: #23262b;
  height: 100%;
  box-sizing: border-box;
  padding-top: 94px;
  .order-scoller {
    min-height: 80%;
  }
  .nav-bar {
    font-size: 34px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    // height: 74px;
    width: 100%;
    padding-left: 20px;
    background: #1b1a20;
    .left-back {
      flex: 1;
      img {
        //   width: 34px;
        //   height: 34px;
      }
    }
    .title {
      flex: 1;
      text-align: center;
    }
    .right {
      flex: 1;
    }
  }
  .order-content {
    font-size: 28px;
    height: 388px;
    padding-left: 20px;
    padding-right: 20px;
    background: #2a2d36;
    margin-bottom: 22px;

    .content-title::after {
      content: " ";
      position: absolute;
      // top: 20px;
      bottom: 15px;
      right: 0px;
      left: 0px;
      border-bottom: 2px solid #323540;
      // border-right: 2px solid #282828;
      // transform: scaleX(0.5);
      transform-origin: 0% 0%;
    }
    .content-title {
          position: relative;
      height: 128px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .title-left {
        // flex: 1;
        text-align: left;
      }
      .title-center {
        // flex: 1;
        text-align: center;
      }
      .title-right {
        // flex: 1;
        text-align: right;
        margin-right: 5px;
        img{
          width: 34px;
          height: 34px;
        }
      }
    }
    .content-list {
      padding-top: 15px;
      display: flex;
      flex-wrap: nowrap;
      height: 206px;
      align-items: center;
      justify-content: center;
      .img-content {
        height: 100%;
        flex: 20;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        align-items: center;
        .content {
          width: 200px;
          // flex: 1;
          // background: red;
          height: 100%;
          margin-right: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .content-right {
        flex: 1;
      }
    }
  }
}
</style>
<style lang="scss">
.order-list .vux-tab-warp{
      height:70px;
      padding:0;
    }
</style>


