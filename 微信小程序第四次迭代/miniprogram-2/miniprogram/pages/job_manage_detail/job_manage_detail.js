const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job_id:"",
    job_list:[],
  },

  download(event){
    wx.showLoading({
      title: '下载中',
    })
    console.log(event.target.dataset.detail.fileID)
    wx.cloud.downloadFile({
      fileID: event.target.dataset.detail.fileID, 
      success: res => {
        console.log(res)
        db.collection("resumes").doc(event.target.dataset.detail._id).update({
          data:{
            tag:"已查看"
          },
          success: function(res) {
            console.log("修改数据库成功")
            this.getlist()
          }
        })
        
        wx.hideLoading()
        wx.showToast({
          title: '下载成功',
          icon:"success",
          duration: 2000
        })

        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: console.error
    })
    
  },  

  delete(event){
    wx.showLoading({
      title: '正在删除',
    })
    console.log(event.target.dataset.detail.fileID)
    wx.cloud.deleteFile({
      fileList: [event.target.dataset.detail.fileID,],
      success: res => {
        
        db.collection("resumes").doc(event.target.dataset.detail._id).remove().then(res=>{
          console.log(res)
        })
        this.getlist()
        wx.hideLoading()
          wx.showToast({
            title: '删除成功',
            icon:"success",
            duration: 2000
          })
        // handle success
        console.log(res.fileList)
      },
      fail: console.error
    })
  },  

  getlist(){
    db.collection("resumes").where({
      jobid:this.data.job_id
    }).get().then(res=>{
      console.log(res)
      this.setData({
        job_list:res.data
      })
      console.log(this.data.job_list)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      job_id:options.id
    })
    db.collection("resumes").where({
      jobid:this.data.job_id
    }).get().then(res=>{
      console.log(res)
      this.setData({
        job_list:res.data
      })
      console.log(this.data.job_list)
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