var mongoose = require('mongoose');

var repliesSchema = new mongoose.Schema({
  user: String,
  content: String
})

var viewerSchema = new mongoose.Schema({
  user : String
})

var forumSchema = new mongoose.Schema({
  user: String,
  pic: String,
  content: String,
  repliesNum: Number,
  viewsNum: Number,
  replies:[repliesSchema],
  viewers : [viewerSchema]
})







mongoose.model('forum', forumSchema, 'forum');