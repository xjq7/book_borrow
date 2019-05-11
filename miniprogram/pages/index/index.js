const app = getApp()
import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
Page({
  data: {
    role:'',
    login:false
  },
  onLoad(){
    let that = this
    db.collection("bookInfo").orderBy('borrowNum', 'desc').limit(10).get({
      success(res){
        that.setData({
          list:res.data,
          login:app.globalData.login
        })
      }
    })
  },
  onShow(){
    that.setData({
      login: app.globalData.login
    })
  },
  login(e) {
    if (e.detail.userInfo) {
      wx.navigateTo({
        url: '../../pages/login/login?gender=' + e.detail.userInfo.gender + '&avatarUrl=' + e.detail.userInfo.avatarUrl,
      })
    }
  },
  onShow(){
    let that = this
    const value = app.globalData.userInfo
    if (JSON.stringify(value) != "{}") {
      that.setData({
        role: value.role
      })
    } else{
      that.setData({
        role: 2
      })
    }
  },
  scanReturn(){
    wx.scanCode({
      success(res){
        db.collection('bookInfo').where({
          isbn13:res.result
        })
          .get({
            success(res) {
              console.log(res.data)
            }
          })
      }
    })
  },
  scanAdd(){
    wx.scanCode({
      success(res) {
        wx.showLoading({
          title: '添加中...',
        })
        wx.request({
          url: "https://isbn.market.alicloudapi.com/ISBN?is_info=0&isbn=9787115428028",
          method: "GET",
          header: {
            'Authorization': "APPCODE 29364ee21a554177aa41cec6b5dc6490"
          },
          success: function (res1) {
            db.collection('bookInfo').where({
              isbn13: res1.data.result
            })
              .get({
                success(res) {
                  if (res.data.length > 0) {
                    Toast("已存在该图书")
                  } else {
                    res1.data.result.num = 1
                    res1.data.result.borrow = 0
                    res1.data.result.borrowNum = 0
                    db.collection("bookInfo").add({
                      data: res1.data.result
                    }).then(res => {
                      wx.hideLoading()  
                      Toast("添加成功！")                  
                    }).catch(console.error)
                  }
                }
              })  
          }
        })
      }
    })
  },
  scanBorrow(){
    wx.scanCode({
      success(res1){
        db.collection("bookInfo").where({
          isbn13: '9787115370655'
        }).get({
          success(res){
            if ((res.data[0].num - res.data[0].borrow)>0){
              let info = JSON.stringify(res.data[0]);
              wx.navigateTo({
                url: '../../pages/borrow/borrow?info='+info,
              })
            }else{
              Toast("该书借完了...")
            }
          }
        })
      }
    })
  },
  search(){
    wx.navigateTo({
      url: '/pages/search/search'
    })
  }
})
