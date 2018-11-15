'use strict';

$(function() {

    var $chooseStores = $('#currentStores');
    var $availableStores = $('#availableStores');

    $.ajax({
      type: 'GET',
      url: '/liststores',
      success: function(stores) {
        $.each(stores, function(i, store) {
          $chooseStores.append(`<div class="fav-store">
            <div class="fav-store-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
            </div>
            <div class="fav-store-name">
              ${store.name}
            </div>
            <div class="fav-store-add">
              <a href="#">remove</a>
            </div>
          </div>
            `);
        });
      }
    });

    $.ajax({
      type: 'GET',
      url: '/storedstores',
      success: function(stores) {
        $.each(stores, function(i, store) {
          $availableStores.append(`<div class="fav-store">
            <div class="fav-store-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
            </div>
            <div class="fav-store-name">
              ${store.name}
            </div>
            <div class="fav-store-add">
              <a href="#">add+</a>
            </div>
          </div>
            `);
        });
      }
    });

});
