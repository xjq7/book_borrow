import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
const formatdate = require('../../utils/format.js')
const app = getApp()
Page({
  data: {
    show:false,
    info:{},
    returnDate: '',
    minDate: new Date().getTime(),
    maxDate: Number(new Date().getTime() + 30 * 1000 * 24 * 60 * 60),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },
  chDate(){
    this.setData({
      show:true
    })
  },
  confirm(event) { 
    let that = this
    let date = new Date(event.detail);
    this.setData({
      returnDate: formatdate.borrowDate(date),
      startDate: formatdate.borrowDate(date),
      show:false
    })
  },
  next(){
    wx.showLoading({
      title: '正在处理',
    })
    let that = this
    let borrow = []
    this.data.info.forEach((v,i)=>{
      let insertBorrow = db.collection('borrow_record').add({
        data: {
          isbn: `${v.isbn}`,
          bookName:`${v.title}`,
          name:app.globalData.userInfo._openid,
          studentId:app.globalData.userInfo.studentId,
          startDate: that.data.startDate,
          endDate:that.data.returnDate,
          overdue:0,
          finish:0
        }
      })
      borrow.push(insertBorrow)
    })
    Promise.all(borrow).then((res) => {
      wx.hideLoading()
      Toast("成功借阅!")
      setTimeout(function(){
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]
        prevPage.setData({
          borrowList: []
        })
        wx.navigateBack({
          delta: 2
        })
      },1000)
      
    }).catch(err=>{
      Toast("借阅失败!")
    })
  },
  onLoad: function (options) {
    let that = this
    let date = new Date() 
    let info = JSON.parse(options.info);
    this.setData({
      info:info,
      startDate: formatdate.borrowDate(date)
    })
  },
  
})