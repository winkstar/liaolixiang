// pages/my/collect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip:'',
    inputValue: '',
    flag: true,
    content: []
  },
  // 搜索框输入内容
  bindKeyInput: function(e) {
    if (!e.detail.value == '') {
      this.setData({
        flag: false
      })
    } else {
      this.setData({
        flag: true
      })
    }
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 点击×按钮 清空输入框内容
  shanchu: function() {
    this.setData({
      inputValue: ''
    })
    this.setData({
      flag: true
    })
  },
  checkProduct:function(e){
    var id = e.currentTarget.dataset.id;
    wx.setStorageSync('id', id)
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var ip = app.globalData.ip;
    that.setData({
      ip: ip
    });
    app.getData('/wx/user/userDetailView', {}, function (res) {
      var list = [];
      res.data.shares.forEach(item => {
        var temp = {
          src: item.product.img,
          name: item.product.name,
          id: item.product.id
        }
        list.push(temp)
      })
      that.setData({
        content: list
      })
      // app.globalData.product = that.data.chooseProduct;
    });
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