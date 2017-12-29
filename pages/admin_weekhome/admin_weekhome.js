// pages/admin_weekhome/admin_weekhome.js
var searchtxt = '';
Page({
  showInfo0: function (e) {
    // console.log(e.currentTarget.dataset.id);
    var classe = e.currentTarget.dataset.class;
    var week = e.currentTarget.dataset.week;
    wx.navigateTo({
      url: '../admin_classbackhome/admin_classbackhome?class=' + classe + '&week=' + week,
    })
  },
  showInfo1: function (e) {
    // console.log(e.currentTarget.dataset.id);
    var classe = e.currentTarget.dataset.class;
    var week = e.currentTarget.dataset.week;
    wx.navigateTo({
      url: `../dz_10/dz_10?class=${classe}&week=${week}&find=all`,
    })
  },
  
  /**
   * 页面的初始数据
   */
  data: {
    weekhome_list:[],
    weekshool_list: [],
    search: true,
    page0:0,
    page1:0,
    pages0:0,
    pages1:0,
    week:'',
    flag:'a',
    currentTab: 0,  
    swiperHei:0,
  },


  swichNav: function (e) {
    console.log(e);
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  swiperChange: function (e) {
    this.setData({
      currentTab: e.detail.current,
      search:true,
    })
    if (e.detail.current == 0) {
      if (!this.data.weekhome_list.length) {
        this.page0();
      }
      
    }else{
      if (!this.data.weekshool_list.length) {
        this.page1();
      }
    }
  
  },  

  /**
   * 得到swiper高度
   * @param c  当前bar的标识  this.data.current
   * @param l  数据长度
   * 
  */
  swiperHeight: function (c, l) {
    var height;

      height = (l * 37) + 30 + 38 + 100;

    wx.getSystemInfo({
      success: function (res) {  // 如果高度达不到窗口高度 则设置为窗口高度
        if (height < res.windowHeight) {
          height = res.windowHeight - 40;
        }
      },
    })
    return height;
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取日期是本年的第几天
    var weekofyear = (((new Date()) - (new Date("2017-01-01"))) / (24 * 60 * 60 * 7 * 1000) | 0) + 1;
      this.setData({
        week: options.week ? options.week : weekofyear,
      });
    this.page0();
   
  },


  /*上一页*/
  previous: function () {
   
  },
  /*下一页*/
  next: function () {
    
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

  /*搜索0*/
  search0: function (e) {
    console.log(searchtxt);
    var _this = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true,
    })
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/weekHomeCount',
      data: {
        week:_this.data.week,
        content: searchtxt,
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data[0] == '') {
          wx.showModal({
            title: '提示',
            content: '查询不到此信息',
            showCancel: false,
          });
          return;
        }
        console.log(res);
        _this.setData({
          weekhome_list: res.data[0],
          page0: res.data.page,
          pages0: res.data.pages,
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

  /*搜索1*/
  search1: function (e) {
    console.log(searchtxt);
    var _this = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true,
    });
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/weekLeaveCount',
      data: {
        week: _this.data.week,
        content: searchtxt,
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data[0] == '') {
          wx.showModal({
            title: '提示',
            content: '查询不到此信息',
            showCancel: false,
          });
          return;
        }
        console.log(res);
        _this.setData({
          weekshool_list: res.data[0],
          page1: res.data.page,
          pages1: res.data.pages,
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

  //分页
  page0: function (e) {
    var button = '';
    if (e !== undefined) {
      if (e.target.dataset.id == 1) {
        if (this.data.page0 + 1 == this.data.pages0 && this.data.pages0 != 0) {
          wx.showToast({
            title: '没有下一页了',
            image: '../../sources/images/error.png',
            duration: 1500,
          });
          return;
        }
        button = 1;
        this.setData({
          page: ++this.data.page0
        })
      } else {
        if (this.data.page0 == 0) {
          wx.showToast({
            title: '没有上一页了',
            image: '../../sources/images/error.png',
            duration: 1500,
          });
          return;
        }

        button = 0;
        this.setData({
          page: --this.data.page0
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
    console.log(this.data.week);
    var _this = this;
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/weekHomeCount',
      data: {
        page: _this.data.page0,
        week: week
      },
      success: function (e) {
        console.log(e.data);
        if (e.data.msg !== undefined) {
          if (e.data.msg == 0) {
            wx.showToast({
              title: '抱歉 暂时没有信息',
              image: '../../sources/images/error.png',
              duration: 1500,
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
        var height = _this.swiperHeight(_this.data.currentTab, e.data[0].length);
        _this.setData({
          weekhome_list: e.data[0],
          page0: e.data.page,
          pages0: e.data.pages,
          swiperHei: height,
          flag: true,
        })
        wx.hideLoading();
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

  page1: function (e) {
    wx.showLoading({
      title: '加载中......',
      mask: true,
    })
    var button = '';
    if (e !== undefined) {
      if (e.target.dataset.id == 1) {
        if (this.data.page1 + 1 == this.data.pages1 && this.data.pages1 != 0) {
          wx.showToast({
            title: '没有下一页了',
            image: '../../sources/images/error.png',
            duration: 1500,
          });
          return;
        }
        button = 1;
        this.setData({
          page: ++this.data.page1
        })
      } else {
        if (this.data.page1 == 0) {
          wx.showToast({
            title: '没有上一页了',
            image: '../../sources/images/error.png',
            duration: 1500,
          });
          return;
        }

        button = 0;
        this.setData({
          page: --this.data.page1
        })
      }
    }
    var week = '';
    if (this.data.week !== undefined) {
      week = this.data.week
    }
    // console.log(this.data.page);
    var _this = this;
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/weekLeaveCount',
      data: {
        page: _this.data.page1,
        week: week
      },
      success: function (e) {
        // console.log(e.data);
        // return;

        if (e.data.msg !== undefined) {
          if (e.data.msg == 0) {
            wx.showToast({
              title: '抱歉 暂时没有信息',
              image: '../../sources/images/error.png',
              duration: 1500,
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
        _this.setData({
          weekshool_list: e.data[0],
          page1: e.data.page,
          pages1: e.data.pages,
          flag: true,
        })
        wx.hideLoading();
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



  
})