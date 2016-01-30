// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'ngCordova', 'ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/feed');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'html/menu.html',
      // controller: 'MenuCtrl as menu'
    })
      .state('main.post', {
        url: '/post',
        views: {
          'pageContent': {
            templateUrl: 'html/post.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.login', {
        url: '/login',
        views: {
          'pageContent': {
            templateUrl: 'html/login.html',
            // controller: '<someCtrl> as ctrl'
          }
        }
      })
      .state('main.feed', {
        url: '/feed',
        views: {
          'pageContent': {
            templateUrl: 'html/feed.html',
            controller: 'mainCtrl as ctrl'
          }
        }
      })
})

.factory('Items', function ($firebaseArray) {
  var itemsRef = new Firebase('https://immer.firebaseio.com/items');
  return $firebaseArray(itemsRef);
})

.controller("mainCtrl", function($scope, Items, $log, $cordovaCamera, $ionicPlatform) {
  $scope.items = Items;

  $scope.addItem = function() {
    var options = {
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      correctOrientation: true
    };

    $ionicPlatform.ready(function () {
      $cordovaCamera.getPicture(options)
       .then(function (data) {
         $scope.items.$add({
           'image': 'data:image/jpeg;base64,' + data,
           "Votes": 0,
         })
       })
    })
  }

$scope.voteUp = function () {
   $scope.items.$id(Votes) + 1
    console.log($scope.items.Votes.$id());
  $scope.items.$save().then(function(Items) {
    Items.key() == $scope.items.Votes.$id() // true
  }, function (error) {
    console.log('error' + error);
  })
}

$scope.login = function () {
  var ref = new Firebase("https://immer.firebaseio.com");
  ref.authWithOAuthPopup("facebook", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
    }
  })
}
})


//
// fredRankRef.transaction(function(currentRank) {
//  // If /users/fred/rank has never been set, currentRank will be null.
// return currentRank+1;
// });


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
