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

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.addAward = function () {

        var modalInstance = $modal.open({
            templateUrl: '/app/partials/add-award.html',
            controller: 'AddAwardCtrl',
            //            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (one, two) {
            console.log(one, two);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

storyControllers.controller('AddAwardCtrl', function ($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };
    $scope.one = 9;
    $scope.two = 9;

    $scope.ok = function () {
        $modalInstance.close($scope.one, $scope.two);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});