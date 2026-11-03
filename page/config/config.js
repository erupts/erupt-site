app.controller("config", function ($scope, i18nService) {

    var t = i18nService.t;

    // §3 how values reach the application
    $scope.steps = [
        {icon: '🚀', tag: 'Boot', code: 'EruptConfigEnvironmentPostProcessor\n  → JDBC read → sources.addFirst(...)'},
        {icon: '💾', tag: 'Save', code: 'afterUpdate → refresh()\n  PropertySource ⟲ @Value ⟲ event'},
        {icon: '🖧', tag: 'Cluster', code: 'erupt.redis-session: true   # broadcast\nerupt.config.refresh-seconds: 30'}
    ].map(function (s, i) {
        s.title = t('cfg.flow.s' + (i + 1) + '.t');
        s.desc = t('cfg.flow.s' + (i + 1) + '.p');
        return s;
    });

    // §5 the 17 value types, grouped
    $scope.typeGroups = [
        {items: [['Aa', 'string'], ['••', 'password'], ['¶', 'text'], ['<>', 'html']]},
        {items: [['[ ]', 'list', true], ['k:v', 'key/value', true], ['{ }', 'json', true], ['---', 'yaml', true]]},
        {items: [['#', 'number'], ['◐', 'boolean'], ['📅', 'date'], ['🕒', 'datetime'], ['⏱', 'time']]},
        {items: [['■', 'color'], ['★', 'icon'], ['🖼', 'image'], ['📎', 'attachment']]}
    ].map(function (g, i) {
        g.title = t('cfg.types.g' + (i + 1) + '.t');
        g.desc = t('cfg.types.g' + (i + 1) + '.p');
        g.items = g.items.map(function (x) { return {icon: x[0], name: x[1], flat: !!x[2]}; });
        return g;
    });

    // §6 comparison rows: k = question, a = system-param table, b = Nacos / Apollo, c = erupt-config
    $scope.cmpRows = ['read', 'profile', 'files', 'service', 'govern', 'ui'].map(function (k) {
        return {k: t('cfg.cmp.' + k + '.k'), a: t('cfg.cmp.' + k + '.a'), b: t('cfg.cmp.' + k + '.b'), c: t('cfg.cmp.' + k + '.c')};
    });

    // §7 honest costs
    $scope.costs = ['no-history', 'mask-only', 'field-injection', 'db-at-boot'].map(function (k, i) {
        return {key: k, title: t('cfg.cost.c' + (i + 1) + '.t'), desc: t('cfg.cost.c' + (i + 1) + '.p')};
    });
});
