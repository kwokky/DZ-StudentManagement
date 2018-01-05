// pages/dz_1/dz_1.js
const app = getApp()
import weCropper from '../../dist/weCropper'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var _this = this;
  
    /*获取缓存 如果有缓存则读取缓存内容 不存在则写入缓存*/
    try {
      let openId = wx.getStorageSync('openId');
      let role = wx.getStorageSync('role');
      let roleurl = wx.getStorageSync('roleurl');

      if (!openId && !role && !roleurl) { //没有缓存的情况下
        this.setuserinfo();
      } else {
        getApp().globalData.openId = openId;
        getApp().globalData.role = role;
        getApp().globalData.roleurl = roleurl;
      }

    } catch (e) {    //捕捉到出错就获取用户信息
      console.log(e);
      this.setuserinfo();
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /* 设置用户信息 在没有缓存的情况下设置*/
  setuserinfo: function () {
    if (getApp().globalData.urlflag) {
      wx.navigateBack({
        delta: 1,
      });
      return;
    };
    wx.showLoading({
      title: '获取中...',
      mask: true,
    });
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getrole',
          data: {
            code: res.code,
          },
          success: function (res) {

            console.log(res);
            //设置全局变量
            if (!res.data.role) {    //设置跳转页面
              getApp().globalData.roleurl = '/pages/dz_21/dz_21';
              getApp().globalData.openId = res.data.openid;
            } else {
              if (res.data.role == 'student') {    //设置跳转页面
                getApp().globalData.roleurl = '/pages/dz_14/dz_14';
              }
              if (res.data.role == 'teacher') {    //设置跳转页面
                getApp().globalData.roleurl = '/pages/dz_2/dz_2';
              }
              if (res.data.role == 'boss') {    //设置跳转页面
                getApp().globalData.roleurl = '/pages/admin_menu/admin_menu';
              }
              getApp().globalData.role = res.data.role;
              getApp().globalData.openId = res.data.openid;
              //设置缓存
              wx.setStorageSync('openId', getApp().globalData.openId);
              wx.setStorageSync('role', getApp().globalData.role);
              wx.setStorageSync('roleurl', getApp().globalData.roleurl);
            }
            wx.hideLoading();

            
            
          },
          fail: function (err) {
            wx.hideLoading();
            console.log(err);
            wx.showModal({
              title: '提示',
              content: '获取用户信息失败，点击确定重试。',
              cancelText: '退出',
              success: function (res) {
                if (res.confirm) {
                  getApp().globalData.urlflag = false;
                  _this.setuserinfo();
                } else {
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              }
            })
          }
        })
      },
      fail: function (err) {
        console.log(err);
        wx.hideLoading();
        console.log(err);
        if (err.errMsg.indexOf('login:fail Error') >= 0) {
          wx.showModal({
            title: '提示',
            content: '获取用户信息失败，请打开网络点击确定重试。',
            cancelText: '退出',
            success: function () {
              if (res.confirm) {
                getApp().globalData.urlflag = false;
                _this.onLoad();
              } else {
                wx.navigateBack({
                  delta: 1,
                })
              }
            }
          })
        }
      },
    })
  },

/*点击进入*/
  comein: function () {
    if (!getApp().globalData.roleurl) {
      return;
    }
    wx.redirectTo({
      url: getApp().globalData.roleurl,
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