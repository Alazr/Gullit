const express = require("express")
const router = express.Router()
const Joi = require("joi")
const bcrypt = require("bcrypt")
const {User} = require("../models/user")
  
router.post("/",async (req,res)=>{
    const {email,password} = req.body   

    const {error} = validation(req.body)
    if(error)return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email})
    if(!user)return res.status(401).send("invalid email or password")

    // check password
    const isValid = await bcrypt.compare(password,user.password)
    if (!isValid)return res.status(401).send("invalid email or password")
    
    const token = user.genereteAuthToken()
    res.send(token)

})

const validation = (obj) =>{
    const schema = Joi.object({
        email:Joi.string().required().min(5).max(255),
        password:Joi.string().required().min(5).max(100),
    })

    const result =  schema.validate(obj)
    return result
}

module.exports = router