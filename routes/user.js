const express = require("express")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()
const {User,validation} = require("../models/user")

router.post("/",async (req,res)=>{
    const {name,email,password} = req.body   

    const {error} = validation(req.body)
    if(error)return res.status(400).send(error.details[0].message)
    
    let user = await User.findOne({email})
    if(user)return res.status(400).send("user is already registerd")
    
    
    user = new User({name,email,password})

    const salt = await bcrypt.genSalt(10);
    user["password"] = await bcrypt.hash(password,salt)

    const token = user.genereteAuthToken()
    
    await user.save()
    res.header("x-auth-token", token)
    .header("access-control-expose-headers","x-auth-token")
    .send(_.pick(user,["_id","name"]))

})





module.exports = router