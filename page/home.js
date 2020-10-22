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

    $scope.indicator = [{
        name: "项目启动速度",
        value: "低于10s"
    }, {
        name: "页面渲染速度",
        value: "毫秒级渲染"
    }, {
        name: "页面渲染速度",
        value: "毫秒级渲染"
    }]


    $scope.steps = [
        {name: "java"},
        {name: "erupt"},
        {name: "java"}
    ]

    $scope.dbs = [
        {name: "MySQL", image: "mysql.svg"},
        {name: "Oracle", image: "oracle.svg"},
        {name: "SQL Server", image: "sqlServer.svg"},
        {name: "postgreSQL", image: "postgreSQL.svg"},
        {name: "H2", image: "h2.svg"},
        {name: "DB2", image: "db2.svg"},
        {name: "mongoDB", image: "mongoDB.svg"}
    ]

    $scope.types = [
        {code: "INPUT", name: "文本输入框", image: "input.svg"},

        {code: "TEXTAREA", name: "多行文本输入框", image: "textarea.svg"},
        {code: "NUMBER", name: "数值输入框", image: "number.svg"},
        {code: "SLIDER", name: "滑动输入条", image: "slider.svg"},
        {code: "DATE", name: "时间选择器", image: "date.svg"},
        {code: "BOOLEAN", name: "开关", image: "bool.svg"},
        {code: "CHOICE", name: "选择器", image: "choice.svg"},
        {code: "ATTACHMENT", name: "附件，图片", image: "attachment.svg"},
        {code: "AUTO_COMPLETE", name: "自动完成", image: "autoComplete.svg"},

        {code: "REFERENCE_TREE", name: "树选择器", image: "referenceTree.svg"},
        {code: "REFERENCE_TABLE", name: "表格选择器", image: "referenceTable.svg"},

        {code: "TAB_TREE", name: "一对多树选择器", image: "tabTree.svg"},
        {code: "TAB_TABLE_REFER", name: "一对多表格选择器", image: "tabTableRefer.svg"},
        {code: "TAB_TABLE_ADD", name: "一对多增加", image: "tabTableAdd.svg"},

        {code: "HTML_EDITOR", name: "富文本编辑器", image: "htmlEditor.svg"},
        {code: "CODE_EDITOR", name: "代码编辑器", image: "codeEditor.svg"},

        {code: "TPL", name: "自定义HTML模板", image: "tpl.svg"},
        {code: "MAP", name: "地图", image: "map.svg"},
        {code: "DIVIDE", name: "分割线", image: "divide.svg"},
        {code: "HIDDEN", name: "隐藏", image: "hidden.svg"},
        {code: "EMPTY", name: "空（仍占据组件位置）", image: "empty.svg"},
    ]

    document.onscroll = function () {
        throttle(() => {
            let top = $(document).scrollTop();
            let threshold = 200;
            if (top < threshold + 100) {
                $("#gallery img").css({top: -(top / 5)});
                $("#erupt-content").css({background: "none"})
            }
            if (top > threshold * 1.6) {
                $("#erupt-content").css({background: "#ededed"})
            }
        }, 80)()
    }

    let codeEle = document.getElementById("code-demo");
    Prism.highlightAllUnder(codeEle);


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


});
