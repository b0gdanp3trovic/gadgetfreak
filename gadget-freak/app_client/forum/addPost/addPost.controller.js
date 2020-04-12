(function() {
    function addPostCtrl($scope, $window, forumData, authentication){
        var vm = this;
        vm.message = "Post here!";
        if(authentication.currentUser()){
         vm.user = authentication.currentUser().uname;
        }
        
        vm.loggedIn = authentication.loggedIn();
        if(!vm.loggedIn){
            vm.message = "You have to be logged in to post."
        }
         
         console.log(vm.user);
        vm.addPost = function(){
            vm.forum = {
                user: vm.user,
                content : vm.content
            };
            if(!vm.forum.content){
                vm.message  = "Please fill in the field.";
            }else{
                forumData.addPost(vm.forum).then(
                    function success(response){
                        console.log(response);
                        $window.location.href = '/forum';
                    }, function error(response){
                        alert("Error");
                        console.log(response.e);
                    });
            }
        };
    }
    
     addPostCtrl.$inject = ['$scope', '$window' ,'forumData', 'authentication'];
    
/* global angular */
angular
    .module('gadgetfreak')
    .controller('addPostCtrl', addPostCtrl)
})();