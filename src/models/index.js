const dbConfig = require('../../config/dbConfig')
const {Sequelize, DataTypes} = require('sequelize')
const UserModel = require('./authentication/userModel')
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        },
        typeCast: function (field, next) { // for reading from database
            if (field.type === 'DATETIME') {
                return field.string();
            }
            return next();
        },
        timezone: 'Europe/Paris',
    }
)
sequelize.authenticate().then(_ => {
    console.log('La connexion à la bdd est effectuée avec succès')
}).catch(err => {
    console.log('Error', err)
})
const db = {
    sequelize,
    Sequelize,
    users: require('./authentication/userModel')(sequelize, DataTypes),
    personnes: require('./businessProcess/personneModel')(sequelize, DataTypes),
    clubs: require('./businessProcess/clubModel')(sequelize, DataTypes),
    clubHistoriqueModel: require('./businessProcess/clubHistoriqueModel')(sequelize, DataTypes),
    stades: require('./businessProcess/stadeModel')(sequelize, DataTypes),
    competitions: require('./businessProcess/competitionModel')(sequelize, DataTypes),
    rencontres: require('./businessProcess/rencontreModel')(sequelize, DataTypes),
    actualites: require('./businessProcess/actualiteModel')(sequelize, DataTypes),
    partenaires: require('./businessProcess/partenaireModel')(sequelize, DataTypes)
}
db.sequelize.sync({alter: true}).then(_ => {
        const User = UserModel(sequelize, DataTypes)
        /* User.create({
             "login": "supper",
             "password": "Supper@1",
             "nom": "n_supper",
             "prenom": "p_supper",
             "telephone_portable": "0700000000",
             "profil_type": "SUPPER_ADMIN",
             "email": "super@gmail.com",
             "civilite": "Mr"
         }).then(user => {
             console.log('yes re-sync done!')
         })*/
    }
)
//relation entre stade et rencontre
db.stades.hasMany(db.rencontres, {
    foreignKey: {name: 'stade_id', allowNull: false},
    as: 'competition_',
    onDelete: 'CASCADE'

})
db.rencontres.belongsTo(db.stades, {
    foreignKey: {name: 'stade_id', allowNull: false},
    as: 'stadeInformation',
    onDelete: 'CASCADE'
})

//relation entre competition et rencontre
db.competitions.hasMany(db.rencontres, {
    foreignKey: {name: 'competition_id', allowNull: false},
    as: 'competition',
    onDelete: 'CASCADE'

})
db.rencontres.belongsTo(db.competitions, {
    foreignKey: {name: 'competition_id', allowNull: false},
    as: 'competitionInformation',
    onDelete: 'CASCADE'
})


//relation entre et club et rencontre => equipe_recevante
db.clubs.hasMany(db.rencontres, {
    foreignKey: {name: 'club_id_equipe_recevante', allowNull: false},
    as: 'rencontre_equipe_recevante',
    onDelete: 'CASCADE'
})
db.rencontres.belongsTo(db.clubs, {
    foreignKey: {name: 'club_id_equipe_recevante', allowNull: false},
    as: 'equipe_recevante',
    onDelete: 'CASCADE'
})
//relation entre et club et rencontre => equipe_visiteuse
db.clubs.hasMany(db.rencontres, {
    foreignKey: {name: 'club_id_equipe_visiteuse', allowNull: false},
    as: 'rencontre_equipe_visiteuse',
    onDelete: 'CASCADE'
})

db.rencontres.belongsTo(db.clubs, {
    foreignKey: {name: 'club_id_equipe_visiteuse', allowNull: false},
    as: 'equipe_visiteuse',
    onDelete: 'CASCADE'
}),
    //relation entre competition et rencontre
    db.competitions.hasMany(db.personnes, {
        foreignKey: {name: 'competition_id', allowNull: false},
        as: 'division',
        onDelete: 'CASCADE'
    })
db.personnes.belongsTo(db.competitions, {
    foreignKey: {name: 'competition_id', allowNull: false},
    as: 'divisionInformation',
    onDelete: 'CASCADE'
})

//relation entre competition et rencontre
db.competitions.hasMany(db.clubs, {
    foreignKey: {name: 'competition_id', allowNull: false},
    as: 'competitionclub',
    onDelete: 'CASCADE'
})
db.clubs.belongsTo(db.competitions, {
    foreignKey: {name: 'competition_id', allowNull: false},
    as: 'competitionclubInformation',
    onDelete: 'CASCADE'
})
//relation entre actualité et club
db.clubs.hasMany(db.actualites, {
    foreignKey: {name: 'club_id', allowNull: false},
    as: 'clubActualite',
    onDelete: 'CASCADE'

})
db.actualites.belongsTo(db.clubs, {
    foreignKey: {name: 'club_id', allowNull: false},
    as: 'actualiteClub',
    onDelete: 'CASCADE'
})

//relation entre effectifs et club
db.clubs.hasMany(db.personnes, {
    foreignKey: {name: 'club_id', allowNull: false},
    as: 'clubPersonne',
    onDelete: 'CASCADE'

})
db.personnes.belongsTo(db.clubs, {
    foreignKey: {name: 'club_id', allowNull: false},
    as: 'personneClub',
    onDelete: 'CASCADE'
})

//relation entre effectifs et club
db.clubs.hasMany(db.partenaires, {
    foreignKey: {name: 'club_id', allowNull: false},
    as: 'clubPartenaire',
    onDelete: 'CASCADE'
})
db.partenaires.belongsTo(db.clubs, {
    foreignKey: {name: 'club_id', allowNull: false},
    as: 'partenaireClub',
    onDelete: 'CASCADE'
})
//relation entre clubHistorique et club
db.clubs.hasMany(db.clubHistoriqueModel, {
    foreignKey: {name: 'club_id', allowNull: false},
    as: 'clubClubHistorique',
    onDelete: 'CASCADE'
})
db.clubHistoriqueModel.belongsTo(db.clubs, {
    foreignKey: {name: 'club_id', allowNull: false},
    as: 'clubHistoriqueClub',
    onDelete: 'CASCADE'
})

module.exports = db