<template>
    <div class="receivers">
        <Header title="收货地址" :isShow="true"></Header>
        <div class="receiversContent">
            <ul class="receiversList" v-for="(v,i) in List" :key='i'>
                <li>
                    <div class="receiversMsg">
                        <div class="MsgTop">
                            <span>{{v.name}}</span>
                            <span>{{v.mobileNumber}}</span>
                        </div>
                        <div class="MsgBottom">
                            {{v.province}}{{v.city}}{{v.district}}{{v.street}}
                        </div>
                    </div>
                    <div class="receiversUpdate">
                        <div @click="chooseFav(v.code)" class="rcvDefault">
                            <check-icon :value.sync="v.favorite"> 默认地址</check-icon>
                        </div>
                        <div class="rcvDone">
                            <div @click='$router.push({path:"/receiversUpdate",query: {code: v.code,title:"编辑收货地址"}})'><img src="../../assets/img/edit.png" alt=""><span>编辑</span></div>
                            <div @click="deleteList(v.code,i)"><img src="../../assets/img/delete.png" alt=""><span>删除</span></div>
                        </div>
                    </div>
                </li>
            </ul>
            <!-- 按钮 -->
            <submit @click.native='$router.push({name: "ReceiversUpdate",query: {title: "添加收货地址"}}) '>添加地址</submit>
        </div>
    </div>
</template>
<script>
    import '../../style/btn.scss';
    import Header from '../common/Header';
    import Submit from '../common/Button';
    import {
        loginApi,
    } from '../../api/api';
    import {
        CheckIcon
    } from 'vux';
    export default {
        name: "Receivers",
        data() {
            return {
                isError: '',
                List: [],
                submit: '添加一个新地址',
                disabled: true,
                classes: 'btn_disabled'
            };
        },
        mounted() {
            const TOKEN = sessionStorage.getItem('TOKEN');
            this.getList(TOKEN);
        },
        methods: {
            // 修改默认地址的请求
            chooseFav(code) {
                const TOKEN = sessionStorage.getItem('TOKEN');
                loginApi.receiversSetDefault({
                    id: code
                }, {
                    headers: {
                        'x-auth-token': TOKEN
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.$vux.toast.show({
                            text: '修改成功',
                        });
                        this.getList(TOKEN);
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
            // 发送删除地址的请求
            deleteList(e, i) {
                const deleteItem = {
                    "code": e
                }
                var that = this;
                this.$$message.confirm.show({
                    confirm(vm, resolve) {
                        loginApi.receiversDel({}, {
                            data: deleteItem,
                            headers: {
                                'x-auth-token': sessionStorage.getItem('TOKEN')
                            }
                        }).then(res => {
                            that.List.splice(i, 1);
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
                        resolve();
                    },
                    cancel(vm, resolve) {
                        vm.$router.push({
                            name: "Receivers"
                        });
                        resolve();
                    },
                    title: "提示",
                    content: "确定要删除该收货地址吗?",
                    rightBtnText: "取消",
                    leftBtnText: "确定",
                    cancelShow:true
                });
            },
            getList(TOKEN) {
                // 请求用户收货地址信息
                loginApi.receivers({}, {
                    data: {},
                    headers: {
                        'x-auth-token': TOKEN
                    }
                }).then(res => {
                    const {
                        data
                    } = res;
                    this.List = data
                }).catch(error => {
                    console.log(error.response.status)
                });
            },
            //去修改
            addRcv() {
                alert(2)
            }
        },
        components: {
            Header,
            CheckIcon,
            Submit
        },
    };
</script>
<style lang="scss" scoped>
    .receivers {
        background-color: #23262b;
        height: 100%;
        color: #fff; // margin-bottom:94px;
        // overflow: auto;
            padding-top: 94px;
        .receiversContent{
            padding-bottom:94px;
        }
        .receiversList {
            li {
                // box-sizing: inherit;
                // height: 288px;
                padding: 23px;
                padding-bottom: 0;
                background: #2a2d36;
                font-size: 30px;
                margin-bottom: 22px;
                .receiversMsg {
                    height: 192px;
                    border-bottom: 2px solid #323540;
                    .MsgTop {
                        height: 68px;
                        line-height: 68px;
                        span:nth-child(2) {
                            float: right;
                        }
                    }
                    .MsgBottom {
                        margin-top: 17px;
                        font-size: 24px;
                        line-height: 30px;
                        padding-right: 11px;
                    }
                }
                .receiversUpdate {
                    display: flex;
                    justify-content: space-between;
                    font-size: 24px;
                    .rcvDone {
                        display: flex;
                        justify-content: flex-start;
                    }
                    .rcvDefault {
                        line-height: 94px;
                    }
                    div {
                        height: 94px;
                        margin-right: 36px;
                        img {
                            height: 28px;
                            width: 28px;
                            vertical-align: middle;
                            margin-right: 14px;
                        }
                        span {
                            line-height: 94px;
                        }
                    }
                    div:nth-child(2) {
                        margin-right: 0;
                    }
                }
            }
        }
        .btn {
            margin: 71px 82px 0 78px;
        }
    }
</style>
<style>
    .vux-check-icon>.weui-icon-success:before,
    .vux-check-icon>.weui-icon-success-circle:before {
        color: #ffcb16!important;
    }
    body .weui-icon-success {
        font-size: 28px;
    }
    body .vux-check-icon>span {
        color: #fff;
    }
    body .weui-icon-circle {
        font-size: 28px;
        color: #ffcb16;
    }
    body .vux-popup-header-left {
        font-size: 28px;
    }
    body .scroller-indicator {
        font-size: 28px;
    }
</style>



