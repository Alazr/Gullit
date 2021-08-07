const express = require("express")
const router = express.Router()
const {Product,validation} = require("../models/product")
const {Category} = require("../models/category")
const admin = require("../middleware/admin") 
const multer =require("multer")
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads");
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const upload = multer({storage})

router.get("/",async(req,res)=>{
    const products = await Product.find()
    res.send(products)
})

router.get("/:id",async (req,res)=>{
    const product = await Product.findById(req.params.id)
    if(!product)return res.status(404).send("product with the given id is not exist")
    res.send(product)

})

router.post("/",upload.single("image"),async(req,res)=>{
    const {name,price,image,description,categoryId} = req.body
    if(!req.file)return res.body(400).send("image is required")
    req.body.image = req.file.path
    const {error} = validation(req.body)
    if(error)return res.status(400).send(error.details[0].message)
    

    const category = await Category.findById(categoryId)
    if(!category)return res.status(400).send("category with the given id is not exist")


    let product = new Product({
        name,
        price,
        image:req.file.path,
        description,
        category:{
            _id:category._id,
            name:category.name
        }
    })

    product =  await product.save()

    res.send(product)
})

router.put("/:id",async (req,res)=>{
    const {name,price,image,description,categoryId} = req.body

    const {error} = validation(req.body)
    if(error)return res.status(400).send(error.details[0].message)

    const category = await Category.findById(categoryId)
    if(!category)return res.status(400).send("category with the given id is not exist")
    
    const product = await Product.findByIdAndUpdate({_id:req.params.id},
        {
            name,
            price,
            image,
            description,
            category:{
                _id:category._id,
                name:category.name
            }
        },{new:true}
        )
    if(!product)return res.status(404).send("product with the given id is not exist")

    res.send(product)

})

router.delete("/:id",admin,async(req,res)=>{
    const product = await Product.findByIdAndRemove(req.params.id)
    if(!product)return res.status(404).send("product with the given id is not exist")

    res.send(product)
})


module.exports = router;