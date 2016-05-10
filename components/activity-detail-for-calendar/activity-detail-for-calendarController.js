'use strict';
cs142App.controller('ActivityForCalendarDetailController', ['$scope', '$routeParams', '$interval',
  function ($scope, $routeParams, $interval) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    $scope.weekday = (JSON.parse($routeParams.dayOfWeek) + 7) % 7;
    $scope.activityForCalendar = $scope.main.weeklyActivities[$scope.weekday];
    $scope.main.navigateTo('weeklyDashboard');
    $scope.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.dayOfWeek = $scope.daysOfWeek[$scope.weekday];
    $scope.dayBefore = $scope.daysOfWeek[($scope.weekday + 6) % 7];
    $scope.dayAfter = $scope.daysOfWeek[($scope.weekday + 1) % 7];

    $scope.main.pastActivitiesStack = [];
    $scope.main.futureActivitiesStack = [];

    $scope.isFavorite = function(activity) {
      // // console.log($scope.main.likedActivities.indexOf(activity) !== -1);
      for(var i = 0; i < $scope.main.likedActivities.length; i++) {
        if($scope.main.likedActivities[i].id === activity.id) {
          return 'favorite';
        }
      }
      return 'notFavorite';
    };
    
    $scope.swapOutCurrentEvent = function(index) {
      $scope.main.weeklyActivities[index] = $scope.activityForCalendar;
      console.log($scope.activityForCalendar.name, ' is on the schedule!');
    }
    $scope.newRandomEvent = function() {
      $scope.main.pastActivitiesStack.push($scope.activityForCalendar);
      if($scope.main.futureActivitiesStack.length === 0) {
        $scope.main.newActivity($scope.weekday);
      } else {
        var nextActivity = $scope.main.futureActivitiesStack.pop();
        $scope.main.weeklyActivities[$scope.weekday] = nextActivity;
      }
      $scope.activityForCalendar = $scope.main.weeklyActivities[$scope.weekday];        
    };
    $scope.lastEvent = function() {
      $scope.main.futureActivitiesStack.push($scope.activityForCalendar);
      console.log($scope.main.pastActivitiesStack, $scope.main.pastActivitiesStack.length);
      if($scope.main.pastActivitiesStack.length > 0) {
        var lastActivity = $scope.main.pastActivitiesStack.pop();
        $scope.main.weeklyActivities[$scope.weekday] = lastActivity;
        $scope.activityForCalendar = $scope.main.weeklyActivities[$scope.weekday];        
      }
    };


    // Timer stuff -- broken, but don't worry about it
    $scope.main.timerStarted = false;
    $scope.main.timeLeft  = $scope.activityForCalendar.duration * 60;
    $scope.main.initialTime = $scope.main.timeLeft;
    $scope.main.timeLeftLabel = parseInt($scope.main.timeLeft/60) + ' minutes and ' + ($scope.main.timeLeft % 60) + ' seconds';
    $scope.startTimer = function() {
      $scope.main.timerStarted = true;
    }
    $interval( function() {
                  if($scope.main.timerStarted) {
                    $scope.main.timeLeft  -= 1;
                    $scope.main.timeLeftLabel = parseInt($scope.main.timeLeft/60) + ' minutes and ' + ($scope.main.timeLeft % 60) + ' seconds'; 
                    if($scope.main.timeLeft <= 0){
                      document.getElementById('timeLeftLabel').style.display = "none";
                    }                    
                  }
    }, 1000, 90000);
}]);
