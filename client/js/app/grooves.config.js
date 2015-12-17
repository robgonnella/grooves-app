(function() {
  "use strict";

  angular
    .module("grooves-app")
    .config(configure);

  configure.$inject = ["$httpProvider", "$stateProvider", "$urlRouterProvider"];

  function configure($httpProvider, $stateProvider, $urlRouterProvider) {
    // console.log("Adding tokenSigningService interceptor.");
    $httpProvider.interceptors.push("tokenSigningService");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/allrecords.html'
      })

      .state('account', {
        url: '/user/records',
        templateUrl: 'templates/userrecords.html'
      })

      .state('record', {
        url: '/record',
        templateUrl: 'templates/record.html'
      })

      .state('cart', {
        url: '/cart',
        templateUrl: 'templates/cart.html'
      });

    $urlRouterProvider.otherwise("/");
  }


})();
