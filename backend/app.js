const express = require('express')
require('dotenv').config()


const app = express()
const routes = require('./routes/routes')
const port = process.env.PORT
const sequelize = require('./config/seqeulizedb')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
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

connectDB()