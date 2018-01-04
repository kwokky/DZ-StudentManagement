// pages/dz_5/dz_5.js
var QQMapWX = require("../../lib/qqmap-wx-jssdk.js");
var qqmapsdk = new QQMapWX({
  key: 'LM5BZ-O4YWV-JC6P3-U66TW-ZKL63-WWBYU'
});
import weCropper from '../../dist/weCropper'

const device = wx.getSystemInfoSync() // 获取设备信息
const width = device.windowWidth // 示例为一个与屏幕等宽的正方形裁剪框
const height = width
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    dormArray: [],
    dormIndex: [],
    nationArray:[],
    rili:['农历','阳历'],
    riliindex:'',
    nationIndex:'',
    classArray: [],
    classIndex: '',
    nationstr:'',
    my:'',//是否是本人
    bed:false,
    distflag:false,
    cropperOpt: {
      id: 'cropper',
      width: device.windowWidth,  // 画布宽度
      height: device.windowHeight, // 画布高度
      bottomheight :50,  //底部文字高度
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.showLoading({
      title: '获取中...',
      mask: true,
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
     if (options.id){
       var datas = {
         role: 'student',
         access: 'myinfo',
          id:options.id,
       }
     }else{
       var datas = {
         role: 'student',
         access : 'myinfo',
         openid: getApp().globalData.openId,
       }
     }
     wx.request({
       url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/getuserinfo',
       data:datas,
       success:function(res){
         console.log(res);
         var dormarr = [];
         var dormindex = [];
         var nationarr = [];
         var nationindex;
         var classarr = [[],[]];
         var classindex;
         var strnation = '';
         var myflag = true;    //是否是本人
         dormarr[0] = [];
         dormarr[1] = [];
         for (var i = 0; i < res.data.allnation.length; i++) {    //单列选择器（民族选择）
           nationarr.push(res.data.allnation[i]['mzname'] );
           if (res.data.allnation[i]['mzname'] == res.data.nation){
             nationindex=i;
           }
         }
         nationindex ? nationindex : nationindex=0; 
         for (var i = 0; i < res.data.allclass.length; i++) {    //单列选择器（班级选择）
           classarr[0].push(res.data.allclass[i]['classname']);
           classarr[1].push(res.data.allclass[i]['id']);
           if (res.data.allclass[i]['id'] == res.data.iclass) {
             console.log('fff'+i);
             classindex = i;
           }
         }
        // classindex ? classindex : classindex = null; 


         for (var i = 0; i < res.data.alldorm.length ; i++){    //多列选择器（宿舍选择）
           if (!in_array(dormarr[0], res.data.alldorm[i]['block'] + '号楼')){
              dormarr[0].push(res.data.alldorm[i]['block'] + '号楼');
            }
            if (!in_array(dormarr[1], res.data.alldorm[i]['dorm'] + '宿舍')) {
              dormarr[1].push(res.data.alldorm[i]['dorm'] + '宿舍');
            }
          }

        for (var i = 0; i < res.data.alldorm.length; i++){    //选中默认
           if (res.data.dorm_id == res.data.alldorm[i]['id']){ 
             for (var j=0;j < dormarr[0].length; j++){    //相同的加入数组
               if (res.data.alldorm[i]['block'] == dormarr[0][j].substr(0, dormarr[0][j].length - 2)) {
                   dormindex.push(j);
                   strnation += dormarr[0][j].substr(0, dormarr[0][j].length - 2);
                   
               }
             }
             for (var j = 0; j < dormarr[1].length; j++) {  //相同的加入数组
               if (res.data.alldorm[i]['dorm'] == dormarr[1][j].substr(0, dormarr[1][j].length - 2)) {
                 dormindex.push(j);
                 strnation += '-' + dormarr[1][j].substr(0, dormarr[1][j].length - 2);
               }
             }
           }
         }

         if(res.data.openid != getApp().globalData.openId){
            myflag = false;
         }
         console.log(classarr);
          _this.setData({
            user:res.data,
            dormArray:dormarr,
            dormIndex:dormindex,
            nationArray: nationarr,
            nationIndex: nationindex,
            classArray: classarr,
            classIndex: classindex,
            nationstr: strnation,
            riliindex:res.data.rili=='农历' ? 0 : 1 ,
            my:myflag,
          })
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


  //拨打电话
  phoneCall: function (e) {
    if (!this.data.user.status && this.data.my) {
      return;
    }
    console.log(this.data.phone);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },



  bindMultiPickerColumnChange:function(e){
   // console.log(e);
  },


  //选择宿舍
  binddormChange:function(e){
    console.log(e);
    this.setData({
      dormIndex: e.detail.value,
      nationstr: this.data.dormArray[0][e.detail.value[0]].substr(0, this.data.dormArray[0][e.detail.value[0]].length - 2) + '-' + this.data.dormArray[1][e.detail.value[1]].substr(0, this.data.dormArray[1][e.detail.value[1]].length - 2),
    })
  },
  //选择性别
  sexChange:function(e){

  },
  //选择民族
  bindnationChange:function(e){
    this.setData({
      nationIndex: e.detail.value
    })
  },
  //选择班级
  bindclassChange: function (e) {
    this.setData({
      classIndex: e.detail.value
    })
  },
  //选择出生日期
  bindBirthdayChange:function(e){
    var up = 'user.birthday';
    this.setData({
      [up]: e.detail.value,
    })
  },
  //选择出生日历
  bindriliChange:function(e) {
    var up = 'user.rili';
    this.setData({
      riliindex: e.detail.value,
    })
  },
  //表单提交
  formSubmit:function(d){
    console.log(d);
    if (!d.detail.value.username) {
      wx.showToast({
        title: '请输入姓名',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!d.detail.value.sex) {
      wx.showToast({
        title: '请选择性别',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!d.detail.value.dorm_id || d.detail.value.dorm_id == '-') {
      wx.showToast({
        title: '请输入宿舍号',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }
    
    if (!d.detail.value.iclass) {
      wx.showToast({
        title: '请选择班级',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!d.detail.value.major) {
      wx.showToast({
        title: '请输入专业',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }

    if (!d.detail.value.birthday) {
      wx.showToast({
        title: '请选择出生日期',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!d.detail.value.famname) {
      wx.showToast({
        title: '请输入家长姓名',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!d.detail.value.stutel) {
      wx.showToast({
        title: '请输入手机号',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!d.detail.value.idcate) {
      wx.showToast({
        title: '请输入身份证号',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }
    if (!d.detail.value.adress) {
      wx.showToast({
        title: '请输入户籍地',
        mask: false,
        image: '../../sources/images/error.png',
      });
      return;
    }

    //判断宿舍号输入是否合法
    var dormarr = d.detail.value.dorm_id.split('-');
    if (dormarr.length != 3 || dormarr[0].length != 1 || dormarr[1].length != 3 || dormarr[2].length != 1) {
        wx.showToast({
          title: '宿舍号不合法',
          image:'../../sources/images/error.png',
        });
        return;
    }
    wx.showLoading({
      title: '修改中...',
      mask:true,
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/upuserinfo',
      data:{
        openid:getApp().globalData.openId,
        datas:d.detail.value,
        role:'student',
      },
      success:function(res){
        wx.hideLoading();
        switch(res.data.code) {
          case 1:
            wx.showToast({
              title: '提交成功',
              mask:true,
            });
            setTimeout(function(){
              wx.reLaunch({
                url: '../dz_14/dz_14',
              });
            },1500);
            
            break;
          case 0:
            wx.showModal({
              title: '提示',
              content: '错误 请稍后重试',
            })
            break;
        }
      },
      fail:function(err){
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          content: '网络不畅通哦',
        })
        console.log(err);
      }
    })
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
  checkphoto:function(){
    var _this = this;
    if (this.data.user.status == 1 || this.data.my == false) {
      return;
    }
   wx.chooseImage({
     count: 1,
     sizeType: [ 'compressed'],
     success: function(res) {
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
  upphoto:function() {
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
            role: 'student',
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
              showCancel: true,
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
  clearphoto:function(){
    this.setData({
      distflag: false,
    })
  },


  /*显示宿舍图*/
  showbed:function(){
    this.setData({
      bed:!this.data.bed,
    })
  },


  /*打开地图*/
  chooseLocation:function(){
    if (this.data.user.status == 1 || this.data.my == false ) {
      return;
    }
    var _this = this;
    wx.chooseLocation({
      success: function(res) {
        var up = 'user.adress';
        _this.setData({
          [up]:res.address,
        })
        console.log(res);
      },
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

function in_array(arr,str) {
  var len = arr.length;
   //return len;
    while(len--){
      if(arr[len]==str){
        return true;
      }
    }
    return false;
}