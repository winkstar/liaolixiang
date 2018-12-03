// pages/my/pointDetail.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pointList: [{
        title: '晒图评论',
        detail: '+5',
        time: '2018-10-10'
      },
      {
        title: '分享奖励',
        detail: '+5',
        time: '2018-10-12'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取积分详情
    // 获取描述
    app.getData('/wx/activity/userPointRecord', {}, function(res) {
      console.log(res.data);
      var tempList = [];
      res.data.info.record.forEach(item => {
        var tempObj = {
          title: that.getText(item.way),
          detail: item.way == 'a' ? '-' + item.point : '+' + item.point,
          time: utils.timestampToTime(item.createTime)
        }
        tempList.push(tempObj)
      })
      that.setData({
        pointList: tempList
      })
    })
  },
  getText: function(way) {
    switch (way) {
      case 'a':
        return '抽奖消耗'
        break;
      case '1':
        return '评论奖励'
        break;
      case '2':
        return '转发奖励'
        break;
      case '3':
        return '拼团奖励'
        break;
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