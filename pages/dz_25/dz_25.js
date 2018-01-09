// pages/dz_7/dz_7.js
var myDate = new Date();
var Month = myDate.getMonth()+1 >= 10 ? `-${myDate.getMonth()+1}` : `-0${myDate.getMonth()+1}`;
var Dates = myDate.getDate() >= 10 ? `-${myDate.getDate() + 1}` : `-0${myDate.getDate() + 1}`;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    status:[{
      name:'到校',
      value:1,
    },{
      name: '未到校',
      value: 0,
    }, {
        name: '已实习',
        value: 2,
    }],
    
    //开始时间
    startdate: myDate.getFullYear() + Month + Dates,
    //结束时间
    enddate: myDate.getFullYear() + Month + Dates,
    //控制页面显示
    show:false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var up1 = options.reat ? "status[1].checked" : "status[0].checked";
    var up2 = "userinfo.id";
    var _this = this;
     this.setData({
       [up1]: true,
       [up2]: options.id,
       show: options.reat ? false : true,
       username:options.username,
     })

     if (!options.reat) {
       return;
     }
     wx.showLoading({
       title: '获取中...',
     })
   wx.request({ 
     url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getStuRateinfo',
     data:{
       id : options.id,
       find:'one',
     },
     success:function(res){
       wx.hideLoading();
        console.log(res);
        if(res.data.endtime == '9999-12-31') {
          var up = "status[2].checked";
          _this.setData({
            [up]: true,
            show:1,
          });
          return;
        }
        _this.setData({
          userinfo: res.data,
          leaveReason: res.data.reason,
          startdate:res.data.begintime,
          enddate:res.data.endtime,
        })
     },
     fail:function(err) {
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
  /*改变状态*/
  statusChange:function(e){
    console.log(e);
      this.setData({      //页面显示
        show: e.detail.value,
      })

    console.log(e);
  },

  startDateChange: function (e) {
    this.setData({
      startdate: e.detail.value
    })
  },
  endDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  /*原因失去焦点触发*/
  yuanyin: function (e) {
    this.setData({
      leaveReason: e.detail.value,
    })
  },

  /*提交信息*/
  Submit:function(e){
    console.log(e);
    if (e.detail.value.status == 0) {
      if (this.data.startdate > this.data.enddate) {
        wx.showToast({
          title: '请假时间不合法',
          image: '/sources/images/error.png',
        })
        return;
      }
      if (!this.data.leaveReason) {
        wx.showToast({
          title: '请填写请假原因',
          image: '/sources/images/error.png',
        })
        return;
      }
    }
    
    var _this = this;
   
    wx.showLoading({
      title: '提交中...',
      mask:true,
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/addRate',
      data: {
        id: e.detail.target.dataset.id,
        data: e.detail.value,
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        switch(res.data) {
          case 'succ':
          wx.showToast({
            title: '提交成功',
          });
          setTimeout(function(){
            wx.navigateBack({
              delta:1,
            });
          },1500);
            
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