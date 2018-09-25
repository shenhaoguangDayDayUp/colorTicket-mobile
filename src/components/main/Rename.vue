<template>
    <div class="rename">
        <Header title="修改昵称" :isShow="true"></Header>
        <x-input title="" placeholder="请填写你的昵称" :min="2" :max="10" :icon-type="iconType" :is-type="isTypeUserName" v-model="name"></x-input>
        <!-- 报错信息 -->
        <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../../assets/img/tishi@2x.png">{{isError}}</span>
        </div>
        <submit text="保存" :disabled="submitBtnDisabled" @click.native="rename()"></submit>
    </div>
</template>
<script>
    import '../../style/btn.scss';
    import '../../style/isError.scss';
    import Submit from '../common/Button';
    import Header from '../common/Header'
    import {
        loginApi,
    } from '../../api/api';
    import {
        XInput
    } from 'vux'
    export default {
        name: 'Rename',
        components: {
            XInput,
            Header,
            Submit
        },
        computed: {
            submitBtnDisabled() {
                if (this.isUserName) return false;
                return true;
            }
        },
        data() {
            return {
                isError: '',
                name: this.$route.query.name,
                iconType: '',
                isUserName: false,
            }
        },
        methods: {
            rename() {
                // 修改用户昵称
                const nickname = {
                    "nickname": this.name
                }
                loginApi.nickname({}, {
                    data: nickname,
                    headers: {
                        'x-auth-token': sessionStorage.getItem('TOKEN')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$router.push({
                            path: '/entity'
                        })
                    } else {
                        this.isError = '出现异常!请重试!'
                    }
                }).catch(error => {
                    switch (error.status) {
                        case 456:
                            this.isError = error.data
                            break;
                        case 567:
                            this.isError = '系统错误!'
                            break;
                        default:
                            this.isError = '请求错误!'
                            break;
                    }
                });
            },
            isTypeUserName(value) {
                //  var regName =/^[\u4e00-\u9fa5]{2,4}$/;
                var regName = /^[\u4E00-\u9FA5A-Za-z0-9]{2,10}$/; //2-20位中文、英文、数字但不包括下划线等符号
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
        }
    }
</script>
<style lang="scss" scoped>
    .rename {
        background-color: #23262b;
        height: 100%;
        padding-top:94px;
        color: #fff;
        
        .btn,
        .isError {
            margin: 71px 82px 0 78px;
        }
    }
</style>
<style lang="scss">
    .rename {
        // overflow: auto;
        .vux-x-input.weui-cell {
            height: 92px; // background: #2a2d36;
            font-size: 30px;
            margin: 0 23px; // margin: 0 82px 0 78px;
            border-bottom: 1px solid #fff;
            // margin-top: 94px;
        }
        .vux-x-input.weui-cell:before {
            border: none;
        }
        .weui-icon.weui_icon_clear.weui-icon-clear {
            font-size: 25px;
        }
        .weui-icon-warn {
            color: #ffcb16 !important;
        }
        .vux-x-input .vux-input-icon {
            font-size: 25px;
        }
        .weui-cell_warn {
            color: #ffcb16 !important;
        }
        .vux-input-icon.weui-icon-warn:before, .vux-input-icon.weui-icon-success:before{
            font-size:25px;
        }
    }
</style>



