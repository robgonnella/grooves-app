(function() {
  "use strict";

  angular
    .module("grooves-app")
    .factory("userDataService", userDataService);

  userDataService.$inject = ["$log", "$http"];

  function userDataService($log, $http) {
    var user = {
      email:           "taco@taco.com",
      password:        "12345",
      create:          create,
      clear:           clear,
      currentUserData: currentUserData
    };

    return user;

    function create() {
      $log.debug("Attempting to create:", user);

      return $http({
        url:     "http://localhost:3000/api/users",
        method:  "POST",
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({
          email:    user.email,
          password: user.password,
        })
      });
    }

    function clear() {
      $log.debug("Clearing user.");

      user.email    = "";
      user.password = "";
    }

    function currentUserData() {
      $log.debug("Retrieving current user data.");

      return $http({
        url:     "http://localhost:3000/api/me",
        method:  "GET"
      });
    }
  }

})();
