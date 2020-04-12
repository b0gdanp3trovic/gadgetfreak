/* GET device forum post*/

var request = require('request');
var apiParametri = {
  streznik: 'http://localhost:' + process.env.PORT
};
if (process.env.NODE_ENV === 'production') {
  apiParametri.streznik = 'https://gadget-freak.herokuapp.com';
}


var forumAddPage = function(req, res){
  res.render('addforumpost', {
    title: 'Add a post!',
    url : req.originalUrl
  })
}

var forumpost = function(req, res, vsebina) {
  res.render('forumpost', {
    title: 'Post',
    user: req.session.username,
    postId : req.params.postId
  })
};

module.exports.forumPage = function(req, res){
    forumpost(req, res);
}


module.exports.showAddPage = function(req, res){
  forumAddPage(req, res);
}

module.exports.replyPost = function(req, res){
  var pot = '/api/forum/' + req.params.postId;
  var parametriZahteve = {
    url: apiParametri.streznik + pot,
    method : 'POST',
    json: {
      user : req.session.user,
      content: req.body.replyContent
    }
  };
  request(parametriZahteve, function(napaka, odgovor, vsebina){
        if(napaka){
            prikaziNapako(req, res, odgovor.statusCode);
        }
    });
    res.redirect('/forum/post/' + req.params.postId);
}

module.exports.showForumPosts = function(req, res){
  var pot = '/api/'
}

module.exports.replyDelete = function(req, res){
  var pot = '/api/forum/' + req.params.postId + '/' + req.params.replyId
  var parametriZahteve = {
    url : apiParametri.streznik + pot,
    method : 'DELETE',
    json: {}
  }
  request(parametriZahteve, function(napaka, odgovor, vsebina) {
    if(napaka){
      prikaziNapako(req, res, odgovor.statusCode);
    }
  });
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