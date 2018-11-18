'use strict';

$(function() {

  var authTokenhas = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');

  if(!authTokenhas) {window.location="register.html"}

    var $chooseStores = $('#currentStores');
    var $availableStores = $('#availableStores');

  $(document).on('click', '.addStoreButton', function() {
    let id = $(this).parent().parent().attr('id'),
      storeId = id.split('-').pop();

    $.ajax({
      url: '/stores/' + storeId,
      type: 'PUT',
      data: JSON.stringify({
        "sort": "list",
        "_id": storeId,
      }),
      contentType: 'application/json',
      success: function(store) {
        $availableStores.find(`[id="fav-store-${store._id}"]`).remove();
        $chooseStores.append(chooseStore(store));
      }
    })
  });

  $(document).on('click', '.removeStoreFromList', function() {
    let id = $(this).parent().parent().attr('id'),
      storeId = id.split('-').pop();

    $.ajax({
      url: '/stores/' + storeId,
      type: 'PUT',
      data: JSON.stringify({
        "sort": "bank",
        "_id": storeId,
      }),
      contentType: 'application/json',
      success: function(store) {
        $chooseStores.find(`[id="fav-store-${store._id}"]`).remove();
        $availableStores.append(availableStores(store));
      }
    })
  });

  $.ajax({
    type: 'GET',
    url: '/stores',
    data: {
      userId: userId
    },
    success: function(stores) {
      $.each(stores, function(i, store) {
        if (store.sort === 'list') {
          $chooseStores.append(chooseStore(store))
        };
      });
    }
  });

  $.ajax({
    type: 'GET',
    url: '/stores',
    data: {
      userId: userId
    },
    success: function(stores) {
      $.each(stores, function(i, store) {
        if (store.sort === 'bank') {
          $availableStores.append(availableStores(store));
        }
      });
    }
  });
});

function chooseStore(store) {
  return `<div class="fav-store" id="fav-store-${store._id}">
            <div class="fav-store-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
            </div>
            <div class="fav-store-name">
              <span class="storeSpan">${store.name}</span>
              <button class="removeStoreFromList smallButton">remove</button>
            </div>
          </div>
          `
}

function availableStores(store) {
  return `<div class="fav-store" id="fav-store-${store._id}">
            <div class="fav-store-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
            </div>
            <div class="fav-store-name">
              ${store.name}
            </div>
            <div class="fav-store-add">
              <button class="addStoreButton smallButton">add+</button>
            </div>
          </div>
          `
}
