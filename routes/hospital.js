const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const hospital = require('../models/hospital')
const {hospital_register_validation} = require('../validations/user_validation')

router.post('/register',async (req,res)=>{
    const {error,value} = hospital_register_validation(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const data = await hospital.findOne({email:req.body.email})
    if(data) return res.status(400).send("Account Already Exists")

    const salt = await bcrypt.genSalt(10)
    const hashedpass = await bcrypt.hash(req.body.password,salt)

    const post = new hospital({
        name : req.body.name,
        email : req.body.email,
        password : hashedpass,
        phone : req.body.phone,
        address : req.body.address
    })

    try {
        await post.save()
        const token = await jwt.sign({email:post.email},process.env.hospital_token)
        res.setHeader('auth-token',token).send({message:"Registered Succesfully",token:token})
    } catch (error) {
        res.send(error)
    }
})



module.exports = router