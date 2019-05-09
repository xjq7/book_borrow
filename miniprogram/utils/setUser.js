const app = getApp()
function setUser(u){
  try {
    wx.setStorageSync('userInfo', {
      name: u.name,
      gender: u.gender,
      studentId: u.studentId,
      avatarUrl: u.avatarUrl,
      role: 2,
      _openid: u._openid,
      _id:u._id
    })
   
  } catch (e) { }
  app.globalData.userInfo = {
    name: u.name,
    studentId: u.studentId,
    role: 2,
    avatarUrl: u.avatarUrl,
    _openid: u._openid,
    _id: u._id
  }
  app.globalData.login = true
}
module.exports = setUser