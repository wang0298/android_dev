// pages/register/register.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:"",
    reg:false
  },

  choseuser(e){
    this.setData({
      user:e.detail.value
    })
  },
  regist(e){
    console.log(e.detail.value)
    if(e.detail.value.email==""||e.detail.value.phonenumber==""||e.detail.value.pwd==""||e.detail.value.realname==""||e.detail.value.user_group==""||e.detail.value.username==""){
      wx.showToast({
        title: '注册失败',
        icon:"error",
        duration: 2000
      })
      return
    }

    if(e.detail.value.user_group=="company"&&e.detail.value.companyname==""){
      wx.showToast({
        title: '注册失败',
        icon:"error",
        duration: 2000
      })
      return
    }



    db.collection("users").where({username:e.detail.value.username}).get({
      success:res=>{//get result
        console.log(res)
        if(res.data.length!=0){
          //console.log("该用户已存在，请前往登录")
          wx.showToast({
            title: '用户名已存在',
            icon:"error",
            duration: 2000
          })
        }
        else{
          db.collection("users").add({
            data:{
              email: e.detail.value.email,
              phonenumber: e.detail.value.phonenumber,
              pwd: e.detail.value.pwd,
              realname: e.detail.value.realname,
              user_group: e.detail.value.user_group,
              username: e.detail.value.username,
              companyname:e.detail.value.companyname
            }
          }).then(res=>{
            console.log(res)
          })

          wx.showToast({
            title: '注册成功',
            icon:"success",
            duration: 2000
          })
        }
      }
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