app.controller("cloud", function ($scope, $timeout) {
    $timeout(function () {
        Prism.highlightAll();
    }, 280);
});
