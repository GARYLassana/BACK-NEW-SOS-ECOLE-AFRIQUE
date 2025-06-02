module.exports = (sequelize, DataTypes) => {
    const ClubHistorique = sequelize.define("clubHistorique", {
        clubHistorique_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        blocName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        titre: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        contenu: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        classeName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        position: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    })
    return ClubHistorique;
}