var mongoose = require('mongoose');

var picturesSchema = new mongoose.Schema({
    target: String,
    src: String  
})

var commentsSchema = new mongoose.Schema({
  user: String,
  picture: {type: String, default: 'http://placehold.it/75x75'},
  date: String,
  stars: {type: Number, required: true, min: 0, max: 5},
  content: String
})

var devicePostSchema = new mongoose.Schema({
  frontPage: {
    phone: {type: String, required: true},
    pic: {type: String, default: 'http://placehold.it/150x300'}
  }, 
  devicePage:{
    brand: String,
    generation: String,
    released: String,
    predecessor: String,
    dimensions: String,
    weight: String,
    os: String,
    cpu: String,
    modem: String,
    memory: String,
    storage: String,
    battery: String,
    display: String,
    rear_camera: String,
    front_camera: String,
    sound: String
  },
  pictures:[picturesSchema],
  comments: [commentsSchema]
});

mongoose.model('devicePost', devicePostSchema, 'devicePost');
