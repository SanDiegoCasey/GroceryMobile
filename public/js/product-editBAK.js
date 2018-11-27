'use strict';
$(function() {

  var authTokenhas = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');
  var productID = localStorage.getItem('editProduct');

  if (!authTokenhas) {
    window.location = 'register.html';
  }
  var $addProducts = $('#storeLogoProductAdd');
  var $editProdName = $('#editProdName');
  var $groceryList = $('#groceryList');
  var $addProducts = $('#storeLogoProductAdd');
  var $products = $('#productsInList');
  var $stores = $('#storesInList');
  var $chooseStores = $('#currentStores');
  var $availableStores = $('#availableStores');
  var $addProductName = $('#addProductName');
  var $addProductUnit = $('#addProductUnit');
  var $addPrice1 = $('#addProductPrice1');
  var $addPrice2 = $('#addProductPrice2');
  var $addPrice3 = $('#addProductPrice3');


  $.ajax({
    type: 'GET',
    url: '/stores/user/' + userId,
    success: function(stores) {
      $.each(stores, function(i, store) {
        if (store.sort === 'list') {
          $addProducts.append(`<span class="storeProductLogo"><img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo"></span>`);
        }
      });
    }
  });

  $.ajax({
    type: 'GET',
    url: '/products/' + productID,
    success: function(product) {
      console.log(productID);
      $editProdName.append(`${product.name}`);
    }
  });

});
