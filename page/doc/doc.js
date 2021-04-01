app.controller("doc", function ($scope, $rootScope, $timeout) {
    $scope.loading = true;
    angular.element(document.getElementById("frame-doc")).bind('load', function () {
        $scope.loading = false
        $scope.$apply();
    });

});
