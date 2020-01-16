// user schema for mongoose
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
   }

});

const User = mongoose.model('User', userSchema);

module.exports = { User }
