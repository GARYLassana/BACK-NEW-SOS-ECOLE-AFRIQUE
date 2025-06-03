const emailController = require('../controllers/emailController')
const router = require('express').Router()
router.post('/', emailController.sendEmail)
module.exports = router