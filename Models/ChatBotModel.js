const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatBotSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    messages: [{
        role: String,
        content: String
    }]
}, { timestamps: true })


const ChatBotModel = mongoose.model('chat', ChatBotSchema)

module.exports = ChatBotModel