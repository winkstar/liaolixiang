// pages/commentList/commentList.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: {},
    commentlist: [],
    userimg: '',
    comment: '',
    userimg: '',
    ip:''
  },
  commenttext: function (e) {
    var that = this;
    var text = e.detail.value;
    that.setData({
      comment: text
    });
  },
  // commentvideo: function () {
  //   var that = this;
  //   var token = wx.getStorageSync('token');
  //   var httpip = app.globalData.ip;
  //   console.log(that.data.comment)
  //   if (that.data.comment == '') {
  //     wx.showToast({
  //       title: '请输入内容',
  //     })
  //   } else {
  //     wx.request({
  //       url: httpip + '/wx/comment/saveComment?productId=' + that.data.video.id + '&content=' + that.data.comment + '&targetName=' + that.data.video.title,
  //       method: 'POST',
  //       data: {
  //         // showId: that.data.video.id,
  //         // comment: that.data.comment
  //       },
  //       header: {
  //         'content-type': 'application/json', // 默认值
  //         'Authorization': 'Bearer ' + token
  //       },
  //       success: function (res) {
  //         console.log(res.data);
  //         // var arr = that.data.commentlist.push({ userName: '...', content:'that.data.comment'});
  //         that.setData({
  //           comment:''
  //         })
  //         wx.showToast({
  //           title: '评论成功',
  //         });
  //         // 刷新评论列表
  //         app.getData('/wx/comment/commentList', { productId: app.globalData.product.id }, function (res) {
  //           that.setData({
  //             commentlist: res.data
  //           })
  //         }); 
  //       }
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    var id=options.id;
    var userimg = wx.getStorageSync('userimg');
    var httpip=app.globalData.ip;
    that.setData({
      userimg: userimg,
      ip:httpip
    })
    app.getData('/wx/comment/commentList', { productId:id}, function (res) {
      console.log(res.data);
      var tempList=[];
      res.data.forEach(item=>{
        var temp={
          id:item.id,
          content: item.content,
          createTime: utils.timestampToTime(item.createTime),
          userName: item.userName,
          avatar: item.avatar,
          imgs: JSON.parse(item.imgs)
        }
        tempList.push(temp);
      })
      that.setData({
        commentlist:tempList
      })
      console.log(app.globalData.product);
      var pro = {};
      pro.id = app.globalData.product.id;
      pro.title = app.globalData.product.name;
      that.setData({
        video: pro
      })
    }); 
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})