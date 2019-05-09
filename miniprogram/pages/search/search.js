//index.js
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
    logged: true//是否登录
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
        }
      })
    }
  },
  bookInfo(i){
    console.log('1')
  },
  add(event){
    let idx = event.currentTarget.dataset.idx
    // this.global.i = 
    // db.collection('book_shelf').add({
    //   data:{

    //   },
    //   success(res){

    //   }
    // })
  },
  application(){
    wx.navigateTo({
      url: '/pages/bookApplication/bookApplication'
    })
  },
  searchFn(i,v){
    let that = this
    console.log(typeof(i))
    
    console.log(that.data.list)
  }
})
