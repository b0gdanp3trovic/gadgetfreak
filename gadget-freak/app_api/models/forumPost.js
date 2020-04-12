var mongoose = require('mongoose');

var repliesSchema = new mongoose.Schema({
  user: String,
  content: String
})




var repliesSchema = new mongoose.Schema({
  title: String,
  post:{
      user: String,
      pic: String,
      content: String
  },
  replies: [repliesSchema]
});

mongoose.model('forumPost', repliesSchema);
