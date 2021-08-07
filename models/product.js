const { required } = require("joi")
const Joi = require("joi")
const mongoose = require("mongoose")
const {categorySchema} = require("./category")

const productSchema = mongoose.Schema({
    name:{
        type:String,
        maxLength:255,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true

    },
    description:{
        type:String,
        maxLength:255
    },
    category:categorySchema
})

const Product = mongoose.model("product",productSchema)

const validation  = (obj)=>{
    const schema = Joi.object({
        name:Joi.string().required(),
        price:Joi.number().required(),
        image:Joi.string().required(),
        description:Joi.string().required(),
        categoryId:Joi.string().required()
    })

    return schema.validate(obj)
}

module.exports.Product = Product;
module.exports.validation = validation;