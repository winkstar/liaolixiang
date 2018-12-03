var app = getApp();
// var addressList = app.globalData.addressList;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    receiveMan: '',
    phone: '',
    address: '',
    array: [],
    customItem: '全部',
    wen: '请选择',
    addressList: [],
    isEdit: false,
    inx: 0,
    index: null
  },
  // 收货人
  bindMan: function(e) {
    this.setData({
      receiveMan: e.detail.value
    })
  },
  // 联系方式
  bindPhone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // 省份地区
  bindRegionChange: function(e) {
    this.setData({
      index: e.detail.value,
      wen: ''
    })
  },
  // 联系地址
  bindAddress: function(e) {
    this.setData({
      address: e.detail.value
    })
  },
  // 点击确认按钮
  addNew: function() {
    var add = this.data.array[this.data.index];
    var receiveMan = this.data.receiveMan;
    var phone = this.data.phone;
    var address = '武汉市' + add + this.data.address;
    var arr = {};
    arr.name = receiveMan;
    arr.phone = phone;
    arr.address = address;
    arr.isSelect = true;
    // 判断非空
    if (add && receiveMan && phone && this.data.address){
      // 提交地址信息
      app.postData('/wx/address/saveAddress', {
        address: address,
        phone: phone,
        receiver: receiveMan,
        id: this.data.inx
      }, function (res) {
        wx.redirectTo({
          url: 'address',
        })
      })
    }else{
      wx.showToast({
        title: '请完善信息！',
        icon:'none',
        duration:2000
        
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(option) {
    var that = this;
    if (option.id) {
      app.getData('/wx/address/userAddress', {}, function(res) {
        var addressList = app.globalData.addressList;
        var str = addressList[option.id].address;
        that.setData({
          receiveMan: addressList[option.id].receiver,
          phone: addressList[option.id].phone,
          address: addressList[option.id].address,
          wen: '',
          region: [str.slice(0, 3), str.slice(3, 6), str.slice(6, 9)],
          inx: addressList[option.id].id,
          isEdit: true
        })
      });
    } else {
      that.setData({
        isEdit: false
      })
    }
    // 获取城市列表
    app.getData('/wx/address/addressData', {}, function(res) {
      console.log(res);
      var tempArr = [];
      res.data[0].cities[0].areas.forEach(item => {
        tempArr.push(item.area)
      })
      that.setData({
        array: tempArr
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