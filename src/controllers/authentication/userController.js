const db = require('../../models')
const {ValidationError, UniqueConstraintError, Op} = require("sequelize");
const User = db.users
const {cloudinaryUloadImg, cloudinaryDeleteImg} = require("../../utils/cloudinary");
const {unlinkPromise} = require("../../utils/middlewares");
const asyncHandler = require("express-async-handler");
const Stripe = require("stripe");
const emailController = require('./emailController')

const addUser = async (req, res) => {
    if ([undefined, '', null].includes(req.body.image)) {
        delete req.body.image;
    }
    try {
        const user = await User.create(req.body)
        req.body.data = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            telephone: req.body.telephone_portable,
            to: req.body.email,
            from: req.body.email,
            subject: `Creation de votre compte Login : ${req.body.login}`,
            message: `Votre mot de passe est :  ${req.body.password}`,
        };
        req.body.service = 'add_user'
        emailController.sendEmail(req, res)
        res.json({msg: `Utilisateur ${req.body.login} ajouter avec success.`, entite: user})
    } catch (err) {
        if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
            const msg = err.message
            return res.status(400).json({msg, err})
        }
        const msg = `L'utilisateur n'a pas pu etre cree`
        res.status(500).json({msg, err})
    }

}
const getAllUsers = async (req, res) => {
    if (req.query.nom?.length < 2) {
        const msg = 'le terme doit contenir au minimum 2 caractres'
        return res.status(400).json({msg})
    }

    try {
        if (req.query.nom) {
            const {count, rows} = await User.findAndCountAll({
                where: {
                    nom: {[Op.like]: `%${req.query.nom}%`}
                },
                order: ['nom'],
                limit: Number(req.query.limit) || 3
            });
            res.json({msg: `il ya ${count} utilisateurs trouvées au terme (nom): '${req.query.nom}'`, rows})
        } else {
            const users = await User.findAll({
                // attributes: ['login', 'email', 'telephone_portable', 'password'],
                order: ['nom'],
                limit: Number(req.query.limit) || 1000
            })
            const msg = `Il y'a ${users.length} utilisateurs trouvés`
            res.send({msg, users})
        }

    } catch (err) {
        const msg = `Imposible de recuperer la liste des utilisateurs`;
        res.status(500).json({msg, err})
    }

}
const getOneUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByPk(id)
        if (user === null) {
            const msg = `L'utilisateur n'existe pas ( user_id : ${id})`
            res.status(404).json({msg})
        }
        res.json({msg: 'Un utilisateur a été trouvé. ', user})
    } catch (err) {
        const msg = `Imposible de recuperer l'utilisateur ( user_id : ${id}) `
        res.status(500).json({msg, err})
    }
}
const updateUser = async (req, res) => {
    const id = req.params.id
    try {
        await User.update(req.body, {where: {user_id: id}})
        const user = await User.findByPk(id)
        if (req.body.password) {
            req.body.data = {
                nom: req.body.nom,
                prenom: req.body.prenom,
                telephone: req.body.telephone_portable,
                to: req.body.email,
                from: req.body.email,
                subject: `Maj de votre compte Login : ${req.body.login}`,
                message: `Votre mot de passe est :  ${req.body.password}`,
            };
            req.body.service = 'update_password'
            emailController.sendEmail(req, res)
        }
        if (user === null) {
            const msg = `L'utilisateur n'existe pas ( user_id : ${id})`
            res.status(404).json({msg})
        } else {
            res.json({msg: `L'utilisateur ${req.body.nom} à été mis à jour avec success`, entite: user})
        }
    } catch (err) {
        if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
            const msg = err.message
            return res.status(400).json({msg, err})
        }
        const msg = `Impossible de modifier l'utilisateur (user_id : ${id})`
        res.status(500).json({msg, err})

    }
}
const deleteUser = async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id)
    if (user === null) {
        const msg = `L'utilisateur n'existe pas ( user_id : ${id})`
        res.status(404).json({msg})
    } else {
        await User.destroy({where: {user_id: id}})
        res.json({msg: `L'utilisateur ${req.body.nom} à été supprimer avec success`, user})
    }
}

const uploadImages = asyncHandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUloadImg(path, 'images');
        const files = req.files;
        const {path} = files[0];
        const lastPath = path.replace("images-", "1images-")
        const newpath = await uploader(lastPath);
        await unlinkPromise(lastPath)
        await unlinkPromise(path)
         return res.json({msg: `L'iage à été stocker avec success`, newpath})
    } catch (e) {
        throw new Error(e);
    }
});

const deleteImages = asyncHandler(async (req, res) => {
    const imageUrl = req.body.imageUrl
    try {
        let resp = await cloudinaryDeleteImg(imageUrl);
        return res.json(resp)
    } catch (e) {
        throw new Error(e);
    }
});
const paiement = asyncHandler(async (req, res) => {
        const articles = req.body.articles
        const Stripe = require('stripe')
        const stripe = Stripe('sk_test_51P1pAiDxlZZqry5gxqbqXKFXmcvxSoxnt8oIJQMcmGEla2ejDxdj0GeplJorSNLhmaQrVLTg3P5G6LpscYciQx3E000UZ5TMnJ')
        const line_items = articles?.map(a => {
            return {
                price_data: {
                    currency: "eur",
                    product_data: {
                        name: a.name,
                        images: a.images
                    },
                    unit_amount_decimal: a.unit_amount * 100,

                },
                quantity: a.quantity
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${req.body.url}success`,
            cancel_url: `${req.body.url}cancel_url`
        })
        res.json({msg: `L'url de paiement : `, url: session.url})
    })
;
module.exports = {
    addUser, getAllUsers, getOneUser, updateUser, deleteUser, uploadImages, deleteImages, paiement
}