const JsonWebToken = require('../Utils/JsonWebToken')

const access_token = (req, res, next) => {
    const auth_header = req.headers['authorization']
    const access_token = auth_header && auth_header.split(' ')[1]
    if (!access_token) return res.status(401).json({})
    const decoded = JsonWebToken.verify_access_token(access_token)
    if (!decoded) return res.status(401).json({})
    req.user_id = decoded._id
    next()
}

module.exports = {
    access_token
}