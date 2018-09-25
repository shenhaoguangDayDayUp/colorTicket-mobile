import Vue from 'vue'
const digitsRE = /(\d{3})(?=\d)/g
Vue.filter('currency', (value, currency = '￥', decimals = 2) => {
  if(value){
    return value.toLocaleString()
  }else{
    return 0;
  }

  // value = parseFloat(value) / 100
  // if (!isFinite(value) || (!value && value !== 0)) {
  //   return 0
  // }
  // var stringified = Math.abs(value).toFixed(decimals)
  // var _int = decimals
  //   ? stringified.slice(0, -1 - decimals)
  //   : stringified
  // var i = _int.length % 3
  // var head = i > 0
  //   ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
  //   : ''
  // var _float = decimals
  //   ? stringified.slice(-1 - decimals)
  //   : ''
  // var sign = value < 0 ? '-' : ''
  // return sign + currency + head +
  //   _int.slice(i).replace(digitsRE, '$1,') +
  //   _float
})

Vue.filter('dateFilter', function (val, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let time = new Date(val)
  return formatDate(time, fmt)
})

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    // 'M+': date.getMonth() + 1,
    // 'd+': date.getDate(),
    // 'h+': date.getHours(),
    // 'm+': date.getMinutes(),
    // 's+': date.getSeconds(),
    // 这里修改了,全部改成两位数显示
    'M+': date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
    'd+':date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate(),
    'h+': date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    'm+': date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    's+': date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
Vue.filter('orderStatus', val => {
  return {
      "REQUEST": "待支付",
      "PROCESS": "待收货",
      "SUCCESS": "成功",
      "CANCEL": "取消",
  }[val]
})
Vue.filter('recordStatus', val => {
  return {
      "BONUS": "赠送",
      "REDEEM": "兑换",
      "BET": '下注',
      "PAYOUT": "奖金",
      "RECHARGE": "充值",
  }[val]
})


Vue.prototype.$orderStatus = Vue.filter('orderStatus');
Vue.prototype.$recordStatus = Vue.filter('recordStatus');
Vue.prototype.$currency = Vue.filter('currency');


String.prototype.queryParameters = function () {
  var obj = {};
  var reg = /([^?=&]+)=([^?=&]+)/g;
  this.replace(reg, function () {
      obj[arguments[1]] = arguments[2];
  });
  return obj;
}