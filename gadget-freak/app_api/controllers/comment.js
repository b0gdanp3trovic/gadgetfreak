var mongoose = require('mongoose');
require('../models/devicePost');
require('../models/users');
var users = mongoose.model('userScheme');
var commentPost = mongoose.model('devicePost');
var options = {  year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.commentGet = function(req, res) {
  commentPost
  .findById(req.params.idPost)
  .select('comments')
  .find({}, function(err, users) {
    if (err) {
      JSONResponse(res, 500, err);
      return;
    }
    var comments = {};

    users.forEach(function(user) {
      comments[user._id] = user;
    });

    res.send(comments);  
  });
};
module.exports.commentCreate = function(req, res) {
  returnAuthor(req, res, function(req, res, nameUser) {
    console.log(req.body);
    var idPost = req.params.idPost;
    if (idPost) {
      commentPost
        .findById(idPost)
        .exec(
          function(err, device) {
            if (!device) {
              JSONResponse(res, 404, {
                "message": "Can't find device."
              });
              return;
            } else if (err) {
              JSONResponse(res, 500, err);
              return;
            }
            device.comments.push({
              user: nameUser,
              picture: req.body.picture,
              date: today.toLocaleDateString("en-US", options),
              stars: req.body.stars,
              content: req.body.content
            });
            device.save(function(err, device) {
              if (err) {
                JSONResponse(res, 400, err);
              } else{
                JSONResponse(res, 201, device.comments [device.comments.length - 1]);
              }
            });
          }
        );
    } else {
      JSONResponse(res, 400, {
        "message": 
          "Can't find device with that id."
      });
    }
  });
};

module.exports.commentPut = function(req, res) {
  if(req.params.idPost && req.params.idComment){
    commentPost
    .findById(req.params.idPost)
    .select('comments')
    .exec(
      function(err, device) {
        if (!device) {
          JSONResponse(res, 404, {
            "message": "Can't find device."
          });
          return;
        } else if (err) {
          JSONResponse(res, 500, err);
          return;
        } 
        var curCom;
        for(var i = 0; i < device.comments.length; i++){
          if(device.comments[i]._id == req.params.idComment){
            curCom = device.comments[i];
            break;
          }
        }
        if(!curCom){
          JSONResponse(res, 400, {
            "message": 
              "Can't find comment with that id."
          });
        }else{
          curCom.date =  today.toLocaleDateString("en-US", options);
          if(req.body.stars != '')
            curCom.stars = req.body.stars;
          if(req.body.context != '')
            curCom.content = req.body.context;
          device.save(function(err, device) {
            if (err) {
              JSONResponse(res, 400, err);
            } else {
              JSONResponse(res, 200, curCom);
            }
          });
        }
      }
    );
  }else if(req.params.idPost ){
    JSONResponse(res, 400, {
      "message": 
        "Can't find comment with that id."
    });
  }else if(req.params.idComment){
    JSONResponse(res, 400, {
      "message": 
        "Can't find device with that id."
    });
  }else{
    JSONResponse(res, 400, {
      "message": 
        "Check parameters."
    });
  }
}

module.exports.commentDelete = function(req, res) {
  if(req.params.idPost && req.params.idComment){
    commentPost
    .findById(req.params.idPost)
    .select('comments')
    .exec(
      function(err, device) {
        if (!device) {
          JSONResponse(res, 404, {
            "message": "Can't find device."
          });
          return;
        } else if (err) {
          JSONResponse(res, 500, err);
          return;
        }
        var curCom;
        for(var i = 0; i < device.comments.length; i++){
          if(device.comments[i]._id == req.params.idComment){
            device.comments[i].remove();
            device.save(function(err, device) {
              if (err) {
                JSONResponse(res, 400, err);
              } else {
                JSONResponse(res, 204 , device);
              }
            });
            break;
          }
        }
      }
    );
  }else if(req.params.idPost ){
    JSONResponse(res, 400, {
      "message": 
        "Can't find comment with that id."
    });
  }else if(req.params.idComment){
    JSONResponse(res, 400, {
      "message": 
        "Can't find device with that id."
    });
  }else{
    JSONResponse(res, 400, {
      "message": 
        "Check parameters."
    });
  }
}

var returnAuthor = function(zahteva, odgovor, povratniKlic) {
  if (zahteva.payload && zahteva.payload.email) {
    users
      .findOne({
        email: zahteva.payload.email
      })
      .exec(function(napaka, uporabnik) {
        if (!uporabnik) {
          JSONResponse(odgovor, 404, {
            "message": "Can't find that user"
          });
          return;
        } else if (napaka) {
          JSONResponse(odgovor, 500, napaka);
          return;
        }
        povratniKlic(zahteva, odgovor, uporabnik.name);
      });
  } else {
    JSONResponse(odgovor, 400, {
      "message": "No data on that user"
    });
    return;
  }
};