app.controller("home", function ($scope, $rootScope, $timeout, $interval, $sce, i18nService, polyglot) {
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
        url: "https://docs.erupt.xyz/" + i18nService.getLang().substring(0, 2) + "/advanced/extend",
        icon: "extend.svg"
    }, {
        name: i18nService.t('home.features.attachment.name'),
        desc: i18nService.t('home.features.attachment.desc'),
        icon: "attachment.svg",
        url: "https://docs.erupt.xyz/" + i18nService.getLang().substring(0, 2) + "/field-types/attachment"
    }, {
        name: i18nService.t('home.features.template.name'),
        desc: i18nService.t('home.features.template.desc'),
        icon: "template.svg",
        url: "https://docs.erupt.xyz/" + i18nService.getLang().substring(0, 2) + "/modules/erupt-tpl"
    }];


    $scope.using = [
        {name: '中海地产', logo: "images/using/中海地产.png"},
        {name: '龙湖数科', logo: "images/using/longhu.png"},
        {name: 'Meituan', logo: "images/using/meituan.png"},
        {name: '上海银行', logo: "images/using/shanghai_bank.png"},
        {name: '民生银行', logo: "images/using/民生银行.png"},
        {name: 'Alibaba', logo: "images/using/ali.png"},
        {name: '用友政务', logo: "images/using/yongyou.png"},
        {name: 'Transsion', logo: "images/using/transsion.png"},
        {name: 'Ideamake', logo: "images/using/ideamake.png"},
        {name: 'YashanDB', logo: "images/using/yashan.png"},
        {name: 'China Telecom', logo: "images/using/telecom.png"},
        {name: '南开大学', logo: "images/using/南开大学.png"},
        {name: 'Perfect World', logo: "images/using/完美世界.png"},
        {name: 'Hengrui Medicine', logo: "images/using/hengrui.png"},
        {name: '销售易', logo: "images/using/销售易.jpg"},
        {name: '歌华有线', logo: "images/using/gehua.jpg"},
        {name: '越秀地产', logo: "images/using/yuexiu.png"},
        {name: '金科地产', logo: "images/using/jinke.png"},

        {name: '哥们网', logo: "images/using/game2.png"},

        {name: 'QingCloud', logo: "images/using/青云.png"},
        {name: 'TAL', logo: "images/using/hwl.png"},
        {name: '企迈科技', logo: "images/using/qmai.png"},
        {name: 'ifanr', logo: "images/using/ifanr.png"},
        {name: 'Lalamove', logo: "images/using/huolala.png"},
        {name: 'China Comservice', logo: "images/using/chinaccs.png"},
        {name: '合智互联', logo: "images/using/合智互联.png"},
        {name: '柳钢集团', logo: "images/using/柳钢集团.png"},
        {name: 'CATL', logo: "images/using/catl.svg"},
        {name: 'Tesla', logo: "images/using/tesla.svg"},
        {name: '招商蛇口', logo: "images/using/zhaoshang.png"},
    ]

    $scope.sponsor = [
        {
            toggleText: "每天还在写代码的，写了20多年的代码民工,希望到60岁时还能运指如飞的敲键盘",
            role: "Core Contributor",
            headImg: "baishi.png",
            home: "https://github.com/wjw465150",
            nickname: "W.Stone",
        },
        {
            toggleText: "magic-api 作者",
            role: "magic-api Author",
            headImg: "xiaodong.jpeg",
            home: "https://gitee.com/jmxd",
            nickname: "jmxd",
        }
    ]

    // everything one model replaces
    $scope.project = {
        "view": {sub: {"***.html": {file: true}, "***.js": {file: true}, "***.css": {file: true}}},
        "controller": {sub: {"***Controller.java": {file: true}}},
        "dto": {sub: {"***DTO.java": {file: true}, "***VO.java": {file: true}}},
        "service": {sub: {"***Service.java": {file: true}, "***ServiceImpl.java": {file: true}}},
        "mapper": {sub: {"***Mapper.java": {file: true}, "***Mapper.xml": {file: true}}},
        "ddl": {sub: {"***_ddl.sql": {file: true}, "***_migration.sql": {file: true}}},
        "security": {sub: {"***Permission.java": {file: true}}},
        "excel": {sub: {"***ExcelHandler.java": {file: true}}},
        "api": {sub: {"***.openapi.yaml": {file: true}}},
        "audit": {sub: {"***History.java": {file: true}}},
        "ai": {sub: {"***McpTool.java": {file: true}}},
        "i18n": {sub: {"zh_CN.properties": {file: true}, "en_US.properties": {file: true}}},
        "***.bpmn": {file: true},
        "model": {active: true, sub: {"Task.java": {file: true, active: true}}}
    }

    $scope.editTypes = [
        {name: i18nService.t('component.input'), image: "input.svg"},
        {name: i18nService.t('component.textarea'), image: "textarea.svg"},
        {name: i18nService.t('component.number'), image: "number.svg"},
        {name: i18nService.t('component.slider'), image: "slider.svg"},
        {name: i18nService.t('component.date'), image: "date.svg"},
        {name: i18nService.t('component.boolean'), image: "bool.svg"},
        {name: i18nService.t('component.choice'), image: "choice.svg"},
        {name: i18nService.t('component.tags'), image: "tags.svg"},
        {name: i18nService.t('component.attachment'), image: "attachment.svg"},
        {name: i18nService.t('component.autocomplete'), image: "autoComplete.svg"},
        {name: i18nService.t('component.referenceTree'), image: "referenceTree.svg"},
        {name: i18nService.t('component.referenceTable'), image: "referenceTable.svg"},
        {name: i18nService.t('component.checkbox'), image: "checkbox.svg"},
        {name: i18nService.t('component.tabTree'), image: "tabTree.svg"},
        {name: i18nService.t('component.tabTableRefer'), image: "tabTableRefer.svg"},
        {name: i18nService.t('component.tabTableAdd'), image: "tabTableAdd.svg"},
        {name: i18nService.t('component.htmlEditor'), image: "htmlEditor.svg"},
        {name: i18nService.t('component.codeEditor'), image: "codeEditor.svg"},
        {name: i18nService.t('component.tpl'), image: "tpl.svg"},
        {name: i18nService.t('component.map'), image: "map.svg"},
        {name: i18nService.t('component.divide'), image: "divide.svg"},
        {name: i18nService.t('component.signature'), image: "sign.svg"},
        {name: i18nService.t('component.hidden'), image: "hidden.svg"},
        {name: i18nService.t('component.empty'), image: "empty.svg"},
    ];

    $scope.viewTypes = [
        {name: i18nService.t('component.view.text'), image: "text.svg"},
        {name: i18nService.t('component.view.number'), image: "number.svg"},
        {name: i18nService.t('component.view.date'), image: "date.svg"},
        {name: i18nService.t('component.view.image'), image: "image.svg"},
        {name: i18nService.t('component.view.html'), image: "html.svg"},
        {name: i18nService.t('component.view.mobileHtml'), image: "mobile-html.svg"},
        {name: i18nService.t('component.view.link'), image: "link.svg"},
        {name: i18nService.t('component.view.linkDialog'), image: "link-dialog.svg"},
        {name: i18nService.t('component.view.download'), image: "download.svg"},
        {name: i18nService.t('component.view.attachment'), image: "attachment.svg"},
        {name: i18nService.t('component.view.ovr'), image: "ovr.svg"},
        {name: i18nService.t('component.view.attachmentDialog'), image: "attachment-dialog.svg"},
        {name: i18nService.t('component.view.qrCode'), image: "qr.svg"},
        {name: i18nService.t('component.view.swf'), image: "swf.svg"},
        {name: i18nService.t('component.view.code'), image: "code.svg"},
        {name: i18nService.t('component.view.map'), image: "map.svg"},
        {name: i18nService.t('component.view.base64'), image: "base64.svg"},
        {name: i18nService.t('component.view.markdown'), image: "markdown.svg"},
    ];

    $scope.javaLayer = ["controller", "service", "service impl", "dao", "dao impl", "model"];

    $scope.htmlLayer = ["view.html", "edit.html", "xxx.js", "xxx.css", "util.js"];

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

    // the hero editor shows the same Task model in every language; Java stays the Prism-highlighted entity
    $scope.langs = polyglot.langs;
    $scope.pick = function (l) {
        $scope.lang = l;
        $scope.project.model.sub = {};
        $scope.project.model.sub[l.file] = {file: true, active: true};
    };
    $scope.pick($scope.langs[0]);

    // §1 hero: the model in the middle, the system parts it builds on each side (y = centre in the 600×440 map)
    var Y = [44, 132, 220, 308, 396];
    $scope.sysL = [
        {n: 'Admin UI', d: 'table · form · 30+ fields', c: '#4FC8EC'},
        {n: '9 Views', d: 'gantt · board · map', c: '#93D655'},
        {n: 'Search', d: 'filter · sort · page', c: '#BCA0F2'},
        {n: 'Excel I/O', d: 'import · export', c: '#4FC8EC'},
        {n: 'i18n', d: 'zh · en · ja · …', c: '#93D655'}
    ];
    $scope.sysR = [
        {n: 'REST API', d: 'OpenAPI · per-user', c: '#BCA0F2'},
        {n: 'RBAC', d: 'menu · row · column', c: '#4FC8EC'},
        {n: 'Data', d: 'DDL · 15 sources', c: '#93D655'},
        {n: 'Audit', d: 'revision · rollback', c: '#BCA0F2'},
        {n: 'AI Agent', d: 'MCP · 50+ LLM', c: '#4FC8EC'}
    ];
    $scope.sysL.concat($scope.sysR).forEach(function (n, i) { n.y = Y[i % 5]; });
    // the loop that sells it: type a new field into the model, then the whole system rebuilds around it
    var NEW = [['status', 'choice'], ['amount', 'number'], ['tags', 'tags'], ['location', 'map'], ['score', 'slider']];
    var rbWait = [], rbN = 0;
    $scope.rb = {phase: 0, f: ''};

    function later(fn, ms) {
        rbWait.push($timeout(fn, ms));
    }

    function rebuild() {
        var nf = NEW[rbN++ % NEW.length], rb = $scope.rb = {phase: 1, f: ''};
        nf[0].split('').forEach(function (c, i) {
            later(function () { rb.f += c; }, 110 * (i + 1));
        });
        var t = 110 * nf[0].length + 350;
        later(function () { rb.phase = 2; rb.t = nf[1]; }, t);
        later(function () { rb.phase = 3; rb.sync = true; }, t + 450);
        later(function () { rb.sync = false; }, t + 1900);
        later(function () { $scope.rb = {phase: 0, f: ''}; }, t + 4200);
        later(rebuild, t + 5200);
    }

    if (!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
        later(rebuild, 1200);
    }
    $scope.$on("$destroy", function () {
        rbWait.forEach($timeout.cancel);
    });

    // §16 module atlas: every erupt module by group; h = a page on this site
    $scope.modGroups = [{
        t: 'AI', m: [
            {n: 'erupt-ai', d: 'LLM + MCP access layer', h: '#!/ai'},
            {n: 'ai-claw', d: 'admin agent', h: '#!/ai-claw'},
            {n: 'ai-rag', d: 'knowledge base · RAG', h: '#!/ai-rag'},
            {n: 'ai-staff', d: 'digital employees', h: '#!/ai-staff'},
            {n: 'ai-dev', d: 'AI software delivery', h: '#!/ai-dev'},
            {n: 'ai-canvas', d: 'AI-generated pages', h: '#!/ai-canvas'},
            {n: 'ai-decision', d: 'typed AI judgements', h: '#!/ai-decision'}]
    }, {
        t: 'Data', m: ['jpa', 'jdbc', 'mongodb', 'es', 'redis', 's3', 'http', 'file', 'ldap', 'k8s', 'memory', 'feishu', 'dingtalk', 'notion', 'airtable']
            .map(function (n) { return {n: n, d: 'erupt-data-' + n, h: n === 'jpa' ? '#!/data' : ''}; })
    }, {
        t: 'Plugins', m: [
            {n: 'job', d: 'scheduled jobs'}, {n: 'monitor', d: 'server · redis monitor'}, {n: 'notice', d: 'notifications'},
            {n: 'report', d: 'reports'}, {n: 'print', d: 'print templates'}, {n: 'revision', d: 'change history · rollback'},
            {n: 'comment', d: 'record comments'}, {n: 'share', d: 'public links · forms'}, {n: 'sso', d: 'single sign-on', h: '#!/sso'},
            {n: 'webhook', d: 'event webhooks'}, {n: 'config', d: 'runtime settings', h: '#!/config'}, {n: 'file-center', d: 'files · S3 · SFTP'},
            {n: 'terminal', d: 'web shell'}, {n: 'remote', d: 'VNC · SSH'}, {n: 'magic-api', d: 'runtime APIs'},
            {n: 'designer', d: 'form designer', h: '#!/designer'}, {n: 'generator', d: 'code generator'}, {n: 'atlas', d: 'model atlas', h: '#!/atlas'},
            {n: 'template', d: 'custom pages'}]
    }, {
        t: 'Platform', m: [
            {n: 'cloud', d: 'distributed nodes', h: '#!/cloud'}, {n: 'sdk · 9 langs', d: 'polyglot nodes', h: '#!/sdk'},
            {n: 'excel', d: 'import / export'}, {n: 'websocket', d: 'push'}, {n: 'git', d: 'git over CLI'},
            {n: 'ant-design', d: 'UI theme'}, {n: 'element-plus', d: 'UI theme'}, {n: 'element-ui', d: 'UI theme'},
            {n: 'docker', d: 'images'}]
    }, {
        t: 'Pro', pro: true, m: [
            {n: 'flow', d: 'workflow · approval', h: '#!/flow'}, {n: 'saas', d: 'multi-tenant', h: '#!/tenant'},
            {n: 'cube', d: 'BI · semantic layer', h: '#!/cube'}]
    }];
    $scope.modsTotal = $scope.modGroups.reduce(function (n, g) { return n + g.m.length; }, 0);

    Prism.highlightAllUnder(document.getElementById("DemoErupt"));

    $("#logo").attr("src", "assets/logo.svg");

    $.get("assets/logo.svg", function (res) {
        var svg = res.getElementById("erupt_logo_svg");
        svg.style.width = "100px";
        $("#home-logo").html(svg)
    })

    $scope.$on("$destroy", function () {
        document.onscroll = null;
        $("#logo").attr("src", "assets/logo.svg");
    })

    $timeout(function () {
        var card = document.querySelector('.dia-card');
        if (card) {
            card.addEventListener('mouseenter', function () {
                card.style.transition = 'box-shadow .25s, border-color .25s';
            });
            card.addEventListener('mousemove', function (e) {
                var r = card.getBoundingClientRect();
                var x = (e.clientX - r.left) / r.width - .5;
                var y = (e.clientY - r.top) / r.height - .5;
                card.style.transform = 'perspective(260px) rotateY(' + (x * 22) + 'deg) rotateX(' + (-y * 22) + 'deg) scale(1.07)';
            });
            card.addEventListener('mouseleave', function () {
                card.style.transition = 'box-shadow .25s, border-color .25s, transform .5s cubic-bezier(.23,1,.32,1)';
                card.style.transform = '';
            });
        }
    }, 400);

    $timeout(function () {
        $('[data-toggle="tooltip"]').tooltip()
    }, 1000);

    $scope.go = function (url, open) {
        if (open) {
            window.open(url)
        } else {
            window.location = url;
        }
    }


});
