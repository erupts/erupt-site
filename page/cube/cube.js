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

    $scope.dbCategories = [
        {
            icon: '⚡',
            type: zh ? '分析型数仓（OLAP）' : 'Analytical Warehouse (OLAP)',
            label: 'OLAP',
            dbs: ['Apache Doris', 'StarRocks', 'ClickHouse', 'GreenPlum', 'Apache Hive', 'Presto', 'Trino', 'Impala', 'ADB']
        },
        {
            icon: '🗄️',
            type: zh ? '关系型数据库（OLTP）' : 'Relational Database (OLTP)',
            label: 'OLTP',
            dbs: ['MySQL', 'PostgreSQL', 'Oracle', 'SQL Server', 'TiDB']
        },
        {
            icon: '🇨🇳',
            type: zh ? '国产数据库' : 'Domestic Databases',
            label: 'Domestic DB',
            dbs: [zh ? '达梦（DM）' : 'DM', zh ? '人大金仓（KingbaseES）' : 'KingbaseES', 'OceanBase']
        },
        {
            icon: '☁️',
            type: zh ? '云原生数仓' : 'Cloud-Native Warehouse',
            label: 'Cloud DW',
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
