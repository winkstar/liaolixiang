// pages/my/collect.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    flag: true,
    content: [{
      src: '../image/4-1.jpg',
      name: '葱爆牛肉',
      num: '90'
    }],
    productList:[],
    ip:''
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
  checkProduct:function(e){
    var id=e.currentTarget.dataset.id;
    wx.setStorageSync('id',id);
    wx.switchTab({
      url: '../index/index',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id=options.id;
    var typeName = options.typeName
    console.log(id)
    var ip = app.globalData.ip;
    var that=this;
    wx.setNavigationBarTitle({
      title: typeName //页面标题为路由参数
    })
    that.setData({
      ip:ip
    });
    app.getData('/wx/product/listProducts', { categoryId:id},function(res){
      that.setData({
        productList:res.data
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