app.controller("contrast", function ($scope, $http, dataService) {
    var codeEle = document.getElementById("erupt-code");
    var activeKey = "active_key";

    var pages = [
        {
            id: 5, key: "contrast.menu.simple", path: "/fill/build/table/Simple",
            code: `@Erupt(
       name = "Simple Example",
       power = @Power(importable = true, export = true)
)
@Table(name = "t_simple")   // database table name
@Entity
public class Simple extends BaseModel {

    @EruptField(
            views = @View(title = "Text"),
            edit = @Edit(title = "Text", notNull = true, search = @Search)
    )
    private String input;

    @EruptField(
            views = @View(title = "Number", sortable = true),
            edit = @Edit(title = "Number", search = @Search)
    )
    private Float number;

    @EruptField(
            views = @View(title = "Boolean"),
            edit = @Edit(title = "Boolean", search = @Search)
    )
    private Boolean bool;

    @EruptField(
            views = @View(title = "Date"),
            edit = @Edit(title = "Date", search = @Search(vague = true))
    )
    private Date date;

    @EruptField(
            views = @View(title = "Slider"),
            edit = @Edit(title = "Slider", type = EditType.SLIDER, search = @Search,
                    sliderType = @SliderType(max = 90, markPoints = {0, 30, 60, 90}, dots = true))
    )
    private Integer slide;

    @EruptField(
            views = @View(title = "Dropdown"),
            edit = @Edit(
                    search = @Search,
                    title = "Dropdown", type = EditType.CHOICE,
                    choiceType = @ChoiceType(fetchHandler = SqlChoiceFetchHandler.class,
                            fetchHandlerParams = "select id,name from e_upms_menu"
                    )
            )
    )
    private Long choice;

}`
        },
        {
            id: 1, key: "contrast.menu.student", path: "/fill/build/table/Student",
            code: `@Erupt(name = "Student Management")        // erupt class annotation
@Table(name = "t_student")    // database table name
@Entity                       // hibernate entity annotation
public class Student extends BaseModel {

    @EruptField(
            views = @View(title = "Name"),
            edit = @Edit(title = "Name")
    )
    private String name;

    @EruptField(
            views = @View(title = "Gender"),
            edit = @Edit(title = "Gender",
                    boolType = @BoolType(trueText = "Male", falseText = "Female"))
    )
    private Boolean sex;

    @EruptField(
            views = @View(title = "Birthday"),
            edit = @Edit(title = "Birthday",
                    dateType = @DateType(pickerMode = DateType.PickerMode.HISTORY)
            ))
    private Date birthday;

    @EruptField(
            views = @View(title = "Grade (High School)"),
            edit = @Edit(title = "Grade (High School)", type = EditType.CHOICE,
                    choiceType = @ChoiceType(vl = {
                            @VL(value = "1", label = "Grade 1"),
                            @VL(value = "2", label = "Grade 2"),
                            @VL(value = "3", label = "Grade 3")
                    })
            ))
    private Integer grade;

}`
        },
        {
            id: 9, key: "contrast.menu.menu", path: "/fill/build/tree/EruptMenu",
            code: `@Entity
@Table(name = "e_upms_menu")
@Erupt(
        name = "Menu Management",
        orderBy = "EruptMenu.sort asc",
        tree = @Tree(pid = "parentMenu.id", expandLevel = 5),
        dataProxy = EruptMenuService.class
)
@EruptI18n
@Getter
@Setter
public class EruptMenu extends MetaModel {

    @EruptField(
            views = @View(title = "Name"),
            edit = @Edit(title = "Name", notNull = true)
    )
    private String name;

    @EruptField(
            edit = @Edit(
                    notNull = true,
                    title = "Status",
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(fetchHandler = MenuStatus.ChoiceFetch.class)
            )
    )
    private Integer status;

    @ManyToOne
    @EruptField(
            edit = @Edit(
                    title = "Parent Menu",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parentMenu.id", expandLevel = 3)
            )
    )
    private EruptMenu parentMenu;

    @EruptField(
            edit = @Edit(
                    title = "Menu Type",
                    type = EditType.CHOICE,
                    choiceType = @ChoiceType(fetchHandler = MenuTypeEnum.ChoiceFetch.class)
            )
    )
    private String type;

    @EruptField(
            edit = @Edit(title = "Type Value")
    )
    private String value;

    @EruptField(
            edit = @Edit(title = "Sort")
    )
    private Integer sort = 0;

    @EruptField(
            edit = @Edit(title = "Icon", desc = "Refer to the font-awesome icon library")
    )
    private String icon;

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            edit = @Edit(title = "Code", readonly = @Readonly)
    )
    private String code;

    @Column(length = AnnotationConst.REMARK_LENGTH)
    @EruptField(
            edit = @Edit(
                    title = "Custom Params",
                    desc = "JSON format, retrieved from context, parsed based on business needs",
                    type = EditType.CODE_EDITOR,
                    codeEditType = @CodeEditorType(language = "json")
            )
    )
    private String param;

}`
        },
        {
            id: 10, key: "contrast.menu.role", path: "/fill/build/table/EruptRole",
            code: `@Entity
@Table(name = "e_upms_role")
@Erupt(name = "Role Management", dataProxy = EruptRoleDataProxy.class, orderBy = "EruptRole.sort asc")
@EruptI18n
@Getter
@Setter
@Component
public class EruptRole extends HyperModelUpdateVo {

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            views = @View(title = "Code"),
            edit = @Edit(title = "Code", notNull = true, search = @Search(vague = true))
    )
    private String code;

    @EruptField(
            views = @View(title = "Name"),
            edit = @Edit(title = "Name", notNull = true, search = @Search(vague = true))
    )
    private String name;

    @EruptField(
            views = @View(title = "Sort", sortable = true),
            edit = @Edit(title = "Sort")
    )
    private Integer sort;

    @EruptField(
            views = @View(title = "Status", sortable = true),
            edit = @Edit(
                    title = "Status",
                    type = EditType.BOOLEAN,
                    notNull = true,
                    search = @Search(vague = true),
                    boolType = @BoolType(trueText = "Enabled", falseText = "Disabled")
            )
    )
    private Boolean status = true;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "e_upms_role_menu",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "menu_id", referencedColumnName = "id"))
    @EruptField(
            views = @View(title = "Menu Permissions"),
            edit = @Edit(
                    filter = @Filter(conditionHandler = RoleMenuFilter.class),
                    title = "Menu Permissions",
                    type = EditType.TAB_TREE
            )
    )
    private Set<EruptMenu> menus;

    @JoinTable(name = "e_upms_user_role",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    @ManyToMany(fetch = FetchType.EAGER)
    @EruptField(
            views = @View(title = "Users"),
            edit = @Edit(title = "Users", type = EditType.TAB_TABLE_REFER)
    )
    private Set<EruptUserByRoleView> users;

}`
        },
        {
            id: 11, key: "contrast.menu.org", path: "/fill/build/tree/EruptOrg",
            code: `@Entity
@Table(name = "e_upms_org")
@Erupt(
        name = "Organization Management",
        tree = @Tree(pid = "parentOrg.id", expandLevel = 5),
        orderBy = "EruptOrg.sort asc"
)
@EruptI18n
@Getter
@Setter
public class EruptOrg extends BaseModel {

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            views = @View(title = "Org Code", sortable = true),
            edit = @Edit(title = "Org Code", notNull = true, search = @Search(vague = true))
    )
    private String code;

    @EruptField(
            views = @View(title = "Org Name", sortable = true),
            edit = @Edit(title = "Org Name", notNull = true, search = @Search(vague = true))
    )
    private String name;

    @ManyToOne
    @EruptField(
            edit = @Edit(
                    title = "Parent Org",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parentOrg.id", expandLevel = 3)
            )
    )
    private EruptOrg parentOrg;

    @EruptField(
            edit = @Edit(title = "Sort")
    )
    private Integer sort;

}`
        },
        {
            id: 12, key: "contrast.menu.user", path: "/fill/build/table/EruptUser",
            code: `@Entity
@Table(name = "e_upms_user")
@Erupt(
        name = "User Management",
        dataProxy = EruptUserDataProxy.class,
        linkTree = @LinkTree(field = "eruptOrg"),
        orderBy = "EruptUser.id",
        rowOperation = @RowOperation(title = "Reset Password",
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
            views = @View(title = "Username", sortable = true),
            edit = @Edit(title = "Username", desc = "Login username", notNull = true, search = @Search(vague = true))
    )
    private String account;

    @EruptField(
            views = @View(title = "Full Name", sortable = true),
            edit = @Edit(title = "Full Name", notNull = true, search = @Search(vague = true))
    )
    private String name;

    @EruptField(
            views = @View(title = "Account Status", sortable = true),
            edit = @Edit(
                    title = "Account Status",
                    search = @Search,
                    type = EditType.BOOLEAN,
                    notNull = true,
                    boolType = @BoolType(trueText = "Active", falseText = "Locked")
            )
    )
    private Boolean status = true;

    @EruptField(
            edit = @Edit(title = "Phone", search = @Search(vague = true),
                    inputType = @InputType(regex = RegexConst.PHONE_REGEX))
    )
    private String phone;

    @EruptField(
            edit = @Edit(title = "Email", search = @Search(vague = true),
                    inputType = @InputType(regex = RegexConst.EMAIL_REGEX))
    )
    private String email;

    @EruptField(
            views = @View(title = "Super Admin", sortable = true),
            edit = @Edit(title = "Super Admin", notNull = true, search = @Search(vague = true))
    )
    private Boolean isAdmin = false;

    @ManyToOne
    @EruptField(
            views = @View(title = "Home Menu", column = "name"),
            edit = @Edit(
                    title = "Home Menu",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parentMenu.id"),
                    filter = @Filter(conditionHandler = EruptUser.class)
            )
    )
    private EruptMenu eruptMenu;

    @ManyToOne
    @EruptField(
            views = @View(title = "Organization", column = "name"),
            edit = @Edit(title = "Organization", type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parentOrg.id"))
    )
    private EruptOrg eruptOrg;

    @ManyToOne
    @EruptField(
            views = @View(title = "Position", column = "name"),
            edit = @Edit(title = "Position", type = EditType.REFERENCE_TREE, search = @Search)
    )
    private EruptPost eruptPost;

    private String password;

    @Transient
    @EruptField(
            edit = @Edit(title = "Password", readonly = @Readonly(add = false))
    )
    private String passwordA;

    @Transient
    @EruptField(
            edit = @Edit(title = "Confirm Password", readonly = @Readonly(add = false))
    )
    private String passwordB;

    @EruptField(
            views = @View(title = "Password Reset Time", width = "130px", sortable = true)
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
            views = @View(title = "Roles"),
            edit = @Edit(title = "Roles", type = EditType.CHECKBOX)
    )
    private Set<EruptRole> roles;

    @Column(length = AnnotationConst.REMARK_LENGTH)
    @EruptField(
            edit = @Edit(title = "IP Whitelist",
                    desc = "Separate IPs with newlines; leave empty to skip auth",
                    type = EditType.TEXTAREA)
    )
    private String whiteIp;

    @Column(length = AnnotationConst.REMARK_LENGTH)
    @EruptField(
            edit = @Edit(title = "Remark", type = EditType.TEXTAREA)
    )
    private String remark;

}`
        },
        {
            id: 13, key: "contrast.menu.dict", path: "/fill/build/table/EruptDict",
            code: `@Entity
@Table(name = "e_dict")
@EruptI18n
@Erupt(
        name = "Data Dictionary",
        power = @Power(export = true),
        orderBy = "EruptDict.updateTime desc",
        drills = @Drill(
                title = "Dictionary Items",
                link = @Link(linkErupt = EruptDictItem.class, joinColumn = "eruptDict.id")
        )
)
@Getter
@Setter
public class EruptDict extends MetaModelUpdateVo {

    @Column(length = AnnotationConst.CODE_LENGTH, unique = true)
    @EruptField(
            views = @View(title = "Code", sortable = true),
            edit = @Edit(title = "Code", notNull = true, search = @Search(vague = true))
    )
    private String code;

    @EruptField(
            views = @View(title = "Name", sortable = true),
            edit = @Edit(title = "Name", notNull = true, search = @Search(vague = true))
    )
    private String name;

    @EruptField(
            views = @View(title = "Remark"),
            edit = @Edit(title = "Remark", type = EditType.TEXTAREA)
    )
    private String remark;

}`
        },
        {
            id: 3, key: "contrast.menu.table", path: "/fill/build/table/TableDemo",
            code: `@Erupt(name = "Table Demo")
@Table(name = "demo_table")
@Entity
public class TableDemo extends BaseModel {

    @EruptField(
            views = {
                    @View(title = "QR Code", type = ViewType.QR_CODE),
                    @View(title = "Link", type = ViewType.LINK),
                    @View(title = "Link (Dialog)", type = ViewType.LINK_DIALOG)
            },
            edit = @Edit(title = "Link")
    )
    private String link;

    @Lob
    @EruptField(
            views = {
                    @View(title = "HTML", type = ViewType.HTML),
                    @View(title = "HTML (Mobile)", type = ViewType.MOBILE_HTML)
            },
            edit = @Edit(title = "HTML", type = EditType.HTML_EDITOR)
    )
    private String html;

    @EruptField(
            views = @View(title = "Flash", type = ViewType.SWF),
            edit = @Edit(title = "Upload Flash File", type = EditType.ATTACHMENT,
                attachmentType = @AttachmentType(fileTypes = {"swf", "flv"}))
    )
    private String swf;

    @EruptField(
            views = {
                    @View(title = "Open Attachment", type = ViewType.ATTACHMENT),
                    @View(title = "Attachment (Dialog)", type = ViewType.ATTACHMENT_DIALOG),
                    @View(title = "Download Attachment", type = ViewType.DOWNLOAD),
            },
            edit = @Edit(title = "Upload Attachment", type = EditType.ATTACHMENT)
    )
    private String attachment;

    @EruptField(
            views = @View(title = "Code", type = ViewType.CODE),
            edit = @Edit(title = "Code (Java)", type = EditType.CODE_EDITOR,
                codeEditType = @CodeEditorType(language = "java"))
    )
    private String code;

}`
        },
        {
            id: 4, key: "contrast.menu.article", path: "/fill/build/table/Article",
            code: `@Erupt(
        name = "Article Publishing",
        orderBy = "top desc",
        power = @Power(importable = true, export = true)
)
@Table(name = "demo_article")
@Entity
public class Article extends HyperModel {

    @EruptField(
            views = @View(title = "Cover Image"),
            edit = @Edit(title = "Cover Image", type = EditType.ATTACHMENT,
                    attachmentType = @AttachmentType(type = AttachmentType.Type.IMAGE, maxLimit = 3))
    )
    private String pic;

    @EruptField(
            views = @View(title = "Title"),
            edit = @Edit(title = "Title", notNull = true, search = @Search(vague = true))
    )
    private String title;

    @EruptField(
            views = @View(title = "Pinned"),
            edit = @Edit(title = "Pinned", notNull = true, boolType = @BoolType, search = @Search)
    )
    private Boolean top = false;

    @EruptField(
            views = @View(title = "Publish Status"),
            edit = @Edit(title = "Publish Status", notNull = true,
                    boolType = @BoolType(trueText = "Published", falseText = "Draft"), search = @Search)
    )
    private Boolean publish;

    @Lob
    @EruptField(
            views = @View(title = "Content (UEditor)", type = ViewType.HTML, export = false),
            edit = @Edit(title = "Content (UEditor)", type = EditType.HTML_EDITOR, notNull = true)
    )
    private String content;

    @Lob
    @EruptField(
            views = @View(title = "Content (CKEditor)", type = ViewType.HTML),
            edit = @Edit(title = "Content (CKEditor)", type = EditType.HTML_EDITOR,
                    htmlEditorType = @HtmlEditorType(HtmlEditorType.Type.CKEDITOR))
    )
    private String content2;

    @Lob
    @EruptField(
            views = @View(title = "Remark"),
            edit = @Edit(title = "Remark", type = EditType.TEXTAREA)
    )
    private String remark;

}`
        },
        {
            id: 15, key: "contrast.menu.gantt", path: "/fill/build/table/GanttDemo",
            code: `@Entity
@Table(name = "t_gantt")
@Erupt(
        name = "Gantt",
//        visRawTable = false,
        power = @Power(importable = true, export = true),
        orderBy = "startDate",
        vis = {
                @Vis(
                        title = "Gantt Chart",
                        desc = "Gantt",
                        orderBy = @Sort(field = "name"),
                        fieldVisibility = Vis.FieldVisibility.EXCLUDE,
                        fields = {"parent_id", "parent_parent_name", "updateUser_name"},
                        ganttView = @GanttView(
                                startDateField = "startDate",
                                endDateField = "endDate",
                                pidField = "parent.id",
                                colorField = "color",
                                progressField = "progress",
                                groupField = "type"
                        ),
                        type = Vis.Type.GANTT
                ),
                @Vis(
                        title = "CALENDAR",
                        type = Vis.Type.CALENDAR,
                        calendarView = @CalendarView(
                                dateField = "startDate",
                                endDateField = "endDate",
                                colorField = "color"
                        )
                )
        }
)
@AllowModify
public class GanttDemo extends BaseModel {

    @EruptField(
            views = @View(title = "Name"),
            edit = @Edit(title = "Name", notNull = true)
    )
    private String name;

    @EruptField(
            views = @View(title = "Group"),
            edit = @Edit(title = "Group", type = EditType.CHOICE, choiceType = @ChoiceType(vl = {
                    @VL(label = "Group 1", value = "1"),
                    @VL(label = "Group 2", value = "2"),
                    @VL(label = "Group 1", value = "3"),
                    @VL(label = "Group 2", value = "4")
            }))
    )
    private String type;

    @EruptField(
            views = @View(title = "Start Date", sortable = true),
            edit = @Edit(title = "Start Date", notNull = true)
    )
    private Date startDate;

    @EruptField(
            views = @View(title = "End Date", sortable = true),
            edit = @Edit(title = "End Date", notNull = true)
    )
    private LocalDateTime endDate;

    @EruptField(
            views = @View(title = "Color"),
            edit = @Edit(title = "Color", type = EditType.COLOR)
    )
    private String color;

    @EruptField(
            views = @View(title = "Progress"),
            edit = @Edit(title = "Progress", type = EditType.SLIDER, sliderType = @SliderType(max = 100))
    )
    private Integer progress;

    @ManyToOne
    @EruptField(
            views = {
                    @View(title = "pid", column = "id", show = false),
                    @View(title = "pname", column = "parent.name", show = false),
            },
            edit = @Edit(
                    title = "Parent Node",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parent.id", expandLevel = 2)
            )
    )
    private GanttDemo parent;

}`
        },
        {
            id: 16, key: "contrast.menu.complex", path: "/fill/build/table/Complex",
            code: `@AllowModify
@Erupt(
        name = "Complex Example",
        desc = "Complex Example: <a href=\"https://www.erupt.xyz\">erupt</a>",
        power = @Power(export = true, importable = true),
        dataProxy = ComplexDataProxy.class,
        dataProxyParams = {"a", "b", "c"},
        vis = {
                @Vis(
                        title = "Table View",
                        type = Vis.Type.TABLE
                ),
                @Vis(
                        title = "Board View",
                        desc = "BOARD",
                        type = Vis.Type.BOARD,
                        boardView = @BoardView(groupField = "choice"),
                        fieldVisibility = Vis.FieldVisibility.INCLUDE,
                        fields = {"text", "bool", "color"}
                ),
                @Vis(
                        title = "Card View",
                        desc = "card",
                        type = Vis.Type.CARD,
                        cardView = @CardView(coverField = "img"),
                        orderBy = @Sort(field = "img", direction = Direction.DESC),
                        fieldVisibility = Vis.FieldVisibility.INCLUDE,
                        fields = {"complexTab", "articleTab"}
                ),
                @Vis(
                        title = "Card View 2",
                        desc = "card",
                        fieldVisibility = Vis.FieldVisibility.INCLUDE,
                        cardView = @CardView(coverField = "img"),
                        type = Vis.Type.CARD
                ),
                @Vis(
                        title = "Gantt Chart",
                        fields = {"text", "bool", "color"},
                        fieldVisibility = Vis.FieldVisibility.INCLUDE,
                        ganttView = @GanttView(
                                startDateField = "startDate",
                                endDateField = "endDate"
                        ),
                        type = Vis.Type.GANTT
                ),
                @Vis(
                        title = "Custom Template",
                        type = Vis.Type.TPL,
                        tplView = @Tpl(path = "/tpl/vis.html", engine = Tpl.Engine.Native)
                ),
        },
        drills = {
                @Drill(title = "Drill A", show = @ExprBool(exprHandler = ViaMenuValueCtrl.class, params = "ComplexBtn"), link = @Link(joinColumn = "id", linkErupt = Article.class)),
                @Drill(title = "Drill B", show = @ExprBool(exprHandler = ViaMenuValueCtrl.class, params = "ComplexBtn"), link = @Link(joinColumn = "id", linkErupt = Complex.class, linkCondition = "1 = 1 and Complex.bool = true"), fold = true)
        },
        rowOperation = {
                @RowOperation(operationHandler = OperationHandlerImpl.class,
                        show = @ExprBool(exprHandler = ViaMenuValueCtrl.class, params = "ComplexBtn"),
                        ifExpr = "item.img",
                        callHint = "",
                        fold = true,
                        ifExprBehavior = RowOperation.IfExprBehavior.DISABLE,
                        mode = RowOperation.Mode.SINGLE, title = "Single Row", icon = "fa fa-toggle-on"),
//                @RowOperation(title = "Erupt Role",
//                        eruptClass = EruptRole.class, operationHandler = EruptRoleFormHandler.class),
                @RowOperation(title = "Multi Row",
                        icon = "",
                        tip = "Tip",
                        eruptClass = SimpleDialog.class,
                        show = @ExprBool(exprHandler = ViaMenuValueCtrl.class, params = "ComplexBtn"), operationHandler = DialogFormHandler.class),
                @RowOperation(operationHandler = OperationHandlerImpl.class,
                        eruptClass = SimpleDialog.class,
                        show = @ExprBool(exprHandler = ViaMenuValueCtrl.class, params = "ComplexBtn"),
                        mode = RowOperation.Mode.BUTTON, tip = "Executes without depending on any row data", title = "Button Action", icon = "fa fa-google-wallet"),
                @RowOperation(type = RowOperation.Type.TPL, mode = RowOperation.Mode.MULTI, fold = true,
                        show = @ExprBool(exprHandler = ViaMenuValueCtrl.class, params = "ComplexBtn"),
                        tpl = @Tpl(path = "/tpl/operation.html?id=xxx&c=xxx", openWay = OpenWay.MODAL,
                                drawerPlacement = Placement.BOTTOM,
                                tplHandler = HtmlHandler.class,
                                height = "80vh",
                                engine = Tpl.Engine.Thymeleaf),
                        title = "Custom Template", icon = "fa fa-pagelines"
                )
        },
//        header = @Tpl(path = "/"),
        orderBy = "id",
        layout = @Layout(tableLeftFixed = 3, tableOperatorWidth = "290px", collapseActionButton = true),
        linkTree = @LinkTree(field = "treeDemo")
)
@EruptFlow
@Table(name = "demo_complex")
@Entity
@Getter
@Setter
public class Complex extends BaseModel implements ChoiceFetchHandler<Complex>, Readonly.ReadonlyHandler {

    @EruptField(
            edit = @Edit(title = "Embedded Template", type = EditType.TPL,
                    tplType = @Tpl(path = "/tpl/demo.html",
                            engine = Tpl.Engine.Thymeleaf, tplHandler = HtmlHandler.class,
                            params = {"Supports various template engines", "Inject backend data via TplHandler", "params are passed from annotations"}))
    )
    private String tpl;

    @EruptField(
            views = @View(title = "Text"),
            edit = @Edit(title = "Text", search = @Search)
    )
    private String text;

    @EruptField(
            views = @View(title = "Boolean", sortable = true),
            edit = @Edit(title = "Boolean")
    )
    private Boolean bool;

    @EruptField(
            views = @View(title = "Color", sortable = true),
            edit = @Edit(title = "Color", search = @Search, type = EditType.COLOR, onchange = ComplexOnChange.class)
    )
    private String color = "#f00";

    @ManyToOne
    private EruptUser eruptUser;

    @EruptField(
            views = @View(title = "Start Date", sortable = true),
            edit = @Edit(title = "Start Date", dateType = @DateType(type = DateType.Type.DATE_TIME))
    )
    private LocalDateTime startDate;

    @EruptField(
            views = @View(title = "End Date", sortable = true),
            edit = @Edit(title = "End Date", dateType = @DateType(type = DateType.Type.DATE_TIME))
    )
    private LocalDateTime endDate;

    @EruptField(
            views = @View(title = "Cover Image", sortable = true),
            edit = @Edit(title = "Cover Image", type = EditType.ATTACHMENT,
                    readonly = @Readonly(exprHandler = Complex.class),
                    attachmentType = @AttachmentType(type = AttachmentType.Type.IMAGE, maxLimit = 3))
    )
    private String img;

    @EruptField(
            views = @View(title = "RADIO"),
            edit = @Edit(
                    search = @Search,
                    title = "RADIO", type = EditType.CHOICE, desc = "Dynamically fetched values",
                    choiceType = @ChoiceType(
                            dependField = "text",
                            type = ChoiceType.Type.RADIO,
                            fetchHandler = ComplexChoiceFilter.class
                    ))
    )
    private String choice;

    @EruptField(
            views = @View(title = "Dict Selection"),
            edit = @Edit(
                    search = @Search,
                    title = "Dict Selection", type = EditType.CHOICE, desc = "Dynamically fetched dict values",
                    choiceType = @ChoiceType(
                            fetchHandler = DictChoiceFetchHandler.class,
                            fetchHandlerParams = {"bi-chart", "10000"}
                    ))
    )
    private Long fromDict;

    @ElementCollection
    @CollectionTable(name = "complex_dicts", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "multi_dict")
    @EruptField(
            views = @View(title = "Multi Select"),
            edit = @Edit(
                    search = @Search,
                    title = "Multi Select", type = EditType.MULTI_CHOICE,
                    multiChoiceType = @MultiChoiceType(
                            type = MultiChoiceType.Type.SELECT,
                            fetchHandler = Complex.class
                    ))
    )
    private Set<Integer> multiDict;

    @ElementCollection
    @CollectionTable(name = "complex_dicts2", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "multi_dict")
    @EruptField(
            views = @View(title = "Multi Select"),
            edit = @Edit(
                    search = @Search,
                    title = "Multi Select", type = EditType.MULTI_CHOICE,
                    multiChoiceType = @MultiChoiceType(
                            type = MultiChoiceType.Type.CHECKBOX,
                            dependField = "multiDict",
                            fetchHandler = Complex.class
                    ))
    )
    private Set<Integer> multiDict2;

    @ManyToOne
    @JoinColumn(name = "role_code2")
    @EruptField(
            views = { @View(title = "ManyToOne Table", column = "title") },
            edit = @Edit(title = "ManyToOne Table", type = EditType.REFERENCE_TABLE, search = @Search,
                    referenceTableType = @ReferenceTableType(label = "title"))
    )
    private Article article2;

    @ManyToOne
    @EruptField(
            views = { @View(title = "ManyToOne Tree", column = "name") },
            edit = @Edit(
                    title = "ManyToOne Tree", type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parent.id", expandLevel = 1))
    )
    private TreeDemo treeDemo;

    @ManyToOne
    @EruptField(
            edit = @Edit(title = "ManyToOne Gantt", type = EditType.REFERENCE_TABLE)
    )
    private GanttDemo ganttDemo;

    @Column(length = AnnotationConst.CONFIG_LENGTH)
    @EruptField(
            views = @View(title = "Python Code", type = ViewType.CODE),
            edit = @Edit(title = "Python Code Editor", type = EditType.CODE_EDITOR,
                    codeEditType = @CodeEditorType(language = "python"))
    )
    private String code;

    @ManyToMany
    @JoinTable(
            name = "demo_complex_gantt",
            joinColumns = @JoinColumn(name = "complex_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "gantt_id", referencedColumnName = "id"))
    @EruptField(
            edit = @Edit(title = "Gantt ManyToMany", type = EditType.TAB_TABLE_REFER)
    )
    private Set<GanttDemo> ganttDemos2;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "complex_id")
    @EruptField(
            views = @View(title = "OneToMany Add"),
            edit = @Edit(title = "OneToMany Add", type = EditType.TAB_TABLE_ADD)
    )
    private Set<ComplexTab> complexTab;

    @ManyToMany
    @JoinTable(
            name = "demo_complex_article",
            joinColumns = @JoinColumn(name = "complex_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "article_id", referencedColumnName = "id"))
    @EruptField(
            views = @View(title = "ManyToMany Articles"),
            edit = @Edit(title = "ManyToMany Articles", type = EditType.TAB_TABLE_REFER,
                    referenceTableType = @ReferenceTableType(label = "title"))
    )
    private Set<Article> articleTab;

    @Override
    public List<VLModel> fetch(String[] params) {
        List<VLModel> list = new ArrayList<>();
        int c = 65;
        for (int i = 0; i < 20; i++) {
            VLModel vlModel = new VLModel(i + "", (char) (c + i) + " → " + (char) (c + i + 5) + " → " + (char) (c + i + 10), i % 2 == 0);
            vlModel.setColor(ComplexChoiceFilter.generateRandomColor());
            list.add(vlModel);
        }
        return list;
    }

    @Override
    public List<VLModel> fetchFilter(Complex complex, String[] params) {
        if (null != complex.getMultiDict()) {
            return this.fetch(params).stream()
                    .filter(it -> complex.getMultiDict().contains(Long.valueOf(it.getValue())))
                    .toList();
        }
        return this.fetch(params);
    }

    @Override
    public boolean add(boolean add, String[] params) { return true; }

    @Override
    public boolean edit(boolean edit, String[] params) { return false; }
}`
        },
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
