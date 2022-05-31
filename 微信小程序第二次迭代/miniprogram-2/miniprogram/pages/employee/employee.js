// pages/employee/employee.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:""
  },
  gotojob_wanted(e){
    var str="/pages/job_wanted/job_wanted?userid="+this.data.userid
    wx.navigateTo({
      url: str,
    })
  },
  gotojob_serch(e){
    wx.navigateTo({
      url: '/pages/job_serch/job_serch',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
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