import { ref, onMounted } from 'vue'
import { chat_gpt } from '../api/index'
import { ElMessage } from 'element-plus'
import useChatStore from '../store/chat'

export default function useChatGPT() {
    //定义初始化数据
    const model = 'gpt-3.5-turbo'
    const msg = ref('') //问
    const info = ref([]) //答
    const chatStore = useChatStore()

    const sendmsg = async () => {
        if (msg.value.length === 0) {
            return ElMessage.error('不能发送空消息！')
        }

        const entry = {
            timestamp: Date.now(),
            content: msg.value,
            is_robot: false
        }
        info.value.push(entry)
        //localStorage.setItem('chatHistory', JSON.stringify(info.value))
        chatStore.setChatHistory(JSON.stringify(info.value))

        const data = {
            model: model,
            messages: [
                { role: 'user', content: msg.value }
            ],
            temperature: 0.7, //控制回答的确定性和创造性
        }
        const headers = {
            'Authorization': 'Bearer ' + import.meta.env.VITE_CHATGPT_API_KEY,
            'info-Type': 'application/json'
        }
        await chat_gpt(data, headers).then(res => {
            console.log(res)
            const result = res
            if(result.choices) {
                const entry = {
                    timestamp: Date.now(),
                    content: result.choices[0].message.content,
                    is_robot: result.choices[0].message.role == 'assistant' ? true : false
                }
                info.value.push(entry)
                //localStorage.setItem('chatHistory', JSON.stringify(info.value))
                chatStore.setChatHistory(JSON.stringify(info.value))
            }
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        })
        msg.value = '';//清空输入框
    }

    onMounted(() => {
        //const chatHistory = localStorage.getItem('chatHistory')
        const chatHistory = chatStore.chatHistory
        if (chatHistory) {
            info.value = JSON.parse(chatHistory);
        }
    })
    
    return {
        msg,
        sendmsg,
        info
    }
}