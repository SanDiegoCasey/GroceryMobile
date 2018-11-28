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
  var $selectedUnit = $('#selectedUnit');


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
      $addPrice1.val(product.prices[0].price);
      $addPrice2.val(product.prices[1].price);
      $addPrice3.val(product.prices[2].price);
      $selectedUnit.val(product.size);
    }
  });

  $('#addItemButton').on('click', function(e) {
    e.preventDefault();
    var newProd = {
      sort: 'list',
      name: $addProductName.val(),
      size: $selectedUnit.val(),
      userID: userId,
      prices: [{
        price: $addPrice1.val()
      },
      {
        price: $addPrice2.val()
      },
      {
        price: $addPrice3.val()
      }
      ]
    };

    console.log(newProd);

    $.ajax({
      type: 'PUT',
      url: '/products/' + productID,
      data: newProd,
      success: function(newProd) {
        // alert(`${newProd.name} Updated!`);
        // console.log(newProd );
        window.location = 'list.html';
        //   $('#addProductName').reset();
        //   $('#addProductPrice1').reset();
        //   $('#addProductPrice2').reset();
        //   $('#addProductPrice3').reset();
      }
    });

  });

});
