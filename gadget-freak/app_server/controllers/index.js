var request = require('request');
var apiParameter = {
  server: 'http://localhost:' + process.env.PORT
};
if (process.env.NODE_ENV === 'production') {
  apiParameter.server = 'https://gadget-freak.herokuapp.com';
}
/* GET home page */
module.exports.index = function(req, res) {
  var path = '/api/sideDevices';
  var paramsReq = {
      url: apiParameter.server + path,
      method: 'GET',
      json: {},
  };

  request(
      paramsReq,
      function(err, response, content) {
          if(err){
              showError(req, res , response.statusCode);
          }else if (response.statusCode == 404){
              showError(req, res , 404);
          } else {  
              renderSite(req, res, content);  
          }
      }     
  );
};

var renderSite = function(req, res, content){
    content.url = req.originalUrl;
    res.render('index', content);
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



/* GET device create forum post*/
module.exports.addforumpost = function(req, res) {
  res.render('addforumpost', { title: 'Post', user : req.session.username});
};

/* GET device add gadget */
module.exports.addgadget = function(req, res) {
    res.render('add-gadget', { 
      title: 'Add gadget', 
      id: req.params.idDevice
    });
};

/* GET device add comment */
module.exports.comment = function(req, res) {
    res.render('comment', 
    { title: 'Comment',
      login: req.query.login
    });
};
module.exports.db = function(req, res) {
    res.render('db', { title: 'Database' });
};
