// pages/dz_15/dz_15.js
var util = require('../../utils/util.js');  
var myDate = new Date(); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //请假原因
    leaveReason:'',
    //开始时间
    startdate: myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate(),
    //结束时间
    enddate: myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate(),
    flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  startDateChange: function(e){
    this.setData({
      startdate: e.detail.value
    })
  },
  endDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  /*原因失去焦点触发*/
  yuanyin:function(e){
    if(e.detail.value === 'caIEgg') {
      wx.redirectTo({
        url: '../dz_17/dz_17?c=1',
      });
      return;
    }
    this.setData({
      leaveReason:e.detail.value,
    })
  },
  sub:function(){
    var _this=this;
    if (this.data.startdate>this.data.enddate){
      wx.showToast({
        title: '请假时间不合法',
        image: '/sources/images/error.png',
      })
      return;
    }
    if(!this.data.leaveReason){
      wx.showToast({
        title: '请填写请假原因',
        image: '/sources/images/error.png',
      })
      return;
    }
    wx.showLoading({
      title: '提交中...',
      mask:true,
    });
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/addleave',
      data:{
        openid: getApp().globalData.openId,
        starttime: _this.data.startdate,
        endtime: _this.data.enddate,
        reason: _this.data.leaveReason,
      },
      success:function(res){
        wx.hideLoading();
        console.log(res);
        if (res.data == 'not leave') {
          wx.showModal({
            title: '提示',
            content: '你在这个时间段已有请假申请',
            showCancel:false,
          })
        }

        if(res.data == 'succ'){
          _this.setData({
            flag:true,
          })
          wx.showToast({
            title: '提交成功',
          })
        }
        if (res.data == 'fail') {
          wx.showModal({
            title: '提示',
            content: '服务器繁忙',
          })
        }
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
          })
        }
      }

    })
  },
  nav:function(){
    wx.navigateTo({
      url: '../dz_6/dz_6?role=student',
    })
  },
})