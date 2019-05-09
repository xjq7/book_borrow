import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
Page({
  data: {
    list:[],
    has:false
  },
  onSearch(event){
    let that = this
    let bookName = event.detail
    if (bookName==''){
      Toast("书名不能为空！")
    }else{        
      let list = db.collection('bookApplication').where({
        bookName: bookName
      }).get().then(res=>{
        that.setData({
          list: res.data
        })
      })
      }
    },
    se(){
      let that = this
      db.collection('bookApplication').get({
        success(res) {
          if (res.data.length > 0) {
            that.setData({
              list: res.data
            })
          } else {
            that.setData({
              has: true
            })
          }
        }
      })
    },
    onLoad(){
      this.se()
    },
    delete(e){
      let that = this
      let idx = e.currentTarget.dataset.idx
      let _id = that.data.list[idx]._id
      wx.showLoading({
        title: '删除中...',
      })
      if(that.data.list.length==1){
        that.setData({
          list:[]
        })
        wx.hideLoading()
      }
      db.collection('bookApplication').doc(_id).remove({
        success(res1) {
          wx.hideLoading()
          that.se()
        }
      })
    }
    
})
