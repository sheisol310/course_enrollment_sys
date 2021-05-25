const mongoose = require('mongoose');
const Course = require('course');
const UserSchema = new mongoose.Schema({
  firstName : {
      type: String,
      require: true
  },
  lastName : {
      type: String,
      require: true
  },
  QcFirst : {
      type: String,
      require: true,
      unique: true
  },
  email : {
      type: String,
      require: true,
      unique: true
  },
  password : {
      type: String,
      require: true
  },
  passwordConfirm : {
      type: String,
      require: true
  },
  identity : {
      type: String,
      require: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  courses:{
      type: [Course]
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;