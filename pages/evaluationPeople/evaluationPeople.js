// pages/evaluationPeople/evaluationPeople.js
const app = getApp()
import Message from 'tdesign-miniprogram/message/index';
import Toast from 'tdesign-miniprogram/toast/index';
Page({
  /**
   * 页面的初始数据
   */
  data: {
        score:'',
        isEempty:'false',
        visible:'false',
        userInfors: [],
        baseRefresh: true,
        loginUserInfor: Object ,
        loadingProps: {
          size: '50rpx',
        },
        activeValues: [0],
        type:0,
        leaderLevel:1
  },
  /**
   * 返回主页
   */
  onReturn() {
     wx.reLaunch({url: '/pages/home/home'})
  },
  handleChange(e) {
    this.setData({
      activeValues: e.detail.value,
    });
  },
  /**
   * 
   * 获取评价人员信息
   */
  getUserInfos(){ 
    let _this= this
    _this.setData({isEempty:false})
    app.formPost('/wx/evaluationUser/getByEvaluationUser', {})
    .then(res => {
      if (res.code == 200) {
         if(res.result.length > 0){
          _this.setData({userInfors:res.result})
         }else{
          _this.setData({isEempty:true})
         }
      } else {
        Message.error({context: this, offset: [20, 32], content: res.msg,});
      }
    }).catch(e => {
      Message.error({context: this, offset: [20, 32], content: e});
    })
  },

  /**
   * 
   * 考核考评页面跳转
   */
  formSubmit(e){
    let userName = e.detail.value.userName
    let id = e.detail.value.userId
    wx.redirectTo({
        url: '/pages/evaluation/evaluation?userId='+id +'&userName='+ userName,
      })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.hideHomeButton({
      success: (res) => {},
    })
    this.getUserInfos()
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