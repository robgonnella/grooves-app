(function() {
  "use strict";

  angular
    .module("grooves-app")
    .controller("MainController", MainController);

  MainController.$inject = ["userDataService", "authService", "$log", "$http", "cartDataService", "$scope"];

  function MainController(userDataService, authService, $log, $http, cartDataService, $scope) {

    var vm = this;
    vm.defaulRecordImage = './assets/45_rpm_record.png';
    vm.user = userDataService;
    vm.getCurrentUser = getCurrentUser;
    vm.currentUser = '';
    vm.auth = authService;
    vm.message = "";
    vm.getAllRecords = getAllRecords;
    vm.allRecords = [];
    vm.createUser = createUser;
    vm.logInUser = logInUser;
    vm.addToCart = cartDataService.add;
    vm.addRecord = addRecord;
    vm.updateRecord = updateRecord;
    vm.deleteRecord = deleteRecord;
    vm.selectRecord = selectRecord;
    vm.uploadImage = uploadImage;
    vm.newRecord = {
      artist: "",
      album:  "",
      year:   "",
      label:  "",
      price:  "",
      description: ""
    };

    getAllRecords();

    getCurrentUser();


    function selectRecord (record) {
      vm.selectedRecord = record;
    };

    $scope.showPreview = function(input){
      // console.log("WE MADE IT!")
      if( input.files && input.files[0] ){
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("preview").setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    }

    function uploadImage(user, record){
      var files = document.getElementById("file_input").files;
      var file = files[0];
      if(file == null){
        alert("No file selected.");
      } else{
          get_signed_request(file, user, record);
        }
    }

    function get_signed_request(file, user, record){
      $http.get("https://agile-lowlands-5230.herokuapp.com/sign_s3?file_name="+file.name+"&file_type="+file.type)
      .then(function(data){
        var response = angular.fromJson(data.data);
        $log.debug("RESPONSE -->", response)
        uploadFile(file, response.signed_request, response.image_url, user, record)

      })
      .catch(function(data, status, headers, config){
        $log.debug("Fail", data, status, headers, config);
        alert("Could not get signed URL.");
      });
    }

    function uploadFile(file, signed_request, url, user, record){
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", signed_request);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      // console.log("uploading to S3");
      xhr.send(file)
      xhr.onload = function() {
          if (xhr.status === 200) {
            // console.log("Load Success!")
            saveUrlInUserImageArray(user, record, url);
          }
      }
      xhr.onerror = function() {
          return alert("Could not upload file.");
      };
    }

    function saveUrlInUserImageArray(user, record, url){
      $http({
        method: "PUT",
        url: "https://agile-lowlands-5230.herokuapp.com/submit",
        data: { user: user, record: record, image_url: url }
      })
      .then(function(data){
        // console.log("DATA -->", data)
        // console.log("Successfully saved to DB!")
        vm.upload = false;
        document.location.reload();
      })
      .catch(function(data, status, headers, config){
        // console.log("Failed to save image to User/Record Image Array")
        $log.debug("Fail", data, status, headers, config);
      });
    }

    function deleteRecord (record) {
      vm.user.deleteRecord(record, vm.currentUser._id)

      .then(function(data) {
        $log.debug("Successfully deleted record")
        getCurrentUser();
      })
      .catch(function(data, status, headers, config) {
        $log.debug("Fail", data, status, headers, config);
      });
      getAllRecords();
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
      getAllRecords();
    }

    function addRecord() {

      vm.user.saveNewRecord(vm.newRecord, vm.currentUser._id)

      .then(function(data) {
        vm.newRecord = "";
        vm.addForm = false;
        getCurrentUser();
      })
      .catch(function(data, status, headers, config) {
        $log.debug("Fail", data, status, headers, config);
      });
      getAllRecords();
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

      vm.user.allRecords()
      .then(function(data) {
        vm.allRecords = data.data;
      })
      .catch(function(data, status, headers, config) {
        $log.debug("Success:", data,status,headers,config)
      });
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
