// pages/dz_7/dz_7.js
var text = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkhomeinfo:[],
    sid: '',
    weeks:'',
    text : false,
    flag:'a',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options);return;
    var _this = this;
    this.setData({
      sid: options.sid,
      weeks:options.weeks,
    });
    wx.showLoading({
      title: '获取中...',
      mask:true,
    })
   
   wx.request({
     url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getCheckHomeInfo',
     data:{
       sid: _this.data.sid,
       weeks: _this.data.weeks,
     },
     success:res => {
       console.log(res);
       wx.hideLoading();
        _this.setData({
          checkhomeinfo:res.data,
        })
     },
     fail:err => {
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


  /*备注*/
  inputs:function(e){
    text = e.detail.value;
  },

  /* * 
   * 确认学生到家
   * 
  */
  teachercheck:function() {

    var _this = this;
    wx.showLoading({
      title: '确认中...',
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/teacherCheckStudentIsHome',
      data: {
        sid: _this.data.sid,
        weeks: _this.data.weeks,
        text:text,
      },
      success: res => {
        console.log(res);
        wx.hideLoading();
        if(res.data == 'succ') {
          wx.hideLoading();
          wx.showToast({
            title: '确认成功',
          });
          _this.setData({
            ['checkhomeinfo.teacherCheck']:1,
            ['checkhomeinfo.comment']:text,
          });
        }
        if (res.data == 'fail') {
          wx.hideLoading();
          wx.showToast({
            title: '未知错误，请稍后重试',
          });
        }
      },
      fail: err => {
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