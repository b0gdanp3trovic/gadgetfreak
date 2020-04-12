(function() {

  
  var formatComments = function() {
        return function(input, attribute) {
            if (!angular.isObject(input)) return input;
        
            var array = [];
            for(var objectKey in input) {
                array.push(input[objectKey]);
            }
        
            if(attribute){
                array.sort(function(a, b){
                    return new Date(b.date)  - new Date(a.date) ;
                });
            }else{
                array.sort(function(a, b){
                    return new Date(a.date)  - new Date(b.date) ;
                });
            }
            
            return array;
        };
    };
  
  /* global angular */
    angular
    .module('gadgetfreak')
    .filter('formatComments', formatComments);
})();