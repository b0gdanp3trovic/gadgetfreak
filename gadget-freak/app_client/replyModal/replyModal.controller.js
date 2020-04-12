(function() {
  function replyModalCtrl($rootScope, $uibModalInstance ,postId, forumData) {
    var vm = this;
    vm.postId = postId;
    vm.modalnoOkno = {
      preklici: function() {
        $uibModalInstance.close();
      },closeS: function(odgovor) {
        $uibModalInstance.close(odgovor);
      }
    };
    
    
    vm.put = function(content){
      vm.data = {
        content : content
      };
      forumData.edit(vm.postId, vm.data).then(
        function success(response){
          vm.modalnoOkno.closeS(response.data);
        }, function error(response){
          alert("Error!");
        });
    };

    
    
  }
  
  replyModalCtrl.$inject = ['$rootScope','$uibModalInstance', 'postId', 'forumData'];

  /* global angular */
  angular
    .module('gadgetfreak')
    .controller('replyModalCtrl', replyModalCtrl);
})();