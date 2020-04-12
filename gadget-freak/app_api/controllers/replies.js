var mongoose = require('mongoose');

require('../models/forum')
var forum = mongoose.model('forum');

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/*module.exports.replyPost = function(req, res) {
  forum
  .findById(req.params.idPost)
  .select('replies')
  .replies.push({
    user: req.body.user,
    content: req.body.content,
  });
  forum.save(function(napaka, post){
    if(napaka){
      console.log(napaka);
    }else{
      JSONResponse(res, 201, post);
    }
  })
  JSONResponse(res, 200, {"status": "successful"});
};*/

module.exports.replyPost = function(req, res) {
  forum
  .findById(req.params.idPost)
  .select('replies')
  .exec(
    function(napaka, post){
      if(napaka){
        JSONResponse(res, 400, napaka);
      }else{
        addReply(req, res, post);
      }
    })
};

module.exports.deleteRep = function(req, res) {
  forum
  .findById(req.params.idPost)
  .select('replies')
  .exec(
    function(napaka, post){
      if(napaka){
        JSONResponse(res, 400, napaka);
      }else{
        deleteReply(req, res, post);
      }
    })
}

var deleteReply = function(req, res, post){
 post.replies.id(req.params.idReply).remove();
 post.save(function(napaka){
   if(napaka){
     JSONResponse(res, 500, napaka);
   }
 })
  JSONResponse(res, 200, "ok");
}

var addReply = function(req, res, post){
  //db.users.update({user_id: '1234'}, {user_id: '1234', $inc: {visit_count: 1}}, true)
  post.replies.push({
    user: req.body.user,
    content: req.body.reply
  });
  post.save(function(napaka, post){
    var addedReply;
    if(napaka){
      console.log(napaka);
      JSONResponse(res, 400, napaka);
    }else{
      addedReply = post.replies[post.replies.length - 1];
      JSONResponse(res, 201, post);
    }
  })
}



