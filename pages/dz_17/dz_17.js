
var QQMapWX = require("../../lib/qqmap-wx-jssdk.js");
var qqmapsdk = new QQMapWX({
  key: 'LM5BZ-O4YWV-JC6P3-U66TW-ZKL63-WWBYU'
});
var c = '';
Page({ 
  /**
   * 页面的初始数据
   */
  data: {
    //当前位置
    nowPlace:'获取中...',
    //家庭位置
    homePlace:'获取中...',
    flag:true,
    backflag:'a',
    btnstatus:true,
    latitude:0,
    longitude:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    c = options.c;
    wx.showLoading({
      title: '获取中...',
      mask:true,
    })
    wx.request({      //获取家庭位置
      url: 'https://www.yanyufanchen.com/api/wxapi/getuserinfo',
      data:{
        openid: getApp().globalData.openId,
        role:'student',
      },
      success:function(res){
        //console.log(res);
        if(res.data.btnstatus && !res.data.conhome){   //如果状态按钮启用 获取位置 
          wx.getLocation({      //获取地址
            type: 'wgs84',
            success: function (res) {
              console.log(res);
              qqmapsdk.reverseGeocoder({    //地址逆解析
                location: {
                  latitude: res.latitude,
                  longitude: res.longitude
                },
                success: function (res) {
                  wx.hideLoading();
                  console.log(res);
                  _this.setData({
                    nowPlace: res.result.address,
                    latitude:res.result.location.lat,
                    longitude: res.result.location.lng,
                  })
                },
                fail: function (res) {
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
              });
            },
          })
        }else{
          wx.hideLoading();
          _this.setData({
            nowPlace: '按钮不可用',
          })
        }
        console.log(res);
        _this.setData({
          homePlace: res.data.btnstatus ? res.data.adress : '按钮不可用',
          flag: res.data.conhome ? true : false,
          backflag: res.data.backhome ? 1 :  0,
          btnstatus: res.data.btnstatus ? true : false,
        })
      },
      fail:function(err){
        wx.hideLoading();
        console.log(err);
        if (err.errMsg.indexOf('request:fail') >= 0) {
          wx.showModal({
            title: '提示',
            content: '网络不畅通哦',
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: 1,
              });
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
  
  },
  
  ishome:function(){
    if (this.data.nowPlace == '获取中...' || this.data.homePlace == '获取中...'){
      wx.showToast({
        title: '请等待位置获取完毕',
        image:'../../sources/images/error.png',
      })
      return;
    }
    var _this=this;
    wx.showLoading({
      title: '确认中...',
      mask:true,
    })
    qqmapsdk.geocoder({     //地址解析(家庭地址转坐标)接口
      address: _this.data.homePlace,
      success: function (res) {
          console.log(_this.data.longitude + ' ' + _this.data.latitude);
        /*路线距离计算接口开始*/
        qqmapsdk.calculateDistance({  
        
          from:{
            latitude: _this.data.latitude,
            longitude: _this.data.longitude
          },  
          to: [{
            latitude: res.result.location.lat,
            longitude: res.result.location.lng
          }],
          success: function (res) {
            console.log(res);
            if (res.result.elements[0].distance > 3000){
              wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '距离家庭地址太远',
                  showCancel:false, 
                });
                
                return;
            }
            wx.request({      //请求开发接口
              url: 'https://www.yanyufanchen.com/api/wxapi/conhome',
              data:{
                openid: getApp().globalData.openId,
                adress: _this.data.nowPlace,
              },
              success:function(res){
                console.log(res);
                wx.showToast({
                  title: '确认成功',
                })
                _this.setData({
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
                }else{
                  wx.showModal({
                    title: '提示',
                    content: '服务器繁忙',
                    showCancel: false,
                  })
                }
              }
            })
          },
          fail: function (res) {
            wx.hideLoading();
            console.log(res);
            if(res.status == 373){
              wx.showModal({
                title: '提示',
                content: '距离家庭地址太远',
                showCancel: false,
              })
            }else{
              wx.showModal({
                title: 'error',
                content: res.message,
                showCancel: false,
              })
            }
            
          }
        });  
        /*路线距离计算接口结束*/
      },
      fail: function (res) {
        console.log(res);
        if (res.status == 347) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '家庭地址查询无结果',
            showCancel: false,
          })
        }
      }
    });
  },

  cd:function(){
    var _this = this;
    if (c && this.data.btnstatus){
      wx.chooseLocation({
        success: function(res) {
          _this.setData({
            nowPlace: res.address,
            latitude: res.latitude,
            longitude: res.longitude,
          })
        },
      })
    }
  }
})
