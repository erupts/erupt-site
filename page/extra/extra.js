app.controller("extra", function ($scope) {
    $scope.modules = [{
        name: 'erupt-bi',
        title: '数据分析模块',
        desc: '通过sql加js混编实现动态报表'
    }, {
        name: 'erupt-job',
        title: '任务调度模块',
        desc: '可视化管理定时任务与动态执行脚本'
    }, {
        name: 'erupt-tpl',
        title: '嵌入式模板模块',
        desc: '支持在erupt中自定义页面，渲染方式支持Freemarker与Thymeleaf'
    }, {
        name: 'erupt-mongodb',
        title: 'mongodb数据源支持',
        desc: '使用erupt管理mongodb数据'
    }, {
        name: 'erupt-generator',
        title: '代码生成器模块',
        desc: '通过字段配置生成erupt代码'
    }, {
        name: 'zeta-api',
        title: '快速创建api接口',
        desc: '在xml中写sql即可创建api接口'
    }]
})
