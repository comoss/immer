// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase', 'ngCordova'])

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
