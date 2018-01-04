// pages/dz_3/dz_3.js
const app = getApp();
import weCropper from '../../dist/weCropper'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = width

var classs = 0;
Page({
  //日期选择
  bindDateChange: function (e) {
    var up = 'user.birthday';
    this.setData({
      [up]: e.detail.value,
    })
  },
  //职位选择
  bindPositionChange: function (e) {
    //console.log(this.data.position);
    this.setData({
      positionkey: e.detail.value
    })
  },
  //班级选择
  bindClassesChange: function (e) {
    var clas = e.detail.value;
    for(var i=0 ; i<8 ; i++){
      if (this.data.classeskey[i] == e.detail.value){
        wx.showToast({
          title: '班级已存在',
          image:'../../sources/images/error.png',
        })
        return;
      }
    }
    var up = 'classeskey.' + e.currentTarget.dataset.index;
    this.setData({
      [up]: e.detail.value
    });
    if (this.data.classes[0][this.data.classeskey[e.currentTarget.dataset.index]] == '全部') {
      classs = 1;
      this.setData({
        classnum: [0],
        classeskey:[0],
      });
    }

  },
  /**
   * 页面的初始数据
   */
  data: {   
    user:[],
    //班级 下拉列表
    classes: [],
    classes0: ['ff','sd'],
    //班级 默认选中
    classeskey: [],
    date:'',
    //职位 下拉列表
    position: ['校长', '主任', '辅导员', '班主任'],
    //职位 默认选中
    positionkey: 0,
    //自动获取焦点 关
    focus:false,
    classnum: [],
    cla:'classes',
    distflag: false,
    cropperOpt: {
      id: 'cropper',
      width: device.windowWidth,  // 画布宽度
      height: device.windowHeight, // 画布高度
      bottomheight: 50,  //底部文字高度
      scale: 2.5, // 最大缩放倍数
      zoom: 10, // 缩放系数
      cut: {
        x: (width - 300) / 2, // 裁剪框x轴起点
        y: (width - 300) / 2, // 裁剪框y轴期起点
        width: 300, // 裁剪框宽度
        height: 300 // 裁剪框高度
      }
    }
  },

  /*添加班级*/
  addclass:function(){
    console.log(this.data.classes);
    if (this.data.classes[0][this.data.classeskey[0]] == '全部') {
      return;
    }
    if(classs >= 7){
      wx.showToast({
        title: '最多添加7个班',
        image:'../../sources/images/error.png',
      });
      return;
    }
    this.data.classnum.push(classs);
    this.setData({
      classnum: this.data.classnum,
    });
    classs++;
  },

  /*删除班级*/
  delclass: function (e) {
    console.log(e.currentTarget.dataset.index);
   // return;
    this.data.classnum.pop();
    delete this.data.classeskey[e.currentTarget.dataset.index];
    this.data.classeskey[e.currentTarget.dataset.index + 1] =       this.data.classeskey[e.currentTarget.dataset.index];
    this.setData({
      classnum: this.data.classnum,
      classeskey: this.data.classeskey,
    });
    classs--;
    console.log(e.currentTarget.dataset.index);
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classs = 0;
    var _this = this;
    wx.showLoading({
      title: '获取中...',
      mask:true,
    });
    /*实例化裁剪图片类*/
    const { cropperOpt } = this.data
    new weCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {

      })
      .on('imageLoad', (ctx) => {
      })
      /*实例化结束*/
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getuserinfo',
      data:{
        openid:getApp().globalData.openId,
        role:'teacher',
      },
      success: res => {
        wx.hideLoading();
        console.log(res);
        var classarr = [[],[]];
        var classindex = {};
        for (var i = 0; i < res.data.classarr.length; i++) {    //单列选择器（班级选择）
          classarr[0].push(res.data.classarr[i]['classname']);
          classarr[1].push(res.data.classarr[i]['id']);
        }

        var classnum = res.data.class.split(","); //字符分割 
        var a = [];
        for (i = 0; i < classnum.length; i++){
          if(classnum[0] == 1) {
            a.push(i);
            classs = 1;
            classindex[0] = 0;
            break;
          }
          for (var j = 0; j < classarr[1].length; j++) {
            if (classarr[1][j] == classnum[i]) {
              classindex[i]=j;
            }
          }
          classs++;
          a.push(i);
        }

        _this.setData({
           user:res.data,
           classes: classarr,
           classeskey: classindex,
           classnum:a,
        })
        console.log(_this.data.classeskey);
      },
      fail: err => {
        wx.hideLoading();
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

  //通过touchStart、touchMove、touchEnd方法来接收事件对象。
  touchStart(e) {
    this.wecropper.touchStart(e)
  },
  touchMove(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd(e) {
    this.wecropper.touchEnd(e)
  },


  /*选择裁切图片*/
  checkphoto: function () {
    var _this = this;
    if (this.data.user.status == 1 || this.data.my == false) {
      return;
    }
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        console.log(res);
        const src = res.tempFilePaths[0];
        _this.wecropper.pushOrign(src);
        _this.setData({
          distflag: true,
        })
      },
    })
  },

  /*上传图片*/
  upphoto: function () {
    var _this = this;
    this.setData({
      distflag: false,
    })
    this.wecropper.getCropperImage((src) => {
      console.log(src);
      if (src) {
        wx.showLoading({
          title: '上传中...',
          mask: true,
        })
        wx.uploadFile({
          url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/upphoto',
          filePath: src,
          name: 'userimg',
          formData: {
            openid: getApp().globalData.openId,
            role: 'teacher',
          },
          success: function (res) {
            var result = JSON.parse(res.data);
            console.log(result.path);
            if (result.code == 1) {
              wx.hideLoading();
              var up = 'user.photo';
              _this.setData({
                [up]: result.path,
              })
            }
          },
          fail: function (err) {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '上传图片失败',
              showCancel:true,
            })
            console.log(err);
          }
        })
      } else {
        console.log('获取图片失败，请稍后重试');
      }
    })
  },
  /*取消上传图片*/
  clearphoto: function () {
    this.setData({
      distflag: false,
    })
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

  /*表单提交*/
  formSubmit:function(e){
    var value = e.detail.value;
    var classstr = '';
    if (this.data.classes[0][this.data.classeskey[0]] == '全部'){   //如果是全部 字符串拼接所有班级
      delete value['class0']; //删除第一个班级
      for (var item in this.data.classes[1]) {
        classstr += this.data.classes[1][item] + ',';
      }
    }else{      //else
      for (var item in value) {
        if (item.indexOf('class') >= 0) {
          //console.log(value[item]);
          if (value[item] == null) {
            delete value[item];
            continue;
          }
          classstr += value[item] + ',';
          delete value[item];
        }
      }
    }
   
   classstr = classstr.substr(0, classstr.length-1);
   value['class'] = classstr;
   console.log(value);
   
   wx.showLoading({
     title: '提交中...',
     mask:true,
   })

    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/upuserinfo',
      data:{
        datas:value,
        openid: getApp().globalData.openId,
        role:'teacher',
      },
      success:function(res){
        wx.hideLoading();
        console.log(res);
        switch(res.data.code){
          case 1:
            wx.showToast({
              title: '修改成功',
              mask:true,
            });
            setTimeout(function(){
              wx.reLaunch({
                url: '../dz_2/dz_2',
              });
            },1500)
          break;
          case 0:
            wx.showModal({
              title: '提示',
              content: '修改失败，请稍后重试',
              showCancel: false,
            });
            break;
        }
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
          })
        }
      }
    })
  },
  formReset:function(){

  }
})