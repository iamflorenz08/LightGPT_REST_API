require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
    basePath: process.env.BASE_PATH,
})

const openai = new OpenAIApi(configuration);

const response = (message_body) => {
    const messages = [
        {
            role: "system",
            content: "My name is MiAi and I am very helpful assistant."
        },
        ...message_body
    ]

    return openai.createChatCompletion({
        model: "koala-13b",
        messages
    })
}

module.exports = response