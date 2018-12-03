var app = getApp()

Page({
  data: {
    map_width: 380,
    map_height: 380
  }
  //show current position
  ,
  onLoad: function(options) {
      console.log(options.schedule_id);
      var that = this;
      // 获取定位，并把位置标示出来
      that.setData({
        longitude: 113.324520,
        latitude: 23.099994,
        markers: [{
          id: 0
            // , iconPath: "../imgs/ic_position.png"
            ,
          longitude: 113.324520,
          latitude: 23.099994,
          width: 30,
          height: 30
        }]
      })
      //set the width and height
      // 动态设置map的宽和高
      wx.getSystemInfo({
        success: function(res) {
          console.log(res.windowWidth);
          that.setData({
            map_width: res.windowWidth,
            map_height: res.windowWidth,
            controls: [{
              id: 1,
              // iconPath: '../imgs/ic_location.png',
              position: {
                left: res.windowWidth / 2 - 8,
                top: res.windowWidth / 2 - 16,
                width: 30,
                height: 30
              },
              clickable: true
            }]
          })
        }
      })
    }
    //获取中间点的经纬度，并mark出来
    ,
  getLngLat: function() {
    var that = this;
    this.mapCtx = wx.createMapContext("map4select");
    this.mapCtx.getCenterLocation({
      success: function(res) {
        that.setData({
          longitude: 113.324520,
          latitude: 23.099994,
          markers: [{
            id: 0
              // , iconPath: "../imgs/ic_position.png"
              ,
            longitude: 113.324520,
            latitude: 23.099994,
            width: 30,
            height: 30
          }]
        })
      }
    })
  },
  regionchange(e) {
    // 地图发生变化的时候，获取中间点，也就是用户选择的位置
    if (e.type == 'end') {
      this.getLngLat()
    }
  },
  markertap(e) {
    console.log(e)
  }
})