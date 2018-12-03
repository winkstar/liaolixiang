//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ip: '',
    show: false,
    height: '',
    scrollTop: '300px',
    val: '',
    userInfo: {},
    collectNum: 0,
    produceList: [],
    index: 0,
    carNumber: 0,
    isLiked: false, //是否已经收藏
    likedIcon: '../image/love.png',
    chooseProduct: {},
    hasUserInfo: false,
    isFirst: false,
    flag1: true,
    flag2: false,
    flag3: false,
    chatInfo: [{
      src: '../image/3-1.jpg',
      name: '我是XXX',
      time: '2018年7月1日',
      con: '简单易学'
    }],
  },
  // 收藏
  likeIt: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    if (!that.data.isLiked) {
      console.log(that.data.isLiked)
      app.postData('/wx/userProduct/saveUserProduct', {
        productId: id,
        type: 1
      }, function(res) {
        if (res.data.res) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1500
          })
          that.setData({
            isLiked: true,
            likedIcon: '../image/like-fill.png'
          })
        }
      })
    } else if (that.data.isLiked) {
      app.postData('/wx/userProduct/delUserProduct', {
        productId: id,
        type: 1
      }, function(res) {
        if (res.data.res) {
          wx.showToast({
            title: '已取消收藏',
            icon: 'success',
            duration: 1500
          })
          that.setData({
            isLiked: false,
            likedIcon: '../image/love.png'
          })
        }
      })
    }
  },
  changVideo: function() {
    var that = this;
    // if (that.data.index < that.data.produceList.length - 1) {
    //   var index = that.data.index + 1;
    //   that.setData({
    //     index: index,
    //     chooseProduct: that.data.produceList[index]
    //   })
    // } else {
    //   that.setData({
    //     index: 0,
    //     chooseProduct: that.data.produceList[0]
    //   })
    // }
    var randomNum = parseInt(Math.random() * that.data.produceList.length);
    // 判断是否被收藏
    app.getData('/wx/userProduct/hasUserProduct', {
      type: 1,
      productId: that.data.produceList[randomNum].id
    }, function (res) {
      if (res.data.info > 0) {
        that.setData({
          isLiked: true,
          likedIcon: '../image/like-fill.png'
        })
      } else {
        that.setData({
          isLiked: false,
          likedIcon: '../image/love.png'
        })
      }
    })
    that.setData({
      chooseProduct: that.data.produceList[randomNum]
    })
  },
  // 点击评论 
  comment: function() {
    wx.navigateTo({
      url: '../commentList/commentList?id=' + this.data.chooseProduct.id,
    })
  },
  // 点击分享
  transmit: function() {
    var that = this;
    wx.navigateTo({
      url: '../share/share?tempdata=' + JSON.stringify(that.data.chooseProduct),
    })
  },
  // 点击购物车 进入购物车
  cart: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.productid;
    app.postData('/wx/userProduct/saveUserProduct', {
      productId: id,
      type: 2
    }, function(res) {
      if (res.data.res) {
        wx.showToast({
          title: '成功加入购物车',
          icon: 'success',
          duration: 1500
        })
        //获取购物车数量
        app.getData('/wx/user/userDetailView', {}, function(res) {
          var length = res.data.shoppingCart.length;
          that.setData({
            carNumber: length
          })
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 1500
        })
      }
    })

  },
  // 点击菜谱 进入菜谱
  cookBook: function(e) {
    app.globalData.product = this.data.chooseProduct
    wx.navigateTo({
      url: '../cookBook/cookBook',
    })
  },
  // 点击引导图片
  click1: function() {
    this.setData({
      flag1: false,
      flag2: true,
    })
  },
  click2: function() {
    this.setData({
      flag2: false,
      flag3: true,
    })
  },
  click3: function() {
    this.setData({
      flag3: false,
      isFirst: false,
    })
  },
  onLoad: function() {
    var that = this;
    var ip = app.globalData.ip;
    that.setData({
      ip: ip
    });
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.windowHeight + 'px'
        })
      }
    })
    // 判断是否为新用户
    var tempFlag = wx.getStorageSync('isNew');
    wx.removeStorageSync('isNew');
    console.log(tempFlag)
    if (tempFlag) {
      that.setData({
        isFirst: true
      })
    }
  },
  onShow: function() {
    var that = this;
    if (wx.getStorageSync('id')) {
      var id = wx.getStorageSync('id');
      app.getData('/wx/product/listProducts', {}, function(res) {
        that.setData({
          produceList: res.data
        })
        res.data.forEach((item, index) => {
          if (item.id == id) {
            that.setData({
              chooseProduct: item,
              index: index
            })
            app.globalData.product = that.data.chooseProduct;
            // 判断是否已经收藏该菜
            app.getData('/wx/userProduct/hasUserProduct', {
              type: 1,
              productId: that.data.chooseProduct.id
            }, function(res) {
              console.log(res);
              if (res.data.info > 0) {
                that.setData({
                  isLiked: true,
                  likedIcon: '../image/like-fill.png'
                })
              } else {
                that.setData({
                  isLiked: false,
                  likedIcon: '../image/love.png'
                })
              }
            })
            that.videoContext = wx.createVideoContext('videoCont');
            that.videoContext.play();
          }
        })
      });
    } else {
      // 获取首页数据
      app.getData('/wx/product/listProducts', {}, function(res) {
        var randomNum = parseInt(Math.random() * res.data.length);
        that.setData({
          produceList: res.data,
          chooseProduct: res.data[randomNum]
        })
        // that.videoContext = wx.createVideoContext('videoCont')
        app.globalData.product = that.data.chooseProduct;
        // 判断是否已经收藏该菜
        app.getData('/wx/userProduct/hasUserProduct', {
          type: 1,
          productId: that.data.chooseProduct.id
        }, function(res) {
          if (res.data.info > 0) {
            that.setData({
              isLiked: true,
              likedIcon: '../image/like-fill.png'
            })
          } else {
            that.setData({
              isLiked: false,
              likedIcon: '../image/love.png'
            })
          }
        })
        that.videoContext.play();
      });

    }
    //获取购物车数量
    app.getData('/wx/user/userDetailView', {}, function(res) {
      var length = res.data.shoppingCart.length;
      that.setData({
        carNumber: length
      })
    })
  },
  onHide: function() {
    console.log('视频开始暂停');
    console.log(this.videoContext);
    this.videoContext.pause();
    console.log('视频暂停');
    wx.setStorageSync('id', this.data.chooseProduct.id)
  },
  onShareAppMessage: function() {
    return {
      title: '料理享',
      path: '/pages/welcome/welcome',
      imageUrl: '../image/share.jpg',
      success: function(shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1500
        })
      },
      fail: function(res) {},
    }
  },
  onReady:function(){
    this.videoContext = wx.createVideoContext('videoCont');
  }
})