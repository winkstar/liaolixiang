// pages/cart/cart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ip: '',
    delBtnWidth: 70, //删除按钮宽度单位（rpx）
    num: 1,
    array: ['懒人版', '料理版'],
    typeIndex: 0,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    selectAllStatus: false,
    totalPrice: 0,
    scrollHeight: 0,
    carts: []
  },
  // 点击全选按钮
  selectAll: function(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },
  // 点击单项物品的单选框
  selectList: function(e) {
    var index = e.currentTarget.dataset.index;
    var carts = this.data.carts;
    var selected = carts[index].selected;
    carts[index].selected = !selected;
    this.setData({
      carts: carts
    });
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected == false) {
        this.setData({
          selectAllStatus: false,
        })
        break;
      } else {
        this.setData({
          selectAllStatus: true,
        })
      }
    }

    this.getTotalPrice();
  },
  checkProduct(e) {
    var id = e.currentTarget.dataset.id;
    wx.setStorageSync('id', id)
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 切换类型
  bindPickerChange: function(e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var cartList = this.data.carts;
    cartList[index].typeIndex = e.detail.value
    this.setData({
      carts: cartList
    })
    this.getTotalPrice();
  },
  // 点击结算按钮
  pay: function() {
    var carts = this.data.carts;
    var chooseProduct = [];
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].selected == true) {
        chooseProduct.push(carts[i])
      }
    }
    var cartsStr = JSON.stringify(chooseProduct);
    if (this.data.totalPrice > 0) {
      wx.navigateTo({
        url: 'pay?carts=' + cartsStr,
      })
      return;
    } else {
      wx.showToast({
        title: '你还没有选中任何商品',
        icon: 'none',
        duration: 1500
      })
    }
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
        that.setData({
          scrollHeight: res.windowHeight - 47
        });
      }
    });


  },
  onShow: function() {
    var that = this;
    that.setData({
      selectAllStatus:false,
      totalPrice: 0
    })
    // 获取个人数据
    app.getData('/wx/user/userDetailView', {}, function(res) {
      console.log(res)
      // that.initEleWidth();
      var cartArr = [];
      res.data.shoppingCart.forEach(item => {
        var cartItem = {
          id: item.id,
          productId: item.product.id,
          title: item.product.name,
          url: item.product.img,
          numPeop1: item.product.numPeop1,
          numPeop2: item.product.numPeop2,
          num: 1,
          typeIndex: 0,
          price1: item.product.price1 ? item.product.price1 : 0.01,
          price2: item.product.price2 ? item.product.price2 : 0.01,
          selected: false,
          txtStyle: '',
          delStyle: '',
          del: true
        }
        cartArr.push(cartItem)
      })
      that.setData({
        carts: cartArr
      })
      console.log(that.data.carts)
    })
  },
  // 初始化删除按钮宽度
  getEleWidth: function(w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2); //以宽度750px设计稿做宽度的自适应
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  initEleWidth: function() {
    var delBtnWidth = this.getEleWidth(this.data.delBtnWidth);
    this.setData({
      delBtnWidth: delBtnWidth
    });
  },
  // 点击减号
  bindMinus: function(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = carts[index].num;

    if (num > 1) {
      num--;
    } else {
      num = 1
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';

    carts[index].num = num;
    this.setData({
      carts: carts,
      minusStatus: minusStatus
    });
    this.getTotalPrice();
  },
  /* 点击加号 */
  bindPlus: function(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  /* 输入框事件 */
  bindManual: function(e) {
    var index = e.currentTarget.dataset.index;
    var carts = this.data.carts;
    var num = e.detail.value;

    carts[index].num = num
    // 将数值与状态写回  
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  // 计算总价
  getTotalPrice: function() {
    var carts = this.data.carts; // 获取购物车列表
    var total = 0;
    for (var i = 0; i < carts.length; i++) { // 循环列表得到每个数据
      if (carts[i].selected) {
        if (carts[i].typeIndex == 0) {
          total += carts[i].num * carts[i].price1;
        } else if (carts[i].typeIndex == 1) {
          total += carts[i].num * carts[i].price2;
        }
      }
    }
    this.setData({
      carts: carts,
      totalPrice: (total / 100).toFixed(2)
    });
  },
  // 手机触屏事件
  touchS: function(e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function(e) {
    if (e.touches.length == 1) {
      //手指移动时水平方向位置
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) { //如果移动距离小于等于0，文本层位置不变
        txtStyle = "left:0px";
      } else if (disX > 0) { //移动距离大于0，文本层left值等于手指移动距离
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;

      var carts = this.data.carts;
      carts[index].txtStyle = txtStyle;
      carts[index].del = false;
      carts[index].txtStyle = 'rigjt: -140rpx;';
      //更新列表的状态
      this.setData({
        carts: carts
      });
    }
  },

  touchE: function(e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项
      var index = e.currentTarget.dataset.index;
      var carts = this.data.carts;
      carts[index].txtStyle = txtStyle;
      carts[index].del = false;
      carts[index].delStyle = 'right:-140rpx;';
      //更新列表的状态
      this.setData({
        carts: carts
      });
    }

  },
  // 点击删除按钮
  delItem: function(e) {
    //获取列表中要删除项的下标
    console.log(e)
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var carts = this.data.carts;
    //移除列表中下标为index的项
    carts.splice(index, 1);
    //更新列表的状态
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
    // 在数据库中删除
    app.postData('/wx/userProduct/delUserProduct', {
      productId: id,
      type:2
    }, function(res) {
      if (res.data.res) {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1500
        })
      }
    })
  },
})