app.controller("home", function ($scope, $rootScope, $timeout, i18nService) {
    $scope.erupt = [
        {annotation: '@Erupt'},
        {annotation: '@EruptField'},
        {annotation: '@EruptRouter'},
        {annotation: '@EruptApi'},
        {annotation: '@EruptTpl'},
        {annotation: '@TplAction'},
        {annotation: '@EruptProperty'},
    ];

    function updateIndicator() {
        $scope.indicator = [{
            name: i18nService.t('home.features.fast.name'),
            desc: i18nService.t('home.features.fast.desc'),
            icon: "fast.svg"
        }, {
            name: i18nService.t('home.features.security.name'),
            desc: i18nService.t('home.features.security.desc'),
            icon: "security.svg"
        }, {
            name: i18nService.t('home.features.responsive.name'),
            desc: i18nService.t('home.features.responsive.desc'),
            icon: "resize.svg"
        }, {
            name: i18nService.t('home.features.low.name'),
            desc: i18nService.t('home.features.low.desc'),
            icon: "hold.svg"
        }, {
            name: i18nService.t('home.features.beautiful.name'),
            desc: i18nService.t('home.features.beautiful.desc'),
            icon: "art.svg"
        }, {
            name: i18nService.t('home.features.db.name'),
            desc: i18nService.t('home.features.db.desc'),
            icon: "db.svg"
        }, {
            name: i18nService.t('home.features.extend.name'),
            desc: i18nService.t('home.features.extend.desc'),
            url: "https://www.yuque.com/erupts/erupt/nicqg3",
            icon: "extend.svg"
        }, {
            name: i18nService.t('home.features.attachment.name'),
            desc: i18nService.t('home.features.attachment.desc'),
            icon: "attachment.svg",
            url: "https://www.yuque.com/erupts/erupt/famk6i"
        }, {
            name: i18nService.t('home.features.template.name'),
            desc: i18nService.t('home.features.template.desc'),
            icon: "template.svg",
            url: "https://www.yuque.com/erupts/gd8zod/wzmdu2"
        }];
    }
    
    updateIndicator();


    $scope.using = [
        {name: '阿里巴巴', logo: "images/using/ali.png"},
        {name: '用友政务', logo: "images/using/yongyou.png"},
        {name: '美团', logo: "images/using/meituan.png"},
        {name: '上海银行', logo: "images/using/shanghai_bank.png"},
        {name: '民生银行', logo: "images/using/民生银行.png"},
        {name: '传音控股', logo: "images/using/transsion.png"},
        {name: '思为科技', logo: "images/using/ideamake.png"},
        {name: '招商蛇口', logo: "images/using/zhaoshang.png"},
        {name: '中海地产', logo: "images/using/中海地产.png"},
        {name: '龙湖数科', logo: "images/using/longhu.png"},
        {name: '零跑汽车', logo: "images/using/零跑汽车.png"},
        {name: 'YashanDB', logo: "images/using/yashan.png"},
        {name: '中国电信', logo: "images/using/telecom.png"},
        {name: '哪吒汽车', logo: "images/using/nezha.webp"},
        // {name: '安克创新', logo: "images/using/logo-anker-in.png"},
        {name: '跨越速运', logo: "images/using/跨越速运.png"},
        {name: '南开大学', logo: "images/using/南开大学.png"},
        // {name: '中国地质大学（北京）', logo: "images/using/geosciences.png"},
        {name: '完美世界', logo: "images/using/完美世界.png"},
        {name: '恒瑞医药', logo: "images/using/hengrui.png"},
        {name: '销售易', logo: "images/using/销售易.jpg"},
        {name: '歌华有线', logo: "images/using/gehua.jpg"},
        {name: '良医汇', logo: "images/using/良医汇.png"},
        {name: '越秀地产', logo: "images/using/yuexiu.png"},
        {name: '金科地产', logo: "images/using/jinke.png"},

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
        {name: '宁德时代', logo: "images/using/宁德时代.svg"},
        {name: '特斯拉', logo: "images/using/tesla.svg"},

        {name: '...', text: "100+"},
    ]

    $scope.sponsor = [
        {
            toggleText: "每天还在写代码的，写了20多年的代码民工,希望到60岁时还能运指如飞的敲键盘",
            headImg: "baishi.png",
            home: "https://github.com/wjw465150",
            nickname: "W.Stone",
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

    function updateDbs() {
        $scope.dbs = [
            {name: i18nService.t('db.mysql'), image: "mysql.svg"},
            {name: i18nService.t('db.oracle'), image: "oracle.svg"},
            {name: i18nService.t('db.sqlserver'), image: "sqlServer.svg"},
            {name: i18nService.t('db.postgresql'), image: "postgreSQL.svg"},
            {name: i18nService.t('db.h2'), image: "h2.svg"},
            {name: i18nService.t('db.polardb'), image: "polardb.svg"},
            {name: i18nService.t('db.dm'), image: "dm.svg"},
            {name: i18nService.t('db.kingbase'), image: "kingbase.svg"},
            {name: i18nService.t('db.api'), image: "api.svg"},
            {name: i18nService.t('db.spanner'), image: "spanner.svg"},
            {name: i18nService.t('db.mongodb'), image: "mongoDB.svg"},
            {name: i18nService.t('db.custom'), image: "custom.svg"}
        ];
    }
    
    updateDbs();
    
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
