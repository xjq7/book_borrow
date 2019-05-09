import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
Page({
  data: {
    isbn:'',
    bookName:'',
    author:''
  },
  getBookName(e){
    this.setData({
      bookName:e.detail.value
    })
  },
  getAuthor(e) {
    this.setData({
      author: e.detail.value
    })
  },
  getIsbn(e) {
    this.setData({
      isbn: e.detail.value
    })
  },
  add(){
    if(this.data.bookName==''){
      Toast("请输入书名")
      return
    }
    if(this.data.author==''){
      Toast("请输入作者")
      return
    }

    let that = this
    let date = new Date()
    let now = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        db.collection('bookApplication').add({
          data: {
            name:res.data.name,
            studentId: res.data.studentId,
            date: now,
            bookName: that.data.bookName,
            author:that.data.author,
            isbn: that.data.isbn
          }
        })
          .then(res => {
            Toast("添加成功")
          })
      }
    })
    
    
  }
})