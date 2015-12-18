(function() {
  "use strict";

  angular
    .module("grooves-app")
    .factory("userDataService", userDataService);

  userDataService.$inject = ["$log", "$http"];

  function userDataService($log, $http) {
    var user = {
      email:           "",
      password:        "",
      likes:           0,
      records:         [],
      create:          create,
      clear:           clear,
      currentUserData: currentUserData
    };


    return {
      user: user,
      allRecords: allRecords
    };

    function allRecords() {
      return $http({
        url: "https://agile-lowlands-5230.herokuapp.com/api/records",
        method: 'GET'
      });
    }

    function create() {
      $log.debug("Attempting to create:", user);

      return $http({
        url:     "https://agile-lowlands-5230.herokuapp.com/api/users",
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
        url:     "https://agile-lowlands-5230.herokuapp.com/api/me",
        method:  "GET"
      });
    }
  }

})();
