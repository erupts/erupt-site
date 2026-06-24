app.controller("aiClaw", function ($scope, $timeout, i18nService) {

    $scope.demoMessages = [
        {type: 'user', text: 'claw.demo.1.user'},
        {type: 'think', text: 'claw.demo.1.think'},
        {type: 'action', text: 'SELECT COUNT(*) FROM sys_user WHERE DATE(create_time) = CURDATE()'},
        {type: 'result', text: 'claw.demo.1.result'},

        {type: 'user', text: 'claw.demo.2.user'},
        {type: 'think', text: 'claw.demo.2.think'},
        {type: 'action', text: 'tail -n 50 /var/log/app.log | grep ERROR'},
        {type: 'result', text: 'claw.demo.2.result'},

        {type: 'user', text: 'claw.demo.3.user'},
        {type: 'think', text: 'claw.demo.3.think'},
        {type: 'action', text: 'systemctl restart payment-service && curl http://localhost:8081/actuator/health'},
        {type: 'result', text: 'claw.demo.3.result'}
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
        },
        {
            icon: '📊', tag: 'RUNTIME',
            title: i18nService.t('claw.feat.f6.title'),
            desc: i18nService.t('claw.feat.f6.desc')
        }
    ];

    $scope.skillPoints = i18nService.t('claw.skills.points').split('|');

    $timeout(function () {
        Prism.highlightAll();
    }, 100);
});
