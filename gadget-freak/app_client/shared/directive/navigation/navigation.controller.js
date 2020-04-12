(function() {
  function navigationCtrl($location, $route, authentication) {
    var navvm = this;
    
    navvm.trenutnaLokacija = $location.path();
    
    navvm.isLogged = authentication.loggedIn();
    
    navvm.currentUser = authentication.currentUser();
    
    if(navvm.currentUser)
      navvm.currentUserAd = navvm.currentUser.admin;

    navvm.logout = function() {
      authentication.logout();
      $location.path('/');
      $route.reload();
    };
  }
  
  navigationCtrl.$inject = ['$location', '$route','authentication'];

  /* global angular */
  angular
    .module('gadgetfreak')
    .controller('navigationCtrl', navigationCtrl);
})();