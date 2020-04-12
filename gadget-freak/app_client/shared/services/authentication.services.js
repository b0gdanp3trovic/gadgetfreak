(function() {
  function authentication($window, $http) {
    var b64Utf8 = function (niz) {
      return decodeURIComponent(Array.prototype.map.call($window.atob(niz), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    };
  
    var setToken = function(zeton) {
      $window.localStorage['gadgetfreak-token'] = zeton;
    };
    
    var getToken = function() {
     return $window.localStorage['gadgetfreak-token'];
    };
    
    var registration = function(uporabnik) {
      return $http.post('/api/registration', uporabnik).then(
        function success(odgovor) {
          setToken(odgovor.data.token);
        });
    };

    var login = function(uporabnik) {
      return $http.post('/api/login', uporabnik).then(
        function success(odgovor) {
          setToken(odgovor.data.token);
        });
    };

    var logout = function() {
      $window.localStorage.removeItem('gadgetfreak-token');
    };
    
    var loggedIn = function() {
        var zeton = getToken();
        if (zeton) {
          var koristnaVsebina = JSON.parse(b64Utf8(zeton.split('.')[1]));
          return koristnaVsebina.dataCreated > Date.now() / 1000;
        } else {
          return false;
        }
    };
    
    var currentUser = function() {
        if (loggedIn()) {
          var zeton = getToken();
          var koristnaVsebina = JSON.parse(b64Utf8(zeton.split('.')[1]));
          return {
            uname: koristnaVsebina.email,
            name: koristnaVsebina.name,
            admin: koristnaVsebina.admin
          };
        }
    };

    return {
      setToken: setToken,
      getToken: getToken,
      login: login,
      registration: registration,
      loggedIn: loggedIn,
      currentUser: currentUser,
      logout: logout
    };
  }
  authentication.$inject = ['$window', '$http'];
  
  /* global angular */
  angular
    .module('gadgetfreak')
    .service('authentication', authentication);
})();