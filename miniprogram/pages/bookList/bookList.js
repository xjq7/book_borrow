const app = getApp()
Page({
  data: {
    login:false,
    _id:'',
    borrowList:[],
    favorites:[]
  },
  next(){
    wx.navigateTo({
      url: 'pages/',
    })
  },
  onChange(event) {
    
  },
  onShow: function () {
    if (!app.globalData.login) {
      this.setData({
        login: false
      })
    } else{
      this.setData({
        _id: app.globalData.userInfo._id,
        login: true
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