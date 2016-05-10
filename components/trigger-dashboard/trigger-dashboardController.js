'use strict';
cs142App.controller('ActivityDashboardController', ['$scope', '$routeParams', '$interval', '$location',
  function ($scope, $routeParams, $interval, $location) {
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
    $scope.pastActivitiesStack = [[], [], [], [], [], [], []];
    $scope.futureActivitiesStack = [[], [], [], [], [], [], []];

    if($scope.main.weeklyActivities.length === 0){
      $scope.main.resetActivities();
    }
    $scope.exportingPDF = false;
    $scope.currentActivity = $scope.main.weeklyActivities[0];


    $scope.main.goToActivity = function(dayOfWeek){
      $location.path('/activityForCalendar/' + dayOfWeek);
    };

    $scope.showActivityDetails = function(activityId) {
    };
    $scope.showActivityDetails = [false, false, false, false, false, false, false];

    $scope.exportToPdf = function() {
      console.log('downloading');
    };


    $scope.newRandomEvent = function(weekday) {
      $scope.pastActivitiesStack[weekday].push($scope.main.weeklyActivities[weekday]);
      if($scope.futureActivitiesStack[weekday].length === 0) {
        $scope.main.weeklyActivities[weekday] = $scope.main.randomActivity();
      } else {
        var nextActivity = $scope.futureActivitiesStack[weekday].pop();
        $scope.main.weeklyActivities[weekday] = nextActivity;

      }
    };
    $scope.lastEvent = function(weekday) {
      $scope.futureActivitiesStack[weekday].push($scope.main.weeklyActivities[weekday]);
      if($scope.pastActivitiesStack[weekday].length > 0) {
        var lastActivity = $scope.pastActivitiesStack[weekday].pop();
        $scope.main.weeklyActivities[weekday] = lastActivity;
      }
    };

    $scope.exportToICal = function() {
      confirm('Exporting to Calendar...', 'Okay');
    };


  }]);
