app.controller("extra", function ($scope, $window) {

    $scope.window = $window;

    $scope.modules = [
        // ── AI ──────────────────────────────────────────
        {
            name: "erupt-ai",
            title: "extra.erupt-ai.title",
            remark: "extra.erupt-ai.remark",
            link: "https://docs.erupt.xyz/modules/erupt-ai"
        },
        {
            name: "erupt-ai-claw",
            title: "extra.erupt-ai-claw.title",
            remark: "extra.erupt-ai-claw.remark",
            link: "https://docs.erupt.xyz/modules/erupt-ai-claw"
        },
        // ── 数据分析 ────────────────────────────────────
        {
            name: "erupt-cube",
            title: "extra.erupt-cube.title",
            remark: "extra.erupt-cube.remark",
            link: "https://docs.erupt.xyz/modules/pro/erupt-cube"
        },
        {
            name: "erupt-chart",
            title: "extra.erupt-chart.title",
            remark: "extra.erupt-chart.remark",
            link: "https://docs.erupt.xyz/modules/pro/erupt-chart"
        },
        // ── 流程 ────────────────────────────────────────
        {
            name: "erupt-flow",
            title: "extra.erupt-flow.title",
            remark: "extra.erupt-flow.remark",
            link: "https://docs.erupt.xyz/modules/pro/erupt-flow"
        },
        {
            name: "erupt-print",
            title: "extra.erupt-print.title",
            remark: "extra.erupt-print.remark",
            link: "https://docs.erupt.xyz/modules/erupt-print"
        },
        // ── 权限 / 多租户 ────────────────────────────────
        {
            name: "erupt-upms",
            title: "extra.erupt-upms.title",
            remark: "extra.erupt-upms.remark",
            link: "https://docs.erupt.xyz/modules/erupt-upms"
        },
        {
            name: "erupt-tenant",
            title: "extra.erupt-tenant.title",
            remark: "extra.erupt-tenant.remark",
            link: "https://docs.erupt.xyz/modules/pro/erupt-tenant"
        },
        // ── 基础设施 ────────────────────────────────────
        {
            name: "erupt-cloud",
            title: "extra.erupt-cloud.title",
            remark: "extra.erupt-cloud.remark",
            link: "https://docs.erupt.xyz/modules/erupt-cloud"
        },
        {
            name: "erupt-job",
            title: "extra.erupt-job.title",
            remark: "extra.erupt-job.remark",
            link: "https://docs.erupt.xyz/modules/erupt-job"
        },
        {
            name: "erupt-monitor",
            title: "extra.erupt-monitor.title",
            remark: "extra.erupt-monitor.remark",
            link: "https://docs.erupt.xyz/modules/erupt-monitor"
        },
        {
            name: "erupt-terminal",
            title: "extra.erupt-terminal.title",
            remark: "extra.erupt-terminal.remark",
            link: "https://docs.erupt.xyz/modules/erupt-terminal"
        },
        {
            name: "erupt-websocket",
            title: "extra.erupt-websocket.title",
            remark: "extra.erupt-websocket.remark",
            link: "https://docs.erupt.xyz/modules/erupt-websocket"
        },
        {
            name: "erupt-notice",
            title: "extra.erupt-notice.title",
            remark: "extra.erupt-notice.remark",
            link: "https://docs.erupt.xyz/modules/erupt-notice"
        },
        // ── 数据扩展 ────────────────────────────────────
        {
            name: "erupt-jpa",
            title: "extra.erupt-jpa.title",
            remark: "extra.erupt-jpa.remark",
            link: "https://docs.erupt.xyz/modules/erupt-jpa"
        },
        {
            name: "erupt-mongodb",
            title: "extra.erupt-mongodb.title",
            remark: "extra.erupt-mongodb.remark",
            link: "https://docs.erupt.xyz/modules/erupt-mongodb"
        },
        // ── 开发工具 ────────────────────────────────────
        {
            name: "erupt-generator",
            title: "extra.erupt-generator.title",
            remark: "extra.erupt-generator.remark",
            link: "https://docs.erupt.xyz/modules/erupt-generator"
        },
        {
            name: "erupt-tpl",
            title: "extra.erupt-tpl.title",
            remark: "extra.erupt-tpl.remark",
            link: "https://docs.erupt.xyz/modules/erupt-tpl"
        },
        {
            name: "erupt-magic-api",
            title: "extra.erupt-magic-api.title",
            remark: "extra.erupt-magic-api.remark",
            link: "https://docs.erupt.xyz/modules/erupt-magic-api"
        },
        {
            name: "erupt-i18n",
            title: "extra.erupt-i18n.title",
            remark: "extra.erupt-i18n.remark",
            link: "https://docs.erupt.xyz/advanced/i18n"
        },
        // ── 通用工具 ────────────────────────────────────
        {
            name: "Linq.J",
            title: "extra.linqj.title",
            remark: "extra.linqj.remark",
            link: "https://gitee.com/erupt/linq"
        },
        {
            name: "zeta-api",
            title: "extra.zeta-api.title",
            remark: "extra.zeta-api.remark",
            link: "https://gitee.com/erupt/zeta-api"
        },
        // ── 展望 ────────────────────────────────────────
        {
            name: "...",
            title: "extra.more.title",
            remark: "extra.more.remark",
            link: null
        }
    ];

});
