//steps to setup mongodb
//1. install mongodb
//2. install mongoose
//3. require and set up mongoose
//4. make schema
//5. create model

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myfirstapp')
.then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));
//the above lines creates a database named as "myfirstapp"

const userSchema = mongoose.Schema({
  username:String,
  name:String,
  age:Number
});
//the above line basically creates a schema for the user... the schema is like a blueprint for the user... it tells us what properties the user will have... in this case the user will have a username, name and age property

module.exports = mongoose.model("user", userSchema);
//the above line is creating a model for the user which will be converted to a collection in the database with the name "user"
