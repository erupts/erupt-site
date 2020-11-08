app.controller("contrast", function ($scope, $http) {
    let codeEle = document.getElementById("erupt-code");

    // $http.get(host + "/demo-file-content/Student")
    //     .then(function (response, status, headers, config) {
    //         $("#erupt-code code").text(response.data);
    //
    //     })

    Split(['#code', '#view'], {
        sizes: [35, 65],
        minSize: [200, 400],
        expandToMin: true,
        gutterSize: 3
    })

    Prism.highlightAllUnder(codeEle);

    // $scope.$on("$destroy", function () {
    //     $("")
    // })
});
