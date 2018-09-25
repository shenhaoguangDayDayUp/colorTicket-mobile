<template>
    <div class="passwordSet">
        <Header title="设置密码" :isShow="true"></Header>
            <ul class="messList">
                <li @click='$router.push({path:"password",query:{title:"重置密码",mobileNumber:mobileNumberFullname}})'>
                <!-- <li @click='$router.push({path:"password2",query:{title:"重置密码",mobileNumber:mobileNumberFullname}})'> -->
                    <span>重置密码</span>
                    <span></span>
                    <div class="right">
                        <div class="right-arrow"></div>
                    </div>
                </li>
            </ul>
            <ul class="messList">
                <li @click='$router.push({name:"PasswordSetRedeem",query:{title:"支付密码",mobileNumber:mobileNumberFullname}})'>
                    <span>设置兑换密码</span>
                    <span></span>
                    <div class="right">
                        <div class="right-arrow"></div>
                    </div>
                </li>
            </ul>
    </div>
</template>
<script>
    import Header from '../common/Header'
    export default {
        name: 'PasswordSet',
        components: {
            Header,
        },
        data() {
            return {
                mobileNumberFullname:this.$route.query.mobileNumber,
            }
        },
    }
</script>
<style lang="scss" scoped>
    .passwordSet {
        background-color: #23262b;
        height: 100%;
        padding-top:94px;
        color: #fff;
        .messList {
            margin-bottom: 22px;
            li {
                height: 92px;
                border-bottom: 2px solid #323540; // margin-bottom: 26px;
                color: #d7dae1;
                font-size: 30px;
                padding: 0 23px;
                background: #2a2d36;
                display: flex;
                justify-content: space-between;
                span {
                    height: 100%;
                    line-height: 92px;
                }
                span:nth-child(1) {
                    width: 35%;
                }
                span:nth-child(2) {
                    width: 55%;
                    text-align: right; // padding-right: 35px;
                }
                span:nth-child(3) {
                    width: 10%;
                }
                .right {
                    width: 10%;
                    height: 100%;
                    line-height: 92px;
                    text-align: right;
                    vertical-align: center;
                    .right-arrow {
                        display: inline-block;
                        border-right: 5px solid #ccc;
                        border-bottom: 5px solid #ccc;
                        width: 22px;
                        height: 22px;
                        transform: rotate(315deg);
                        -webkit-transform: rotate(315deg);
                    }
                    img {
                        height: 89px;
                        width: 89px;
                        border-radius: 100%;
                        border: solid #ffffff 2px;
                        box-shadow: border-box;
                    }
                }
            }
        }
    }
</style>


