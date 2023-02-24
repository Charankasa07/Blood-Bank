const joi = require('joi')

const user_register_validation = (data)=>{
    const schema = joi.object({
        name: joi.string().required(),
        email: joi.string().required().email(),
        password: joi.string().required().min(8),
        phone: joi.string().required(),
        blood: joi.string().required()
    })

    return schema.validate(data)
}

module.exports.user_register_validation = user_register_validation