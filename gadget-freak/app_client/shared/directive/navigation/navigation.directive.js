(function() {
  var navigation = function() {
    return {
      restrict: 'EA',
      templateUrl: '/shared/directive/navigation/navigation.template.html',
      controller: 'navigationCtrl',
      controllerAs: 'navvm'
    };
  };
  
  /* global angular */
  angular
    .module('gadgetfreak')
    .directive('navigation', navigation);
})();