const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 0,
    src: '../image/3-2.jpg',
    userName: '',
    shareMsg: '',
    showWindow: false,
    clickAble: false
  },
  // 我的订单
  order: function() {
    wx.navigateTo({
      url: 'order',
    })
  },
  // 我的收藏
  collect: function() {
    wx.navigateTo({
      url: 'collect',
    })
  },
  // 我的转发
  transmit: function() {
    wx.navigateTo({
      url: 'transmit',
    })
  },
  // 我的评论
  comment: function() {
    wx.navigateTo({
      url: 'comment',
    })
  },
  // 我的消息
  message: function() {
    wx.navigateTo({
      url: 'message',
    })
  },
  // 我的收货地址
  address: function() {
    wx.navigateTo({
      url: 'address',
    })
  },
  // 我的积分
  jifen: function() {
    wx.navigateTo({
      url: 'point',
    })
  },
  // 我的卡券
  kaquan: function() {
    wx.navigateTo({
      url: 'card',
    })
  },
  // // 分享邀团
  gift: function() {
    wx.navigateTo({
      url: 'myPinTuan'
    })
  },
  colseWindow: function() {
    this.setData({
      showWindow: false
    })
  },
  // pintuan: function() {
  //   var that = this;
  //   that.onShareAppMessage();
  // },
  onShareAppMessage: function() {
    // 创建团
    return {
      title: '料理享',
      path: '/pages/welcome/welcome?key=' + this.data.shareMsg + '&&name=' + wx.getStorageSync('userName'),
      imageUrl: '../image/share.jpg',
      success: function(shareTickets) {
        console.info(shareTickets);
        // 转发成功
        wx.showToast({
          title: '建团成功',
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
    wx.getSystemInfo({
      success: function(res) {
        console.info(res.windowHeight);
        that.setData({
          num: res.windowHeight + 'px'
        });
      }
    });
    var name = wx.getStorageSync('userName');
    var pic = wx.getStorageSync('userimg');
    that.setData({
      src: pic,
      userName: name
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
})