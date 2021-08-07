
function admin(req,res,next){
    const user = req.user.isAdmin
    if(!user)return res.status(403).send("access denied")
    
    next()
}

module.exports = admin