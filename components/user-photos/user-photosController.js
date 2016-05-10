'use strict';

cs142App.controller('UserPhotosController', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    /*
     * Since the route is specified as '/photos/:userId' in $routeProvider config the
     * $routeParams  should have the userId property set with the path from the URL.
     */
    var userId = $routeParams.userId;

    $scope.FetchModel('/user/' + userId, $scope.setCurrentUser);
    $scope.FetchModel('/photosOfUser/' + userId, $scope.getUserPhotos);
}]);
