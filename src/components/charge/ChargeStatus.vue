<template>
  <div class="change-status">
    <!-- <Header title='在线充值'></Header> -->
    <div class="content"
         v-if='show'>
      <img v-if='status'
           src="../../assets/img/chongzhichengong@1x.png"
           alt="">
      <img v-else
           src="../../assets/img/chongzhishibai@1x.png"
           alt="">
      <div v-if='status'
           class="message-tip">恭喜您,充值成功!</div>
      <div v-else
           class="message-tip">很抱歉,充值失败!</div>
    </div>
    <div class="button-box">
      <div class="game-center-button" @click="$router.push({name:'gameCenter'})">游戏厅</div>
      <div class="change-tip"
           @click="$router.push({name:'change',query:{show:false}})">交易明细</div>
    </div>

  </div>
</template>
<script>
import Header from "@/components/common/Header.vue";
import { transactionsApi } from "@/api/api";
import { common } from "@/logic";
export default {
  data() {
    return {
      status: false,
      show: true
    };
  },
  components: {
    Header
  },
  computed: {
    // status(){
    //   return window.location.hash.queryParameters().trade_status == 'TRADE_SUCCESS'?true:false
    // }
  },
  mounted() {
    this.$nextTick(res => {
      (this.show = false),
        this.$vux.loading.show({
          text: "请稍候"
        });
      this.rechargeCallBack();
    });
  },
  methods: {
    async rechargeCallBack() {
      try {
        var token = {
          headers: { "x-auth-token": common.getCommon("TOKEN") }
        };
        var code = window.location.hash.queryParameters().out_trade_no;
        const data = await transactionsApi.successCharge({ id: code }, token);
        this.status = true;
        this.show = true;
        this.$vux.loading.hide();
      } catch (error) {
        this.status = false;
        this.$vux.loading.hide();
        this.show = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.change-status {
  color: #fff;
  background: #23262b;
  height: 100%;
  font-size: 28px;
  .content {
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    height: 507px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 127px;
      height: 127px;
    }
    .message-tip {
      margin-top: 20px;
    }
  }
  .button-box {
    height: 197px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 40px;
    padding-right: 40px;
    div {
      height: 80px;
      line-height: 80px;
      color: black;
      text-align: center;
      border-radius: 10px;
    }
    .game-center-button {
      background: #ffcb16;
    }
    .change-tip {
      background: #d3d3d3;
    }
  }
}
</style>


