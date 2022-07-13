const express = require('express')
require('dotenv').config()


const app = express()
const routes = require('./routes/routes')
const port = process.env.PORT
const sequelize = require('./config/seqeulizedb')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(setCustomHeaders)
app.use(routes)
app.get('/',(req, res, next)=> {
    res.end('Hello World')
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Successfully Connected to database')
        app.listen(port, () => {
            console.log(`Welcome to tasklist app. running on port: ${port}`)
        })
    }catch(error){
        console.log(error)
    }
}

function setCustomHeaders(req,res,next){
	  // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}

connectDB()
