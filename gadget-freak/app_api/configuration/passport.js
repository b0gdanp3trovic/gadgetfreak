var passport = require('passport');
var LokalnaStrategija = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Users = mongoose.model('userScheme');

passport.use(new LokalnaStrategija({
    usernameField: 'uname',
    passwordField: 'pword'
  }, 
  function(uporabniskoIme, geslo, koncano) {
    Users.findOne(
      {
        email: uporabniskoIme
      },
      function(napaka, uporabnik) {
        if (napaka)
          return koncano(napaka);
        if (!uporabnik) {
          return koncano(null, false, {
            sporocilo: 'Napačno uporabniško ime'
          });
        }
        if (!uporabnik.preveriGeslo(geslo)) {
          return koncano(null, false, {
            sporocilo: 'Napačno geslo'
          });
        }
        return koncano(null, uporabnik);
      }
    );
  }
));