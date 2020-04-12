(function() {
  function registerCtrl($window, authentication) {
    var vm = this;
   
    vm.sendRegisterData = function(){
      vm.regData.gender = "";
      
      if(!vm.regData){
        vm.formError = "Please fill all the fields.";
        return false;  
      }
      
      if(!vm.regData.name || !vm.regData.last || 
      !vm.regData.email || !(vm.regData.gender1!="" || vm.regData.gender2 !="") ||
      !vm.regData.city  || !vm.regData.uname || !vm.regData.country ||
      !vm.regData.pword || !vm.regData.cpword){
          vm.formError = "Please fill all the fields.";
          return false;  
       }
      /*if(!/\d/.test(vm.regData.pwrod) || !/[A-Z]/.test(vm.regData.pword) || !/[a-z]/.test(vm.regData.pword) || !vm.regData.pword.length > 5){
        vm.formError = "";
        vm.pwordError = 'Passwords must contain and be: more than 6 symbols, lower case letter, \
              upper case letter, \
              a number';
        return false;   
      }*/
      if(vm.regData.pword != vm.regData.cpword){
        vm.formError = "";
        vm.pwordError = "";
        vm.matchError = "Passwords must match.";
        return false;   
      }
      
      if(vm.regData.gender1)
        vm.regData.gender = vm.regData.gender1;
      else
        vm.regData.gender = vm.regData.gender2;
      vm.regUser();
      
    };
    
    vm.regUser = function(){
      authentication.registration({
        name: vm.regData.name,
        uname: vm.regData.uname,
        pword: vm.regData.pword
      }).then(
        function success(res) {
          $window.location.href = '/';
        },
        function error(res) {
          vm.formError = res.data.message;
        }  
      );
    };
  }
  
  registerCtrl.$inject = ['$window', 'authentication'];
  
  /* global angular */
  angular
    .module('gadgetfreak')
    .controller('registerCtrl', registerCtrl);
})();