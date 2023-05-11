const express = require('express')
const router = express.Router()
const ChatBotController = require('../Controllers/ChatBotController')

router.post('/chat', ChatBotController.get_chat_completions)

module.exports = router