'use strict';

$(function() {

  var authTokenhas = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');

  if(!authTokenhas) {window.location='register.html';}

  // var $chooseStores = $('#currentStores');
  var $chooseStores = $('#currentStores');
  var $availableStores = $('#availableStores');
  var $previousStores = $('#previousStores');
  var $addStoresToList = $('.addStoreToList');
  var $removeStoreFromList = $('.removeStoreFromList');


  $.ajax({ // userStores List
    type: 'GET',
    url: '/stores/user/'+userId,
    success: function(stores) {
      let listStores = stores.filter( store => store.sort == 'list');
      let userStores = stores;
      localStorage.setItem('storeCount', listStores.length);
      localStorage.setItem('activeStores', JSON.stringify(userStores));
      $.each(stores, function(i, store) {
        if (store.sort == 'list'){
          $chooseStores.append(`<div class="fav-store" >
            <div class="fav-store-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
            </div>
            <div class="fav-store-name">
              <span class="storeSpan">${store.name}</span>
              <button class="removeStoreFromList smallButton" id="chooseStr"  name="${store._id}"  > remove </button>
            </div>
          </div>
            `);
        }
      });
    }
  });

  $.ajax({ // previousStores bank
    type: 'GET',
    url: '/stores/user/'+userId,
    success: function(stores) {
      // let listStores = stores.filter( store => store.sort == 'bank');
      // localStorage.setItem('storeCount', listStores.length);
      $.each(stores, function(i, store) {
        if (store.sort == 'bank'){
          $previousStores.append(`<div class="fav-store" >
          <div class="fav-store-img">
            <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
          </div>
          <div class="fav-store-name">
            ${store.name}
          </div>
          <div class="fav-store-add">
            <button class="addStoreButton smallButton" id="previousStores" name="${store._id}" > add + </button>
          </div>
        </div>
          `);
        }
      });
    }
  });

  $.ajax({ // availableStores
    type: 'GET',
    url: '/stores/',
    success: function(stores) {
      $.each(stores, function(i, store) {
        if(store.sort =='bank' && store.userID ==='global'){
          $availableStores.append(`<div class="fav-store" >
          <div class="fav-store-img">
            <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
          </div>
          <div class="fav-store-name">
            ${store.name}
          </div>
          <div class="fav-store-add">
            <button class="addStoreButton smallButton" id="availableStr" name="${store.name}" > add + </button>
          </div>
        </div>
          `);
        }
      });
    }
  });


  $(document).on('click', '#chooseStr', function(){ // currentStores

    let id = this.name;

    console.log(id);
    $.ajax({
      url: '/stores/remove/'+id,
      type: 'PUT',
      data:JSON.stringify({
        'sort':'bank'}),
      success: location.reload()
    });
  });

  $(document).on('click', '#previousStores', function(){ // previousStores
    let id = $(this).attr('name');
    let listStores = localStorage.getItem('storeCount');
    console.log('testing here');
    console.log(listStores);
    if(listStores >= 3){
      alert('You already have too many stores');
    } else {
      $.ajax({
        url: '/stores/add/'+id,
        type: 'PUT',
        data:JSON.stringify({
          'sort':'list'}),
        success: location.reload()
      });
    }
  });

  $(document).on('click', '#availableStr', function(e){ // this is the ADD FROM BANK
    let userStores = localStorage.getItem('activeStores');
    e.preventDefault();
    var newStore = {
      name: this.name,
      sort: 'list',
      userID: userId,
    };
    let listStores = localStorage.getItem('storeCount');
    if(userStores.includes(this.name)){
      alert(`${this.name} already exists!`);
    } else {
      if(listStores >= 3){
        alert('You already have too many stores');
      } else {
        $.ajax({
          type: 'POST',
          url: '/stores/user/' + userId,
          data: newStore,
          success: function(newStore) {
            alert(`${newStore.name} Added!`);
            console.log(newStore);
            location.reload();
          }
        });
      }

    }
  });
});
