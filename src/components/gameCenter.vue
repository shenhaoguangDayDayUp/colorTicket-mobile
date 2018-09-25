<template>
  <div class="gameCenter">
    <Header title="游戏中心">
    </Header>
    <div class="gameCenterContent">
      <div class="banner">
      <swiper :list="list" v-model="index" height="100%" width="100%" auto loop :show-dots="false" ></swiper>
    </div>
    <!-- 公告 --> 
    <transition name="fade">
      <div class="gameNotice" v-show="noticeShow">
          <icon type="cancel" style="width:10%" @click.native="cancelNotice"></icon>
          <div style="width:90%">
            <swiper :list="noticeList" v-model="index" auto loop height="94px" width="100%"  :interval=2000 direction="vertical" :show-dots="false" @on-click-list-item='clickNotice'></swiper>
          </div>
      </div>
    </transition>
    <div class="gameList">
      <div class="gameListTitle">
        <span>为您推荐</span>
      </div>
      <ul class="gameListCont">
        <li v-for="(v,i) in rcmList" :key='i'>
          <!-- <div class="gameListImg">  -->
            <img v-lazy="v.icon"  alt="" @click.stop='$router.push({name:"gameDetail",query: {name: v.name,code:v.code}})'>
          <!-- </div> -->
          <div>{{v.name}}</div>
        </li>
      </ul>
    </div>
    <div class="gameList wholeGame">
      <div class="gameListTitle">
        <span>全部游戏</span>
      </div>
      <ul class="gameListCont" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="(v,i) in gameList" :key='i'>
          <!-- <div class="gameListImg"> -->
          <img v-lazy="v.icon" alt="" @click.stop='$router.push({name:"gameDetail",query: {name: v.name,code:v.code}})'>
          <!-- </div> -->
          <div>{{v.name}}</div>
        </li>
        <load-more v-if='loading' :tip="'正在加载'"></load-more>
        <divider v-if='noMoreData'>沪ICP备18016530号</divider>
      </ul>
    </div>
    </div>
    
  </div>
</template>
<script>
  import Header from "./common/Header.vue";
  import config from '@/api/config';
  import { Swiper,Icon } from 'vux'
  import {
    gameApi,marketApi
  } from '../api/api';
  import {
    InfiniteScroll
  } from "mint-ui";
  import Vue from 'vue';
  Vue.use(InfiniteScroll); // 使用Vue的分页
  import {
    LoadMore,
    Divider
  } from 'vux'
  export default {
    data() {
      return {
        loading: false,
        rcmList: [],
        gameList: [],
        count: 0,
        page: 1,
        noMoreData: false,
        index:0,
        list:[],
        noticeList:[],
        noticeShow:false
      };
    },
    mounted() {
      this.banner();
      this.notice();
      this.recList();
      this.wholeList();
    },
    beforeRouteLeave(to,from,next){
        if(to.name == 'gameDetail'){
          // to.meta.keepAlive = false;
          from.meta.keepAlive = true;
          next();
        }else{
          // to.meta.keepAlive = true;
          from.meta.keepAlive = false;
          next();
        }
        
    },
    activated(){
      // this.banner();
    },
    methods: {
      // 轮播图列表
      async banner(){
        try {
          const {data} = await marketApi.banner({}, {
                data: {},
                headers: {
                    'x-auth-token': sessionStorage.getItem('TOKEN')
                }});
          var imgPrifex = config.imgUrl[config.env.NODE_ENV];
          this.list = data.map(v => {
            return { img: imgPrifex + v.image ,url:v.link}; // return {...v, img: imgPrifex + v.image ,url:v.link}; 之前的对象也返回
          });
        } catch (err) {}
      },
      //公告列表
      async notice(){
        if(Number(this.getCookie('noticeCookie')) !== 1){
          try {
          const {data} = await marketApi.notice({}, {
                data: {},
                headers: {
                    'x-auth-token': sessionStorage.getItem('TOKEN')
                }});
          this.noticeShow = true;
          if(data.length == 0){
            this.noticeShow = false;
          }
          this.noticeList = data.map(v => {
            return { title:v.title,content:v.content}; 
          });
          // setTimeout(()=>{this.noticeShow = false;},5000);// 公告定时消失
          // this.setCookie('noticeCookie', '1', 1);// 存cookie
        } catch (err) {
          this.noticeShow = false;
          }
        }else{
          this.noticeShow = false;
        }
        
      },
      // 推荐列表
      async recList() {
        try {
          const {
            data
          } = await gameApi.rec();
          var imgPrifex = config.imgUrl[config.env.NODE_ENV]
          var imgList = data.forEach(v => {
            v.icon = imgPrifex + v.icon
          });
          this.rcmList = data
        } catch (err) {}
      },
      // 游戏列表
      async wholeList() {
        this.loading = true;
        try {
          const {
            data
          } = await gameApi.entity({id: this.page});
          // const {
          //   data
          // } = await gameApi.entity({id: this.page},{
          //       data: {},
          //       headers: {
          //           'x-auth-token': sessionStorage.getItem('TOKEN')
          //       }});
          this.loading = false;
          var imgPrifex = config.imgUrl[config.env.NODE_ENV]
          for (let index = 0; index < data.records.length; index++) {
            const element = data.records[index];
            element.icon = imgPrifex + element.icon
            this.gameList.push(element);
          }
          this.count = data.count;
        } catch (err) {}
      },
      loadMore() {
        if (this.gameList.length >= this.count) { //当拉到底的时候
          this.loading = false;
          this.noMoreData = true;
          return;
        }
        this.page += 1;
        this.wholeList();
      },
      // 点击公告
      clickNotice(item){
        var that = this;
        this.$$message.confirm.show({
            confirm(vm, resolve) {
                resolve();
            },
            title: item.title,
            content: item.content,
            rightBtnText: "关闭",
            leftBtnText: "我知道了",
            cancelShow: false,
        });
      },
      // 取消公告
      cancelNotice(){
        this.setCookie('noticeCookie', '1', 1);// 存cookie
        this.noticeShow = false;
      },
      // cookie操作
       setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            console.log(d)
            // var expires = "expires=" + d.toUTCString();
            var expires = "expires=" + d;
         document.cookie = cname + "=" + cvalue + "; " + expires+"; path=/" 
            console.log(d)
        },
        //获取cookie
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while(c.charAt(0) == ' ') c = c.substring(1);
                if(c.indexOf(name) != -1) return c.substring(name.length, c.length);
            }
            return "";
        }
    },
    components: {
      Header,
      LoadMore,
      loading: false,
      Divider,
      Swiper,
      Icon
    },
  };
