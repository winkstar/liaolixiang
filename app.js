//app.js
App({
  onLaunch: function() {
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    //登录

  },
  // get请求数据
  getData: function(url, params,success) {
    var token = wx.getStorageSync('token');
    params=params?params:{};
    wx.request({
      url: this.globalData.ip + url,
      method: 'GET',
      data: params,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': 'Bearer ' + token
      },
      success: success,
      fail: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500
        })
      }

    })
  },
  // post请求数据
  postData: function(url, params,success) {
    var token = wx.getStorageSync('token');
    wx.request({
      url: this.globalData.ip + url,
      method: 'POST',
      data: params,
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'Authorization': 'Bearer ' + token
      },
      success:success,
      fail: res => {
        wx.showToast({
          title: res.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  onShow(options){
    var that = this,
      // scenes是场景值它的类型是整形
      scenes = options.scene,
      // sid是参数,建议兼容ios和android的时候强转换为整形
      sid = Number(options.query.sid);
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否马上重启小程序？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
    })
  },
  globalData: {
    userInfo: null,
    ip: 'https://www.liaolixiang.com',
    // ip: 'http://120.79.174.227:8080',
    product:{

    },
    addressList: [
     
    ]
  }
})