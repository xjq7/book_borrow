const app = getApp();
import Toast from '../../vant/toast/toast';
const setUser = require('../../utils/setUser.js');
const db = wx.cloud.database();
Page({
  data: {
    userInfo: app.globalData.userInfo,
    login: app.globalData.login,
  },
  login(e) {
    let that = this;
    const u = e.detail.userInfo
    wx.cloud
      .callFunction({
        name: 'get_openID',
      })
      .then((res) => {
        let { OPENID } = res.result;
        wx.cloud
          .callFunction({
            name: 'login',
            data: {
              openid: OPENID,
            },
          })
          .then((res) => {
            let u1 = res.result.data[0]
            if (res.result.data.length > 0) {
              that.setData({
                userInfo: u1,
                login: true,
              });
              setUser(u1);
              app.globalData.userInfo = {
                name: u1.name,
                studentId: u1.studentId,
                role: 2,
                avatarUrl: u1.avatarUrl,
                _openid: u1._openid,
                _id: u1._id,
              };
              app.globalData.login = true;
            } else {
              wx.navigateTo({
                url: `../../pages/login/login?gender=${u.gender}&avatarUrl=${u.avatarUrl}`,
              });
            }
          });
      });
  },
  setting() {
    if (!app.globalData.login) {
      Toast('请先登录!!!');
      return;
    }
    wx.navigateTo({
      url: `../../pages/setting/setting?id=${this.data.userInfo._id}`,
    });
  },
  adminSetting() {
    if (!app.globalData.login) {
      Toast('请先登录!!!');
      return;
    }
    wx.navigateTo({
      url: `../../pages/adminSetting/adminSetting?id=${this.data.userInfo._id}`,
    });
  },
  borrowRecord() {
    if (!app.globalData.login) {
      Toast('请先登录!!!');
      return;
    }
    wx.navigateTo({
      url: '../../pages/borrowRecord/borrowRecord',
    });
  },
});
