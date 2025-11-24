app.controller("component", function ($scope) {
    $scope.types = [
        {code: "INPUT", name: "文本输入框", image: "input.svg"},
        {code: "TEXTAREA", name: "多行文本输入框", image: "textarea.svg"},
        {code: "NUMBER", name: "数值输入框", image: "number.svg"},
        {code: "SLIDER", name: "滑动输入条", image: "slider.svg"},
        {code: "DATE", name: "时间选择器", image: "date.svg"},
        {code: "BOOLEAN", name: "布尔开关", image: "bool.svg"},
        {code: "CHOICE", name: "单选选择器", image: "choice.svg"},
        {code: "TAGS", name: "标签选择器", image: "tags.svg"},
        {code: "ATTACHMENT", name: "附件上传", image: "attachment.svg"},
        {code: "AUTO_COMPLETE", name: "自动完成", image: "autoComplete.svg"},

        {code: "REFERENCE_TREE", name: "树选择器", image: "referenceTree.svg"},
        {code: "REFERENCE_TABLE", name: "表格选择器", image: "referenceTable.svg"},

        {code: "CHECKBOX", name: "多选框", image: "checkbox.svg"},
        {code: "TAB_TREE", name: "一对多树选择器", image: "tabTree.svg"},
        {code: "TAB_TABLE_REFER", name: "一对多表格选择器", image: "tabTableRefer.svg"},
        {code: "TAB_TABLE_ADD", name: "一对多增加", image: "tabTableAdd.svg"},

        {code: "HTML_EDITOR", name: "富文本编辑器", image: "htmlEditor.svg"},
        {code: "CODE_EDITOR", name: "代码编辑器", image: "codeEditor.svg"},
        {code: "TPL", name: "自定义HTML模板", image: "tpl.svg"},
        {code: "MAP", name: "地图", image: "map.svg"},
        {code: "DIVIDE", name: "分割线", image: "divide.svg"},
        {code: "SIGNATURE", name: "数字签名", image: "sign.svg"},
        {code: "HIDDEN", name: "隐藏", image: "hidden.svg"},
        {code: "EMPTY", name: "空白", image: "empty.svg"},
    ]

    $scope.viewTypes = [
        {code: "TEXT", name: "文本", image: "text.svg"},
        {code: "NUMBER", name: "数值", image: "number.svg"},
        {code: "DATE", name: "时间", image: "date.svg"},
        {code: "IMAGE", name: "图片", image: "image.svg"},
        {code: "HTML", name: "HTML", image: "html.svg"},
        {code: "MOBILE_HTML", name: "Mobile HTML", image: "mobile-html.svg"},

        {code: "LINK", name: "链接", image: "link.svg"},
        {code: "LINK_DIALOG", name: "对话框方式打开链接", image: "link-dialog.svg"},
        {code: "DOWNLOAD", name: "下载附件", image: "download.svg"},
        {code: "ATTACHMENT", name: "打开附件", image: "attachment.svg"},
        {code: "OVR", name: "One to many", image: "ovr.svg"},
        {code: "ATTACHMENT_DIALOG", name: "对话框中展示附件", image: "attachment-dialog.svg"},

        {code: "QR_CODE", name: "QRCODE", image: "qr.svg"},
        {code: "SWF", name: "SWF", image: "swf.svg"},
        {code: "CODE", name: "CODE", image: "code.svg"},
        {code: "MAP", name: "MAP", image: "map.svg"},
        {code: "BASE64", name: "BASE64", image: "base64.svg"},
        {code: "MARKDOWN", name: "MARKDOWN", image: "markdown.svg"},
    ]
});
