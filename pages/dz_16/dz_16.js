// pages/dz_16/dz_16.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typearray: ['公交', '自行离校','客车'],
    timearray: ['周五', '周六'],
    typeindex: 0,
    timeindex:0,
    subbtn:true,
    revbtn:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取中...',
      mask: true,
    })
    var _this = this;
    wx.request({      //按钮是否启用接口
      url: 'https://www.yanyufanchen.com/api/wxapi/backHomeBtn',
      data:{
        openid:getApp().globalData.openId,
      },
      success:function(res){
        wx.hideLoading();
        console.log(res.data);
        var sb = res.data.subbtn==1 ? false:true;    //如果为1 则启用按钮
        var rb = res.data.revbtn == 1 ? false : true;    //如果为1 则启用按钮
        _this.setData({
          subbtn:sb,
          revbtn:rb,
        })
      },
      fail:function(err){
        wx.hideLoading();
        console.log(err);
        if (err.errMsg.indexOf('request:fail') >= 0) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '无法获取启用状态，请检查网络后重试。',
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        }
      },
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
  
  /*改变出行方式*/
  bindTypeChange:function(e) {
    this.setData({
      typeindex: e.detail.value
    })
  },
 /*改变回家时间*/
  bindTimeChange: function (e) {
    this.setData({
      timeindex: e.detail.value
    })
  },

  /*提交申请*/
  sub:function(e){
    var _this = this;
    wx.showLoading({
      title: '',
      mask:true,
    })
    /*调用接口开始*/
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/backhome',
      data: {
        openid: getApp().globalData.openId,
        method: _this.data.typearray[_this.data.typeindex],
        time: _this.data.timearray[_this.data.timeindex],
      },
      success: function (res) {
        switch (res.data) {
          case 'succ':
            wx.showToast({
              title: '提交成功',
            });
            _this.setData({
              subbtn: true,
              revbtn: false,
            });
            break;
          case 'fail':
            wx.showToast({
              title: '服务器繁忙',
            });
            break;
        }
      },
      fail: function (err) {
        wx.hideLoading();
        console.log(err);
        if (err.errMsg.indexOf('request:fail') >= 0) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '网络不畅通哦',
            showCancel: false,
          })
        }
      },
    })
  },

  /*撤销申请*/
  backout:function(){
    var _this = this;
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/backhomeout',
      data: {
        openid: getApp().globalData.openId,
      },
      success: function (res) {
        console.log(res);
        if (res.data == 'succ') {
          wx.showToast({
            title: '撤销成功',
          });
          _this.setData({
            subbtn:false,
            revbtn:true,
          });
        }
        if (res.data == 'fail') {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '服务器繁忙。。',
            showCancel: false,
          })
        }
      },
      fail:function(){
        wx.hideLoading();
        console.log(err);
        if (err.errMsg.indexOf('request:fail') >= 0) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '网络不畅通哦',
            showCancel: false,
          })
        }
      }
    })
  }
})