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

  $('.showButton').click(function (e) {
    console.log('hello')
    $('.events').show()

  })

app.controller('MainCtrl', ['$scope', 'Candidate', function ($scope, Candidate) {
  $scope.allCandidates = Candidate.query();
  $scope.$on('mapInitialized', function (event, map) {
    map.setCenter({lat: 39.50, lng: -98.35});
    map.setZoom(4);
    map.setOptions({ minZoom: 4, maxZoom: 40 });

    
    var log = [];
    angular.forEach($scope.allCandidates, function (value) {
      value.events.forEach(function(candidateEvent) {

        var contentString = '<div id="content">'+ '<h4>' + candidateEvent.title + '</h4>' + '<hr>' + candidateEvent.date + '<br>' + candidateEvent.time + '<br>' + candidateEvent.url;

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: {lat: Number(candidateEvent.lat), lng: Number(candidateEvent.lng)},
          map: $scope.map,
          // icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        });
        
        marker.addListener('click', function() {
        infowindow.open(map, marker);
        });

      });
    }, log);
  
  });
}]);
