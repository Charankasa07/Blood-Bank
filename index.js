const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const user = require('./models/user')
const hospital = require('./models/hospital')
const user_routes = require('./routes/user')
const hospital_routes = require('./routes/hospital')
const {login_validation} = require('./validations/user_validation')
dotenv.config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use('/user',user_routes)
app.use('/hospital',hospital_routes)

mongoose.connect(process.env.DB_CONNECT,console.log("DB Connected"))

app.post('/login',async (req,res)=>{
    const {error,value} = login_validation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const data = await user.findOne({email:req.body.email})
    if(!data){
        const hosp = await hospital.findOne({email:req.body.email})
        if(!hosp) return res.status(400).send("Account Doesn't Exist")

        const valid = await bcrypt.compare(req.body.password,hosp.password)
        if(!valid) return res.status(400).send("Invalid Password")

        const token = await jwt.sign({email:hosp.email},process.env.hospital_token)
        return res.setHeader("auth-token",token).status(200).send({message:" Hospital Logged in Successfully",token:token})
    }

    const validpass = await bcrypt.compare(req.body.password,data.password)
    if(!validpass) return res.status(400).send("Invalid Password")

    const token = await jwt.sign({email:data.email},process.env.user_token)
    return res.setHeader('auth-token',token).status(200).send({message:"Logged in Successfully",token})
})


app.get('/',(req,res)=>{
    res.send("hello")
})

app.listen(3000,console.log("Listening on port 3000"))