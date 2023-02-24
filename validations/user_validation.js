const joi = require('joi')

const user_register_validation = (data)=>{
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required().min(8),
        phone: joi.number().required(),
        blood: joi.string().required().pattern(new RegExp('[A-Z]{1,2}[+,-][v][e]'))
    })

    return schema.validate(data)
}

const login_validation = (data)=>{
    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required().min(8),
    })

    return schema.validate(data)
}

const hospital_register_validation = (data)=>{
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required().min(8),
        phone: joi.number().required(),
        address : joi.string().required()
    })

    return schema.validate(data)
}

module.exports.user_register_validation = user_register_validation
module.exports.login_validation = login_validation
module.exports.hospital_register_validation = hospital_register_validation