Page({
  data: {
    markers: [{
      iconPath: "/sources/images/timg.png",
      id: 1,
      title:'我们的地址',
      latitude: 34.973260,
      longitude: 118.402970,
      width: 30,
      height:30,
      alpha:0.1,
      // callout:{    //标注点气泡样式
      //   content:'haha',
      //   color:'#f00',
      //   display:'ALWAYS',
      // },
      anchor:{
        x:10,
        y:1000,
      }
    }],
    polyline: [{    //路线
      points: [{
        latitude: 36.160410,
        longitude: 119.420390,
      }, {
          latitude: 34.973260,
          longitude: 118.402970,
      }],
      color: "#FF0000DD",  //线的颜色
      width: 2,   //线的宽度
      dottedLine: true,  //是否虚线
      arrowLine:true,   //带箭头的线
    }],
    circles:[{      //在
      latitude: 34.973260,
      longitude: 118.402970,
      fillColor:'#17A8E233',
      radius:1000,
    }],
    controls: [{
      id: 5,
      iconPath: "/sources/images/timg.png",
      clickable:true,
      position: {
        left: 10,
        top: 10,
        width: 30,
        height: 30,
      }
    }],
  },
  

  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})