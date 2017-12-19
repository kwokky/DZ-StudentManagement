// pages/admin_classbackhome/admin_classbackhome.js
var searchtxt = '';
Page({
  showInfo: function (e) {
    // console.log(e.currentTarget.dataset.id);
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../dz_5/dz_5?id=' + id,
    })

  },
  //分页
  page: function (e) {
    // console.log(e);
    var classes = this.data.class;
    
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
    // console.log(this.data.page);
    var _this = this;
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/weekHomeList',
      data: {
        page: _this.data.page,
        classes: classes,
        week: week
      },
      success: function (e) {
        
         console.log(e.data);
        if (e.data.msg !== undefined) {
          if (e.data.msg == 0) {
            wx.hideLoading();
            wx.showModal({
              content: '抱歉 暂时没有信息',
              showCancel:false,
              success:function(){
                wx.navigateBack({
                  delta: 1,
                })
              }
            });
            
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
    classhome_list: [
      // {
      //   name: '王二狗',
      //   sex: '男',
      //   way: '自行离校',
      // },     
    ],
    page:0,
    pages:0,
    class:'',
    week:'',
    flag:'a',
    search: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    // return;
    wx.setNavigationBarTitle({
      title: options.class + '班回家信息'
    })
   
    this.setData({
      class: options.class,
      week: options.week
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
      url: 'https://www.yanyufanchen.com/api/wxapi/weekHomeList',
      data: {
        classes:_this.data.class,
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
          classhome_list: res.data[0],
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