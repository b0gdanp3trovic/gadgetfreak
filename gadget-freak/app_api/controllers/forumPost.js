var mongoose = require('mongoose');
require('../models/forumPost');

var devPost = mongoose.model('forumPost');

var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.forumPostPost = function(req, res) {
  JSONResponse(res, 200, {"status": "successful"});
};

module.exports.forumPostGet = function(req, res) {
  JSONResponse(res, 200, {"status": "successful"});
};

module.exports.forumPostPut = function(req, res) {
  JSONResponse(res, 200, {"status": "successful"});
};

module.exports.forumPostDelete = function(req, res) {
  JSONResponse(res, 200, {"status": "successful"});
};
