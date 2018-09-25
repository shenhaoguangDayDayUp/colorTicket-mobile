<template>
  <div class="login">
    <Header title="会员登录" :isShow="true"></Header>
    <!-- <div class="normalTab">L O G O</div> -->
    <div class="content">
      <div class="slide_son" style="display: inline-block;width: 100%;">
        <!--账号登录begin-->
        <form @submit.prevent="validateBeforeSubmit">
          <ul class="normalLogin">
            <li>
              <i class="isTip isTel" v-if="judgePhone"><img src="../assets/img/tishi@2x.png">输入的手机号有误</i>
              <input v-model="userName" @blur="blurPhone()" id="userName" type="tel" placeholder="手机号" autocomplete="off" autofocus="autofocus" maxlength="11">
            </li>
            <li class="lg_border">
              <i class="isTip ispwd" v-if="judgePwd"><img src="../assets/img/tishi@2x.png">请输入6-20位字母数字或下划线</i>
              <input @blur="blurPwd()" v-model="normalPwd" ref="normalPwd" placeholder="登录密码" autocomplete="off" type="password" style="background-color:transparent " maxlength="20">
              <eye-change></eye-change>
            </li>
          </ul>
        </form>
        <!--账号登录end-->
        <!-- 账号密码登录特有的忘记密码 -->
        <div class="forget">
          <label class="mint-checklist-label">
                            <span class="mint-checkbox"  @click.prevent="ischoosen">
                              <input type="checkbox" v-model='choosen' class="mint-checkbox-input" > 
                              <span class="mint-checkbox-core">
                              </span>
                            </span> 
                            <span class="mint-checkbox-label">下次自动登录</span>
                        </label>
          <router-link :to="{path:'/password',query: {code: 1,title:'找回密码'}}">忘记密码</router-link>
          <!-- <router-link :to="{path:'/password2',query: {code: 1,title:'找回密码'}}">忘记密码</router-link> -->

        </div>
        <!-- 报错信息 -->
        <div class="isError" v-if="isError">
          <span class="isTip ispwd"><img src="../assets/img/tishi@2x.png">{{isError}}</span>
        </div>
      </div>
      <submit text="登录" :disabled="submitBtnDisabled" @click.native="submits()"></submit>
    </div>
    <div class="toRegister" >
      <span>没有账号？</span>
      <span style="color:#ffcb16;" @click="toRegister">立即注册</span>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/common/Header.vue";
  import Submit from "@/components/common/Button.vue";
  import EyeChange from "@/common/EyeChange.vue";
  // mint-ui
  import Vue from 'vue'
  import {
    Checklist
  } from 'mint-ui';
  Vue.component(Checklist.name, Checklist);
  // sha1加密
  import sha1 from 'js-sha1'
  import {
    user
  } from '@/logic'
  import {loginApi} from '@/api/api';
  export default {
    name: "Login",
    components: {
      Header,
      Submit,
      EyeChange
    },
    data() {
      return {
        judgePhone: '',
        judgePwd: '',
        seen: 'ok',
        isError: '',
        choosen: true,
        // v-model
        userName: '',
        normalPwd: '',
        maxlength:Number(11)
      };
    },
    computed: {
      submitBtnDisabled() {
        if (this.$options.methods.isPwd(this.normalPwd) && this.$options.methods.isPoneAvailable(this.userName)) return false;
        return true;
      }
    },
    methods: {
      ischoosen() {
        this.choosen = !this.choosen;
      },
      toRegister() {
        this.$router.push({
          path: '/register'
        })
      },
      //函数号码验证
      isPoneAvailable(str) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
          return false;
        } else {
          return true;
        }
      },
      // 密码验证
      isPwd(pwd) {
        var patrn = /^(\S){6,20}$/; // 这种可以写汉字
        // var patrn = /^[a-zA-Z0-9]\w{6,20}$/ 
        if (!patrn.exec(pwd)) return false;
        return true
      },
      // 密码明暗 切换input type
      toggle() {
        if (this.seen == '') {
          this.seen = 'ok'
          this.$refs.normalPwd.type = 'password'
        } else {
          this.seen = '';
          this.$refs.normalPwd.type = 'text'
        }
      },
      // 表单判断
      blurPhone() {
        if (!this.$options.methods.isPoneAvailable(this.userName)) {
          this.judgePhone = 'ok';
        } else {
          this.judgePhone = '';
        }
      },
      blurPwd() {
        // console.log('密码检测')
        if (!this.$options.methods.isPwd(this.normalPwd)) {
          this.judgePwd = 'ok'
        } else {
          this.judgePwd = ''
        }
      },
      // 提交登录请求
      submits() {
        var loginParams = {
          mobileNumber: this.userName,
          password: sha1(this.normalPwd)
        };
        loginApi.login(loginParams).then(res => {
          const {
            headers
          } = res
          // 判断用户下次是否直接登录
          if (this.choosen) {
            var profile = Object.assign({}, loginParams)
            sessionStorage.setItem("TOKEN", headers['x-auth-token']);
            user.setLoginUser(profile);
            user.setLoginLink(Object.assign({},{password0:this.normalPwd}));
          } else {
            sessionStorage.setItem("TOKEN", headers['x-auth-token']);
          }
          if (this.$route.query.forgetPwd == 1) { //修改密码后的登录
            this.$router.push({
              path: '/gameCenter'
            })
          } else {
            this.$router.go(-1)
          }
        }).catch(error => {
          // this.isError = '登录失败!'
        });
      }
    },
  };
</script>
<style lang="scss" scoped>
  @import '../style/myform.scss';
  .login {
    background: url("../assets/img/bg.jpg") no-repeat;
    background-size: cover;
    color: #fff;
    height: 100%;
    width:100%;
    // overflow: auto;
    padding-top:97px;
    .icon-eye{
      background: url("../assets/img/hide.png") no-repeat;
      background-size: contain;
      }
      .eye-grey{
          background: url("../assets/img/show.png") no-repeat;
      background-size: contain;
      }
  }
  .toRegister {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 26px;
    height: 90px;
    a {
      color: #ffcb16;
      height: 28px;
      text-decoration: underline;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>


