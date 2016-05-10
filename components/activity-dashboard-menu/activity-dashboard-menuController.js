'use strict';
cs142App.controller('ActivityDashboardMenuController', ['$scope', '$routeParams', '$interval',
  function ($scope, $routeParams, $interval) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    $scope.weekdays = ['Sunday', 
                    'Monday', 
                    'Tuesday', 
                    'Wednesday', 
                    'Thursday', 
                    'Friday', 
                    'Saturday'];

    var activitiesCount = window.bedtimeModels.activitiesCount();


    if($scope.main.weeklyActivities.length === 0){
      $scope.main.resetActivities();
    }

    $scope.main.resetWeekActivities = function() {
      $scope.main.weeklyActivities = [];
      $scope.main.resetActivities();
    }

    var today = new Date();

  }]);
