/* global angular, $http */
var gadgetFreakApp = angular.module('gadgetfreak', []);

var forumCtrl = function($scope, forumData){
    forumData.then(
        function success(response){
            $scope.data = {
                forumPosts: response.data
            };
        }, function error(response){
            console.log(response.e);
        })
}

var forumData = function($http){
    return $http.get('/api/forum');
}



var forumPostData = function($http){
    return $http.get()
}

var forumPostCtrl = function($scope, $forumPostData){
    forumPostData.then(
        function success(response){
            $scope.data = {
                user : response.data.user,
                content : response.data.content,
                replies : response.data.replies
            };
        }, function error(response){
            console.log(response.e);
        })
}



gadgetFreakApp
    .controller('forumCtrl', forumCtrl)
    .service('forumData', forumData)