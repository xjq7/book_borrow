import Toast from '../../vant/toast/toast';
const db = wx.cloud.database()
Page({
  data: {
    userInfo: {}
  },
  next() {
    let that = this
    try {
      const value = wx.getStorageSync('userInfo')
      if (value) {
        that.setData({
          userInfo: value
        })
      }
    } catch (e) { }
    Toast('切换成功!');
    db.collection('users').doc(that.data.userInfo._id).update({
      data: {
        role: 2
      },
      success(res) {
        try {
          wx.setStorageSync('userInfo', {
            name: that.data.userInfo.name,
            gender: that.data.userInfo.gender,
            studentId: that.data.userInfo.studentId,
            avatarUrl: that.data.userInfo.avatarUrl,
            role: 2
          })
        } catch (e) { }
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})