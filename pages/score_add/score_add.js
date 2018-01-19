// pages/score_add/score_add.js
var myDate = new Date(); 
Page({
  //日期选择
  bindDateChange: function (e) { 
    this.setData({
      time: e.detail.value,
    })
  },
  //提交表单
  formSubmit:function (e) {
    var uid = this.data.uid;
    var nowData = myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();
    if (!e.detail.value.sname) {
      wx.showToast({
        title: '请填写科目名称',
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!e.detail.value.score) {
      wx.showToast({
        title: '请填写考试分数',
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!e.detail.value.num) {
      wx.showToast({
        title: '请填写考试次数',
        image: '../../sources/images/error.png',
      });
      return;
    }
    if(!e.detail.value.pubtime) {
      wx.showToast({
        title: '请选择日期',
        image: '../../sources/images/error.png',
      });
      return;
    }

    if (e.detail.value.pubtime > nowData) {
      wx.showToast({
        title: '日期不合法',
        image: '../../sources/images/error.png',
      });
      return;
    }

   
    if (this.data.addUpdate == 1){
      wx.request({
        url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/scoreAdd',
        data: {
          data: e.detail.value,
          uid: uid,
        },
        success: function (res) {
          switch(res.data){
            case 'succ' :
              wx.showToast({
                title: '添加成功',
                duration: 1500,
              });
              break;
            case 'fail':
              wx.showToast({
                title: '添加失败，请稍后重试',
                duration: 1500,
              });
              return;
              break;
            case 'server error':
              wx.showToast({
                title: '服务器内部错误',
                image:'../../sources/images/error.png',
                duration: 1500,
              });
              return;
              break;
          }
          
          var pages = getCurrentPages();
          var prePage = pages[pages.length - 2];
          prePage.setData({
            uid: uid
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }
      })
    }else{
      var id = this.data.id;
      wx.request({
        url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/scoreUpdate',
        data: {
          data: e.detail.value,
          id: id,
        },
        success: function (res) {
          wx.showToast({
            title: '修改成功',
            duration: 1500,
          });
          var pages = getCurrentPages();
          var prePage = pages[pages.length - 2];
          prePage.setData({
            uid: uid
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        }
      })

    }
    
  },

  /**
   * 页面的初始数据
   */
  data: {
    addUpdate:'',
    uid:'',
    id:'',
    scoreInfo:[],
    time: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      addUpdate:options.addup,
      uid:options.uid,
      id:options.id
    })
    if(options.addup==0){
      var id = this.data.id;
      console.log(id);
      var _this = this;
      wx.request({
        url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getGrow',
        data: {
          id: id,
          typeid:0,
        },
        success:function(res){
          console.log(res)
          _this.setData({
            scoreInfo:res.data.arr[0],
            time:res.data.arr[0].pubtime
          })
        }
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