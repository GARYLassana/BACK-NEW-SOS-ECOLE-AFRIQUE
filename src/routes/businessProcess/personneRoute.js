const personneController = require('../../controllers/businessProcess/personneController')
const router = require('express').Router()
router.post('/personnes', personneController.addPersonne)
router.delete('/personnes/:id', personneController.deletePersonne)
router.put('/personnes/:id', personneController.updatePersonne)
router.get('/personnes', personneController.getAllPersonne)
module.exports = router