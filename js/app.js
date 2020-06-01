(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
            toBuy.everythingBought = ShoppingListCheckOffService.everythingBought();
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService', '$interval'];

    function AlreadyBoughtController(ShoppingListCheckOffService, $interval) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

        $interval(function () {
            alreadyBought.nothingBought = ShoppingListCheckOffService.nothingBought();
        }, 300);
    }

    function ShoppingListCheckOffService() {
        var service = this;

        // List of shopping items
        var toBuyItems = [{
                quantity: '3',
                name: 'cookies'
            },
            {
                quantity: '7',
                name: 'donuts'
            },
            {
                quantity: '1 kg',
                name: 'chicken'
            },
            {
                quantity: '1 bag',
                name: 'rice'
            },
            {
                quantity: '2 packets',
                name: 'corn flakes'
            },
            {
                quantity: '3 bottles',
                name: 'coke'
            },
        ];
        var alreadyBoughtItems = [];

        service.buyItem = function (itemIndex) {
            var itemQuantity = toBuyItems[itemIndex].quantity;
            var itemName = toBuyItems[itemIndex].name;
            toBuyItems.splice(itemIndex, 1);
            alreadyBoughtItems.push({
                quantity: itemQuantity,
                name: itemName
            })
        };

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getAlreadyBoughtItems = function () {
            return alreadyBoughtItems;
        };

        service.everythingBought = function () {
            return toBuyItems.length == 0;
        }

        service.nothingBought = function () {
            return alreadyBoughtItems.length == 0;
        }
    }
})();
