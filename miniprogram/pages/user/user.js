const app = getApp()
import Toast from '../../vant/toast/toast'
const setUser = require('../../utils/setUser.js')
const db = wx.cloud.database()
Page({
  data: {
    userInfo: app.globalData.userInfo,
    login:app.globalData.login
  },
  login(e){
    let u = e.detail.userInfo
    let that = this
    wx.cloud.callFunction({
      name: 'login',
      data: {
        openid:u._openid
      }
    }).then(res=>{
      let u1 = res.result.data[0]
      if (res.result.data.length>0){
        that.setData({
          userInfo: u1,
          login:true
        })
        setUser(u1)
        app.globalData.userInfo = {
          name: u1.name,
          studentId: u1.studentId,
          role: 2,
          avatarUrl: u1.avatarUrl,
          _openid: u1._openid
        }
        app.globalData.login = true
      }else{
        wx.navigateTo({
          url: `../../pages/login/login?gender=${u.gender}&avatarUrl=${u.avatarUrl}`,
        })
      }
    })
  }
})