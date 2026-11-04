var host = "https://demo.erupt.xyz"

// var host = "http://127.0.0.1:9999"

function updateTitle() {
    document.title = i18n.t('nav.home') + " - Erupt";
}

function toTemplate() {
    window.scrollTo(0, 0);
}

var app = angular.module('app', [
    'ngRoute'
]).run(function ($rootScope, $timeout) {
    $rootScope.year = new Date().getFullYear();
    $rootScope.showHeader = true;
    $rootScope.currentLang = i18n.getLang();
    updateTitle();

    // header products: one list for the desktop panel and the mobile menu (label nav.<k>, line nav.sub.<k>)
    $rootScope.productGroups = [{
        t: 'nav.grp.ai', items: [
            {k: 'ai', r: '/ai'}, {k: 'aiclaw', r: '/ai-claw'}, {k: 'staff', r: '/ai-staff'}, {k: 'aidev', r: '/ai-dev'},
            {k: 'aicanvas', r: '/ai-canvas'}, {k: 'rag', r: '/ai-rag', b: 'NEW'}, {k: 'decision', r: '/ai-decision', b: 'NEW'}]
    }, {
        t: 'nav.grp.core', items: [
            {k: 'data', r: '/data'}, {k: 'cloud', r: '/cloud'}, {k: 'sdk', r: '/sdk', b: 'NEW'}, {k: 'config', r: '/config', b: 'NEW'},
            {k: 'atlas', r: '/atlas'}, {k: 'designer', r: '/designer', b: 'NEW'}, {k: 'sso', r: '/sso', b: 'NEW'}]
    }, {
        t: 'nav.grp.biz', items: [
            {k: 'flow', r: '/flow', b: 'PRO'}, {k: 'cube', r: '/cube', b: 'PRO'}, {k: 'tenant', r: '/tenant', b: 'PRO'}]
    }];
    $rootScope.productRoutes = [].concat.apply(['/pro'], $rootScope.productGroups.map(function (g) {
        return g.items.map(function (p) { return p.r; });
    }));

    // the panel opens on click, or after a short hover; it stays open while the pointer is over trigger or panel
    var prodTimer;
    $rootScope.prodOpen = false;
    $rootScope.prodHover = function (open) {
        $timeout.cancel(prodTimer);
        prodTimer = $timeout(function () { $rootScope.prodOpen = open; }, open ? 90 : 220);
    };
    // a click right after hover-open must not close it again; clicking an already settled panel closes it
    var openedAt = 0;
    $rootScope.$watch('prodOpen', function (v) { if (v) openedAt = Date.now(); });
    $rootScope.prodToggle = function () {
        $timeout.cancel(prodTimer);
        $rootScope.prodOpen = !$rootScope.prodOpen || Date.now() - openedAt < 600;
    };
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && $rootScope.prodOpen) $rootScope.$apply(function () { $rootScope.prodOpen = false; });
    });

    // product sub-bar: the current page's group, plus previous / next across every product
    var allProducts = [].concat.apply([], $rootScope.productGroups.map(function (g) {
        return g.items.map(function (p) { return {p: p, g: g}; });
    }));

    $rootScope.$on('$routeChangeSuccess', function (eve, current, previous) {
        var route = $rootScope.currRouter = current.$$route.originalPath;
        $rootScope.prodOpen = false;
        var i = allProducts.findIndex(function (x) { return x.p.r === route; }), n = allProducts.length;
        $rootScope.prodCur = i < 0 ? null : {
            g: allProducts[i].g,
            prev: allProducts[(i + n - 1) % n].p,
            next: allProducts[(i + 1) % n].p
        };
    });
}).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/home.html";
        }
    }).when('/flow', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/flow/flow.html";
        },
        controller: 'flow'
    }).when('/cloud', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/cloud/cloud.html";
        }
    }).when('/data', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/data/data.html";
        }
    }).when('/architecture', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/architecture/architecture.html";
        }
    }).when('/contrast', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/contrast/contrast.html";
        }
    }).when('/ai', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/ai/ai.html";
        }
    }).when('/ai-canvas', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/ai-canvas/ai-canvas.html";
        }
    }).when('/ai-claw', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/ai-claw/ai-claw.html";
        }
    }).when('/ai-dev', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/ai-dev/ai-dev.html";
        }
    }).when('/ai-staff', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/ai-staff/ai-staff.html";
        }
    }).when('/tenant', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/tenant/tenant.html";
        }
    }).when('/atlas', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/atlas/atlas.html";
        }
    }).when('/config', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/config/config.html";
        }
    }).when('/designer', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/designer/designer.html";
        }
    }).when('/sdk', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/sdk/sdk.html";
        }
    }).when('/sso', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/sso/sso.html";
        }
    }).when('/ai-rag', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/ai-rag/ai-rag.html";
        }
    }).when('/ai-decision', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/ai-decision/ai-decision.html";
        }
    }).when('/cube', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/cube/cube.html";
        }
    }).when('/pro', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/pro/pro.html";
        }
    }).when('/about', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/about/about.html";
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

app.filter('i18n', function() {
    return function(key, params) {
        if (!key) return '';
        return i18n.t(key, params);
    };
})

app.filter('i18nHtml', ['$sce', function($sce) {
    return function(key, params) {
        if (!key) return '';
        var translation = i18n.t(key, params);
        return $sce.trustAsHtml(translation);
    };
}])

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
