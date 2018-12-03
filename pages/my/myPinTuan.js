// pages/my/myPinTuan.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activedList:[],
    shareMsg:''
  },
  oldPintuan:function(e){
    var code=e.currentTarget.dataset.code;
    console.log(code)
    this.setData({
      shareMsg:code
    })
    this.onShareAppMessage()
  },
  newPintuan:function(){
    var that=this;
    app.postData('/wx/activity/createGroup', {}, function (res) {
      if (res.data.res) {
        that.setData({
          shareMsg: res.data.msg,
          showWindow: true
        })
        // 更新已拼团列表
        app.getData('/wx/activity/userGroup', {}, function (res) {
          var tempList = [];
          res.data.forEach(item => {
            var tempObj = {
              createTime: utils.timestampToTime(item.createTime).split(' ')[0],
              code: item.code,
              size: item.size,
              cnt: item.cnt,
              name: item.name
            }
            tempList.push(tempObj)
          })
          that.setData({
            activedList: tempList
          })
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    app.getData('/wx/activity/userGroup',{},function(res){
      console.log(res);
      var tempList=[];
      res.data.forEach(item=>{
        var tempObj={
          createTime: utils.timestampToTime(item.createTime).split(' ')[0],
          code:item.code,
          size:item.size,
          cnt:item.cnt,
          name:item.name
        }
        tempList.push(tempObj)
      })
      that.setData({
        activedList: tempList
      })
    })
  },
  onShareAppMessage: function () {
    return {
      title: '料理享',
      path: '/pages/welcome/welcome?key=' + this.data.shareMsg + '&&name=' + wx.getStorageSync('userName'),
      imageUrl: '../image/share.jpg',
      success: function (shareTickets) {
        console.info(shareTickets);
        // 转发成功
        wx.showToast({
          title: '拼团成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})