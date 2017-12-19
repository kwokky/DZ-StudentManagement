  //index.js
//获取应用实例
const app = getApp()
import weCropper from '../../dist/weCropper'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = width

Page({
  data: {
    a:1,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userrole:'',

  },

  onLoad: function (option) {  
   

    if (getApp().globalData.urlflag){
      wx.navigateBack({
        delta:1,
      })
    }
    wx.showLoading({
      title:'获取中...',
      mask:true,
    })
    var _this=this;
    wx.login({
      success:function(res){
        wx.request({
         url:'https://www.yanyufanchen.com/api/wxapi/getrole',
          data:{
            code:res.code,
          },
          success:function(res){
            wx.hideLoading();
            console.log(res); 
            //设置全局变量
            getApp().globalData.role = res.data.role; 
            getApp().globalData.openId = res.data.openid;
            if (!res.data.role){    //设置跳转页面
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
          },
          fail:function(err){
            wx.hideLoading();
            console.log(err);
              wx.showModal({
                title: '提示',
                content: '获取用户信息失败，点击确定重试。',
                cancelText:'退出',
                success: function (res) {
                  if (res.confirm) {
                    getApp().globalData.urlflag = false;
                    _this.onLoad();
                  }else{
                    wx.navigateBack({
                      delta:1,
                    })
                  }
                }
              })
          }
        })
      },
      fail:function(err){
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
