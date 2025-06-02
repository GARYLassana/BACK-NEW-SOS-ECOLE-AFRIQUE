const emailController = require('../../controllers/authentication/emailController')
const router = require('express').Router()
router.post('/', emailController.sendEmail)
module.exports = router