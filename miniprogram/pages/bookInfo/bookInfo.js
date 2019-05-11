import Toast from '../../vant/toast/toast';
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    bookInfo:{},
    book_shelf:app.globalData.book_shelf
  },
  onLoad: function (options) {
    this.setData({
      bookInfo: JSON.parse(options.info)
    })
  },
  favorite(){
    let that = this
    if(!app.globalData.login){
      Toast("请先登录!!!")
      return
    }
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'add_book_shelf',
      data: {
        that: that.data.bookInfo,
        type:'1'
      }
    }).then(res => {
      if (res.result.data.length > 0) {
        Toast("请勿重复添加!!!")
      } else {
        db.collection("book_shelf").add({
          data: {
            bookName: that.data.bookInfo.title,
            isbn: that.data.bookInfo.isbn13,
            author: that.data.bookInfo.author,
            img: that.data.bookInfo.images_large,
            type:'1'
          }
        }).then(res => {
          Toast("添加成功!")
        }).catch(err => { })
      }
      wx.hideLoading()
    })
  },
  next(){
    if (!app.globalData.login) {
      Toast("请先登录!!!")
      return
    }
    let that = this
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'add_book_shelf',
      data: {
        that: that.data.bookInfo,
        type:'0'
      }
    }).then(res => {
      if (res.result.data.length > 0) {
        Toast("请勿重复添加!!!")
      } else {
        db.collection("book_shelf").add({
          data: {
            bookName: that.data.bookInfo.title,
            isbn: that.data.bookInfo.isbn13,
            author: that.data.bookInfo.author,
            img: that.data.bookInfo.images_large,
            type: '0'
          }
        }).then(res => {
          Toast("添加成功!")
        }).catch(err => { })      
      }
      wx.hideLoading()
    })  
  }
})