<template>
    <div class="password">
        <Header :title="this.$route.query.title" :isShow="true"></Header>
        <div class="nav" v-if="!this.$route.query.code">
            <div class="nav-tab " @click="choosenP" :class="{ 'tabActive': tabActive}">
                <mt-button size="small" @click.native.prevent="active = 'tab-container1'">密码验证</mt-button>
            </div>
            <div class="nav-tab" @click="choosenM" :class="{ 'tabActive': !tabActive}">
                <mt-button size="small" @click.native.prevent="active = 'tab-container2'">短信验证</mt-button>
            </div>
        </div>
        <!-- 忘记密码（手机账户动态码登录） -->
        <div class="mint-tab-container" v-if="this.$route.query.code == 1" >
            <cy-form :model="formDataCode"  :rules="rules"  style="color:#fff;" ref="formDataCode">
                    <cy-form-item prop="tel">
                        <cy-input type="tel" v-model="formDataCode.tel"  placeholder="手机号" :maxlength="11" ></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="smsCode">
                        <cy-input type="text" v-model="formDataCode.smsCode"  placeholder="验证码" :maxlength="4" :codeShow="true" :sendSmsCode="sendSmsCode" :smsCodeCount="smsCodeCount" @handleSmsCode="handleSmsCode" ></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="pass">
                        <cy-input type="password" v-model="formDataCode.pass"  placeholder="新密码" :maxlength="20" :eyeShow="true"></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="checkPass_">
                        <cy-input type="password" v-model="formDataCode.checkPass_"  placeholder="确认新密码" :maxlength="20" :eyeShow="true"></cy-input>
                    </cy-form-item>
                    <submit @click.native="submitsCode" :disabled="submitBtnDisabledPwd">提交</submit>
                    <div>手机动态码：{{sCode}}</div>
                </cy-form>
        </div>
        <!-- 重置密码 -->
        <mt-tab-container v-model="active" v-else>
            <mt-tab-container-item id="tab-container1">
                <cy-form :model="formData" :rules="rules" style="color:#fff;" ref="formData">
                    <cy-form-item prop="tel" >
                        <cy-input type="tel" v-model="formData.tel"  placeholder="手机号" :maxlength="11" ></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="pwd">
                        <cy-input type="password" v-model="formData.pwd"  placeholder="当前密码" :maxlength="20" :eyeShow="true"></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="pass">
                        <cy-input type="password" v-model="formData.pass"  placeholder="新密码" :maxlength="20" :eyeShow="true"></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="checkPass">
                        <cy-input type="password" v-model="formData.checkPass"  placeholder="确认新密码" :maxlength="20" :eyeShow="true"></cy-input>
                    </cy-form-item>
                    <submit @click.native="submits" :disabled="submitBtnDisabled">提交</submit>
                </cy-form>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
                <cy-form :model="formDataCode"  :rules="rules"  style="color:#fff;" ref="formDataCode">
                    <cy-form-item prop="tel">
                        <cy-input type="tel" v-model="formDataCode.tel"  placeholder="手机号" :maxlength="11" ></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="smsCode">
                        <cy-input type="text" v-model="formDataCode.smsCode"  placeholder="验证码" :maxlength="4" :codeShow="true" :sendSmsCode="sendSmsCode" :smsCodeCount="smsCodeCount" @handleSmsCode="handleSmsCode" ></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="pass">
                        <cy-input type="password" v-model="formDataCode.pass"  placeholder="新密码" :maxlength="20" :eyeShow="true"></cy-input>
                    </cy-form-item>
                    <cy-form-item prop="checkPass_">
                        <cy-input type="password" v-model="formDataCode.checkPass_"  placeholder="确认新密码" :maxlength="20" :eyeShow="true"></cy-input>
                    </cy-form-item>
                    <submit @click.native="submitsCode" :disabled="submitBtnDisabledPwd">提交</submit>
                    <div>手机动态码：{{sCode}}</div>
                </cy-form>
            </mt-tab-container-item>
        </mt-tab-container>
        
    </div>
