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
        name: "敏捷开发",
        desc: "仅单个.java文件即可实现后台管理功能，专注业务与核心功能的研发",
        icon: "fast.svg"
    }, {
        name: "数据安全",
        desc: "可靠的安全机制，细颗粒度权限控制，阻绝一切不可靠的数据，为您的数据安全保驾护航",
        icon: "security.svg"
    }, {
        name: "响应式布局",
        desc: "支持PC端手机端等各种规格的设备中使用",
        icon: "resize.svg"
    }, {
        name: "低侵入性",
        desc: "几乎所有功能都围绕注解而展开，不影响你使用任何第三方库",
        icon: "hold.svg"
    }, {
        name: "界面美观",
        desc: "每个交互都精心设计，产品思维打磨，只为了更好的操作体验",
        icon: "art.svg"
    }, {
        name: "通用数据管理",
        desc: "支持市面上所有主流数据库，支持MongoDB，支持自定义数据源",
        icon: "db.svg"
    }, {
        name: "服务层逻辑扩展",
        desc: "支持 CURD 前后置扩展、自定义按钮、自定义LDAP登录",
        url: "https://www.yuque.com/erupts/erupt/nicqg3",
        icon: "extend.svg"
    }, {
        name: "自定义附件上传",
        desc: "仅需简单的适配代码，可以让 erupt 支持 fastDFS、七牛云、OSS 等存储方式",
        icon: "attachment.svg",
        url: "https://www.yuque.com/erupts/erupt/famk6i"
    }, {
        name: "自定义模板",
        desc: "自定义页面按钮模板，支持多种渲染方式 Freemarker/Thymeleaf/Vue/Velocity",
        icon: "template.svg",
        url: "https://www.yuque.com/erupts/gd8zod/wzmdu2"
    }]


    $scope.using = [
        {name: '阿里巴巴', logo: "images/using/ali.png"},
        {name: '用友政务', logo: "images/using/yongyou.png"},
        {name: '美团', logo: "images/using/meituan.png"},
        {name: '上海银行', logo: "images/using/shanghai_bank.png"},
        {name: '民生银行', logo: "images/using/民生银行.png"},
        {name: '传音控股', logo: "images/using/transsion.png"},
        {name: '思为科技', logo: "images/using/ideamake.png"},
        {name: '招商蛇口', logo: "images/using/zhaoshang.png"},
        {name: '越秀地产', logo: "images/using/yuexiu.png"},
        {name: '金科地产', logo: "images/using/jinke.png"},
        {name: '中海地产', logo: "images/using/中海地产.png"},
        {name: '龙湖数科', logo: "images/using/longhu.png"},
        {name: '零跑汽车', logo: "images/using/零跑汽车.png"},
        {name: 'YashanDB', logo: "images/using/yashan.png"},
        {name: '中国电信', logo: "images/using/telecom.png"},
        {name: '哪吒汽车', logo: "images/using/nezha.webp"},
        {name: '安克创新', logo: "images/using/logo-anker-in.png"},
        {name: '跨越速运', logo: "images/using/跨越速运.png"},
        {name: '南开大学', logo: "images/using/南开大学.png"},
        {name: '中国地质大学（北京）', logo: "images/using/geosciences.png"},
        {name: '完美世界', logo: "images/using/完美世界.png"},
        {name: '恒瑞医药', logo: "images/using/hengrui.png"},
        {name: '销售易', logo: "images/using/销售易.jpg"},
        {name: '歌华有线', logo: "images/using/gehua.jpg"},
        {name: '良医汇', logo: "images/using/良医汇.png"},


        {name: '乐刻运动', logo: "images/using/leke.svg"},
        {name: '哥们网', logo: "images/using/game2.png"},

        {name: '青云', logo: "images/using/青云.png"},
        {name: '好未来', logo: "images/using/hwl.png"},
        {name: '企迈科技', logo: "images/using/qmai.png"},
        {name: '爱范儿', logo: "images/using/ifanr.png"},
        {name: '货拉拉', logo: "images/using/huolala.png"},
        {name: '中通服', logo: "images/using/chinaccs.png"},
        {name: '合智互联', logo: "images/using/合智互联.png"},
        {name: '柳钢集团', logo: "images/using/柳钢集团.png"},
        // {name: '合智互联', logo: "images/using/合智互联.png"},

        {name: '...', text: "100+"},
    ]

    $scope.sponsor = [
        {
            toggleText: "每天还在写代码的，写了20多年的代码民工,希望到60岁时还能运指如飞的敲键盘",
            headImg: "baishi.png",
            home: "https://github.com/wjw465150",
            nickname: "白石",
        },
        {
            toggleText: "magic-api 作者",
            headImg: "xiaodong.jpeg",
            home: "https://gitee.com/jmxd",
            nickname: "小东",
        },
        // {
        //     toggleText: "erupt-flow 作者",
        //     headImg: "hlhutu.jpeg",
        //     home: "https://gitee.com/hlhutu",
        //     nickname: "hlhutu",
        // },
    ]

    $scope.project = {
        template: {
            sub: {
                "***.html": {
                    file: true
                },
                "***.js": {
                    file: true
                },
                "***.css": {
                    file: true
                }
            },
        },
        controller: {},
        service: {},
        "service.impl": {},
        dao: {},
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
        {name: "自定义数据源", image: "custom.svg"}
    ]

    Prism.highlightAllUnder(document.getElementById("DemoErupt"));

    $("#logo").attr("src", "assets/logo2.svg");

    $.get("assets/logo2.svg", function (res) {
        var svg = res.getElementById("erupt_logo_svg");
        svg.style.width = "100px";
        $("#home-logo").html(svg)
    })

    $scope.$on("$destroy", function () {
        // $rootScope.showHeader = true;
        document.onscroll = null;
        $("#logo").attr("src", "assets/logo.svg");
    })

    $timeout(function () {
        $('[data-toggle="tooltip"]').tooltip()
    }, 1000);


    // document.onscroll = function () {
    //     throttle(() => {
    //         var top = $(document).scrollTop();
    //         // galleryEle.css({transform: 'skewY(' + top % base + 'deg)'});
    //         if (top > 200) {
    //             // if ($rootScope.showHeader !== true) {
    //             //     $scope.$apply(function () {
    //             //         $rootScope.showHeader = true;
    //             //     })
    //             // }
    //         } else {
    //             // if ($rootScope.showHeader !== false) {
    //             //     $scope.$apply(function () {
    //             //         $rootScope.showHeader = false;
    //             //     })
    //             // }
    //         }
    //     }, 100)()
    // }

    $scope.go = function (url, open) {
        if (open) {
            window.open(url)
        } else {
            window.location = url;
        }
    }


});
