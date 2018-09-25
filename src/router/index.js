import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const route =new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/components/common/Layout.vue'),
      redirect: '/gameCenter',
      children: [
        {
          path: '/main',
          name: 'Main',
          meta:{
            keepAlive:false
          },
          component: () => import('@/components/Main'),
        },
        {
          path: '/gameCenter',
          name: 'gameCenter',
          meta:{
            keepAlive:true
          },
          component: () => import('@/components/gameCenter'),
        },
        {
          path: '/prizeCity',
          name: 'PrizeCity',
          meta:{
            keepAlive:true
          },
          component:   () => import('@/components/prizeCity'),
        },
        {
          path: '/change',
          name: 'change',
          component: () => import('@/components/change/Change.vue'),
        },
        {
          path: '/message',
          name: 'Message',
          component: () => import('@/components/main/Message'),
        },
        {
          path: '/entity',
          name: 'Entity',
          component: () => import('@/components/main/Entity'),
        },
      ]
    },
    {
      path: '/rightChange',
      name: 'rightChange',
      component:   () => import('@/components/priceCity/RightChange.vue'),
    },
    {
      path: '/order',
      name: 'order',
      props: route => { return { showButton: false}},
      component:   () => import('@/components/priceCity/order.vue'),
    },
    {
      path: '/order/list',
      name: 'orderLsit',
      component:   () => import('@/components/priceCity/OrderList.vue'),
    },  
    {
      path: '/prizeCity/detail/:id',
      name: '商品详情',
      component:   () => import('@/components/priceCity/PriceCityDetail.vue'),
    },
    {
      path: '/heart/list',
      name: 'heart',
      component:   () => import('@/components/priceCity/heart/Heart.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: ()=>import('@/views/Login')
    },
    {
      path: '/register',
      name: 'Register',
      component: ()=>import('@/views/Register'),
    },
    {
      path: '/password',
      name: 'Password',
      component: ()=>import('@/views/Password'),
    },
    {
      path: '/passwordSetRedeem',
      name: 'PasswordSetRedeem',
      component: () => import('@/components/main/PasswordSetRedeem'),
    },
    {
      path: '/passwordSet',
      name: 'PasswordSet',
      component: () => import('@/components/main/PasswordSet'),
    },
    {
      path: '/receivers',
      name: 'Receivers',
      component: () => import('@/components/main/Receivers'),
    },
    {
      path: '/receiversUpdate',
      name: 'ReceiversUpdate',
      component: () => import('@/components/main/ReceiversUpdate'),
    },
    {
      path: '/receiversList',
      name: 'ReceiversList',
      component: () => import('@/components/main/ReceiversList'),
    },
    {
      path: '/messageDetail',
      name: 'MessageDetail',
      component: () => import('@/components/main/MessageDetail'),
    },
    {
      path: '/rename',
      name: 'Rename',
      component: () => import('@/components/main/Rename'),
    },
    {
      path: '/reMessage',
      name: 'ReMessage',
      component: () => import('@/components/main/ReMessage'),
    },
    {
      path: '/avatar',
      name: 'Avatar',
      component: () => import('@/components/main/avatar'),
    },
    {
      path: '/idcard',
      name: 'idCard',
      component: () => import('@/components/main/idcard'),
    },
    {
      path: '/charge',
      name: 'charge',
      component: () => import('@/components/charge/Charge.vue'),
    },
    {
      path: '/changeStatus',
      name: 'changeStatus',
      component: () => import('@/components/charge/ChargeStatus.vue'),
    },
    {
      path: '/gameDetail',
      name: 'gameDetail',
      component: () => import('@/components/gameCenter/gameDetail.vue'),
    },
    { 
      path: '*', 
      component: () => import('@/components/NotFound.vue') 
    },
  ]
})


route.beforeEach(function (to, from, next) {
  Vue.$$message.confirm.hide()
  // store.dispatch('toggleLoadingStatus', {isLoading: true})
  next()
})

route.afterEach(function (to,from) {
 
  // setTimeout(()=>{
  //   store.dispatch('toggleLoadingStatus', {isLoading: false})
  // },500)

})



export default route