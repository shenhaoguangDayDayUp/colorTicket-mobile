<template>
  <div class="receiverUpdate">
    <Header :title="rcvTitle" :isShow="true"></Header>
    <div class="addrForm">
      <x-input name="username" ref="userName" placeholder="请输入姓名" :is-type="isTypeUserName" :show-clear="true" :required="true" :min="2" :max="10" v-model="userName" @on-change="userNameChange" :icon-type="iconType"></x-input>
      <x-input name="mobile" placeholder="请输入手机号码" keyboard="number" :max="11" :is-type="isTypeMobileNumber" :show-clear="false" v-model="mobileNumber" :icon-type="iconType"></x-input>
      <!-- 收货地址开始 -->
      <x-address :title="title" :list="addressData" placeholder="点击选择" v-model="areaValue">
        <template slot="title" slot-scope="props">
</template>
                </x-address>
            <!-- 收货地址结束 -->
                <x-textarea :max="35" name="detail" placeholder="街道" :show-counter="false" v-model="street"></x-textarea>
                <!-- <check-icon :value.sync="demo:v.favorite" type="plain"> 默认地址({{ demo}})</check-icon> -->
                <Checker checkerTitle="设置为默认地址" :ischoosen.sync="favShow"  @click='favShow=!favShow'></Checker>
        <!-- 报错信息 -->
          <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../../assets/img/tishi@2x.png">{{isError}}</span>
          </div>
          <!-- <x-button type="primary" :disabled="submitBtnDisabled" @click.native="rcvrSubmit">保存</x-button> -->
          <submit text="保存" :disabled="submitBtnDisabled" @click.native="rcvrSubmit"></submit>       

        </div>
        <!-- {{areaValue}} 
        {{getName(areaValue)}} -->
    </div>
</template>
<script>
  import "../../style/btn.scss";
  import "../../style/isError.scss";
  import {
    loginApi
  } from "../../api/api";
  import Header from "../common/Header";
  import Submit from '../common/Button';
  import Checker from "../common/Checker";
  import MapCoding from "../../common/MapCoding.json";
  import {
    XInput,
    XAddress,
    XTextarea,
    XButton,
    Value2nameFilter as value2name
  } from "vux";
  export default {
    name: "ReceiverUpdate",
    components: {
      XInput,
      XAddress,
      XTextarea,
      XButton,
      Header,
      Checker,
      Submit
    },
    computed: {
      submitBtnDisabled() {
        // console.log('userName1')
        // if(!('userName' in this.$refs)) return true;
        // const {userName} = this.$refs;
        // console.log(this.$refs)
        // const flagUserName = userName.$el.className.includes('weui-cell_warn')
        // console.log(flagUserName)
        // return flagUserName;
        if (this.isUserName && this.isMobileNumber && this.street) return false;
        return true;
      }
    },
    data() {
      return {
        favShow: true,
        demo: true,
        addressData: MapCoding,
        title: "选择收货地址",
        areaValue: ["110000", "110100", "110101"],
        userName: "",
        mobileNumber: "",
        street: "",
        isError: "",
        iconType: "",
        rcvTitle: this.$route.query.title,
        isUserName: false,
        isMobileNumber: false
      };
    },
    mounted() {
      let code = this.$route.query.code;
      if (code) {
        // 获取地址信息(地址有code则为编辑用户收货地址信息)
        loginApi.receiversFind({
            id: this.$route.query.code
          }, {
            data: {},
            headers: {
              "x-auth-token": sessionStorage.getItem("TOKEN")
            }
          })
          .then(res => {
            let {
              status,
              data
            } = res;
            if (res.status == 200) {
              this.userName = data.name;
              this.mobileNumber = data.mobileNumber;
              this.street = data.street;
              this.areaValue = [data.provinceID, data.cityID, data.districtID];
            } else {
              this.isError = "出现异常!请重试!";
            }
          })
          .catch(error => {
            switch (error.status) {
              case 456:
                this.isError = error.data;
                break;
              case 567:
                this.isError = "系统错误!";
                break;
              default:
                this.isError = "请求错误!";
                break;
            }
          });
      } else {
        // console.log("else");
      }
    },
    methods: {
      userNameChange(value) {
        // console.log(value)
        // console.log(this.submitBtnDisabled)
      },
      isTypeUserName(value) {
        //  var regName =/^[\u4e00-\u9fa5]{2,4}$/;
        var regName = /^[\u4E00-\u9FA5A-Za-z0-9]{2,12}$/; //2-20位中文、英文、数字但不包括下划线等符号
        if (!regName.test(value)) {
          this.isUserName = false;
          return {
            valid: false,
            msg: '输入姓名格式有误'
          };
        }
        this.isUserName = true;
        return {
          valid: true
        };
      },
      isTypeMobileNumber(value) {
        var myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (!myreg.test(value)) {
          this.isMobileNumber = false;
          return {
            valid: false,
            msg: '输入手机号有误'
          };
        }
        this.isMobileNumber = true;
        return {
          valid: true
        };
      },
      rcvrSubmit() {
        const areaName = this.getName(this.areaValue);
        var arr = areaName.split(" ");
        // 修改地址
        if (this.$route.query.code) {
          const editList = {
            favorite: this.favShow,
            code: this.$route.query.code,
            name: this.userName,
            mobileNumber: this.mobileNumber.replace(/\s+/g, ""),
            province: arr[0],
            city: arr[1],
            district: arr[2],
            street: this.street,
            provinceID: this.areaValue[0],
            cityID: this.areaValue[1],
            districtID: this.areaValue[2]
          };
          // console.log(editList);
          // 修改用户收货地址信息
          loginApi
            .receiversEdit({}, {
              data: editList,
              headers: {
                "x-auth-token": sessionStorage.getItem("TOKEN")
              }
            })
            .then(res => {
              if (res.status == 200) {
                // window.global.$root.eventHub.$emit("addressUpdate");
                this.$router.go(-1);
              } else {
                this.isError = "出现异常!请重试!";
              }
            })
            .catch(error => {
              switch (error.status) {
                case 456:
                  this.isError = error.data;
                  break;
                case 567:
                  this.isError = "系统错误!";
                  break;
                default:
                  this.isError = "请求错误!";
                  break;
              }
            });
          // 增加地址
        } else {
          // 增加用户收货地址信息
          const addList = {
            favorite: this.favShow,
            name: this.userName,
            mobileNumber: this.mobileNumber.replace(/\s+/g, ""),
            province: arr[0],
            city: arr[1],
            district: arr[2],
            street: this.street,
            provinceID: this.areaValue[0],
            cityID: this.areaValue[1],
            districtID: this.areaValue[2]
          };
          loginApi
            .receiversUpdate({}, {
              data: addList,
              headers: {
                "x-auth-token": sessionStorage.getItem("TOKEN")
              }
            })
            .then(res => {
              if (res.status == 200) {
                this.$router.push({
                  name: "Receivers"
                });
              } else {
                this.isError = "出现异常!请重试!";
              }
            })
            .catch(error => {
              switch (error.status) {
                case 456:
                  this.isError = error.data;
                  break;
                case 567:
                  this.isError = "系统错误!";
                  break;
                default:
                  this.isError = "请求错误!";
                  break;
              }
            });
        }
      },
      getName(areaValue) {
        return value2name(areaValue, this.addressData);
      }
    }
  };
