import Toast from '../../vant/toast/toast';

Page({
  data: {
    bookInfo:{}
  },
  onLoad: function (options) {
    this.setData({
      bookInfo: JSON.parse(options.info)
    })
  }
})