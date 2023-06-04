const express = require('express')
const router = express.Router()
const ChatBotController = require('../Controllers/ChatBotController')

router.get('/messages', ChatBotController.get_messages)
router.get('/conversations', ChatBotController.get_conversations)
router.delete('/conversations', ChatBotController.delete_conversation)
router.post('/chat', ChatBotController.post_chat_completions)

module.exports = router