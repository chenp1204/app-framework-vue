const baseSocketUrl = `ws://${location.host}/mfapi/ws`

// WebSocket默认接收消息处理
const onWsMessage = (event) => {
// eslint-disable-next-line no-console
  console.log(`ws接收数据：`, event.data)
}

// WebSocket默认错误处理
const onWsError = (event) => {
  // eslint-disable-next-line no-console
  console.log(`ws连接出错：`, event)
}

export default function (option, onmessage, onerror) {
  try {
    if (window.WebSocket) {
      if (option.url) {
        const ws = new WebSocket(`${baseSocketUrl}${option.url}`)
        ws.onopen = () => {
          if (ws.readyState === 1) {
            if (option.data) {
              ws.send(JSON.stringify(option.data))
            } else {
              ws.send('')
            }
          }
        }

        ws.onmessage = (typeof onmessage === 'function') ? onmessage : onWsMessage
        ws.onerror = (typeof onerror === 'function') ? onerror : onWsError
        return ws
      } else {
        throw new Error('缺少WebSocket地址或发送数据')
      }
    } else {
      throw new Error('当前浏览器不支持WebSocket')
    }
  } catch (err) {
    return null
  }
}
