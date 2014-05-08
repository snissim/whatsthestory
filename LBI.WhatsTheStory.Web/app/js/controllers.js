var storyControllers = angular.module('storyControllers', []);

function formatDate(dotnetDate) {
    var date = new Date(parseInt(dotnetDate.substr(6)));
    var month = ("0" + (date.getMonth() + 1));
    var day = "0" + date.getDate();
    return date.getFullYear() + "-" + month.substr(month.length - 2) + "-" + day.substr(day.length - 2);
}

storyControllers.controller('DashboardCtrl', function ($scope, $http, $log, $modal, $location, $routeParams) {
    $("#client-select").change(function (e) {
        var clientId = $(this).val();

        if (clientId == "[Select Client]") {
            $("#quotes tbody tr").remove();
            $("#awards tbody tr").remove();
        }
        else {
            $scope.setClient(clientId);
        }
    });

    $scope.setClient = function (clientId) {
        $http.get('/data/stockprices/' + clientId).success(function (data) {
            //            console.log('got new data');
            $.each(data, function (i, quote) {
                data[i].ParsedDate = formatDate(quote.Date);
            });
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