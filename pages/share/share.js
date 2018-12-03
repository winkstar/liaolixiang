// pages/share/share.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoinfo: {},
    showMask: false
  },
  backtovideo: function() {
    wx.navigateBack({

    })
  },
  toPengyouquan: function() {
    this.setData({
      showMask: true
    })
  },
  save: function() {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() { //这里是用户同意授权后的回调
              that.savePic();
            },
            fail() { //这里是用户拒绝授权后的回调
            }
          })
        } else { //用户已经授权过了
          that.savePic();
        }
      }
    })
  },
  savePic: function() {
    var that = this;
    wx.getImageInfo({
      src: '../image/share.jpg',
      success: function(ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: function(res) {
            wx.showToast({
              title: '保存成功！',
              icon: 'success',
              duration: 2000,
              success: function() {
                setTimeout(function() {
                  that.setData({
                    showMask: false
                  })
                }, 2000)
              }
            })
          },
          fail: function(res) {
            wx.showToast({
              title: '保存失败！' + res.errMsg,
              icon: 'none',
              duration: 2000,
              success: function() {
                setTimeout(function() {
                  that.setData({
                    showMask: false
                  })
                }, 2000)
              }
            })
          }
        })
      }
    })

  },
  hideMask: function() {
    this.setData({
      showMask: false
    })
  },
  zhuanfa: function() {
    var that = this;
    var ip = app.globalData.ip;
    app.postData('/wx/userProduct/saveUserProduct', {
      productId: that.data.videoinfo.id,
      type: 3
    }, function(res) {
      if (res.data.res) {
        that.onShareAppMessage;
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  onShareAppMessage: function() {
    return {
      title: '料理享',
      path: '/pages/welcome/welcome?id=' + this.data.videoinfo.id,
      imageUrl: app.globalData.ip + this.data.videoinfo.img,
      success: function(shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function(res) {
        console.log(res + '失败');
        // 转发失败
      },
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    let data = JSON.parse(options.tempdata);
    console.log(data)
    that.setData({
      videoinfo: data
    });
    wx.showShareMenu({
      withShareTicket: true
    })
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

})