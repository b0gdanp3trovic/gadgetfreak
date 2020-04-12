var mongoose = require('mongoose');

require('../models/devicePost');
var devicePost = mongoose.model('devicePost');

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET home page */
module.exports.index = function(req, res) {
  res.render('index', { title: 'Gadget Freak' });
};


module.exports.addGadgetPost = function(req, res) {
  JSONResponse(res, 200, {"status": "successful"});
};

module.exports.addGadgetGet = function(req, res) {
  JSONResponse(res, 200, {"status": "successful"});
};


module.exports.sideIndex = function(req, res) {
  devicePost
  .find({}, function(err, users) {
    if (err) {
      JSONResponse(res, 500, err);
      return;
    }
    var devices = [];

    users.forEach(function(user) {
      devices.push({
        id: user._id,
        name: user.frontPage.phone
      });
    });
    var special = {all: devices};
    res.send(special);  
  });
};
