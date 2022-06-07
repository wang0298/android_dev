
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
  job_serch(e){
    console.log(e.detail.value)
    this.setData({
      job_list:[],
      end:false,
      serch_obj:e.detail.value
    })
    //console.log(this.data.serch_obj)
    this.getjobs(0)
  },

  getjobs(page){
    var obj={
      trade: "",
      location: "",
      position: "",
      salary: "",
      company:this.data.company
    }
    console.log(obj)
    wx.cloud.callFunction({
      name:"getdata",
      data:{
        table:"jobs",
        page:page,
        obj:obj
      }
    }).then(res=>{
      console.log(res.result.data)
      if(res.result.data.length==0){
        this.setData({
          end:true
        })
      }
      var olddata=this.data.job_list
      var newdata=olddata.concat(res.result.data)
      this.setData({
        job_list:newdata
      })
    })
  },

  gotodetail(event){
    console.log(event.target.dataset.detail._id)
    var str="/pages/job_detail/job_detail?id="+event.target.dataset.detail._id+"&userid="+this.data.userid
    wx.navigateTo({
      url: str,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userid:options.userid,
      company:options.companyname,
    })
    console.log(this.data.company)
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