const mongoose = require('mongoose')
const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    blood:{
        type:String,
        required:true
    }
}
    ,{collection:"User"},{strict:true})

module.exports = mongoose.model("user",schema)