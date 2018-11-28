'use strict';

$(function() {

  const loginUser = (username, password) => {
    console.log(`login user working ${username} and ${password}`);
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        const {authToken} = json;
        const {userId} = json;
        localStorage.setItem('token', authToken);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', username);
        window.location = '/store-add.html';
      })
      // .then(window.location = '/store-add.html')
      .catch(error => console.log(error));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    loginUser(username, password);
  }

  // function handleLogout(){
  //   localStorage.removeItem('token');
  //   window.location = 'index.html';
  // }
  //
  //
  // $('.logout').on('click', function(event) {
  //   event.preventDefault();
  //   handleLogout(event);
  // });

  var authTokenhas = localStorage.getItem('token');
  var userName = localStorage.getItem('userName');

  if(authTokenhas) {
    $('#personalizeindex').html(`<span class="loginstatusindex">Hi ${userName}! <a href="#" class="logout">logout</a></span>`);
  }

  $('#loginForm').on('submit', function(event) {
    event.preventDefault();
    handleSubmit(event);
  });
});
