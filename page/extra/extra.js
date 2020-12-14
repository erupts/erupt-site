app.controller("extra", function ($scope, dataService) {

    dataService.eruptReq("/demo/extra_module", null, function (data) {
        $scope.modules = data
    })

})
