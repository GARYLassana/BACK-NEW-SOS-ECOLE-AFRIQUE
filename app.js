const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const userRoute = require('./src/routes/authentication/userRoute')
const clubRoute = require('./src/routes/businessProcess/clubRoute')
const rencontreRoute = require('./src/routes/businessProcess/rencontreRoute')
const competitionRoute = require('./src/routes/businessProcess/competitionRoute')
const stadeRoute = require('./src/routes/businessProcess/stadeRoute')
const actualiteRoute = require('./src/routes/businessProcess/actualiteRoute')
const personneRoute = require('./src/routes/businessProcess/personneRoute')
const partenaireRoute = require('./src/routes/businessProcess/partenaireRoute')
const favicon = require("serve-favicon")
const doc = require("swagger-jsdoc")
const ui = require("swagger-ui-express")
const PORT = process.env.PORT || 3000


var corOptions = {
    orgin: 'https://localhost:3001'
}
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "Node js api project for football",
            version: "1.0.0"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`
            }
        ]
    },
    apis: ['./routes/authentication/userRoute.js']

}
const spec = doc(options)
app.use('/api-docs', ui.serve, ui.setup(spec))
app.use(favicon(__dirname + '/assets/img/favicon.ico')).use(express.json()).use(morgan('dev'))
    .use(express.urlencoded({extended: true}))
    .use(cors(corOptions))
app.get('/', (req, res) => {
    res.json({msg: 'Bien venu dans Heroko'})
})
app.use('/api', sendMail)
app.use('/api', userRoute)
app.use('/api', clubRoute)
app.use('/api', rencontreRoute)
app.use('/api', competitionRoute)
app.use('/api', stadeRoute)
app.use('/api', actualiteRoute)
app.use('/api', personneRoute)
app.use('/api', partenaireRoute)
app.use(({res}) => {
    const msg = 'Ressource introuvable.'
    res.status(404).json(msg)
})
app.listen(PORT, _ => {
    console.log(`Le serveur a demarer sur le port ${PORT}`)
})