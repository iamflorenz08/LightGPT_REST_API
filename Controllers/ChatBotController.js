const chatResponse = require('../Models/ChatCompletions')
const ChatBotModel = require('../Models/ChatBotModel')

const post_chat_completions = async (req, res) => {
    let conversation_id = req.body._id
    const messages = req.body.messages
    const creator = req.user_id
    if (!conversation_id) {
        const create_topic = [
            {
                content: `create a very short precise title for [${messages[0].content}]`,
                role: 'user'
            }
        ]
        try {
            const topic_title = await chatResponse(create_topic)
            const create_chat = await ChatBotModel.create({
                creator,
                title: topic_title.data.choices[0].message.content.replace(/"/g, '')
            })
            if (!create_chat) return res.status(400).json({})
            conversation_id = create_chat._id
        }
        catch (e) {
            console.log(1, e.message)
            return res.status(400).json({})
        }
    }

    try {
        const bot_response = await chatResponse(messages)
        const merge_response = [messages[messages.length - 1], bot_response.data.choices[0].message]
        const update_chat_array = await ChatBotModel.findOneAndUpdate({ _id: conversation_id }, { $push: { messages: merge_response } }).select('_id title')
        if (!update_chat_array) return res.status(400).json({})
        return res.status(200).json({ _id: update_chat_array._id, title: update_chat_array.title, messages: [bot_response.data.choices[0].message] })
    } catch (e) {
        console.log(2, e.message)
        return res.status(400).json({})
    }
}


const get_conversations = (req, res) => {
    const creator = req.user_id
    
    ChatBotModel.find({ creator }).sort({ createdAt: -1 })
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(err => {
            console.log("get_conversations", err)
            return res.status(400).json({})
        })
}

const delete_conversation = (req, res) => {
    const creator = req.user_id
    const conversation_id = req.query.id

    ChatBotModel.findOneAndDelete({ _id: conversation_id, creator })
        .then(response => {
            return res.sendStatus(200)
        })
        .catch(err => {
            return res.sendStatus(400)
        })
}

const get_messages = async (req, res) => {
    const creator = req.user_id
    const conversation_id = req.query.id
    try {
        const chat_model = await ChatBotModel.findOne({ _id: conversation_id, creator }).select('messages')
        return res.status(200).json(chat_model.messages)
    } catch (e) {
        return res.status(400).json({})
    }
}

module.exports = {
    post_chat_completions,
    get_conversations,
    get_messages,
    delete_conversation
}