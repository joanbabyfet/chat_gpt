<template>
    <div class="chatContent" ref="chatBox">
      <ul>
        <li v-for="(item, index) in info" :key="index" :class="[item.is_robot ? 'left' : 'right']">
          <span>{{ item.content }} <small>{{ formatDate(item.timestamp) }}</small></span>
        </li>
      </ul>
    </div>
    <div class="sendBox">
        <el-input v-model="msg" placeholder="输入内容" class="input-with-select">
            <template #append>
                <el-button type="primary" @click="sendmsg">发送</el-button>
            </template>
        </el-input>
    </div>
</template>

<script setup>
import useChatGPT from '@/composables/useChatGPT'

const { msg, sendmsg, info, formatDate } = useChatGPT()
</script>

<style scoped>
.chatContent {
  height: 535px;
  overflow-x: hidden;
}

ul {
  list-style: none;
  padding: 20px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}

li.left {
  margin-right: 20px;
}

li.left span {
  display: inline-block;
  border-radius: 0 15px 15px;
  background-color: rgba(66, 196, 240, 0.1);
  padding: 10px 15px;
}

li.right {
  margin-left: 20px;
  text-align: right;
}

li.right span {
  display: inline-block;
  border-radius: 15px 0 15px 15px;
  background-color: rgba(73, 154, 41, 0.1);
  padding: 10px 15px;
}

li+li {
  margin-top: 20px;
}

.ql-container.ql-snow {
  border: 0;
}

.ql-editor {
  padding: 0;
}
</style>