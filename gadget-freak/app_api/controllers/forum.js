var mongoose = require('mongoose');
require('../models/forum');
require('../models/users');
var forum = mongoose.model('forum');
var users = mongoose.model('userScheme');
var commentPost = mongoose.model('devicePost');
var options = {  year: 'numeric', month: 'long', day: 'numeric' };
var today  = new Date();

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.forumPost = function(req, res) {
  returnAuthor(req, res, function(req, res, nameUser) {
  forum.create({
    user: nameUser,
    content: req.body.content,
    repliesNum: 0,
    viewsNum: 0,
    replies:{}
  }, function(err){
    if(err){
      JSONResponse(res, 400, err);
    }
  })
  JSONResponse(res, 200, {"status" : "success!"});
  });
};


var returnAuthor = function(zahteva, odgovor, povratniKlic) {
  console.log(zahteva.body.user);
  if(zahteva.body.user) {
    users
      .findOne({
        email: zahteva.body.user
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
        povratniKlic(zahteva, odgovor, uporabnik.email);
      });
  } else {
    JSONResponse(odgovor, 400, {
      "message": "No data on that user"
    });
    return;
  }
};

module.exports.forumGetAll = function(req, res) {
  forum
    .find({})
    .exec(function(napaka, vsebina){
      if(napaka){
        JSONResponse(res, 400, {"status" : "error!"});
      }else{
        JSONResponse(res, 200, vsebina);
      }
    });
};

module.exports.forumGetPost = function(req, res){
  if(req.params.idPost){
    forum.findById(req.params.idPost)
    .exec(function(napaka, post){
      if(!post){
        JSONResponse(res, 404, "Not found.");
        return;
      }else if (napaka) {
        JSONResponse(res, 500, "Error!");
        return;
      }
        addViewer(req, res);
      
      JSONResponse(res, 200, post);
    })
  }else{
    JSONResponse(res, 400, "Invalid ID!");
  }
}

var addViewer = function(req, res) {
  forum
  .findById(req.params.idPost)
  .select('viewers')
  .exec(
    function(napaka, post){
      if(napaka){
        JSONResponse(res, 400, napaka);
      }else{
        addView(req, res, post);
      }
    })
};

var addView = function(req, res, post){
  //db.users.update({user_id: '1234'}, {user_id: '1234', $inc: {visit_count: 1}}, true
  post.viewers.push({
    user: req.body.user,
  });
  post.save(function(napaka, post){
    if(napaka){
      console.log(napaka);
      JSONResponse(res, 400, napaka);
    }
  })
}


module.exports.forumPostDelete = function(req, res) {
  if(req.params.idPost){
    forum.findByIdAndRemove(req.params.idPost)
    .exec(function(napaka, post){
      if(!post){
        JSONResponse(res, 404, "Not found.");
        return;
      }else if(napaka){
        JSONResponse(res, 500, "Error!");
        return;
      }
      JSONResponse(res, 200, post);
    })
  }else{
    JSONResponse(res, 200, "ok");
  }
   
};

module.exports.editForumPost = function(req, res){
  if(req.params.idPost){
    forum.findById(req.params.idPost)
    .exec(function(napaka, post){
      if(!post){
        JSONResponse(res, 404, "Not found");
        return;
      }else if(napaka){
        JSONResponse(res, 500, "Error");
        return;
      }else{
        post.content = req.body.content;
        post.save(function(napaka, post){
          if(napaka){
            JSONResponse(res, 400, napaka);
          }else{
            JSONResponse(res, 201, post);
          }
        })
      }
    })
  }
}


module.exports.forumPostPut = function(req, res) {
  if(req.params.idPost){
    forum.findById(req.params.idPost)
    .select('-replies')
    .exec(function(napaka, post){
      if(!post){
        JSONResponse(res, 404, "Not found.");
        return;
      }else if(napaka){
        JSONResponse(res, 500, "Error!");
        return;
      }else{
        post.user = req.body.user;
        post.pic = req.body.pic;
        post.content = req.body.content;
        post.save(function(napaka, post){
          if(napaka){
            JSONResponse(res, 400, napaka);
          }else{
            JSONResponse(res, 200, post);
          }
        })
      }
    })
  }else{
    JSONResponse(res, 200, "ok");
  }
   
};

