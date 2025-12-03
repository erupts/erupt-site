var host = "https://www.erupt.xyz/demo"

// var host = "http://127.0.0.1:9999"

function updateTitle() {
    document.title = i18n.t('nav.home') + " - Erupt";
}

function toTemplate() {
    window.scrollTo(0, 0);
}

var app = angular.module('app', [
    'ngRoute'
]).run(function ($rootScope) {
    $rootScope.year = new Date().getFullYear();
    $rootScope.showHeader = true;
    $rootScope.currentLang = i18n.getLang();
    updateTitle();

    $rootScope.$on('$routeChangeSuccess', function (eve, current, previous) {
        $rootScope.currRouter = current.$$route.originalPath;
    });
}).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: function (attr) {
            return "page/home.html";
        }
    }).when('/doc', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/doc/doc.html";
        }
    }).when('/module', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/extra/extra.html";
        }
    }).when('/contrast', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/contrast/contrast.html";
        }
    }).when('/component', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/component/component.html";
        }
    }).otherwise({
        redirectTo: '/'
    });
})

app.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}])

// 国际化过滤器
app.filter('i18n', function() {
    return function(key, params) {
        if (!key) return '';
        return i18n.t(key, params);
    };
})

// 国际化过滤器（HTML版本）
app.filter('i18nHtml', ['$sce', function($sce) {
    return function(key, params) {
        if (!key) return '';
        var translation = i18n.t(key, params);
        return $sce.trustAsHtml(translation);
    };
}])

// 国际化服务
app.service('i18nService', function() {
    return {
        t: function(key, params) {
            return i18n.t(key, params);
        },
        setLang: function(lang) {
            i18n.setLang(lang);
        },
        getLang: function() {
            return i18n.getLang();
        }
    };
})

app.service('dataService', function ($http) {
    return {
        eruptReq: function (path, data, callback) {
            $http({
                method: 'post',
                url: host + "/zeta-api/sql" + path,
                data: data && JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }).then(function (req) {
                callback(req.data.result);
            })
        }
    }


})
