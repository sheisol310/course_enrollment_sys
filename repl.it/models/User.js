const mongoose = require('mongoose');
//creation of the "user" model
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
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
