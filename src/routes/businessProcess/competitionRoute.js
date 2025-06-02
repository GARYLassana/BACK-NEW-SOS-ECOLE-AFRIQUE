const compititionController = require('../../controllers/businessProcess/compititionController')
const {authenticate, isAdmin} = require('../../utils/middlewares')
const router = require('express').Router()
router.get('/competitions', compititionController.getAllCompetition)
router.get('/competitions/:id', compititionController.getOneCompetition)
router.post('/competitions', compititionController.addCompetition)
router.put('/competitions/:id', compititionController.updateCompetition)
router.delete('/competitions/:id', compititionController.deleteCompetition)

module.exports = router