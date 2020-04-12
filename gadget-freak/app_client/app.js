
(function() {

function settings($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
        templateUrl: 'index.html',
        controller: 'indexControler',
        controllerAs: 'vm'
    })
    .when('/login',{
        templateUrl: '/shared/views/login/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'  
    })
    .when('/devicePost/:idDevice', {
      templateUrl: '/gadgetPost/gadgetpost.view.html',
      controller: 'gadgetPostCtrl',
      controllerAs: 'vm'
    })
    .when('/register', {
      templateUrl: '/shared/views/register/register.html',
      controller: 'registerCtrl',
      controllerAs: 'vm'
    })
    .when('/forum/post/:postId', {
      templateUrl : '/forum/forumPost/forumPost.pogled.html',
      controller : 'forumPostCtrl',
      controllerAs : 'vm'
    })
     .when('/add-post', {
      templateUrl: '/forum/addPost/addPost.pogled.html',
      controller : 'addPostCtrl',
      controllerAs : 'vm'
    })
    .when('/forum', {
      templateUrl: '/forum/forum.pogled.html',
      controller : 'forumCtrl',
      controllerAs : 'vm'
    })
    .when('/add-gadget', {
      templateUrl: '/add-gadget/addPost.view.html',
      controller : 'addGadgetPostCtrl',
      controllerAs : 'vm'
    })
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
}

/* global angular */
  angular 
    .module('gadgetfreak', ['ngRoute', 'ngSanitize', 'ui.bootstrap']) 
    .config(['$routeProvider', '$locationProvider', settings]);
})();