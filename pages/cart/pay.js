// pages/order/pay.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    totalPrice: 0,
    realPrice: 0,
    cardId: '',
    sendMoney: 1000,
    allOrder: [],
    address: {},
    hasAddress: true,
    cards: [{
        name: '10元抵用券',
        checked: false
      },
      {
        name: '5元抵用券',
        checked: false
      }
    ]
  },
  radioChange: function(e) {
    var that=this;
    var id = e.detail.value;
    that.setData({
      cardId: id
    })
    var tempPro = '';
    var tempAmo = '';
    var tempTypes = '';
    that.data.allOrder.forEach(item => {
      tempPro += '&productIds=' + item.id;
      tempAmo += '&amounts=' + item.goodsNum;
      tempTypes += '&types=' + item.types;
    });
    var tempStr = 'couponId=' + id + '&addressId=' + that.data.address.id + '' + tempPro + tempAmo + tempTypes;

    // 计算价钱
    app.postData('/wx/order/calculateCost?' + tempStr, {}, function (res) {
      that.setData({
        totalPrice: res.data.msg,
        realPrice: res.data.info[0],
      })
    })
  },
  // 点击 箭头
  address: function() {
    wx.navigateTo({
      url: '../my/address',
    })
  },
  // 点击 微信支付
  pay: function() {
    var that = this;
    // 创建订单
    var tempPro = '';
    var tempAmo = '';
    var tempTypes = '';
    that.data.allOrder.forEach(item => {
      tempPro += '&productIds=' + item.id;
      tempAmo += '&amounts=' + item.goodsNum;
      tempTypes += '&types=' + item.types;
    });
    var tempStr = 'addressId=' + that.data.address.id + '' + tempPro + tempAmo + tempTypes;
    app.postData('/wx/order/createOrder?' + tempStr, {}, function(res) {
      if (res.data.res) {
        var orderId = res.data.info.orderId
        console.log("调用支付成功")
        wx.requestPayment({
          'timeStamp': res.data.info.timeStamp,
          'nonceStr': res.data.info.nonceStr,
          'package': res.data.info.package,
          'signType': 'MD5',
          'paySign': res.data.info.paySign,
          'success': function(res) {
            console.log(res)
            // 此处调用支付成功接口
            app.postData('/wx/order/doneOrder', {
              orderId: orderId
            }, function(res) {
              console.log(res);
              console.log('调用doneorder成功');
              wx.showToast({
                title: '购买成功！',
                icon: 'success',
                duration: 2000,
                mask: true,
                success: function(res) {
                  setTimeout(function() {
                    wx.navigateTo({
                      url: '../my/order',
                    })
                  }, 2000)
                }
              })

            })
          },
          'fail': function(res) {
            console.log(res)
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var that = this;
    var ip = app.globalData.ip;
    that.setData({
      ip: ip
    });
    var carts = JSON.parse(options.carts);
    console.log(carts)
    var productArr = [];
    var total = 0;
    carts.forEach(item => {
      var temOrderContent = {
        id: item.productId,
        price: item.typeIndex == 0 ? item.price1 : item.price2,
        types: Number(item.typeIndex) + 1,
        src: item.url,
        goodsTitle: item.title,
        goodsNum: item.num
      }
      total += temOrderContent.price * item.num;
      productArr.push(temOrderContent)
    })
    console.log(productArr)
    // 计算支付总价
    var tempPro = '';
    var tempAmo = '';
    var tempTypes = '';
    productArr.forEach(item => {
      tempPro += '&productIds=' + item.id;
      tempAmo += '&amounts=' + item.goodsNum;
      tempTypes += '&types=' + item.types;
    });
    var tempStr = 'addressId=' + that.data.address.id + '' + tempPro + tempAmo + tempTypes;
    // 计算价钱
    app.postData('/wx/order/calculateCost?' + tempStr, {}, function(res) {
      that.setData({
        totalPrice: res.data.msg,
        realPrice: res.data.info[0],
        allOrder: productArr
      })
      // 获取卡券信息
      app.getData('/wx/user/userDetailView', {}, function(res1) {
        var listTemp = [];
        res1.data.coupons.forEach(item => {
          var tempItem = {
            id: item.id,
            minCost: item.minCost,
            title: item.title,
            able: item.able
          }
          if (res.data.msg > item.minCost && item.able) {
            listTemp.push(tempItem)
          }
        })
        that.setData({
          cards: listTemp
        })
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
    console.log("run onshow func!")
    var that = this;
    // 获取收货地址
    app.getData('/wx/address/userAddress', {}, function(res) {
      console.log(res.data)
      app.globalData.addressList = res.data;
      that.setData({
        hasAddress: true
      })
      if (res.data.length == 0) {
        that.setData({
          hasAddress: false
        })
      }
      res.data.forEach(item => {
        if (item.isDefault) {
          that.setData({
            address: item
          })
          console.log(item)
        }
      })

    })
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