const controller = require('../../controllers/businessProcess/partenaireController')
const {authenticate, isAdmin} = require('../../utils/middlewares')
const router = require('express').Router()
const page = '/partenaires/'
router.post(page, controller.add)
router.put(`${page}:id`, controller.update)
router.delete(`${page}:id`, controller.remove)
router.get(page, controller.getAll)
router.get(`${page}:id`, controller.getOne)
module.exports = router