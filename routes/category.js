const express = require("express")
const router = express.Router()
const {Category,validation} = require("../models/category")
const admin = require("../middleware/admin")
const auth = require("../middleware/auth")


router.get("/",async(req,res)=>{
    const categories = await Category.find()
    res.send(categories)
})

router.get("/:id",async(req,res)=>{
    const category = await Category.findById(req.params.id)
    if(!category)return res.status(404).send("category with the given id is not exist")

    res.send(category)
})

router.post("/",async(req,res)=>{
    const {error} = validation(req.body)
    if(error)return res.status(404).send(error.details[0].message)

    let category = new Category({
        name:req.body.name
    })

    await category.save()

    res.send(category)


})

router.put("/:id",auth,async (req,res)=>{
    const {error} = validation(req.body)
    if(error)return res.status(404).send(error.details[0].message)

    const category = await Category.findByIdAndUpdate(req.params.id,
        {name:req.body.name},{new:true}
        )
    if(!category)return res.status(404).send("category with the given id is not exist")

    res.send(category)

})

router.delete("/:id",[auth,admin],async(req,res)=>{
    const category = await Category.findByIdAndRemove(req.params.id)
    if(!category)return res.status(404).send("category with the given id is not exist")

    res.send(category)
})


module.exports = router