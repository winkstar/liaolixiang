// pages/welcome/welcome.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId: ''
  },
  getUser: function(e) {
    var that = this;
    wx.showLoading({
      title: '正在加载首页',
    })
    //判断是否点击授权
    wx.getUserInfo({
      success: function(res2) {
        wx.login({
          success: function(res1) {
            console.log(res2)
            var params = res2.userInfo;
            params.code = res1.code;
            params.encryptedData = res2.encryptedData;
            params.iv = res2.iv;
            params.signature = res2.signature;
            wx.setStorageSync('userimg', params.avatarUrl);
            wx.setStorageSync('userName', params.nickName);
            wx.request({
              url: app.globalData.ip + '/wx/user/login',
              data: params,
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function(res3) {
                if (res3.data.res) {
                  wx.setStorageSync('token', res3.data.msg);
                  wx.setStorageSync('isNew', res3.data.info.newUser);
                  wx.switchTab({
                    url: '../index/index',
                  })
                } else {
                  wx.showToast({
                    title: 'loginMSG:' + res3.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            })
          },
          fail: function(res) {
            wx.showToast({
              title: '你还没有授权登录，即将跳转',
              icon: 'none',
              duration: 1000,
              success: function() {
                setTimeout(function() {
                  wx.redirectTo({
                    url: '../welcome/welcome',
                  })
                }, 1000)
              }
            })
          }
        })




      },
      fail: function(res) {
        wx.hideLoading();
        wx.showToast({
          title: '为了更好的体验，请授权使用！',
          icon: 'none',
          duration: 1500
        })
      }

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var id = options.id;
    var key = options.key;
    var name = options.name;
    if (id) {
      wx.setStorageSync('id', id)
    } else {
      wx.removeStorageSync('id')
    }
    if (key) {
      app.postData('/wx/activity/entryGroup', {
        code: key
      }, function(res) {
        console.log(res)
        if (res.data.res) {
          wx.showToast({
            title: '参加好友'+name+'团成功！',
            icon: 'none',
            duration: 1500
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1500
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})