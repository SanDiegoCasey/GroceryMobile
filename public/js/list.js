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



  // get user items that are not on the list to populate drop down
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

  // get 3 stores that user has chosen send to store page if not 3
  $.ajax({
    type: 'GET',
    url: '/stores/user/' + userId,
    success: function(stores) {
      if (stores.length < 1) {
        window.location = 'store-add.html';
      } else {
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

  // check to see if user has any products yet, prompt if they don't.
  $.ajax({
    type: 'GET',
    url: '/products/user/' + userId,
    success: function(products) {
      if (products.length < 1) {
        swal(`You need to add some products!

          Click the NEW+ button to add your first product to your list.

          If you remove a product from the list, it will go to your saved items drop down.`);
      }
    }
  });

  // Getting items to populate list
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
                <div class="storeEnd"><a href="#"><img src="images/icons/icon-edit-pencil-clear.png" name="${product._id}" id="editproduct" width="20px"/></a>
                </div>
            </div>`);
        }
      });
    },
    error: function() {}
  });

  // checkbox
  $(document).on('click', '#editproduct', function() {
    let editable = $(this).attr('name');
    localStorage.setItem('editProduct', editable);
    window.location = 'product-edit.html';
  });

  // gray out item using the checkbox
  $(document).on('click', '#deleterow', function() {
    $(this).parent().parent().parent().siblings().toggleClass('checked');
    $(this).parent().parent().parent().siblings().children().toggleClass('checked');
    $(this).parent().parent().siblings().toggleClass('deleterow');
  });

  // remove the row with the item from the list and put back into stored drop down
  $(document).on('click', '#removerow', function() { // checkbox
    let id = $(this).attr('name');
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

  // add items from drop down to list
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
