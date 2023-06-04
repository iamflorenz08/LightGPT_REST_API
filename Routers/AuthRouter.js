const express = require('express')
const route = express.Router()
const AuthController = require('../Controllers/AuthController')

route.post('/sign-in', AuthController.post_sign_in)
route.post('/sign-up', AuthController.post_sign_up)

module.exports = route