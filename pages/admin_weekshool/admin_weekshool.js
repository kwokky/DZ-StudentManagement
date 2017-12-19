// pages/admin_weekshool/admin_weekshool.js
var searchtxt = '';
Page({
  showInfo: function (e) {
    // console.log(e.currentTarget.dataset.id);
    var classe = e.currentTarget.dataset.class;
    var week = e.currentTarget.dataset.week;
    wx.navigateTo({
      url: '../dz_10/dz_10?class=' + classe + '&week=' + week,
    })
  },

  /**
   * 页面的初始数据
   */
  data: {
    weekshool_list:[
      // {
      //   id :1,
      //   class:16321,
      //   num:20,

      // },
      
    ],
    page: 0,
    pages:0,
    week:'',
    search: true,
    flag:'a',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      week:options.week
    });
    this.page();
  },


  /*按钮按下触发函数*/
  bindinput: function (e) {
    searchtxt = e.detail.value;
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