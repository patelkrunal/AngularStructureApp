'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope,$http) {
    $scope.var1="Hello world";
    $http.get("http://www.w3schools.com/angular/customers.php")
    .then(function (response){
        $scope.myData = response.data.records;

    });
    $http.get("http://localhost:8080/api")
    .then(function (response){
        $scope.myBuckets = response.data.Buckets;
    });
//        .then(function (response){
//            $scope.myBuckets = response.data.message[0].Buckets;
//
//        });
});