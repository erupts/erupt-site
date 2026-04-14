app.controller("cube", function ($scope, $timeout, i18nService) {

    var lang = i18nService.getLang();
    var zh = lang === 'zh-CN';

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
            with: zh ? '注解建模 + 拖拽分析，无需多方协作' : 'Annotate + drag-and-drop, no cross-team sync'
        }
    ];

    $scope.engineerPoints = i18nService.t('cube.roles.eng.points').split('|');
    $scope.analystPoints = i18nService.t('cube.roles.ana.points').split('|');

    $scope.annotations = [
        {
            name: '@EruptCube',
            title: i18nService.t('cube.anno.a1.title'),
            desc: i18nService.t('cube.anno.a1.desc')
        },
        {
            name: '@Dimension',
            title: i18nService.t('cube.anno.a2.title'),
            desc: i18nService.t('cube.anno.a2.desc')
        },
        {
            name: '@Measure',
            title: i18nService.t('cube.anno.a3.title'),
            desc: i18nService.t('cube.anno.a3.desc')
        },
        {
            name: '@Parameter',
            title: i18nService.t('cube.anno.a4.title'),
            desc: i18nService.t('cube.anno.a4.desc')
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

    $scope.chartTypes = i18nService.t('cube.viz.chart.types').split('|').map(function(s) {
        var p = s.split(':');
        return { icon: p[0], name: p[1] };
    });

    $scope.filterTypes = i18nService.t('cube.viz.filter.types').split('|').map(function(s) {
        var p = s.split(':');
        return { icon: p[0], name: p[1] };
    });

    $scope.cmpRows = [
        {
            feature: zh ? '模型格式' : 'Schema Format',
            looker: 'LookML DSL',
            cubedev: 'YAML / JS',
            us: zh ? 'Java 注解，代码即模型' : 'Java Annotations'
        },
        {
            feature: zh ? 'IDE 支持' : 'IDE Support',
            looker: zh ? '文本编辑器，无类型检查' : 'Text editor, no type check',
            cubedev: zh ? '文本编辑器，无类型检查' : 'Text editor, no type check',
            us: zh ? '全量自动补全、跳转、安全重命名' : 'Autocomplete, Cmd+Click, safe rename'
        },
        {
            feature: zh ? '版本管理' : 'Version Control',
            looker: zh ? '独立文件追踪，与业务代码割裂' : 'Separate file tracking, decoupled',
            cubedev: zh ? '独立文件追踪，与业务代码割裂' : 'Separate file tracking, decoupled',
            us: zh ? '与业务代码同一 commit，历史完整' : 'Same commit as business code'
        },
        {
            feature: zh ? '类型安全' : 'Type Safety',
            looker: zh ? '运行时报错' : 'Runtime errors',
            cubedev: zh ? '运行时报错' : 'Runtime errors',
            us: zh ? '编译期校验，错误即时可见' : 'Compile-time validation'
        },
        {
            feature: zh ? '动态模型' : 'Dynamic Models',
            looker: zh ? '不支持' : 'Not supported',
            cubedev: zh ? 'Jinja 模板，表达能力有限' : 'Jinja templating, limited',
            us: zh ? '纯 Java：条件、循环、运行时覆盖' : 'Pure Java: any condition or loop'
        },
        {
            feature: zh ? '继承 & 派生' : 'Inheritance & Derivation',
            looker: zh ? '不支持' : 'Not supported',
            cubedev: zh ? '不支持' : 'Not supported',
            us: zh ? '类继承复用 Cube，@Measure 派生组合' : 'Class inheritance + derived @Measure'
        },
        {
            feature: zh ? '部署方式' : 'Deployment',
            looker: zh ? 'SaaS / 企业私有化' : 'SaaS / Enterprise on-prem',
            cubedev: zh ? '独立 Node.js 服务' : 'Separate Node.js service',
            us: zh ? '内嵌 Spring Boot，零额外运维' : 'Embedded in Spring Boot'
        },
        {
            feature: zh ? '开源许可' : 'Open Source',
            looker: zh ? '✗ 商业闭源' : '✗ Commercial',
            cubedev: zh ? '✓ BSL 许可（有限制）' : '✓ BSL (with restrictions)',
            us: zh ? '✓ Apache 2.0' : '✓ Apache 2.0'
        }
    ];

    $scope.annoAdvantages = [
        {
            icon: '⌨️',
            title: zh ? 'IDE 优先' : 'IDE First',
            desc: zh ? 'IntelliJ / Eclipse 提供全量自动补全、Cmd+Click 跳转、跨文件安全重命名——语义模型开发体验与普通 Java 代码无异。' : 'IntelliJ / Eclipse give full autocomplete, Cmd+Click navigation and safe cross-file rename — same experience as any Java code.'
        },
        {
            icon: '🔀',
            title: zh ? 'Git 原生' : 'Git Native',
            desc: zh ? '语义模型与调用它的业务逻辑在同一次 commit 中，PR diff 清晰，历史可追溯，回滚原子化。' : 'Semantic model and the business logic using it live in the same commit. Clean diffs, traceable history, atomic rollbacks.'
        },
        {
            icon: '⚡',
            title: zh ? '高度动态' : 'Fully Dynamic',
            desc: zh ? '用任意 Java 表达式控制模型行为：多租户过滤、特性开关、按权限动态暴露字段——静态 YAML 根本无法实现。' : 'Control model behavior with any Java expression: tenant filters, feature flags, permission-based exposure — impossible with static YAML.'
        },
        {
            icon: '🧬',
            title: zh ? '继承 & 派生' : 'Inherit & Derive',
            desc: zh ? '通过类继承复用基础 Cube，子类覆盖或追加维度 / 指标；派生指标直接引用其他 @Measure 组合计算，零重复定义。' : 'Extend base cubes via class inheritance; override or add dimensions and measures. Derived metrics reference other @Measure fields — zero duplication.'
        }
    ];

    $scope.dbCategories = [
        {
            type: zh ? '分析型数仓' : 'Analytical Warehouse',
            label: 'OLAP',
            color: '#a78bfa',
            bgColor: 'rgba(167,139,250,0.12)',
            dbs: ['Apache Doris', 'StarRocks', 'ClickHouse', 'GreenPlum', 'Apache Hive', 'Presto', 'Trino', 'Impala', 'ADB']
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
            dbs: [zh ? '阿里云 MaxCompute' : 'Aliyun MaxCompute', zh ? '华为云 DWS' : 'Huawei DWS']
        }
    ];

    $scope.flowSteps = i18nService.t('cube.flow.steps').split('|').map(function (s) {
        var parts = s.split(':');
        return { icon: parts[0], label: parts[1] };
    });

    $timeout(function () {
        Prism.highlightAll();
    }, 100);
});
