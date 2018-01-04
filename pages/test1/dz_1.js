  //index.js
//获取应用实例
const app = getApp()
import weCropper from '../../dist/weCropper'


Page({
  data: {
  },

  onLoad: function (option) {  
    var _this = this;
    if (getApp().globalData.urlflag){
      wx.navigateBack({
        delta:1,
      });
      return;
    };
    wx.showLoading({
      title: '获取中...',
      mask: true,
    });

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
        wx.hideLoading();
      }

    } catch(e) {    //捕捉到出错就获取用户信息
      console.log(e);
      this.setuserinfo();
    }
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
            }
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
                  _this.onLoad();
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


  

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  

  comein:function(){
    if (!getApp().globalData.roleurl) {
        return;
    }
    wx.redirectTo({
      url: getApp().globalData.roleurl,
    })
  }
})
