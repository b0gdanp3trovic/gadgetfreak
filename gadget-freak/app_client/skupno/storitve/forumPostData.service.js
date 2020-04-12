(function(){
    var forumPostData = function($http, forumPostId){
    var forumPost = function(forumPostId){
       return $http.get('/api/forum/' + forumPostId);
    }
    
    var replyPost = function(postId, data){
   
    return $http.post('/api/forum/' + postId, data);
    
    }
    
    var deleteReply = function(postId, replyId){
        return $http.delete('/api/forum/'+ postId + '/' + replyId)
    }
    return {
        replyPost : replyPost,
        forumPost : forumPost,
        deleteReply : deleteReply
        
    }
}



forumPostData.$inject = ['$http'];


/*global angular*/
angular
    .module('gadgetfreak')
    .service('forumPostData', forumPostData)
})();

