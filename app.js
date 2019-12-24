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
    $routeProvider.when('/:name', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/" + attr.name + ".html";
        },
        resolve: {
            load: function ($q, $route, $rootScope) {
                var deferred = $q.defer();
                var params = $route.current.params;
                var dependencies = [
                    'page/' + params.name + '.js'
                ];
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }
        }
    }).when('/:dir/:name', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/" + attr.dir + "/" + attr.name + ".html";
        }, resolve: {
            load: function ($q, $route, $rootScope) {
                var deferred = $q.defer();
                var params = $route.current.params;
                var dependencies = [
                    "page/" + params.dir + "/" + params.name + ".js"
                ];
                $script(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }
        }
    }).when('/', {
        templateUrl: function (attr) {
            toTemplate();
            return "page/home.html";
        }
    }).otherwise({
        redirectTo: '/'
    });

    function resoleLoad() {

    }
})