(function() {
  "use strict";

  angular
    .module("grooves-app")
    .config(configure);

  configure.$inject = ["$httpProvider", "$stateProvider"];

  function configure($httpProvider, $stateProvider) {
    // console.log("Adding tokenSigningService interceptor.");
    $httpProvider.interceptors.push("tokenSigningService");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '../../templates/records.html'
      });
  }


})();
