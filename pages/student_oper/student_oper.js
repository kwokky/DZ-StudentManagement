 // pages/student_oper/student_oper.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xingzhi: [{
      name: '表扬',
      value: 1,
      checked:true,
    }, {
      name: '犯错',
      value: 0,
    }],
    honor: [{
      name: '是',
      value: 1,
      checked: true,
    }, {
      name: '否',
      value: 0,
    }],
    username:'',
    show:1,
    userinfo:[],
  },

  /*原因失去焦点触发*/
  yuanyin: function (e) {
    this.setData({
      yuanyin: e.detail.value,
    })
  },

  /*改变状态*/
  xingzhiChange: function (e) {
    if(e.detail.value == 0) {

    }
    console.log(e);
    this.setData({      //页面显示
      show: e.detail.value,
    });
  },

  /*提交信息*/
  Submit: function (e) {
    console.log(e);
    if(!e.detail.value.content) {
      wx.showToast({
        title: '请填写内容',
        image: '/sources/images/error.png',
      })
      return;
    }
    var _this = this;
    wx.showLoading({
      title: '提交中...',
      mask: true,
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/cGrow',
      data: {
        id: _this.data.id,
        type: _this.data.userinfo.length == 0 ? 'add' :'update',
        data: e.detail.value,
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        switch (res.data) {
          case 'succ':
            wx.showToast({
              title: '提交成功',
              mask:true,
            });
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              });
            }, 1500);

            break;
          case 'fail':
            wx.showModal({
              title: '提示',
              content: '未知提交错误，请稍后重试。',
              showCancel: false,
            })
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
            content: '网络不畅通哦',
            showCancel: false,
          })
        }
      }
    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      username:options.username,
      id: options.userid,
    });
    if(!options.upid) {
      return;
    }
    var _this = this;
    wx.showLoading({
      title: '获取中...',
      mask: true,
    });
    wx.request({    //请求数据
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getGrow',
      data: {
        uid: options.upid,
        typeid: 3,
      },
      success: function (res) {
        wx.hideLoading();
         _this.setData({
            show :res.data.arr[0].status == 1 ? 1 : 0,
            userinfo: res.data.arr,
            id:options.upid,
          })

        console.log(res);
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