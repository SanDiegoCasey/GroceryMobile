'use strict';

$(function() {

  var authTokenhas = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');
  if (!authTokenhas) {
    window.location = 'register.html';
  }

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




  $.ajax({
    type: 'GET',
    url: '/products/user/' + userId,
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
    url: '/stores/user/' + userId,
    success: function(stores) {
      if(stores.length < 1){swal('You\'re new here! You need to add some stores!');setTimeout(function(){window.location = 'store-add.html';},3000);} else if (stores.length === 1){swal('ya only got one store');} else {
        $.each(stores, function(i, store) {
          if (store.sort === 'list') {
            $stores.append(`<div class="storelogo">
          				<img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo">
          			</div>`);
          }
        });
      }
    }
  });

  $.ajax({
    type: 'GET',
    url: '/products/user/' + userId,
    success: function(products) {
      localStorage.setItem('activeProducts', JSON.stringify(products));
      $.each(products, function(i, product) {
        if (product.sort === 'list') {
          $products.append(`
            <div class="result-row">
                <div class="checkboxes">
                    <div class="checkedoff">
                      <form action="#" method="get">
                        <input type="checkbox" id="deleterow" name="prodchecked" />
                      </form>
                    </div>
                    <div class="deleterow" id='removerow' name="${product._id}">
                      <img src="images/icons/icon-delete.png" alt="delete button"  />
                    </div>
                </div>
                <div class="productdescription">
                    <div class="productname">${product.name}</div>
                    <div class="productsize">${product.size}</div>
                </div>
                <div class="price">$${product.prices[0].price}</div>
                <div class="price">$${product.prices[1].price}</div>
                <div class="price">$${product.prices[2].price}</div>
                <div class="storeEnd"><img src="images/icons/icon-edit-pencil-clear.png" name="${product._id}" id="editproduct" width="20px"/>
                </div>
            </div>`);
        }
      });
    },
    error: function() {
    }
  });

  $(document).on('click', '#editproduct', function() { // checkbox
    let editable = $(this).attr('name');
    localStorage.setItem('editProduct', editable);
    window.location = 'product-edit.html';
  });

  $(document).on('click', '#deleterow', function() { // checkbox

    $(this).parent().parent().parent().siblings().toggleClass('checked');
    $(this).parent().parent().parent().siblings().children().toggleClass('checked');
    $(this).parent().parent().siblings().toggleClass('deleterow');
  });

  $(document).on('click', '#removerow', function() { // checkbox
    let id = $(this).attr('name');
    console.log(id);
    $(this).parent().parent().parent().siblings().toggleClass('checked');
    $(this).parent().parent().parent().siblings().children().toggleClass('checked');
    $.ajax({
      url: '/products/add/' + id,
      type: 'PUT',
      data: JSON.stringify({
        'sort': 'bank'
      }),
      success: location.reload()
    });
  });

  $(document).on('click', '#addFromBank', function() {
    let id = $('#groceryList').val();
    console.log(id);
    $.ajax({
      type: 'PUT',
      url: '/products/remove/' + id,
      data: JSON.stringify({
        'sort': 'list'
      }),
      success: location.reload()
    });
  });
});




// 'use strict';
//
// $(function() {
//
//   var $groceryList = $('#groceryList');
//   var $stores = $('#storesInList');
//
//   $.ajax({
//     type: 'GET',
//     url: '/products',
//     success: function(products) {
//       $.each(products, function(i, product) {
//         $groceryList.append(
//           `<option value="${product._id}">${product.name} ${product.size}</option>`
//         );
//       });
//     }
//   });
//
//
//   $.ajax({
//     type: 'GET',
//     url: '/stores',
//     success: function(stores) {
//       // if (stores.sort === 'list') {
//       $.each(stores, function(i, store) {
//         if (stores.sort === 'list'){
//           $stores.append(`<div class="storelogo">
//           				<img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo">
//           			</div>`);
//         }
//       });
//       // }
//     }
//   });
//
// });
