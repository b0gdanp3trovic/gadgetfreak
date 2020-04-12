var mongoose = require('mongoose');

require('../models/devicePost');
var picPost = mongoose.model('devicePost');

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.commentGet = function(req, res) {
  picPost
  .findById(req.params.idPost)
  .select('pictures')
  .find({}, function(err, users) {
    if (err) {
      JSONResponse(res, 500, err);
      return;
    }
    var pics = {};

    users.forEach(function(user) {
      pics[user._id] = user;
    });

    res.send(pics);  
  });
};

module.exports.pictureCreate = function(req, res) {
  var idPost = req.params.idPost;
  var subPics = [];
  if(typeof req.body.subPic == 'string'){
    subPics.push({
        target: 'pic1',
        src: req.body.subPic
    });
  }else{
      for(var i = 0; i < req.body.subPic.length; i++){
          subPics.push({
             target: 'pic'+i,
             src: req.body.subPic[i]
          });
      }
  }
  console.log(subPics);
  if (idPost) {
    picPost
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
          if(req.body.mainPic != '')
            device.frontPage.pic = req.body.mainPic;
          for(var i=0; i<subPics.length; i++){
            subPics[i].target += device.pictures.length;
            device.pictures.push(subPics[i]);
          }
          device.save(function(err, device) {
            if (err) {
              JSONResponse(res, 400, err);
            } else{
              JSONResponse(res, 201, device);
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
};