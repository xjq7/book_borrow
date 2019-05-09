import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    userInfo:{}
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
    let that =this
    try {
      const value = wx.getStorageSync('userInfo')
      if (value) {
       that.setData({
         userInfo:value
       })
      }
    } catch (e) {}
    if(this.data.pwd=='root'){
      Toast('认证成功!');
      db.collection('users').doc(that.data.userInfo._id).update({
        data: {
          role: 1
        },
        success(res) {
          try {
            wx.setStorageSync('userInfo', {
              name: that.data.userInfo.name,
              gender: that.data.userInfo.gender,
              studentId: that.data.userInfo.studentId,
              avatarUrl: that.data.userInfo.avatarUrl,
              role: 1
            })  
          } catch (e) {}
          wx.navigateBack({
            delta: 1
          }) 
        }
      })
    }else{
      Toast('密钥错误');
    }
  }
})