'use strict';

$(function() {

  const registerUserSuccess = (user) => ({
    type:'REGISTER_USER_SUCCESS',
    user
  });

  const registerUser = (username, password) => {
    console.log(`register user working ${username} and ${password}`);
    fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  function handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    registerUser(username, password);
  }


  $('#registerForm').on('submit', function(event) {
    event.preventDefault();
    handleSubmit(event);
  });







});
