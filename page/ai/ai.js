app.controller("ai", function ($scope, $sce, $timeout, i18nService) {

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
            code: `@Tool("Query user orders")\npublic List<Order> queryOrders() {\n    return orderService.findByUserId(currentUserId());\n}\n\n@Tool("Create order")\npublic boolean createTicket(@P("Order Title") String title, @P("Order Content") String content) {\n    return ticketService.create(title, content);\n}`
        }
    ];

    $timeout(function () {
        Prism.highlightAll();
    }, 100);

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
