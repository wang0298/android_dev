
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:""
  },

  add_job_wanted(e){
    wx.showLoading({
      title: '正在提交',
    })
    console.log(e.detail.value)
    db.collection("job_wanteds").add({
      data:{
        userid:this.data.userid,
        trade:e.detail.value.trade,
        position:e.detail.value.position,
        location:e.detail.value.location,
        salary:Number(e.detail.value.salary),
        education:e.detail.value.education,
        require:e.detail.value.require,
      }
    }).then(res=>{
      console.log(res)
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
        icon:"success",
        duration: 2000
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userid:options.userid
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