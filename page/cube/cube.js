app.controller("cube", function ($scope, $timeout, i18nService) {

    var lang = i18nService.getLang();
    var zh = lang === 'zh-CN';

    $scope.expanded = {};

    $scope.compareRows = [
        {
            aspect: zh ? '指标口径' : 'Metric definition',
            without: zh ? '每个人写的 SQL 不一样' : 'Everyone writes their own SQL',
            with: zh ? '统一定义，一处修改处处生效' : 'Defined once, propagates everywhere'
        },
        {
            aspect: zh ? '使用门槛' : 'Barrier to entry',
            without: zh ? '必须懂 SQL' : 'Requires SQL knowledge',
            with: zh ? '拖拽即用，无需 SQL' : 'Drag-and-drop, no SQL needed'
        },
        {
            aspect: zh ? '复用性' : 'Reusability',
            without: zh ? '逻辑散落在各报表' : 'Logic scattered across reports',
            with: zh ? '集中定义，随处复用' : 'Centrally defined, reused anywhere'
        },
        {
            aspect: zh ? '可维护性' : 'Maintainability',
            without: zh ? '改表结构要改所有 SQL' : 'Schema change breaks all queries',
            with: zh ? '只改模型层即可' : 'Update the model layer only'
        },
        {
            aspect: zh ? '协作效率' : 'Team efficiency',
            without: zh ? '工程师、前端、产品多方协同，耗时数周' : 'Engineers, frontend, PM — weeks of coordination',
            with: zh ? '一份模型 + 拖拽分析，无需多方协作' : 'One model + drag-and-drop, no cross-team sync'
        }
    ];

    $scope.vizFeatures = [
        { icon: '🖱️', name: i18nService.t('cube.viz.f1.name'), desc: i18nService.t('cube.viz.f1.desc') },
        { icon: '⊞', name: i18nService.t('cube.viz.f2.name'), desc: i18nService.t('cube.viz.f2.desc') },
        { icon: '↔️', name: i18nService.t('cube.viz.f3.name'), desc: i18nService.t('cube.viz.f3.desc') },
        { icon: '👁️', name: i18nService.t('cube.viz.f4.name'), desc: i18nService.t('cube.viz.f4.desc') },
        { icon: '📊', name: i18nService.t('cube.viz.f5.name'), desc: i18nService.t('cube.viz.f5.desc') },
        { icon: '🔽', name: i18nService.t('cube.viz.f6.name'), desc: i18nService.t('cube.viz.f6.desc') }
    ];

    $scope.docBase = 'https://docs.erupt.xyz/' + (zh ? 'zh' : 'en') + '/modules/pro/erupt-cube';
    $scope.openDoc = function (path) {
        window.open('https://docs.erupt.xyz/' + (zh ? 'zh' : 'en') + '/modules/' + path, '_blank');
    };

    // ── Modeling ──
    $scope.modelWays = [
        {
            tag: 'YAML · JSON', cls: '',
            title: zh ? '模型文件' : 'Model Files',
            desc: zh ? '一个文件就是一个模型：放进 resources/cube/ 或任意外部目录，不写 Java、不用编译，随 git 版本管理与 Code Review。' : 'One file, one model: drop it into resources/cube/ or any external directory — no Java, no compiling, versioned and reviewed in git.'
        },
        {
            tag: zh ? 'JAVA · 最灵活' : 'JAVA · MOST FLEXIBLE', cls: '-g',
            title: zh ? 'Java 注解' : 'Java Annotations',
            desc: zh ? '同样的结构写成 @EruptCube 类：IDE 跳转与重构、SQL 语法高亮、类继承复用，还能与 @Erupt 业务实体共用一个类。' : 'The same structure as an @EruptCube class: IDE navigation and refactoring, SQL highlighting, class inheritance — and it can share a class with an @Erupt entity.'
        },
        {
            tag: 'VISUAL', cls: '-p',
            title: zh ? '可视化建模' : 'Visual Modeling',
            desc: zh ? '分析师在管理页面上配置 SQL、维度与指标，临时探索、快速试错；稳定后沉淀为文件。' : 'Analysts configure SQL, dimensions and measures in the UI for quick exploration; stable models graduate to files.'
        }
    ];

    $scope.ui = {tab: 'yaml', cmp: 'java'};
    $scope.modelTabs = [
        {key: 'yaml', file: 'cube/OrderCube.yml'},
        {key: 'json', file: 'cube/OrderCube.json'},
        {key: 'java', file: 'OrderCube.java'}
    ];

    $scope.modelParts = [
        {key: 'sql', desc: zh ? '底表 SQL 或表名，可用 Cube ML 动态生成' : 'Base SQL or table name, dynamic via Cube ML'},
        {key: 'dimensions', desc: zh ? '可分组、可筛选的字段' : 'Fields to group and filter by'},
        {key: 'measures', desc: zh ? '聚合指标，口径只定义一次' : 'Aggregations, defined exactly once'},
        {key: 'parameters', desc: zh ? '运行时参数，注入 SQL 模板' : 'Runtime parameters injected into the SQL template'},
        {key: 'explores', desc: zh ? '对外查询视图：固定过滤、字段白名单' : 'Query views: fixed filters, field whitelists'},
        {key: 'joins', desc: zh ? '按 Cube 编码关联其它模型' : 'Join other models by cube code'},
        {key: 'datasource', desc: zh ? '多数据源路由，留空用主数据源' : 'Multi-datasource routing, primary by default'}
    ];

    $scope.modelFeatures = [
        {
            title: zh ? 'IDE 补全' : 'IDE Completion',
            desc: zh ? '官方 JSON Schema 由模型定义自动生成，VS Code / IntelliJ 提供属性补全、枚举提示与必填校验。' : 'An official JSON Schema generated from the model definition gives VS Code / IntelliJ attribute completion, enum hints and required checks.'
        },
        {
            title: zh ? '启动即校验' : 'Validated at Startup',
            desc: zh ? '未知属性、错误枚举、非法编码、拼错的关联目标，启动时直接失败并指出文件与原因。' : 'Unknown attributes, bad enums, invalid codes, misspelled join targets — startup fails and names the file and the reason.'
        },
        {
            title: zh ? '外部目录加载' : 'External Directories',
            desc: zh ? '加载路径可配置（classpath*: / file:），模型可放在应用包之外，改模型无需重新打包。' : 'Load paths are configurable (classpath*: / file:), so models can live outside the app package — change a model without rebuilding.'
        },
        {
            title: zh ? '混用与互联' : 'Mix & Join',
            desc: zh ? '文件模型与注解模型同处一个注册表，编码全局唯一，可以相互 join，查询管线完全一致。' : 'File and annotated models share one registry with globally unique codes, join each other, and run through the same query pipeline.'
        }
    ];

    $scope.annoFeatures = [
        {
            title: zh ? '跳转与重构' : 'Navigate & Refactor',
            desc: zh ? '模型就是 Java 类：Cmd+Click 跳到定义、Find Usages 查引用、重命名字段与类全工程安全联动。' : 'Models are Java classes: Cmd+Click to the definition, Find Usages, and project-wide safe rename of fields and classes.'
        },
        {
            title: zh ? 'SQL 语法高亮' : 'SQL Highlighting',
            desc: zh ? '借助 IDE 语言注入，注解里的 sql 字符串获得 SQL / VTL 高亮、补全与语法校验，不再是哑字符串。' : 'With IDE language injection, sql strings inside annotations get SQL / VTL highlighting, completion and syntax checks — no more dumb strings.'
        },
        {
            title: zh ? '继承复用' : 'Inheritance',
            desc: zh ? '基类声明公共维度与指标，子类 extends 即全部继承再追加，一套口径派生出多个模型。' : 'A base class declares shared dimensions and measures; subclasses extend and add more — one metric set, many derived models.'
        },
        {
            title: zh ? 'Java 生态' : 'The Java Toolbox',
            desc: zh ? '与 @Erupt 实体共用一个类；接 CubeProxy 行级权限、@CubeFunction 自定义函数、常量与 Spring Bean。' : 'Share a class with an @Erupt entity; plug in CubeProxy row-level rules, @CubeFunction helpers, constants and Spring beans.'
        }
    ];

    // ── One model, every surface ──
    $scope.useCases = [
        {
            num: '01', doc: 'pro/erupt-cube/visual-analysis',
            title: zh ? '拖拽看板' : 'Drag & Drop Dashboards',
            desc: zh ? '维度指标拖进画布即成图表：栅格布局、联动过滤、地图报表。' : 'Drag fields onto a canvas for instant charts — grid layout, linked filters, map reports.'
        },
        {
            num: '02', doc: 'pro/erupt-cube/vis-view',
            title: zh ? '模型视图图表' : 'Charts in Model Views',
            desc: zh ? '在任意 Erupt 业务页面嵌入图表 Tab，列表搜索条件自动转为 Cube 过滤。' : 'Embed a chart tab in any Erupt page; the list search is forwarded as cube filters.'
        },
        {
            num: '03', doc: 'pro/erupt-cube/ai',
            title: zh ? 'AI 问数' : 'AI Q&A',
            desc: zh ? 'MCP 工具集让 Agent 自主发现模型、执行聚合查询并渲染图表。' : 'MCP tools let agents discover models, run aggregate queries and render charts.'
        },
        {
            num: '04', doc: 'pro/erupt-cube/ai-canvas',
            title: zh ? 'AI 画布' : 'AI Canvas',
            desc: zh ? '一句话把模型变成实时取数的大屏或分析页，多风格版本随时切换。' : 'One sentence turns a model into a live dashboard or analysis page, in any style.'
        },
        {
            num: '05', doc: 'pro/erupt-cube/sql',
            title: zh ? 'SQL 端口' : 'SQL Port',
            desc: zh ? 'PostgreSQL 协议直连，psql、DataGrip、Superset、Grafana 把模型当表查。' : 'PostgreSQL wire protocol — psql, DataGrip, Superset and Grafana query models as tables.'
        },
        {
            num: '06', doc: 'erupt-share',
            title: zh ? '只读分享' : 'Read-only Sharing',
            desc: zh ? '配合 erupt-share 把看板或画布分享出去，查询照常、写入全部关闭。' : 'Share a dashboard or canvas via erupt-share — reads work, every write stays closed.'
        }
    ];

    // ── Governance ──
    $scope.govFeatures = [
        {
            icon: '🔐',
            title: zh ? '权限复用' : 'Reuse Permissions',
            desc: zh ? '菜单权限复用 Erupt UPMS；CubeProxy 与 ${user} / ${tenantId} 模板变量实现行级与租户隔离。' : 'Menu access reuses Erupt UPMS; CubeProxy and the ${user} / ${tenantId} template variables give row-level and tenant isolation.'
        },
        {
            icon: '🛰️',
            title: zh ? '云端节点' : 'Cloud Nodes',
            desc: zh ? '模型分散在各业务项目中定义，由 cube 服务端经 erupt-cloud 统一发现与查询，数据不出节点。' : 'Models live in each business project; the cube server discovers and queries them through erupt-cloud, and data never leaves the node.'
        },
        {
            icon: '🧭',
            title: zh ? '影响分析' : 'Impact Analysis',
            desc: zh ? 'erupt-atlas 可查看哪些看板读取了某个 Cube，删维度之前先知道会波及哪些图表。' : 'erupt-atlas shows which dashboards read a cube, so you know which charts break before dropping a dimension.'
        },
        {
            icon: '🗄️',
            title: zh ? '多数据源' : 'Multi-Datasource',
            desc: zh ? '每个模型独立路由数据源，OLAP 数仓与业务库并存，跨源 join 交给 SQL 端口。' : 'Each model routes to its own datasource; OLAP warehouses and business DBs coexist, and cross-source joins go through the SQL port.'
        }
    ];

    $scope.cmpRows = [
        {
            feature: zh ? '模型格式' : 'Model Format',
            looker: 'LookML DSL',
            cubedev: 'YAML / JS',
            us: zh ? 'Java 注解 · YAML / JSON · 可视化' : 'Java annotations · YAML / JSON · visual'
        },
        {
            feature: zh ? '编辑与校验' : 'Editing & Validation',
            looker: zh ? 'Looker 内置 IDE' : 'Built-in Looker IDE',
            cubedev: zh ? '代码编辑 / Cube Cloud IDE' : 'Code editor / Cube Cloud IDE',
            us: zh ? '注解：SQL 注入高亮 · 文件：Schema 补全；启动严格校验' : 'Annotations: injected SQL highlighting · files: schema completion; strict startup checks'
        },
        {
            feature: zh ? '导航与重构' : 'Navigation & Refactoring',
            looker: zh ? '限 Looker 自带 IDE' : 'Looker IDE only',
            cubedev: zh ? '取决于编辑器插件' : 'Depends on editor plugins',
            us: zh ? 'IDE 原生：跳转、查引用、安全重命名' : 'Native IDE: go-to, find usages, safe rename'
        },
        {
            feature: zh ? '继承复用' : 'Inheritance',
            looker: 'extends / refinements',
            cubedev: 'extends',
            us: zh ? 'Java 类继承，IDE 全程可导航' : 'Java class inheritance, fully navigable'
        },
        {
            feature: zh ? '动态 SQL' : 'Dynamic SQL',
            looker: zh ? 'Liquid 模板' : 'Liquid templating',
            cubedev: 'Jinja / JS',
            us: zh ? 'Velocity（Cube ML）+ Java 函数' : 'Velocity (Cube ML) + Java functions'
        },
        {
            feature: zh ? 'SQL 接口' : 'SQL Interface',
            looker: 'Open SQL Interface (JDBC)',
            cubedev: zh ? 'SQL API（Postgres 协议）' : 'SQL API (Postgres protocol)',
            us: zh ? 'PostgreSQL 协议，Calcite 下推' : 'PostgreSQL protocol, Calcite pushdown'
        },
        {
            feature: zh ? '权限体系' : 'Permissions',
            looker: zh ? 'Looker 自有用户体系' : "Looker's own user model",
            cubedev: zh ? '安全上下文需自行对接' : 'Security context wired by you',
            us: zh ? '复用 Erupt UPMS / 租户' : 'Reuses Erupt UPMS / tenants'
        },
        {
            feature: zh ? '部署方式' : 'Deployment',
            looker: zh ? 'SaaS / 企业私有化' : 'SaaS / Enterprise on-prem',
            cubedev: zh ? '独立 Node.js 服务' : 'Separate Node.js service',
            us: zh ? '内嵌 Spring Boot，零额外运维' : 'Embedded in Spring Boot'
        }
    ];

    $scope.advantages = [
        {
            icon: '📄',
            title: zh ? '没有新语言' : 'No New Language',
            desc: zh ? '模型就是通用的 YAML / JSON，Schema 带补全；需要编程扩展时同样的结构写成 Java 注解。' : 'Models are plain YAML / JSON with schema completion; when you need code, the same structure works as Java annotations.'
        },
        {
            icon: '🧩',
            title: zh ? '嵌入业务工程' : 'Embedded',
            desc: zh ? '作为 Spring Boot 模块随业务应用启动，不引入独立服务，也可通过云端节点分布部署。' : 'Starts with your app as a Spring Boot module — no extra service — or distributes across cloud nodes.'
        },
        {
            icon: '🔐',
            title: zh ? '权限天然继承' : 'Permissions Inherited',
            desc: zh ? '菜单、角色、租户沿用 Erupt 体系，看板、AI、SQL 端口走同一套鉴权。' : 'Menus, roles and tenants come from Erupt; dashboards, AI and the SQL port share one auth model.'
        },
        {
            icon: '📦',
            title: zh ? '源码交付' : 'Source Delivered',
            desc: zh ? '一次买断，完整源码与后续版本，无厂商锁定、无项目数量限制。' : 'One-time purchase with full source and future versions — no lock-in, no project limits.'
        }
    ];

    $scope.dbCategories = [
        {
            type: zh ? '分析型数仓' : 'Analytical Warehouse',
            label: 'OLAP',
            color: '#a78bfa',
            bgColor: 'rgba(167,139,250,0.12)',
            dbs: ['Apache Doris', 'StarRocks', 'ClickHouse', 'GreenPlum', 'Apache Hive', 'Presto', 'Trino', 'Impala', 'ADB', 'Apache Druid', 'DuckDB']
        },
        {
            type: zh ? '关系型数据库' : 'Relational Database',
            label: 'OLTP',
            color: '#60a5fa',
            bgColor: 'rgba(96,165,250,0.12)',
            dbs: ['MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'TiDB']
        },
        {
            type: zh ? '国产数据库' : 'Domestic Database',
            label: 'Domestic',
            color: '#f87171',
            bgColor: 'rgba(248,113,113,0.12)',
            dbs: [zh ? '达梦（DM）' : 'DM', zh ? '人大金仓（KingbaseES）' : 'KingbaseES', 'OceanBase']
        },
        {
            type: zh ? '云原生数仓' : 'Cloud-Native Warehouse',
            label: 'Cloud DW',
            color: '#34d399',
            bgColor: 'rgba(52,211,153,0.12)',
            dbs: ['Redshift', 'Snowflake', 'BigQuery', 'Databricks', zh ? '阿里云 MaxCompute' : 'Aliyun MaxCompute', zh ? '华为云 DWS' : 'Huawei DWS']
        }
    ];

    $scope.mlVars = [
        { name: 'query',    desc: zh ? '请求上下文，可获取请求维度、模型名称、parameter 等字段' : 'Request context: access requested dimensions, model name, and parameter fields', example: '${query.parameter["userName"]}' },
        { name: 'filter',   desc: zh ? '获取当前过滤器数据' : 'Access current filter values', example: '${filter["userName"]}' },
        { name: 'this',     desc: zh ? '当前对象引用，用于获取同类中其他注解的配置，实现派生与复用' : 'Reference to the current object — read other annotation configs for derivation and reuse', example: '${this.ip.sql()}' },
        { name: 'user',     desc: zh ? '当前登录用户上下文（uid、account、name）' : 'Current logged-in user context (uid, account, name)', example: '${user.name}' },
        { name: 'tenantId', desc: zh ? '多租户场景中使用，为当前租户 ID' : 'Current tenant ID for multi-tenant scenarios', example: '${tenantId}' }
    ];

    $timeout(function () {
        if (!Prism.languages.velocity) {
            Prism.languages.velocity = {
                'comment': { pattern: /--[^\r\n]*/, greedy: true },
                'string':  { pattern: /'(?:[^'\\]|\\.)*'/, greedy: true },
                'directive': { pattern: /#(?:if|elseif|else|end|foreach)\b/, alias: 'keyword' },
                'variable': { pattern: /\$(?:\{[^}]*\}|[a-zA-Z_$][a-zA-Z0-9_.()]*)/,  alias: 'function' },
                'operator': /[!=<>]=?|&&|\|\|/,
                'punctuation': /[()[\]{},;]/
            };
        }
        Prism.highlightAll();
    }, 100);
});
