const cloud = require('wx-server-sdk')
// 或者传入自定义配置
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  return await db.collection('users').where({
    _openid: event.openid
  }).get().catch()
}