warning: LF will be replaced by CRLF in app.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in app.json.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/admin_checkhome/admin_checkhome.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/admin_chuqinlist/admin_chuqinlist.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/admin_classbackhome/admin_classbackhome.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/admin_weekhome/admin_weekhome.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/dz_10/dz_10.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/dz_10/dz_10.wxml.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/dz_16/dz_16.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/dz_16/dz_16.wxml.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/dz_17/dz_17.js.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in pages/dz_17/dz_17.wxml.
The file will have its original line endings in your working directory.
[1mdiff --git a/app.js b/app.js[m
[1mindex 292ebaf..4ed3d65 100644[m
[1m--- a/app.js[m
[1m+++ b/app.js[m
[36m@@ -35,8 +35,8 @@[m [mApp({[m
   },[m
   globalData: {[m
     userInfo: null,   //用户信息[m
[31m-    openId:'ooc0D0RLdxWCTqkEDus326y_bXAI',   //用户openid[m
[31m-    role:'student', //用户角色[m
[32m+[m[32m    openId:'',   //用户openid[m
[32m+[m[32m    role:'', //用户角色[m
     roleurl:'',   //用户跳转角色页面(老师&学生)[m
     teaphonse:'',   //忘了[m
     userstatus:false,  //忘了[m
[1mdiff --git a/app.json b/app.json[m
[1mindex 578f7aa..4a7bbb9 100644[m
[1m--- a/app.json[m
[1m+++ b/app.json[m
[36m@@ -1,29 +1,25 @@[m
 {[m
   "pages": [[m
[31m-    "pages/dz_17/dz_17",[m
     "pages/dz_1/dz_1",[m
     "pages/dz_2/dz_2",[m
[31m-    [m
     "pages/admin_menu/admin_menu",[m
[31m-    [m
[31m-    [m
[32m+[m[32m    "pages/dz_14/dz_14",[m
[32m+[m[32m    "pages/dz_10/dz_10",[m
[32m+[m[32m    "pages/dz_17/dz_17",[m
     "pages/student_grow/student_grow",[m
     "pages/score_add/score_add",[m
[31m-    [m
     "pages/student_oper/student_oper",[m
     "pages/dz_4/dz_4",[m
[31m-   [m
[31m-    [m
     "pages/admin_chuqinlist/admin_chuqinlist",[m
     "pages/admin_chuqininfo/admin_chuqininfo",[m
     "pages/dz_24/dz_24",[m
     "pages/dz_25/dz_25",[m
     "pages/dz_18/dz_18",[m
     "pages/dz_20/dz_20",[m
[31m-    "pages/dz_10/dz_10",[m
[32m+[m[41m    [m
     "pages/dz_5/dz_5",[m
     "pages/dz_3/dz_3",[m
[31m-    "pages/dz_14/dz_14",[m
[32m+[m[41m    [m
     "pages/dz_15/dz_15",[m
     "pages/dz_11/dz_11",[m
     "pages/dz_12/dz_12",[m
[1mdiff --git a/pages/admin_checkhome/admin_checkhome.js b/pages/admin_checkhome/admin_checkhome.js[m
[1mindex 6adf153..8a3fc89 100644[m
[1m--- a/pages/admin_checkhome/admin_checkhome.js[m
[1m+++ b/pages/admin_checkhome/admin_checkhome.js[m
[36m@@ -132,8 +132,10 @@[m [mPage({[m
    * 生命周期函数--监听页面加载[m
    */[m
   onLoad: function (options) {[m
[32m+[m[32m    //获取日期是本年的第几天[m
[32m+[m[32m    var weekofyear = (((new Date()) - (new Date("2017-01-01"))) / (24 * 60 * 60 * 7 * 1000) | 0) + 1;[m
     this.setData({[m
[31m-      week: options.week[m
[32m+[m[32m      week: options.week ? options.week : weekofyear,[m
     });[m
     this.page();[m
     [m
[1mdiff --git a/pages/admin_chuqinlist/admin_chuqinlist.js b/pages/admin_chuqinlist/admin_chuqinlist.js[m
[1mindex 8da2375..f52c791 100644[m
[1m--- a/pages/admin_chuqinlist/admin_chuqinlist.js[m
[1m+++ b/pages/admin_chuqinlist/admin_chuqinlist.js[m
[36m@@ -107,8 +107,10 @@[m [mPage({[m
    * 生命周期函数--监听页面加载[m
    */[m
   onLoad: function (options) {[m
[32m+[m[32m    //获取日期是本年的第几周[m
[32m+[m[32m    var weekofyear = (((new Date()) - (new Date("2017-01-01"))) / (24 * 60 * 60 * 7 * 1000) | 0) + 1;[m
     this.setData({[m
[31m-      week: options.week[m
[32m+[m[32m      week: options.week ? options.week : weekofyear,[m
     });[m
     this.page();[m
     [m
[1mdiff --git a/pages/admin_classbackhome/admin_classbackhome.js b/pages/admin_classbackhome/admin_classbackhome.js[m
[1mindex 71ced28..9285328 100644[m
[1m--- a/pages/admin_classbackhome/admin_classbackhome.js[m
[1m+++ b/pages/admin_classbackhome/admin_classbackhome.js[m
[36m@@ -194,7 +194,7 @@[m [mPage({[m
       data: {[m
         classes:_this.data.class,[m
         content: searchtxt,[m
[31m-[m
[32m+[m[32m        week:_this.data.week,[m
       },[m
       success: function (res) {[m
         wx.hideLoading();[m
[1mdiff --git a/pages/admin_weekhome/admin_weekhome.js b/pages/admin_weekhome/admin_weekhome.js[m
[1mindex 2f5186e..b53ed61 100644[m
[1m--- a/pages/admin_weekhome/admin_weekhome.js[m
[1m+++ b/pages/admin_weekhome/admin_weekhome.js[m
[36m@@ -14,7 +14,7 @@[m [mPage({[m
     var classe = e.currentTarget.dataset.class;[m
     var week = e.currentTarget.dataset.week;[m
     wx.navigateTo({[m
[31m-      url: '../dz_10/dz_10?class=' + classe + '&week=' + week,[m
[32m+[m[32m      url: `../dz_10/dz_10?class=${classe}&week=${week}&find=all`,[m
     })[m
   },[m
   [m
[36m@@ -87,13 +87,16 @@[m [mPage({[m
     return height;[m
   },[m
 [m
[32m+[m
   /**[m
    * 生命周期函数--监听页面加载[m
    */[m
   onLoad: function (options) {[m
[31m-    this.setData({[m
[31m-      week: options.week[m
[31m-    });[m
[32m+[m[32m    //获取日期是本年的第几天[m
[32m+[m[32m    var weekofyear = (((new Date()) - (new Date("2017-01-01"))) / (24 * 60 * 60 * 7 * 1000) | 0) + 1;[m
[32m+[m[32m      this.setData({[m
[32m+[m[32m        week: options.week ? options.week : weekofyear,[m
[32m+[m[32m      });[m
     this.page0();[m
    [m
   },[m
[36m@@ -252,7 +255,7 @@[m [mPage({[m
     wx.showLoading({[m
       title: '搜索中...',[m
       mask: true,[m
[31m-    })[m
[32m+[m[32m    });[m
     wx.request({[m
       url: 'https://www.yanyufanchen.com/api/wxapi/weekLeaveCount',[m
       data: {[m
[1mdiff --git a/pages/dz_10/dz_10.js b/pages/dz_10/dz_10.js[m
[1mindex 5eb13f4..aa36cf5 100644[m
[1m--- a/pages/dz_10/dz_10.js[m
[1m+++ b/pages/dz_10/dz_10.js[m
[36m@@ -16,6 +16,11 @@[m [mPage({[m
    */[m
   onLoad: function (options) {[m
     console.log(options);[m
[32m+[m[32m    if(options.find == 'all') {[m
[32m+[m[32m      this.setData({[m
[32m+[m[32m        find:'all',[m
[32m+[m[32m      })[m
[32m+[m[32m    }[m
     wx.showLoading({[m
       title: '获取中...',[m
       mask:true,[m
[36m@@ -58,12 +63,12 @@[m [mPage({[m
             num['check']++;[m
           }[m
         }[m
[31m-        console.log(num);[m
         _this.setData({[m
           staySchoolList:sex,[m
           checknum:num,[m
           flag:true,[m
[31m-        })[m
[32m+[m[32m        });[m
[32m+[m[32m        console.log(_this.data.staySchoolList);[m
       },[m
       fail:function(err){[m
         wx.hideLoading();[m
[36m@@ -85,6 +90,36 @@[m [mPage({[m
     })[m
   },[m
 [m
[32m+[m[32m  bindTouchStart: function (e) {[m
[32m+[m[32m    this.startTime = e.timeStamp;[m
[32m+[m[32m  },[m
[32m+[m
[32m+[m[32m  bindTouchEnd: function (e) {[m
[32m+[m[32m    this.endTime = e.timeStamp;[m
[32m+[m[32m  },[m
[32m+[m
[32m+[m[32m  /*长按学生姓名*/[m
[32m+[m[32m  changeLongSchoolStatus:function(e) {[m
[32m+[m[32m    if(this.data.find == 'all') {[m
[32m+[m[32m      return;[m
[32m+[m[32m    }[m
[32m+[m[32m    console.log(e);[m
[32m+[m[32m    wx.navigateTo({[m
[32m+[m[32m      url: '../dz_16/dz_16?id=' + e.currentTarget.dataset.id,[m
[32m+[m[32m    });[m
[32m+[m[32m  },[m
[32m+[m
[32m+[m[32m  /*点击学生姓名*/[m
[32m+[m[32m  changeSchoolStatus: function (e) {[m
[32m+[m[32m    console.log(e);[m
[32m+[m[32m    if (this.endTime - this.startTime < 350) {[m
[32m+[m[32m      wx.navigateTo({[m
[32m+[m[32m        url: e.currentTarget.dataset.url,[m
[32m+[m[32m      });[m
[32m+[m[32m    }[m
[32m+[m[41m   [m
[32m+[m[32m  },[m
[32m+[m
   /**[m
    * 生命周期函数--监听页面初次渲染完成[m
    */[m
[36m@@ -96,7 +131,7 @@[m [mPage({[m
    * 生命周期函数--监听页面显示[m
    */[m
   onShow: function () {[m
[31m-  [m
[32m+[m[32m   // this.onLoad('3434');[m
   },[m
 [m
   /**[m
[1mdiff --git a/pages/dz_10/dz_10.wxml b/pages/dz_10/dz_10.wxml[m
[1mindex aab35b4..14c950a 100644[m
[1m--- a/pages/dz_10/dz_10.wxml[m
[1m+++ b/pages/dz_10/dz_10.wxml[m
[36m@@ -11,12 +11,20 @@[m
   <view style='font-size: 30rpx;'>总计: {{checknum.check + checknum.notcheck ? checknum.check + checknum.notcheck : ''}}人</view>[m
 </view>[m
 [m
[32m+[m[32m<view style='width:90%;margin:30rpx auto 0;font-size:27rpx;' wx:if="{{(staySchoolList.boy.length || staySchoolList.girl.length) && (find!='all')}}"><label style='color:red'>注：</label>长按学生姓名可以改变学生离校状态</view>[m
 <view class="container"  wx:if="{{flag == true}}">[m
[31m-[m
[32m+[m[41m  [m
   <view class="student-wrap">[m
   <view style='width:91%;margin:0 auto 15px'wx:if="{{staySchoolList.boy.length}}">男：</view>[m
     <block wx:for="{{staySchoolList.boy}}" wx:key="unique">[m
[31m-       <navigator url="{{item.checkshool  ? '../dz_23/dz_23?id='+item.id : '../dz_5/dz_5?id='+item.id}}" class="{{item.checkshool ? 'a':'b'}}">{{item.username}}</navigator> [m
[32m+[m[32m       <view[m[41m [m
[32m+[m[32m       bindlongtap='changeLongSchoolStatus'[m
[32m+[m[32m       bindtap='changeSchoolStatus'[m[41m [m
[32m+[m[32m       bindtouchstart="bindTouchStart"[m[41m [m
[32m+[m[32m       bindtouchend="bindTouchEnd"[m
[32m+[m[32m       data-id="{{item.id}}"[m[41m [m
[32m+[m[32m       data-url="{{item.checkshool  ? '../dz_23/dz_23?id='+item.id : '../dz_5/dz_5?id='+item.id}}"[m[41m [m
[32m+[m[32m       class="{{item.checkshool ? 'a':'b'}}">{{item.username}}</view>[m[41m [m
     </block>[m
     <view style='width:91%;margin:0 auto 15px;clear:both' wx:if="{{staySchoolList.girl.length}}">女：</view>[m
     <block wx:for="{{staySchoolList.girl}}" wx:key="unique">[m
[1mdiff --git a/pages/dz_10/dz_10.wxss b/pages/dz_10/dz_10.wxss[m
[1mindex 15cf046..2cbfadb 100644[m
[1m--- a/pages/dz_10/dz_10.wxss[m
[1m+++ b/pages/dz_10/dz_10.wxss[m
[36m@@ -1,7 +1,7 @@[m
 /* pages/dz_10/dz_10.wxss */[m
 .container {[m
   padding:0;[m
[31m-  padding-top:10px;[m
[32m+[m[32m  padding-top:0;[m
 }[m
 [m
 /*学生信息*/[m
[36m@@ -11,16 +11,6 @@[m
   padding-top: 3%;[m
 [m
 }[m
[31m-.student-wrap navigator {[m
[31m-  border-radius: 4%;[m
[31m-  width:28%;[m
[31m-  height:33px;[m
[31m-  float: left;[m
[31m-  line-height: 33px;[m
[31m-  text-align: center;[m
[31m-  margin-left: 4%;[m
[31m-  margin-bottom: 5%;[m
[31m-}[m
 .che-wrap{[m
   justify-content: center;[m
   align-items: center;[m
[36m@@ -47,10 +37,26 @@[m
   margin:8rpx;[m
 }[m
 .a{[m
[32m+[m[32m  border-radius: 4%;[m
[32m+[m[32m  width:28%;[m
[32m+[m[32m  height:33px;[m
[32m+[m[32m  float: left;[m
[32m+[m[32m  line-height: 33px;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  margin-left: 4%;[m
[32m+[m[32m  margin-bottom: 5%;[m
   border:1px solid green;[m
   color: green;[m
 }[m
 .b{[m
[32m+[m[32m  border-radius: 4%;[m
[32m+[m[32m  width:28%;[m
[32m+[m[32m  height:33px;[m
[32m+[m[32m  float: left;[m
[32m+[m[32m  line-height: 33px;[m
[32m+[m[32m  text-align: center;[m
[32m+[m[32m  margin-left: 4%;[m
[32m+[m[32m  margin-bottom: 5%;[m
  border:1px solid red;[m
  color: red;[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/pages/dz_16/dz_16.js b/pages/dz_16/dz_16.js[m
[1mindex f36b788..239ba8f 100644[m
[1m--- a/pages/dz_16/dz_16.js[m
[1m+++ b/pages/dz_16/dz_16.js[m
[36m@@ -8,25 +8,39 @@[m [mPage({[m
     typearray: ['公交', '自行离校','客车'],[m
     timearray: ['周五', '周六'],[m
     typeindex: 0,[m
[31m-    timeindex:0,[m
[32m+[m[32m    timeindex:0,[m[41m [m
     subbtn:true,[m
     revbtn:true,[m
[32m+[m[32m    uid:'',[m
   },[m
 [m
   /**[m
    * 生命周期函数--监听页面加载[m
    */[m
   onLoad: function (options) {[m
[32m+[m[32m    if(options.id) {[m
[32m+[m[32m      this.setData({[m
[32m+[m[32m        uid:options.id,[m
[32m+[m[32m        role:'teacher',[m
[32m+[m[32m      });[m
[32m+[m[32m      var datas = {[m
[32m+[m[32m        id: this.data.uid,[m
[32m+[m[32m        role:'teacher',[m
[32m+[m[32m      }[m
[32m+[m[32m    } else {[m
[32m+[m[32m      var datas = {[m
[32m+[m[32m        openid: getApp().globalData.openId,[m
[32m+[m[32m        role:'student',[m
[32m+[m[32m      }[m
[32m+[m[32m    }[m
     wx.showLoading({[m
       title: '获取中...',[m
       mask: true,[m
[31m-    })[m
[32m+[m[32m    });[m
     var _this = this;[m
     wx.request({      //按钮是否启用接口[