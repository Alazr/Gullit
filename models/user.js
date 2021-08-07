const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
require("dotenv/config")
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    isAdmin:Boolean
})

userSchema.methods.genereteAuthToken = function(){
    return token = jwt.sign({_id:this._id,name:this.name,isAdmin:this.isAdmin},process.env.TOKEN_PRIVATE_KEY) 
}

const User = mongoose.model("user",userSchema)

const validation = (obj) =>{
    const schema = Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required().min(5).max(255),
        password:Joi.string().required().min(5).max(100),
        confirm:Joi.string().valid(Joi.ref("password")).required()
    })

    const result =  schema.validate(obj)
    return result
}


module.exports.User = User;
module.exports.validation = validation;