module.exports = (sequelize, DataTypes) => {
    const Rencontre = sequelize.define("rencontre", {
        rencontre_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date_rencontre: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notNull: {msg: 'La rencontre du match ne doit pas être null!'},
                notEmpty: {msg: 'La rencontre du match ne doit pas être vide!'},
            }
        },
        nombre_but_recevante: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        nombre_but_equipe_visiteuse: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        rencontre_jouer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        date_rencontre_modifier: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        journee: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        saison: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {msg: 'La saison ne doit pas être nulle!'},
                notEmpty: {msg: 'La saison ne doit pas être vide!'},

                isSaisonValide(code) {
                    if (!(code.toString().length === 4 && code >= 2023 && code <= 2223)) {
                        throw new Error(`La saison est incorrect!`)
                    }
                },
            }
        },


    }, {
        indexes: [
            {
                name: 'uniq_rencontre_saison',
                fields: ['competition_id', 'club_id_equipe_recevante', 'club_id_equipe_visiteuse', 'saison'],
                unique : {msg : 'test'},

            }
        ]
    })
    return Rencontre
}