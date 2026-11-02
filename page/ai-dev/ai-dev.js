app.controller("aiDev", function ($scope, $sce, i18nService) {

    var t = i18nService.t;

    // §3 lifecycle main line: DRAFT → … → DELIVERED (act = the row action that moves it forward)
    $scope.stages = [
        {code: 'DRAFT', color: '', name: t('dev.stage.draft')},
        {code: 'REVIEW', color: 'c', name: t('dev.stage.review'), act: t('dev.act.submit')},
        {code: 'QUEUED', color: '', name: t('dev.stage.queued'), act: t('dev.act.approve')},
        {code: 'RUNNING', color: 'v', name: t('dev.stage.running'), act: 'auto'},
        {code: 'VERIFYING', color: 'v', name: t('dev.stage.verifying'), act: 'auto'},
        {code: 'ACCEPTANCE', color: 'y', name: t('dev.stage.acceptance'), act: 'auto'},
        {code: 'DELIVERED', color: 'g', name: t('dev.stage.delivered'), act: t('dev.act.accept')}
    ];

    $scope.branches = ['dev.branch.reject', 'dev.branch.changes', 'dev.branch.fail', 'dev.branch.frozen']
        .map(function (k) { return $sce.trustAsHtml(t(k)); });

    // §4 execution steps
    $scope.steps = [
        {icon: '🎯', tag: 'Queue', code: 'UPDATE … WHERE stage = QUEUED'},
        {icon: '🌳', tag: 'Worktree', code: 'req/req-n ← origin/<base>'},
        {icon: '🤖', tag: 'Agent', code: 'claude -p --mcp-config run/…'},
        {icon: '📝', tag: 'Commit'},
        {icon: '🧪', tag: 'QA', code: 'devReportVerdict(PASS | FAIL)'},
        {icon: '🚀', tag: 'Deliver', code: 'rebase → push --ff-only'}
    ].map(function (s, i) {
        s.title = t('dev.exec.s' + (i + 1) + '.t');
        s.desc = t('dev.exec.s' + (i + 1) + '.p');
        return s;
    });

    // §5 coding CLIs — from the module README table
    $scope.clis = [
        {ini: 'CC', bg: '#F7D7B5', name: 'Claude Code', code: 'claude', cmd: 'claude -p --output-format stream-json', resume: true, mcp: true},
        {ini: 'CX', bg: '#D9D9D9', name: 'Codex', code: 'codex', cmd: 'codex exec --json', resume: true, mcp: true},
        {ini: 'OC', bg: '#C9E4FF', name: 'OpenCode', code: 'opencode', cmd: 'opencode run --format json --standalone', resume: true, mcp: true},
        {ini: 'KC', bg: '#BCA0F2', name: 'Kimi Code', code: 'kimi', cmd: 'kimi --print --output-format stream-json', resume: true, mcp: true},
        {ini: 'CU', bg: '#FCE566', name: 'Cursor CLI', code: 'cursor', cmd: 'cursor-agent -p --output-format stream-json --force', resume: true, mcp: false},
        {ini: 'QC', bg: '#93D655', name: 'Qwen Code', code: 'qwen', cmd: 'qwen --output-format stream-json --yolo', resume: true, mcp: false},
        {ini: '$_', bg: '#FFFFFF', name: t('dev.cli.any.t'), code: '*', cmd: t('dev.cli.any.p'), resume: false, mcp: false},
        {ini: '{ }', bg: '#4FC8EC', name: t('dev.cli.custom.t'), code: 'CodingAgentRunner', cmd: t('dev.cli.custom.p'), resume: true, mcp: true}
    ];

    // §6 safety
    $scope.safety = [
        {icon: '🪪', tag: 'Token'},
        {icon: '🧹', tag: 'Env'},
        {icon: '🔑', tag: 'Git'},
        {icon: '🧱', tag: 'Isolation'},
        {icon: '👀', tag: 'Scope'},
        {icon: '🧰', tag: 'Tools'}
    ].map(function (s, i) {
        s.title = t('dev.safe.b' + (i + 1) + '.t');
        s.desc = t('dev.safe.b' + (i + 1) + '.p');
        return s;
    });

    // §7 setup points
    $scope.points = ['📁', '👥', '🏢', '💾'].map(function (icon, i) {
        return {icon: icon, title: t('dev.conf.p' + (i + 1) + '.t'), desc: t('dev.conf.p' + (i + 1) + '.p')};
    });
});
