const app = getApp()
const db = wx.cloud.database()
const formatdate = require('../../utils/format.js')
Page({
  data: {
    lList:[],
    rList:[],
    mList:[],
    scrollHeight:''
  },
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let that = this
    let date = new Date()
    let lList= []
    let rList = []
    let mList=[]
    let height = wx.getSystemInfoSync().windowHeight
    this.setData({
      scrollHeight:`height:${(height)*2}rpx`
    })
    db.collection("borrow_record").where({
      _openid:app.globalData.userInfo._openid
    }).get({
      success(res){    
        res.data.forEach((v,i)=>{
          if(v.finish=='0'){
            lList.push(v)
          }else{
            if (formatdate.getTime(v.endDate) < date.getTime()) {
              mList.push(v)
            } else {
              rList.push(v)
            }   
          } 
        })
        that.setData({
          lList,
          rList,
          mList
        })
        wx.hideLoading()
      }  
    })
  }
})