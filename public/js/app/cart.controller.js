(function() {
  "use strict";

  angular
    .module("grooves-app")
    .controller("CartController", CartController);

  CartController.$inject = ["$log", "cartDataService"];

  function CartController ($log, cartDataService) {
    var vm = this;
    vm.cart = cartDataService;
    // vm.list = vm.cart.list;
    vm.remove = vm.cart.remove;
    vm.total = totalCost;

    totalCost();

    function totalCost () {
      var total = 0
      vm.cart.list.forEach(function(item) {
        total = total + item.price;
      });
      return total;
    }
  }

})();
