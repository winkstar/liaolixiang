// pages/my/comment.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    content: [],
    userPic:''
  },
  checkIt:function(e){
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
    var userPic = wx.getStorageSync('userimg')
    that.setData({
      ip: ip,
      userPic: userPic
    });
    app.getData('/wx/comment/userComment', {}, function(res) {
      console.log(res.data)
      var tempList = [];
      res.data.forEach(item => {
        var tempObj = {
          name: item.userName,
          time: utils.timestampToTime(item.createTime),
          goodsTitle: item.productName,
          con: item.content,
          imgs:JSON.parse(item.imgs),
          productId: item.productId
        }
        tempList.push(tempObj)
      })
      that.setData({
        content: tempList
      })
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