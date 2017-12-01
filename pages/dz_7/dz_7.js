// pages/dz_7/dz_7.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leaveinfo:[],
    role:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取中...',
      mask:true,
    })
    var _this = this;
   wx.request({
     url: 'https://www.yanyufanchen.com/api/wxapi/getleaveinfo',
     data:{
      id:options.id,
     },
     success:res => {
       console.log(res);
       wx.hideLoading();
        _this.setData({
          leaveinfo:res.data,
          role:getApp().globalData.role,
        })
     },
     fail:err => {
        console.log(err);
     }
   })
  },
  upstatus:function(e){
    var _this = this;
    wx.showLoading({
      title: '提交中...',
      mask:true,
    })
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/upleavestatus',
      data:{
        id:_this.data.leaveinfo.id,
        status: e.target.dataset.val,
      },
      success:function(res){
        console.log(res);
        wx.hideLoading();
        switch(res.data.code){
          case 1:
            wx.showToast({
              title: '提交成功',
            });
            var st = 'leaveinfo.status';    //更改状态值
            _this.setData({
              [st]: e.target.dataset.val,
            })
          break;
          case 0:
            wx.showToast({
              title: '服务器繁忙 请稍后重试...',
            });
          break;
        }
      },
      fail:function(err){
        console.log(err);
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