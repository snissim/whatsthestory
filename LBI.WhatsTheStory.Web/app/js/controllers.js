google.load('visualization', '1', { packages: ['corechart'] });

google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['storyApp']);
});

var storyControllers = angular.module('storyControllers', []);

function parseDate(dotnetDate) {
    return new Date(parseInt(dotnetDate.substr(6)));
}

function formatDate(dotnetDate) {
    var date = parseDate(dotnetDate);
    var month = ("0" + (date.getMonth() + 1));
    var day = "0" + date.getDate();
    return date.getFullYear() + "-" + month.substr(month.length - 2) + "-" + day.substr(day.length - 2);
}

function drawVisualization(data) {
/*
    var data = google.visualization.arrayToDataTable([
          ['Mon', 20, 28, 38, 45],
          ['Tue', 31, 38, 55, 66],
          ['Wed', 50, 55, 77, 80],
          ['Thu', 77, 77, 66, 50],
          ['Fri', 68, 66, 22, 15]
    // Treat first row as data as well.
        ], true);
*/

    var datatable = new google.visualization.DataTable();
    datatable.addColumn('date');
    datatable.addColumn('number');
    datatable.addColumn('number');
    datatable.addColumn('number');
    datatable.addColumn('number');

    $.each(data, function (i, quote) {
        datatable.addRow([parseDate(quote.Date), quote.Low, quote.Open, quote.Close, quote.High]);
    });

    var options = {
        legend: 'none'
    };

    var chart = new google.visualization.CandlestickChart(document.getElementById('stock-chart'));
    chart.draw(datatable, options);
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

    $scope.stockPrice_show = function () {
        var clientId = $("#client-select").val();
        $http.get('/data/stockprices/' + clientId).success(function (data) {
            //            console.log('got new data');
//            $.each(data, function (i, quote) {
//                data[i].ParsedDate = formatDate(quote.Date);
//            });
            //$scope.quotes = data;
            drawVisualization(data);
        });

    }

    $scope.setClient = function (clientId) {
        //        $http.get('/data/stockprices/' + clientId).success(function (data) {
        //            //            console.log('got new data');
        //            $.each(data, function (i, quote) {
        //                data[i].ParsedDate = formatDate(quote.Date);
        //            });
        //            $scope.quotes = data;
        //        });

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