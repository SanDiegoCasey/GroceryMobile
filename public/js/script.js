'use strict';

$(function() {

  var userName = localStorage.getItem('userName');

  function userHasLoggedIn() {
    const authToken = localStorage.getItem('token');
  }

  userHasLoggedIn();


  const protectedPage = () => {
    const authToken = localStorage.getItem('token');

    fetch('/api/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => response.json())
      .then(json => console.log(json))
      .catch(error => console.log(error));
  };

  function handleProtectedPage(event) {
    protectedPage();
  }

  $('.protected').on('click', function(event) {
    event.preventDefault();
    handleProtectedPage(event);
  });

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

});
