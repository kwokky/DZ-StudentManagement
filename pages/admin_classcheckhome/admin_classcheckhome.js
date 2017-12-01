// pages/admin_classbackhome/admin_classbackhome.js
Page({
  //分页
  page: function (e) {
    wx.showLoading({
      title: '加载中......',
      mask:true,
    })
    var button = '';
    var classes = this.data.class;
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
      url: 'https://www.yanyufanchen.com/api/wxapi/weekHomeContent',
      data: {
        page: _this.data.page,
        class: classes ,
        week: week 
      },
      success: function (e) {
        // console.log(e.data);
  
        _this.setData({
          checkhome: e.data[0],
          uncheckhome: e.data[1],
          page: e.data.page
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
    checkhome: [
      // {
      //   username: '王二狗',
      //   tripmode: '自行离校',
      //   contime: '2017-11-09 20:08',
      //   adress: '山东省临沂市兰山区北京路17号',
      // }, 
    ],
    uncheckhome:[

    ],
    page:0,
    class: '',
    week:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      class: options.class,
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