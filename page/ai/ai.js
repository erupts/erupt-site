app.controller("ai", function ($scope, $sce, i18nService) {

    $scope.getI18nHtml = function (key, params) {
        return $sce.trustAsHtml(i18nService.t(key, params));
    };

    $scope.trustHtml = function (html) {
        return $sce.trustAsHtml(html || '');
    };

    $scope.capabilities = [
        {
            icon: '\u{1F310}', tag: 'LLM',
            accent: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
            bg: '#ede9fe', fg: '#6d28d9', wide: true,
            title: i18nService.t('ai.core.multillm.title'),
            desc: i18nService.t('ai.core.multillm.desc'),
            chips: ['GPT-4o', 'Claude 3.5', 'Gemini', 'DeepSeek', 'Qwen', '文心', 'GLM', 'Doubao', 'Kimi', 'Spark', 'Llama', 'Ollama', '...']
        },
        {
            icon: '\u{1F4AC}', tag: 'CONTEXT',
            accent: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            bg: '#dbeafe', fg: '#1d4ed8', wide: false,
            title: i18nService.t('ai.core.context.title'),
            desc: i18nService.t('ai.core.context.desc')
        },
        {
            icon: '\u{1F916}', tag: 'AGENT',
            accent: 'linear-gradient(90deg, #10b981, #34d399)',
            bg: '#d1fae5', fg: '#047857', wide: false,
            title: i18nService.t('ai.core.agent.title'),
            desc: i18nService.t('ai.core.agent.desc')
        },
        {
            icon: '\u{1F517}', tag: 'PROTOCOL',
            accent: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
            bg: '#fef3c7', fg: '#b45309', wide: false,
            title: i18nService.t('ai.core.mcp.title'),
            desc: i18nService.t('ai.core.mcp.desc')
        },
        {
            icon: '\u{1F5E8}', tag: 'CHAT',
            accent: 'linear-gradient(90deg, #ec4899, #f472b6)',
            bg: '#fce7f3', fg: '#be185d', wide: false,
            title: i18nService.t('ai.core.interactive.title'),
            desc: i18nService.t('ai.core.interactive.desc')
        },
        {
            icon: '\u{2699}', tag: 'PROMPT',
            accent: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
            bg: '#f3e8ff', fg: '#7c3aed', wide: false,
            title: i18nService.t('ai.core.systemprompt.title'),
            desc: i18nService.t('ai.core.systemprompt.desc')
        },
        {
            icon: '\u{1F513}', tag: 'APACHE 2.0',
            accent: 'linear-gradient(90deg, #0891b2, #22d3ee)',
            bg: '#cffafe', fg: '#0e7490', wide: false,
            title: i18nService.t('ai.core.opensource.title'),
            desc: i18nService.t('ai.core.opensource.desc')
        },
        {
            icon: '\u{1F527}', tag: 'TOOLS',
            accent: 'linear-gradient(90deg, #ef4444, #f87171)',
            bg: '#fee2e2', fg: '#b91c1c', wide: false, full: true,
            title: i18nService.t('ai.core.tools.title'),
            desc: i18nService.t('ai.core.tools.desc'),
            code: '<span class="cc">// 一个注解，将 Java 方法注册为 AI 工具</span>\n<span class="ca">@Tool</span>(name = <span class="cs">"查询用户订单"</span>)\n<span class="ck">public</span> List&lt;Order&gt; <span class="cn">queryOrders</span>(@P("UserId") <span class="ck">String</span> userId) {\n    <span class="ck">return</span> orderService.findByUserId(userId);\n}\n\n<span class="cc">// 支持运行时动态注册 / 注销</span>\n<span class="ca">@Tool</span>(name = <span class="cs">"创建工单"</span>, auth = <span class="ck">true</span>)\n<span class="ck">public</span> <span class="ck">boolean</span> <span class="cn">createTicket</span>(@P("标题") <span class="ck">String</span> title,@P("内容")  <span class="ck">String</span> content) {\n    <span class="ck">return</span> ticketService.create(title, content);\n}'
        }
    ];

    // 国际模型
    $scope.internationalModels = [
        { name: 'GPT-4o / GPT-4', company: 'OpenAI', abbr: 'G', bg: '#10a37f', fg: '#fff' },
        { name: 'Claude 3.5 / Claude 4', company: 'Anthropic', abbr: 'C', bg: '#d97757', fg: '#fff' },
        { name: 'Gemini', company: 'Google', abbr: 'G', bg: '#4285f4', fg: '#fff' },
        { name: 'Llama 3 / 4', company: 'Meta', abbr: 'L', bg: '#0668e1', fg: '#fff' },
        { name: 'Mistral / Mixtral', company: 'Mistral AI', abbr: 'M', bg: '#f24822', fg: '#fff' },
        { name: 'Command R+', company: 'Cohere', abbr: 'Co', bg: '#39594d', fg: '#fff' },
        { name: 'Grok', company: 'xAI', abbr: 'X', bg: '#1d1d1f', fg: '#fff' },
    ];

    // 国产模型
    $scope.chinaModels = [
        { name: 'DeepSeek V3 / R1', company: '深度求索', abbr: 'DS', bg: '#4d6bfe', fg: '#fff' },
        { name: '通义千问 Qwen', company: '阿里云', abbr: 'Q', bg: '#6236ff', fg: '#fff' },
        { name: '文心一言 ERNIE', company: '百度', abbr: 'E', bg: '#2932e1', fg: '#fff' },
        { name: 'GLM / ChatGLM', company: '智谱 AI', abbr: 'Z', bg: '#3366ff', fg: '#fff' },
        { name: '豆包 Doubao', company: '字节跳动', abbr: 'D', bg: '#325aff', fg: '#fff' },
        { name: 'Kimi / Moonshot', company: '月之暗面', abbr: 'K', bg: '#1a1a2e', fg: '#fff' },
        { name: '讯飞星火 Spark', company: '科大讯飞', abbr: 'S', bg: '#e4393c', fg: '#fff' },
        { name: 'MiniMax', company: 'MiniMax', abbr: 'M', bg: '#6c5ce7', fg: '#fff' },
    ];

    // 开源 & 私有化部署
    $scope.openSourceModels = [
        { name: 'Ollama', company: '本地部署', abbr: 'O', bg: '#1a1a2e', fg: '#fff' },
        { name: 'vLLM', company: '高性能推理', abbr: 'V', bg: '#e85d04', fg: '#fff' },
        { name: 'LM Studio', company: '桌面部署', abbr: 'LM', bg: '#0f766e', fg: '#fff' },
        { name: 'LocalAI', company: '本地推理', abbr: 'LA', bg: '#4f46e5', fg: '#fff' },
    ];

    $scope.mcpFeatures = [
        {
            title: i18nService.t('ai.mcp.feature1.title'),
            desc: i18nService.t('ai.mcp.feature1.desc')
        },
        {
            title: i18nService.t('ai.mcp.feature2.title'),
            desc: i18nService.t('ai.mcp.feature2.desc')
        },
        {
            title: i18nService.t('ai.mcp.feature3.title'),
            desc: i18nService.t('ai.mcp.feature3.desc')
        }
    ];

    $scope.reactSteps = [
        {
            title: i18nService.t('ai.react.step1.title'),
            desc: i18nService.t('ai.react.step1.desc')
        },
        {
            title: i18nService.t('ai.react.step2.title'),
            desc: i18nService.t('ai.react.step2.desc')
        },
        {
            title: i18nService.t('ai.react.step3.title'),
            desc: i18nService.t('ai.react.step3.desc')
        },
        {
            title: i18nService.t('ai.react.step4.title'),
            desc: i18nService.t('ai.react.step4.desc')
        }
    ];
});
