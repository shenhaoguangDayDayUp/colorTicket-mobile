<template>
<div class="cy_app_form">
    <Header title="会员注册" :isShow="true"></Header>
    <cy-form :model="formData"  :rules="rules"  ref="formData" style="color:#fff;">
        <cy-form-item prop="mobileNumber">
            <cy-input type="tel" v-model="formData.mobileNumber"  placeholder="手机号" :maxlength="11"></cy-input>
        </cy-form-item>
        <cy-form-item prop="note">
            <cy-input type="text" v-model="formData.note" placeholder="短信验证码" :maxlength="10" :codeShow="true" :sendSmsCode="sendSmsCode" :smsCodeCount="smsCodeCount" @handleSmsCode="handleSmsCode" ></cy-input>
        </cy-form-item>
        <cy-form-item prop="password">
            <cy-input type="password" v-model="formData.password" placeholder="登录密码" :maxlength="20" :eyeShow="true"></cy-input>
        </cy-form-item>
        <cy-form-item prop="name" >
            <cy-input type="text" v-model="formData.name"  placeholder="姓名" :maxlength="5" ></cy-input>
        </cy-form-item>
        <cy-form-item prop="idCardNumber">
            <cy-input type="text" v-model="formData.idCardNumber" placeholder="身份证号" :maxlength="18"></cy-input>
        </cy-form-item>
        <!-- 忘记密码 -->
        <div class="cy_app_form_checkbox">
          <div @click.stop="checkboxList" class="cy_app_form_checkbox-left">
                <div class="checkbox-align"><div :class="['checkbox',{'radio-selected':selected}]">
                </div></div>
              <span><span style="color:#fff;">同意</span> 长影娱乐服务条款</span>
          </div>
        </div>
        <submit @click.native="handleSubmit" :disabled="submitBtnDisabled">注册</submit>
        <div>模拟短信验证码：{{sCode}}</div>
    </cy-form>
    
</div>  
</template>
<script>
    import {CyForm,CyFormItem,CyInput} from '@/common/Form';
    import Submit from "@/components/common/Button.vue";
    import Header from "@/components/common/Header.vue";
    import {getCodeApi,loginApi} from '@/api/api';
    import sha1 from 'js-sha1';
    export  default  {    
        data ()  {
            var tel = (rule,value,callback) => {
                if (!value) {
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
                callback();
            }      
            var password = (rule, value, callback) => {
                if (!value) {
                    callback(new Error("请输入密码"));
                } else {
                    var strings = String(value);
                    if (strings.length < 6) {
                        callback(new Error("请输入6-20字游戏名称"));
                    }
                    callback();
                }
                callback();
            };
            var idCode = (rule, value, callback) => {
                var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
                if (!value) {
                    callback(new Error("请输入身份证号"));
                } else {
                    if(!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)){
                        callback(new Error("身份证号格式错误"));
                    }else if(!city[value.substr(0,2)]){
                        callback(new Error("地址编码错误"));
                    }else{
                        if(value.length == 18){//18位身份证需要验证最后一位校验位
                            value = value.split('');
                            //∑(ai×Wi)(mod 11)
                            //加权因子
                            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                            //校验位
                            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                            var sum = 0;
                            var ai = 0;
                            var wi = 0;
                            for (var i = 0; i < 17; i++)
                            {
                                ai = value[i];
                                wi = factor[i]; 
                                sum += ai * wi;
                            }
                            var last = parity[sum % 11];
                            if(parity[sum % 11] != value[17]){
                                // callback(new Error("校验位错误"));
                                callback(new Error("身份证号错误"));
                            }
                        }
                    }
                    callback();
                }
                callback();
            };
            return  {        
                formData:  {          
                    mobileNumber:'',
                    note:'',// 手机动态码   
                    password:'' ,
                    name:'',// 用户真实姓名
                    idCardNumber:'',// 身份证号码   
                },
                rules:  {          
                    mobileNumber:  [{
                        required: true,
                        validator: tel,
                        trigger: 'blur',
                        min: 11, 
                        max: 11,
                    }], 
                    password:[{
                        validator: password,
                        trigger: "blur",
                        required: true
                    }],
                    note:[{
                        message:'请输入手机动态码',
                        trigger:"blur",
                        required: true
                    }],
                    name:[{
                        message:'请输入正确的姓名',
                        pattern: /^[\u4e00-\u9fa5]{2,4}$/,
                        trigger:"blur",
                        required: true
                    }],
                    idCardNumber:[{
                        validator: idCode,
                        trigger: "blur",
                        required: true
                    }]  
                },
                selected:true,
                sendSmsCode:true,
                smsCodeCount:60,
                telToggle:false,
                sCode:''
            }    
        },
        computed:{
            submitBtnDisabled(){
                return (this.isObjectNull(this.formData)&& this.selected)?false:true; //每项不为空且必须同意条款
            }
        },
        methods:{      
            handleSubmit()  {
                this.$refs.formData.validate(value=>{
                    if(value){
                        let params = this.formData;
                        params.password= sha1(this.formData.password);
                        loginApi.register(params).then(res => {this.$router.push({name: 'Login'}) }).catch(error => {}); //注册完成需要重新登录
                    }   
                })  
                //this.isError = '请同意长影娱乐服务条款';
            },
            checkboxList(){
                this.selected = !this.selected;
            },
            handleSmsCode(){
                // 要先判断所填写的手机号是否正确·············从组件中获取接口？················怎么处理·············设置一个开关
                if(this.telToggle == true){
                    getCodeApi.getcode({id:this.formData.mobileNumber}, {data: {}}).then(res => {this.sCode = res.data}).catch(error => {});
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

