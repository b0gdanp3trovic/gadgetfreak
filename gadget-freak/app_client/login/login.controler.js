(function() {
  function loginCtrl($window, authentication) {
    var vm = this;
   
    vm.sendLoginData = function(){
      if(!vm.loginData.uname || !vm.loginData.pword){
        vm.formError = "Please fill all of the required fields.";
        return false;
      }else{
        vm.loginUser(vm.loginData.uname, vm.loginData.pword);
      }
    };
    
    vm.loginUser = function(uname, pword){
      authentication.login({
        uname: uname,
        pword: pword
      }).then(
        function success(res) {
          $window.location.href = '/';
        },
        function error(error) {
          vm.formError = error.data.sporocilo;
        }  
      );
    };
  }
  
  loginCtrl.$inject = ['$window', 'authentication'];
  
  /* global angular */
  angular
    .module('gadgetfreak')
    .controller('loginCtrl', loginCtrl);
})();