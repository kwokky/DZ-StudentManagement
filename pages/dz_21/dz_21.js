// pages/dz_5/dz_5.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    wx.showLoading({
      title: '加载中...',
      mask:true,
    })
    var _this=this;
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/buttonstatus',
      success:function(res){
        console.log(res);
        wx.hideLoading();
        if (res.data.teacher == 0 && res.data.student == 1){
          _this.setData({
            role: [
              {
                role: '学生',
                en: 'student',
              },
            ]
          })
        }
        if (res.data.teacher == 1 && res.data.student == 0) {
          _this.setData({
            role: [
              {
                role: '教师',
                en: 'teacher',
              },
            ]
          })
        }
        if (res.data.teacher == 1 && res.data.student == 1) {
          _this.setData({
            role: [
              {
                role:'教师',
                en: 'teacher',
              },
              {
                role: '学生',
                en: 'student',
              },
            ]
          })
        }
        if (res.data.teacher == 0 && res.data.student == 0) {
          _this.setData({
            role: [
              {
                role: '无启用角色',
              }
            ]
          })
        }
      },
      error:function(err){

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

  adduser:function(e){
    var val = e.currentTarget.dataset.val;
    if(!val){        // 如果没有值则无角色启用
      return;
    }
      wx.showLoading({      //开启加载层
        title: '请稍后...',
        mask:true,
      })
      wx.request({
        url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/adduser',
        data: {
          role: val,    //所选角色
          openid:getApp().globalData.openId,  //用户openid
        },
        success: function (res) {
          wx.hideLoading();     //关闭加载层
          if (res.data.msg == 'student') {
            getApp().globalData.roleurl = '/pages/dz_14/dz_14';
            getApp().globalData.role = 'student';
            //设置缓存
            wx.setStorageSync('openId', getApp().globalData.openId);
            wx.setStorageSync('role', 'student');
            wx.setStorageSync('roleurl', '/pages/dz_14/dz_14');
            wx.redirectTo({
              url: '/pages/dz_14/dz_14',
            })
          }
          if (res.data.msg == 'teacher') {
            getApp().globalData.roleurl = '/pages/dz_2/dz_2';
            getApp().globalData.role = 'teacher';
            //设置缓存
            wx.setStorageSync('openId', getApp().globalData.openId);
            wx.setStorageSync('role', 'teacher');
            wx.setStorageSync('roleurl', '/pages/dz_2/dz_2');
            wx.redirectTo({
              url: '/pages/dz_2/dz_2',
            })
          }
        },
        fail: function (err) {
          console.log(err);
        }
      })
  }
})