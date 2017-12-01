// pages/dz_10/dz_10.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staySchoolList:[],
    flag:true,
    checknum:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    wx.showLoading({
      title: '获取中...',
      mask:true,
    });
    var _this = this;
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/weekShoolList',
      data:{
        find: 'class',
        openid:getApp().globalData.openId,
        classs: options.class ? options.class : '',
        week: options.week ? options.week : '',
      },
      success:function(res){
        wx.hideLoading();
        if (res.data == 'not') {
          _this.setData({
            flag: false,
          });
          return;
        }
        var num = {};
        num['check'] = 0;
        num['notcheck'] = 0;
        for(var i = 0 ;i<res.data.length ; i++) {
          if(res.data[i]['checkshool'] == 0){
            num['notcheck']++;
          }
          if (res.data[i]['checkshool'] == 1) {
            num['check']++;
          }
        }
        console.log(num);
        _this.setData({
          staySchoolList:res.data,
          checknum:num,
        })
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