</script>
<style lang="scss" scoped>
  .gameCenter {
    color: #fff;
    height:100%;
    .gameCenterContent{
      padding-bottom: 100px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .banner {
      width: 100%;
      height: 330px;
    }
    .gameNotice{
      margin-top:20px;
      height: 94px;
      display:flex;
      justify-content:space-between;
      color:#ffcb16;
      transition: all .3s ease;
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0, rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.7)));
      text-shadow: 0 0.01333rem 0 rgba(0, 0, 0, 0.5);
      text-align: center;
      i{
        padding-left:16px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .gameList {
      margin-top: 3px;
      .gameListTitle {
        padding: 42px 0;
        span {
          border-left: 4px solid #ffcb16;
          padding-left: 16px;
          font-size: 30px;
          margin-left: 24px;
        }
      }
      ul.gameListCont {
        display: flex;
        display: -webkit-flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        box-sizing: border-box; 
        li {
          width: 33.33333333333%;
          margin-bottom: 55px;
          text-align: center; 
          box-sizing: border-box;
          .gameListImg{
            height: 190px;
            width: 190px;
            margin:0 auto;
            margin-bottom: 24px;
          }
          img {
            height: 190px;
            width: 190px;
            margin-bottom: 24px;
          }
          span {
            font-size: 28px;
            width: 100%;
            text-align: center;
          }
          div{
            font-size:28px;
          }
        } 
      }
    }
    .gameList.wholeGame {
      margin-top: -55px; // -55+3
    }
  }
</style>
<style>
  .gameCenter .vux-divider:after,
  .gameCenter .vux-divider:before {
    top: 0;
  }
  .banner .vux-slider{
    height:100%;
  }
  .banner .vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-img{
    height:100%!important;
    width:100%!important;
  }
  .gameCenter .weui-icon-cancel{
    color:#ffcb16;
    font-size:40px;
  }
  .gameNotice .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{
        display: none;
      }
    .gameNotice .vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-swiper-desc{
      height:100%!important;
      font-size: 30px;
      background: none;
    }
</style>



