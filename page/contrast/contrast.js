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
            id: 8, key: "contrast.menu.serverGroup", path: "/fill/build/tree/OpsServerGroup",
            code: `@Entity
@Table(name = "demo_ops_server_group")
@Erupt(
        name = "Server Group",
        orderBy = "OpsServerGroup.sort",
        tree = @Tree(pid = "parent.id")
)
public class OpsServerGroup extends HyperModel {

    @EruptField(
            views = @View(title = "Code"),
            edit = @Edit(title = "Code", notNull = true)
    )
    private String code;

    @EruptField(
            views = @View(title = "Name"),
            edit = @Edit(title = "Name", notNull = true)
    )
    private String name;

    @ManyToOne
    @EruptField(
            edit = @Edit(
                    title = "Parent Group",
                    type = EditType.REFERENCE_TREE,
                    referenceTreeType = @ReferenceTreeType(pid = "parent.id")
            )
    )
    private OpsServerGroup parent;

    @EruptField(
            views = @View(title = "Sort"),
            edit = @Edit(title = "Sort")
    )
    private Integer sort;

    @Lob
    @EruptField(
            views = @View(title = "Remark"),
            edit = @Edit(title = "Remark")
    )
    private String remark;

}`
        },
        {id: 6, key: "contrast.menu.treeView", path: "/build/tree/TreeDemo", code: ""},
        {id: 14, key: "contrast.menu.report", path: "/fill/bi/3XjnHCxb", code: ""}
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
