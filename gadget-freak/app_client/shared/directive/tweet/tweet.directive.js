(function() {
    
   var tweet = function ($window, $location) {
        return {
          restrict: 'A',
          scope: {
              tweet: '=',
              tweetUrl: '='
          },
          link: function (scope, element, attrs) {
              if (!$window.twttr) {
                  // Load Twitter SDK if not already loaded
                  /* global $ */
                  $.getScript('//platform.twitter.com/widgets.js', function () {
                      renderTweetButton();
                  });
              } else {
                  renderTweetButton();
              }
        
              var watchAdded = false;
              function renderTweetButton() {
                  if (!scope.tweet && !watchAdded) {
                      // wait for data if it hasn't loaded yet
                      watchAdded = true;
                      var unbindWatch = scope.$watch('tweet', function (newValue, oldValue) {
                          if (newValue) {
                              renderTweetButton();
                          
                              // only need to run once
                              unbindWatch();
                          }
                      });
                      return;
                  } else {
                      element.html('<a href="https://twitter.com/share" class="twitter-share-button" data-text="Chek out this phone '+$location.absUrl()+'" data-url="' + (scope.tweetUrl || $location.absUrl()) + '">Tweet</a>');
                      $window.twttr.widgets.load(element.parent()[0]);
                  }
              }
          }
        };
    };
    tweet.$inject = ['$window', '$location'];
  /* global angular */
  angular
    .module('gadgetfreak')
    .directive('tweet', tweet);
})();