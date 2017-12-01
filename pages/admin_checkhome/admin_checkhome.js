// pages/admin_classbackhome/admin_classbackhome.js
Page({

  showInfo: function (e) {
    // console.log(e.currentTarget.dataset.id);
    var classe = e.currentTarget.dataset.class;
    var week = e.currentTarget.dataset.week;
    wx.navigateTo({
      url: '../admin_classcheckhome/admin_classcheckhome?class='+classe+'&week='+week,
    })
  },
  //分页
  page: function (e) {
    wx.showLoading({
      title: '加载中......',
      mask:true,
    })
    var button = '';
    if (e !== undefined) {
      if (e.target.dataset.id == 1) {
        button = 1;
        this.setData({
          page: ++this.data.page
        })
      } else {
        button = 0;
        this.setData({
          page: --this.data.page
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
      url: 'https://www.yanyufanchen.com/api/wxapi/weekHomeConfirm',
      data: {
        page: _this.data.page,
        week: week
      },
      success: function (e) {
        console.log(e.data);
        // return;
        _this.setData({
          classhome_list: e.data[0],
          page: e.data.page
        })
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
      //   class: 16311,
      //   allnum: 23,
      //   checknum: 18,
      //   unchecknum: 5,
      // },
    ],
    page:0,
    week: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      week: options.week
    });
    this.page();
    
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