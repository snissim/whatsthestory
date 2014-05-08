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
            console.log('got new data');
            $scope.quotes = data;
        });
    }

    $scope.addAward = function () {

        var modalInstance = $modal.open({
            templateUrl: '/app/partials/add-award.html',
            controller: 'AddAwardCtrl',
            //            size: size,
            resolve: {
                award: function () {
                    return {
                        adsScored: $scope.adsScored,
                        sevenPlusAds: $scope.sevenPlusAds,
                        gpcAverage: $scope.gpcAverage
                    };
                }
            }
        });

        modalInstance.result.then(function (award) {
            // just trying to log it right now
            console.log(award);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

storyControllers.controller('AddAwardCtrl', function ($scope, $modalInstance, award) {
    // setting default values b/c it seems like I have to declare $scope vars in order to use them later
    $scope.adsScored = 0;
    $scope.sevenPlusAds = 0;
    $scope.gpcAverage = 0.0;

    $scope.ok = function () {
        award.adsScored = $scope.adsScored;
        award.sevenPlusAds = $scope.sevenPlusAds;
        award.gpcAverage = $scope.gpcAverage;

        $modalInstance.close(award);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});