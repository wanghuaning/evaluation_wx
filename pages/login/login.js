// pages/login/login.js
import Toast from 'tdesign-miniprogram/toast/index';
import Message from 'tdesign-miniprogram/message/index';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false
  },

  formSubmit(e){
     if(e.detail.value.username === "" || e.detail.value.password === "" || e.detail.value.phoneNumber === '' ){
      Toast({context: this,selector: '#t-toast', message: '用户名、电话号码、密码不能为空', });
      return
     }
     let _this = this
     _this.setData({loading:true})
     app.formPost('/wx/evaluationUser/login', e.detail.value)
     .then(res => {
      _this.setData({loading:false})
       if (res.code == 200) {
         wx.setStorageSync('userInfo', res.result.userInfo)
         wx.setStorageSync('token', res.result.token)
         wx.reLaunch({ url: '/pages/home/home'});
       } else {
        Message.error({context: this, offset: [20, 32], content: res.msg,});
       }
     }).catch(e => {
      _this.setData({loading:false})
      Message.error({context: this, offset: [20, 32], content: e});
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideHomeButton({
      success: (res) => {},
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})