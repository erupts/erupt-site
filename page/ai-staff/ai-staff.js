app.controller("aiStaff", function ($scope, i18nService) {

    var t = i18nService.t;

    // §3 model: employee → task → work log → channel (fields from the module docs)
    $scope.entities = [
        {icon: '👔', code: 'Employee', fields: ['account', 'model', 'duty', 'status']},
        {icon: '📋', code: 'Task', fields: ['instruction', 'cron', 'channel']},
        {icon: '📒', code: 'Work Log', fields: ['process', 'result']},
        {icon: '📮', code: 'Channel', fields: ['type', 'responder', 'callback']}
    ].map(function (e, i) {
        var k = 'staff.model.e' + (i + 1);
        e.title = t(k + '.t');
        e.desc = t(k + '.p');
        e.fields = e.fields.map(function (f) {
            return {name: t(k + '.f.' + f), hint: t(k + '.f.' + f + '.h')};
        });
        return e;
    });

    // §4 features
    $scope.feats = [
        {icon: '🪪', tag: 'Account'},
        {icon: '🛡️', tag: 'UPMS'},
        {icon: '⏰', tag: 'Cron'},
        {icon: '🔧', tag: 'Tool Call'},
        {icon: '📮', tag: 'IM'},
        {icon: '📒', tag: 'Log'}
    ].map(function (f, i) {
        f.title = t('staff.b' + (i + 1) + '.t');
        f.desc = t('staff.b' + (i + 1) + '.p');
        return f;
    });

    // §5 IM channels
    $scope.channels = [
        {ini: 'DD', bg: '#C9E4FF', name: t('staff.ch.dingtalk')},
        {ini: 'WC', bg: '#93D655', name: t('staff.ch.wecom')},
        {ini: 'FS', bg: '#4FC8EC', name: t('staff.ch.feishu')},
        {ini: 'SL', bg: '#BCA0F2', name: 'Slack'}
    ];

    $scope.imPoints = ['📤', '📥', '🔗', '🧪'].map(function (icon, i) {
        return {icon: icon, title: t('staff.im.p' + (i + 1) + '.t'), desc: t('staff.im.p' + (i + 1) + '.p')};
    });

    // §6 setup points
    $scope.points = ['🧩', '👔', '📋', '📮'].map(function (icon, i) {
        return {icon: icon, title: t('staff.conf.p' + (i + 1) + '.t'), desc: t('staff.conf.p' + (i + 1) + '.p')};
    });
});
