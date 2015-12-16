(function() {
  "use strict";

  angular
    .module("grooves-app")
    .controller("MainController", MainController);

  MainController.$inject = ["userDataService", "authService", "$log"];

  function MainController(userDataService, authService, $log) {
    var vm = this;

    vm.user = userDataService;
    vm.auth = authService;

    vm.message = "";

    vm.createUser = function() {
      vm.user.create()

      .then(function(data, status, headers, config) {
        $log.debug("Success:", data,status,headers,config)

        vm.message = angular.toJson(data.data.message);
        vm.user.clear();
      })

      .catch(function(data, status, headers, config) {
        $log.debug("Failure:", data,status,headers,config)
        vm.message = angular.toJson(data.data.message);
      });
    };

    vm.logInUser = function() {

      vm.auth.logIn()

      .then(function(data) {
        $log.debug("Success:", data)

        return vm.user.currentUserData();
      })

      .then(function(data) {
        $log.debug("Success:", data)

        vm.auth.clear();

        vm.message = angular.toJson(data.data.message);
      })

      .catch(function(data, status, headers, config) {
        $log.debug("Failure:", data, status, headers, config)

        vm.message = angular.toJson(data.data.message);
      });
    };
  }

})();
