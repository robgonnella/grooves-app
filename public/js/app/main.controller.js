(function() {
  "use strict";

  angular
    .module("grooves-app")
    .controller("MainController", MainController);

  MainController.$inject = ["userDataService", "authService", "$log", "cartDataService"];

  function MainController(userDataService, authService, $log, cartDataService) {

    var vm = this;
    vm.user = userDataService;
    vm.getCurrentUser = getCurrentUser;
    vm.auth = authService;
    vm.message = "";
    vm.allRecords = getAllRecords();
    vm.createUser = createUser;
    vm.logInUser = logInUser;
    vm.addToCart = cartDataService.add;
    vm.addRecord = addRecord;
    vm.updateRecord = updateRecord;
    vm.deleteRecord = deleteRecord;
    vm.selectRecord = selectRecord;
    vm.newRecord = {
      artist: "",
      album:  "",
      year:   "",
      label:  "",
      price:  "",
      description: ""
    };

    function selectRecord (record) {
      vm.selectedRecord = record;
    };

    function deleteRecord (record) {
      vm.user.deleteRecord(record, vm.currentUser._id)

      .then(function(data) {
        $log.debug("Successfully deleted record")
        getCurrentUser();
      })
      .catch(function(data, status, headers, config) {
        $log.debug("Fail", data, status, headers, config);
      });
    }

    function updateRecord (record) {
      vm.user.updateRecord(record, vm.currentUser._id)

      .then(function(data) {
        vm.addFormEdit = false;
        getCurrentUser();
      })
      .catch(function(data, status, headers, config) {
        $log.debug("Fail", data, status, headers, config);
      });
    }

    function addRecord() {
      // vm.currentUser.records.push(vm.newRecord);
      vm.user.saveNewRecord(vm.newRecord, vm.currentUser._id)

      .then(function(data) {
        vm.newRecord = "";
        vm.addForm = false;
        getCurrentUser();
      })
      .catch(function(data, status, headers, config) {
        $log.debug("Fail", data, status, headers, config);
      });
    }
    function getCurrentUser() {
      vm.user.currentUserData()

      .then(function(data) {
        vm.currentUser = data.data.data;
      })
      .catch(function(data, status, headers, config) {
        $log.debug("Fail", data, status, headers, config);
      });
    }

    //get all users records to display on home/landing page
    function getAllRecords() {
      if (vm.currentUser) {
        getCurrentUser()
        vm.user.allRecords()
        .then(function(data) {
          vm.allRecords = data.data;
        })
        .catch(function(data, status, headers, config) {
          $log.debug("Success:", data,status,headers,config)
        });
      } else {
          vm.user.allRecords()
          .then(function(data) {
            vm.allRecords = data.data;
          })
          .catch(function(data, status, headers, config) {
            $log.debug("Success:", data,status,headers,config)
          });
        }
    }

    function createUser() {

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

    function logInUser() {

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
