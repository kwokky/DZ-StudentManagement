// pages/dz_12/dz_12.js
var searchtxt = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goHomeList:[],
    page:1,
    flag:'a',
    check:'',
    uncheck:'',   
    search: true, 
    pages:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    searchtxt = '';
    wx.showLoading({
      title: '获取中...',
      mask:true,
    })
    var _this = this;
    wx.request({ 
      url: 'https://www.yanyufanchen.com/api/wxapi/checkhomeList',
      data:{
        openid : getApp().globalData.openId,
        role: getApp().globalData.role,
      },
      success:function(res){
        wx.hideLoading();
        if (res.data == 'not') {
          _this.setData({
            flag: false,
          });
          return;
        }
        console.log(res); 
        _this.setData({
          goHomeList:res.data,
          check: res.data.sundry.count.check,
          uncheck: res.data.sundry.count.uncheck,
          pages:res.data.sundry.pages,
          flag:true,
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

  searchBtnstatus1: function () {
    if (this.data.search) {
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
  /*按钮按下触发函数*/
  bindinput: function (e) {
    searchtxt = e.detail.value;
  },
  /*搜索*/
  search: function (e) {
    console.log(searchtxt);
    var _this = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true,
    })
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/checkhomeList',
      data: {
        openid: getApp().globalData.openId,
        content: searchtxt,
        role: searchtxt ? 'search' : getApp().globalData.role,
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data == 'not') {
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
          goHomeList: res.data,
          check: res.data.sundry.count.check,
          uncheck: res.data.sundry.count.uncheck,
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
      mask:true,
    })
    var _this = this;
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/checkhomeList',
      data: {
        openid: getApp().globalData.openId,
        content: searchtxt,
        role: searchtxt ? 'search' : getApp().globalData.role,
        page: _this.data.page - 1,
      },
      success: function (res) {
        wx.hideLoading();
        _this.setData({
          goHomeList: res.data,
          page: _this.data.page - 1,
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
      mask:true,
    })
    var _this = this;
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/checkhomeList',
      data: {
        openid: getApp().globalData.openId,
        content: searchtxt,
        role: searchtxt ? 'search' : getApp().globalData.role,
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
          goHomeList: res.data,
          page: _this.data.page + 1,
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
    this.onLoad();
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