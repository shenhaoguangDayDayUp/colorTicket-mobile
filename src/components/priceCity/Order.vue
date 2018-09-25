<template>
  <div class="right-change">
    <Header title="订单详情"
            :isShow='true'></Header>
    <RightChange :item='defaultAderess'
                 :showEidt.sync='shows'></RightChange>
    <RightChangeItems v-for='(item,index) in detail.items'
                      :item='item'
                      :key='index'
                      :class="[index==0?'m-t-20':'']"></RightChangeItems>
    <div class="order">
      <div class="right-price-box">
        <div class="status">
          <div>
            <span>状态:</span>
            <span class='stauts-detail'>{{detail.status|orderStatus}}</span>
          </div>
        </div>
        <div class="price">奖品小计:</div>
        <div class="score">
          <img src="../../assets/img/big_gold@2x.png" />{{detail.itemsSubtotal|currency}}</div>
      </div>
      <div class="right-price-box">
        <div class="price">快递费用:</div>
        <div class="score">
          <img src="../../assets/img/big_gold@2x.png" />{{detail.deliveryFee|currency}}</div>
      </div>
      <div class="right-price-box">
        <div class="price">订单合计:</div>
        <div class="score color-gold">
          <img src="../../assets/img/big_gold@2x.png" />{{detail.grandTotal|currency}}</div>
      </div>
    </div>
    <div class="submit-box"
         v-if='detail.status =="REQUEST"'>
      <div class="submit-cancel"
           @click='gotoCancel'>取消</div>
      <div class="submit-btn"
           @click='gotoPayment'>兑换</div>
    </div>
    <KeyBord ref="pay"
             :is-pay='isPay'
             v-model="password"
             @pas-end='pasEnd'
             @close='isPay=false'>
             <div slot="content">
               <div class='content-title'>
                  <div class="titles">兑换积分</div>
                        <div class="contents">
                          <img src="../../assets/img/big_gold@2x.png" />{{detail.grandTotal|currency}}
                        </div>
               </div>
             </div>

    </KeyBord>
  </div>
</template>
<script>
import RightChange from "./RightChangeAddress.vue";
import RightChangeItems from "./RightChangeItems.vue";
import { common } from "@/logic";
import { orderCheckOutApi, loginApi } from "@/api/api";
import { mapGetters } from "vuex";
import KeyBord from "@/common/KeyBord";
import sha1 from "js-sha1";

