
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job_list:[],
    end:false,
    serch_obj:{
      trade: "",
      location: "",
      position: "",
      salary: ""
    }
  },
  // job_serch(e){
  //   console.log(e.detail.value)
  //   this.setData({
  //     job_list:[],
  //     end:false,
  //     serch_obj:e.detail.value
  //   })
  //   //console.log(this.data.serch_obj)
  //   this.getjobs(0)
  // },

  fabu(e){
    db.collection("test02").add({
      data:{
        kind:e.detail.value.kind,
        name:e.detail.value.name,
        location:e.detail.value.location,
        time:e.detail.value.time
      }
    }).then(res=>{
      console.log(res)
      this.setData({
        end:false
      })
    })
  },

  getjobs(page){
    wx.cloud.callFunction({
      name:"getdata",
      data:{
        table:"test02",
        page:page,
        obj:this.data.serch_obj
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

  // gotodetail(event){
  //   console.log(event.target.dataset.detail._id)
  //   var str="/pages/job_detail/job_detail?id="+event.target.dataset.detail._id
  //   wx.navigateTo({
  //     url: str,
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    if(!this.data.end){
      var page=this.data.job_list.length
      this.getjobs(page)
    }
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