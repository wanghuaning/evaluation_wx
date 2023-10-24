// app.js
import Message from 'tdesign-miniprogram/message/index';
App({

    globalData: {
        baseAPI: "https://zhangbin.shop",
        // baseAPI: "http://localhost:8085",
        pageSize: 20
      },
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  formPost: function(url, data) {
    let _this = this
    return new Promise(function(resolve, reject) {
      wx.showNavigationBarLoading();
      wx.request({
        url: _this.globalData.baseAPI + url,
        header: {
          'content-type': 'application/json; charset=utf-8',
          'Token': wx.getStorageSync('token')
        },
        method: 'POST',
        data,
        success(res) {
          console.log(res)
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            reject('网络出错')
            return false;
          }
          resolve(res.data);
          return true;
        },
        fail(res) {
          reject(res.errMsg)
          return false;
        },
        complete(res) {
          wx.hideNavigationBarLoading();
        }
      })
    })
  },

  judgment:function(e,message){
    if(e === ""){
        Toast({context: this,selector: '#t-toast', message: message+ '分数不能为空'});
        return false;
    }
    if(!isNaN(parseFloat(e)) && isFinite(e)){
        if(quantity < 0 || quantity >10){
          Toast({context: this,selector: '#t-toast', message: message+'分数不能超过10分' });
          return false;
         }
        }else{
            Toast({context: this,selector: '#t-toast', message: '请输入数字' });
            return false;
    } 
    return true;
  },
})