</script>
<style lang="scss" scoped>
  .receiverUpdate {
    background-color: #23262b;
    height: 100%;
    color: #fff;
    // overflow: auto;
    padding-top: 94px;
    .addrForm {
      margin: 56px 80px 0;
    }
  }
  .close {
    height: 40px;
    width: 100px;
    img {
      width: 18px;
      margin-left: 20px;
      margin-top: 11px;
      margin-bottom: 11px;
    }
  }
</style>
<style lang="scss">
  .receiverUpdate {
    .weui-input {
      font-size: 28px !important;
    }
    .weui-cell {
      padding: 25px 0 !important;
      font-size: 28px;
      color: #d6dae2;
      border-bottom: 1px solid #898a8c;
    }
    .vux-input-icon.weui-icon-warn:before,
    .vux-input-icon.weui-icon-success:before {
      font-size: 25px;
    }
    .weui-icon-clear{
      font-size:25px;
    }
    .weui-icon-warn {
      font-size: 28px;
      color: #ffcb16 !important;
    }
    .vux-flexbox {
      font-size: 38px !important;
    }
    .weui-cell_access {
      color: #d6dae2 !important;
    }
    .weui-textarea {
      background: transparent;
    }
    .weui-cell:before {
      border-top: 0 !important;
    }
    .vux-cell-box:not(:first-child):before {
      border-top: 0 !important;
    }
    button.weui-btn,
    input.weui-btn {
      margin-top: 219px;
      height: 78px;
      background-color: #ffcb16;
      box-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.04);
      font-size: 32px;
      color: #333;
      letter-spacing: 5px;
    }
    .weui-btn_primary:not(.weui-btn_disabled):active {
      color: rgba(255, 255, 255, 0.6) !important;
      background-color: #fcc400 !important;
    }
    .weui-cell_access .weui-cell__ft:after {
      border:none;
      display: inline-block;
      border-right: 2px solid #ccc;
      border-bottom: 2px solid #ccc;
      width: 11px;
      height: 11px;
      transform: rotate(315deg);
      -webkit-transform: rotate(315deg);
    }
    .vux-cell-primary{
      padding-right:11px;
    }
  }
</style>





