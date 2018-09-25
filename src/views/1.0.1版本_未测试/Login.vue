<template>
    <div class="cy_app_form cy_app_form_login">
        <Header title="会员登录" :isShow="true"></Header>
        <cy-form :model="formData"  :rules="rules"  ref="forms" style="color:#fff;">
            <cy-form-item prop="tel" >
                <cy-input type="tel" v-model="formData.tel"  placeholder="手机号" :maxlength="11" ></cy-input>
            </cy-form-item>
            <cy-form-item prop="pwd">
                <cy-input type="password" v-model="formData.pwd"  placeholder="密码" :maxlength="20" :eyeShow="true" ></cy-input>
            </cy-form-item>
            <!-- 忘记密码 -->
            <div class="cy_app_form_checkbox">
                <div @click.stop="checkboxList" class="cy_app_form_checkbox-left">
                        <div class="checkbox-align">
                            <div :class="['checkbox',{'radio-selected':selected}]"></div>
                        </div>
                    <span>下次自动登录</span>
                </div>
                <span @click='$router.push({path:"/password",query:{code: 1,title:"找回密码"}})'>忘记密码</span>
            </div>
            <submit @click.native="handleSubmit" :disabled="submitBtnDisabled">登录</submit>
            <div class="cy_app_form_toregister">
                <span>没有账号？</span>
                <span style="color:#ffcb16;"  @click="$router.push({path: '/register'})">立即注册</span>
            </div>
        </cy-form>
    </div>
</template>
<script>
    import {CyForm,CyFormItem,CyInput} from '@/common/Form';
    import Submit from "@/components/common/Button.vue";
    import Header from "@/components/common/Header.vue";
    import {loginApi} from '@/api/api';
    import sha1 from 'js-sha1';
    import {user} from '@/logic';
    export  default  {    
        data ()  {      
            var password = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("密码不能为空!"));
                } else {
                    var strings = String(value);
                    console.log(strings.length);
                    if (strings.length > 21) {
                        callback(new Error("请输入6-20字密码"));
                    }
                    if (strings.length < 6) {
                        callback(new Error("请输入6-20位密码"));
                    }
                    callback();
                }
                callback();
                };
            return  {        
                formData:  {          
                    tel:'',
                    pwd:''    
                },
                rules:  {          
                    tel:  [{
                        required: true,
                        message: '请输入正确的11位手机账号',
                        pattern:   /^[1][3,4,5,7,8][0-9]{9}$/,
                        trigger: 'blur',
                        min: 11, 
                        max: 11,
                    }], 
                    pwd:[{
                        validator: password,
                        trigger: "blur",
                        required: true
                    }]   
                }  ,
                selected:true,
            }    
        },
        computed:{
            submitBtnDisabled(){
                if(this.formData.tel && this.formData.pwd) return false;
                return true;
            }  
        },
        methods:  {      
            handleSubmit ()  {      
                this.$refs.forms.validate(value => {
                    if(value){
                        const loginParams = Object.assign({},{mobileNumber:this.formData.tel},{password:sha1(this.formData.pwd)});
                        loginApi.login(loginParams).then(res => {
                            const {headers} = res;
                            sessionStorage.setItem("TOKEN", headers['x-auth-token']);
                            if (this.selected) { // 自动登录checkbox
                                user.setLoginUser(Object.assign({}, loginParams));
                                user.setLoginLink(Object.assign({},{password0:this.formData.pwd}));
                            } 
                            if (this.$route.query.forgetPwd == 1) { //修改密码后的登录
                                this.$router.push({path: '/gameCenter'})
                            } else {
                                this.$router.go(-1)
                            }
                        }).catch(error => {});
                    }
                })      
            },
            checkboxList(){
                this.selected = !this.selected;
            },  
        },
        components:  {      
            CyForm,
            CyFormItem,
            CyInput,
            Submit
        }  
    }
</script>
<style lang="scss" scoped>
@mixin display-center{
    display: flex;
    align-items: center;
    justify-content: center;
}
@mixin display-between{
    display:flex;
    justify-content: space-between;
}
.cy_app_form_toregister {
    @include display-center;
    text-align: center;
    height: 90px;
  }
  .cy_app_form_checkbox{
      margin-top: 42px;
      color: #ffcb16;
      @include display-between;
      .cy_app_form_checkbox-left{
        @include display-between;
        span{
            margin-left:8px;
        }
      }
      .checkbox-align{
        height:100%;
        width:27px;
        @include display-center;
        .checkbox{
                height: 27px;
                width: 27px;
                background: url("../assets/img/juxing@1x.png") no-repeat;
                background-size:cover;
            }
            .radio-selected {
                background: url("../assets/img/fuxuan@1x.png") no-repeat;
                background-size:cover;
            }
        }
  } 
</style>

