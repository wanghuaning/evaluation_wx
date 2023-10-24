// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       userInfor:''
    },
  
    lognOut(){
      wx.setStorageSync("userInfo","")
      wx.setStorageSync("token","")
      wx.redirectTo({
        url: '/pages/login/login',
      })
    },

  
  
    toUpdatePassword(){
      wx.redirectTo({url: '/pages/updatePassword/updatePassword'})
    },
  

  
    toEvaluationPeople(){
      wx.redirectTo({ url: '/pages/evaluationPeople/evaluationPeople'})
    },

    toSelfSummary(){
        wx.redirectTo({ url: '/pages/selfSummary/selfSummary'})
    },

    toAlreadyEvaluationPeople(){
      wx.redirectTo({ url: '/pages/alreadyEvaluationPeople/alreadyEvaluationPeople'})
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
       this.setData({userInfor:wx.getStorageSync("userInfo")})
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