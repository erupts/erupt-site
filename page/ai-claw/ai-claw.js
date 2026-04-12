app.controller("aiClaw", function ($scope, $timeout, i18nService) {

    $scope.demoMessages = [
        {type: 'user', text: '查询今天新注册的用户数量'},
        {type: 'think', text: '需要查询 sys_user 表，按今天日期过滤'},
        {type: 'action', text: 'SELECT COUNT(*) FROM sys_user WHERE DATE(create_time) = CURDATE()'},
        {type: 'result', text: '今天共有 127 名新用户注册'},

        {type: 'user', text: '查看 /var/log/app.log 最近 50 行，找 ERROR 信息'},
        {type: 'think', text: '调用文件读取技能，过滤 ERROR 关键词'},
        {type: 'action', text: 'tail -n 50 /var/log/app.log | grep ERROR'},
        {type: 'result', text: '发现 3 处 ERROR：[14:22:01] Connection pool exhausted (pool=db-main)...'},

        {type: 'user', text: '重启 payment-service，然后检查健康状态'},
        {type: 'think', text: '先重启服务，再调用 actuator/health 确认状态'},
        {type: 'action', text: 'systemctl restart payment-service && curl http://localhost:8081/actuator/health'},
        {type: 'result', text: '服务已重启，健康检查通过 {"status":"UP","db":"UP"}'}
    ];

    $scope.features = [
        {
            icon: '💬', tag: 'NLP',
            title: i18nService.t('claw.feat.f1.title'),
            desc: i18nService.t('claw.feat.f1.desc')
        },
        {
            icon: '🗄️', tag: 'DATA',
            title: i18nService.t('claw.feat.f2.title'),
            desc: i18nService.t('claw.feat.f2.desc')
        },
        {
            icon: '⚡', tag: 'SHELL',
            title: i18nService.t('claw.feat.f3.title'),
            desc: i18nService.t('claw.feat.f3.desc')
        },
        {
            icon: '📁', tag: 'FILES',
            title: i18nService.t('claw.feat.f4.title'),
            desc: i18nService.t('claw.feat.f4.desc')
        },
        {
            icon: '🔌', tag: 'SKILLS',
            title: i18nService.t('claw.feat.f5.title'),
            desc: i18nService.t('claw.feat.f5.desc')
        }
    ];

    $scope.skillPoints = i18nService.t('claw.skills.points').split('|');

    $timeout(function () {
        Prism.highlightAll();
    }, 100);
});
