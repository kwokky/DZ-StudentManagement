// pages/dz_2/dz_2.js
Page({
  //跳转教师个人信息页面
  getTeacherInfo: function () {
    wx.navigateTo({
      url: '../dz_3/dz_3',
      flag:false,
    })
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    phone: getApp().globalData.teaphone,
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
        url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getTeacherinfo',
        data:{
          openid:getApp().globalData.openId,
        },
        success:function(res){
          console.log(res);
          if (res.data == 'not' || res.data == null){
            wx.hideLoading();
            return;
          }
          
          getApp().globalData.userstatus = true;
          _this.setData({
            phone:res.data.telphone,
            flag:res.data.shool,
          })
          wx.hideLoading();
        },
        fail:function(err){
          wx.hideLoading();
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
                } else {
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
  phoneCall:function(){
    if (!this.data.phone){
      return;
    }
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },
  navigator:function(d){
    var usreStatus = getApp().globalData.userstatus;
    if (!usreStatus) {
        wx.showToast({
          title: '请完善个人信息',
          image:'../../sources/images/error.png',
        });
        return;
    }
    wx.navigateTo({
      url: d.currentTarget.dataset.url,
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
  dg
  }
})