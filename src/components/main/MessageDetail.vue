<template>
    <div class="messageDetail">
        <Header title="消息详情" :isShow="true"></Header>
        <ul class="messList">
            <li >
                <div class="listHeader">
                    <span>{{msgDetail.sendAt}}<span>{{msgDetail.title}}</span></span>
                </div>
                <div class="listContent">
                    {{msgDetail.content}}
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import Header from '../common/Header'
    import {
        XHeader
    } from 'vux'
    import {
        getMsgApi
    } from "@/api/api";
    export default {
        name: "messageDetail",
        components: {
            Header
        },
        data() {
            return {
                msgDetail:{},
            };
        },
        mounted() {
            this.getList();
        },
        methods: {
            getList() {
                const TOKEN = sessionStorage.getItem('TOKEN');
                getMsgApi.msgDetail({
                    id: this.$route.query.id,
                }, {
                    data: {},
                    headers: {
                        'x-auth-token': TOKEN
                    }
                }).then(res => {
                    this.loading = false;
                    const {
                        data
                    } = res;
                    data.sendAt = this.timeStamp(data.sendAt);
                    this.msgDetail = data;
                }).catch(error => {})
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
        }
    };
</script>

<style scoped lang="scss">
    .messageDetail {
        background-color: #23262b;
        height: 100%;
        // overflow: auto;
        padding-top:94px;
        .messList {
            // margin-top:94px;
            li {
                color: #fff;
                font-size: 30px;
                padding-left: 23px;
                background: #2a2d36;
                margin-bottom: 26px;
                .listHeader {
                    height: 93px;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    border-bottom: 2px solid #323540;
                    span span {
                        margin-left: 27px;
                    }
                }
                .listContent {
                    padding: 28px 35px 28px 0;
                }
            }
            li:last-child {
                margin: 0;
            }
        }
    }
</style>



