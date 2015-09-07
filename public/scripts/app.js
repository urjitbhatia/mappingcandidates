var app = angular.module('mappingcandidatesApp', ['ngRoute', 'ngResource', 'ngMap'])

// app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

//    $locationProvider.html5Mode({
//     enabled: true,
//     requireBase: false
//    });
// }]);


app.service('Candidate', ['$resource', function ($resource) {
  return $resource('/candidate/:id', {id: '@_id'}, {
    update: {
      method: 'PUT'
    }
  });
}]);


app.controller('MainCtrl', ['$scope', 'Candidate', function ($scope, Candidate) {

  $scope.test = "hello world";

  $scope.allCandidates = Candidate.query();
  angular.forEach($scope.allCandidates, function(value) {
    $scope.positions.push({lat:value.lat, lng: value.lng});
  }, null);

  // $scope.candidate = {};

  //   $scope.createCandidate = function() {
  //     console.log(candidate);
  //     Candidate.save($scope.candidate);
  //     $scope.allCandidates.push($scope.candidate);
  //   };

    $scope.$on('mapInitialized', function(event, map) {
      map.setCenter({lat: 39.50, lng: -98.35});
      map.setZoom(5);
    });
}]);
