<template>
  <div class="right-change">
    <Header title="兑换"
            :isShow='true'></Header>
    <div class="right-change-content">
      <RightChange :item='defaultAderess'></RightChange>

      <RightChangeItems v-for='(item,index) in detail.items'
                        :item='item'
                        :key='index'
                        :class="[index==0?'m-t-20':'']"></RightChangeItems>
      <!-- <RightChangeItems></RightChangeItems> -->
      <div class="order">
        <div class="right-price-box">
          <div class="price">奖品小计:</div>
          <div class="score">
            <img src="../../assets/img/big_gold@2x.png" /> {{detail.itemsSubtotal|currency}}
          </div>
        </div>
        <div class="right-price-box">
          <div class="price">快递费用:</div>
          <div class="score">
            <img src="../../assets/img/big_gold@2x.png" /> {{detail.deliveryFee|currency}}
          </div>
        </div>
        <div class="right-price-box">
          <div class="price">订单合计:</div>
          <div class="score color-gold">
            <img src="../../assets/img/big_gold@2x.png" /> {{detail.grandTotal|currency}}
          </div>
        </div>
      </div>
      <div :class="[defaultAderess?'submit-box':'submit-box-disabled']">
        <div :class="[defaultAderess?'submit-btn':'submit-btn-disabled']"
             @click='gotoSubmit'>提交</div>
      </div>
    </div>

  </div>
</template>
<script>
import RightChange from "./RightChangeAddress.vue";
import RightChangeItems from "./RightChangeItems.vue";
import { orderCheckOutApi, loginApi } from "@/api/api";
import { common } from "@/logic";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["defaultAderess"])
  },
  data() {
    return {
      detail: {}
    };
  },
  components: {
    RightChange,
    RightChangeItems
  },
  async mounted() {
   await this.getDefaultAddress();
    // await 


    // window.global.$root.eventHub.$on("addressUpdate", () => {
    //   console.log("地址更新了");
    //   this.$vux.toast.show({
    //     text: "地址更新了"
    //   });
    // });
  },
  methods: {
    async getDefaultAddress() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      try {
        const { data } = await loginApi.receiversDefault({}, token);
       
        this.$store.dispatch("toggleUpdateAddres", data);
        if (!data) {
          // return this.$vux.toast.show({
          //   text: "收货信息为空"
          // });
        return  this.$$message.confirm.show({
            confirm(vm, resolve) {
              vm.$router.push({ name: "ReceiversList" });
              resolve();
            },
            cancel(vm, resolve) {
              vm.$router.go(-1);
              resolve();
            },
            title: "您还没有添加收货地址",
            content: "是否前往添加?",
            rightBtnText: "取消",
            leftBtnText: "确定",
            cancelShow:true
          });

        }
        this.getInfo();
      } catch (error) {
        if (error.status == 567) {
          this.$vux.toast.show({
            text: "请选择收获地址",
            time: 4000
          });
        }
      }
    },
    async gotoSubmit() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
      var personalInfo = {
        receiverName: this.defaultAderess.name,
        receiverMobileNumber: this.defaultAderess.mobileNumber,
        receiverProvince: this.defaultAderess.provinceID,
        receiverCity: this.defaultAderess.cityID,
        receiverDistrict: this.defaultAderess.districtID,
        receiverStreet: this.defaultAderess.street,
        items: []
      };
      var productList = [...this.detail.items];
      productList = productList.map(item => {
        return {
          product: { code: item.product.code },
          quantity: item.quantity
        };
      });
      personalInfo.items = productList;
      try {
        const { data } = await orderCheckOutApi.place(personalInfo, token);
        this.$router.push({
          name: "order",
          query: { code: data.code, showEidts: false }
        });
      } catch (error) {}
    },
    async getInfo() {
      var token = {
        headers: { "x-auth-token": common.getCommon("TOKEN") }
      };
       var personalInfo = JSON.parse(this.$route.query.product);
      Object.assign(personalInfo.personalInfo, {
        receiverName: this.defaultAderess.name,
        receiverMobileNumber: this.defaultAderess.mobileNumber,
        receiverProvince: this.defaultAderess.provinceID,
        receiverCity: this.defaultAderess.cityID,
        receiverDistrict: this.defaultAderess.districtID,
        receiverStreet: this.defaultAderess.street
      });
      console.log(personalInfo.personalInfo);
     try {
 
        const { data } = await orderCheckOutApi.checkout(
          personalInfo.personalInfo,
          token
        );
        this.detail = data;
      } catch (error) {
   
      }
    }
  }
};
</script>
<style lang='scss' scoped>
.right-change {
  color: #fff;
  background: #23262b;
  min-height: 100%;
  // overflow: auto;
  padding-top: 94px;
  .right-change-content {
  }
  .order {
    margin-top: 22px;
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
    .right-price-box {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .price {
      }
      .score {
        text-align: right;
        margin-left: 20px;
        min-width: 150px;
        img {
          width: 34px;
          height: 34px;
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
    flex-direction: column;
    justify-content: center;
    .submit-btn {
      line-height: 78px;
      height: 78px;
      background: #ffcb16;
      border-radius: 10px;
      text-align: center;
      color: #000;
    }
  }
  .submit-box-disabled {
    font-size: 32px;
    height: 120px;
    padding-top: 21px;
    padding-right: 18px;
    padding-left: 18px;
    padding-bottom: 21px;
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .submit-btn-disabled {
      line-height: 78px;
      height: 78px;
      background: #666;
      border-radius: 10px;
      text-align: center;
      color: #000;
    }
  }
}
.m-t-20 {
  margin-top: 20px;
}
</style>


