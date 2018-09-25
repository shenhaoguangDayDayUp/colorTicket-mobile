<template>
    <div class="payoutpassword">
        <Header title="设定兑换密码" :isShow="true"></Header>
        <div class="slide_son content">
            <ul class="normalLogin">
                <li>
                    <i class="isTip ispwd" v-show='judgePwd'>请输入登录密码</i>
                    <input ref="normalPwd" v-model="normalPwd" placeholder="请输入登录密码" autocomplete="off" type="password" style="background-color:transparent " oninput="if(value.length>20)value=value.slice(0,20)" maxlength="20">
                </li>
            </ul>
            <submit text="下一步" :disabled="submitBtnDisabled" @click.native="next()"></submit>
        </div>
        <KeyBord ref="pay" :payTitle='payTitle' :is-pay='isPay' @pas-end='pasEnd' v-model="pwdinput" @close='closeKeyBord'></KeyBord>
    </div>
</template>

<script>
    import Header from "@/components/common/Header.vue";
    import Submit from "@/components/common/Button.vue";
    import KeyBord from "@/common/KeyBord";
    import sha1 from 'js-sha1'
    import {
        pwdApi
    } from "@/api/api";
    import {
        loginApi,
    } from '@/api/api';
    export default {
        name: "PayoutPassword",
        data() {
            return {
                normalPwd: '',
                judgePwd: false,
                isPay: false,
                pwdinput: '',
                payTitle: "请输入兑换密码",
                toggle: true
            };
        },
        watch: {
            normalPwd() {
                (this.isPwd(this.normalPwd) || this.normalPwd == '') ? this.judgePwd = false: this.judgePwd = true;
            },
        },
        computed: {
            submitBtnDisabled() {
                console.log(this.isPwd(this.normalPwd))
                if (this.isPwd(this.normalPwd)) return false;
                return true;
            },
        },
        methods: {
            isPwd(pwd) {
                var patrn = /^[a-zA-Z0-9]\w{5,20}$/
                if (!patrn.exec(pwd)) return false;
                return true;
            },
            closeKeyBord(){
                this.isPay = false;
                this.resetPasEnd(); // 恢复数字键盘
            },
            async next() {
                const password = {
                    password: sha1(this.normalPwd)
                }
                try {
                    const {
                        data
                    } = await pwdApi.validate({}, {
                        data: password,
                        headers: {
                            "x-auth-token": sessionStorage.getItem("TOKEN")
                        }
                    });
                    this.isPay = true;
                } catch (error) {}
            },
            pasEnd() {
                if (this.toggle) {
                    console.log('揍你')
                    this.pasEndFirst();
                } else {
                    console.log('不揍你')
                    this.pasEndSecond();
                }

            },
            pasEndFirst() {
                sessionStorage.setItem("pwdRedeem", sha1(this.pwdinput));
                this.$refs.pay.lodingShow = false;
                this.$refs.pay.keyShow = true;
                this.pwdinput = '';
                this.payTitle = '请再次输入兑换密码';
                this.toggle = false; // 开关关掉
            },
            async pasEndSecond() {
                if (sessionStorage.getItem("pwdRedeem") === sha1(this.pwdinput)) {
                    const pwd = {
                        password:sha1(this.normalPwd),
                        passwordRedeem:sha1(this.pwdinput)
                    }
                    try {
                        const {
                            data
                        } = await pwdApi.redeem({}, {
                            data: pwd,
                            headers: {
                                "x-auth-token": sessionStorage.getItem("TOKEN")
                            }
                        });
                        this.isPay = false;
                        this.$vux.toast.show({
                            text: '设置成功!',
                        });
                        this.$router.go(-1);
                    } catch (error) {
                        this.$vux.toast.show({
                            text: '设置失败!',
                        });
                    }
                } else {
                    this.$vux.toast.show({
                        text: '两次输入不一致!',
                    });
                    this.resetPasEnd(); // 恢复数字键盘
                }
                const password = {
                    password: sha1(this.normalPwd),
                    passwordRedeem: sha1(this.pwdinput)
                }
            },
            resetPasEnd(){ // 恢复数字键盘
                this.$refs.pay.lodingShow = false;
                this.$refs.pay.keyShow = true;
                this.pwdinput = '';
                this.isPay = false;
                this.toggle = true; // 开关打开
                this.payTitle = '请输入兑换密码'; // 标题改成第一次 
                sessionStorage.removeItem('pwdRedeem');
            }
        },
        components: {
            Header,
            Submit,
            KeyBord
        },
    };
</script>
<style lang="scss" scoped>
    @import '../../style/myform.scss';
    .payoutpassword {
        background-color: #23262b;
        color: #fff;
        height: 100%;
        width: 100%;
        padding-top: 94px;
        background-size: cover;
        padding-top: 94px; // overflow: auto;
    }
</style>

