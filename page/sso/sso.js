app.controller("sso", function ($scope, i18nService) {

    var t = i18nService.t;

    // §3 the login round trip, from the module docs' sequence diagram
    $scope.steps = [
        {icon: '🎲', tag: 'Authorize', code: 'GET /erupt-api/sso/authorize/{code}\n302 → …&state&code_challenge_method=S256'},
        {icon: '🪪', tag: 'Provider', code: '302 → /erupt-api/sso/callback/{code}?code&state'},
        {icon: '🧨', tag: 'Callback', code: 'state → {provider, verifier}  (10 min, once)'},
        {icon: '🔁', tag: 'Token', code: 'POST token_url\ncode + code_verifier + client_secret_post'},
        {icon: '👤', tag: 'UserInfo', code: 'GET user_info_url  Authorization: Bearer …\nsubject = sub | id | open_id | unionId | …'},
        {icon: '🎫', tag: 'Ticket', code: '302 → login?ssoTicket=…  (60 s, once)\nPOST /erupt-api/sso/exchange → token'}
    ].map(function (s, i) {
        s.title = t('sso.flow.s' + (i + 1) + '.t');
        s.desc = t('sso.flow.s' + (i + 1) + '.p');
        return s;
    });

    // §4 design points
    $scope.security = ['🧊', '🙈', '🧭', '🔏', '⛓'].map(function (icon, i) {
        return {icon: icon, title: t('sso.sec.p' + (i + 1) + '.t'), desc: t('sso.sec.p' + (i + 1) + '.p')};
    });

    // §4 public endpoints
    $scope.endpoints = [
        {m: 'GET', p: '/erupt-api/sso/providers', d: t('sso.ep.providers')},
        {m: 'GET', p: '/erupt-api/sso/authorize/{provider}', d: t('sso.ep.authorize')},
        {m: 'GET', p: '/erupt-api/sso/callback/{provider}', d: t('sso.ep.callback')},
        {m: 'POST', p: '/erupt-api/sso/exchange', d: t('sso.ep.exchange')}
    ];

    // §5 the 18 presets, grouped by how the code is exchanged
    $scope.providers = [
        {color: '#E3F6FC', items: ['Keycloak', 'Authing', 'Casdoor', 'Okta', 'Auth0', 'Microsoft Entra ID', 'Google', 'GitLab', 'Atlassian', 'Slack']},
        {color: '#EEF9DF', items: ['GitHub', 'Gitee', 'Zoom', t('sso.mock.feishu')]},
        {color: '#FFF8D6', items: [t('sso.prov.dingtalk'), t('sso.prov.wecom'), t('sso.prov.wechat')]},
        {color: '#F1EAFD', items: [t('sso.prov.custom')]}
    ].map(function (g, i) {
        g.title = t('sso.prov.g' + (i + 1) + '.t');
        g.desc = t('sso.prov.g' + (i + 1) + '.p');
        return g;
    });

    // §6 how one SSO login lands on an erupt user
    $scope.binding = [
        {k: 'provider + subject', cls: 'hit'},
        {k: 'account claim', cls: ''},
        {k: 'auto create', cls: ''},
        {k: 'sync · roles', cls: ''},
        {k: 'status · expiry · ip', cls: 'stop'}
    ].map(function (n, i) {
        n.t = t('sso.bind.n' + (i + 1) + '.t');
        n.d = t('sso.bind.n' + (i + 1) + '.p');
        return n;
    });

    // §7 SAML reject list, from topic 23
    $scope.saml = [
        {t: t('sso.saml.r1'), c: 'javax.xml.crypto.dsig'},
        {t: t('sso.saml.r2'), c: 'signature wrapping'},
        {t: t('sso.saml.r3'), c: 'InResponseTo · ID'},
        {t: t('sso.saml.r4'), c: 'NotBefore · NotOnOrAfter'},
        {t: t('sso.saml.r5'), c: 'Audience · Recipient'}
    ];
});
