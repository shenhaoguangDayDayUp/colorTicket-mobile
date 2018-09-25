<template>
  <div id="mytab">
    <router-view></router-view>
    <!-- 路由跳转必写 -->
    <tabbar v-model="selected"
            style="position:fixed;left:0;bottom:0;z-index:900">
      <tabbar-item link="/gameCenter">
        <img v-if=" selected !== 0 "
             slot="icon"
             src="../../assets/img/youxiting.png">
        <img v-else
             slot="icon"
             src="../../assets/img/youxiting2.png">
        <span slot="label">游戏厅</span>
      </tabbar-item>
      <tabbar-item link="/prizeCity">
        <img v-if=" selected !== 1 "
             slot="icon"
             src="../../assets/img/jiangpincheng.png">
        <img v-else
             slot="icon"
             src="../../assets/img/jiangpincheng2.png">
        <span slot="label">奖品城</span>
      </tabbar-item>
      <tabbar-item selected
                   link="/main">
        <img v-if=" selected !== 2 "
             slot="icon"
             src="../../assets/img/wode.png">
        <img v-else
             slot="icon"
             src="../../assets/img/wode2.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
import { Tabbar, TabbarItem } from "vux";
export default {
  components: {
    Tabbar,
    TabbarItem
  },
  mounted(){
    //清空购物车
     this.$store.dispatch("toggleGoodsList",{goods:[],selected:false} );
  },
  name: "app",
  methods:{
       findActive(list,val){
        for(var i = 0;i<list.length;i++){
            for(var l =0;l<list[i].length;l++){
                if(list[i][l]==val.path){
                  this.active = i;
                  console.log(i)
                  break
                }
            }
        }
    }
  },
  data() {
    return {
      active:'',
      routerList: [["/gameCenter"], ["/prizeCity"], ["/main",'/change','/message','/entity']],
      selected: 2
    };
  },
  watch: {
    selected: function(val, oldVal) {
      this.selected = val;

    },
    $route: {
      handler(val) {
       this.$nextTick(()=>{
         this.findActive(this.routerList,val);

        //  var index =   this.routerList.findIndex((item,index)=>{
        //      return val.path == item
        //    })
       this.selected = Number(this.active)

      //  this.selected = index
       })
      },
      immediate: true,
      deep: true
    }
  }
};
</script>


<style lang="scss" scoped>
#mytab {
  height: 100%;
  padding:94px 0;
  // padding-top:94px;
  .weui-tabbar {
    height: 98px;
    background: #2f323b;
    box-shadow: 0px -9px 9px 0px rgba(0, 0, 0, 0.1);
  }
  .weui-tabbar:before {
    border: none;
  }
  .weui-tabbar__item {
    padding: 0;
    font-size: 20px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
<style lang="scss">
.weui-tabbar__item > .weui-tabbar__icon {
  height: 48px;
  width: 48px;
  margin: 0 auto;
}
.weui-tabbar__item > .weui-tabbar__label {
  font-size: 20px;
}
</style>
 