// pages/evaluation/evaluation.js
const app = getApp()
import Message from 'tdesign-miniprogram/message/index';
import Toast from 'tdesign-miniprogram/toast/index';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userId:'',
        userName:'',
        result: 1,
        examineInfo:Object,
        isEempty:true,
        selfSummary:'',
        options: [
          { value: 1, label: '好' },
          { value: 2, label: '较好' },
          { value: 3, label: '一般' },
          { value: 4, label: '较差' },
        ],
    },

    handleChange(e) {
        this.setData({
          result: e.detail.value,
        });
      },

      judgment(e,message){
        if(e === ""){
            Toast({context: this,selector: '#t-toast', message: message+ '分数不能为空'});
            return false;
        }
        if(!isNaN(parseFloat(e)) && isFinite(e)){
            if(e < 0 || e >10){
              Toast({context: this,selector: '#t-toast', message: message+'分数不能超过10分' });
              return false;
             }
        }else{
             Toast({context: this,selector: '#t-toast', message: '请输入数字' });
             return false;
        } 
        return true;
      },
  /**
   * 
   * 提交评价分数 
   */
  formSubmit(e){
       let id = e.detail.value.id
       if(id == undefined || id == ""){
        Toast({context: this,selector: '#t-toast', message: '数据错误请刷新重试！' });
        return
       }
       let quantity = e.detail.value.quantity
       if(!this.judgment(quantity,"工作数量")){
           return
       }

       let quality = e.detail.value.quality
       if(!this.judgment(quality,"工作质量")){
           return
       }

       let efficiency = e.detail.value.efficiency
       if(!this.judgment(efficiency,"工作效率")){
           return
       }

       let contribution = e.detail.value.contribution
       if(!this.judgment(contribution,"工作贡献")){
           return
       }

       let discipline = e.detail.value.discipline
       if(!this.judgment(discipline,"工作纪律")){
           return
       }

       let attitude = e.detail.value.attitude
       if(!this.judgment(attitude,"工作态度")){
           return
       }

       let professionalism = e.detail.value.professionalism
       if(!this.judgment(professionalism,"敬业精神")){
           return
       }

       let opinion = e.detail.value.opinion

       var result = Number(this.data.result)
       var evaluationUserId = wx.getStorageSync('userInfo').id
       app.formPost('/wx/evaluationuser/updateEvaluationuserScore',{id:id,evaluationUserId:evaluationUserId,byEvaluationUserId:this.data.userId,quantity:quantity,quality:quality,efficiency:efficiency,contribution:contribution,discipline:discipline,attitude:attitude,professionalism:professionalism,result: result,opinion:opinion })   
       .then(res => {
        if (res.code == 200) {
           this.setData({score:''})
           Toast({context: this,selector: '#t-toast', message: '提交成功！' });
           this.onReturn()
        } else {
          Message.error({context: this, offset: [20, 32], content: res.msg,});
        }
      }).catch(e => {
        Message.error({context: this, offset: [20, 32], content: e});
      })

  },

   /**
   * 返回
   */
  onReturn() {
     wx.reLaunch({ url: '/pages/alreadyEvaluationPeople/alreadyEvaluationPeople'})  
  },

  /**
   * 获取已经考核数据 
   */
   getExamineInfo(userId){
    let _this= this
    _this.setData({isEempty:false})
    app.formPost('/wx/evaluationuser/getEvaluationuserScore?id='+userId, {})
    .then(res => {
      if (res.code == 200) {
         if(res.result != undefined){
          _this.setData({examineInfo:res.result})
          _this.setData({result:res.result.result})
         }else{
          _this.setData({isEempty:true})
         }
      } else {
        Message.error({context: this, offset: [20, 32], content: res.msg,});
        _this.setData({isEempty:true})
      }
    }).catch(e => {
      Message.error({context: this, offset: [20, 32], content: e});
      _this.setData({isEempty:true})
    })
   },

   getUserInfos(userId){ 
    let _this= this
    app.formPost('/wx/evaluationUser/getUserInfoByUserId?userId='+userId, {})
    .then(res => {
      if (res.code == 200) {
          _this.setData({selfSummary:res.result.selfSummary})
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
        this.setData({userId:options.userId})
        this.setData({userName:options.userName})
        this.getExamineInfo(options.userId)
        this.getUserInfos(options.byEvaluationUserId)
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