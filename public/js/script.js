'use strict';

$(function() {

  var userName = localStorage.getItem('userName');

  var authTokenhas = localStorage.getItem('token');

  if(authTokenhas) {
    $('#personalize').html(`<span class="loginstatus">Hi ${userName}! <a href="#" class="logout">logout</a></span>`);
  } else {
    $('#personalize').html('<span class="loginstatus"><a href="index.html">Login</a></span>');
  }

  function handleLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('activeProducts');
    localStorage.removeItem('activeStores');
    localStorage.removeItem('editProduct');
    localStorage.removeItem('storeCount');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    window.location = 'index.html';
  }


  $('.logout').on('click', function(event) {
    event.preventDefault();
    handleLogout(event);
  });

  $('.logoutindex').on('click', function(event) {
    event.preventDefault();
    handleLogout(event);
  });
  
});
