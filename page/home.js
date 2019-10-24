app.controller("home", function ($scope) {
    $scope.erupt = [
        {annotation: 'primaryKeyCol'},
        {annotation: 'name'},
        {annotation: 'desc'},
        {annotation: 'loginUse'},
        {annotation: '@rowOperation[]'},
        {annotation: '@Filter'},
        {annotation: '@orderBy'},
        {annotation: 'dataProxy'},
        {annotation: '@Tree'},
        {annotation: '@param'},
    ]
    $scope.eruptField = [
        {annotation: '@View'},
        {annotation: '@Edit'},
        {annotation: '@params'},
    ]
});