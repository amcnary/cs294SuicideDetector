'use strict';


cs142App.controller('UserListController', ['$scope',
    function ($scope) {
        $scope.main.title   = 'Users';
        $scope.FetchModel('/user/enhancedList', $scope.setUsers);
        $scope.advancedOptions = $scope.main.advancedOptions;
    }]);

