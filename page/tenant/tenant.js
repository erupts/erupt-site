app.controller("tenant", function ($scope, i18nService) {

    var t = i18nService.t;

    // §2 console mockup rows
    $scope.tenants = [
        {code: 'acme', name: t('tenant.mock.t1'), pkg: 'Pro · CRM', domain: 'acme.app.com', expire: '2027-06-30', status: 'ACTIVE', color: 'g'},
        {code: 'nova', name: t('tenant.mock.t2'), pkg: 'Basic', domain: 'nova.app.com', expire: '2026-11-01', status: 'GRACE', color: 'y'},
        {code: 'orbit', name: t('tenant.mock.t3'), pkg: 'Trial · 14d', domain: '—', expire: '2026-11-16', status: 'ACTIVE', color: 'g'},
        {code: 'kite', name: t('tenant.mock.t4'), pkg: 'Basic', domain: 'kite.app.com', expire: '2026-09-30', status: 'EXPIRED', color: 'r'},
        {code: 'ember', name: t('tenant.mock.t5'), pkg: 'Pro', domain: 'ember.app.com', expire: '∞', status: 'LOCKED', color: 'k'}
    ];

    // §4 capabilities
    $scope.feats = [
        {icon: '🗄️', tag: 'tenant_id'},
        {icon: '📦', tag: 'Package'},
        {icon: '🏢', tag: 'Console'},
        {icon: '🔐', tag: 'SSO'},
        {icon: '👥', tag: 'UPMS'},
        {icon: '🧾', tag: 'Billing'}
    ].map(function (f, i) {
        f.title = t('tenant.feat.b' + (i + 1) + '.t');
        f.desc = t('tenant.feat.b' + (i + 1) + '.p');
        return f;
    });

    // §5 subscription states
    $scope.states = ['ACTIVE', 'GRACE', 'EXPIRED'].map(function (code, i) {
        return {code: code, color: ['g', 'y', 'r'][i], name: t('tenant.sub.s' + (i + 1))};
    });

    // §6 comparison — rows × [ShardingSphere, MyBatis-Plus, in-house, erupt-tenant]
    $scope.cols = ['ShardingSphere', 'MyBatis-Plus', t('tenant.cmp.self'), 'erupt-tenant'];
    $scope.rows = ['data', 'biz', 'route', 'conf', 'perm', 'learn', 'time'].map(function (k) {
        return {
            name: t('tenant.cmp.' + k),
            cells: [1, 2, 3, 4].map(function (c) { return t('tenant.cmp.' + k + '.' + c); })
        };
    });
});
