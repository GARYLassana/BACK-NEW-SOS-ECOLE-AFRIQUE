module.exports = {
    HOST: 'zpj83vpaccjer3ah.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    USER: 'ygdsrbzp1haap1b0',
    PASSWORD: 'jyuxg2o3m29whiun',
    DB: 'q4zi9lw4zve3rrwl',
    dialect: 'mysql',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000

    },
    logging: true
}