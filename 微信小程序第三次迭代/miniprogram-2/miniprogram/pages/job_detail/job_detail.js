// pages/job_detail/job_detail.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    job_id:"",
    job_data:{},
    email:"",
    file_path:""
  },

  connect_company(){
    
    wx.showModal({
      title: '企业邮箱',
      content: this.data.email,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },

  get_email(){
    db.collection("users").where({
      companyname:this.data.job_data.company
    }).get().then(res=>{
      console.log(res)
      this.setData({
        email:res.data[0].email
      })
      console.log(this.data.email)
    })
  },

  chooseFile() {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success(res) {
        const tempFilePath = res.tempFiles[0].path
        that.setData({
          file_path: tempFilePath
        })
        var job=that.data.job_data._id + "/" + that.data.userid + "/"
        wx.cloud.uploadFile({
          cloudPath: job+res.tempFiles[0].name,
          filePath: res.tempFiles[0].path, // 文件路径
        }).then(res => {
          // get resource ID
          console.log(res.fileID)
          wx.showToast({
            title: '投递成功',
            icon:"success",
            duration: 2000
          })
        }).catch(error => {
          // handle error
          wx.showToast({
            title: '投递失败',
            icon:"error",
            duration: 2000
          })
        })
              
      }
    })
  },


  cv_delivery(){
    this.chooseFile()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      job_id:options.id,
      userid:options.userid
    })
    db.collection("jobs").doc(this.data.job_id).get().then(res=>{
      console.log(res)
      this.setData({
        job_data:res.data
      })
      console.log(this.data.job_data)
      this.get_email()
    })
    console.log("userid:"+this.data.userid)
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