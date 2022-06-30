// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyname:""
  },
  gotojob_publish(e){
    var str="/pages/job_publish/job_publish?companyname="+this.data.companyname
    wx.navigateTo({
      url: str,
    })
  },

  gotojob_wanted_serch(e){
    var str="/pages/job_wanted_serch/job_wanted_serch?companyname="+this.data.companyname
    wx.navigateTo({
      url: str,
    })
  },

  gotojob_manage(e){
    var str="/pages/job_manage/job_manage?companyname="+this.data.companyname
    wx.navigateTo({
      url: str,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      companyname:options.companyname
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