// pages/historyRecord/historyRecord.js
Page({
//跳转
  weekNumInfo:function(e){
    var week = e.currentTarget.dataset.week;
    var year = e.currentTarget.dataset.year;
   // week = week.substring(0,week.length-1);
    wx.redirectTo({
      url: '../admin_weekNumInfo/admin_weekNumInfo?week=' + week + '&year=' + year,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    nowWeek:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask:true,
    })
    var that = this;
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/weekHistory',
      data:{},
      success:function(res){
          console.log(res.data);
        that.setData({
          nowWeek:res.data.week,
          info:res.data[0],
        });
        wx.hideLoading();
      },
      fail:function(err){
        wx.hideLoading();
        console.log(err);
        if (err.errMsg.indexOf('request:fail') >= 0) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '网络不畅通哦',
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        }
      }
    })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})