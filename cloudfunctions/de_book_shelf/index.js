const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection("book_shelf").where({
    type: '0',
    _openid: wxContext.OPENID
  }).remove()
}