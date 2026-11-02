app.controller("atlas", function ($scope, $sce, i18nService) {

    var t = i18nService.t;

    // §3 seven views — order follows the product's tab bar
    $scope.views = [
        {glyph: '⇆', tag: 'Lineage'},
        {glyph: '≡', tag: 'Layers'},
        {glyph: '▦', tag: 'Overview'},
        {glyph: '▩', tag: 'Matrix'},
        {glyph: '✓', tag: 'Power'},
        {glyph: '◎', tag: 'Impact'},
        {glyph: '⚠', tag: 'Audit'}
    ].map(function (v, i) {
        v.title = t('atlas.view.v' + (i + 1) + '.t');
        v.desc = t('atlas.view.v' + (i + 1) + '.p');
        return v;
    });

    // §4 layers mockup — foundation models, "stands on it" as bar width
    $scope.foundation = [
        {n: 'User', m: 'upms', w: 100},
        {n: 'Organization', m: 'upms', w: 48},
        {n: 'Post', m: 'upms', w: 48},
        {n: 'Menu', m: 'upms', w: 42},
        {n: 'Data Source', m: 'report', w: 32},
        {n: 'Language Model', m: 'ai', w: 21},
        {n: 'Tenant Menu', m: 'tenant', w: 21},
        {n: 'Report Handler', m: 'report', w: 21},
        {n: 'Embedding Model', m: 'ai', w: 16}
    ];

    // §4 matrix mockup — module × module coupling heat
    var mods = ['upms', 'ai', 'cube', 'flow', 'print', 'tenant'];
    var heat = [
        [18, 3, 4, 2, 2, 5],
        [3, 8, 0, 0, 0, 1],
        [4, 0, 7, 0, 0, 1],
        [2, 0, 0, 9, 0, 0],
        [2, 0, 0, 0, 2, 0],
        [5, 1, 1, 0, 0, 7]
    ];
    var cells = [{n: '', c: 't'}].concat(mods.map(function (m) { return {n: m, c: 't'}; }));
    heat.forEach(function (row, i) {
        cells.push({n: mods[i], c: 'l'});
        row.forEach(function (n, j) {
            cells.push({n: n || '', c: i === j ? 'd' : n >= 4 ? 'h3x' : n >= 2 ? 'h2x' : n ? 'h1x' : ''});
        });
    });
    $scope.matrix = {cells: cells};

    // §5 audit checks
    $scope.audits = ['cycles', 'sharedTables', 'orphans', 'unpublished'].map(function (k, i) {
        return {
            key: k,
            title: t('atlas.audit.a' + (i + 1) + '.t'),
            desc: t('atlas.audit.a' + (i + 1) + '.p'),
            ex: $sce.trustAsHtml(t('atlas.audit.a' + (i + 1) + '.ex'))
        };
    });

    // §7 edge types
    $scope.edges = ['reference', 'tab', 'embed', 'drill', 'operation', 'cubeOf', 'join', 'table'];

    $scope.registry = ['📇', '🔍', '🧭', '🚀', '{ }'].map(function (icon, i) {
        return {icon: icon, title: t('atlas.reg.r' + (i + 1) + '.t'), desc: t('atlas.reg.r' + (i + 1) + '.p')};
    });
});
