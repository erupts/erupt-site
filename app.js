var host = "https://www.erupt.xyz/demo"

// var host = "http://127.0.0.1:9999"

document.title = "Erupt 通用数据管理框架"

function toTemplate() {
    window.scrollTo(0, 0);
}

var app = angular.module('app', [
    'ngRoute'
]).run(function ($rootScope) {
    $rootScope.year = new Date().getFullYear();
    $rootScope.showHeader = true;

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
