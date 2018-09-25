<template>
    <div class="entity">
        <Header title="会员信息" :isShow="true"></Header>
        <div class="entityContent">
            <ul class="messList">
                <li class="logoIcon" @click='$router.push({name:"Avatar"})'>
                    <span>头像</span>
                    <span>
                                            <img v-lazy= "avatar">
                                            </span>
                    <span> </span>
                </li>
                <li @click='$router.push({name:"Rename",query: {name: nickname}})'>
                    <span>昵称</span>
                    <span>{{nickname}}</span>
                    <div class="right">
                        <div class="right-arrow"></div>
                    </div>
                </li>
                <li  v-if="auth">
                    <span>已认证</span>
                </li>
            </ul>
            <ul class="messList">
                <li>
                    <span>姓名</span>
                    <span>{{userName}}</span>
                    <span></span>
                </li>
                <li>
                    <span>手机号</span>
                    <span>{{mobileNumber}}</span>
                    <span></span>
                </li>
                <li>
                    <span>身份证号</span>
                    <span>{{idCardNumber}}</span>
                    <span></span>
                </li>
            </ul>
            <ul class="messList">
                <li @click='$router.push({name:"Receivers"})'>
                    <span>收货地址</span>
                    <span></span>
                    <div class="right">
                        <div class="right-arrow"></div>
                    </div>
                </li>
            </ul>
            <ul class="messList">
                <li @click='$router.push({name:"PasswordSet",query:{mobileNumber:mobileNumberFullname}})'>
                    <span>设置密码</span>
                    <span></span>
                    <div class="right">
                        <div class="right-arrow"></div>
                    </div>
                </li>
            </ul>
            <ul class="messList">
                <li @click="toLogout()" style="display:flex;
                                        align-items:center;
                                        justify-content:center;
                                        letter-spacing:10px;">
                    登出
                </li>
            </ul>
        </div>
      
    </div>
</template>
<script>
    import Header from '../common/Header'
    import axios from 'axios'
    import config from '@/api/config.js'
    import {mapGetters} from 'vuex'
    import {user} from '@/logic'
    import {loginApi} from '@/api/api';
    export default {
        name: "entity",
        components: {
            Header
        },
        computed: {
            ...mapGetters(["defaultAvatar"])
        },
        data() {
            return {
                userName: '',
                mobileNumber: '',
                mobileNumberFullname: '',
                nickname: '',
                idCardNumber: '',
                avatar: '',
                auth:false,
                info:{}
            }
        },
         beforeRouteLeave(to,from,next){
            console.log('meta111111111111111')
            console.log(to.meta)
            console.log(from.meta)
            // from.meta.keepAlive=false;
            next();
        },
        mounted() {
            // console.log(this)
            
            console.log(this.$store)
            const TOKEN = sessionStorage.getItem('TOKEN')
           
            // 请求用户信息
            loginApi.entity({}, {
                data: {},
                headers: {'x-auth-token': TOKEN}
            }).then(res => {
                const {data} = res;
                this.mobileNumberFullname = data.mobileNumber;
                this.mobileNumber = data.mobileNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                this.userName = data.name;
                this.nickname = data.nickname;
                this.auth = data.idCardAuthentic;
                this.idCardNumber = data.idCardNumber;  
                var imgPrifex = config.imgUrl[config.env.NODE_ENV];
                if (!this.defaultAvatar) {
                    // this.changeToBase64(imgPrifex + data.avatar + '?r=' + new Date().getTime()).then(res => {
                        this.changeToBase64(imgPrifex + data.avatar ).then(res => {
                        //    sessionStorage.setItem("AVATAR",res);
                        this.avatar = res;
                        this.$store.dispatch("toggleUpdateAvatar", res);
                    })
                } else {
                    this.avatar = this.defaultAvatar
                }
            }).catch(error => {
                // console.log(error.response.status)
            });
        },
        methods: {
            // 退出登录请求
            toLogout() {
                var that = this;
                this.$$message.confirm.show({
                    confirm(vm, resolve) {
                        loginApi.logout({}, {
                            data: {},
                            headers: {
                                'x-auth-token': sessionStorage.getItem('TOKEN')
                            }
                        }).then(res => {
                            const {
                                data,
                                status
                            } = res;
                            if (status == 200) {
                                localStorage.removeItem('$LoginUser');
                                localStorage.removeItem('$LoginLink')
                                sessionStorage.removeItem('TOKEN');
                                that.$store.dispatch("toggleUpdateAvatar", ''); // vuex中的头像base64也要置空！
                                that.$router.push({
                                    path: '/login'
                                });
                            }
                        }).catch(error => {
                            console.log(error)
                        });
                        resolve();
                    },
                    cancel(vm, resolve) {
                        vm.$router.push({
                            name: "Entity"
                        });
                        resolve();
                    },
                    title: "提示",
                    content: "确认要退出登录吗?",
                    rightBtnText: "取消",
                    leftBtnText: "确定",
                    cancelShow:true
                });
            },
            // 更改头像
            selectImg(e) {
                console.log(e)
                const TOKEN = sessionStorage.getItem('TOKEN')
                let imgFile = e.srcElement.files[0]; //取到上传的图片
                console.log(imgFile);
                let formData = new FormData(); //通过formdata上传
                formData.append('avatar', imgFile);
                console.log(222)
                console.log(formData)
                axios.post('/api/gateway/mobile/member/avatar', formData, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'form-data',
                        'x-auth-token': TOKEN
                    }
                }).then(function(res) {
                    console.log(res); //
                }).catch(function(error) {
                    console.log(error);
                })
            },
            // base64
            getBase64Image(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);
                var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
                var dataURL = canvas.toDataURL("image/" + ext);
                return dataURL;
            },
            changeToBase64(url) {
                var that = this;
                var img = document.createElement("img");
                img.src = url; //此处自己替换本地图片的地址
                return new Promise(function(resolve, reject) { //onload是异步
                    img.onload = function() {
                        var data = that.getBase64Image(img);
                        // var img1 = document.createElement("img");
                        // img1.src = data;
                        // document.body.appendChild(img1);
                        resolve(data)
                        return data;
                    };
                });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .entity {
        background-color: #23262b;
        height: 100%;
        color: #fff;
        // overflow: auto; 
            // padding-top:94px;
        .entityContent{
            padding-bottom: 100px;
        }
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
                    width: 25%;
                }
                span:nth-child(2) {
                    width: 65%;
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
            li.logoIcon {
                height: 119px;
                span {
                    // line-height: 119px;
                    // width: 65%;
                    // text-align: right;
                    img {
                        height: 92px;
                        width: 92px;
                    }
                }
                span {
                    line-height: 119px;
                }
            }
        }
    }
</style>



