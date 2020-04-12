(function() {
  var gadgetFreakData = function($http, authentication) {
    var gadgetDataAll = function(){
      return $http.get('/api/devicePost/');
    };
    
    var gadgetDataById = function(idDevice) {
      return $http.get('/api/devicePost/' + idDevice);
    };
    
    var postGadget = function(data){
      return $http.post('/api/devicePost', data);
    };
    var addCommentByID = function(idDevice, data) {
      return $http.post('/api/devicePost/' + idDevice + '/comment', data,  {
        headers: {
          Authorization: 'Bearer ' + authentication.getToken()
        }
      });
    };
    
    var editCommentByID = function(idDevice, data, commentId){
      return $http.put('/api/devicePost/' + idDevice + '/comment/' + commentId, data);
    };
    
    var loginUser = function(data){
      return $http.post('/api/login/', data);
    };
    
    var regUser = function(data){
      return $http.post('/api/register/', data);
    };
    
    var removeComment = function(idDevice, idComment){
      return $http.delete('/api/devicePost/' + idDevice + '/comment/' + idComment);
    };
    
    return {
      gadgetDataAll: gadgetDataAll,
      gadgetDataById: gadgetDataById,
      postGadget: postGadget,
      addCommentByID: addCommentByID,
      editCommentByID: editCommentByID,
      loginUser: loginUser,
      regUser: regUser,
      removeComment: removeComment
    };
  };
  
  
  
  gadgetFreakData.$inject = ['$http', 'authentication'];
  
  /* global angular */
  angular
    .module('gadgetfreak')
    .service('gadgetFreakData', gadgetFreakData);
})();