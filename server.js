require('dotenv').config()
const helmet = require('helmet')
const express = require('express')
const mongoose = require('mongoose')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 5000
const ChatBotRouter = require('./Routers/ChatBotRouter')
const AuthRouter = require('./Routers/AuthRouter')
const ProfileRouter = require('./Routers/ProfileRouter')
const VerifyToken = require('./Middlewares/VerifyToken')

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to PORT ${PORT}`)
            axios.post('https://api.pawan.krd/resetip', null, {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_KEY}`
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                })
        })
    })
    .catch(err => console.log(err.message))


app.use(express.json())
app.use(helmet())
app.use('/api/v1/auth', AuthRouter)
app.use(VerifyToken.access_token)
app.use('/api/v1/bot', ChatBotRouter)
app.use('/api/v1/user', ProfileRouter)

