var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  user:  String,
  start: {type: Number, required: true, min: 0, max: 5},
  content: String
})


mongoose.model('comments', commentSchema, 'comments');