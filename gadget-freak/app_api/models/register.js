var mongoose = require('mongoose');

var registerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  sex: {type: String, required: true},
  city: {type: String, required: true},
  country: {type: String, required: true},
  uname: {type: String, required: true},
  pword: {type: String, required: true},
});

mongoose.model('users',registerSchema);