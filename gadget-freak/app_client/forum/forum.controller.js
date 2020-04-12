(function(){

function forumCtrl($rootScope, $scope, forumData, $uibModal, authentication) {
  var vm = this;
  vm.currentPage = 1;
  vm.header = {
    title: 'Welcome to the forum!',
  };
  if(authentication.currentUser()){
    vm.user = authentication.currentUser().uname;
    vm.currentUserAd = authentication.currentUser().admin;
    console.log(vm.currentUserAd)
  }
  
      
  
  vm.getForumData = function(){
    forumData.forumPosts.then(
      function success(response){
        vm.message = response.data.length > 0 ? "dobro je" : "Not found!";
        vm.data = {
          len : response.length,
          forumPosts : response.data,
        };
        return vm.data;
      }, function error(response){
        vm.message = "There seems to be something wrong."
        console.log(response.e);
      });
      
      
  }
  
  vm.update = function(user, content){
    
  }
  
  vm.showModal = function(postId) {
       var modal =  vm.getForumData();
        var primerekModalnegaOkna = $uibModal.open({
          templateUrl: '/replyModal/replyModal.pogled.html',
          controller: 'replyModalCtrl',
          controllerAs: 'vm',
          resolve: {
           postId: function () {
           return postId;
          }
       }
       
      });
      
      primerekModalnegaOkna.result.then(function(podatki) {
        if (typeof podatki != 'undefined'){
             var indexC = vm.data.forumPosts.map(function(e) { return e._id; }).indexOf(postId);
             vm.data.forumPosts[indexC].content = podatki.content;
          }
        }, function(napaka) {
          alert("There was an error the comment didn't post.");
      });
  };
  
  vm.deletePost = function(postId){
    forumData.deletePost(postId).then(
      function success(response){
        alert("Successfully deleted!");
        vm.data.forumPosts = vm.data.forumPosts.filter(function (post){
          return post._id != postId
        });
      }, function error(response){
        alert("Error!");
        console.log(response.e);
      })
  }

   vm.data = vm.getForumData();
  
  
  
  
  forumCtrl.$inject = ['$rootScope', '$scope', 'forumData', '$uibModal', 'authentication']

  
  
}

/* global angular */
angular
  .module('gadgetfreak')
  .controller('forumCtrl', forumCtrl)
})();