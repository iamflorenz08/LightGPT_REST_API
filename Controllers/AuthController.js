const UserModel = require('../Models/UserModel')
const jwt = require('../Utils/JsonWebToken')
const bcrypt = require('bcrypt')

const post_sign_in = async (req, res) => {
    const username = req.body.username
    const raw_password = req.body.password
    try {
        const user = await UserModel.findOne({ username })
        if (!user) return res.status(400).json({})
        const isMatch = await bcrypt.compareSync(raw_password, user.password)
        if (!isMatch) return res.status(400).json({})
        const access_token = jwt.generate_access_token(user._id)
        return res.status(200).json({ access_token })
    }
    catch (e) {
        console.log(e.message)
        return res.status(400).json({})
    }
}

const post_sign_up = async (req, res) => {
    const username = req.body.username
    const raw_password = req.body.password
    try {
        const hashed_password = await bcrypt.hashSync(raw_password, 10)
        const user = await UserModel.create({
            username,
            password: hashed_password
        })
        if (!user) return res.status(400).json({})
        const access_token = jwt.generate_access_token(user._id)
        return res.status(200).json({ access_token })
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({})
    }

}

module.exports = {
    post_sign_in,
    post_sign_up
}