var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userScheme = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  zgoscenaVrednost: String,
  admin: Boolean,
  randomValue: String
});

userScheme.methods.makePwrod = function(pword) {
  this.randomValue = crypto.randomBytes(16).toString('hex');
  this.zgoscenaVrednost = crypto.pbkdf2Sync(pword, this.randomValue, 1000, 64, 'sha512').toString('hex');
};

userScheme.methods.preveriGeslo = function(pword) {
  var zgoscenaVrednost = crypto.pbkdf2Sync(pword, this.randomValue, 1000, 64, 'sha512').toString('hex');
  return this.zgoscenaVrednost == zgoscenaVrednost;
};

userScheme.methods.generirajJwt = function() {
  var dataCreated = new Date();
  dataCreated.setDate(dataCreated.getDate() + 7);
  
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    admin: this.admin,
    dataCreated: parseInt(dataCreated.getTime() / 1000, 10)
  }, process.env.JWT_GESLO);
};

mongoose.model('userScheme', userScheme, 'userScheme');