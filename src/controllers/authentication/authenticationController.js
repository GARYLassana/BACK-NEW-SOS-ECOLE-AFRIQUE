const db = require('../../models')
const {Op} = require("sequelize");
const User = db.users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const privateKey = require('../../../config/private_key')
const emailController = require("./emailController");
const Club = db.clubs
const login = async (req, res) => {
    let login = req.body.login?.trim()?.toUpperCase()
    var reg = new RegExp("^((\\+)33|0|0033)[0-9](\\d{2}){4}$");
    if (reg.test(login)) {
        login = login.slice(login.length - 9, login.length)
    }
    login = `%${login}%`;
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{
                    login: {
                        [Op.like]: login
                    }
                },
                    {
                        email: {
                            [Op.like]: login
                        }
                    }, {
                        telephone_portable: {
                            [Op.like]: login
                        }
                    }
                ]
            }
        })
        if (!user) {
            const msg = `l'utilisateur n'existe pas!`
            return res.status(404).json({msg})
        } else {
            const isEqual = await bcrypt.compare(req.body.password?.trim(), user.dataValues.password);
            if (isEqual) {
                const token = jwt.sign({
                    user_id: user.dataValues.user_id,
                    profil_type: user.dataValues.profil_type
                }, privateKey, {expiresIn: '24h'})
                const msg = `L'utilisateur ${user.prenom} ${user.nom} est connecté avec succees`
                res.json({msg, user, token})
            } else {
                const msg = `Mot de passe incorrect`
                return res.status(401).json({msg})
            }

        }
    } catch (err) {
        const msg = `L'utilisateur n'a pas pu etre recuperer !`
        res.status(500).json({msg, err})
    }

}
const reset = async (req, res) => {
    let login = req.body.login?.trim()?.toUpperCase()
    var reg = new RegExp("^((\\+)33|0|0033)[0-9](\\d{2}){4}$");
    if (reg.test(login)) {
        login = login.slice(login.length - 9, login.length)
    }
    login = `%${login}%`;
    try {
        const user = await User.findOne({
            where: {
                [Op.or]: [{
                    login: {
                        [Op.like]: login
                    }
                },
                    {
                        email: {
                            [Op.like]: login
                        }
                    }, {
                        telephone_portable: {
                            [Op.like]: login
                        }
                    }
                ]
            }
        })
        if (!user) {
            const msg = `l'utilisateur n'existe pas`
            return res.status(404).json({msg})
        } else {
            try {
                delete req.body.login
                const user_id = user.dataValues.user_id
                await User.update(req.body, {where: {user_id}})
                req.body.data = {
                    nom: user.nom,
                    prenom: user.prenom,
                    telephone: user.telephone_portable,
                    to: user.email,
                    from: user.email,
                    subject: `Modification du mot de passe pour le Login : ${req.body.login}`,
                    message: `Votre mot de passe est :  ${req.body.password}`,
                };
                req.body.service = 'update_password'
                emailController.sendEmail(req, res)
                res.json({msg: `Le mot de passe du ${req.body.login} à été mis à jour avec success`})
            } catch (e) {
                const msg = `Le mot de passe n\'a pas pu etre mis a jour !`
                res.status(500).json({msg, err})
            }

        }
    } catch (err) {
        const msg = `L'utilisateur n'a pas pu etre recuperer !`
        res.status(500).json({msg, err})
    }

}
module.exports = {
    login, reset
}