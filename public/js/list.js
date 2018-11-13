'use strict';

$(function() {

  var $groceryList = $('#groceryList');
  var $stores = $('#storesInList');

  $.ajax({
    type: 'GET',
    url: '/products',
    success: function(products) {
      $.each(products, function(i, product) {
        $groceryList.append(
          `<option value="${product._id}">${product.name} ${product.size}</option>`
        );
      });
    }
  });


  $.ajax({
    type: 'GET',
    url: '/stores',
    success: function(stores) {
      // if (stores.sort === 'list') {
      $.each(stores, function(i, store) {
        if (stores.sort === 'list'){
          $stores.append(`<div class="storelogo">
          				<img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo">
          			</div>`);
        }
      });
      // }
    }
  });

});
