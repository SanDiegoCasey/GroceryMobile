'use strict';

$(function() {

  var authTokenhas = localStorage.getItem('token');

  if(!authTokenhas) {window.location="register.html"}

    var $chooseStores = $('#currentStores');
    var $availableStores = $('#availableStores');
    var $addStoresToList = $('.addStoreToList');
    var $removeStoreFromList = $('.removeStoreFromList');



$(document).on('click', '.addStoreButton', function(){
let active = $(this.body.name);
console.log(active);
});

$(document).on('click', '.removeStoreFromList', function(){
let id = $(this).attr('data-id')
$.ajax({
  url: '/stores/' + id,
  type: 'PUT'
})
});

function storeAddFun(data){
  console.log(data);
}

    $.ajax({
      type: 'GET',
      url: '/stores',
      success: function(stores) {
        $.each(stores, function(i, store) {
          if (store.sort === 'list'){
          $chooseStores.append(`<div class="fav-store">
            <div class="fav-store-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
            </div>
            <div class="fav-store-name">
              <span class="storeSpan">${store.name}</span>
              <button class="removeStoreFromList smallButton">remove</button>
            </div>
          </div>
            `)
          };
        });
      }
    });

    $.ajax({
      type: 'GET',
      url: '/stores',
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
              <button class="addStoreButton smallButton">add+</button>
            </div>
          </div>
            `);
        });
      }
    });

});
