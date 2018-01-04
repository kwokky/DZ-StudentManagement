// pages/dz_7/dz_7.js
var myDate = new Date();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    userlist:[],
    flag:'a',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userinfo:JSON.parse(options.infos),
    })
    var _this = this;
    wx.showLoading({
      title: '获取中...',
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getStuRateinfo',
      data:{
        class:_this.data.userinfo.class,
        week:options.week ? options.week : '', 
        find:'class',
      },
      success:function(res) {
        wx.hideLoading();
        console.log(res);
        if(res.data == ''){
          _this.setData({
            flag:false,
          });
          return;
        }
          _this.setData({
            userlist:res.data, 
            flag: true,           
          })
      },
      fail:function(err) {
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