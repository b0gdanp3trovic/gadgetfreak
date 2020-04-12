(function() {
    function addGadgetPostCtrl($window, gadgetFreakData){
        var vm = this;
         
        vm.sendData = function(){
            if(!vm.data || !vm.data.phone || !vm.data.pic){
                vm.formError  = "Please fill in the field.";
            }else{
                gadgetFreakData.postGadget({
                    phone: vm.data.phone,
                    pic: vm.data.pic,
                    brand: vm.data.brand,
                    generation: vm.data.gen,
                    released: vm.data.released,
                    predecessor: vm.data.predecessor,
                    dimensions: vm.data.dim,
                    weight: vm.data.weight,
                    os: vm.data.os,
                    cpu: vm.data.cpu,
                    modem: vm.data.modem,
                    memory: vm.data.memory,
                    storage: vm.data.storage,
                    battery: vm.data.battery,
                    display: vm.data.dis,
                    rear_camera: vm.data.rear_camera,
                    front_camera: vm.data.front_camera,
                    sound: vm.data.sound
                }).then(
                    function success(response){
                        console.log(response);
                        $window.location.href = '/';
                    }, function error(response){
                        alert(response.e);
                    });
            }
        };
    }
    
     addGadgetPostCtrl.$inject = ['$window' ,'gadgetFreakData'];
    
/* global angular */
angular
    .module('gadgetfreak')
    .controller('addGadgetPostCtrl', addGadgetPostCtrl)
})();