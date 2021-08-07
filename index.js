require("express-async-errors")
const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("./apps/routes")(app)


mongoose.connect("mongodb://localhost/gulit",{
    useNewUrlParser: true ,
    useUnifiedTopology: true
}).
then(()=>console.log("connect to db"))
.catch((err)=>console.log(err.message))

const port = process.env.PORT || 3900
app.listen(port,console.log("server is up and running on" + port))
