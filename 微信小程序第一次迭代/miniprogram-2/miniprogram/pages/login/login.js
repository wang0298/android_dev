// pages/login/login.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyname:""
  },

  log_in(e){
    console.log(e.detail.value)
    db.collection("users").where({
      username:e.detail.value.username,
      pwd:e.detail.value.pwd}).get({
        success:res=>{//get result
          console.log(res)
          if(res.data.length!=0){
            console.log(res.data[0])
            var str="/pages/"+res.data[0].user_group+"/"+res.data[0].user_group;
            if(res.data[0].hasOwnProperty("companyname")){
              str=str+"?companyname="+res.data[0].companyname
            }
            console.log(str)
            wx.navigateTo({
              url: str,
            })
          }
          else{
            wx.showToast({
              title: '密码错误',
              icon:"error",
              duration: 2000
            })
          }
        }
      })
  },
  

  gotoregister(e){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },

  gotojob_serch(e){
    wx.navigateTo({
      url: '/pages/job_serch/job_serch',
    })
  },

  gotojob_publish(e){
    wx.navigateTo({
      url: '/pages/job_publish/job_publish',
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