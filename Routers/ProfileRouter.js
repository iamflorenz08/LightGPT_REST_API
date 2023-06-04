const express = require('express')
const router = express.Router()
const ProfileController = require('../Controllers/ProfileController')

router.get('/details', ProfileController.get_user_details)

module.exports = router