const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const sendMail = require('./src/routes/sendMail')
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
app.use(({res}) => {
    const msg = 'Ressource introuvable.'
    res.status(404).json(msg)
})
app.listen(PORT, _ => {
    console.log(`Le serveur a demarer sur le port ${PORT}`)
})