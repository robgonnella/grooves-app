(function() {
  "use strict";

  angular
    .module("grooves-app")
    .factory("cartDataService", cartDataService);

  cartDataService.$inject = ["$log", '$window'];

  function cartDataService ($log, $window) {
    this.list = [];

    var cart = {
      add: add,
      remove: remove,
      list: this.list
    };

    deserialize();

    return cart;


    function add (item) {
      this.list.push(item);
      serialize();
    }

    function remove (item) {
      this.list = this.list.filter(function (filteredItem) {
        return filteredItem._id != item._id
      });
      serialize();
    }

    function serialize() {
      $window.localStorage.setItem('gruvCart', angular.toJson(this.list));
    }

    function deserialize() {
      var savedCart = $window.localStorage.getItem('gruvCart');
      if(savedCart) {
        this.list = angular.fromJson(savedCart);
      }
    }
  }

})();
