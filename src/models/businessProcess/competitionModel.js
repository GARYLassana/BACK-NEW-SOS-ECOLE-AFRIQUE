module.exports = (sequelize, DataTypes) => {
    const Competition = sequelize.define("competition", {
        competition_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'Le nom de la compétition ne doit pas être null!'},
                notEmpty: {msg: 'Le nom de la compétition ne doit pas être vide!'}
            }
        },
        nom_abreviation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: 'L\'abreviation de la compétition ne doit pas être nulle!'},
                notEmpty: {msg: 'L\'abreviation de la compétition ne doit pas être vide!'}
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        }
    })
    return Competition
}