(function() {
function indexControler($scope, gadgetFreakData) {
  var vm = this;
  vm.glavaStrani = {
  };
  
  gadgetFreakData.gadgetDataAll().then(
      function success(res) {
        vm.data =  res.data ;
      },
      function error(odgovor) {
      }
    );
  
}

indexControler.$inject = ['$scope', 'gadgetFreakData'];
  /* global angular  */
  angular 
    .module('gadgetfreak')
    .controller('indexControler', indexControler);
})();