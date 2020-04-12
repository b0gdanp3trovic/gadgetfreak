var mongoose = require('mongoose');

require('../models/devicePost');
var devicePost = mongoose.model('devicePost');


var JSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.postGetAll = function(req, res) {
  devicePost
  .find({}, function(err, users) {
    if (err) {
      JSONResponse(res, 500, err);
      return;
    }
    var devices = [];
    var k = 0;
    users.forEach(function(user) {
      devices[k] = user;
      k++;
    });

    res.send(devices);  
  });
};

module.exports.postGet = function(req, res) {
  if (req.params && req.params.idPost) {
    devicePost
    .findById(req.params.idPost)
    .exec(function(error, device) {
      if (!device) {
        JSONResponse(res, 404, {
            "message": 
              "Can't find the device"
          });
          return;
        } else if (error) {
          JSONResponse(res, 500, error);
          return;
        }
        JSONResponse(res, 200, device);
    })
  } else {
    JSONResponse(res, 400, { 
      "message": "Invalid id!"
    });
  }
};

module.exports.postPost = function(req, res) {
  devicePost.create({
    frontPage: {
      phone: req.body.phone,
      pic: req.body.pic
    }, 
    devicePage:{
      brand: req.body.brand,
      generation: req.body.gen,
      released: req.body.released,
      predecessor: req.body.predecessor,
      dimensions: req.body.dim,
      weight: req.body.weight,
      os: req.body.os,
      cpu: req.body.cpu,
      modem: req.body.modem,
      memory: req.body.memory,
      storage: req.body.storage,
      battery: req.body.battery,
      display: req.body.dis,
      rear_camera: req.body.rear_camera,
      front_camera: req.body.front_camera,
      sound: req.body.sound
    },
    pictures:[],
    comments: []
  }, function(err, device) {
    if (err) {
      JSONResponse(res, 400, err);
    } else {
      JSONResponse(res, 201, device);
    }
  });
};


module.exports.postPut = function(req, res) {
  if (!req.params.idPost) {
    JSONResponse(res, 400, {
      "message": 
        "I can't find the device with that ID"
    });
  }else{
    devicePost
    .findById(req.params.idPost)
    .select('-pictures -comments')
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
        console.log(req.body)
        if(req.body.phone != '')
          device.frontPage.phone = req.body.phone;
        if(req.body.brand != '')
          device.devicePage.brand = req.body.brand;
        if(req.body.gen != '')
          device.devicePage.generation = req.body.gen;
        if(req.body.released != '')
          device.devicePage.released = req.body.released;
        if(req.body.predecessor != '')
          device.devicePage.predecessor = req.body.predecessor;
        if(req.body.dim != '')
          device.devicePage.dim = req.body.dim;
        if(req.body.weight != '')
          device.devicePage.weight = req.body.weight;
        if(req.body.os != '')
          device.devicePage.os = req.body.os;
        if(req.body.cpu != '')
          device.devicePage.cpu = req.body.cpu;
        if(req.body.modem != '')
          device.devicePage.modem = req.body.modem;
        if(req.body.memory != '')
          device.devicePage.memory = req.body.memory;
        if(req.body.storage != '')
          device.devicePage.storage = req.body.storage;
        if(req.body.battery != '')
          device.devicePage.battery = req.body.battery;
        if(req.body.dis != '')
          device.devicePage.display = req.body.dis;
        if(req.body.rear_camera != '')
          device.devicePage.rear_camera = req.body.rear_camera;
        if(req.body.front_camera != '')
          device.devicePage.front_camera = req.body.front_camera;
        if(req.body.sound != '')
          device.devicePage.sound = req.body.sound;
        device.save(function(err, deviceRes) {
          if (err) {
            JSONResponse(res, 400, err);
          } else {
            JSONResponse(res, 200, deviceRes);
          }
        });
      }
    );
  }
};

module.exports.postDelete = function(req, res) {
  var idDevice = req.params.idPost;
  console.log(idDevice);
  if (idDevice) {
    devicePost
      .findByIdAndRemove(idDevice)
      .exec(
        function(napaka, lokacija) {
          if (napaka) {
            JSONResponse(res, 404, napaka);
            return;
          }
          JSONResponse(res, 204, null);
        }
      );
  } else {
    JSONResponse(res, 400, {
      "message": 
        "Can't find a device with that ID."
    });
  }
};