// pages/dz_23/dz_23.js

var QQMapWX = require("../../lib/qqmap-wx-jssdk.js");
var qqmapsdk = new QQMapWX({
  key: 'LM5BZ-O4YWV-JC6P3-U66TW-ZKL63-WWBYU'
});
var _this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowadress:'获取中...',
    photo :'',
    latitude:'',
    longitude:'',
    time:'',
    subflag:false,
  },

  /*选择图片*/
  checkPhoto: function () {
    if(this.data.subflag){
      wx.previewImage({
        urls: [this.data.photo], // 当前显示图片的http链接
      })
      return;
    }
    var _this = this;
    wx.chooseImage({
      sourceType:['camera'],
      success: function (res) {
        console.log(res);
        _this.setData({
          photo: res.tempFiles[0]['path'],
        });
      },
    })
  },
  /*提交*/
  sub:function(){
    var _this = this;
    if(!this.data.photo){
      wx.showModal({
        title: '提示',
        content: '请拍照上传。',
        showCancel: false,
      });
      return;
    }
    wx.showLoading({
      title: '打卡中...',
      mask:true,
    })
    /*路线距离计算接口开始*/
    qqmapsdk.calculateDistance({
      to: [{
        latitude: 34.973865,
        longitude: 118.401074
      }],
      success: function (res) {
        console.log(res);
        if (res.result.elements[0].distance > 1000) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '距离学校地址太远',
            showCancel: false,
          });
          return;
        }
        /*上传图片开始*/
        wx.uploadFile({
          url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/checkShool',
          filePath: _this.data.photo,
          name: 'userimg',
          formData: {
            openid: getApp().globalData.openId,
            adress: _this.data.nowadress,
          },
          success: function (res) {
            var result = JSON.parse(res.data);
            console.log(res);
            switch(result){
              case 'succ' :
                wx.showToast({
                  title: '打卡成功',
                });
                _this.setData({
                  subflag:true,
                })
                break;
              case 'not sub':
              wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '请在周五或周六的19:30-20:40打卡',
                  showCancel:false,
                })
                break;
              case 'insert error':
              wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '打卡插入失败',
                  showCancel:false,
                });
                break;
              case 'insert error':
                wx.hideLoading();
                wx.showModal({
                  title: '提示',
                  content: '图片上传错误，请稍后重试。',
                  showCancel: false,
                });
                break;
            }

          },
          fail: function (err) {
            wx.hideLoading();
            console.log(err);
            if (err.errMsg.indexOf('request:fail') >= 0) {
              wx.hideLoading();
              wx.showModal({
                title: '提示',
                content: '网络不畅通，点击确定重试',
                showCancel: false,
                success: function () {
                  _this.sub();
                }
              })
            }
          }
        })
        /*上传图片结束*/
      },
      fail: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.status == 373) {
          wx.showModal({
            title: '提示',
            content: '距离学校地址太远',
            showCancel: false,
          })
        } else {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取中...',
      mask:true,
    })
    // console.log(options);
    // return;
    _this = this;
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/ischeckShool',
      data:{
        openid:getApp().globalData.openId,
        id: options.id ? options.id : '',
      },
      success:function(res){
        console.log(res);
        if(res.data == 'not'){
          wx.hideLoading();
          getLoc();
        }else{
          wx.hideLoading();
          _this.setData({
            photo: res.data.photo,
            nowadress: res.data.adress,
            subflag: true,
          })
        }
          
        
      },
      fail:function(err){
        console.log(err);
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

function getLoc(){
  wx.showLoading({
    title: '定位中...',
    mask: true,
  })
  wx.getLocation({      //获取地址
    type: 'wgs84',
    success: function (res) {
      _this.setData({
        latitude: res.latitude,
        longitude: res.longitude,
      })
      qqmapsdk.reverseGeocoder({    //地址逆解析
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res);
          _this.setData({
            nowadress: res.result.address,
          })
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '定位失败，请稍后重试',
            showCancel:false,
            success:function(){
              wx.navigateBack({
                delta:1,
              })
            }
          })
        }
      });
    },
  })
}