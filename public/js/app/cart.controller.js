(function() {
  "use strict";

  angular
    .module("grooves-app")
    .controller("CartController", CartController);

  CartController.$inject = ["$log", "cartDataService"];

  function CartController ($log, cartDataService) {
    var vm = this;

    vm.cart = cartDataService;
    vm.list = vm.cart.list;
    vm.remove = vm.cart.remove;

  }

})();
