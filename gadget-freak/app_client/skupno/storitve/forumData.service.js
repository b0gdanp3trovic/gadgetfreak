(function(){
    var forumData = function($http, authentication){
     var forumPosts = $http.get(
        '/api/forum');
        
        
    var addPost = function(data){
         return $http.post('/api/forum', data);
    }
    
    var edit = function(idPost, content){
      return $http.put('/api/forum/'+ idPost + '/edit', content);
    };
    
    var deletePost = function(idPost){
        return $http.delete('/api/forum/' + idPost);
    }
    
    return {
        addPost : addPost,
        forumPosts : forumPosts,
        edit:edit,
        deletePost : deletePost
    }
    

}


forumData.$inject = ['$http', 'authentication'];

/* global angular */
angular
    .module('gadgetfreak')
    .service('forumData', forumData);
})();
    