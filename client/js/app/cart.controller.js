(function() {
  "use strict";

  angular
    .module("grooves-app")
    .controller("CartController", CartController);

  CartController.$inject = ["$log", "cartDataService"];

  function CartController ($log, cartDataService) {
    var vm = this;

    cart = cartDataService;
    vm.list = cart.list;
    vm.remove = cart.remove;

  }

})();
