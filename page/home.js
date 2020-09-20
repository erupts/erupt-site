app.controller("home", function ($scope) {
    $scope.erupt = [
        {annotation: '@Erupt'},
        {annotation: '@EruptField'},
        {annotation: '@EruptRouter'},
        {annotation: '@EruptApi'},
        {annotation: '@EruptTpl'},
        {annotation: '@TplAction'},
        {annotation: '@EruptProperty'},
    ];

    $scope.modules = [
        {name: "bi"},
        {name: "job"},
        {name: "tpl"}
    ]

    $scope.steps = [
        {name: "java"},
        {name: "erupt"},
        {name: "java"}
    ]


    // $scope.erupt = [
    //     {annotation: 'primaryKeyCol'},
    //     {annotation: 'name'},
    //     {annotation: 'desc'},
    //     {annotation: 'loginUse'},
    //     {annotation: 'rowOperation'},
    //     {annotation: 'filter'},
    //     {annotation: 'orderBy'},
    //     {annotation: 'dataProxy'},
    //     {annotation: 'tree'},
    //     {annotation: 'param'},
    // ];
    //
    //
    // $scope.eruptField = [
    //     {annotation: '@View'},
    //     {annotation: '@Edit'},
    //     {annotation: '@params'},
    // ];
    //
    // $scope.view = [
    //     {annotation: 'title'},
    //     {annotation: 'column'},
    //     {annotation: 'viewType'},
    //     {annotation: 'show'},
    //     {annotation: 'sortable'},
    //     {annotation: 'export'},
    //     {annotation: 'className'},
    //     {annotation: 'template'},
    // ];
    //
    // $scope.edit = [
    //     {annotation: 'title'},
    //     {annotation: 'desc'},
    //     {annotation: 'notNull'},
    //     {annotation: 'show'},
    //     {annotation: 'readOnly'},
    //     {annotation: 'placeHolder'},
    //     {annotation: 'search'},
    //     {annotation: 'orderBy'},
    //     {annotation: 'filter'},
    //     {annotation: 'type'},
    //     {annotation: 'inputType'},
    //     {annotation: 'numberType'},
    //     {annotation: 'boolType'},
    //     {annotation: 'htmlType'},
    //     {annotation: 'choiceType'},
    //     {annotation: 'dateType'},
    //     {annotation: 'sliderType'},
    //     {annotation: 'attachmentType'},
    //     {annotation: 'dependSwitchType'},
    //     {annotation: 'referenceTreeType'},
    //     {annotation: 'referenceTableType'},
    // ];
});
