const app = getApp()
import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
const setUser = require('../../utils/setUser.js')
Page({
  data: {
    name:'',
    studentId:'',
    userInfo:{}
  },
  onLoad: function (options) {
    this.setData({
      userInfo:{
        gender:options.gender,
        avatarUrl: options.avatarUrl,
        _openid:options.openid
      }
    })
  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getId(e){
    this.setData({
      studentId: e.detail.value
    })
  },
  next(){
    let that = this
    if (this.data.studentId=='' || this.data.name==''){
      Toast('信息未填完整！');
    }else{    
      db.collection("users").where({
        studentId: that.data.studentId
      }).get().then(res=>{
        if(res.data.length>0){
          Toast('学号已存在！请确认是否输入错误！');
        }else{
          wx.showLoading({
            title: '正在登录',
          })
          db.collection('users').add({
            data: {
              name: that.data.name,
              gender: that.data.userInfo.gender,
              studentId: that.data.studentId,
              avatarUrl: that.data.userInfo.avatarUrl,
              role: 2
            }
          }).then(res=>{
            db.collection('users').doc(that.data.userInfo._openid).get().then(res1=>{
              setUser(res1.data)
              let pages = getCurrentPages();
              let prevPage = pages[pages.length - 2]
              prevPage.setData({
                userInfo: res1.data,
                login: true
              })
              wx.navigateBack({
                delta: 2
              })
              wx.hideLoading() 
            })    
               
          })  
        }  
      })
    } 
  }
})