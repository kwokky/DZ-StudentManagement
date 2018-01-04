// pages/dz_2/dz_2.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    console.log(options);
    wx.showLoading({
      title: '获取中...',
      mask:true,
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getuserinfo',
      data: {
        openid: getApp().globalData.openId,
        role: 'teacher',
      },
      success: function (res) {
        wx.hideLoading();
        if(res.data.class){
            _this.setData({
              flag:true,
            })
        }
      },
      fail: function (err) {
        console.log(err);
        if (err.errMsg.indexOf('request:fail') >= 0) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '网络不畅通，点击确定重试。',
            cancelText:'退出',
            success: function (res) {
              if (res.confirm) {
                _this.onLoad();
              }else{
                getApp().globalData.urlflag = true;
                wx.reLaunch({
                  url: '../dz_1/dz_1',
                })
              }
            },
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
  
  },
  nav:function(e){
    if(!this.data.flag){
      wx.showToast({
        title: '请完善个人信息',
        image:'../../sources/images/error.png',
      });
      return;
    }
    console.log(e);
    //arrp = getApp().gloablData.role,

    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  }
  
})