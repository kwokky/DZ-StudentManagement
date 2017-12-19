// pages/dz_20/dz_20.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dromPerson:[], 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '获取中...',
      mask:true,
    })
    var _this = this;
  wx.request({
    url: 'https://www.yanyufanchen.com/api/wxapi/getDormPerson',
    data:{
      dorm:options.dorm,
    },
    success:function(res){
        console.log(res);
        var perbed = [];
        var data = res.data;
        for(var i=0 ; i<8 ; i++){
          if (data.hasOwnProperty(i)){
            perbed[data[i].bed - 1] = data[i];
            if (perbed.hasOwnProperty(i)) {
              continue;
            }
            perbed[i] = { username: '无人' };
          }else{
            if (perbed.hasOwnProperty(i)){
              continue;
            }
            perbed[i] = {username:'无人'};
          }
        }
        var len = perbed.length;
        var ck = -1;
        var j = 0;
        var k = 0;
        var arr = [{}, {}, {}, {}];
        while(len--){
          if (len % 2 != 0) {
            ck++;
            j = 0;
          }
          arr[ck][j] = perbed[k];
          j++;
          k++;
        }
        console.log(arr);
        _this.setData({
          dromPerson: arr,
        });
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

  /*页面跳转*/
  navigator:function(e){
    if(e.currentTarget.dataset.id){
      wx.navigateTo({
        url: '../dz_5/dz_5?id=' + e.currentTarget.dataset.id,
      })
    }
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