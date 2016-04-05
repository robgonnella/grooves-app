(function() {
  "use strict";

  angular
    .module("grooves-app")
    .factory("tokenSigningService", tokenSigningService);

  tokenSigningService.$inject = ["tokenService", "$log"];

  function tokenSigningService(tokenService, $log) {
    return {
      request: signWithToken
    };

    function signWithToken(request) {
      var token = tokenService.get();
      var match1 = /sign_s3/gmi;
      var match2 = /s3.amazonaws/gmi
      var isS3check1 = match1.test(request.url);
      var isS3check2 = match2.test(request.url);
      var isS3 = isS3check1 || isS3check2 ? true : false;
      if (token && !isS3) {
        $log.debug("Token exists; signing request.");
        request.headers['Authorization'] = `Bearer ${token}`;
      }

      return request;
    }
  }

})();
