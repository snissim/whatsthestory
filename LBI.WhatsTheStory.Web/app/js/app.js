var storyApp = angular.module('storyApp', [
  'ngRoute',
  'storyControllers',
  'ui.bootstrap'
]);

storyApp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
      when('/splash', {
          templateUrl: '/app/partials/splash.html'
      }).
      when('/dashboard', {
          templateUrl: '/app/partials/dashboard.html',
          controller: 'DashboardCtrl'
      }).
      when('/phones/:phoneId', {
          templateUrl: 'partials/phone-detail.html',
          controller: 'PhoneDetailCtrl'
      }).
      otherwise({
          redirectTo: '/splash'
      });
  } ]);