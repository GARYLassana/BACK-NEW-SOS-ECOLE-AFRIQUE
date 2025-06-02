const {DataTypes, Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Personne = sequelize.define("personne", {
        personne_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        civilite: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'La civilite de la personne ne doit pas être null!'},
                notEmpty: {msg: 'La civilite de la personne doit contenir au moins 1 caractère !'},
                isCiviliteValide(civilite) {
                    if (!['Mr', 'Mlle', 'Mme'].includes(civilite)) {
                        throw new Error('La civilité de la personne est incorrect, elle doit être dans la liste  : [\'Mr\', \'Mlle\', \'Mme\'] )!')
                    }
                }
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {msg: 'l\'image de la personne doit être de type url!'},
            }
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le nom de la personne ne doit pas être null!'},
                notEmpty: {msg: 'Le nom de la personne ne doit pas être vide!'},
                set(nom) {
                    this.setDataValue('nom', nom.toUpperCase())
                }
            }
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le prenom de la personne ne doit pas être null!'},
                notEmpty: {msg: 'Le prenom de la personne ne doit pas être vide!'},
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
                notNull: {msg: 'Le type du profil ne doit pas être null!'},
                notEmpty: {msg: 'Le type du profil ne doit pas être vide!'},
                isProfilValide(profil) {
                    if (!['JOUEUR', 'ARBITRE', 'EDUCATEUR'].includes(profil)) {
                        throw new Error('Le type du profil de la personne est incorrect, il doit être dans la liste  : [\'JOUEUR\',\'ARBITRE\', \'EDUCATEUR\'] )!')
                    }
                }
            }
        },
        telephone_portable: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Le Mail de la personne doit être unique!'
            },
            allowNull: false,
            validate: {
                isEmail: {msg: 'Veuillez introduire un email valide'},
                notNull: {msg: 'Le Mail de la personne ne doit pas être null'},
                notEmpty: {msg: 'Le Mail de la personne ne doit pas être vide'},
                isEmailValide(email) {
                    var reg = new RegExp("^\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$");
                    if (!reg.test(email)) {
                        throw new Error(`L'email de la personne est incorrect!`)
                    }
                },
                set(email) {
                    this.setDataValue('email', email.toUpperCase())
                }
            }
        },
        date_de_naissance: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {msg: 'L\'age ne doit pas être null!'},
                notEmpty: {msg: 'L\'age ne doit pas être vide!'},
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        annee_arrivee: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {msg: 'L\'année d\'arrivé ne doit pas être nulle!'},
                notEmpty: {msg: 'L\'année d\'arrivé ne doit pas être vide!'}
            }
        },
        taille: {
            type: DataTypes.STRING,
            allowNull: true
        },
        poste: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nombre_match: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        nombre_but: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        experience: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    })
    return Personne
}