// pages/commentList/comment.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    ip: '',
    commentText: '',
    picList: []
  },
  inputText: function(e) {
    this.setData({
      commentText: e.detail.value
    })
  },
  cancel: function() {
    wx.navigateBack({

    })
  },
  addPic: function() {
    var that = this;
    var httpip = app.globalData.ip;
    var token = wx.getStorageSync('token');
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const tempFilePaths = res.tempFilePaths;
        var tempList = [];
        tempFilePaths.forEach(item => {
          wx.uploadFile({
            url: httpip + '/wx/r/iptImgUpload',
            filePath: item,
            name: 'imgFile',
            header: {
              'content-type': 'application/json', // 默认值
              'Authorization': 'Bearer ' + token
            },
            success(res) {
              const data = res.data;
              var url = JSON.parse(res.data);
              tempList.push(url.msg);
              that.setData({
                picList: tempList
              })
            }
          })
        })

      }
    })
  },
  report: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    var httpip = app.globalData.ip;
    if (that.data.commentText == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
    } else if (that.data.commentText != '' && that.data.picList.length == 0) {
      wx.showModal({
        title: '提示',
        content: '晒图评论可以获得积分哦，是否添加图片',
        cancelText: '直接发布',
        confirmText: '我要晒图',
        success: function(res) {
          if (res.confirm) {
            that.addPic();
          }
          if (res.cancel) {
            // 发布评论
            app.postData('/wx/comment/saveComment', {
              productId: that.data.id,
              content: that.data.commentText,
              // imgs: JSON.stringify(that.data.picList)
            }, function(res) {
              if (res.data.res) {
                wx.showToast({
                  title: '评论成功！',
                  icon:'success',
                  duration: 2000,
                  success: function(res) {
                    setTimeout(function() {
                      wx.switchTab({
                        url: '../my/my',
                      })
                    }, 2000)
                  }
                })
              }
            })
          }
        }
      })
    } else if (that.data.commentText != '' && that.data.picList.length > 0) {
      // 发布评论
      app.postData('/wx/comment/saveComment', {
        productId: that.data.id,
        content: that.data.commentText,
        imgs: JSON.stringify(that.data.picList)
      }, function(res) {
        if (res.data.res) {
          wx.showToast({
            title: '评论成功！',
            duration: 2000,
            success: function (res) {
              setTimeout(function () {
                wx.switchTab({
                  url: '../my/my',
                })
              }, 2000)
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var id = options.id;
    console.log(id);
    var httpip = app.globalData.ip;
    that.setData({
      ip: httpip,
      id: id
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})