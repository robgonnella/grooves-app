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
      currentUserData: currentUserData,
      saveNewRecord:   saveNewRecord,
      allRecords:      allRecords,
      updateRecord:    updateRecord,
      deleteRecord:    deleteRecord
    };


    return user;

    function deleteRecord (record, userId) {
      $log.debug(record)
      return $http({
        url: "http://localhost:3000/api/users/"+userId+"/records/"+record._id,
        headers: {"Content-Type": "application/json"},
        method: "DELETE",
        data: angular.toJson({record: record})
      })
    }

    function updateRecord (record, userId) {
      $log.debug(record);
      return $http({
        url:     "http://localhost:3000/api/users/"+userId+"/records/"+record._id,
        method:  "PUT",
        headers: {"Content-Type": "application/json"},
        data:    angular.toJson({record:record})
      })
    }


    function saveNewRecord (record, id) {
      return $http ({
        url: "http://localhost:3000/api/users/"+id+"/records",
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        data: angular.toJson({record:record})
      })
    }

    function allRecords() {
      return $http({
        url: "http://localhost:3000/api/records",
        method: 'GET'
      })
    }


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
      })
    }
  }

})();
