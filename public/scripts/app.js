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
  $scope.allCandidates = Candidate.query();
  $scope.$on('mapInitialized', function (event, map) {
    map.setCenter({lat: 39.50, lng: -98.35});
    map.setZoom(4);
    
    var log = [];
    angular.forEach($scope.allCandidates, function (value) {
      value.events.forEach(function(candidateEvent) {

        var contentString = 'events';


        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        
        var marker = new google.maps.Marker({
          position: {lat: Number(candidateEvent.lat), lng: Number(candidateEvent.lng)},
          map: $scope.map,
          title: 'hello'
        });
        
        marker.addListener('click', function() {
        infowindow.open(map, marker);
        });

      });
    }, log);
  
  });
}]);
