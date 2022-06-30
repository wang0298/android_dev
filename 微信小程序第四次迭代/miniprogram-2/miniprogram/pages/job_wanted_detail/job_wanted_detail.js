
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job_id:"",
    job_data:{},
    email:""
  },
  get_email(){
    db.collection("users").doc(this.data.job_data.userid).get().then(res=>{
      console.log(res)
      this.setData({
        email:res.data.email
      })
      console.log(this.data.email)
      wx.showModal({
        title: '求职者邮箱',
        content: this.data.email,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      }) 
    })
  },
  connect_user(){
    console.log(this.data.job_data.userid)
    this.get_email()
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      job_id:options.id
    })
    db.collection("job_wanteds").doc(this.data.job_id).get().then(res=>{
      console.log(res)
      this.setData({
        job_data:res.data
      })
      console.log(this.data.job_data)
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