var app = angular.module('mappingcandidates', ['ngRoute', 'ngResource'])

// app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

//    $locationProvider.html5Mode({
//     enabled: true,
//     requireBase: false
//    });
// }]);


app.controller('MainCtrl', ['$scope', function ($scope) {
  
  $scope.test = "hello world";

  }])


;
