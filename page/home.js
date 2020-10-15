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


    $scope.steps = [
        {name: "java"},
        {name: "erupt"},
        {name: "java"}
    ]

    $scope.dbs = [
        {name: "mysql"},
        {name: "oracle"},
        {name: "sql server"},
        {name: "h2"},
        {name: "db2"},
        {name: "Postgresql"}
    ]

    document.onscroll = function () {
        throttle(() => {
            let top = $(document).scrollTop();
            let threshold = 200;
            if (top < threshold) {
                $("#gallery img").css({top: -(top / 3)});
                $("#erupt-content").css({background: "none"})
            }
            if (top > threshold * 1.2) {
                $("#erupt-content").css({background: "#fff"})
            }
        }, 80)()
    }


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
