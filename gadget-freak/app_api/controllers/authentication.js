var passport = require('passport');
var mongoose = require('mongoose');
require('../models/users');
var users = mongoose.model('userScheme');

var JSONResponse = function(res, status, data) {
  res.status(status);
  res.json(data);
};

module.exports.registration = function(req, res) {
  if (!req.body.name || !req.body.uname || !req.body.pword) {
    JSONResponse(res, 400, {
      "sporočilo": "Zahtevani so vsi podatki"
    });
  }
  var uporabnik = new users();
  uporabnik.name = req.body.name;
  uporabnik.email = req.body.uname;
  if(req.body.admin)
    uporabnik.admin = true;
  else
    uporabnik.admin = false;
  uporabnik.makePwrod(req.body.pword);
  uporabnik.save(function(napaka) {
   if (napaka) {
     JSONResponse(res, 500, napaka);
   } else {
     JSONResponse(res, 200, {
       "token": uporabnik.generirajJwt()
     });
   }
  });
};

module.exports.login = function(req, res) {
  if (!req.body.uname || !req.body.pword) {
    JSONResponse(res, 400, {
      "sporočilo": "Zahtevani so vsi podatki"
    });
    return;
  }
  passport.authenticate('local', function(napaka, uporabnik, podatki) {
    if (napaka) {
      JSONResponse(res, 404, napaka);
      return;
    }
    else if (uporabnik) {
      JSONResponse(res, 200, {
        "token": uporabnik.generirajJwt()
      });
    } else {
      JSONResponse(res, 401, podatki);
    }
  })(req, res);
};