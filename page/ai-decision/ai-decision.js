app.controller("aiDecision", function ($scope, i18nService) {

    var t = i18nService.t;

    // §4 the three primitive question types
    $scope.types = [
        {k: 'NOUL', code: 'Noul.of("Does this convey urgency?")\n→ NoulAnswer.value() = 0.93\n→ yes(0.9) = true'},
        {k: 'CHOICE', code: 'Choice.of("Which team?", Dept.class)\n→ value() = BILLING · confidence() = 0.88\n→ above(0.8) = Optional[BILLING]'},
        {k: 'SCORE', code: 'Score.of("How frustrated?", "Calm", "Frustrated", "Very angry")\n→ value() = 1.05 · level() = 1\n→ label() = "Frustrated"'}
    ].map(function (x, i) {
        x.ask = t('dcs.type.t' + (i + 1) + '.ask');
        x.get = t('dcs.type.t' + (i + 1) + '.get');
        x.use = t('dcs.type.t' + (i + 1) + '.use');
        return x;
    });

    // §5 admin-defined decisions
    $scope.admin = ['🔁', '🛡', '🧪', '🌐'].map(function (icon, i) {
        return {icon: icon, title: t('dcs.adm.p' + (i + 1) + '.t'), desc: t('dcs.adm.p' + (i + 1) + '.p')};
    });

    // §6 model resolution rules
    $scope.rules = ['🎯', '⭐', '🔒', '🔌'].map(function (icon, i) {
        return {icon: icon, title: t('dcs.rule.r' + (i + 1) + '.t'), desc: t('dcs.rule.r' + (i + 1) + '.p')};
    });
});
