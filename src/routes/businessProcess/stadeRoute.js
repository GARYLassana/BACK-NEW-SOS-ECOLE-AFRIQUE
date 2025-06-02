const stadeController = require('../../controllers/businessProcess/stadeController')
const {authenticate, isAdmin} = require('../../utils/middlewares')
const router = require('express').Router()
router.post('/stades', stadeController.addStade)
router.put('/stades/:id', stadeController.updateStade)
router.delete('/stades/:id', stadeController.deleteStade)
router.get('/stades', stadeController.getAllStade)
router.get('/stades/:id', stadeController.getOneStade)
module.exports = router