// 国际化服务
var i18n = {
    currentLang: 'zh-CN',
    translations: {},

    // 初始化：检测语言 + 异步加载 CSV，返回 Promise
    init: function () {
        var self = this;
        var savedLang = localStorage.getItem('erupt-lang');
        if (savedLang && (savedLang === 'zh-CN' || savedLang === 'en-US')) {
            this.currentLang = savedLang;
        } else {
            var browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
            this.currentLang = browserLang.startsWith('zh') ? 'zh-CN' : 'en-US';
        }
        return fetch('i18n.csv')
            .then(function (res) {
                return res.text();
            })
            .then(function (text) {
                self.translations = self._parseCsv(text);
            });
    },

    // RFC 4180 CSV 解析，返回 { key: [zh, en] }
    _parseCsv: function (text) {
        var result = {};
        var row = [], field = '', inQuote = false, i = 0, skipHeader = true;

        function flush() {
            row.push(field);
            field = '';
        }

        function commit() {
            if (skipHeader) {
                skipHeader = false;
                row = [];
                return;
            }
            if (row.length >= 3 && row[0]) result[row[0]] = [row[1], row[2]];
            row = [];
        }

        while (i < text.length) {
            var ch = text[i];
            if (inQuote) {
                if (ch === '"' && text[i + 1] === '"') {
                    field += '"';
                    i += 2;
                } else if (ch === '"') {
                    inQuote = false;
                    i++;
                } else {
                    field += ch;
                    i++;
                }
            } else if (ch === '"') {
                inQuote = true;
                i++;
            } else if (ch === ',') {
                flush();
                i++;
            } else if (ch === '\r' && text[i + 1] === '\n') {
                flush();
                commit();
                i += 2;
            } else if (ch === '\n') {
                flush();
                commit();
                i++;
            } else {
                field += ch;
                i++;
            }
        }
        if (field || row.length) {
            flush();
            commit();
        }
        return result;
    },

    // 获取翻译
    t: function (key, params) {
        var entry = this.translations[key];
        if (!entry) return key;
        var val = (this.currentLang === 'zh-CN' ? entry[0] : entry[1]) || entry[0] || key;
        if (params) {
            for (var p in params) val = val.replace('{{' + p + '}}', params[p]);
        }
        return val;
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
