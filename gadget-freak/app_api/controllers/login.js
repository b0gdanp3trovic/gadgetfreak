var mongoose = require('mongoose');
require('../models/register');

var users = mongoose.model('users');

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.loginPost = function(req, res) {
  var found = false;
  if (req.body.uname &&  req.body.pword) {
      var uname = req.body.uname;
      var pword = req.body.pword;
      users
      .find({}, function(err, usersAll) {
        if (err) {
          JSONResponse(res, 500, err);
          return;
        }
      
        usersAll.forEach(function(user) {
          if(user.uname == uname && user.pword == pword && !found){
            found=true;
            JSONResponse(res, 200, { 
              "message": "successful!"
            });
            return;
            
          }
        });
        if(found)
          return;
        JSONResponse(res, 403, { 
          "message": "Incorrect username or password."
        });
      });
      
  }else{
    JSONResponse(res, 400, { 
      "message": "Fill in all the fields!"
    });
  }
};

module.exports.loginGet = function(req, res) {
  JSONResponse(res, 200, {"status": "successful"});
};