</template>
<script>
    import Header from "@/components/common/Header.vue";
    import Submit from "@/components/common/Button.vue";
    // mint-ui
    import Vue from 'vue';
    import {Navbar,TabItem,Button,TabContainer, TabContainerItem} from 'mint-ui';
    Vue.component(Navbar.name, Navbar);
    Vue.component(TabItem.name, TabItem);
    Vue.component(Button.name, Button);
    Vue.component(TabContainer.name, TabContainer);
    Vue.component(TabContainerItem.name, TabContainerItem);
    import sha1 from 'js-sha1'
    import {user} from '@/logic'
    import {CyForm,CyFormItem,CyInput} from '@/common/Form';
    import {loginApi,getCodeApi} from '@/api/api';
    export default {
        name: "Password2",
        data() {
            var tel = (rule,value,callback) => {
                if (value === '') {
                    callback(new Error("请输入手机号"));
                } else {
                    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
                    if (!myreg.test(value)) {
                        callback(new Error("请输入正确的11位手机账号"));
                    } else {
                        this.telToggle = true;
                    }
                    callback();
                }
            } ;
            var password = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error("请输入密码"));
                } else {
                    if (String(value).length < 6) {
                        callback(new Error("请输入6-20位密码"));
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入新密码'));
                } else {
                if (String(value).length < 6) {
                callback(new Error("请输入6-20位新密码"));
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入新密码'));
                } else if (value !== this.formData.pass) {
                callback(new Error('两次输入的新密码不一致!'));
                } else {
                callback();
                }
            };
             var validatePass2_ = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入新密码'));
                } else if (value !== this.formDataCode.pass) {
                callback(new Error('两次输入的新密码不一致!'));
                } else {
                callback();
                }
            };
            return { 
                active: 'tab-container1',
                tabActive: true,
                sCode: '',
                timer: null,
                formData:  {          
                    tel:this.$route.query.mobileNumber||'',
                    pwd:'',
                    pass:'',
                    checkPass:''    
                },
                formDataCode:{
                    tel:this.$route.query.mobileNumber||'',
                    smsCode:'',
                    pass:'',
                    checkPass_:'' , //获取所在表的新密码 
                },
                rules:  {          
                    tel:  [{
                        required: true,
                        // message: '请输入正确的11位手机账号',
                        // pattern:   /^1[34578]\d{9}$/,
                        validator:tel,
                        trigger: 'blur',
                        min: 11, 
                        max: 11,
                    }], 
                    smsCode:[{
                        message: '请输入短信验证码',
                        trigger: "blur",
                        required: true
                    }] ,
                    pass:[{
                        validator: validatePass,
                        trigger: "blur",
                        required: true
                    }]  ,
                    pwd:[{
                        validator: password,
                        trigger: "blur",
                        required: true
                    }]  ,
                    checkPass:[{
                        validator: validatePass2,
                        trigger: "blur",
                        required: true
                    }],
                    checkPass_:[{
                        validator: validatePass2_,
                        trigger: "blur",
                        required: true
                    }],
                },
                sendSmsCode:true,
                smsCodeCount:60,
                telToggle:false,
            };
        },
        computed: {
            submitBtnDisabled() {
                return this.isObjectNull(this.formData)?false:true;
            },
            submitBtnDisabledPwd() {
                // 这种做法也不可取,页面一刷新所有的input为空页面会有提醒
                // if(this.isMounted){ if(this.$refs.formCode.validate(value => {return value ? true:false})) return false;return true;}
                return this.isObjectNull(this.formDataCode)?false:true;
            },
        },
        methods: {
            choosenP() {
                this.tabActive = true;
            },
            choosenM() {
                this.tabActive = false;
            },
            // 密码验证提交
            submits() {
                this.$refs.formData.validate(value=>{
                    if(value){
                        this.request2([this.formData].map(v=>{return{code:sha1(v.pass),password:sha1(v.pwd)}}))
                    }
                })
            },
            // 短信验证码提交（忘记密码+重置密码动态码方式）
            submitsCode() {
                this.$refs.formDataCode.validate(value =>{
                    if(value) {
                        this.$route.query.code ? this.request1() : this.request2([this.formDataCode].map(v => {return {code:sha1(v.pass),note:v.smsCode,}}));
                    }
                })
            },
            request1(){ //忘记密码(不需token)
                   var fgtParams = [this.formDataCode].map(v => {return { note: v.smsCode ,code: sha1(v.pass), mobileNumber: v.tel};});
                   loginApi.resetNo(fgtParams[0], {}).then(res => {this.$router.push({name: 'Login',query: {forgetPwd: 1},})}).catch(error => {});
            },
            request2(fgtParams){ //重置密码(需token)
                loginApi.reset(fgtParams[0], {headers: {'x-auth-token': sessionStorage.getItem('TOKEN')}}).then(res => { this.$router.push({name: 'Main'})}).catch(error => {});
            },
            // 获取短信验证码
            handleSmsCode(){
                // 要先判断所填写的手机号是否正确·············从组件中获取接口？················怎么处理·············设置一个开关
                if(this.telToggle || this.$route.query.mobileNumber){
                    getCodeApi.getcode({id:this.formDataCode.tel}, {data: {}}).then(res => { this.sCode = res.data}).catch(error => {})
                    this.sendSmsCode = false;
                    // 倒计时60s
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        this.smsCodeCount = TIME_COUNT;
                        this.timer = setInterval(() => {
                            if (this.smsCodeCount > 1 && this.smsCodeCount <= TIME_COUNT) {
                            this.smsCodeCount--;
                            } else {
                            this.sendSmsCode = true;
                            clearInterval(this.timer);
                            this.timer = null;
                            }
                        }, 1000);
                    }
                }                
            }, 
            // 对象中的值判空
            isObjectNull(obj){
                var flag = true;
                for(var k in obj){obj[k]?'':(flag = false)};
                return flag?true:false;
            },
        },
        components: {
            Header,
            Submit,
            CyForm,
            CyFormItem,
            CyInput,
        }
    };
</script>
<style lang="scss" scoped>
    // @import '../style/myform.scss';
    .password {
        background: url("../assets/img/bg.jpg") no-repeat;
        color: #fff;
        height: 100%;
        width: 100%;
        background-size: cover;
            padding-top: 94px;
        .normalTab {
            font-size: 34px;
            letter-spacing: 2px;
        }
        form {
            margin: 75px 81px 0 79px;
        }
        .mint-button--small {
            display: inline-block;
            font-size: 30px;
            line-height: 30px;
            padding: 0 12px; 
        }
        .mint-button--default {
            color: #fff;
            border: none;
            background-color: transparent;
            -webkit-box-shadow: none;
            box-shadow: none;
            width: 100%;
        }
        .nav {
            display: flex;
            justify-content: space-around;
            margin-top: 61px;
            .nav-tab {
                width: 50%;
            }
            .tabActive {
                padding-bottom: 27px;
                border-bottom: 4px solid #ffcb16;
                .mint-button--default {
                    color: #ffcb16;
                }
            }
        }
    }
</style>

