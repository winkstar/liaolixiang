// pages/category/category.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [{
        con: '鱼香肉丝',
        unique: 'unique-1'
      },
      {
        con: '炖肉',
        unique: 'unique-2'
      }
    ],
    categoryList: [],
    inputValue: '',
    flag: true,
    qc: true,
    ip: ''
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
  // 点击清除按钮 清除历史记录
  clear: function() {
    this.setData({
      content: []
    });
    this.setData({
      qc: false
    });
  },
  // search
  searchHot:function(e){
    var key=e.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../search/searchList?key=' + key
    })
  },
  searchBtn: function() {
    var that = this;
    if (that.data.inputValue) {
      wx.navigateTo({
        url: '../search/searchList?key=' + that.data.inputValue
      })
    }
  },
  chooseType: function(e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var type = e.currentTarget.dataset.type
    wx.navigateTo({
      url: 'tea?id=' + id + '&typeName=' + type,
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var ip = app.globalData.ip;
    that.setData({
      ip: ip
    })
    // 获取所有分类
    app.getData('/wx/cate/categoryTree', {
      rootId: 126
    }, function(res) {
      console.log(res.data);
      that.setData({
        categoryList: res.data
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