<template>
    <div class="reMessage">
        <Header title="修改信息" :isShow="true"></Header>
        <x-input title="" name="username" placeholder="" is-type="china-name" v-model="userName" :should-toast-error='false'></x-input>
        <x-input title="" mask="999 9999 9999" v-model="mobileNumber" :max="13" is-type="china-mobile"></x-input>
        <x-input title="" type="text" placeholder="" v-model="userCode" :min="18" :max="18"></x-input>
        <!-- 报错信息 -->
        <div class="isError" v-show='isError'>
            <span class="isTip ispwd"><img src="../../assets/img/tishi@2x.png">{{isError}}</span>
        </div>
        <!-- 按钮 -->
        <div class="btn">
            <div class="redBtn active" @click="editMessage()">
                立&nbsp;即&nbsp;修&nbsp;改
            </div>
        </div>
    </div>
</template>
<script>
    import '../../style/btn.scss';
    import '../../style/isError.scss';
    import Header from '../common/Header'
    import {
        XInput
    } from 'vux'
    import {
        loginApi,
    } from '../../api/api';
    export default {
        name: 'ReMessage',
        components: {
            Header,
            XInput,
        },
        data() {
            return {
                mobileNumber: '',
                userName: '',
                userCode: '',
                isError: '',
            }
        },
        mounted() {
            const TOKEN = sessionStorage.getItem('TOKEN')
            console.log(TOKEN)
            // 请求用户信息
            loginApi.entity({}, {
                data: {},
                headers: {
                    'x-auth-token': TOKEN
                }
            }).then(res => {
                const {
                    data
                } = res;
                this.mobileNumber = data.mobileNumber;
                this.userName = data.name;
                this.userCode = data.idCardNumber;
            }).catch(error => {
                console.log(error.response.status)
            });
        },
        methods:{
            editMessage(){
                alert(1)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .reMessage {
        background-color: #23262b;
        height: 100%;
        color: #fff;
        .btn,
        .isError {
            margin: 71px 82px 0 78px;
        }
    }
</style>
<style lang="scss">
    .reMessage {
        .vux-x-input.weui-cell {
            height: 92px;
            background: #2a2d36;
            font-size: 30px;
            padding-left: 23px;
        }
        .vux-x-input.weui-cell:before {
            border: none;
        }
        .weui-icon.weui_icon_clear.weui-icon-clear {
            font-size: 20px;
        }
    }
</style>


