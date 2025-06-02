const {DataTypes, Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Partenaire = sequelize.define("partenaire", {
        partenaire_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {msg: 'l\'image du partenaire doit être de type url!'},
            }
        },
        url_site_web: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {msg: 'l\'url de site web du partenaire doit être de type url!'},
            }
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le nom du partenaire doit pas être null!'},
                notEmpty: {msg: 'Le nom du partenaire ne doit pas être vide!'},
                set(nom) {
                    this.setDataValue('nom', nom.toUpperCase())
                }
            }
        },
        telephone_portable: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le telephone portable du partenaire doit être unique!'
            },
            validate: {
                notNull: {msg: 'Le telephone portable du partenaire ne doit pas être null'},
                notEmpty: {msg: 'Le telephone portable du partenaire ne doit pas être vide'},
                isTelephoneValide(telephone) {
                    var reg = new RegExp("^((\\+)33|0|0033)[1-9](\\d{2}){4}$");
                    if (!reg.test(telephone)) {
                        throw new Error('Le telephone portable du partenaire est incorrect!')
                    }
                },
                set(telephone) {
                    const diff = telephone.length - 8;
                    this.setDataValue('telephone_portable', '+33' + telephone.slice(diff - 1, telephone.length))
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Le Mail du partenaire doit être unique!'
            },
            allowNull: false,
            validate: {
                isEmail: {msg: 'Veuillez inscrire un email valide'},
                notNull: {msg: 'Le Mail du partenaire ne doit pas être null'},
                notEmpty: {msg: 'Le Mail du partenaire ne doit pas être vide'},
                isEmailValide(email) {
                    var reg = new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
                    if (!reg.test(email)) {
                        throw new Error(`L'email du partenaire est incorrect!`)
                    }
                },
                set(email) {
                    this.setDataValue('email', email.toUpperCase())
                }
            }
        },

        adresse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'L\'adresse du partenaire ne doit pas être nulle!'},
                notEmpty: {msg: 'L\'adresse du partenaire ne doit pas être vide!'}
            }
        },
        ville: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'La ville du partenaire ne doit pas être nulle!'},
                notEmpty: {msg: 'La ville du partenaire ne doit pas être vide!'}
            }
        },
        code_postal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le code postal du partenaire ne doit pas être null!'},
                notEmpty: {msg: 'Le code postal du partenaire ne doit pas être vide!'},

                isCodePostalValide(code) {
                    if (!(code.toString().length === 5 && code > 0 && code < 99999)) {
                        throw new Error(`Le code postal du partenaire est incorrect!`)
                    }
                },
            }
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {msg: 'La description de partenaire ne doit pas être nulle!'},
                notEmpty: {msg: 'La description de partenaire ne doit pas être vide!'}
            }
        },
        annee_arrivee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {msg: 'L\'année d\'arrivé du partenaire ne doit pas être nulle!'},
                notEmpty: {msg: 'L\'année d\'arrivé du partenaire ne doit pas être vide!'}
            }
        },
        
    })
    return Partenaire
}