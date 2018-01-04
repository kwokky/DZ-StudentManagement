//index.js
//获取应用实例
const app = getApp()
var searchtxt = '';
Page({
  data: {
    allClassHomeCount:[],
    page:1,
    flag:'a',
    proper: '',
    bus: '',
    car: '',
    search:true,
    pages:0,
  },
  onLoad:function(){
    searchtxt = '';
    wx.showLoading({
      title: '获取中...',
      mask:true,
    }) 
    var _this = this;
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/backHomeList',
      data: {
        openid: getApp().globalData.openId,
        find: 'all',
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data == 'not') {
          _this.setData({
            flag: false,
          });
          return;
        }
        _this.setData({
          allClassHomeCount: res.data,
          flag: true,
          proper: res.data.sundry.type.proper ? res.data.sundry.type.proper : 0,
          bus: res.data.sundry.type.bus ? res.data.sundry.type.bus : 0,
          car: res.data.sundry.type.car ? res.data.sundry.type.car : 0,
          pages: res.data.sundry.pages,
        })
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
  
  searchBtnstatus1:function(){
    if(this.data.search) {
      this.setData({
        search: false,
      })
    }
  },
  searchBtnstatus2: function () {
    if (!this.data.search && !searchtxt) {
      this.setData({
        search: true,
      })
    }
  },
  /*搜索*/
  search:function(e){
    console.log(searchtxt);
    var _this = this;
    wx.showLoading({
      title: '搜索中...',
      mask:true,
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/backHomeList',
      data: {
        openid: getApp().globalData.openId,
        content:searchtxt,
        find: searchtxt ? 'search' : 'all',
      },
      success: function (res) {
        wx.hideLoading();
        if(res.data == 'not') {
          wx.showModal({
            title: '提示',
            content: '查询不到此信息',
            showCancel: false,
          });
          return;
        }
        console.log(res);
        _this.setData({
          page:1,
          allClassHomeCount: res.data,
          proper: res.data.sundry.type.proper ? res.data.sundry.type.proper : 0,
          bus: res.data.sundry.type.bus ? res.data.sundry.type.bus : 0,
          car: res.data.sundry.type.car ? res.data.sundry.type.car : 0,
          pages:res.data.sundry.pages,
        })
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
            success: function () {
            }
          })
        }
      }
    })
  },
  bindinput:function(e){
    searchtxt = e.detail.value;
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
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/backHomeList',
      data: {
        openid: getApp().globalData.openId,
        content: searchtxt,
        find: searchtxt ? 'search' : 'all',
        page: _this.data.page - 1,
      },
      success: function (res) {
        wx.hideLoading();
        _this.setData({
          allClassHomeCount: res.data,
          page: _this.data.page - 1,
        })
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
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/backHomeList',
      data: {
        openid: getApp().globalData.openId,
        content: searchtxt,
        find: searchtxt ? 'search' : 'all',
        page: _this.data.page + 1,
      },
      success: function (res) {
        console.log(res);
        if (res.data == 'not') {
          wx.showToast({
            title: '已经是最后一页了',
            image: '../../sources/images/error.png',
          });
          return;
        }
        wx.hideLoading();
        _this.setData({
          allClassHomeCount: res.data,
          page: _this.data.page + 1,
        })
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
      }
    })
  },

})
