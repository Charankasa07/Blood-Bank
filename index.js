const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const user_routes = require('./routes/user')
dotenv.config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use('/user',user_routes)

mongoose.connect(process.env.DB_CONNECT,console.log("DB Connected"))



app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(3000,console.log("Listening on port 3000"))