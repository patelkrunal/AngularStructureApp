'use strict';

angular.module('myApp.view2', ['ngRoute','highcharts-ng','underscore'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])
.controller('View2Ctrl', function ($scope,$http,_)
 {
    $http.get("http://localhost:8080/api/redshiftObject")
        .then(function (response){
            $scope.redshift_data = response.data;
            $scope.x_axis_data=_.pluck($scope.redshift_data, 'rpt_side_mp_id');
            $scope.y_axis_data=(_.pluck($scope.redshift_data, 'avg_day_pr')).map(function(item){return parseInt(item,10);});
            //highcharts-ng directive module.
                $scope.chartConfig = {
                        options: {
                            chart: {
                                type: 'line',
                                zoomType: 'x'
                            }
                        },

                        series: [{
                            data: $scope.y_axis_data
                        }],
                        title: {
                            text: 'Redshift Result'
                        },
                        xAxis: {
                        categories: $scope.x_axis_data,
                        title: {
                            text: 'rpt_side_mp_id'
                        },
                        },
                        yAxis:{
                        title: {
                            text: 'avg_day_pr'
                        },
                        },
                        loading: false

                    }
        });


 });