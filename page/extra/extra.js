app.controller("extra", function ($scope, $window) {

    $scope.window = $window;

    $scope.modules = [
        // ── AI ──────────────────────────────────────────
        {
            name: "erupt-ai",
            title: "低代码 × 大模型",
            remark: "与当下主流大模型深度集成，一键接入 GPT、Claude、通义等，低代码构建 AI 驱动的管理应用",
            link: "https://docs.erupt.xyz/modules/erupt-ai"
        },
        {
            name: "erupt-ai-claw",
            title: "自然语言驱动服务器",
            remark: "通过自然语言直接操作注解驱动的数据与业务、执行 Shell 命令、读写文件，并支持自定义 Skills 扩展",
            link: "https://docs.erupt.xyz/modules/erupt-ai-claw"
        },
        // ── 数据分析 ────────────────────────────────────
        {
            name: "erupt-cube",
            title: "大数据语义建模与可视化分析",
            remark: "借鉴 Google Looker 语义层理念，统一指标口径与业务含义，配合灵活的可视化分析方式，降低数据使用门槛（开发中）",
            link: "https://docs.erupt.xyz/modules/pro/erupt-cube"
        },
        {
            name: "erupt-chart",
            title: "低代码数据可视化",
            remark: "零前端代码，仅需配置即可完成数据分析，支持 20+ 图表类型、动态 SQL、多维混译与自定义数据看板",
            link: "https://docs.erupt.xyz/modules/pro/erupt-chart"
        },
        // ── 流程 ────────────────────────────────────────
        {
            name: "erupt-flow",
            title: "通用流程引擎",
            remark: "完整的流程解决方案，涵盖流程设计、发起、审批、通知与打印，开箱即用",
            link: "https://docs.erupt.xyz/modules/pro/erupt-flow"
        },
        {
            name: "erupt-print",
            title: "打印模块",
            remark: "为流程单据提供模板化打印功能，支持自定义打印模板，配合 erupt-flow 使用",
            link: "https://docs.erupt.xyz/modules/erupt-print"
        },
        // ── 权限 / 多租户 ────────────────────────────────
        {
            name: "erupt-upms",
            title: "用户权限管理系统",
            remark: "提供完整的 UPMS 能力，涵盖用户、角色、菜单、组织架构等核心功能，细粒度数据权限控制",
            link: "https://docs.erupt.xyz/modules/erupt-upms"
        },
        {
            name: "erupt-tenant",
            title: "SaaS 多租户",
            remark: "低代码开发多租户应用，页面功能多租户复用，数据完全隔离，快速构建 SaaS 平台",
            link: "https://docs.erupt.xyz/modules/pro/erupt-tenant"
        },
        // ── 基础设施 ────────────────────────────────────
        {
            name: "erupt-cloud",
            title: "微服务云配置中台",
            remark: "分布式架构下统一管理集群内任意服务节点，构建通用云配置中心，支持多节点服务注册与调度",
            link: "https://docs.erupt.xyz/modules/erupt-cloud"
        },
        {
            name: "erupt-job",
            title: "定时任务调度",
            remark: "可视化管理定时任务，支持 Cron 表达式配置、动态启停与任务执行日志查看",
            link: "https://docs.erupt.xyz/modules/erupt-job"
        },
        {
            name: "erupt-monitor",
            title: "服务监控",
            remark: "实时监控服务器 CPU、内存、磁盘、JVM 状态及 Redis 运行情况，支持在线踢出登录用户",
            link: "https://docs.erupt.xyz/modules/erupt-monitor"
        },
        {
            name: "erupt-websocket",
            title: "WebSocket 实时交互",
            remark: "与前端保持长连接，支持后端实时向前端推送数据，适用于实时通知、进度反馈等场景",
            link: "https://docs.erupt.xyz/modules/erupt-websocket"
        },
        {
            name: "erupt-notice",
            title: "消息通知",
            remark: "提供全员广播与点对点消息推送，支持站内 WebSocket 推送，可扩展短信、邮件等第三方通知渠道",
            link: "https://docs.erupt.xyz/modules/erupt-notice"
        },
        // ── 数据扩展 ────────────────────────────────────
        {
            name: "erupt-jpa",
            title: "JPA 数据库扩展",
            remark: "在标准 Spring Data JPA 基础上深度扩展，支持 Lambda 链式查询，简化复杂数据操作",
            link: "https://docs.erupt.xyz/modules/erupt-jpa"
        },
        {
            name: "erupt-mongodb",
            title: "MongoDB 数据源",
            remark: "为 Erupt 框架提供 MongoDB 数据源支持，用注解驱动的方式管理 NoSQL 数据",
            link: "https://docs.erupt.xyz/modules/erupt-mongodb"
        },
        // ── 开发工具 ────────────────────────────────────
        {
            name: "erupt-generator",
            title: "代码生成器",
            remark: "可视化界面快速生成 Erupt 实体类代码，降低重复编码成本，提升开发效率",
            link: "https://docs.erupt.xyz/modules/erupt-generator"
        },
        {
            name: "erupt-tpl",
            title: "自定义页面模板",
            remark: "在菜单中嵌入自定义 HTML 模板页面，支持自定义组件、图表与按钮，突破注解边界",
            link: "https://docs.erupt.xyz/modules/erupt-tpl"
        },
        {
            name: "erupt-magic-api",
            title: "在线 API 开发 IDE",
            remark: "集成 magic-api，在浏览器中编写脚本并立即发布 HTTP 接口，极速敏捷开发",
            link: "https://docs.erupt.xyz/modules/erupt-magic-api"
        },
        {
            name: "erupt-i18n",
            title: "国际化支持",
            remark: "通过 @EruptI18n 注解与 CSV 配置快速实现多语言国际化，轻松支持全球化业务",
            link: "https://docs.erupt.xyz/advanced/i18n"
        },
        // ── 通用工具 ────────────────────────────────────
        {
            name: "Linq.J",
            title: "Java 集合查询语言",
            remark: "用 SQL 思维操作 Java 集合，基于 Lambda 实现高效类型安全的对象查询与聚合",
            link: "https://gitee.com/erupt/linq"
        },
        {
            name: "zeta-api",
            title: "配置式 API 接口开发",
            remark: "通过配置 XML 快速创建 API 接口与接口文档，零代码发布数据接口",
            link: "https://gitee.com/erupt/zeta-api"
        },
        // ── 展望 ────────────────────────────────────────
        {
            name: "...",
            title: "持续构想中",
            remark: "如果你也有有趣的想法，欢迎联系作者共建，或自己动手让 Erupt 生态越来越好",
            link: null
        }
    ];

});
