// pages/dz_6/dz_6.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    page:1,
    flag:'a',
    pages:0,
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
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getBackHome',
      data:{
        openid:getApp().globalData.openId,
        page:1,
      },
      success:function(res){
        wx.hideLoading();
        console.log(res.data);
        if(res.data == 'not') {
          wx.showModal({
            title: '提示',
            content: '没有信息。',
            showCancel:false,
            success:function(r) {
              if(r.confirm) {
                wx.navigateBack({
                  delta:1,
                })
              }
            }
          });
          return;
        }

        _this.setData({
          info: res.data['data'],
          pages: res.data['pages'],
          flag: 2,
        });
        console.log(_this.data.info);
        
      },
      fail:function(err){
        console.log(err);
        if (err.errMsg.indexOf('request:fail')>=0){
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
        
      },
    })
  },

  /*上一页*/
  previous: function () {
    if (this.data.page - 1 == 0) {
      wx.showToast({
        title: '已经是第一页了',
        image: '../../sources/images/error.png',
      });
      return;
    }
    wx.showLoading({
      title: '获取中',
    })
    var _this = this;
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getBackHome',
      data: {
        openid: getApp().globalData.openId,
        page: _this.data.page - 1,
      },
      success: function (res) {
        wx.hideLoading();
        _this.setData({
          info: res.data['data'],
          page: _this.data.page - 1,
        })
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },
  /*下一页*/
  next: function () {
    if (this.data.page == this.data.pages) {
      wx.showToast({
        title: '已经是最后一页了',
        image: '../../sources/images/error.png',
      });
      return;
    }
    wx.showLoading({
      title: '获取中',
    })
    var _this = this;
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getBackHome',
      data: {
        openid: getApp().globalData.openId,
        page: _this.data.page + 1,
      },
      success: function (res) {
        console.log(res);
        
        wx.hideLoading();
        _this.setData({
          info: res.data['data'],
          page: _this.data.page + 1,
        })
      },
      fail: function (err) {
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