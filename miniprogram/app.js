//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env: 'book-2', // 环境 id
      traceUser: true
    });
    this.getUserInfo()
  },
  globalData: {
    userInfo: {},
    login:false,
    book_shelf:false
  },
  getUserInfo() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.login = true
    }
  }
})
