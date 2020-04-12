(function() {
    var showStars = function() {
        return {
            restrict: 'EA', 
            scope: {
                currentStars: "=stars"
            },
            templateUrl: '/shared/directive/showStars/stars.html'
        };
        
    };

  
  /* global angular */
  angular
    .module('gadgetfreak')
    .directive('showStars', showStars);
})();