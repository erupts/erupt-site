app.controller("contrast", function ($scope, $http, dataService) {
    let codeEle = document.getElementById("erupt-code");
    dataService.eruptReq("/demo/code-list", null, function (data) {
        $scope.active = data[0];
        findCode($scope.active);
        $scope.pages = data;
    })


    // $scope.$on("$destroy", function () {
    //     $("")
    // })


    $scope.choicePage = function (page) {
        if ($scope.active.id === page.id) {
            return;
        }
        $scope.active = page;
        findCode(page);
    }

    function findCode(page) {
        dataService.eruptReq("/demo/code-by-id", {id: page.id}, function (data) {
            $("#erupt-code code").text(data[0].code);
            Prism.highlightAllUnder(codeEle);
        })
    }
});
