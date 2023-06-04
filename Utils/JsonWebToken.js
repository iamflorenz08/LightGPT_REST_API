require('dotenv').config()
const jwt = require('jsonwebtoken')


const generate_access_token = (_id) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN, { expiresIn: '7d' })
}

const verify_access_token = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        return decoded
    }
    catch (e) {
        return false
    }
}


module.exports = {
    generate_access_token,
    verify_access_token
}