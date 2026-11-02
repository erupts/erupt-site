app.controller("aiRag", function ($scope, i18nService) {

    var t = i18nService.t;

    // §4 why it is "agentic"
    $scope.agentic = ['🧭', '📝', '🪪', '🧪'].map(function (icon, i) {
        return {icon: icon, title: t('rag.ag.p' + (i + 1) + '.t'), desc: t('rag.ag.p' + (i + 1) + '.p')};
    });

    // §5 the 12 built-in embedding providers
    $scope.embeddings = ['OpenAI Compatible', 'Ollama', 'Gemini', 'Qwen', 'GLM', 'SiliconFlow', 'Doubao', 'Cohere', 'Voyage', 'Jina', 'Mistral', 'OpenRouter'];

    // §5 vector stores and their uri shapes
    $scope.stores = [
        {k: 'PGVECTOR', uri: 'postgresql://user:password@host:5432/db · ' + t('rag.infra.store.pg'), on: true},
        {k: 'QDRANT', uri: 'host:6334 · gRPC · https:// for TLS'},
        {k: 'MILVUS', uri: 'http://host:19530'},
        {k: 'REDIS', uri: 'host:6379 · rediss:// for TLS'},
        {k: 'MEMORY', uri: t('rag.infra.store.mem')}
    ];

    // §6 retrieval parameters with their defaults
    $scope.params = [
        {v: '500', k: 'chunkSize'},
        {v: '50', k: 'chunkOverlap'},
        {v: '5', k: 'topK'},
        {v: '0.5', k: 'minScore'}
    ].map(function (p, i) {
        p.title = t('rag.param.p' + (i + 1) + '.t');
        p.desc = t('rag.param.p' + (i + 1) + '.p');
        return p;
    });
});
