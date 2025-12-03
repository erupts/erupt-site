// 国际化服务
var i18n = {
    // 当前语言
    currentLang: 'zh-CN',

    // 翻译数据 - 数组格式：[中文, 英文]
    translations: {
        // 导航菜单
        'nav.home': ['首页', 'Home'],
        'nav.component': ['组件支持', 'Components'],
        'nav.contrast': ['代码示例', 'Code Examples'],
        'nav.module': ['扩展模块', 'Extensions'],
        'nav.donate': ['捐赠指南', 'Donate'],
        'nav.doc': ['使用文档', 'Documentation'],
        'nav.demo': ['演示DEMO', 'Demo'],

        // 首页
        'home.title': ['Erupt Engine', 'Erupt Engine'],
        'home.subtitle': ['注解·低代码', 'Annotation·Low Code'],
        'home.subtitle2': ['对象视图模型', 'Object View Model'],
        'home.btn.code': ['代码示例', 'Code Examples'],
        'home.btn.doc': ['使用文档', 'Documentation'],
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

