
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:"",
    company:"",
    job_list:[],
    end:false,
    serch_obj:{
      trade: "",
      location: "",
      position: "",
      salary: ""
    }
  },
  
  getjobs(page){
    console.log(this.data.userid)
    db.collection("job_wanteds").where({userid:this.data.userid}).get().then(res=>{
      console.log(res.data)
      if(res.data.length==0){
        this.setData({
          end:true
        })
      }
      // var olddata=this.data.job_list
      // var newdata=olddata.concat(res.data)
      this.setData({
        job_list:res.data
      })
    })
  },

  gotodetail(event){
    console.log(event.target.dataset.detail._id)
    var str="/pages/job_wanted_edit/job_wanted_edit?id="+event.target.dataset.detail._id
    wx.navigateTo({
      url: str,
    })
  },


  deletejob(event){
    wx.showLoading({
      title: '正在删除',
    })
    console.log(event.target.dataset.detail._id)
    db.collection("job_wanteds").doc(event.target.dataset.detail._id).remove().then(res=>{
      console.log(res)
      wx.hideLoading()
        wx.showToast({
          title: '删除成功',
          icon:"success",
          duration: 2000
        })
      this.setData({
        job_list:[]
      })
      this.getjobs(0)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userid:options.userid,
    })
    this.getjobs(0)
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
    if(!this.data.end){
      var page=this.data.job_list.length
      this.getjobs(page)
    }
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})