var app = angular.module('mappingcandidatesApp', ['ngRoute', 'ngResource'])

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
  $scope.candidate = {};

    $scope.createCandidate = function() {
      console.log(candidate);
      Candidate.save($scope.candidate);
      $scope.allCandidates.push($scope.candidate);
    };
}])


;