export default {
  computed: {
    ...mapGetters(["defaultAderess",'district']),
    shows() {
      return false;
      // if(this.$route.query.hasOwnProperty('showEidts')){
      //   return false
      // }else{
      //      return this.detail.status =="REQUEST"?true:false
      // }
    }
  },
  data() {
    return {
      isPay: false,
      password: "",
      detail: {}
    };
  },
 async mounted() {

   await this.getOrderInfo();
  await  this.getDefaultAddress();
  },
  methods: {
    async pasEnd() {
      // if (sha1(this.password) != common.getPassword()) {
      //   this.$refs.pay.lodingShow = false;
      //   this.$refs.pay.keyShow = true;
      //   this.$vux.toast.show({
      //     text: "支付密码不正确"
      //   });
      //   return;
      // }

      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        await orderCheckOutApi.payment({ id: this.$route.query.code,passwordRedeem:sha1(this.password) }, token);
        this.$vux.toast.show({
          text: "购买成功"
        });
        this.isPay = false;
        this.$refs.pay.lodingShow = false;
        this.$refs.pay.keyShow = false;

        this.$router.push({
          name: "orderLsit",
          query: { index: 1, routeName: "PrizeCity" }
        });
        // this.$router.push({ name: "orderLsit", query: { index: 1 } });
      } catch (error) {
        this.isPay = false;
        this.$refs.pay.lodingShow = false;
        this.$refs.pay.keyShow = true;
      }
    },
    async getDefaultAddress() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        if(this.detail.status == 'REQUEST'||this.detail.status == 'PROCESS'){
          return
        }
        const { data } = await loginApi.receiversDefault({}, token);
        if (!data) {
          this.$vux.toast.show({
            text: "请先填写收货地址"
          });
        }
        // this.$store.dispatch("toggleUpdateAddres", data);
      } catch (error) {
        console.log(error);
      }
    },
    gotoCancel() {
      var that = this;
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      this.$$message.confirm.show({
        confirm(vm, resolve) {
          try {
            orderCheckOutApi
              .cancel({ id: that.$route.query.code }, token)
              .then(res => {
                that.$vux.toast.show({
                  text: "取消成功"
                });

                that.$router.push({ name: "PrizeCity" });
              });
          } catch (error) {}
          resolve();
        },
        title: "提示",
        content: "是否取消订单?",
        rightBtnText: "返回",
        leftBtnText: "确定",
        cancelShow:true
      });
    },
    async gotoPayment() {


      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        const { status } = await loginApi.redeem({}, token);
      
        if (status == 200) {
             this.isPay = true;

    
        }
      } catch (error) {
       var self = this;
        if(error.status == 456){
              this.$$message.confirm.show({
        confirm(vm, resolve) { 
          self.$router.push({ name: "PasswordSetRedeem" })
          resolve();
        },
        title: "提示",
        content: "您还没有设置支付密码,是否前往设置?",
        rightBtnText: "取消",
        leftBtnText: "确定",
        cancelShow:true
      });
        }
    
      }
    },
    async getOrderInfo() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };

      try {
        const { data } = await orderCheckOutApi.entity(
          { id: this.$route.query.code },
          token
        );
        this.detail = data;
 
       var place = this.district.filter(item => item.value == data.receiverProvince || item.value == data.receiverCity || item.value == data.receiverDistrict)
      var district = Object.assign({}, { city: place[1].name, province: place[0].name, district: place[2].name, mobileNumber: data.receiverMobileNumber, name: data.receiverName, street: data.receiverStreet, status: data.status})
        this.$store.dispatch("toggleUpdateAddres", district);
      } catch (error) {}
    }
  },
  props: {
    showButton: {
      type: Boolean,
      default: true
    }
  },
  components: {
    RightChange,
    RightChangeItems,
    KeyBord
  }
};
</script>
<style lang='scss' scoped>
.content-title{
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .titles{
    font-size: 28px;
 
  }
  .contents{
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 60px;
    color: #ffcb16;
    img{
         width: 45px;
          height: 45px;
          margin-right: 10px;
    }
  }
}
.right-change {
  color: #fff;
  background: #23262b;
  //   height: 100%;
  min-height: 100%;
  padding-top: 94px;
  .order {
    width: 100%;
    box-sizing: border-box;
    font-size: 28px;
    display: flex;
    flex-direction: column;
    height: 287px;
    padding-top: 68px;
    padding-bottom: 68px;
    padding-right: 30px;
    border-bottom: 1px solid #323540;
    background: #2a2d36;
    margin-top: 22px;
    .right-price-box {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .status {
        flex: 1;
        padding-left: 20px;
        .stauts-detail {
          margin-left: 10px;
        }
      }
      .price {
      }
      .score {
        text-align: right;
        margin-left: 20px;
        min-width: 150px;
        img {
          width: 34px;
          height: 34px;
          margin-right: 5px;
        }
      }
      .color-gold {
        color: #ffcb16;
      }
    }
  }
  .submit-box {
    height: 120px;
    padding-top: 21px;
    padding-right: 18px;
    padding-left: 18px;
    padding-bottom: 21px;
    box-sizing: content-box;
    display: flex;
    font-size: 32px;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .submit-btn {
      flex: 1;
      line-height: 78px;
      height: 78px;
      background: #ffcb16;
      border-radius: 10px;
      text-align: center;
      color: #000;
    }
    .submit-cancel {
      width: 230px;
      line-height: 78px;
      height: 78px;
      background: #d3d3d3;
      border-radius: 10px;
      text-align: center;
      color: #000;
      margin-right: 26px;
    }
  }
}
.m-t-20 {
  margin-top: 20px;
}
</style>


