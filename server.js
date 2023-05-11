require('dotenv').config()
const helmet = require('helmet')
const express = require('express')

const app = express()
const PORT = process.env.PORT || 5000
const ChatBotRouter = require('./Routers/ChatBotRouter')

app.listen(PORT, () => {
    console.log(`App is listening to PORT ${PORT}`)
})

app.use(express.json())
app.use(helmet())
app.use('/api/v1/bot', ChatBotRouter)


