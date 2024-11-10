var express = require("express");
var router = express.Router();

const userModel = require("./users");
const { search } = require("../app");
const passport = require("passport");
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/failed", function (req, res, next) {
  req.flash("age", 12);
  res.send("done");
});

router.get("/checkkaro", function (req, res) {
  console.log(req.flash("age"));
  res.send("check console");
});

router.get("/create", async function (req, res) {
  let userData = await userModel.create({
    username: "tridha",
    nickname: "roshni",
    description: "i am just a girl.",
    categories: ["makeup","economics","chocolate","icecream"],
  });
  res.send(userData);
});

router.get("/users/:username",async function(req,res){
  var regex = new RegExp(req.params.username,"i");
  let user = await userModel.find({username:regex});
  res.send(user);
});

router.get("/find",async function(req,res){
  let user = await userModel.find({categories:{$all:['js']}}); //this line helps us to find users who have 'js' in their categories... $all means find all the users satisfying the query condition
  var date1 = new Date('2024-10-08');
  var date2 = new Date('2024-11-08');
  user = await userModel.find({datecreated:{$gte:date1,$lte:date2}}); //this line finds out those users who were created during the time period between date1 and date2... $gte (Greater Than Equal-to) refers to the starting point and $lte (Less Than Equal-to) refers to the end point
  user = await userModel.find({categories:{$exists:true}}); //this line finds those users who have categories in their document
  user = await userModel.find({
    $expr : {
      $and: [
        {$gte: [{$strLenCP: '$username'}, 0]},
        {$lte: [{$strLenCP: '$username'}, 6]}
      ]
    }
  }); //this returns the users whose username length is between 0 and 6 (including 0 & 6)
  res.send(user);
});

router.get("/profile",isLoggedIn,function(req,res){
  res.render("profile");
})

router.post("/register",function(req,res){
  var userData = new userModel({
    username: req.body.username,
    secret: req.body.secret
  });

  userModel.register(userData,req.body.password)
    .then(function (registerduser) {
      passport.authenticate("local")(req,res,function(){
        res.redirect("/profile");
      })
    })
});

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),function(req,res){});

router.get("/logout",function(req,res,next){
  req.logout(function(err){
    if (err) {return next(err);}
    res.redirect("/");
  });
});

function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;