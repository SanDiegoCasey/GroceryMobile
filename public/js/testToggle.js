'use strict';

$(function() {

  var $chooseStores = $('#currentStores');
  var $availableStores = $('#availableStores');
  var $addStoresToList = $('.addStoreToList');
  var $removeStoreFromList = $('.removeStoreFromList');


  $(document).on('click', '.removeStoreFromList', removeStore);
     function removeStore() {
      console.log(this);
      $.ajax({
        type: 'PUT',
        url: '/stores/' + $(this).data('_id'),
        data: {
          sort: 'bank'
        }
      }).done(function(response) {
        console.log(resonse);
      }).fail(function(response) {
        console.log("oops");
      });
    }

  $.ajax({
    type: 'GET',
    url: '/stores',
    success: function(stores) {
      $.each(stores, function(i, store) {
        if (store.sort === 'list') {
          $chooseStores.append(`<div class="fav-store">
            <div class="fav-store-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg">
            </div>
            <div class="fav-store-name">
              <span class="storeSpan">${store.name}</span>
              <span class="storeSpan">${store._id}</span>
              <button class="removeStoreFromList smallButton">remove</button>
            </div>
          </div>
            `)
        };
      });
    }
  });


});
