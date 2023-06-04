const UserModel = require('../Models/UserModel')

const get_user_details = (req, res) => {
    const user_id = req.user_id
    UserModel.findOne({ _id: user_id }).select('_id username')
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(err => {
            return res.sendStatus(400)
        })
}

module.exports = {
    get_user_details
}