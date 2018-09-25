<template>
  <div class="charge">
    <Header title="在线充值"
            :isShow='true'></Header>
    <div class="content">
      <div class="price">
        <div class="price-bar"></div>
        <div class="title">请选择购买金额</div>
      </div>
      <div class="price-list">
        <div @click='priceClick(index)'
             v-for="(items,index) in priceList"
             :class="['item',items.selected?'item-active':'']"
             :key=index>{{items.price }}元</div>
      </div>
      <div class="price">
        <div class="price-bar"></div>
        <div class="title">请选择支付方式</div>
      </div>
      <div class="price-list">
        <div @click='payClick(index)'
             v-for="(items,index) in payList"
             :class="['item-pay',items.selected?'item-pay-active':'']"
             :key=index>{{items.title }}</div>
      </div>
      <div class="next"
           @click='gotoCharge'>
        <div class="btn">下一步</div>
      </div>
    </div>

  </div>
</template>
<script>
import Header from "@/components/common/Header.vue";
import { transactionsApi } from "@/api/api";
import { common } from "@/logic";
export default {
  methods: {
    async gotoCharge() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      var list = this.priceList.filter(item => item.selected);
      try {
        const { data } = await transactionsApi.recharge(
          { method: "ALIPAY_PAGE", amount: list[0].price },
          token
        );
        const div = document.createElement("div");
        div.innerHTML = data.note;
        document.body.appendChild(div);
        document.forms.punchout_form.submit();
      } catch (error) {
        //      this.$vux.toast.show({
        //   text: error
        // });
      }
    },
    payClick(idx) {
      this.payList.filter((item, index) => {
        if (index == idx) {
          item.selected = true;
          return item;
        } else {
          item.selected = false;
          return item;
        }
      });
    },
    priceClick(idx) {
      this.priceList.filter((item, index) => {
        if (index == idx) {
          item.selected = true;
          return item;
        } else {
          item.selected = false;
          return item;
        }
      });
    }
  },
  data() {
    return {
      priceList: [
        { selected: true, price: 10 },
        { selected: false, price: 20 },
        { selected: false, price: 50 },
        { selected: false, price: 100 },
        { selected: false, price: 500 },
        { selected: false, price: 1000 }
      ],
      payList: [
        { selected: true, title: "支付宝" },
        { selected: false, title: "微信" }
      ]
    };
  },
  mounted(){
      if(!common.getCommon("TOKEN")){
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
      }
     
  },
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.charge {
  color: #fff;
  background: #23262b;
  height: 100%;
  font-size: 28px;
  overflow: auto;
  .content {
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 36px;
    margin-top:94px;
    // height: 100%;
    .price {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 30px;
      line-height: 30px;
      .price-bar {
        width: 5px;
        height: 100%;
        background: #ffcb16;
      }
      .title {
        margin-left: 22px;
        flex: 1;
      }
    }
    .price-list {
      padding-bottom: 52px;
      padding-top: 17px;
      padding-left: 22px;
      padding-right: 22px;
      display: flex;
      flex-direction: row;
      position: relative;
      flex-wrap: wrap;
      justify-content: space-between;
      .item-active {
        background-image: url("../../assets/img/xuanzhong@1x.png");
        background-repeat: no-repeat;
        background-size: 200px 80px;
        background-position: 0 0;
        border: 0 !important;
      }
      .item {
        position: relative;
        width: 200px;
        height: 80px;
        background-color: #23262b;
        color: #e9e9e9;
        font-size: 28px;
        margin-top: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #999999;
        border-radius: 5px;
      }
      .item-pay {
        position: relative;
        width: 320px;
        height: 80px;
        background-color: #23262b;
        color: #e9e9e9;
        font-size: 28px;
        margin-top: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #999999;
        border-radius: 5px;
      }
      .item-pay-active {
        background-image: url("../../assets/img/xuanzhong@1x.png");
        background-repeat: no-repeat;
        background-size: 320px 80px;
        background-position: 0 0;
        border: 0 !important;
      }
    }
    .next {
      margin-top: 50px;
      display: flex;
      flex-direction: row;
      height: 80px;
      text-align: center;
      .btn {
        height: 100%;
        line-height: 80px;
        flex: 1;
        background: #ffcb16;
        border-radius: 10px;
        font-size: 28px;
        color: #000000;
      }
    }
  }
}
</style>


