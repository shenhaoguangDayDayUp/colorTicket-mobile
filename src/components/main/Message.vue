<template>
    <div class="message">
        <Header title="消息清单" :isShow="true"></Header>
        <div class="messageContent">
            <ul class="messList" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li v-for="(v,i) in msgsList" :key="i">
                    <router-link :to="{name:'MessageDetail',query: {id: v.code}}" v-if="!v.readAt" style="color:#ffcb16;">
                        <div class="msgItem">
                            <div style="width:40%;">{{v.sendAt}}</div>
                            <div>{{v.title}}</div>
                        </div>
                    </router-link>
                    <router-link :to="{name:'MessageDetail',query: {id: v.code}}" style="color:#fff;" v-else>
                        <div class="msgItem">
                            <div style="width:40%;">{{v.sendAt}}</div>
                            <div>{{v.title}}</div>
                        </div>
                    </router-link>
                </li>
                <load-more v-if='loading' :tip="'正在加载'"></load-more>
                <divider v-if='noMoreData && msgsList.length'>没有更多消息了</divider>
            </ul>
        </div>
        <Empty :show.sync='show'></Empty>
    </div>
</template>
<script>
    import Header from '../common/Header'
    import {
        InfiniteScroll
    } from "mint-ui";
    import Vue from 'vue';
    Vue.use(InfiniteScroll); // 使用Vue的分页
    import {
        getMsgApi
    } from "@/api/api";
    import {
        LoadMore,
        Divider
    } from 'vux'
    export default {
        name: "Message",
        computed: {},
        data() {
            return {
                loading: false,
                msgsList: [],
                count: 0,
                page: 1,
                noMoreData: false,
                show: false
            };
        },
        async mounted() {
            console.log(99999999)
            await this.list();
            this.show = this.msgsList.length > 0 ? false : true
            console.log('wjhfhsdaklfjd')
        },
        methods: {
            async list() {
                // this.loading = true;
                const TOKEN = sessionStorage.getItem('TOKEN');
                if (TOKEN) {
                    const {
                        data
                    } = await getMsgApi.msgList({
                        id: this.page
                    }, {
                        data: {},
                        headers: {
                            'x-auth-token': TOKEN
                        }
                    });
                    for (let index = 0; index < data.records.length; index++) {
                        data.records[index].sendAt = this.timeStamp(data.records[index].sendAt)
                        const element = data.records[index];
                        this.msgsList.push(element);
                    }
                    this.count = data.count;
                } else {
                    this.$$message.confirm.show({
                        confirm(vm, resolve) {
                            vm.$router.push({
                                name: "Login"
                            });
                            resolve();
                        },
                        cancel(vm, resolve) {
                            vm.$router.push({
                                name: "gameCenter"
                            });
                            resolve();
                        },
                        title: "您还没有登录",
                        content: "是否前往登录?",
                        rightBtnText: "随便看看",
                        leftBtnText: "确定",
                        cancelShow:true
                    });
                }
            },
            loadMore() {
                if (this.msgsList.length >= this.count) { //当拉到底的时候
                    this.loading = false;
                    this.noMoreData = true;
                    return;
                }
                this.page += 1;
                this.list();
            },
            timeStamp(t) {
                var date = new Date(t);
                var Y = date.getFullYear() + '.';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
                var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
                return (Y + M + D + h + m);
            }
        },
        components: {
            Header,
            LoadMore,
            Divider
        },
        directives: {
            InfiniteScroll
        }
    };
</script>
<style lang="scss" scoped>
    .message {
        background-color: #23262b;
        height: 100%;
        // overflow: auto;
        // padding-top: 94px;
        .messageContent {
            padding-bottom: 100px;
        }
        .messList {
            li {
                height: 93px;
                border-bottom: 2px solid #323540;
                margin-bottom: 22px;
                color: #fff;
                font-size: 30px;
                padding-left: 23px;
                background: #2a2d36;
                display: flex;
                justify-content: center;
                flex-direction: column;
                span span {
                    margin-left: 27px;
                }
                .msgItem {
                    display: flex;
                    display: -webkit-flex;
                    justify-content: flex-start;
                }
            }
            li:last-child {
                margin: 0;
            }
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
    .vux-loadmore>.weui-loadmore__tips {
        color: #fff;
    }
</style>





