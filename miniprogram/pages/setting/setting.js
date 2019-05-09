import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    userInfo:{},
    id:''
  },
  onLoad: function (options) {
    this.setData({
      id:options.id
    })
  },
  getPwd(e){
    this.setData({
      pwd:e.detail.value
    })
  },
  quit(){
    try {
      wx.clearStorageSync()
    } catch (e) {}
    app.globalData.userInfo = {}
    app.globalData.login = false
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]
    prevPage.setData({
      userInfo: {},
      login: false
    })
    wx.navigateBack({
      delta: 1
    })
  },
  next(){
    let that = this
    if(this.data.pwd=='root'){
      Toast('认证成功!');
      db.collection('users').doc(that.data.id).update({
        data: {
          role: 1
        },
        success(res) {
          let u = app.globalData.userInfo
          u.role = 1
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2]
          prevPage.setData({
            userInfo: u
          })
          wx.navigateBack({
            delta:2
          }) 
        }
      })
    }else{
      Toast('密钥错误');
    }
  }
})