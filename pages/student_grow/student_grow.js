
var caozuoid = '';
var searchVal = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,  
    showfloatChunk: false,
    winHeight:0,
    page: 1,
    pages: '',
    flag: 'true',
    uid: '',
    List0: [],
    List1:[],
    List2: [],
    username:'',
    //搜索框默认隐藏
    search_status0: true,
    search_status1: true,
    search_status2: true,
    //搜索框获取焦点
    input_focus: '',
    
  },

  /**
   * 绑定tapBar
  */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },


  /**
   * tabBar发生改变的时候
  */
  swiperChange: function (e) {
    
    this.setData({
      currentTab: e.detail.current,
      showfloatChunk: false,
      search_status0: true,
      search_status1: true,
      search_status2: true,
    });
    if (this.data['List' + '' + e.detail.current].length) {
      this.setData({
        winHeight: this.swiperHeight(e.detail.current, this.data['List' + '' + e.detail.current].length),
      });
      return;
    }

    var _this = this;
    wx.showLoading({
      title: '获取中...',
      mask: true,
    });
    wx.request({    //首先请求当前Bar数据
      url: 'https://www.yanyufanchen.com/api/wxapi/getGrow',
      data: {
        uid: _this.data.uid,
        typeid: e.detail.current,
        page: _this.data.page,
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        var barname = 'List' + e.detail.current;
        var height = _this.swiperHeight(e.detail.current, res.data.arr.length);
        if (res.data.msg == 'not') {
          _this.setData({
            [barname]: '',
            winHeight: height,
          })
          wx.showModal({
            title: '提示',
            content: '没有这方面的信息，换个别的看看吧。',
            showCancel: false,
          });
        } else {
          _this.setData({
            [barname]: res.data.arr,
            winHeight: height,
          })
        } 
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    })
  },

  /**
   * 得到swiper高度
   * @param c  当前bar的标识  this.data.current
   * @param l  数据长度
   * 
  */
  swiperHeight:function(c,l) {
    var height;
    if (c == 0) {  //成绩高度
      height = l * 55 + 150;
    }
    if (c == 1) {  //好人好事高度
      height = l * 50 + 40;
    }
    if (c == 2) {  //荣誉高度
      height = l * 80 + 40;
    }
    wx.getSystemInfo({
      success: function(res) {  // 如果高度达不到窗口高度 则设置为窗口高度
        if (height < res.windowHeight) {
          height = res.windowHeight - 80;
        } 
      },
    })
    return height;
  },


  /**
   * 显示浮动框
  */
  Oper:function(e){
    caozuoid = e.currentTarget.dataset.id;   //要修改的id
    this.setData({
      showfloatChunk: true,
      floatChunkLeft: e.detail.x - 50 > 0 ? e.detail.x - 50  : 0,
      floatChunkTop: e.detail.y - 110 > 0 ? e.detail.y - 110 : 0,
    })
  }, 


  /**
   * 隐藏浮动框
  */
  hideFloat: function (e) {
    this.setData({
      showfloatChunk:false,
    })
  }, 

  /*
  *要进行的操作 （修改&删除）
  */
  caozuo:function(e){
    var _this = this;
    var checktype = e.currentTarget.dataset.type;
    if (checktype == 'delete') {  //删除
        wx.showModal({
          title: '提示',
          content: '确定要删除该条数据吗？',
          success:function(e) {
            if(e.confirm) {
              wx.showLoading({
                title: '删除中...',
              })
              wx.request({    //请求删除
                url: 'https://www.yanyufanchen.com/api/wxapi/delGrow',
                data: {
                  id: caozuoid,
                  table: _this.data.currentTab == 0 ? 'score' : 'grow',
                },
                success:function(res) {
                  wx.hideLoading();
                  if(res.data == 'succ') {
                    wx.showToast({
                      title: '删除成功',
                    });
                    setTimeout(function(){
                      _this.onLoad();
                    },1500);
                    
                  }
                  if (res.data == 'fail') {
                    wx.showToast({
                      title: '删除失败',
                    });
                  }
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
                    })
                  }
                }
              })
            }
          }
        })
    }

    if (checktype == 'update') {  //修改
      if(this.data.currentTab == 0) {
        wx.navigateTo({
          url: '../score_add/score_add?uid=' + _this.data.uid + '&id=' + caozuoid + '&addup=0',
        })
      }else{
        wx.navigateTo({
          url: '../student_oper/student_oper?upid=' + caozuoid,
        })
      }
      
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options) {
      this.setData({
        username: options.username,
        uid: options.id,
      });
    }
   
    var _this = this;
    wx.showLoading({
      title: '获取中...',
      mask:true,
    });
    
    setTimeout(function() {
      wx.request({    //首先请求当前Bar数据
        url: 'https://www.yanyufanchen.com/api/wxapi/getGrow',
        data: {
          uid: _this.data.uid,
          typeid: _this.data.currentTab,
          page: _this.data.page,
          sname: searchVal ? searchVal : '',
        },
        success: function (res) {
          wx.hideLoading();
          var barname = 'List' + _this.data.currentTab;
          var height = _this.swiperHeight(_this.data.currentTab, res.data.arr.length);
          console.log(height);
          if (res.data.msg == 'not') {
            _this.setData({
              [barname]: '',
              winHeight: height,
            })
            wx.showModal({
              title: '提示',
              content: '没有这方面的信息，换个别的看看吧。',
              showCancel: false,
            });
          } else {
            _this.setData({
              [barname]: res.data.arr,
              winHeight: height,
              pages: res.data.pages,
            })
          }
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
    },100);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
   searchVal = '';
   console.log('search：'+searchVal);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad();
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




  //点击搜索文本框显示并获取焦点
  search: function (e) {
    var search_status = 'search_status'+this.data.currentTab;
    var input_focus = 'input_focus' + this.data.currentTab;
    this.setData({
      [search_status]: false,
      [input_focus]: true
    })
  },
  //文本框失去焦点隐藏
  blurInputHidden: function (e) {
    let search_status = 'search_status' + this.data.currentTab;
    this.setData({
      [search_status]: 'true'
    })
  },
  //搜索事件
  search_name: function (e) {
    var _this = this;
    searchVal = e.detail.value;

    var uid = this.data.uid;

      // console.log(e.detail.value)
      wx.showLoading({
        title: '搜索中...',
        mask:true,
      })
      wx.request({
        url: 'https://www.yanyufanchen.com/api/wxapi/getGrow',
        data: {
          uid: uid,
          sname: searchVal,
          typeid: _this.data.currentTab,
        },
        success: function (res) {
          // console.log(res.data);
          if (res.data.arr == '') {
            wx.hideLoading();
            wx.showToast({
              title: '没有查到信息',
              image: '../../sources/images/error.png',
              duration: 1500,
            });
            searchVal = '';
          } else {
            var List = 'List' + _this.data.currentTab;
            _this.setData({
              [List]: res.data.arr,
              page:res.data.page ? res.data.page : _this.data.page,
              pages: res.data.pages ? res.data.pages : _this.data.page,
            })
            wx.hideLoading();
          }

        }
      })
    
  },
  //上一页
  previous: function (e) {
    var p = --this.data.page;
    this.score_list(p)
  },
  //下一页
  next: function (e) {
    var p = ++this.data.page;
    this.score_list(p)
  },
  //加载成绩列表
  score_list: function (e) {
    if (e == undefined) {
      var page = 1;
    } else {
      var page = e;
      if (page < 1) {
        this.setData({
          page: 1
        })
        wx.showToast({
          title: '已经是第一页了',
          image: '../../sources/images/error.png',
        });
        return;
      }
      if (page > this.data.pages) {
        var i = this.data.pages;
        this.setData({
          page: i
        })
        wx.showToast({
          title: '已经是最后一页了',
          image: '../../sources/images/error.png',
        });
        return;
      }
    }
    wx.showLoading({
      title: '获取中...',
    })
    var _this = this;
    wx.request({
      url: 'https://www.yanyufanchen.com/api/wxapi/getGrow',
      data: {
        uid: _this.data.uid,
        page: page,
        typeid: _this.data.currentTab,
      },
      success: function (res) {
        console.log(res.data);
        _this.setData({
          List0: res.data.arr,
          pages: res.data.pages,
          page: res.data.page,
          winHeight: _this.swiperHeight(_this.data.currentTab, res.data.arr.length),
        })
        wx.hideLoading();
      }
    })
  },
  //成绩添加
  addScore: function (e) {
    var uid = this.data.uid;
    wx.navigateTo({
      url: '../score_add/score_add?uid=' + uid + '&id=0' + '&addup=1',
    })
  },
  //修改成绩
  // upScore: function (e) {
  //   //e 里面接收点击修改时传过来的id
  //   var id = caozuoid;
  //   var uid = this.data.uid;
    
  // },




})