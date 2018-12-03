// pages/my/card.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardList: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // 获取卡券信息
    app.getData('/wx/coupon/userCoupons', {}, function(res) {
      var list=[];
      res.data.forEach(item=>{
        var temp={
          price: item.title.split('元')[0],
          cond: item.minCost/100,
          time1: utils.timestampToTime(item.createTime).split(' ')[0],
          time2: utils.timestampToTime(item.expireTime).split(' ')[0],
          canUse: item.status==1?true:false
        }
        list.push(temp)
      })
      that.setData({
        cardList:list
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