// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case 'sendTemplateMessage': {
      return sendTemplateMessage(event)
    }
    case 'getWXACode': {
      return getWXACode(event)
    }
    default: {
      return
    }
  }
}

async function sendTemplateMessage(event) {
  const { OPENID } = cloud.getWXContext()

  // 接下来将新增模板、发送模板消息、然后删除模板
  // 注意：新增模板然后再删除并不是建议的做法，此处只是为了演示，模板 ID 应在添加后保存起来后续使用
  const addResult = await cloud.openapi.templateMessage.addTemplate({
    id: 'AT0002',
    keywordIdList: [3, 4, 5]
  })

  const templateId = addResult.result.templateId

  const sendResult = await cloud.openapi.templateMessage.send({
    touser: OPENID,
    templateId,
    formId: event.formId,
    page: 'pages/openapi/openapi',
    data: {
      keyword1: {
        value: '未名咖啡屋',
      },
      keyword2: {
        value: '2019 年 1 月 1 日',
      },
      keyword3: {
        value: '拿铁',
      },
    }
  })

  await cloud.openapi.templateMessage.deleteTemplate({
    templateId,
  })

  return sendResult
}

async function getWXACode(event) {
  const { result } = await cloud.openapi.wxacode.getUnlimited({
    scene: 'x=1',
  })
  return `data:${result.contentType};base64,${result.buffer.toString('base64')}`
}
