module.exports = (sequelize, DataTypes) => {
    const Stade = sequelize.define("stade", {
        stade_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            unique: {
                msg: 'Le nom du stade doit être unique!'
            },
            allowNull: false,
            validate: {
                notNull: {msg: 'Le nom du stade ne doit pas être null!'},
                notEmpty: {msg: 'Le nom du stade ne doit pas être vide!'}
            }
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'L\'adresse du stade ne doit pas être null!'},
                notEmpty: {msg: 'L\'adresse du stade ne doit pas être vide!'}
            }
        },
        ville: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'La ville du stade ne doit pas être nulle!'},
                notEmpty: {msg: 'La ville du stade ne doit pas être vide!'}
            }
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: {msg: 'l\image du stade doit être de type url!'},
            }
        },
        code_postal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le code  postal du stade ne doit pas être null!'},
                notEmpty: {msg: 'Le code postal du stade ne doit pas être vide!'},

                isCodePostalValide(code) {
                    if (!(code.toString().length === 5 && code > 0 && code < 99999)) {
                        throw new Error(`Le code postal du stade est incorrect!`)
                    }
                },
            }
        }
    })
    return Stade
}