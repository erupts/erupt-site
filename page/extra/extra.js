app.controller("extra", function ($scope, dataService, $window) {

    $scope.window = $window;

    dataService.eruptReq("/demo/extra_module", null, function (data) {
        $scope.modules = data
    })

})
