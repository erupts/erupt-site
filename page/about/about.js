app.controller("about", function ($scope, i18nService) {
    $scope.t = function (key) {
        return i18nService.t(key);
    };
});
