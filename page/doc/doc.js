app.controller("doc", function ($scope, $rootScope, $location, $sce) {
    $scope.loading = true;
    $scope.url = $sce.trustAsResourceUrl("https://www.yuque.com/erupts" + ($location.search().link || '/erupt'));
    angular.element(document.getElementById("frame-doc")).bind('load', function () {
        $scope.loading = false
        $scope.$apply();
    });

});
