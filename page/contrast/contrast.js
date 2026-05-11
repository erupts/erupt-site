app.controller("contrast", function ($scope, $http, dataService) {
    var codeEle = document.getElementById("erupt-code");
    var activeKey = "active_key";

    var pages = [
        {
            id: 5, name: "入门示例", path: "/fill/build/table/Simple",
            code: `@Erupt(
       name = "简单的例子",
       power = @Power(importable = true, export = true)
)
@Table(name = "t_simple")   //数据库表名
@Entity
public class Simple extends BaseModel {

    @EruptField(
            views = @View(title = "文本"),
            edit = @Edit(title = "文本", notNull = true, search = @Search)
    )
    private String input;

    @EruptField(
            views = @View(title = "数值", sortable = true),
            edit = @Edit(title = "数值", search = @Search)
    )
    private Float number;

    @EruptField(
            views = @View(title = "布尔"),
            edit = @Edit(title = "布尔", search = @Search)
    )
    private Boolean bool;

    @EruptField(
            views = @View(title = "时间"),
            edit = @Edit(title = "时间", search = @Search(vague = true))
    )
    private Date date;

    @EruptField(
            views = @View(title = "滑动条"),
            edit = @Edit(title = "滑动条", type = EditType.SLIDER, search = @Search,
                    sliderType = @SliderType(max = 90, markPoints = {0, 30, 60, 90}, dots = true))
    )
    private Integer slide;

    @EruptField(
            views = @View(title = "下拉选择"),
            edit = @Edit(
                    search = @Search,
                    title = "下拉选择", type = EditType.CHOICE,
                    choiceType = @ChoiceType(fetchHandler = SqlChoiceFetchHandler.class,
                            fetchHandlerParams = "select id,name from e_upms_menu"
                    )
            )
    )
    private Long choice;

}`
        },
        {
            id: 1, name: "学生管理", path: "/fill/build/table/Student",
            code: `@Erupt(name = "学生管理")        //erupt类注解
@Table(name = "t_student")    //数据库表名
@Entity                      //hibernate实体类标识
public class Student extends BaseModel {

    @EruptField(
            views = @View(title = "姓名"),
            edit = @Edit(title = "姓名")
    )
    private String name;

    @EruptField(
            views = @View(title = "性别"),
            edit = @Edit(title = "性别",
                    boolType = @BoolType(trueText = "男", falseText = "女"))
    )
    private Boolean sex;

    @EruptField(
            views = @View(title = "出生日期"),
            edit = @Edit(title = "出生日期",
                    dateType = @DateType(pickerMode = DateType.PickerMode.HISTORY)
            ))
    private Date birthday;

    @EruptField(
            views = @View(title = "年级（高中）"),
            edit = @Edit(title = "年级（高中）", type = EditType.CHOICE,
                    choiceType = @ChoiceType(vl = {
                            @VL(value = "1", label = "一年级"),
                            @VL(value = "2", label = "二年级"),
                            @VL(value = "3", label = "三年级")
                    })
            ))
    private Integer grade;

}`
        },
        {
            id: 9, name: "菜单管理", path: "/fill/build/tree/EruptMenu",
            code: `@Entity
@Table(name = "e_upms_menu")
@Erupt(
        name = "菜单管理",
        orderBy = "EruptMenu.sort asc",
        tree = @Tree(pid = "parentMenu.id", expandLevel = 5),
        dataProxy = EruptMenuService.class
)
@EruptI18n
@Getter
@Setter
public class EruptMenu extends MetaModel {

    @EruptField(
            views = @View(title = "名称"),
            edit = @Edit(title = "名称", notNull = true)
    )
    private String name;

    @EruptField(
            edit = @Edit(
                    notNull = true,
                    title = "状态",
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(fetchHandler = MenuStatus.ChoiceFetch.class)
            )
    )
    private Integer status;

    @ManyToOne
    @EruptField(
            edit = @Edit(
                    title = "上级菜单",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parentMenu.id", expandLevel = 3)
            )
    )
    private EruptMenu parentMenu;

    @EruptField(
            edit = @Edit(
                    title = "菜单类型",
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(fetchHandler = MenuTypeEnum.ChoiceFetch.class)
            )
    )
    private String type;

    @EruptField(
            edit = @Edit(title = "类型值")
    )
    private String value;

    @EruptField(
            edit = @Edit(title = "顺序")
    )
    private Integer sort = 0;

    @EruptField(
            edit = @Edit(title = "图标", desc = "请参考图标库font-awesome")
    )
    private String icon;

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            edit = @Edit(title = "编码", readonly = @Readonly)
    )
    private String code;

    @Column(length = AnnotationConst.REMARK_LENGTH)
    @EruptField(
            edit = @Edit(
                    title = "自定义参数",
                    desc = "json格式，通过上下文获取，根据业务需求自助解析",
                    type = EditType.CODE_EDITOR,
                    codeEditType = @CodeEditorType(language = "json")
            )
    )
    private String param;

}`
        },
        {
            id: 10, name: "角色管理", path: "/fill/build/table/EruptRole",
            code: `@Entity
@Table(name = "e_upms_role")
@Erupt(name = "角色管理", dataProxy = EruptRoleDataProxy.class, orderBy = "EruptRole.sort asc")
@EruptI18n
@Getter
@Setter
@Component
public class EruptRole extends HyperModelUpdateVo {

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            views = @View(title = "编码"),
            edit = @Edit(title = "编码", notNull = true, search = @Search(vague = true))
    )
    private String code;

    @EruptField(
            views = @View(title = "名称"),
            edit = @Edit(title = "名称", notNull = true, search = @Search(vague = true))
    )
    private String name;

    @EruptField(
            views = @View(title = "显示顺序", sortable = true),
            edit = @Edit(title = "显示顺序")
    )
    private Integer sort;

    @EruptField(
            views = @View(title = "状态", sortable = true),
            edit = @Edit(
                    title = "状态",
                    type = EditType.BOOLEAN,
                    notNull = true,
                    search = @Search(vague = true),
                    boolType = @BoolType(trueText = "启用", falseText = "禁用")
            )
    )
    private Boolean status = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "e_upms_role_menu",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "menu_id", referencedColumnName = "id"))
    @EruptField(
            views = @View(title = "菜单权限"),
            edit = @Edit(
                    filter = @Filter(conditionHandler = RoleMenuFilter.class),
                    title = "菜单权限",
                    type = EditType.TAB_TREE
            )
    )
    private Set<EruptMenu> menus;

    @JoinTable(name = "e_upms_user_role",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    @ManyToMany(fetch = FetchType.EAGER)
    @EruptField(
            views = @View(title = "包含用户"),
            edit = @Edit(title = "包含用户", type = EditType.TAB_TABLE_REFER)
    )
    private Set<EruptUserByRoleView> users;

}`
        },
        {
            id: 11, name: "组织管理", path: "/fill/build/tree/EruptOrg",
            code: `@Entity
@Table(name = "e_upms_org")
@Erupt(
        name = "组织管理",
        tree = @Tree(pid = "parentOrg.id", expandLevel = 5),
        orderBy = "EruptOrg.sort asc"
)
@EruptI18n
@Getter
@Setter
public class EruptOrg extends BaseModel {

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            views = @View(title = "组织编码", sortable = true),
            edit = @Edit(title = "组织编码", notNull = true, search = @Search(vague = true))
    )
    private String code;

    @EruptField(
            views = @View(title = "组织名称", sortable = true),
            edit = @Edit(title = "组织名称", notNull = true, search = @Search(vague = true))
    )
    private String name;

    @ManyToOne
    @EruptField(
            edit = @Edit(
                    title = "上级组织",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parentOrg.id", expandLevel = 3)
            )
    )
    private EruptOrg parentOrg;

    @EruptField(
            edit = @Edit(title = "显示顺序")
    )
    private Integer sort;

}`
        },
        {
            id: 12, name: "用户管理", path: "/fill/build/table/EruptUser",
            code: `@Entity
@Table(name = "e_upms_user")
@Erupt(
        name = "用户配置",
        dataProxy = EruptUserDataProxy.class,
        linkTree = @LinkTree(field = "eruptOrg"),
        orderBy = "EruptUser.id",
        rowOperation = @RowOperation(title = "重置密码",
                icon = "fa fa-refresh",
                mode = RowOperation.Mode.SINGLE,
                eruptClass = ResetPassword.class,
                operationHandler = ResetPasswordExec.class)
)
@EruptI18n
@Getter
@Setter
public class EruptUser extends LookerSelf implements FilterHandler {

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            views = @View(title = "用户名", sortable = true),
            edit = @Edit(title = "用户名", desc = "登录用户名", notNull = true, search = @Search(vague = true))
    )
    private String account;

    @EruptField(
            views = @View(title = "姓名", sortable = true),
            edit = @Edit(title = "姓名", notNull = true, search = @Search(vague = true))
    )
    private String name;

    @EruptField(
            views = @View(title = "账户状态", sortable = true),
            edit = @Edit(
                    title = "账户状态",
                    search = @Search,
                    type = EditType.BOOLEAN,
                    notNull = true,
                    boolType = @BoolType(trueText = "激活", falseText = "锁定")
            )
    )
    private Boolean status = true;

    @EruptField(
            edit = @Edit(title = "手机号码", search = @Search(vague = true),
                    inputType = @InputType(regex = RegexConst.PHONE_REGEX))
    )
    private String phone;

    @EruptField(
            edit = @Edit(title = "邮箱", search = @Search(vague = true),
                    inputType = @InputType(regex = RegexConst.EMAIL_REGEX))
    )
    private String email;

    @EruptField(
            views = @View(title = "超管用户", sortable = true),
            edit = @Edit(title = "超管用户", notNull = true, search = @Search(vague = true))
    )
    private Boolean isAdmin = false;

    @ManyToOne
    @EruptField(
            views = @View(title = "首页菜单", column = "name"),
            edit = @Edit(
                    title = "首页菜单",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parentMenu.id"),
                    filter = @Filter(conditionHandler = EruptUser.class)
            )
    )
    private EruptMenu eruptMenu;

    @ManyToOne
    @EruptField(
            views = @View(title = "所属组织", column = "name"),
            edit = @Edit(title = "所属组织", type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parentOrg.id"))
    )
    private EruptOrg eruptOrg;

    @ManyToOne
    @EruptField(
            views = @View(title = "岗位", column = "name"),
            edit = @Edit(title = "岗位", type = EditType.REFERENCE_TREE, search = @Search)
    )
    private EruptPost eruptPost;

    private String password;

    @Transient
    @EruptField(
            edit = @Edit(title = "密码", readonly = @Readonly(add = false))
    )
    private String passwordA;

    @Transient
    @EruptField(
            edit = @Edit(title = "确认密码", readonly = @Readonly(add = false))
    )
    private String passwordB;

    @EruptField(
            views = @View(title = "重置密码时间", width = "130px", sortable = true)
    )
    private Date resetPwdTime;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "e_upms_user_role",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    @OrderBy
    @EruptField(
            views = @View(title = "所属角色"),
            edit = @Edit(title = "所属角色", type = EditType.CHECKBOX)
    )
    private Set<EruptRole> roles;

    @Column(length = AnnotationConst.REMARK_LENGTH)
    @EruptField(
            edit = @Edit(title = "ip白名单",
                    desc = "ip与ip之间使用换行符间隔，不填表示不鉴权",
                    type = EditType.TEXTAREA)
    )
    private String whiteIp;

    @Column(length = AnnotationConst.REMARK_LENGTH)
    @EruptField(
            edit = @Edit(title = "备注", type = EditType.TEXTAREA)
    )
    private String remark;

}`
        },
        {
            id: 13, name: "字典管理", path: "/fill/build/table/EruptDict",
            code: `@Entity
@Table(name = "e_dict")
@EruptI18n
@Erupt(
        name = "数据字典",
        power = @Power(export = true),
        orderBy = "EruptDict.updateTime desc",
        drills = @Drill(
                title = "字典项",
                link = @Link(linkErupt = EruptDictItem.class, joinColumn = "eruptDict.id")
        )
)
@Getter
@Setter
public class EruptDict extends MetaModelUpdateVo {

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            views = @View(title = "编码", sortable = true),
            edit = @Edit(title = "编码", notNull = true, search = @Search(vague = true))
    )
    private String code;

    @EruptField(
            views = @View(title = "名称", sortable = true),
            edit = @Edit(title = "名称", notNull = true, search = @Search(vague = true))
    )
    private String name;

    @EruptField(
            views = @View(title = "备注"),
            edit = @Edit(title = "备注", type = EditType.TEXTAREA)
    )
    private String remark;

}`
        },
        {
            id: 3, name: "表格组件", path: "/fill/build/table/TableDemo",
            code: `@Erupt(name = "表格示例")
@Table(name = "demo_table")
@Entity
public class TableDemo extends BaseModel {

    @EruptField(
            views = {
                    @View(title = "二维码", type = ViewType.QR_CODE),
                    @View(title = "链接", type = ViewType.LINK),
                    @View(title = "链接（对话框）", type = ViewType.LINK_DIALOG)
            },
            edit = @Edit(title = "链接")
    )
    private String link;

    @Lob
    @EruptField(
            views = {
                    @View(title = "HTML", type = ViewType.HTML),
                    @View(title = "HTML（手机端）", type = ViewType.MOBILE_HTML)
            },
            edit = @Edit(title = "HTML", type = EditType.HTML_EDITOR)
    )
    private String html;

    @EruptField(
            views = @View(title = "flash", type = ViewType.SWF),
            edit = @Edit(title = "上传flash文件", type = EditType.ATTACHMENT,
                attachmentType = @AttachmentType(fileTypes = {"swf", "flv"}))
    )
    private String swf;

    @EruptField(
            views = {
                    @View(title = "打开附件", type = ViewType.ATTACHMENT),
                    @View(title = "附件（对话框）", type = ViewType.ATTACHMENT_DIALOG),
                    @View(title = "附件下载", type = ViewType.DOWNLOAD),
            },
            edit = @Edit(title = "上传附件", type = EditType.ATTACHMENT)
    )
    private String attachment;

    @EruptField(
            views = @View(title = "代码", type = ViewType.CODE),
            edit = @Edit(title = "代码(Java)", type = EditType.CODE_EDITOR,
                codeEditType = @CodeEditorType(language = "java"))
    )
    private String code;

}`
        },
        {
            id: 4, name: "文章发布", path: "/fill/build/table/Article",
            code: `@Erupt(
        name = "文章发布",
        orderBy = "top desc",
        power = @Power(importable = true, export = true)
)
@Table(name = "demo_article")
@Entity
public class Article extends HyperModel {

    @EruptField(
            views = @View(title = "封面图"),
            edit = @Edit(title = "封面图", type = EditType.ATTACHMENT,
                    attachmentType = @AttachmentType(type = AttachmentType.Type.IMAGE, maxLimit = 3))
    )
    private String pic;

    @EruptField(
            views = @View(title = "标题"),
            edit = @Edit(title = "标题", notNull = true, search = @Search(vague = true))
    )
    private String title;

    @EruptField(
            views = @View(title = "置顶"),
            edit = @Edit(title = "置顶", notNull = true, boolType = @BoolType, search = @Search)
    )
    private Boolean top = false;

    @EruptField(
            views = @View(title = "发布状态"),
            edit = @Edit(title = "发布状态", notNull = true,
                    boolType = @BoolType(trueText = "发布", falseText = "草稿"), search = @Search)
    )
    private Boolean publish;

    @Lob
    @EruptField(
            views = @View(title = "内容(UEditor)", type = ViewType.HTML, export = false),
            edit = @Edit(title = "内容(UEditor)", type = EditType.HTML_EDITOR, notNull = true)
    )
    private String content;

    @Lob
    @EruptField(
            views = @View(title = "内容(CKEditor)", type = ViewType.HTML),
            edit = @Edit(title = "内容(CKEditor)", type = EditType.HTML_EDITOR,
                    htmlEditorType = @HtmlEditorType(HtmlEditorType.Type.CKEDITOR))
    )
    private String content2;

    @Lob
    @EruptField(
            views = @View(title = "备注"),
            edit = @Edit(title = "备注", type = EditType.TEXTAREA)
    )
    private String remark;

}`
        },
        {
            id: 8, name: "服务器组别", path: "/fill/build/tree/OpsServerGroup",
            code: `@Entity
@Table(name = "demo_ops_server_group")
@Erupt(
        name = "服务器组别",
        orderBy = "OpsServerGroup.sort",
        tree = @Tree(pid = "parent.id")
)
public class OpsServerGroup extends HyperModel {

    @EruptField(
            views = @View(title = "编码"),
            edit = @Edit(title = "编码", notNull = true)
    )
    private String code;

    @EruptField(
            views = @View(title = "名称"),
            edit = @Edit(title = "名称", notNull = true)
    )
    private String name;

    @ManyToOne
    @EruptField(
            edit = @Edit(
                    title = "上级组别",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parent.id")
            )
    )
    private OpsServerGroup parent;

    @EruptField(
            views = @View(title = "显示顺序"),
            edit = @Edit(title = "显示顺序")
    )
    private Integer sort;

    @Lob
    @EruptField(
            views = @View(title = "备注"),
            edit = @Edit(title = "备注")
    )
    private String remark;

}`
        },
        {id: 6, name: "树视图配置", path: "/build/tree/TreeDemo", code: ""},
        {id: 14, name: "在线报表", path: "/fill/bi/3XjnHCxb", code: ""}
    ];

    window.scrollTo(0, 0);
    var stored = sessionStorage.getItem(activeKey);
    $scope.active = stored ? JSON.parse(stored) : pages[0];
    $scope.pages = pages;
    showCode($scope.active);

    $scope.choicePage = function (page) {
        if ($scope.active.id === page.id) return;
        sessionStorage.setItem(activeKey, JSON.stringify(page));
        $scope.active = page;
        showCode(page);
    };

    function showCode(page) {
        $("#erupt-code code").text(page.code || "");
        Prism.highlightAllUnder(codeEle);
    }
});
