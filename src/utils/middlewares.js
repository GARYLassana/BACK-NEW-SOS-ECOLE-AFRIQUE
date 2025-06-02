const jwt = require('jsonwebtoken')
const privateKey = require('../../config/private_key')
let profil_type = ['ADMIN', 'SUPPER_ADMIN']
let privateDecodedToken = ''
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs")
const authenticate = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        const msg = `Pas de token fournis!`
        return res.status(401).json({msg})
    }
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, privateKey, (err, decodedToken) => {
        if (err) {
            const msg = `L'utilisateur est non autorisé a acceder a la ressource!`
            return res.status(401).json({msg, err})
        }
        const connected_id = decodedToken.user_id
        privateDecodedToken = decodedToken
        if (req.query.connected_id && req.query.connected_id !== connected_id) {
            const msg = `L'identifiant de l'utilisateur est invalid`
            return res.status(401).json({msg})
        } else {
            next()
        }
    })
}
const isAdmin = (req, res, next) => {
    profil_type = ['SUPPER_ADMIN', 'ADMIN']
    testProfil(req, res, next)
};
const testProfil = (req, res, next) => {
    if (!profil_type.includes(privateDecodedToken.profil_type)) {
        const msg = `L'utilisateur n'a pas les droits ${profil_type} pour accéder a la resource`
        return res.status(401).json({msg})
    } else {
        next()
    }
};
const isSupperAdmin = (req, res, next) => {
    profil_type = ['SUPPER_ADMIN']
    testProfil(req, res, next)
};
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpeg');
    }
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb({
            message: 'Unsupported file format'
        }, false)
    }
}
const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: {filedSize: 2000000}
})
const imgResize = async (req, res, next) => {
    if (!req.files) return next();
    const file = req.files[0];
    await sharp(file.path)
        .resize(300, 300)
        .toFormat('jpeg')
        .jpeg({quality: 90})
        .toFile(`./src/public/images/1${file.filename}`
        );
    next();
}
const unlinkPromise = async (path) =>
    await fs.unlink(path, (err) => {
        if (err) {
            const msg = `Impossible de supprimer le fichier : ${path}`
            console.log({msg, err})
        }
        console.log({msg: `L'image à été supprimer avec success`, path})
    });
module.exports = {authenticate, isAdmin, isSupperAdmin, uploadPhoto, imgResize, unlinkPromise}