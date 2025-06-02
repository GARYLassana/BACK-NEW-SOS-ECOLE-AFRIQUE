const userController = require('../../controllers/authentication/userController')
const emailController = require('../../controllers/authentication/emailController')
const authenticationController = require('../../controllers/authentication/authenticationController')
const {authenticate, isSupperAdmin, uploadPhoto, imgResize} = require("../../utils/middlewares")
const {uploadImages} = require("../../controllers/authentication/userController");
const router = require('express').Router()
/**
 * @swagger
 * /api/users:
 *  get:
 *   summary : Recuperation de la liste des utilisateurs.
 *   description: recuperation de la liste des utilisateurs de la base par le supper admin
 *   responses :
 *      200 :
 *          description: Une liste d'utilisateurs existe dans la base et que je suis connecter comme super admin
 *      400 :
 *          description: Le terme doit contenir au minimum 2 caractres
 *      500 :
 *          description: Imposible de recuperer la liste des utilisateurs
 */
router.get('/users', authenticate, isSupperAdmin, userController.getAllUsers)
router.get('/users/:id', authenticate, isSupperAdmin, userController.getOneUser)
router.post('/users', authenticate, isSupperAdmin, userController.addUser)
router.put('/users/:id', authenticate, isSupperAdmin, userController.updateUser)
router.delete('/users/:id', authenticate, isSupperAdmin, userController.deleteUser)
router.post('/users/login', authenticationController.login)
router.post('/users/reset', authenticationController.reset)
router.post('/users/sendEmail', emailController.sendEmail)
router.put("/upload", uploadPhoto.array("images", 10), imgResize, uploadImages);
router.post("/destroy", userController.deleteImages);
router.post("/paiement", userController.paiement);
module.exports = router