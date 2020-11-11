// var host = "https://www.erupt.xyz/demo"
var host = "http://localhost:9999";

function toTemplate() {
    window.scrollTo(0, 0);
}

var app = angular.module('app', [
    'ngRoute'
]).run(function ($rootScope) {
    $rootScope.year = new Date().getFullYear();
    $rootScope.showHeader = true;
}).config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: function (attr) {
            toTemplate();
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
            return "page/module.html";
        }
    }).when('/contrast', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/contrast/contrast.html";
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

app.controller("extra", function ($scope) {
    $scope.modules = [{
        name: 'erupt-bi',
        desc: '数据分析模块'
    }, {
        name: 'erupt-job',
        desc: '任务调度模块'
    }, {
        name: 'erupt-tpl',
        desc: '嵌入式模板模块'
    }, {
        name: 'erupt-mongodb',
        desc: '使用erupt管理mongodb数据'
    }]
})

app.service('dataService', function ($http) {
    return {
        eruptReq: function (path, data, callback) {
            $http({
                method: 'post',
                url: host + "/zeta-api/sql" + path,
                data: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }).then(function (req) {
                callback(req.data.result);
            })
        }
    }


})
