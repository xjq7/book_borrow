import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
const getTime = require('../../utils/format.js')
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
    let time = new Date(event.detail);
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    this.setData({
      returnDate:`${y}.${m}.${d}`,
      show:false
    })
  },
  next(){
    
  },
  onLoad: function (options) {
    let date = new Date()
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let info = JSON.parse(options.info);
    this.setData({
      info:info,
      returnDate: `${y}.${m}.${d}`
    })
  }
})