//this express app was made by express generator... it provides a basic template for a web app eliminating the need to write boilerplate code... to use express generator you can just type "express myapp --view=ejs" in the terminal and it will create a new directory with the name myapp and all the necessary files and directories for a basic web app... and then you can "cd myapp" then type "npm i".. then in order to run this web app you can just type "npx nodemon" in the terminal

var express = require('express');
var router = express.Router();
const userModel = require("./users");

//we are using router.get instead of app.get because the app object is not available in this file... the app object is available in the app.js file... we are using the router object to create routes in this file...
router.get('/', function(req, res) {
  req.session.sessionName = "hello"; //this line basically helps us store anything in the current session... we are storing "hello" inside the variable sessionName inside the session.... this will set the value of sessionName only for my device as "hello"... this value will not be same for the other users or devices
  res.render('index', { title: 'express' });
});

router.get("/cookie",function(req,res){
  res.cookie("age",25); //this line creates a cookie with a variable age and sets it as 25... res is used in this case because we are sending data from the server to the browser
  res.send("Cookies");
});

router.get("/read",function (req,res) {
  res.send(req.cookies); //this is used to read the cookie... we use req to access the cookies because we are getting this data from the browser that means we are requesting this data from the browser
});

router.get("/delcookie",function(req,res){
  res.clearCookie("age"); //this is used to delete the cookie... we use res in this
  res.send("cookie cleared");
});

router.get("/check",function(req,res){
  res.send(req.session); //we can access the current session using this line
});

router.get("/del",function(req,res){
  req.session.destroy(function(err){
    if (err) throw err;
    res.send("sessionName deleted");
  });//this is deleting the current session and it also takes a callback func in its parameters which is a func which would be executed once the session has been deleted
});

router.get('/create', async function(req, res) {
  const createdUser = await userModel.create({
    username:"sayantan",
    name:"Sayantan Nandi",
    age:18
  }); //this line creates a new user in the database
  res.send(createdUser);
});

router.get("/allusers",async function(req,res){
  let allusers = await userModel.find();//this line fetches all the users from the database
  res.send(allusers);
});

router.get("/:username",async function(req,res){
  let userData = await userModel.findOne({username:req.params.username});//this line fetches one user from the database
  res.send(userData);
});

router.get("/hi",function(req,res){
  console.log("hi");
  res.send("hi");
});

router.get("/delete",async function (req,res) {
  // let deletedUser = await userModel.deleteMany({});//this line deletes all the users from the database
  let deletedUser = await userModel.findOneAndDelete({username:"sayantan"});//this line deletes a user from the database
  console.log(deletedUser);
  res.send("hi");
});

module.exports = router;
