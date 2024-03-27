//这里统一管理所有接口
import request from '../utils/request'

export const chat_gpt = (params, headers) => {
    return request.post('/v1/chat/completions', params, { headers })
}
