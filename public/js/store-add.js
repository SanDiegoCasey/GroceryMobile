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
      if(listStores.length > 2){
        $('.invisible').css({
          display: 'block',
          visibility: 'visible'
        });
      }
      let userStores = stores;
      localStorage.setItem('storeCount', listStores.length);
      localStorage.setItem('activeStores', JSON.stringify(userStores));
      $.each(stores, function(i, store) {
        if (store.sort == 'list'){
          $chooseStores.append(`<div class="fav-store" >
            <div class="fav-store-img">
              <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo">
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
            <!--<div id="deletestorebutton">delete</div>-->
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

  // $('#previousStores').on('click', function(e) {
  $(document).on('click', '#previousStores', function(e){
    e.preventDefault();
    let id = $(this).attr('name');
    let listStores = localStorage.getItem('storeCount');
    console.log('testing here');
    console.log(listStores);
    if(listStores >= 3){
      swal('Sorry, only 3 stores at a time, try removing one.');
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
      swal(`${this.name} already exists!`);
    } else {
      if(listStores >= 3){
        swal('You already have 3 stores, try removing one.');
      } else {
        $.ajax({
          type: 'POST',
          url: '/stores/user/' + userId,
          data: newStore,
          success: function(newStore) {
            // setTimeout(function(){swal(`${newStore.name} Added!`);},3000);
            console.log(newStore);
            location.reload();
          }
        });
      }

    }
  });

  $(document).on('click', '#gotolist', function(e){
    e.preventDefault();
    window.location='list.html';
  });

  $(document).on('click', '#deletestorebutton', function(){ // previousStores
    let id = $(this).attr('name');
    console.log(id);
    $.ajax({
      url: '/stores/'+id,
      type: 'DELETE',
      success: function(){
        console.log('should delete');
      }
      // success: location.reload()
    });
  });
});
