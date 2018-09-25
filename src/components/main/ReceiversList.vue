<template>
    <div class="receivers">
        <Header title="收货地址"
                :isShow="true">
            <span v-if='List.length' class="manage"
                  slot="right"
                  @click='$router.push({name: "Receivers"})'>管理</span>
        </Header>
        <div class="receiversContent">
            <ul @click='back(v.code)'
                class="receiversList"
                v-for="(v,i) in List"
                :key='i'>
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
        name: "ReceiversList",
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
           async back(code){
            const TOKEN = sessionStorage.getItem('TOKEN');
          await loginApi.receiversSetDefault({
                    id: code
                }, {
                    headers: {
                        'x-auth-token': TOKEN
                    }
                })
                 this.$router.go(-1)
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
  .manage {
    font-size: 24px;
  }
  .receiversContent {
    padding-bottom: 94px;
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
        // height: 192px;
        // height:150px;
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
          padding-bottom: 17px;
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
.vux-check-icon > .weui-icon-success:before,
.vux-check-icon > .weui-icon-success-circle:before {
  color: #ffcb16 !important;
}
body .weui-icon-success {
  font-size: 28px;
}
body .vux-check-icon > span {
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



