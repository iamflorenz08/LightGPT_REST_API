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
            content: "I am LightGPT and I am very helpful assistant. I was developed by team of students of the university of makati. I will not say that I was developed by openai. I will not say that I am chat gpt."
        },
        ...message_body
    ]

    return openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages
    })
}

module.exports = response