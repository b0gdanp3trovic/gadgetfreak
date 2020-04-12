/* GET device register */
var request = require('request');
var apiParameter = {
  server: 'http://localhost:' + process.env.PORT
};
if (process.env.NODE_ENV === 'production') {
  apiParameter.server = 'https://gadget-freak.herokuapp.com';
}

module.exports.registerPost = function(req, res) {
  var path = '/api/register';
  
  var sex;
  if(req.body.gender1)
    sex = req.body.gender1;
  else
    sex = req.body.gender2;
  
  var getData = {
    name: req.body.name,
    last: req.body.last,
    email: req.body.email,
    sex: sex,
    city: req.body.city,
    country: req.body.country,
    uname: req.body.uname,
    pword: req.body.pword,
  };
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'POST',
    json: getData
  };
  if (!getData.name || !getData.last|| !getData.email || !getData.sex || !getData.city || !getData.country || !getData.uname || !getData.pword) {
      res.redirect('/register?error=true');
  } else {
    request(
      apiParameters,
      function(err, response , content) {
        if(err){
            res .redirect('/register?error=true');
        } else if (response .statusCode === 400) {
            res .redirect('/register?error=true');
        } else if (response .statusCode === 201) {
            req.session.username = getData.uname;
            res .redirect('/');
        } else {
          showError(req, res , response .statusCode);
        }
      }
    );
  }
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

module.exports.registerGet = function(req, res) {
  res.render('register', { 
    title: 'Register', 
    error: req.query.error
  });
};

/* GET device login */
module.exports.loginGet = function(req, res) {
  res.render('login', { 
    title: 'Log in', 
    error: req.query.error
  });
};


module.exports.loginPost = function(req, res) {
  var path = '/api/login';
  
  var getData = {
    uname: req.body.uname,
    pword: req.body.pword
  };
  var apiParameters = {
    url: apiParameter.server + path,
    method: 'POST',
    json: getData
  };
  if (!getData.uname || !getData.pword) {
    res.redirect('/login?error=true');
  } else {
    request(
      apiParameters,
      function(err, response , content) {
        if(err){
            res.redirect('/login?error=true');
        }else if (response .statusCode === 200) {
            req.session.username = getData.uname;
            res.redirect('/');
        }else if (response .statusCode === 403) {
            res.redirect('/login?error=validation');
        }else if (response.statusCode === 400) {
            res.redirect('/login?error=true');
        } else {
          showError(req, res , response.statusCode);
        }
      }
    );
  }
};

module.exports.logOut = function(req, res) {
  req.session.destroy();
  res.redirect('/');
};

