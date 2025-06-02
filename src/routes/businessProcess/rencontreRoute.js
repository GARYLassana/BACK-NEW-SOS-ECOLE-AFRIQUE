const rencontreController = require('../../controllers/businessProcess/rencontreController')
const {authenticate, isAdmin} = require('../../utils/middlewares')
const router = require('express').Router()
router.post('/rencontres', rencontreController.addRencontre)
router.put('/rencontres/:id', rencontreController.updateRencontre)
router.delete('/rencontres/:id', rencontreController.deleteRencontre)
router.get('/rencontres', rencontreController.getAllRencontre)
router.get('/rencontres/:id', rencontreController.getOneRencontre)
router.get('/rencontres/getClassementRencontres/:id', rencontreController.getClassementRencontres)

module.exports = router