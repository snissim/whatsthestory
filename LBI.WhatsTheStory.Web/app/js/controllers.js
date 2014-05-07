var storyControllers = angular.module('storyControllers', []);

storyControllers.controller('DashboardCtrl', function ($scope, $http) {
    $http.get('/data/tests').success(function(data) {
      $scope.tests = data;
    });
});