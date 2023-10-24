// pages/updatePassword/updatePassword.js
import Toast from 'tdesign-miniprogram/toast/index';
import Message from 'tdesign-miniprogram/message/index';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading:false,
    userInfor:""
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
    let _this = this
    _this.setData({loading:true})
    app.formPost('/wx/evaluationUser/updateSelfSummary?selfSummary='+e.detail.value.selfSummary, {})
    .then(res => {
     _this.setData({loading:false})
      if (res.code == 200) {
         Message.success({context: this, offset: [20, 32], content: "保存成功！",})
         wx.reLaunch({ url: '/pages/home/home'});
      } else {
         Message.error({context: this, offset: [20, 32], content: res.msg,});
      }
    }).catch(e => {
     _this.setData({loading:false})
     Message.error({context: this, offset: [20, 32], content: e});
    })
 },

 getLoginUserInfo(){
  let _this= this
  app.formPost('/wx/evaluationUser/getLoginUserInfo', {})
  .then(res => {
    if (res.code == 200) {
      _this.setData({userInfor:res.result})
    } else {
      Message.error({context: this, offset: [20, 32], content: res.msg,});
    }
  }).catch(e => {
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
    this.getLoginUserInfo()
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