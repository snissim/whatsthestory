var storyControllers = angular.module('storyControllers', []);

storyControllers.controller('DashboardCtrl', function ($scope, $http, $log, $modal, $location, $routeParams) {
    $("#client-select").change(function (e) {
        var clientId = $(this).val();

        if (clientId == "[Select Client]") {
            $("#quotes tbody tr").remove();
        }
        else {
            $scope.setClient(clientId);
        }
    });

    $scope.setClient = function (clientId) {
        $http.get('/data/stockprices/' + clientId).success(function (data) {
            //            console.log('got new data');
            $scope.quotes = data;
        });

        $http.get('/data/awardaverages/' + clientId).success(function (data) {
            $scope.awardAverages = data;
        });
    }

    $scope.addAward = function () {

        var modalInstance = $modal.open({
            templateUrl: '/app/partials/add-award.html',
            controller: 'AddAwardCtrl'
        });

        modalInstance.result.then(function (award) {
            console.log(award);
            $http.post('/data/addawardaverage', award).success(function () {
                console.log('added successfully');
                $scope.awardAverages.push(award);
            });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

storyControllers.controller('AddAwardCtrl', function ($scope, $modalInstance) {
    $scope.award = { AdsScored: null, SevenPlusAds: null, GpcAverage: null };

    $scope.ok = function () {
        $scope.award.Company = $("#client-select").val();

        $modalInstance.close($scope.award);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});