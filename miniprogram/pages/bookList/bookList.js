const app = getApp()
Page({
  data: {
    login:false,
    _id:'',
    borrowList:[
      {name:'a' ,title:'a',isbn13:'dasd'},
      { name: 'a', title: 'b', isbn13: 'scsa'},
      { name: 'a', title: 'v', isbn13: 'dadasdgsd' }
    ],
    favorites:[]
  },
  next(){
    let info = JSON.stringify(this.data.borrowList)
    wx.navigateTo({
      url: '../../pages/borrow/borrow?info=' + info,
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