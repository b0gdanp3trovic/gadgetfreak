(function() {
  function commentModalWin($uibModalInstance, gadgetFreakData, podrobnostiLokacije) {
    var vm = this;
    
    vm.deviceData = podrobnostiLokacije;
    vm.commentId = "";
    
    if(podrobnostiLokacije.idComment != undefined && podrobnostiLokacije.idComment.length > 0)
      vm.commentId = podrobnostiLokacije.idComment;
    
    vm.modalWin = {
      close: function() {
        $uibModalInstance.close();
      },closeS: function(odgovor) {
        $uibModalInstance.close(odgovor);
      }
    };
   
    vm.sendData = function() {
      vm.formError = "";
      vm.commentData.name = "Beta";
      if (!vm.commentData.name || !vm.commentData.stars || !vm.commentData.comment) {
        vm.formError = "Please fill all of the required fields.";
        return false;
      } else {
        if(vm.commentId == "")
          vm.addComment(vm.deviceData.idDevice, vm.commentData);
        else
          vm.editComment(vm.deviceData.idDevice, vm.commentData, vm.commentId)
        return false;
      }
    };
    
    vm.addComment = function(idLokacije, podatkiObrazca) {
      gadgetFreakData.addCommentByID(idLokacije, {
        currentUser: podatkiObrazca.name,
        stars: podatkiObrazca.stars,
        content: podatkiObrazca.comment
      }).then(
        function success(odgovor) {
          vm.modalWin.closeS(odgovor.data);
        },
        function error(odgovor) {
          vm.formError = "You need to be logged in.";
        }
      );
    };
    
    vm.editComment = function(idLokacije, podatkiObrazca, idComment) {
      gadgetFreakData.editCommentByID(idLokacije, {
        currentUser: podatkiObrazca.name,
        stars: podatkiObrazca.stars,
        context: podatkiObrazca.comment
      }, idComment).then(
        function success(odgovor) {
          vm.modalWin.closeS(odgovor.data);
        },
        function error(odgovor) {
          vm.formError = "Error!";
        }
      );
    };
  }
  
  
    
  commentModalWin.$inject = ['$uibModalInstance', 'gadgetFreakData', 'podrobnostiLokacije'];

  /* global angular */
  angular
    .module('gadgetfreak')
    .controller('commentModalWin', commentModalWin);
})();