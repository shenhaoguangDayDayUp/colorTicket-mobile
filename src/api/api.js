import axios from 'axios';
import Api from './Apis';
let base = '/api'

export let loginApi = new Api('member','id',{
    login:{
        url: 'login',
        method: 'put',
    },
    register:{
        url: 'register',
        method: 'post' ,
    },
    logout:{
        url: 'logout',
        method: 'put' ,
    },
    reset:{
        url:'password/update', // 重置密码
        method:'put',
    },
    resetNo:{
        url:'password/reset', // 忘记密码(不用token)
        method:'put',
    },
    entity:{
        url:'entity/session', // 会员详情
        method: 'get',
    },
    main:{
        url:'main', //'我的'页面请求
        method:'get',
    },
    receivers:{
        url:'receivers', // 收货地址
        method:'get'
    },
    receiversUpdate:{
        url:'receivers', // 增加收货地址
        method:'post'
    },
    receiversDel:{
        url:'receivers', // 删除收货地址
        method:'delete'
    },
    receiversEdit:{
        url:'receivers', // 编辑收货地址
        method:'put'
    },
    receiversFind:{
        url:'receivers/{id}', // 查询收货地址
        method:'get'
    },
    receiversDefault:{
        url:'receivers/favorite', // 获取默认地址
        method:'get'
    },
    receiversSetDefault:{
        url:'receivers/favorite/{id}', // 设置默认地址
        method:'put'
    },
    nickname:{
        url:'nickname', // 修改昵称
        method:'put'
    },
    avatar:{
        url:'avatar',// 头像
        method:'post'
    },
    redeem:{
        url:'password/redeem',// 头像
        method:'get'
    },

}) 
export let pwdApi = new Api('member/password','id',{
    validate:{
        url:'validate', // 验证密码
        method:'put',
    },
    redeem:{
        url:'redeem', //设置兑换密码
        method:'put'
    }
})

export let integralApi = new Api('account','id',{
    account:{
        url: 'balance/CRD', // 积分查询
        method: 'get',
    },
})
export let getCodeApi = new Api('sms','id',{
    getcode:{
        url:'validationCode/{id}', // 手机动态码
        method: 'get',
    }
})
export let getMsgApi = new Api('message/','id',{
    getMsg:{
        url:'size/unread', // 未读消息数量
        method: 'get',
    },
    msgList:{
        url:'list/{id}',// 消息列表
        method:'get'
    },
    msgDetail:{
        url:'entity/{id}',// 消息详情
        method:'get'
    }
})
//商品首页相关
export let getAllProductApi = new Api('store/product','id',{ 
    getList:{
        url:'list/all/{id}',
        method: 'get',
    },
    getDetail:{
        url:'entity/{id}',
        method: 'get',
    },
    getBanner:{
        url:'list/banner ',
        method: 'get',
    },
       
 
})
//心愿单相关 
export let heartCartApi = new Api('store/cart','id',{
    addOrdel:{
        url:'item',
        method: 'post',
    },
    entity:{//心愿单列表
        url:'entity',
        method: 'get', 
    },
    deleteProduct:{
        url:'item',
        method: 'delete',
    }
   
})
//订单相关
export let orderCheckOutApi = new Api('store/order','id',{
    checkout:{//订单结算
        url:'checkout',
        method: 'post'
    },
    entity:{//订性详情
        url:'entity/{id}',
        method: 'get'  
    },
    place:{//订单提交
        url:'place',
        method: 'post'    
    },
    payment:{
        url:'redeem/{id}',
        method: 'put'    
    },
    cancel:{
        url:'cancel/{id}',
        method: 'put'     
    }
})

//订单清单

export let orderListApi = new Api('store/order/list','id',{
    all:{//订单结算
        url:'all/{id}',
        method: 'get'
    },
    unreceived:{
        url:'unreceived/{id}',
        method: 'get'  
    },
    unpaid:{
        url:'unpaid/{id}',
        method: 'get'    
    }, 
})
export let brandListApi = new Api ('brand/group/category','id')

export let transactionsApi = new Api('account','id',{
    CRD:{//获取交易明细
        url:'transactions/CRD/{id}',
        method: 'get'
    },
    remaind:{
        url:'balance/CRD',
        method: 'get'  
    },
    recharge:{ //充值
        url:'recharge',
        method: 'post'  
    },
    successCharge:{//完成充值
        url:'recharge/{id}',
        method: 'put'  
    },
    
})

// 游戏相关
export let gameApi = new Api('game','id',{
    entity:{
        url:'list/all/{id}', // 全部游戏
        method: 'get'
    },
    rec:{
        url:'list/recommendation',// 游戏推荐
        method:'get'
    },
    gameDetail:{
        url:'entity/{id}', // 全部游戏
        method: 'get'
    },
    
})
//奖品特别推荐
export let rewordRecommenApi = new Api('store/product/list/recommendation','id')
//奖品特别推荐
export let adverApi = new Api('marketing/banners','id')

// 营销中心
export let marketApi = new Api('marketing','id',{
    banner:{
        url:'banners/MOBILE_GAME', // 游戏厅首页轮播
    },
    notice:{
        url:'announcements' //游戏厅 公告
    }
})

// 认证
export let authApi = new Api('member/idCard','id',{
    front:{
        url:'front', // 身份证正面
    },
    back:{
        url:'back' // 身份证背面
    }
})







