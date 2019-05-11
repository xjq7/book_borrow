const app = getApp()
const db = wx.cloud.database()
import Toast from '../../vant/toast/toast';
Page({
  data: {
    searchType: '书名',//搜素类型
    show: false,//类型切换显示
    actions: [//所有类型
      {
        name: '书名'
      },
      {
        name: '作者'
      },
      {
        name: 'ISBN'
      }
    ],
    userInfo: {},//用户信息
    list:[],
    logged: true,//是否登录
  },
  onClose() {//关闭切换类型
    this.setData({ show: false });
  },
  typeCh() {//弹出切换类型
    this.setData({ show: true });
  },
  onSelect(event) {//选中后关闭
    this.setData({ searchType: event.detail.name, show: false });
  },
  search(event) {
    let that = this
    wx.showLoading({
      title: '搜索中...',
    })
    if(this.data.searchType=='书名'){
      db.collection('bookInfo').where({
        'title': db.RegExp({
          regexp: `${event.detail.value}`,
          options: 'i'
        })
      }).get({
        success(res) {
          that.setData({
            list: res.data
          })
          wx.hideLoading()
        }
      })
    } else if (this.data.searchType == '作者'){
      db.collection('bookInfo').where({
        'author': db.RegExp({
          regexp: `${event.detail.value}`,
          options: 'i'
        })
      }).get({
        success(res) {
          that.setData({
            list: res.data
          })
          wx.hideLoading()
        }
      })
    }else{
      db.collection('bookInfo').where({
        'isbn13': event.detail.value
      }).get({
        success(res) {
          that.setData({
            list: res.data
          })
          wx.hideLoading()
        }
      })
    }
  },
  bookInfo(event){
    console.log()
    let info = JSON.stringify(this.data.list[event.currentTarget.dataset.idx])
    wx.navigateTo({
      url: '../../pages/bookInfo/bookInfo?info='+info,
    })
  },
  add(event){
    if (!app.globalData.login) {
      Toast("请先登录!!!")
      return
    }
    let that = this
    let idx = event.currentTarget.dataset.idx
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'add_book_shelf',
      data: {
        that: that.data.list[idx],
        type:'0'
      }
    }).then(res=>{
      if (res.result.data.length > 0) {
        Toast("请勿重复添加!!!")
      } else {
        db.collection("book_shelf").add({
          data: {
            bookName: that.data.list[idx].title,
            isbn: that.data.list[idx].isbn13,
            author: that.data.list[idx].author,
            img: that.data.list[idx].images_large,
            type: '0'
          }
        }).then(res => {
          Toast("添加成功!")
        }).catch(err => { })
      }
      wx.hideLoading()
    })    
  },
  application(){
    wx.navigateTo({
      url: '/pages/bookApplication/bookApplication'
    })
  }
})
