app.controller("component", function ($scope, i18nService, $sce) {
    // 获取带参数的 HTML 翻译
    $scope.getI18nHtml = function(key, params) {
        var translation = i18nService.t(key, params);
        return $sce.trustAsHtml(translation);
    };
    
    function updateTypes() {
        $scope.types = [
            {code: "INPUT", name: i18nService.t('component.input'), image: "input.svg"},
            {code: "TEXTAREA", name: i18nService.t('component.textarea'), image: "textarea.svg"},
            {code: "NUMBER", name: i18nService.t('component.number'), image: "number.svg"},
            {code: "SLIDER", name: i18nService.t('component.slider'), image: "slider.svg"},
            {code: "DATE", name: i18nService.t('component.date'), image: "date.svg"},
            {code: "BOOLEAN", name: i18nService.t('component.boolean'), image: "bool.svg"},
            {code: "CHOICE", name: i18nService.t('component.choice'), image: "choice.svg"},
            {code: "TAGS", name: i18nService.t('component.tags'), image: "tags.svg"},
            {code: "ATTACHMENT", name: i18nService.t('component.attachment'), image: "attachment.svg"},
            {code: "AUTO_COMPLETE", name: i18nService.t('component.autocomplete'), image: "autoComplete.svg"},

            {code: "REFERENCE_TREE", name: i18nService.t('component.referenceTree'), image: "referenceTree.svg"},
            {code: "REFERENCE_TABLE", name: i18nService.t('component.referenceTable'), image: "referenceTable.svg"},

            {code: "CHECKBOX", name: i18nService.t('component.checkbox'), image: "checkbox.svg"},
            {code: "TAB_TREE", name: i18nService.t('component.tabTree'), image: "tabTree.svg"},
            {code: "TAB_TABLE_REFER", name: i18nService.t('component.tabTableRefer'), image: "tabTableRefer.svg"},
            {code: "TAB_TABLE_ADD", name: i18nService.t('component.tabTableAdd'), image: "tabTableAdd.svg"},

            {code: "HTML_EDITOR", name: i18nService.t('component.htmlEditor'), image: "htmlEditor.svg"},
            {code: "CODE_EDITOR", name: i18nService.t('component.codeEditor'), image: "codeEditor.svg"},
            {code: "TPL", name: i18nService.t('component.tpl'), image: "tpl.svg"},
            {code: "MAP", name: i18nService.t('component.map'), image: "map.svg"},
            {code: "DIVIDE", name: i18nService.t('component.divide'), image: "divide.svg"},
            {code: "SIGNATURE", name: i18nService.t('component.signature'), image: "sign.svg"},
            {code: "HIDDEN", name: i18nService.t('component.hidden'), image: "hidden.svg"},
            {code: "EMPTY", name: i18nService.t('component.empty'), image: "empty.svg"},
        ];

        $scope.viewTypes = [
            {code: "TEXT", name: i18nService.t('component.view.text'), image: "text.svg"},
            {code: "NUMBER", name: i18nService.t('component.view.number'), image: "number.svg"},
            {code: "DATE", name: i18nService.t('component.view.date'), image: "date.svg"},
            {code: "IMAGE", name: i18nService.t('component.view.image'), image: "image.svg"},
            {code: "HTML", name: i18nService.t('component.view.html'), image: "html.svg"},
            {code: "MOBILE_HTML", name: i18nService.t('component.view.mobileHtml'), image: "mobile-html.svg"},

            {code: "LINK", name: i18nService.t('component.view.link'), image: "link.svg"},
            {code: "LINK_DIALOG", name: i18nService.t('component.view.linkDialog'), image: "link-dialog.svg"},
            {code: "DOWNLOAD", name: i18nService.t('component.view.download'), image: "download.svg"},
            {code: "ATTACHMENT", name: i18nService.t('component.view.attachment'), image: "attachment.svg"},
            {code: "OVR", name: i18nService.t('component.view.ovr'), image: "ovr.svg"},
            {code: "ATTACHMENT_DIALOG", name: i18nService.t('component.view.attachmentDialog'), image: "attachment-dialog.svg"},

            {code: "QR_CODE", name: i18nService.t('component.view.qrCode'), image: "qr.svg"},
            {code: "SWF", name: i18nService.t('component.view.swf'), image: "swf.svg"},
            {code: "CODE", name: i18nService.t('component.view.code'), image: "code.svg"},
            {code: "MAP", name: i18nService.t('component.view.map'), image: "map.svg"},
            {code: "BASE64", name: i18nService.t('component.view.base64'), image: "base64.svg"},
            {code: "MARKDOWN", name: i18nService.t('component.view.markdown'), image: "markdown.svg"},
        ];
    }
    
    updateTypes();
});
