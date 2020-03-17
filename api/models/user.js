// user schema for mongoose
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   sprayName:{
      type: String,
      required: true,
      unique: 1,
      trim: true
   },
   email:{
      type: String,
      required: true,
      unique: 1,
      trim: true
   },
   password:{
      type: String,
      required: true,
      minlength: 6
   },
   mpId:{
      type: String,
      required: true
   },
   friendsList:[{
      type: String
   }]

});

const User = module.exports = mongoose.model('User', userSchema);

