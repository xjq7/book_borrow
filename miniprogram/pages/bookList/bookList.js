const app = getApp()
const db = wx.cloud.database()
import Toast from '../../vant/toast/toast';
Page({
  data: {
    login:false,
    _id:'',
    borrowList:[],
    favorites:[]
  },
  next(){
    if (!app.globalData.login) {
      Toast("请先登录!!!")
      return
    }
    let info = JSON.stringify(this.data.borrowList)
    wx.navigateTo({
      url: '../../pages/borrow/borrow?info=' + info,
    })
  },
  onChange(event) {
    
  },
  onLoad(){
   
  },
  de(event){
    let that = this
    let type = event.currentTarget.dataset.type
    let idx = event.currentTarget.dataset.idx
    if(type==1){
      wx.showLoading({
        title: '',
      })
      db.collection('book_shelf').doc(that.data.favorites[idx]._id).remove({
        success(res) {
          that.onShow()
          wx.hideLoading()
        }
      })
    }else{
      wx.showLoading({
        title: '',
      })
      db.collection('book_shelf').doc(that.data.borrowList[idx]._id).remove({
        success(res) {
          that.onShow()
          wx.hideLoading()
        }
      })
    }
  },
  onShow: function () {
    let that = this
    if (!app.globalData.login) {
      this.setData({
        login: false,
        borrowList:[],
        favorites:[]
      })
    } else{
      this.setData({
        _id: app.globalData.userInfo._id,
        login: true
      }) 
      let borrowList = []
      let favorites = []
      db.collection("book_shelf").where({
        _openid: app.globalData.userInfo._openid
      }).get({
        success(res) {      
          res.data.forEach((v, i) => {
            if (v.type == 0) {
              borrowList.push(v)
            } else {
              favorites.push(v)
            }
          })     
          that.setData({
            borrowList,
            favorites
          })
        }
      })
    }  
  },
  ch(event){
    let that = this
    let type = event.currentTarget.dataset.type
    let idx = event.currentTarget.dataset.idx
    if(type=='0'){
      wx.showLoading({
        title: '',
      })
      wx.cloud.callFunction({
        name: 'add_book_shelf',
        data: {
          that: that.data.borrowList[idx],
          type: '1'
        }
      }).then(res=>{
        if (res.result.data.length > 0) {
          Toast("收藏夹已存在!!!")
        }else{
          db.collection("book_shelf").doc(that.data.borrowList[idx]._id).update({
            data: {
              type: '1'
            },
            success(res) {
              that.onShow()
            }
          })
        }
        wx.hideLoading()
      })
    }else{
      wx.showLoading({
        title: '',
      })
      wx.cloud.callFunction({
        name: 'add_book_shelf',
        data: {
          that: that.data.favorites[idx],
          type:'0'
        }
      }).then(res => {
        if (res.result.data.length > 0) {
          Toast("借书单已存在!!!")
        } else {
          db.collection("book_shelf").doc(that.data.favorites[idx]._id).update({
            data: {
              type: '0'
            },
            success(res) {
              that.onShow()
            }
          })
        }
        wx.hideLoading()
      })
    }   
  },
  login(e){
    if(e.detail.userInfo){
      wx.navigateTo({
        url: '../../pages/login/login?gender=' + e.detail.userInfo.gender + '&avatarUrl=' + e.detail.userInfo.avatarUrl,
      })
    }   
  }
})