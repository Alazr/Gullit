const products = require("../routes/product")
const categories = require("../routes/category")
const users = require("../routes/user")
const auth = require("../routes/auth")
const error = require("../middleware/error")
const express = require("express")


module.exports = function(app){
    app.use(express.json())
    app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
app.use("/uploads",express.static("uploads"))
app.use("/api/products",products)
app.use("/api/categories",categories)
app.use("/api/users",users)
app.use("/auth",auth)

app.use(error)
}