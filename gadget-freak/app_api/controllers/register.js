var mongoose = require('mongoose');
require('../models/register');

var users = mongoose.model('users');

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.usersGetAll = function(req, res) {
  users
  .find({}, function(err, usersAll) {
    if (err) {
      JSONResponse(res, 500, err);
      return;
    }
    var usersList = {};

    usersAll.forEach(function(user) {
      usersList[user._id] = user;
    });

    res.send(usersList);  
  });
};

module.exports.usersGet = function(req, res) {
  if (req.params && req.params.idUser) {
    users
    .findById(req.params.idUser)
    .exec(function(error, user) {
      if (!user) {
        JSONResponse(res, 404, {
            "message": 
              "Can't find user."
          });
          return;
        } else if (error) {
          JSONResponse(res, 500, error);
          return;
        }
        JSONResponse(res, 200, user);
    })
  } else {
    JSONResponse(res, 400, { 
      "message": "Invalid id!"
    });
  }
};

module.exports.userPost = function(req, res) {
  users.create({
    name: req.body.name,
    lastName: req.body.last,
    email: req.body.email,
    sex: req.body.sex,
    city: req.body.city,
    country: req.body.country,
    uname: req.body.uname,
    pword: req.body.pword,
  }, function(err, user) {
    if (err) {
      JSONResponse(res, 400, err);
    } else {
      JSONResponse(res, 201, user);
    }
  });
};

module.exports.userPut = function(req, res) {
  var sex;
  if(req.body.gender1)
    sex = req.body.gender1;
  else
    sex = req.body.gender2;
  if (!req.params.idUser) {
    JSONResponse(res, 400, {
      "message": 
        "I can't find the user with that ID"
    });
  }else{
    users
    .findById(req.params.idUser)
    .exec(
      function(err, user) {
        if (!user) {
          JSONResponse(res, 404, {
            "message": "Can't find user."
          });
          return;
        } else if (err) {
          JSONResponse(res, 500, err);
          return;
        }
        user.name = req.body.name;
        user.lastName = req.body.last;
        user.email = req.body.email;
        user.sex = sex;
        user.city = req.body.city;
        user.country = req.body.country;
        user.uname = req.body.uname;
        user.pword = req.body.pword;
        user.save(function(err, user) {
          if (err) {
            JSONResponse(res, 400, err);
          } else {
            JSONResponse(res, 200, user);
          }
        });
      }
    );
  }
};

module.exports.userDelete = function(req, res) {
  var idUser = req.params.idUser;
  if (idUser) {
    users
      .findByIdAndRemove(idUser)
      .exec(
        function(napaka, user) {
          if (napaka) {
            JSONResponse(res, 404, napaka);
            return;
          }
          JSONResponse(res, 204, null);
        }
      );
  } else {
    JSONResponse(res, 400, {
      "message": 
        "Can't find a user with that ID."
    });
  }
};