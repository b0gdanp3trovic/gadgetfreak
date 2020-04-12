(function() {
  function gadgetPostCtrl($routeParams, $uibModal, gadgetFreakData, authentication) {
    var vm = this;
    vm.idDevice = $routeParams.idDevice;
    vm.commentsOffset = 0;
    vm.asc = true;
    if(authentication.currentUser())
      vm.currentUserAd = authentication.currentUser().admin;
    
    vm.commentOffsetInc = function(){
      if(vm.commentsOffset + 4 < vm.data.comments.length )
        vm.commentsOffset += 5;
    };
    
    vm.commentOffsetDec = function(){
      if(vm.commentsOffset > 0)
        vm.commentsOffset -= 5;
    };
    
    vm.commentSortType = function(){
      vm.asc = !vm.asc;
    };
    
    vm.showCommentWindow = function() {
      var primerekModalnegaOkna = $uibModal.open({
        templateUrl: '/commentModalWin/commentModalWin.view.html',
        controller: 'commentModalWin',
        controllerAs: 'vm',
        resolve: {
          podrobnostiLokacije: function() {
            return {
              idDevice: vm.idDevice,
            };
          }
        }
      });
      
      
      primerekModalnegaOkna.result.then(function(podatki) {
        if (typeof podatki != 'undefined'){
            vm.data.comments.push(podatki);
          }
        }, function(napaka) {
          alert("There was an error the comment didn't post.");
      });
    };
    
    vm.editCommentWindow = function(cid) {
      var primerekModalnegaOkna = $uibModal.open({
        templateUrl: '/commentModalWin/commentModalWin.view.html',
        controller: 'commentModalWin',
        controllerAs: 'vm',
        resolve: {
          podrobnostiLokacije: function() {
            return {
              idDevice: vm.idDevice,
              idComment: cid
            };
          }
        }
      });
      
      primerekModalnegaOkna.result.then(function(podatki) {
        if (typeof podatki != 'undefined'){
            var indexC = vm.data.comments.map(function(e) { return e._id; }).indexOf(cid);
            var comment = vm.data.comments[indexC];
            vm.data.comments.splice(indexC, 1);
            comment.content = podatki.content;
            comment.stars = podatki.stars;
            vm.data.comments.push(comment);
          }
        }, function(napaka) {
          alert("There was an error the comment didn't change.");
      });
    };
    
    vm.removeComment = function(cid){
      console.log(cid);
      gadgetFreakData.removeComment(vm.idDevice, cid).then(
        function success(res) {
          var indexC = vm.data.comments.map(function(e) { return e._id; }).indexOf(cid);
          vm.data.comments.splice(indexC, 1);
        },
        function error(odgovor) {
          console.log(odgovor.e);
        }
        
      );
    };
     
     
    gadgetFreakData.gadgetDataById(vm.idDevice).then(
      function success(res) {
        vm.data =  res.data ;
        vm.title = {
          title: res.data.frontPage.phone
        };
      },
      function error(odgovor) {
        console.log(odgovor.e);
      }
    );
    vm.title = {
      title: vm.idDevice
    };
  }
  
  gadgetPostCtrl.$inject = ['$routeParams', '$uibModal', 'gadgetFreakData', 'authentication'];
  
  /* global angular */
  angular
    .module('gadgetfreak')
    .controller('gadgetPostCtrl', gadgetPostCtrl);
})();