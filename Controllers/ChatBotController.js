const chatResponse = require('../Models/ChatCompletions')

const get_chat_completions = async (req, res) => {
    const messages = req.body
    chatResponse(messages)
        .then(response => {
            console.log(response.data)
            return res.status(200).json(response.data.choices[0].message)
        })
        .catch(err => {
            return res.sendStatus(400)
        })
}

module.exports = {
    get_chat_completions
}