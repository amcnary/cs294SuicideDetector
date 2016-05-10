'use strict';
cs142App.controller('ActivityDetailController', ['$scope', '$routeParams', '$interval',
  function ($scope, $routeParams, $interval) {
    /*
     * Since the route is specified as '/users/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    
    $scope.currentActivity = window.bedtimeModels.activityById($routeParams.activityId);
    $scope.main.navigateTo('likedActivities');
    $scope.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
      $scope.main.weeklyActivities[index] = $scope.currentActivity;
      alert($scope.currentActivity.name, ' is on the schedule!');
    }

    // Timer stuff -- broken, but don't worry about it
    $scope.main.timerStarted = false;
    $scope.main.timeLeft  = $scope.currentActivity.duration * 60;
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
                      alert("Time's up!");
                      document.getElementById('timeLeftLabel').style.display = "none";
                    }                    
                  }
    }, 1000, 90000);

}]);
