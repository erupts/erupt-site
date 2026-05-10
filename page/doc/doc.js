app.controller("doc", function ($scope, $rootScope, $location, $sce) {
    $scope.loading = true;
    $scope.url = $sce.trustAsResourceUrl("https://docs.erupt.xyz" + ($location.search().link || ''));
    angular.element(document.getElementById("frame-doc")).bind('load', function () {
        $scope.loading = false
        $scope.$apply();
    });

});
