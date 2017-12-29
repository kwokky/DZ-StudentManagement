// pages/admin_classbackhome/admin_classbackhome.js
var searchtxt = '';
Page({

  showInfo: function (e) {
    // console.log(e.currentTarget.dataset.id);
    var val = e.currentTarget.dataset.val;
    var week = e.currentTarget.dataset.week;
    wx.navigateTo({
      url: '../admin_chuqininfo/admin_chuqininfo?infos=' +JSON.stringify(val)+'&week='+week,
    })
  },
  //分页
  page: function (e) {
    
    var button = '';
    if (e !== undefined) {
      if (e.target.dataset.id == 1) {
        if (this.data.page == this.data.pages) {
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
        if (this.data.page == 1) {
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
    // console.log(this.data.page);
    var _this = this;
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/getStuRate',
      data: {
          role:'admin',
          page:_this.data.page,
          week: week,
      },
      success: function (e) {
        console.log(e.data);
        _this.setData({
          classhome_list: e.data[0],
          page: e.data.page,
          pages: e.data.pages,
          flag: true,
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
    classhome_list: [],
    page:0,
    pages:0,
    flag:'a',
    week: '',
    search: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取日期是本年的第几周
    var weekofyear = (((new Date()) - (new Date("2017-01-01"))) / (24 * 60 * 60 * 7 * 1000) | 0) + 1;
    this.setData({
      week: options.week ? options.week : weekofyear,
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
    console.log(searchtxt);
    var _this = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true,
    })
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/getStuRate',
      data: {
        content: searchtxt,
        role:searchtxt ? 'search' : 'admin',
        week:_this.data.week,
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
          classhome_list: res.data[0],
          page: res.data.page,
          pages: res.data.pages,
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