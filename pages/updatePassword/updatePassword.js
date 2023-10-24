// pages/updatePassword/updatePassword.js
import Toast from 'tdesign-miniprogram/toast/index';
import Message from 'tdesign-miniprogram/message/index';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false
  },
  /**
   * 返回主页
   */
  onGoHome() { wx.redirectTo({url: '/pages/home/home',})},

  /**
   * 修改密码提交
   * @param {} e 
   */
  formSubmit(e){
    if(e.detail.value.newPassword === "" || e.detail.value.password === ""  ){
     Toast({context: this,selector: '#t-toast', message: '两次输入密码都不能为空', });
     return
    }
    if(e.detail.value.newPassword !== e.detail.value.password){
      Toast({context: this,selector: '#t-toast', message: '两次输入密码不同请重新输入', });
      return
    }
    let _this = this
    _this.setData({loading:true})
    app.formPost('/wx/evaluationUser/updatePassword?newPassword='+e.detail.value.newPassword, {})
    .then(res => {
     _this.setData({loading:false})
      if (res.code == 200) {
         Message.success({context: this, offset: [20, 32], content: "修改成功下次登录请使用新密码",})
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