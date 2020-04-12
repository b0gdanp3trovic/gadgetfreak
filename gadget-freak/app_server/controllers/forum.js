/* GET device forum */

var request = require('request');
var apiParametri = {
  streznik: 'http://localhost:' + process.env.PORT
};
if (process.env.NODE_ENV === 'production') {
  apiParametri.streznik = 'https://gadget-freak.herokuapp.com';
}

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var forum = function(req, res, vsebina) {
    res.render('forum', {
        title: "Welcome to the forum!"
    });
};

module.exports.forumPost = function(req, res){
    var pot = '/api/forum';
    var posredovaniPodatki = {
        user: req.session.username,
        content: req.body.content
        
    }
    var parametriZahteve = {
        url: apiParametri.streznik + pot,
        method : 'POST',
        json: posredovaniPodatki
    }
    request(parametriZahteve, function(napaka, odgovor, vsebina){
        if(napaka){
            prikaziNapako(req, res, odgovor.statusCode);
        }
    });
    res.redirect('/forum')
}

module.exports.forumPage = function(req, res){
  
  forum(req, res);
}

module.exports.deletePost = function(req, res){
    var pot = '/api/forum/' + req.params.postId;
    var parametriZahteve = {
      url : apiParametri.streznik + pot,
      method : 'DELETE',
      json: {}
    };
    request(
      parametriZahteve,
      function(napaka, odgovor, vsebina){
        if(napaka){
          console.log(napaka);
        }
      })
}


var prikaziNapako = function(req, res, statusCode) {
  var naslov, vsebina;
  if (statusCode == 404) {
    naslov = "404, strani ni mogoče najti.";
    vsebina = "Hmm, kako je to mogoče? Nekaj je šlo narobe.";
  } else {
    naslov = statusCode + ", nekaj je šlo narobe.";
    vsebina = "Nekaj nekje očitno ne deluje.";
  }
  res.status(statusCode);
  res.render('genericno-besedilo', {
    title: naslov,
    vsebina: vsebina
  });
};