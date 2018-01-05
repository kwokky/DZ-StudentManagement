// pages/admin_classbackhome/admin_classbackhome.js
var searchtxt = '';
Page({
  //分页
  page: function (e) {
    var _this = this;
    var button = '';
    if (e !== undefined) {
      if (e.target.dataset.id == 1) {
        if (this.data.page + 1 == this.data.pages && this.data.pages != 0) {
          wx.showToast({
            title: '没有下一页了',
            image: '../../sources/images/error.png',
            duration: 1500,
          });
          return;
        }
        button = 1;
        this.setData({
          page: ++this.data.page
        })
      } else {
        if (this.data.page == 0) {
          wx.showToast({
            title: '没有上一页了',
            image: '../../sources/images/error.png',
            duration: 1500,
          });
          return;
        }
        button = 0;
        this.setData({
          page: --this.data.page
        })
      }
    }

    wx.showLoading({
      title: '加载中......',
      mask: true,
    })
    var week = '';
    if (this.data.week !== undefined) {
      week = this.data.week
    }
    
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/weekHomeContent',
      data: {
        page: _this.data.page,
        class: _this.data.class ,
        week: week,
        year:_this.data.year,
      },
      success: function (e) {
         console.log(e.data);
  
        _this.setData({
          checkhome: e.data[0],
          page: e.data.page,
          pages:e.data.pages,
          flag:true,
        })
        if (e.data.msg !== undefined) {
          if (e.data.msg == 0) {
            wx.hideLoading();
            wx.showModal({
              content: '抱歉 暂时没有信息',
              showCancel:false,
              success: function () {
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
            return;
          } else if (e.data.msg == 1) {
            wx.showToast({
              title: '没有上一页了',
              image: '../../sources/images/error.png',
              duration: 1500,
            })
            return;
          } else {
            wx.showToast({
              title: '没有下一页了',
              image: '../../sources/images/error.png',
              duration: 1500,
            })
            return;
          }
        }
        wx.hideLoading();
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
   * 页面的初始数据
   */
  data: {
    checkhome: [],
    page:0,
    pages:0,
    class: '',
    week:'',
    flag:'a',
    search: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      class: options.class,
      week: options.week,
      year:options.year,
    });
    this.page();
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
  
    var _this = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true,
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/weekHomeContent',
      data: {
        week:_this.data.week,
        content: searchtxt,
        class: _this.data.class,
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data['msg'] == 0) {
          wx.showModal({
            title: '提示',
            content: '查询不到此信息',
            showCancel: false,
          });
          return;
        }
        console.log(res);
        _this.setData({
          checkhome: res.data[0],
          page: res.data.page,
          pages: res.data.pages,
          flag: true,
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