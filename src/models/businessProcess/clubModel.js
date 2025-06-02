module.exports = (sequelize, DataTypes) => {
    const Club = sequelize.define("club", {
        club_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {msg: 'Le logo du club doit être de type url!'},
            }
        },
        nom: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Le nom du club doit être unique!'
            },
            allowNull: false,
            validate: {
                notNull: {msg: 'Le nom du club ne doit pas être null!'},
                notEmpty: {msg: 'Le nom du club ne doit pas être vide!'}
            }
        },
        biographie: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: {
                msg: 'Le téléphone du club doit être unique!'
            },
            validate: {
                isTelephoneValide(telephone) {
                    //0652555555 - 0033652555555 - +33652555555
                    var reg = new RegExp("^((\\+)33|0|0033)[1-9](\\d{2}){4}$");
                    if (!reg.test(telephone)) {
                        throw new Error('Le téléphone portable de l\'utilisateur est incorrect!')
                    }
                },
                set(telephone) {
                    if (![null, undefined].includes(telephone)) {
                        const diff = telephone.length - 8;
                        this.setDataValue('téléphone', '+33' + telephone.slice(diff - 1, telephone.length))
                    }
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Le Mail du club doit être unique!'
            },
            allowNull: false,
            validate: {
                isEmail: {msg: 'Veuillez inscrire un email valide'},
                notNull: {msg: 'Le Mail du club ne doit pas être null'},
                notEmpty: {msg: 'Le Mail du club ne doit pas être vide'},
                isEmailValide(email) {
                    var reg = new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
                    if (!reg.test(email)) {
                        throw new Error(`Le Mail du club est incorrect!`)
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
                notNull: {msg: 'L\'adresse du club ne doit pas être null!'},
                notEmpty: {msg: 'L\'adresse club ne doit pas être vide!'}
            }
        },
        ville: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'La ville du club ne doit pas être nulle!'},
                notEmpty: {msg: 'La ville du club ne doit pas être vide!'}
            }
        },
        code_postal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le code postal du club ne doit pas être null!'},
                notEmpty: {msg: 'Le code postal du club ne doit pas être vide!'},

                isCodePostalValide(code) {
                    if (!(code.toString().length === 5 && code > 0 && code < 99999)) {
                        throw new Error(`Le code postal du club est incorrect!`)
                    }
                },
            }
        }
    })
    return Club
}