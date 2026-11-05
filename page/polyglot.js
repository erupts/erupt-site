// One Task model, nine languages: the shared source for every page that shows erupt's polyglot nodes.
// Snippets follow each SDK's README in github.com/plinian/erupt-sdk.
app.service('polyglot', function ($sce) {

    var KW = /^(import|from|class|def|return|true|false|True|False|None|null|nil|const|let|var|new|await|type|struct|public|private|final|use|fn|mut|require|extend|end|package|extends|try|in)$/;

    // comments | strings | annotations, decorators, attributes | keywords | numbers
    var TOKEN = /(\/\/.*|#(?!\[).*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`[^`]*`)|(@\w+|#\[\w+|\[[A-Z]\w*(?=[\](]))|\b([A-Za-z_]\w*)\b|\b(\d+)\b/g;

    var CLS = ['comment', 'string', 'annotation', 'keyword', 'number'];

    function highlight(code) {
        var html = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return html.replace(TOKEN, function (m) {
            for (var i = 0; i < CLS.length; i++) {
                var g = arguments[i + 1];
                if (g === undefined) continue;
                if (i === 3 && !KW.test(g)) return m;
                return '<span class="token ' + CLS[i] + '">' + m + '</span>';
            }
            return m;
        });
    }

    var SERVER = '"http://erupt-server:8080"';

    // the JVM node: one @Erupt class, eight hosts — Spring Boot runs the full erupt pipeline, the rest go through -lite
    var SAME = '// Task: the same @Erupt class as on Spring Boot, moved unchanged\n';
    var NEW_NODE = 'new Node("tasks", token, ' + SERVER + ')';
    var REG = '.register(Task.class, new JdbcRepository<>(dataSource, "task"))';
    var frameworks = [{
        name: 'Spring Boot', art: 'erupt-cloud-node-jpa',
        code: '@Erupt(name = "Task Management")\n' +
            '@Table @Entity\n' +
            'public class Task extends BaseModel {\n' +
            '    @EruptField(views = @View(title = "Title"),\n' +
            '                edit = @Edit(title = "Title", search = @Search))\n' +
            '    private String title;\n' +
            '}\n\n' +
            '# application.yml\n' +
            'erupt.cloud-node:\n' +
            '  node-name: tasks\n' +
            '  access-token: ${ERUPT_ACCESS_TOKEN}\n' +
            '  server-addresses: ' + SERVER
    }, {
        name: 'Solon', art: 'erupt-cloud-node-solon',
        code: SAME + '@Configuration\n' +
            'public class EruptNodeConfig {\n' +
            '    @Bean\n' +
            '    public Node node(@Inject("${erupt.cloud-node.access-token}") String token, DataSource dataSource) {\n' +
            '        return ' + NEW_NODE + '\n' +
            '                .factory(Solon.context()::getBean)\n' +
            '                ' + REG + ';\n' +
            '    }\n' +
            '}'
    }, {
        name: 'Quarkus', art: 'erupt-cloud-node-quarkus',
        code: SAME + 'public class EruptNodeConfig {\n' +
            '    @Produces @Singleton\n' +
            '    Node node(@ConfigProperty(name = "erupt.cloud-node.access-token") String token,\n' +
            '              AgroalDataSource dataSource) {\n' +
            '        return ' + NEW_NODE + '\n' +
            '                .factory(type -> Arc.container().instance(type).get())\n' +
            '                ' + REG + ';\n' +
            '    }\n' +
            '}'
    }, {
        name: 'Micronaut', art: 'erupt-cloud-node-micronaut',
        code: SAME + '@Factory\n' +
            'public class EruptNodeConfig {\n' +
            '    @Singleton\n' +
            '    Node node(@Value("${erupt.cloud-node.access-token}") String token,\n' +
            '              DataSource dataSource, BeanContext ctx) {\n' +
            '        return ' + NEW_NODE + '\n' +
            '                .factory(type -> ctx.findBean(type).orElse(null))\n' +
            '                ' + REG + ';\n' +
            '    }\n' +
            '}'
    }, {
        name: 'Vert.x', art: 'erupt-cloud-node-vertx',
        code: SAME + 'Node node = new Node("tasks", System.getenv("ERUPT_ACCESS_TOKEN"), ' + SERVER + ')\n' +
            '        ' + REG + ';\n\n' +
            'EruptNodeVertx.serve(vertx, node, 9090);              // a server of its own\n\n' +
            'EruptNodeVertx.mount(router, node);                   // or on the application\'s router\n' +
            'vertx.createHttpServer().requestHandler(router).listen(8080)\n' +
            '        .onSuccess(s -> node.connect(s.actualPort()));'
    }, {
        name: 'Ktor', art: 'erupt-cloud-node-ktor',
        code: SAME + 'val node = Node("tasks", System.getenv("ERUPT_ACCESS_TOKEN"), ' + SERVER + ')\n' +
            '    .register(Task::class.java, JdbcRepository(dataSource, "task"))\n\n' +
            'embeddedEruptNode(CIO, node, 9090).start(wait = true)   // a server of its own\n\n' +
            'routing {                                              // or on the application\'s routing\n' +
            '    route("/admin") { eruptNode(node) }\n' +
            '}'
    }, {
        name: 'Plain Java', art: 'erupt-cloud-node-lite',
        code: SAME + '// no framework: the JDK\'s own HTTP server, or mounted in any servlet container (-servlet)\n' +
            'new Node("tasks", System.getenv("ERUPT_ACCESS_TOKEN"), ' + SERVER + ')\n' +
            '        ' + REG + '\n' +
            '        .serve("0.0.0.0", 9090);'
    }];

    var langs = [{
        key: 'java', ini: 'J', name: 'Java / Kotlin', bg: '#EEF9DF', file: 'Task.java', req: 'Java 17+',
        install: 'xyz.erupt:erupt-cloud-node-jpa',
        tags: ['Spring Boot', 'Solon', 'Quarkus', 'Micronaut', 'Vert.x', 'Ktor', 'Servlet'],
        frameworks: frameworks,
        code: frameworks[0].code
    }, {
        key: 'python', ini: 'Py', name: 'Python', bg: '#FFF4B8', file: 'task.py', req: 'Python 3.9+',
        install: 'pip install erupt-sdk',
        code: 'from erupt import Field, Node, SqliteRepository, erupt\n\n' +
            '@erupt("Task Management", order_by="id desc")\n' +
            'class Task:\n' +
            '    id: int = Field(pk=True)\n' +
            '    title: str = Field("Title", search=True, not_null=True)\n' +
            '    priority: str = Field("Priority", choices={"high": "High", "low": "Low"})\n' +
            '    due: datetime.date = Field("Due Date", search=True)\n' +
            '    notes: str = Field("Notes", type="TEXTAREA", table=False)\n\n' +
            'node = Node("tasks", os.environ["ERUPT_ACCESS_TOKEN"], ' + SERVER + ')\n' +
            'node.register(Task, SqliteRepository("tasks.db", "task"))\n' +
            'node.serve(port=9090)'
    }, {
        key: 'go', ini: 'Go', name: 'Go', bg: '#E3F6FC', file: 'task.go', req: 'Go 1.21+',
        install: 'go get github.com/erupt-io/erupt-sdk/go',
        code: 'type Task struct {\n' +
            '    ID       int64     `json:"id" erupt:"pk"`\n' +
            '    Title    string    `json:"title" erupt:"title=Title;search;notNull"`\n' +
            '    Priority string    `json:"priority" erupt:"title=Priority;choices=high:High,low:Low"`\n' +
            '    Due      time.Time `json:"due" erupt:"title=Due Date;type=DATE;search"`\n' +
            '    Notes    string    `json:"notes" erupt:"title=Notes;type=TEXTAREA;hideTable"`\n' +
            '}\n\n' +
            'task, _ := erupt.NewModel(Task{}, "Task Management")\n' +
            'node, _ := erupt.NewNode(erupt.Config{Name: "tasks",\n' +
            '    AccessToken: os.Getenv("ERUPT_ACCESS_TOKEN"), Servers: []string{' + SERVER + '}})\n' +
            'node.Register(task, erupt.NewMemoryRepository())\n' +
            'node.ListenAndServe(":9090")'
    }, {
        key: 'ts', ini: 'TS', name: 'TypeScript', bg: '#D6E4FF', file: 'task.ts', req: 'Node.js 22+',
        install: 'npm install erupt-sdk',
        code: 'import { field, model, Node, SqliteRepository } from "erupt-sdk";\n\n' +
            'const Task = model("Task Management", {\n' +
            '  id: field.pk(),\n' +
            '  title: field.input("Title", { search: true, notNull: true }),\n' +
            '  priority: field.choice("Priority", { high: "High", low: "Low" }),\n' +
            '  due: field.date("Due Date", { search: true }),\n' +
            '  notes: field.textarea("Notes", { table: false }),\n' +
            '}, { orderBy: "id desc" });\n\n' +
            'const node = new Node("tasks", process.env.ERUPT_ACCESS_TOKEN!, ' + SERVER + ');\n' +
            'node.register(Task, new SqliteRepository("tasks.db", "task"));\n' +
            'await node.serve(9090);'
    }, {
        key: 'php', ini: 'PHP', name: 'PHP', bg: '#E6E0FF', file: 'Task.php', req: 'PHP 8.1+',
        install: 'composer require erupt-io/erupt-sdk',
        code: '#[Erupt(\'Task Management\', orderBy: \'id desc\')]\n' +
            'final class Task\n' +
            '{\n' +
            '    #[Field(pk: true)] public int $id;\n' +
            '    #[Field(\'Title\', search: true, notNull: true)] public string $title;\n' +
            '    #[Field(\'Priority\', choices: [\'high\' => \'High\', \'low\' => \'Low\'])] public string $priority;\n' +
            '    #[Field(\'Due Date\', type: \'DATE\', search: true)] public string $due;\n' +
            '    #[Field(\'Notes\', type: \'TEXTAREA\', table: false)] public string $notes;\n' +
            '}\n\n' +
            '$node = (new Node(\'tasks\', getenv(\'ERUPT_ACCESS_TOKEN\'), \'http://erupt-server:8080\'))\n' +
            '    ->register(Task::class, new PdoRepository(new PDO(\'sqlite:tasks.db\'), \'task\'));\n' +
            '$node->heartbeat(9090);'
    }, {
        key: 'cs', ini: 'C#', name: '.NET', bg: '#EDE4FF', file: 'Task.cs', req: 'C# / .NET 8+',
        install: 'dotnet add package Erupt.Sdk',
        code: '[EruptModel("Task Management", OrderBy = "id desc")]\n' +
            'class Task\n' +
            '{\n' +
            '    [Pk] public long Id { get; set; }\n' +
            '    [Field("Title", Search = true, NotNull = true)] public string? Title { get; set; }\n' +
            '    [Field("Priority"), Choice("high", "High"), Choice("low", "Low")] public string? Priority { get; set; }\n' +
            '    [Field("Due Date", Search = true)] public DateOnly? Due { get; set; }\n' +
            '    [Field("Notes", Type = EditType.TEXTAREA, Table = false)] public string? Notes { get; set; }\n' +
            '}\n\n' +
            'var node = new EruptNode(new NodeOptions { Name = "tasks",\n' +
            '    AccessToken = Environment.GetEnvironmentVariable("ERUPT_ACCESS_TOKEN")!, Servers = [' + SERVER + '] });\n' +
            'node.Register<Task>(new MemoryRepository());\n' +
            'await node.RunAsync(9090);'
    }, {
        key: 'rust', ini: 'Rs', name: 'Rust', bg: '#FFE0D2', file: 'task.rs', req: 'Rust 1.85+',
        install: 'cargo add erupt-sdk',
        code: 'let task = Model::new("Task", "Task Management")\n' +
            '    .order_by("id desc")\n' +
            '    .field("id", Field::pk())\n' +
            '    .field("title", Field::input("Title").search().not_null())\n' +
            '    .field("priority", Field::choice("Priority", &[("high", "High"), ("low", "Low")]))\n' +
            '    .field("due", Field::date("Due Date").search())\n' +
            '    .field("notes", Field::textarea("Notes").hide_table())\n' +
            '    .build()?;\n\n' +
            'let mut node = Node::new("tasks", &std::env::var("ERUPT_ACCESS_TOKEN")?, [' + SERVER + ']);\n' +
            'node.register(&task, SqlRepository::new(SqliteExecutor::open("tasks.db")?, "task", Dialect::Sqlite))?;\n' +
            'node.serve("0.0.0.0", 9090)?;'
    }, {
        key: 'ruby', ini: 'Rb', name: 'Ruby', bg: '#FDE1EA', file: 'task.rb', req: 'Ruby 3.1+',
        install: 'gem install erupt-sdk',
        code: 'require "erupt"\n\n' +
            'class Task\n' +
            '  extend Erupt::Model\n' +
            '  erupt "Task Management", order_by: "id desc"\n' +
            '  field :id, pk: true\n' +
            '  field :title, "Title", search: true, not_null: true\n' +
            '  field :priority, "Priority", choices: { high: "High", low: "Low" }\n' +
            '  field :due, "Due Date", Date, search: true\n' +
            '  field :notes, "Notes", type: Erupt::EditType::TEXTAREA, table: false\n' +
            'end\n\n' +
            'node = Erupt::Node.new("tasks", ENV.fetch("ERUPT_ACCESS_TOKEN"), ' + SERVER + ')\n' +
            'node.register(Task, Erupt::MemoryRepository.new)\n' +
            'node.serve(port: 9090)'
    }, {
        key: 'swift', ini: 'Sw', name: 'Swift', bg: '#FFE8D6', file: 'Task.swift', req: 'Swift 5.9+',
        install: '.package(url: "github.com/erupt-io/erupt-sdk-swift")',
        code: 'import EruptSDK\n\n' +
            'let task = try Model("Task Management", orderBy: "id desc") {\n' +
            '    Field("id", pk: true)\n' +
            '    Field("title", "Title", search: true, notNull: true)\n' +
            '    Field("priority", "Priority", choices: ["high": "High", "low": "Low"])\n' +
            '    Field("due", "Due Date", .date, search: true)\n' +
            '    Field("notes", "Notes", type: .textarea, table: false)\n' +
            '}\n\n' +
            'let node = try Node(name: "tasks",\n' +
            '    accessToken: ProcessInfo.processInfo.environment["ERUPT_ACCESS_TOKEN"]!,\n' +
            '    servers: [' + SERVER + '])\n' +
            'try node.register(task, MemoryRepository())\n' +
            'try node.serve(port: 9090)'
    }];

    frameworks.concat(langs).forEach(function (x) {
        x.html = $sce.trustAsHtml(highlight(x.code));
    });

    this.langs = langs;
    this.highlight = highlight;
});

// <div class="r g3" pg-grid></div> — the nine language cells, each linking to the SDK page
app.directive('pgGrid', function (polyglot) {
    return {
        scope: true,
        template: '<a class="c clickable pg-cell" href="#!/sdk" ng-repeat="l in langs" ng-class="{\'no-bb\': $index > 5}">' +
            '<div class="pg-head"><span class="pg-ava" ng-style="{background: l.bg}">{{l.ini}}</span>' +
            '<div><div class="pg-name">{{l.name}}</div><div class="pg-req">{{l.req}}</div></div></div>' +
            '<div class="pg-install" title="{{l.install}}">{{l.install}}</div>' +
            '<div class="pg-tags" ng-if="l.tags"><span ng-repeat="t in l.tags">{{t}}</span></div></a>',
        link: function (scope) {
            scope.langs = polyglot.langs;
        }
    };
});
