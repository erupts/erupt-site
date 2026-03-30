app.controller("flow", function ($scope, $timeout) {
    $timeout(function () {
        Prism.highlightAll();
    }, 100);
});
