(function() {
  "use strict";

  angular
    .module("grooves-app")
    .controller("MainController", MainController);

  MainController.$inject = ["userDataService", "authService", "$log"];

  function MainController(userDataService, authService, $log) {

    var vm = this;
    vm.user = userDataService.user;
    vm.currentUser = getCurrentUser() || '';
    vm.auth = authService;
    vm.message = "";
    vm.allRecords = collectAllRecords();

    function getCurrentUser() {
      userDataService.user.currentUserData()

      .then(function(data) {
        vm.currentUser = data.data.data;
      })
      .catch(function(data, status, headers, config) {
        $log.debug("Fail", data, status, headers, debug);
      });
    }

    //get all users records to display on home/landing page
    function collectAllRecords() {
      userDataService.allRecords()
      .then(function(data) {
        vm.allRecords = data.data;
      })
      .catch(function(data, status, headers, config) {
        vm.message = angular.toJson(data.data.message)
      });
    }

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
        vm.currentUserId = data.data.data._id;
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
