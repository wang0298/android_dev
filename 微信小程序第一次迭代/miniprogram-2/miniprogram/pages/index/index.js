const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test01data:"",
    datalist:[]
  },
  getdata(){//get data from database
    db.collection("test01").where({author:"zhang"}).get({
      success:res=>{//get result
        console.log(res)
        this.setData({//save result
          test01data:res.data
        })
      }
    })

    //another method(.then.catch) same to success method
    //db.collection("test01").get().then(res=>{}).catch(err=>{})
  },

  insertdata(){
    wx.showLoading({
      title: 'loading',
      mask:true
    })
    db.collection("test01").add({
      data:{
        title:"insert03",
        author:"wangwang",
        tag:["a12"]
      }
    }).then(res=>{
      console.log(res)
      wx.hideLoading({})
    })
  },

  forminsert(e){
    wx.showLoading({
      title: 'loading',
      mask:true
    })
    console.log(e)
    var author=e.detail.value.author
    var title=e.detail.value.title
    db.collection("test01").add({
      data:{
        title:title,
        author:author,
        tag:["a12"]
      }
    }).then(res=>{
      console.log(res)
      wx.hideLoading({})
    })
  },

  getd(page){
    wx.cloud.callFunction({
      name:"getdata",
      data:{
        page:page
      }
    }).then(res=>{
      console.log(res.result.data)
      var olddata=this.data.datalist
      var newdata=olddata.concat(res.result.data)
      this.setData({
        datalist:newdata
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getd(0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page=this.data.datalist.length
    this.getd(page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})