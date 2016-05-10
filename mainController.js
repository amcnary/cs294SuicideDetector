'use strict';

var cs142App = angular.module('cs142App', ['ngRoute', 'ngMaterial']);

cs142App.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/trigger/:triggerId', {
                templateUrl: 'components/trigger-detail/trigger-detailTemplate.html',
                controller: 'triggerDetailController'
            }).
            when('/triggerForCalendar/:dayOfWeek', {
                templateUrl: 'components/trigger-detail-for-calendar/trigger-detail-for-calendarTemplate.html',
                controller: 'triggerForCalendarDetailController'
            }).
            when('/converseTest', {
                templateUrl: 'components/trigger-dashboard/trigger-dashboardTemplate.html',
                controller: 'triggerDashboardController'
            }).
            when('/weeklyDashboardMenu', {
                templateUrl: 'components/trigger-dashboard-menu/trigger-dashboard-menuTemplate.html',
                controller: 'triggerDashboardMenuController'
            }).
            otherwise({
                redirectTo: '/converseTest'
            });
    }]);

cs142App.controller('MainController', ['$scope', '$location',
    function ($scope, $location) {
        $scope.main = {};
        $scope.main.title = 'Quality Time';
        // $scope.main.location = '';
        $scope.main.quickEvent = true;
        $scope.main.weeklytriggers = [];
        $scope.main.filterOpen = false;
        var triggersCount = window.bedtimeModels.triggersCount();
        
        $scope.main.likedtriggers = window.bedtimeModels.likedtriggers();
        $scope.main.toggletriggerLike = function(trigger) {
          var index = $scope.main.likedtriggers.indexOf(trigger);
          if(index === -1) {
            $scope.main.likedtriggers.push(trigger);
            document.getElementById('triggerDetailLike').style.color = "#F8BE23";
          } else {
            $scope.main.likedtriggers.splice(index, 1);
            document.getElementById('triggerDetailLike').style.color = "black";
          }
        };
        
        $scope.main.toggleFilter = function() {
            $scope.main.filterOpen = !$scope.main.filterOpen;
        };

        var triggersCount = window.bedtimeModels.triggersCount();

        $scope.main.navigateTo = function(navBarButtonClass) {
            document.getElementById('selected').id = '';
            document.getElementsByClassName(navBarButtonClass)[0].id = "selected";
            $scope.main.quickEvent = (navBarButtonClass === 'quickEvent');
            if(navBarButtonClass === 'quickEvent') {
                $scope.main.randomtriggerId = Math.floor(Math.random() * triggersCount) + 1;
                $location.path('trigger/' + $scope.main.randomtriggerId);
            }
        };

        $scope.settrigger = function(day, triggerId) {
            $scope.main.weeklytriggers[day] = window.bedtimeModels.triggerById(triggerId);
        };

        $scope.main.newtrigger = function(dayIndex){
          var weeklytriggers = $scope.main.weeklytriggers;
          var randomtriggerId = Math.floor(Math.random() * triggersCount) + 1;
          weeklytriggers[dayIndex] = window.bedtimeModels.triggerById(randomtriggerId);
          $scope.main.weeklytriggers = weeklytriggers;
        };  

        $scope.main.randomtrigger = function(){
          var randomtriggerId = Math.floor(Math.random() * triggersCount) + 1;
          return window.bedtimeModels.triggerById(randomtriggerId);
        };  

        $scope.main.resettriggers = function() {
          var weeklytriggers = [];
          for(var day = 0; day < 7; day++){
            var randomtriggerId = Math.floor(Math.random() * triggersCount) + 1;
            weeklytriggers.push(window.bedtimeModels.triggerById(randomtriggerId));
          }
          $scope.main.weeklytriggers = weeklytriggers;
        };
        $scope.main.resettriggers();

        $scope.main.pasttriggersStack = [];
        $scope.main.futuretriggersStack = [];


    }]);
