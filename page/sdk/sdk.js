app.controller("sdk", function ($scope, $sce, i18nService) {

    var t = i18nService.t;

    // §1 hero: the same blog Article model in three languages, from each SDK's README
    var py = '<span class="k">from</span> erupt <span class="k">import</span> Field, Node, SqliteRepository, erupt\n\n' +
        '<span class="a">@erupt</span>(<span class="s">"Article"</span>, order_by=<span class="s">"id desc"</span>)\n' +
        '<span class="k">class</span> Article:\n' +
        '    id: int = Field(pk=<span class="k">True</span>)\n' +
        '    title: str = Field(<span class="s">"Title"</span>, search=<span class="k">True</span>, not_null=<span class="k">True</span>)\n' +
        '    status: str = Field(<span class="s">"Status"</span>, choices={<span class="s">"draft"</span>: <span class="s">"Draft"</span>, <span class="s">"published"</span>: <span class="s">"Published"</span>})\n' +
        '    publish_date: datetime.date = Field(<span class="s">"Publish Date"</span>, search=<span class="k">True</span>)\n' +
        '    body: str = Field(<span class="s">"Body"</span>, type=<span class="s">"TEXTAREA"</span>, table=<span class="k">False</span>)\n\n' +
        'node = Node(<span class="s">"blog"</span>, os.environ[<span class="s">"ERUPT_ACCESS_TOKEN"</span>], <span class="s">"http://erupt-server:8080"</span>)\n' +
        'node.register(Article, SqliteRepository(<span class="s">"blog.db"</span>, <span class="s">"article"</span>))\n' +
        'node.serve(port=<span class="s">9090</span>)   <span class="c"># ' + t('sdk.code.c.serve') + '</span>';

    var go = '<span class="k">type</span> Article <span class="k">struct</span> {\n' +
        '    ID          int64     <span class="s">`json:"id" erupt:"pk"`</span>\n' +
        '    Title       string    <span class="s">`json:"title" erupt:"title=Title;search;notNull;sortable"`</span>\n' +
        '    Status      string    <span class="s">`json:"status" erupt:"title=Status;choices=draft:Draft,published:Published"`</span>\n' +
        '    PublishDate time.Time <span class="s">`json:"publish_date" erupt:"title=Publish Date;type=DATE;search"`</span>\n' +
        '    Body        string    <span class="s">`json:"body" erupt:"title=Body;type=TEXTAREA;hideTable"`</span>\n' +
        '}\n\n' +
        'article, _ := erupt.NewModel(Article{}, <span class="s">"Article"</span>, erupt.WithOrderBy(<span class="s">"id desc"</span>))\n' +
        'node, _ := erupt.NewNode(erupt.Config{Name: <span class="s">"blog"</span>,\n' +
        '    AccessToken: os.Getenv(<span class="s">"ERUPT_ACCESS_TOKEN"</span>), Servers: []string{<span class="s">"http://erupt-server:8080"</span>}})\n' +
        'node.Register(article, erupt.NewMemoryRepository())\n' +
        'node.ListenAndServe(<span class="s">":9090"</span>)   <span class="c">// ' + t('sdk.code.c.serve') + '</span>';

    var ts = '<span class="k">import</span> { field, model, Node, SqliteRepository } <span class="k">from</span> <span class="s">"erupt-sdk"</span>;\n\n' +
        '<span class="k">const</span> Article = model(<span class="s">"Article"</span>, {\n' +
        '  id: field.pk(),\n' +
        '  title: field.input(<span class="s">"Title"</span>, { search: <span class="k">true</span>, notNull: <span class="k">true</span>, sortable: <span class="k">true</span> }),\n' +
        '  status: field.choice(<span class="s">"Status"</span>, { draft: <span class="s">"Draft"</span>, published: <span class="s">"Published"</span> }),\n' +
        '  publish_date: field.date(<span class="s">"Publish Date"</span>, { search: <span class="k">true</span> }),\n' +
        '  body: field.textarea(<span class="s">"Body"</span>, { table: <span class="k">false</span> }),\n' +
        '}, { orderBy: <span class="s">"id desc"</span> });\n\n' +
        '<span class="k">const</span> node = <span class="k">new</span> Node(<span class="s">"blog"</span>, process.env.ERUPT_ACCESS_TOKEN!, <span class="s">"http://erupt-server:8080"</span>);\n' +
        'node.register(Article, <span class="k">new</span> SqliteRepository(<span class="s">"blog.db"</span>, <span class="s">"article"</span>));\n' +
        '<span class="k">await</span> node.serve(<span class="s">9090</span>);   <span class="c">// ' + t('sdk.code.c.serve') + '</span>';

    $scope.samples = [
        {name: 'Python', code: $sce.trustAsHtml(py)},
        {name: 'Go', code: $sce.trustAsHtml(go)},
        {name: 'TypeScript', code: $sce.trustAsHtml(ts)}
    ];
    $scope.sample = $scope.samples[0];

    // §3 languages, from the erupt-sdk README table
    $scope.langs = [
        {ini: 'Py', bg: '#FFF4B8', name: 'Python', req: 'Python 3.9+', reg: 'PyPI', pkg: 'erupt-sdk', zero: true},
        {ini: 'Go', bg: '#E3F6FC', name: 'Go', req: 'Go 1.21+', reg: 'go get', pkg: 'github.com/erupt-io/erupt-sdk/go', zero: true, note: 'stdlib only'},
        {ini: 'TS', bg: '#D6E4FF', name: 'TypeScript', req: 'Node.js 22+', reg: 'npm', pkg: 'erupt-sdk', zero: true},
        {ini: 'PHP', bg: '#E6E0FF', name: 'PHP', req: 'PHP 8.1+', reg: 'Packagist', pkg: 'erupt-io/erupt-sdk', zero: true},
        {ini: 'C#', bg: '#EDE4FF', name: '.NET', req: 'C# / .NET 8+', reg: 'NuGet', pkg: 'Erupt.Sdk', zero: true},
        {ini: 'Rs', bg: '#FFE0D2', name: 'Rust', req: 'Rust 1.85+', reg: 'crates.io', pkg: 'erupt-sdk', zero: false, deps: 'serde · serde_json · ctrlc', note: t('sdk.lang.rust.note')},
        {ini: 'Rb', bg: '#FDE1EA', name: 'Ruby', req: 'Ruby 3.1+', reg: 'RubyGems', pkg: 'erupt-sdk', zero: true, note: 'Rack compatible'},
        {ini: 'Sw', bg: '#FFE8D6', name: 'Swift', req: 'Swift 5.9+ · macOS 13+ / Linux', reg: 'SwiftPM', pkg: 'EruptSDK', zero: false, deps: 'Foundation only', note: t('sdk.lang.swift.note')},
        {ini: 'JVM', bg: '#EEF9DF', name: 'Java / Kotlin', req: 'Java 17+', reg: 'Maven', pkg: 'xyz.erupt:erupt-cloud-node · -lite', zero: false, deps: 'Spring Boot / Solon / Quarkus / Micronaut / Vert.x / Ktor', note: t('sdk.lang.jvm.note')}
    ];

    // §4 what the server does for every node
    $scope.serverDoes = ['login', 'menu', 'power', 'validate', 'excel', 'file', 'render', 'origin'].map(function (k) {
        return t('sdk.proto.srv.' + k);
    });

    // §4 Level 0 endpoints, PROTOCOL.md §5.1
    $scope.endpoints = [
        {m: 'GET', p: '/erupt-api/build/{erupt}', d: t('sdk.proto.ep.build')},
        {m: 'POST', p: '/erupt-api/data/table/{erupt}', d: t('sdk.proto.ep.table')},
        {m: 'GET', p: '/erupt-api/data/{erupt}/{id}', d: t('sdk.proto.ep.detail')},
        {m: 'GET', p: '/erupt-api/data/init-value/{erupt}', d: t('sdk.proto.ep.init')},
        {m: 'POST', p: '/erupt-api/data/modify/{erupt}', d: t('sdk.proto.ep.add')},
        {m: 'POST', p: '/erupt-api/data/modify/{erupt}/update', d: t('sdk.proto.ep.update')},
        {m: 'POST', p: '/erupt-api/data/modify/{erupt}/delete', d: t('sdk.proto.ep.delete')}
    ];

    // §5 what every SDK serves
    $scope.features = [
        {icon: '▦', tag: 'CRUD', code: 'search · sort · paging'},
        {icon: '⇄', tag: 'Refs', code: 'ref=Category · tree=parent'},
        {icon: '▶', tag: 'Ops', code: '@operation("Publish", form=PublishForm)'},
        {icon: '🪝', tag: 'DataProxy', code: 'before_fetch · validate · after_add'},
        {icon: '🪪', tag: 'Power', code: 'power={"delete": False}'},
        {icon: '✓', tag: 'Schema', code: 'erupt-annotations.schema.json'}
    ].map(function (f, i) {
        f.title = t('sdk.feat.f' + (i + 1) + '.t');
        f.desc = t('sdk.feat.f' + (i + 1) + '.p');
        return f;
    });

    // §6 keeping in step with erupt
    $scope.sync = [
        {icon: '☕', code: 'mvn -pl erupt-test -Pnode-schema test'},
        {icon: '🔁', code: 'sync-schema · weekly'},
        {icon: '🧪', code: 'conformance/run.py'},
        {icon: '🗄', code: 'databases · PostgreSQL + MySQL'}
    ].map(function (s, i) {
        s.title = t('sdk.sync.s' + (i + 1) + '.t');
        s.desc = t('sdk.sync.s' + (i + 1) + '.p');
        return s;
    });
});
