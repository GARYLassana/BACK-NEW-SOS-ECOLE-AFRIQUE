const {DataTypes, Sequelize} = require("sequelize");
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        club_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        civilite: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'La civilite de l\'utilisateur ne doit pas etre null!'},
                notEmpty: {msg: 'La civilite de l\'utilisateur ne doit contenir au moin 1 caractere!'},
                isCiviliteValide(civilite) {
                    if (!['Mr', 'Mlle', 'Mme'].includes(civilite)) {
                        throw new Error('La civilite de l\'utilisateur est incorrect, elle doit etre dans la liste  : [\'Mr\', \'Mlle\', \'Mme\'] )!')
                    }
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {msg: 'l\'image de l\'utilisateur doit etre de type url!'},
            }
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le login de l\'utilisateur doit etre unique!'
            },
            validate: {
                notNull: {msg: 'Le login de l\'utilisateur ne doit pas etre null!'},
                notEmpty: {msg: 'Le login de l\'utilisateur ne doit  contenir au moin 1 caractere!'},
                set(login) {
                    this.setDataValue('login', login.toUpperCase())
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le mot de passe de l\'utilisateur ne doit pas etre null!'},
                notEmpty: {msg: 'Le mot de passe de l\'utilisateur ne doit pas etre vide!'},
                isPasswordValide(password) {

                    var reg = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\\w\\s]).{8,30}$");
                    if (!reg.test(password)) {
                        throw new Error('Le mot de passe de l\'utilisateur doit contenir huit caractères minimum,' +
                            ' maximum 30 caractères,' +
                            ' au moins une lettre majuscule, une lettre minuscule,' +
                            ' un chiffre et un caractère spécial!')
                    }
                },
                async set(password) {
                    const passHached = await bcrypt.hash(password, 10)
                    this.setDataValue('password', passHached)
                }
            }
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le nom de l\'utilisateur ne doit pas etre null!'},
                notEmpty: {msg: 'Le nom de l\'utilisateur ne doit pas etre vide!'},
                set(nom) {
                    this.setDataValue('nom', nom.toUpperCase())
                }
            }
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le prenom de l\'utilisateur ne doit pas etre null!'},
                notEmpty: {msg: 'Le prenom de l\'utilisateur ne doit pas etre vide!'},
                set(prenom) {
                    prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1);
                    this.setDataValue('prenom', prenom)
                }
            }

        },
        profil_type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le type de profil ne doit pas etre null!'},
                notEmpty: {msg: 'Le type de profil ne doit pas etre vide!'},
                isProfilValide(profil) {
                    if (!['USER', 'ADMIN', 'SUPPER_ADMIN'].includes(profil)) {
                        throw new Error('Le type de profil de l\'utilisateur est incorrect, il doit etre dans la liste  : [\'USER\',\'ADMIN\', \'SUPPER_ADMIN\'] )!')
                    }
                }
            }
        },
        telephone_portable: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le telephone portable de l\'utilisateur doit etre unique!'
            },
            validate: {
                notNull: {msg: 'Le telephone portable de l\'utilisateur ne doit pas etre null'},
                notEmpty: {msg: 'Le telephone portable de l\'utilisateur ne doit pas etre vide'},
                isTelephoneValide(telephone) {
                    var reg = new RegExp("^((\\+)33|0|0033)[1-9](\\d{2}){4}$");
                    if (!reg.test(telephone)) {
                        throw new Error('Le telephone portable de l\'utilisateur est incorrect!')
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
                msg: 'Le Mail de l\'utilisateur doit etre unique!'
            },
            allowNull: false,
            validate: {
                isEmail: {msg: 'Veuillez introduire un email valide'},
                notNull: {msg: 'Le Mail de l\'utilisateur ne doit pas etre null'},
                notEmpty: {msg: 'Le Mail de l\'utilisateur ne doit pas etre vide'},
                isEmailValide(email) {
                    var reg = new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
                    if (!reg.test(email)) {
                        throw new Error(`L'email de l\'utilisateur est incorrect!`)
                    }
                },
                set(email) {
                    this.setDataValue('email', email.toUpperCase())
                }

            }
        }
    })
    return User
}