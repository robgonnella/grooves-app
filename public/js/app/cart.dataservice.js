(function() {
  "use strict";

  angular
    .module("grooves-app")
    .factory("cartDataService", cartDataService);

  cartDataService.$inject = ["$log", '$window'];

  function cartDataService ($log, $window) {

    var list = [];

    var cart = {
      add: add,
      remove: remove,
      list: list
    };

    deserialize();

    return cart;


    function add (item) {
      console.log("Item -->", item)
      cart.list.push(item);
      serialize();
    }

    function remove (item) {
      cart.list = cart.list.filter(function (filteredItem) {
        return filteredItem._id != item._id
      });
      serialize();
    }

    function serialize() {
      $window.localStorage.setItem('gruvCart', angular.toJson(cart.list));
    }

    function deserialize() {
      var savedCart = $window.localStorage.getItem('gruvCart');
      if(savedCart) {
        cart.list = angular.fromJson(savedCart);
      }
    }
  }

})();
