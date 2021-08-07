const mongoose = require("mongoose")
const Joi = require("joi")

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})


const Category = mongoose.model("category",categorySchema)

const validation = (obj) =>{
    const schema = Joi.object({
        name:Joi.string().required()
    })

    return schema.validate(obj)
}

module.exports.categorySchema = categorySchema;
module.exports.Category = Category;
module.exports.validation = validation