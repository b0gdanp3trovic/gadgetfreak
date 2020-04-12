var request = require('request');
var apiParameter = {
  server: 'http://localhost:' + process.env.PORT
};
if (process.env.NODE_ENV === 'production') {
  apiParameter.server = 'https://gadget-freak.herokuapp.com';
}

/* Vrni začetno stran s seznamom lokacij */
module.exports.devicePost = function(req, res) {
    res.render('devicePost');
};

var showError = function(req, res, statusCode) {
  var title, contetn;
  if (statusCode == 404) {
    title = "404, can't find the page.";
    contetn = "Something went wrong please try again.";
  } else {
    title = statusCode + ", error.";
    contetn = "Something went wrong please try again.";
  }
  res.status(statusCode);
  res.render('error', {
    title: title,
    vsebina: contetn
  });
};

var renderSite = function(req, res){
    res.render('devicePost');
}

module.exports.addgadgetPost = function(req, res) {
  var path = '/api/devicePost';
  
  var getData = {
    phone: req.body.phone,
    pic: req.body.picture,
    brand: req.body.brand,
    gen: req.body.gen,
    released: req.body.fist_release,
    predecessor: req.body.predecessor,
    dimensions: req.body.dimensions,
    weight: req.body.weight,
    os: req.body.os,
    cpu: req.body.cpu,
    modem: req.body.modem,
    memory: req.body.memory,
    storage: req.body.storage,
    battery: req.body.battery,
    dis: req.body.disp,
    rear_camera: req.body.rear_camera,
    front_camera: req.body.front_camera,
    sound: req.body.sound
  };
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'POST',
    json: getData
  };
  if (!getData.phone || !getData.pic) {
      res.redirect('/add-gadget?error=true');
  } else {
    request(
      apiParameters,
      function(err, response , content) {
        if(err){
            res .redirect('/add-gadget?error=true');
        } else if (response .statusCode === 400) {
            res .redirect('/add-gadget?error=true');
        } else if (response .statusCode === 201) {
            res .redirect('/devicePost/'+content._id);
        } else {
          showError(req, res , response .statusCode);
        }
      }
    );
  }
};

module.exports.commentPut = function(req, res) {
  var path = '/api/devicePost/' + req.params.idDevice + '/comment';
  
  var getData = {
   currentUser: req.session.username,
   stars: req.body.stars,
   content: req.body.commentContent
  };
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'POST',
    json: getData
  };
  if (!req.session.username) {
      res.redirect('/devicePost/' + req.params.idDevice + '/comment?login=false');
  } else {
    request(
      apiParameters,
      function(err, response , content) {
        if(err){
            res .redirect('/devicePost/' + req.params.idDevice + '/comment?login=false');
        } else if (response .statusCode === 400) {
            res .redirect('/devicePost/' + req.params.idDevice + '/comment?login=false');
        } else if (response .statusCode === 201) {
            res .redirect('/devicePost/'+ req.params.idDevice);
        } else {
          showError(req, res , response .statusCode);
        }
      }
    );
  }
};

module.exports.addPicGet = function(req, res) {
  res.render('addPicture', { 
    title: 'Pictures', 
    login: req.query.login
  });
};

module.exports.addPicPost = function(req, res) {
  var path = '/api/devicePost/' + req.params.idDevice + '/pictures';
  
  var getData = {
   mainPic: req.body.mainPic,
   subPic: req.body.subPic
  };
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'POST',
    json: getData
  };
  if (!req.session.username) {
      res.redirect('/devicePost/' + req.params.idDevice + '/pictures?login=false');
  } else {
    request(
      apiParameters,
      function(err, response , content) {
        if(err){
            res .redirect('/devicePost/' + req.params.idDevice + '/pictures?login=false');
        } else if (response .statusCode === 400) {
            res .redirect('/devicePost/' + req.params.idDevice + '/pictures?login=false');
        } else if (response .statusCode === 201) {
            res .redirect('/devicePost/'+ req.params.idDevice);
        } else {
          showError(req, res , response .statusCode);
        }
      }
    );
  }
};

module.exports.addgadgetEditPut = function(req, res) {
  var path = '/api/devicePost/' + req.params.idDevice ;
  
  var getData = {
    phone: req.body.phone,
    pic: req.body.picture,
    brand: req.body.brand,
    gen: req.body.gen,
    released: req.body.fist_release,
    predecessor: req.body.predecessor,
    dimensions: req.body.dimensions,
    weight: req.body.weight,
    os: req.body.os,
    cpu: req.body.cpu,
    modem: req.body.modem,
    memory: req.body.memory,
    storage: req.body.storage,
    battery: req.body.battery,
    dis: req.body.disp,
    rear_camera: req.body.rear_camera,
    front_camera: req.body.front_camera,
    sound: req.body.sound
  };
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'PUT',
    json: getData
  };
  request(
    apiParameters,
    function(err, response , content) {
      if(err){
          res .redirect('/add-gadget/' + req.params.idDevice + '?error=true');
      } else if (response .statusCode === 400) {
          res .redirect('/add-gadget/' + req.params.idDevice + '?error=true');
      } else if (response .statusCode === 200) {
          res .redirect('/devicePost/'+ req.params.idDevice);
      } else {
        showError(req, res , response .statusCode);
      }
    }
  );
  
};

module.exports.devicePostDelete = function(req, res) {
  var path = '/api/devicePost/' + req.params.idDevice ;
  
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'DELETE',
  };
  request(
    apiParameters,
    function(err, response , content) {
      if(err){
          res .redirect('/devicePost/' + req.params.idDevice + '?error=true');
      } else if (response .statusCode === 400) {
          res .redirect('/devicePost/' + req.params.idDevice + '?error=true');
      } else if (response .statusCode === 204) {
          res .redirect('/');
      } else {
        showError(req, res , response .statusCode);
      }
    }
  );
};

module.exports.devicePostDeleteComment = function(req, res) {
  var path = '/api/devicePost/' + req.params.idDevice + '/comment/' + req.params.idComment ;
  
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'DELETE',
  };
  request(
    apiParameters,
    function(err, response , content) {
      if(err){
          res .redirect('/devicePost/' + req.params.idDevice + '?error=true');
      } else if (response .statusCode === 400) {
          res .redirect('/devicePost/' + req.params.idDevice + '?error=true');
      } else if (response .statusCode === 204) {
          res.redirect('/' );
      } else {
        showError(req, res , response .statusCode);
      }
    }
  );
};

module.exports.commentUpdate = function(req, res) {
  var path = '/api/devicePost/' + req.params.idDevice + '/comment/' + req.params.idComment ;
  
  var getData = {
   stars: req.body.stars,
   content: req.body.commentContent
  };
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'PUT',
    json: getData
  };

  request(
    apiParameters,
    function(err, response , content) {
      if(err){
          res .redirect('/add-gadget/' + req.params.idDevice + '?error=true');
      } else if (response .statusCode === 400) {
          res .redirect('/add-gadget/' + req.params.idDevice + '?error=true');
      } else if (response .statusCode === 200) {
          console.log(getData.content)
          res .redirect('/devicePost/'+ req.params.idDevice);
      } else {
        showError(req, res , response .statusCode);
      }
    }
  );
  
};