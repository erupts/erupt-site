app.controller("cloud", function ($scope, polyglot) {
    $scope.langs = polyglot.langs;
    $scope.lang = polyglot.langs[0];
    $scope.fw = $scope.lang.frameworks[0];
    $scope.pick = function (l) {
        $scope.lang = l;
    };
    $scope.pickFw = function (f) {
        $scope.fw = f;
    };
});
