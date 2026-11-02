app.controller("designer", function ($scope, i18nService) {

    var t = i18nService.t;

    // §3 workflow: create → design → preview → publish → menu → export
    $scope.steps = [
        {icon: '📄', tag: 'Create'},
        {icon: '🧲', tag: 'Design'},
        {icon: '👁', tag: 'Preview'},
        {icon: '⇡', tag: 'Publish'},
        {icon: '🗂', tag: 'Menu'},
        {icon: '☕', tag: 'Export'}
    ].map(function (s, i) {
        s.title = t('dsn.flow.s' + (i + 1) + '.t');
        s.desc = t('dsn.flow.s' + (i + 1) + '.p');
        return s;
    });

    // §4 export code points
    $scope.codePoints = ['🔁', '🛡', '🔒'].map(function (icon, i) {
        return {icon: icon, title: t('dsn.code.p' + (i + 1) + '.t'), desc: t('dsn.code.p' + (i + 1) + '.p')};
    });

    // §5 component palette, as the designer groups it
    $scope.groups = [
        {items: [['Aa', 'Input'], ['¶', 'Textarea'], ['№', 'Number'], ['••', 'Password'], ['◐', 'Switch'], ['📅', 'Date'], ['⟷', 'Slider'], ['★', 'Rate'], ['■', 'Color'], ['◌', 'Hidden']]},
        {items: [['▾', 'Choice'], ['☑', 'Multi Choice'], ['#', 'Tags'], ['⌕', 'Auto Complete'], ['⊞', 'Reference Table', true], ['⌥', 'Reference Tree', true]]},
        {items: [['📎', 'Attachment'], ['🖼', 'Image'], ['Tт', 'Rich Text'], ['M↓', 'Markdown'], ['</>', 'Code Editor'], ['⌖', 'Map'], ['✎', 'Signature'], ['◫', 'Template'], ['▶', 'Button']]},
        {items: [['—', 'Divider'], ['⊟', 'Group'], ['ⓘ', 'Callout'], ['□', 'Empty']]}
    ].map(function (g, i) {
        g.title = t('dsn.comp.g' + (i + 1) + '.t');
        g.desc = t('dsn.comp.g' + (i + 1) + '.p');
        g.items = g.items.map(function (x) { return {icon: x[0], name: x[1], ref: !!x[2]}; });
        return g;
    });

    // §6 storage points
    $scope.storePoints = ['🗄', '⬇', '➕', '💾'].map(function (icon, i) {
        return {icon: icon, title: t('dsn.store.p' + (i + 1) + '.t'), desc: t('dsn.store.p' + (i + 1) + '.p')};
    });
});
