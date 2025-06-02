module.exports = (sequelize, DataTypes) => {
    const Actualite = sequelize.define("actualite", {
        actualite_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {msg: 'L\'image de l\'actualité doit être de type url!'},
            }
        },
        titre: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Le titre de l\'actualité doit être unique!'
            },
            allowNull: false,
            validate: {
                notNull: {msg: 'Le titre de l\'actualité ne doit pas être null!'},
                notEmpty: {msg: 'Le titre de l\'actualité ne doit pas être vide!'}
            },
        },
        type: {
            type: DataTypes.STRING,
            notNull: {msg: 'Le type de l\'actualité ne doit pas être null!'},
            notEmpty: {msg: 'Le type de l\'actualité  ne doit contenir au moin 1 caractere!'},
            isactualitéValide(actualite) {
                if (!['VIDEO', 'IMAGE'].includes(actualite)) {
                    throw new Error('Le type de l\'actualité est incorrect, il doit être dans la liste  : [\'VIDEO\', \'IMAGE\'] )!')
                }
            }
        },
        lien: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {msg: 'Le lien de l\'actualité doit être de type url!'},
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date_actualite: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {msg: 'La date de l\'actualité ne doit pas être nulle!'},
                notEmpty: {msg: 'La date de l\'actualité ne doit pas être vide!'},
            }
        },
    })
    return Actualite
}