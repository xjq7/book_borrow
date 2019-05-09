import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
  },
  next() {
    Toast('切换成功!');
    db.collection('users').doc(this.data.id).update({
      data: {
        role: 2
      },
      success(res) {
        let u = app.globalData.userInfo;
        u.role = 2
        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2]
        prevPage.setData({
          userInfo:u
        })
        wx.navigateBack({
          delta: 2
        })
      }
    })
  }
})