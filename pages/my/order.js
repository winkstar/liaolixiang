// pages/order/order.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    num: 0,
    current: 'spjs',
    select1: true,
    select2: false,
    select3: false,
    select4: false,
    showApproveBox: false,
    orderCode: '',
    title: '',
    detail: '',
    // 全部订单
    allOrder: [],
    // 待收货订单
    payOrder: [],
    // 已收货订单
    receiveOrder: []
  },
  // 详情tab切换
  now1: function(e) {
    var now = e.currentTarget.dataset.opt;

    this.setData({
      current: now,
      select1: true,
      select2: false,
      select3: false,
      select4: false
    });
    wx.setNavigationBarTitle({
      title: '全部订单'
    })
  },
  now2: function(e) {
    var now = e.currentTarget.dataset.opt;

    this.setData({
      current: now,
      select1: false,
      select2: true,
      select3: false,
      select4: false
    })
    wx.setNavigationBarTitle({
      title: '待支付'
    })
  },
  now3: function(e) {
    var now = e.currentTarget.dataset.opt;

    this.setData({
      current: now,
      select1: false,
      select2: false,
      select3: true,
      select4: false
    })
    wx.setNavigationBarTitle({
      title: '待收货'
    })
  },
  now4: function(e) {
    var now = e.currentTarget.dataset.opt;

    this.setData({
      current: now,
      select1: false,
      select2: false,
      select3: false,
      select4: true
    })
    wx.setNavigationBarTitle({
      title: '待评价'
    })
  },
  // 点击 查看物流
  wuliu: function(e) {
    var number = e.currentTarget.dataset.number;
    // // 测试
    //   wx.navigateTo({
    //     url: 'wuliu?number=' + number,
    //   })
    if (number) {
      wx.navigateTo({
        url: 'wuliu?number=' + number,
      })
    } else {
      wx.showToast({
        title: '未获取到快递单号',
        icon: 'none',
        duration: 2000
      })
    }
  },
  checkProduct:function(e){
    var id=e.currentTarget.dataset.productid;
    wx.setStorageSync('id', id)
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 点击 申请售后
  tuikuan: function(e) {
    this.setData({
      showApproveBox: true,
      orderCode: e.currentTarget.dataset.id,
      title: e.currentTarget.dataset.title
    })
  },
  closeBox: function() {
    this.setData({
      showApproveBox: false
    })
  },
  tijiao: function() {
    var that = this;
    // 发送请求
    if (that.data.detail) {
      app.postData('/wx/return/saveReturnApprove', {
        title: that.data.title,
        detail: that.data.detail,
        orderCode: that.data.code
      }, function(res) {
        console.log(res);
        if (res.data.res) {
          wx.showToast({
            title: '提交成功，请等待处理',
            icon: 'none',
            duration: 2000
          })
        }
        that.setData({
          title: '',
          detail: '',
          orderCode: '',
          showApproveBox: false
        })
      })
    }else{
      wx.showToast({
        title: '请填写退款理由',
        icon: 'none',
        duration: 2000
      })
    }
  },
  textDetail: function(e) {
    this.setData({
      detail: e.detail.value
    })
  },
  // 点击 已退款
  process: function() {
    wx.navigateTo({
      url: 'applyProcess'
    })
  },
  commentProduct: function(e) {
    var id = e.currentTarget.dataset.productid;
    wx.navigateTo({
      url: '../commentList/comment?id=' + id,
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
    wx.getSystemInfo({
      success: function(res) {
        console.info(res.windowHeight);
        that.setData({
          num: res.windowHeight + 'px'
        });
      }
    });
    // 获取订单
    app.getData('/wx/user/userDetailView', {}, function(res) {
      console.log(res.data);
      var tempList = [];
      res.data.orders.forEach(item => {
        var tempContList = [];
        item.orders.forEach(orderItem => {
          var temListItem = {
            price: orderItem.cost * orderItem.amount,
            src: orderItem.product.img,
            goodsTitle: orderItem.product.name,
            goodsNum: orderItem.amount,
            productId: orderItem.product.id,
          }
          tempContList.push(temListItem)
        })
        var tempObj = {
          orderNum: item.id,
          cost: item.postage,
          expressNo: item.expressNo,
          total: item.cost,
          title: item.title,
          state: '',
          time: utils.timestampToTime(item.createTime),
          code: item.code,
          content: tempContList
        }
        tempList.push(tempObj)
      })
      that.setData({
        allOrder: tempList
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