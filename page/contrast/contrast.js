app.controller("contrast", function ($scope, $http, dataService) {
    var codeEle = document.getElementById("erupt-code");
    var activeKey = "active_key";
    dataService.eruptReq("/demo/code-list", null, function (data) {
        var item = sessionStorage.getItem(activeKey);
        if (null == item) {
            $scope.active = data[0];
        } else {
            $scope.active = JSON.parse(item);
        }
        findCode($scope.active);
        $scope.pages = data;
    })

    $scope.choicePage = function (page) {
        if ($scope.active.id === page.id) {
            return;
        }
        sessionStorage.setItem(activeKey, JSON.stringify(page));
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
