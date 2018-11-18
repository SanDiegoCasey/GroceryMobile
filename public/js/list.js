'use strict';

$(function() {

var authTokenhas = localStorage.getItem('token');
var userId = localStorage.getItem('userId');
if(!authTokenhas) {window.location="register.html"}

  var $groceryList = $('#groceryList');
  var $stores = $('#storesInList');

  var $products = $('#productsInList');
  var $stores = $('#storesInList');

  var $addProducts = $('#storeLogoProductAdd');
  var $chooseStores = $('#currentStores');
  var $availableStores = $('#availableStores');
  var $addProductName = $('#addProductName');
  var $addProductUnit = $('#addProductUnit');
  var $addPrice1 = $('#addProductPrice1');
  var $addPrice2 = $('#addProductPrice2');
  var $addPrice3 = $('#addProductPrice3');

  $('#addFromBank').on('click', function(e){
    e.preventDefault();
    let activeProd = $('#groceryList').val()

    $.ajax({
      type: 'PUT',
      url: '/products/' + activeProd,
      data: JSON.stringify({
        "sort": "list",
        "_id": activeProd,
      }),
      contentType: 'application/json',
      // headers:{
      //   'X-CSRF-TOKEN': localstorage.getItem()
      // },
      success: function(product) {
        $groceryList.find(`[value="${product._id}"]`).remove();
        $products.append(resultProduct(product));
      }
    })
  });

  $.ajax({
    type: 'GET',
    url: '/products',
    data: {
      userId: userId
    },
    success: function(products) {
      $.each(products, function(i, product) {
        if (product.sort !== 'list') {
          $groceryList.append(
            `<option value="${product._id}">${product.name} ${product.size}</option>`
          );
        }
      });
    }
  });


  $.ajax({
    type: 'GET',
    url: '/stores',
    success: function(stores) {
      // if (stores.sort === 'list') {
      $.each(stores, function(i, store) {
        if (store.sort === 'list') {
          $stores.append(`<div class="storelogo">
          				<img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo">
          			</div>`);
        }
      });
      // }
    }
  });

  $.ajax({
    type: 'GET',
    url: '/products',
    data: {
      userId: userId
    },
    success: function(products) {
      $.each(products, function(i, product) {
        if (product.sort === 'list') {
          $products.append(resultProduct(product));
        }
      });
    },
    error: function() {
      // alert('error with this dealio');
    }
  });
});

function resultProduct(product) {
  return `<div class="result-row">
            <div class="checkboxes">
              <div class="checkedoff">
                <form action="#" method="get">
                  <input type="checkbox" id="deleterow" name="prodchecked">
                </form>
              </div>
              <div class="deleterow">
                <img src="images/icons/icon-delete.png" alt="">
              </div>
            </div>
            <div class="productdescription">
              <div class="productname">${product.name}</div>
              <div class="productsize">${product.size}</div>
            </div>
            <div class="price">$${product.prices[0].price}</div>
            <div class="price">$${product.prices[1].price}</div>
            <div class="price">$${product.prices[2].price}</div>
            <div class="storeEnd"><a href="product-edit.html"><img src="images/icons/icon-edit-pencil-clear.png" width="20px"></a></div>
          </div>`
}
