// 国际化服务
var i18n = {
    // 当前语言
    currentLang: 'zh-CN',

    // 翻译数据 - 数组格式：[中文, 英文]
    translations: {
        // 导航菜单
        'nav.home': ['首页', 'Home'],
        'nav.flow': ['工作流', 'Workflow'],
        'nav.component': ['组件支持', 'Components'],
        'nav.contrast': ['代码示例', 'Code Examples'],
        'nav.module': ['扩展模块', 'Extensions'],
        'nav.donate': ['捐赠指南', 'Donate'],
        'nav.doc': ['使用文档', 'Documentation'],
        'nav.demo': ['演示DEMO', 'Demo'],
        'nav.cloud': ['Erupt Cloud', 'Erupt Cloud'],

        // Erupt Cloud 专题页
        'cloud.hero.kicker': ['DISTRIBUTED CONFIG', 'DISTRIBUTED CONFIG'],
        'cloud.hero.title': ['Erupt Cloud', 'Erupt Cloud'],
        'cloud.hero.sub': ['面向微服务与集群的「多维表」云配置能力：集中管理、轻量依赖，让集群内每个服务都能以注解方式获得一致的数据可视化管理体验。', 'Cloud-native multidimensional table configuration for clusters: centralized management, light dependencies, and consistent annotation-driven admin across services.'],
        'cloud.badge.config': ['多维配置中心', 'Multi-dim config'],
        'cloud.badge.cluster': ['集群 / 多节点', 'Cluster & nodes'],
        'cloud.badge.light': ['轻依赖', 'Lightweight'],
        'cloud.badge.visual': ['服务可视化', 'Service visibility'],
        'cloud.cta.doc': ['阅读语雀文档', 'Read docs on Yuque'],
        'cloud.cta.github': ['GitHub 源码', 'GitHub'],
        'cloud.diagram.console': ['多维管理台', 'Admin plane'],
        'cloud.features.title': ['核心能力', 'Capabilities'],
        'cloud.features.desc': ['与开源 Erupt 注解体系一脉相承，把「对象视图模型」延伸到分布式场景：配置上行、能力下行，开发与运维协作更顺滑。', 'Built on the same annotation model as open-source Erupt, extending OVM to distributed setups—smoother dev and ops handoff.'],
        'cloud.features.f1.title': ['分布式多维配置', 'Distributed multidimensional config'],
        'cloud.features.f1.desc': ['在云端统一维护多维表、节点与策略，各服务实例按需同步，降低分散配置带来的不一致风险。', 'Centralize multidimensional schemas and policies; instances sync on demand, reducing configuration drift.'],
        'cloud.features.f2.title': ['轻依赖、可演进', 'Lightweight & evolvable'],
        'cloud.features.f2.desc': ['以最小侵入方式接入现有 Spring Boot / 微服务体系，版本与主工程对齐，便于持续升级。', 'Minimal intrusion into Spring Boot and microservices; align versions with the main Erupt stack for easier upgrades.'],
        'cloud.features.f3.title': ['Node 与拓扑', 'Nodes & topology'],
        'cloud.features.f3.desc': ['通过 Node 配置将集群内服务纳入同一视图，配合控制台理解调用与数据面关系。', 'Register services via node configuration and understand topology and data relationships in one console.'],
        'cloud.features.f4.title': ['集群内数据可视化', 'In-cluster data UI'],
        'cloud.features.f4.desc': ['让集群中的业务服务也能挂载 Erupt 管理界面，无需为每个子系统重复搭建后台脚手架。', 'Expose Erupt admin UIs on business services without rebuilding admin scaffolding per subsystem.'],
        'cloud.docs.title': ['官方文档（语雀）', 'Official docs (Yuque)'],
        'cloud.docs.desc': ['以下为 Erupt Cloud 相关章节入口，细节与排错请以语雀正文为准。', 'Entry points to Cloud chapters; follow Yuque for full steps and troubleshooting.'],
        'cloud.docs.d1.title': ['概述与多维配置', 'Overview & multidimensional config'],
        'cloud.docs.d1.desc': ['Erupt Cloud 定位、能力与整体架构说明。', 'Positioning, capabilities, and architecture.'],
        'cloud.docs.d2.title': ['集成与依赖', 'Integration & dependencies'],
        'cloud.docs.d2.desc': ['工程引入、依赖管理与基础配置要点。', 'How to add dependencies and baseline configuration.'],
        'cloud.docs.d3.title': ['开发与使用', 'Development & usage'],
        'cloud.docs.d3.desc': ['日常开发、注解与常见使用场景说明。', 'Day-to-day development, annotations, and common scenarios.'],
        'cloud.docs.d4.title': ['Node 与服务可视化', 'Nodes & service visualization'],
        'cloud.docs.d4.desc': ['配置 Node 节点，在集群拓扑中可视化并管理任意服务。', 'Configure nodes to visualize and manage services across the cluster.'],
        'cloud.docs.read': ['打开文档', 'Open'],
        'cloud.maven.title': ['Maven 依赖示例', 'Maven dependency'],
        'cloud.maven.hint': ['版本号请与主工程 xyz.erupt:erupt 保持一致；服务端/客户端模块以语雀文档为准。', 'Use the same version as xyz.erupt:erupt; see Yuque for server vs client modules.'],
        'cloud.maven.serverHint': ['若需独立 Cloud 服务端能力，语雀中可能另有 erupt-cloud-server 等模块，请按文档组合引入。', 'Yuque may list additional artifacts such as erupt-cloud-server; combine as documented.'],

        'cloud.scenarios.title': ['典型场景', 'Typical scenarios'],
        'cloud.scenarios.desc': ['以下场景特别适合引入 Erupt Cloud，把「后台能力」当成集群内可编排的基础设施。', 'These scenarios fit Erupt Cloud well—treat admin UIs as cluster-wide, orchestratable infrastructure.'],
        'cloud.scenarios.s1.title': ['多环境 / 多租户配置统一', 'Unified config across envs / tenants'],
        'cloud.scenarios.s1.desc': ['开发、预发、生产多套集群中，希望同一套多维表定义与权限策略可集中修订、分级下发。', 'Revise multidimensional definitions and policies once, roll out per environment with less drift.'],
        'cloud.scenarios.s2.title': ['微服务各自为政的后台', 'Per-service admin sprawl'],
        'cloud.scenarios.s2.desc': ['订单、库存、结算等多个 Spring Boot 服务都需要运营后台，希望沿用 Erupt 注解而非重复造轮子。', 'Many services need ops consoles—reuse Erupt annotations instead of one-off admin stacks.'],
        'cloud.scenarios.s3.title': ['运维可观测与治理', 'Ops visibility & governance'],
        'cloud.scenarios.s3.desc': ['需要看清节点注册、服务健康与数据面关系，在统一拓扑里跳转排查。', 'See registrations, health, and data paths in one topology for faster triage.'],
        'cloud.scenarios.s4.title': ['平滑升级与演进', 'Rolling upgrades'],
        'cloud.scenarios.s4.desc': ['业务迭代频繁时，希望依赖轻、升级路径清晰，与主 Erupt 版本同步演进。', 'Light deps and clear upgrade path aligned with the core Erupt release train.'],

        'cloud.arch.title': ['能力如何串起来', 'How pieces connect'],
        'cloud.arch.desc': ['从「建模」到「集群可见」的一条逻辑路径（具体组件名以语雀与版本为准）。', 'A logical path from modeling to cluster visibility (names may vary by version—see Yuque).'],
        'cloud.arch.step1.title': ['注解建模', 'Annotate models'],
        'cloud.arch.step1.desc': ['在业务服务中仍用 @Erupt / @EruptField 等描述多维表与界面。', 'Describe tables and UI with @Erupt / @EruptField as usual.'],
        'cloud.arch.step2.title': ['接入 Cloud', 'Wire Cloud'],
        'cloud.arch.step2.desc': ['引入 erupt-cloud 等依赖，按文档完成注册中心、路由或网关侧配置。', 'Add erupt-cloud and follow docs for registry, routing, or gateway settings.'],
        'cloud.arch.step3.title': ['登记 Node', 'Register nodes'],
        'cloud.arch.step3.desc': ['为集群内服务实例配置 Node，使控制台能发现路由与元数据。', 'Configure nodes so the console discovers routes and metadata.'],
        'cloud.arch.step4.title': ['统一控制台', 'Unified console'],
        'cloud.arch.step4.desc': ['在管理台浏览、检索并操作各服务暴露的 Erupt 页面与数据。', 'Browse and operate Erupt UIs exposed by each service from one place.'],

        'cloud.concepts.title': ['核心概念与开发方式', 'Concepts & development'],
        'cloud.concepts.desc': ['Cloud 不改变「注解驱动」的心智模型，只是把配置面与运行面扩展到分布式环境。', 'Cloud keeps the annotation-first model while extending config and runtime to distributed setups.'],
        'cloud.concepts.b1': ['多维表（OVM）仍是中心：字段、视图、权限仍在模型上声明。', 'Multidimensional tables (OVM) stay central: fields, views, permissions on the model.'],
        'cloud.concepts.b2': ['配置中心负责「哪些表在哪些节点可用、如何同步」，减少硬编码环境地址。', 'The config plane governs which tables run where and how they sync—fewer hard-coded endpoints.'],
        'cloud.concepts.b3': ['Node 将运行中的服务实例映射到拓扑，便于可视化与跳转。', 'Nodes map running instances into the topology for visualization and deep links.'],
        'cloud.concepts.b4': ['与单节点 Erupt 相同的安全与审计思路，在集群场景下更强调边界与令牌传递。', 'Same security mindset as single-node Erupt; clusters add emphasis on boundaries and token propagation.'],
        'cloud.concepts.b5': ['详细注解清单、Starter 与排错请始终以语雀对应章节为准。', 'For annotation lists, starters, and troubleshooting, always follow the matching Yuque chapter.'],
        'cloud.concepts.codeCaption': ['业务侧模型示例（字段省略）', 'Sample model (fields omitted)'],

        'cloud.compare.title': ['单节点 vs Cloud 模式', 'Single-node vs Cloud'],
        'cloud.compare.desc': ['帮助判断你是否需要引入 Cloud（以下为能力向对比，非性能测试结论）。', 'A capability-oriented comparison—not a performance benchmark.'],
        'cloud.compare.th.dim': ['维度', 'Aspect'],
        'cloud.compare.th.single': ['单节点 Erupt', 'Single-node Erupt'],
        'cloud.compare.th.cloud': ['Erupt Cloud', 'Erupt Cloud'],
        'cloud.compare.r1.dim': ['配置存储', 'Config storage'],
        'cloud.compare.r1.single': ['随应用部署，偏本地化', 'Local to the deployment'],
        'cloud.compare.r1.cloud': ['集中式多维配置与策略', 'Centralized multidimensional config'],
        'cloud.compare.r2.dim': ['适用拓扑', 'Topology'],
        'cloud.compare.r2.single': ['单体或单集群单入口', 'Monolith or single entry'],
        'cloud.compare.r2.cloud': ['多节点、多服务协同', 'Multi-node, multi-service'],
        'cloud.compare.r3.dim': ['运维视图', 'Ops view'],
        'cloud.compare.r3.single': ['实例级监控为主', 'Instance-centric'],
        'cloud.compare.r3.cloud': ['拓扑 + 服务级跳转', 'Topology & cross-service'],
        'cloud.compare.r4.dim': ['引入成本', 'Adoption cost'],
        'cloud.compare.r4.single': ['仅 erupt 核心依赖', 'Core erupt only'],
        'cloud.compare.r4.cloud': ['额外 cloud 模块与集群约定', 'Cloud modules + cluster conventions'],

        'cloud.faq.title': ['常见问题', 'FAQ'],
        'cloud.faq.desc': ['以下为站内导读式解答，参数与排错请以语雀为准。', 'Introductory answers; defer to Yuque for parameters and fixes.'],
        'cloud.faq.q1': ['已有单体 Erupt 项目，迁移到 Cloud 工作量大吗？', 'How heavy is migrating an existing monolith?'],
        'cloud.faq.a1': ['通常先保持业务注解不变，再按文档分批引入 cloud 依赖、注册与 Node 配置；可渐进切换。', 'Keep annotations first; introduce cloud deps, registry, and nodes in phases per Yuque.'],
        'cloud.faq.q2': ['和 Spring Cloud / K8s 的关系？', 'How does it relate to Spring Cloud / Kubernetes?'],
        'cloud.faq.a2': ['Erupt Cloud 关注「管理端与多维配置」在集群中的落地，可与现有注册发现、网关、编排方式配合，细节见语雀集成篇。', 'It focuses on admin and multidimensional config in clusters; pairs with your existing stack—see integration docs.'],
        'cloud.faq.q3': ['必须部署独立控制台吗？', 'Do I need a standalone console?'],
        'cloud.faq.a3': ['取决于版本与架构选型：有的方案由中心控制台聚合，有的能力下沉到各服务；请对照 ggbcv9 / cthlzp 章节。', 'Depends on version and architecture; compare the overview and integration chapters.'],
        'cloud.faq.q4': ['本地如何联调？', 'How to debug locally?'],
        'cloud.faq.a4': ['一般可本地起多个 Spring Boot 实例模拟多节点，配合文档中的注册与路由示例；具体端口与 profile 以语雀为准。', 'Run multiple local Spring Boot instances to simulate nodes; follow Yuque for ports and profiles.'],

        'cloud.demo.title': ['在线体验', 'Try the demo'],
        'cloud.demo.desc': ['官方演示环境已集成 Erupt 能力，可在实际界面中感受注解生成的管理端。', 'The official demo showcases annotation-driven admin UIs—try it live.'],
        'cloud.demo.btn': ['打开演示 DEMO', 'Open demo'],

        // 首页
        'home.title': ['Erupt Engine', 'Erupt Engine'],
        'home.subtitle': ['注解·低代码', 'Annotation·Low Code'],
        'home.subtitle2': ['对象视图模型', 'Object View Model'],
        'home.btn.code': ['代码示例', 'Codes'],
        'home.btn.doc': ['使用文档', 'Docs'],
        'home.btn.demo': ['演示DEMO', 'Demo'],
        'home.code.title': ['仅需一个<span style="color: #ffc107;"> .class </span>文件', 'Only one<span style="color: #ffc107;"> .class </span>file'],
        'home.code.tip1.title': ['零前端代码', 'Zero Front-end'],
        'home.code.tip1.desc': ['不需要懂前端，开发专业且强大的管理后台', 'No HTML/JS required, full admin in minutes'],
        'home.code.tip2.title': ['易于上手', 'Easy Start'],
        'home.code.tip2.desc': ['仅需了解 Spring Boot 基础知识即可上手开发', 'Spring Boot basics only'],
        'home.code.tip3.title': ['安全可靠', 'Secure'],
        'home.code.tip3.desc': ['细颗粒全方位安全检查，持续保证数据安全', 'Fine-grained, always safe'],
        'home.code.tip4.title': ['通用数据管理', 'Any DB'],
        'home.code.tip4.desc': ['支持市面上所有主流数据库，支持自定义数据源', 'MySQL, PG, Oracle, custom sources'],
        'home.code.tip5.title': ['表结构自动生成', 'Auto Table'],
        'home.code.tip5.desc': ['无需手动建表，不懂SQL也能操作数据库', 'No SQL, no DDL, auto-created'],
        'home.code.more': ['更多示例 →', 'More Examples →'],
        'home.code.comment': ['极简开发，开箱即用 🚀', 'Minimal dev, ready to use 🚀'],
        'home.using.title': ['谁在使用？', 'Who is using?'],
        'home.license': ['使用', 'Using'],
        'home.license.link': ['Apache License 2.0', 'Apache License 2.0'],
        'home.license.desc': ['协议，源代码完全开源，无商业限制，开源不易感谢 Star 👇', 'license, completely open source, no commercial restrictions, open source is not easy, thank you for Star 👇'],
        'home.features.title': ['特性一览', 'Features'],
        'home.features.fast.name': ['敏捷开发', 'Agile Development'],
        'home.features.fast.desc': ['仅单个.java文件即可实现后台管理功能，专注业务与核心功能的研发', 'Only a single .java file to implement admin functions, focus on business and core functionality'],
        'home.features.security.name': ['数据安全', 'Data Security'],
        'home.features.security.desc': ['可靠的安全机制，细颗粒度权限控制，阻绝一切不可靠的数据，为您的数据安全保驾护航', 'Reliable security mechanism, fine-grained permission control, blocking all unreliable data'],
        'home.features.responsive.name': ['响应式布局', 'Responsive Layout'],
        'home.features.responsive.desc': ['支持PC端手机端等各种规格的设备中使用', 'Supports PC, mobile and various device specifications'],
        'home.features.low.name': ['低侵入性', 'Low Intrusiveness'],
        'home.features.low.desc': ['几乎所有功能都围绕注解而展开，不影响你使用任何第三方库', 'Almost all features revolve around annotations, does not affect any third-party libraries'],
        'home.features.beautiful.name': ['界面美观', 'Beautiful Interface'],
        'home.features.beautiful.desc': ['每个交互都精心设计，产品思维打磨，只为了更好的操作体验', 'Every interaction is carefully designed, product thinking polished, for better user experience'],
        'home.features.db.name': ['通用数据管理', 'Universal Data Management'],
        'home.features.db.desc': ['支持市面上所有主流数据库，支持MongoDB，支持自定义数据源', 'Supports all mainstream databases, supports MongoDB, supports custom data sources'],
        'home.features.extend.name': ['服务层逻辑扩展', 'Service Layer Extension'],
        'home.features.extend.desc': ['支持 CURD 前后置扩展、自定义按钮、自定义LDAP登录', 'Supports CURD pre/post extension, custom buttons, custom LDAP login'],
        'home.features.attachment.name': ['自定义附件上传', 'Custom Attachment Upload'],
        'home.features.attachment.desc': ['仅需简单的适配代码，可以让 erupt 支持 fastDFS、七牛云、OSS 等存储方式', 'Simple adapter code to support fastDFS, Qiniu Cloud, OSS and other storage methods'],
        'home.features.template.name': ['自定义模板', 'Custom Template'],
        'home.features.template.desc': ['自定义页面按钮模板，支持多种渲染方式 Freemarker/Thymeleaf/Vue/Velocity', 'Custom page button templates, supports multiple rendering methods Freemarker/Thymeleaf/Vue/Velocity'],
        'home.vs.title': ['代码生成器', 'Code Generator'],
        'home.vs.vs': ['VS', 'VS'],
        'home.vs.erupt': ['Erupt', 'Erupt'],
        'home.vs.files.left': ['前端 + 后端 7 ~ 10 个文件', '7~10 files'],
        'home.vs.files.right': ['仅需一个类文件', '1 file'],
        'home.vs.files.title': ['文件数量', 'Files'],
        'home.vs.modify.left': ['重新生成代码或修改已生成代码 → 100~500行代码', 'Regenerate/modify code → 100~500 lines'],
        'home.vs.modify.right': ['添加或修改注解 → 2~10行', 'Modify annotations → 2~10 lines'],
        'home.vs.modify.title': ['修改字段', 'Edit'],
        'home.vs.table.left': ['需要手动执行建表 SQL', 'Manual SQL'],
        'home.vs.table.right': ['自动建表+字段注释', 'Auto table + comments'],
        'home.vs.table.title': ['建表语句', 'Tables'],
        'home.vs.deploy.left': ['下载整个工程，代码量极大', 'Download full project'],
        'home.vs.deploy.right': ['通过Maven管理依赖，基础数据自动生成', 'Maven deps, auto data'],
        'home.vs.deploy.title': ['初次部署', 'Deployment'],
        'home.vs.upgrade.left': ['升级成本极高，需要对比大量差异', 'High cost, compare diffs'],
        'home.vs.upgrade.right': ['调整版本号即可', 'Adjust version'],
        'home.vs.upgrade.title': ['版本升级', 'Upgrade'],
        'home.vs.frontend.left': ['需要熟悉代码生成器所提供的前端 API，有一定学习成本', 'Learn generator API'],
        'home.vs.frontend.right': ['零前端代码', 'Zero frontend'],
        'home.vs.frontend.title': ['前端代码', 'Frontend'],
        'home.vs.dev.left': ['传统分层调用的方式开发', 'Layered approach'],
        'home.vs.dev.right': ['全注解式开发', 'Annotation-based'],
        'home.vs.dev.title': ['开发方式', 'Development'],
        'home.vs.component.left': ['仅支持基本的数据组件复杂的组件需自定义', 'Basic components only'],
        'home.vs.component.right': ['支持23类表单组件，且支持一对多，多对多等复杂关系组件', '23 form types, 1-to-many, many-to-many'],
        'home.vs.component.title': ['组件支持', 'Components'],
        'home.vs.database.left': ['一般只支持 MySQL，改造成本较高', 'MySQL only, high cost'],
        'home.vs.database.right': ['支持 MySQL、Oracle、PostgreSQL、H2 等所有主流数据库', 'All mainstream DBs'],
        'home.vs.database.title': ['数据库', 'Database'],
        'home.vs.time.left': ['需要生成大量代码复制到项目中，功能越多维护成本越高', 'Generate & copy code, high maintenance'],
        'home.vs.time.right': ['仅需一个后端工程师，短时间就可以完成高质量后台管理系统', '1 engineer, fast delivery'],
        'home.vs.time.title': ['开发时间', 'Time'],
        'home.vs.logic.left': ['Java 代码', 'Java code'],
        'home.vs.logic.right': ['按需 <a href="https://www.yuque.com/erupts/erupt/nicqg3" style="color: #ffc107">@DataProxy</a> 实现', 'On-demand <a href="https://www.yuque.com/erupts/erupt/nicqg3" style="color: #ffc107">@DataProxy</a>'],
        'home.vs.logic.title': ['逻辑扩展', 'Logic'],
        'home.vs.startup.left': ['表数量越多启动越慢', 'Slower with more tables'],
        'home.vs.startup.right': ['百张表映射毫秒级初始化', '100+ tables, ms init'],
        'home.vs.startup.title': ['启动速度', 'Startup'],
        'home.sponsor.title': ['贡献者 & 赞助商', 'Contributors & Sponsors'],
        'home.sponsor.author': ['Erupt 作者 & 发起人', 'Erupt Author & Founder'],
        'home.sponsor.ide': ['宇宙最好用的IDE', 'The Best IDE in the Universe'],
        'home.sponsor.thanks': ['感谢陪伴', 'Thanks for Company'],
        'home.db.title': ['数据源支持', 'Data Source Support'],
        'home.btn.component': ['组件支持', 'Components'],
        'home.btn.module': ['扩展模块', 'Extensions'],
        'home.btn.cloud': ['<span style="color: #ffc107">☁️ Erupt Cloud</span> 多维表云配置中心', '<span style="color: #ffc107">☁️ Erupt Cloud</span> Cloud Table Config Center'],
        'home.btn.linq': ['<span style="color: #ffc107">⚡ Linq.J</span>用 SQL 语句操作 Java 对象', '<span style="color: #ffc107">⚡ Linq.J</span> Operate Java Objects with SQL'],
        'ideamake': ['思为科技', 'Ideamake'],
        // Footer
        'footer.qq': ['QQ 交流群', 'QQ Group'],
        'footer.email': ['邮箱地址', 'Email'],
        'footer.doc': ['使用文档', 'Documentation'],
        'footer.github': ['GitHub', 'GitHub'],
        'footer.gitee': ['Gitee', 'Gitee'],
        'footer.gitcode': ['GitCode', 'GitCode'],
        'footer.copyright': ['Copyright © 2019-{{year}} erupt.xyz All rights reserved.', 'Copyright © 2019-{{year}} erupt.xyz All rights reserved.'],

        // 组件页面
        'component.form.title': ['表单组件（{{count}}类）', 'Form Components ({{count}} types)'],
        'component.view.title': ['数据组件（{{count}}类）', 'Data Components ({{count}} types)'],
        'component.input': ['文本输入框', 'Text Input'],
        'component.textarea': ['多行文本输入框', 'Textarea'],
        'component.number': ['数值输入框', 'Number Input'],
        'component.slider': ['滑动输入条', 'Slider'],
        'component.date': ['时间选择器', 'Date Picker'],
        'component.boolean': ['布尔开关', 'Boolean Switch'],
        'component.choice': ['单选选择器', 'Single Select'],
        'component.tags': ['标签选择器', 'Tags Selector'],
        'component.attachment': ['附件上传', 'Attachment Upload'],
        'component.autocomplete': ['自动完成', 'Auto Complete'],
        'component.referenceTree': ['树选择器', 'Tree Selector'],
        'component.referenceTable': ['表格选择器', 'Table Selector'],
        'component.checkbox': ['多选框', 'Checkbox'],
        'component.tabTree': ['一对多树选择器', 'One-to-Many Tree'],
        'component.tabTableRefer': ['一对多表格选择器', 'One-to-Many Table'],
        'component.tabTableAdd': ['一对多增加', 'One-to-Many Add'],
        'component.htmlEditor': ['富文本编辑器', 'Rich Text Editor'],
        'component.codeEditor': ['代码编辑器', 'Code Editor'],
        'component.tpl': ['自定义HTML模板', 'Custom HTML Template'],
        'component.map': ['地图', 'Map'],
        'component.divide': ['分割线', 'Divider'],
        'component.signature': ['数字签名', 'Digital Signature'],
        'component.hidden': ['隐藏', 'Hidden'],
        'component.empty': ['空白', 'Empty'],
        'component.view.text': ['文本', 'Text'],
        'component.view.number': ['数值', 'Number'],
        'component.view.date': ['时间', 'Date'],
        'component.view.image': ['图片', 'Image'],
        'component.view.html': ['HTML', 'HTML'],
        'component.view.mobileHtml': ['Mobile HTML', 'Mobile HTML'],
        'component.view.link': ['链接', 'Link'],
        'component.view.linkDialog': ['对话框方式打开链接', 'Link Dialog'],
        'component.view.download': ['下载附件', 'Download Attachment'],
        'component.view.attachment': ['打开附件', 'Open Attachment'],
        'component.view.ovr': ['One to many', 'One to many'],
        'component.view.attachmentDialog': ['对话框中展示附件', 'Attachment Dialog'],
        'component.view.qrCode': ['QRCODE', 'QRCODE'],
        'component.view.swf': ['SWF', 'SWF'],
        'component.view.code': ['CODE', 'CODE'],
        'component.view.map': ['MAP', 'MAP'],
        'component.view.base64': ['BASE64', 'BASE64'],
        'component.view.markdown': ['MARKDOWN', 'MARKDOWN'],

        // 对比页面
        'contrast.java': ['Java代码', 'Java Code'],
        'contrast.effect': ['运行效果', 'Running Effect'],

        // 数据库名称
        'db.mysql': ['MySQL', 'MySQL'],
        'db.oracle': ['Oracle', 'Oracle'],
        'db.sqlserver': ['SQL Server', 'SQL Server'],
        'db.postgresql': ['PostgreSQL', 'PostgreSQL'],
        'db.h2': ['H2', 'H2'],
        'db.polardb': ['PolarDB', 'PolarDB'],
        'db.dm': ['达梦', 'DM'],
        'db.kingbase': ['人大金仓', 'Kingbase'],
        'db.api': ['API 数据源', 'API Data Source'],
        'db.spanner': ['Google Spanner', 'Google Spanner'],
        'db.mongodb': ['MongoDB', 'MongoDB'],
        'db.custom': ['自定义数据源', 'Custom Data Source'],

        // 语言切换
        'lang.zh': ['中文', '中文'],
        'lang.en': ['English', 'English'],
    },

    // 初始化
    init: function () {
        // 从 localStorage 读取保存的语言设置
        var savedLang = localStorage.getItem('erupt-lang');
        if (savedLang && (savedLang === 'zh-CN' || savedLang === 'en-US')) {
            this.currentLang = savedLang;
        } else {
            // 检测浏览器语言
            var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
            
            // 匹配中文：zh, zh-CN, zh-TW, zh-HK 等
            if (browserLang.startsWith('zh')) {
                this.currentLang = 'zh-CN';
            }
            // 匹配英文：en, en-US, en-GB 等
            else if (browserLang.startsWith('en')) {
                this.currentLang = 'en-US';
            }
            // 其他语言默认使用英文
            else {
                this.currentLang = 'en-US';
            }
        }
    },

    // 获取翻译
    t: function (key, params) {
        var translationArray = this.translations[key];
        if (!translationArray || !Array.isArray(translationArray)) {
            return key;
        }

        // 根据当前语言选择数组中的对应元素：zh-CN 选择索引0，en-US 选择索引1
        var langIndex = this.currentLang === 'zh-CN' ? 0 : 1;
        var translation = translationArray[langIndex] || translationArray[0] || key;

        if (params) {
            for (var param in params) {
                translation = translation.replace('{{' + param + '}}', params[param]);
            }
        }
        return translation;
    },

    // 切换语言
    setLang: function (lang) {
        if (lang === 'zh-CN' || lang === 'en-US') {
            this.currentLang = lang;
            localStorage.setItem('erupt-lang', lang);
        }
    },

    // 获取当前语言
    getLang: function () {
        return this.currentLang;
    }
};

// 初始化
i18n.init();

