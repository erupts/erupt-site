function toTemplate() {
    window.scrollTo(0, 0);
}

var app = angular.module('app', [
    'ngRoute'
]).run(function ($rootScope) {
    $rootScope.year = new Date().getFullYear();
}).config(function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
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
    }).when('/extra', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/extra.html";
        }
    }).otherwise({
        redirectTo: '/'
    });
})

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
    }]
})
