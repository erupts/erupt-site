app.controller("home", function ($scope, $rootScope, $timeout) {
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
        name: "快速迭代",
        desc: "需求变更仅需修改或添加注解配置即可，迭代速度比需求讨论速度还快。",
        icon: "dev.svg"
    }, {
        name: "敏捷开发",
        desc: "仅单个.java文件即可实现后台管理功能，专注业务与核心功能的研发。",
        icon: "fast.svg"
    }, {
        name: "高安全性",
        desc: "可靠的安全机制，细颗粒度权限控制，阻绝一切不可靠的数据，为您的数据安全保驾护航。",
        icon: "security.svg"
    }, {
        name: "响应式布局",
        desc: "支持PC端手机端等各种规格的设备中使用。",
        icon: "resize.svg"
    }, {
        name: "低入侵性",
        desc: "几乎所有功能都围绕注解而展开，不影响你使用其他的框架与库。",
        icon: "hold.svg"
    }, {
        name: "界面美观",
        desc: "每个交互都精心设计，产品思维打磨，只为了更好的操作体验。",
        icon: "art.svg"
    }]

    $scope.project = {
        template: {
            // sub: {
            //     "***.html": {
            //         file: true
            //     },
            //     "***.js": {
            //         file: true
            //     },
            //     "***.css": {
            //         file: true
            //     }
            // },
        },
        controller: {},
        service: {},
        "service.impl": {},
        dao: {},
        "dao.impl": {},
        mapper: {},
        model: {
            active: true,
            sub: {
                DemoErupt: {
                    file: true,
                    active: true
                }
            }
        }

    }

    $scope.javaLayer = ["controller", "service", "service impl", "dao", "dao impl", "model"];

    $scope.htmlLayer = ["view.html", "edit.html", "xxx.js", "xxx.css", "util.js"];

    $scope.dbs = [
        {name: "MySQL", image: "mysql.svg"},
        {name: "Oracle", image: "oracle.svg"},
        {name: "SQL Server", image: "sqlServer.svg"},
        {name: "PostgreSQL", image: "postgreSQL.svg"},
        {name: "H2", image: "h2.svg"},
        {name: "DB2", image: "db2.svg"},
        {name: "Sybase", image: "sybase.svg"},
        {name: "MongoDB", image: "mongoDB.svg"},
    ]

    $scope.types = [
        {code: "INPUT", name: "文本输入框", image: "input.svg"},
        {code: "TEXTAREA", name: "多行文本输入框", image: "textarea.svg"},
        {code: "NUMBER", name: "数值输入框", image: "number.svg"},
        {code: "SLIDER", name: "滑动输入条", image: "slider.svg"},
        {code: "DATE", name: "时间选择器", image: "date.svg"},
        {code: "BOOLEAN", name: "布尔开关", image: "bool.svg"},
        {code: "CHOICE", name: "单选选择器", image: "choice.svg"},
        {code: "TAGS", name: "标签选择器", image: "tags.svg"},
        {code: "ATTACHMENT", name: "附件上传", image: "attachment.svg"},
        {code: "AUTO_COMPLETE", name: "自动完成", image: "autoComplete.svg"},

        {code: "REFERENCE_TREE", name: "树选择器", image: "referenceTree.svg"},
        {code: "REFERENCE_TABLE", name: "表格选择器", image: "referenceTable.svg"},

        {code: "CHECKBOX", name: "多选框", image: "checkbox.svg"},
        {code: "TAB_TREE", name: "一对多树选择器", image: "tabTree.svg"},
        {code: "TAB_TABLE_REFER", name: "一对多表格选择器", image: "tabTableRefer.svg"},
        {code: "TAB_TABLE_ADD", name: "一对多增加", image: "tabTableAdd.svg"},

        {code: "HTML_EDITOR", name: "富文本编辑器", image: "htmlEditor.svg"},
        {code: "CODE_EDITOR", name: "代码编辑器", image: "codeEditor.svg"},
        {code: "TPL", name: "自定义HTML模板", image: "tpl.svg"},
        {code: "MAP", name: "地图", image: "map.svg"},
        {code: "DIVIDE", name: "分割线", image: "divide.svg"},
        {code: "HIDDEN", name: "隐藏", image: "hidden.svg"},
        {code: "EMPTY", name: "空白", image: "empty.svg"},
    ]

    $scope.viewTypes = [
        {code: "TEXT", name: "文本", image: "text.svg"},
        {code: "NUMBER", name: "数值", image: "number.svg"},
        {code: "DATE", name: "时间", image: "date.svg"},
        {code: "IMAGE", name: "图片", image: "image.svg"},
        {code: "HTML", name: "HTML", image: "html.svg"},
        {code: "MOBILE_HTML", name: "Mobile HTML", image: "mobile-html.svg"},

        {code: "LINK", name: "链接", image: "link.svg"},
        {code: "LINK_DIALOG", name: "对话框方式打开链接", image: "link-dialog.svg"},
        {code: "DOWNLOAD", name: "下载附件", image: "download.svg"},
        {code: "ATTACHMENT", name: "打开附件", image: "attachment.svg"},
        {code: "ATTACHMENT_DIALOG", name: "对话框中展示附件", image: "attachment-dialog.svg"},

        {code: "QR_CODE", name: "二维码", image: "qr.svg"},
        {code: "SWF", name: "SWF", image: "swf.svg"},
        {code: "CODE", name: "代码", image: "code.svg"},
        {code: "MAP", name: "地图", image: "map.svg"},
        // {code: "BOOLEAN", name: "布尔", image: "empty.svg"},
    ]

    Prism.highlightAllUnder(document.getElementById("DemoErupt"));


    let headerEle = $("#header");

    function inverseHeader(is) {
        if (is) {
            headerEle.css({
                bottom: 0,
                top: 'auto',
                boxShadow: '-1px -11px 21px -15px rgba(0, 0, 0, 0.75)'
            })
        } else {
            headerEle.css({
                bottom: 'auto',
                top: 0,
                boxShadow: '0 4px 10px 0 rgba(0, 0, 0, .05)'
            })
        }
    }


    // $rootScope.showHeader = false;
    inverseHeader(true);

    $scope.$on("$destroy", function () {
        // $rootScope.showHeader = true;
        document.onscroll = null;
        setTimeout(() => inverseHeader(false), 100)
    })

    let galleryEle = $("#gallery img");
    document.onscroll = function () {
        throttle(() => {
            let top = $(document).scrollTop();
            galleryEle.css({top: -(top / 4)});
            if (top > 200) {
                inverseHeader(false);
                // if ($rootScope.showHeader !== true) {
                //     $scope.$apply(function () {
                //         $rootScope.showHeader = true;
                //     })
                // }
            } else {
                inverseHeader(true);
                // if ($rootScope.showHeader !== false) {
                //     $scope.$apply(function () {
                //         $rootScope.showHeader = false;
                //     })
                // }
            }
        }, 100)()
    }

    $scope.go = function (url, open) {
        if (open) {
            window.open(url)
        } else {
            window.location = url;
        }
    }


});
