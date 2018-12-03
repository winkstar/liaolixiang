var app = getApp();
// var addressList = app.globalData.addressList; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  // 设置默认地址
  operate: function (e) {
    var that =this;
    var index = e.currentTarget.dataset.index;
    var addressList = this.data.addressList;
    var state = addressList[index].isDefault;
    for(var i = 0;i<addressList.length;i++){
      addressList[i].isDefault = state;
      addressList[index].isDefault = !state;
    }
    app.postData('/wx/address/setDefault', {
      addressId: addressList[index].id,
    }, function (res) {
      that.setData({
        addressList: addressList
      })
    })
  },
  // 点击编辑按钮
  edit: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: 'newAddress?id=' + index,
    })
  },
  // 点击删除按钮 
  del: function (e) {
    var that=this;
    var index = e.currentTarget.dataset.index;
    var addressList = this.data.addressList;
    var id = addressList[index].id;
    app.postData('/wx/address/delAddress',{
      addressId:id
    },function(res){
        if(res.data.res){
          wx.showToast({
            title: '删除成功',
            icon:'none',
            duration:1500
          })
          // 重新请求列表数据
          app.getData('/wx/address/userAddress', {}, function (res) {
            console.log(res.data)
            app.globalData.addressList = res.data;
            that.setData({
              addressList: res.data
            })
          })
        }
    })
  },
  // 点击添加新地址按钮
  addNew: function () {
    wx.redirectTo({
      url: 'newAddress',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    // 获取收货地址
    app.getData('/wx/address/userAddress',{},function(res){
      console.log(res.data)
      app.globalData.addressList = res.data;
      that.setData({
        addressList: res.data
      })
    })
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