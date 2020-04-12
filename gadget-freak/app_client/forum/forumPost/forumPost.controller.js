(function() {
    
    function forumPostCtrl($scope, $routeParams, forumPostData, authentication){
    var vm = this;
    vm.header = {
        title: 'Wwwelcome to the forum!',
    };
    vm.loggedIn = authentication.loggedIn();
    vm.postId = $routeParams.postId;
    
    
    vm.getForumPostData = function(){
        forumPostData.forumPost(vm.postId).then(
            function success(response){
                vm.message = response.data.length > 0 ? "dobro je" : "Not found!";
                vm.url = "/api/forum/" + vm.postId
                vm.data = {
                    forumPost : response.data,
                }
            }, function error(response){
                vm.message = "Not found!";
                console.log(response.e);
            })
    }
    
    
    if(authentication.currentUser()){
        vm.user = authentication.currentUser().uname;
    }
    
    vm.replyPost = function(){
        vm.dataz = {
            user: vm.user,
            reply : vm.reply
        }
        if(!vm.reply){
            vm.message = "Comment requires at least one character."
        }else{
            forumPostData.replyPost(vm.postId, vm.dataz).then(
                function success(response){
                    vm.message = "Success!"
                    vm.getForumPostData();
                }, function error(response){
                    vm.message = "Error!"
                    console.log(response.e);
                });
        }
    }
    
    vm.deleteReply = function(postId, replyId){
        forumPostData.deleteReply(postId, replyId).then(
            function success(response){
                alert("Successfully deleted!");
                vm.getForumPostData();
            }, function error(response){
                alert("Error!");
                console.log(response.e);
            })
            
        
    }
    
    vm.getForumPostData();
    
}
  forumPostCtrl.$inject = ['$scope', '$routeParams', 'forumPostData', 'authentication'];
  
  
/* global angular */
angular
    .module('gadgetfreak')
    .controller('forumPostCtrl', forumPostCtrl);
    
})();