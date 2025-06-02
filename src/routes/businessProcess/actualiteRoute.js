const actualiteController = require('../../controllers/businessProcess/actualiteController')
const router = require('express').Router()
router.post('/actualites', actualiteController.addActualite)
router.put('/actualites/:id', actualiteController.updateActualite)
router.delete('/actualites/:id', actualiteController.deleteActualite)
router.get('/actualites', actualiteController.getAllActualite)
router.get('/actualites/:id', actualiteController.getOneActualite)
module.exports = router