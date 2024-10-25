// let c = require('./script2');
// let a = 20;
// let b = 30;
// console.log(a,b,c);

// let oneLinerJoke = require('one-liner-joke');
// console.log(oneLinerJoke.getRandomJoke().body);

// let figlet = require('figlet');
// figlet("hello", function (err, data) {
//     if (err) {
//         console.log("Something went wrong");
//         console.log(err);
//     }
//     else {
//         console.log(data);
//     }
// });


//npm = node package manager but it now it is not just for node packages but for every packages like react, angular, etc.
//npm i = this helps to install any package we want... you can find the packages on npmjs.com
//packages are nothing but a set of prebuilt code that can be used to perform a specific task without doing it from scratch


// Express is npm package which is used to convert our laptop into a server and helps in routing of our webapp
const express = require('express');
const app = express();

app.set("view engine","ejs");
app.use(express.static("./public")); //this line basically tells the express to use the public folder as the static folder... static folder is the folder which contains all the static files like css, images, etc... so when we use this line then we can directly use the files in the public folder without writing the whole path of the file

//this app.use() function is a middleware function... middleware function is a function which takes place between the request and response... it is used to perform some task after receiving the request and before sending the response
app.use(function(req,res,next){
    //inside the arguments of this function, the req is the request object which contains all the information about the request made by the user.... all the data about the user is stored in this object
    //the res is the response object which is used to send the response to the user which contains what to send to the user
    next(); //this function is used to move to the next middleware function or the route... this is used because when we use a middleware function the flow of the response gets stuck in that particular middleware so to move to the next middleware we use next() function to give it a push
});

// this app.get(route,function) function is used to create a route... it takes two parameters... first is the route and second is the callback function which is executed when the route is hit... the / route basically means the home page of the website
app.get('/',function(req,res){
    res.render('index');
});

//this is another route which works when the use goes to /profile route
app.get('/profiles',function(req,res){
    res.render('profiles');
});

app.get("/signin",function(req,res){
    res.render('signin');
});

app.get("/signup",function(req,res){
    res.render('signup');
});

app.get("/contact",function(req,res){
    res.render('contact');
});
//this is a dynamic route in which a part of the route is common for all the routes and the other is dynamic... for example in this route /profile/:username the /profile is common for all the routes and the :username is dynamic... so when the user goes to /profile/anyname then the anyname is stored in the req.params.username object... the username is known as parameter
app.get("/profiles/:username",function(req,res){
    res.render("profilepage",{username:req.params.username});
});

app.get("/profiles/:username/posts/",function(req,res){
    res.send(`These are the posts of ${req.params.username}`);
});

app.get("/profiles/:username/posts/:id",function(req,res){
    res.send(`This is the post with id ${req.params.id} of ${req.params.username}`);
});

//you know that express helps us to convert our laptop into a server... so this app.listen() function is used to start the server... it takes one parameter which is the port number on which the server will run.. port number is basically a number which is used to identify the server on the network... it is like the address of the server... 
app.listen(3000);
//In nodejs we can eliminate the use of express and create a server using http package which is available inside the npm by default... but we use express because it is more easy to use and has more features than http package... but at the end of the day express uses the http package only to create the server
