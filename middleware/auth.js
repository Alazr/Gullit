const jwt = require("jsonwebtoken")

function authentication(req,res,next){
    const token = req.header("x-auth-token")
    if(!token)return res.status(401).send("Access denied. No token provide")

    try{
        const decoded = jwt.verify(token,"thisisthesecreatkey")
        req.user = decoded
        next()
    }catch(err){
        res.status(400).send("invalid token")
    }
}

module.exports = authentication