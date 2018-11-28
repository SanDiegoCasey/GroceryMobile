'use strict';

$(function() {
  var authTokenhas = localStorage.getItem('token');
  var userId = localStorage.getItem('userId');
  // var userID = localStorage.getItem('userId');

  if (!authTokenhas) {
    window.location = 'register.html';
  }

  var $groceryList = $('#groceryList');
  var $stores = $('#storesInList');
  var $addProducts = $('#storeLogoProductAdd');
  var $products = $('#productsInList');
  var $stores = $('#storesInList');

  var $addProducts = $('#storeLogoProductAdd');
  var $chooseStores = $('#currentStores');
  var $availableStores = $('#availableStores');
  var $addProductName = $('#addProductName');
  var $addProductUnit = $('#addProductUnit');
  var $addPrice1 = $('#addProductPrice1');
  var $addPrice2 = $('#addProductPrice2');
  var $addPrice3 = $('#addProductPrice3');


  $.ajax({
    type: 'GET',
    url: '/stores/user/' + userId,
    success: function(stores) {
      $.each(stores, function(i, store) {
        if (store.sort === 'list') {
          $addProducts.append(`<span class="storeProductLogo"><img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo"></span>
            `);
        }
      });
    }
  });

  $('#addItemButton').on('click', function(e) {
    e.preventDefault();
    var newProd = {
      sort: 'list',
      name: $addProductName.val(),
      size: $addProductUnit.val(),
      userID: userId,
      prices: [{
        price: $addPrice1.val()
      },
      {
        price: $addPrice2.val()
      },
      {
        price: $addPrice3.val()
      }
      ]
    };

    console.log(newProd);

    $.ajax({
      type: 'POST',
      // url: '/products/user/'+userId,
      url: '/products/user/' + userId,
      data: newProd,
      success: function(newProd) {
        // swal(`${newProd.name} Added!`);
        console.log(newProd );
        // setTimeout(function(){window.location = 'list.html';},1500);
        window.location = 'list.html';
        //   $('#addProductName').reset();
        //   $('#addProductPrice1').reset();
        //   $('#addProductPrice2').reset();
        //   $('#addProductPrice3').reset();
      }
    });

  });


  // Calculator Section
  $('.submit-calc').click(function(e) {
    let selected = $('#conversion-selector option:selected').val();
    let qty = $('#unitQty').val();
    let prc = $('#price').val();
    let perOz = (prc / qty).toFixed(2);
    let perLb = ((prc / qty) * 16).toFixed(2);
    let perLbByLb = (prc / qty).toFixed(2);
    let perOzByLb = (prc / (qty * 16)).toFixed(2);
    let perLtByLt = (prc / qty).toFixed(2);
    let perGaByLt = (prc / (qty * .2641720524)).toFixed(2);
    let perGaByOz = ((prc / qty) * 128).toFixed(2);
    let perGaByQt = (prc / (qty / 4)).toFixed(2);
    let perQtByQt = (prc / qty).toFixed(2);
    let perQtByLt = (prc / (qty / .946353)).toFixed(2);
    let perLtByQt = (prc / (qty * .946353)).toFixed(2);
    let perEaByEa = (prc / qty).toFixed(2);
    let perGaByGa = (prc / qty).toFixed(2);
    let perQtByGa = (prc / (qty * 4)).toFixed(2);
    let perLtByGa = (prc / ((qty * 4) * .946353)).toFixed(2);
    let perOzByGa = (prc / (qty * 128)).toFixed(2);
    let perLtByOz = (prc / (qty / 33.814)).toFixed(2);
    let perQtByOz = (prc / (qty / 32)).toFixed(2);


    e.preventDefault();
    document.getElementById('unit-result').innerHTML = '';
    if (selected === 'oz') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perOz}</span> per ounce<br>\
      <span class="computed-price">$${perLb}</span> per pound<br>\
      <span class="computed-price">$${perLtByOz}</span> per Liter<br>\
      <span class="computed-price">$${perQtByOz}</span> per Quart<br>\
      <span class="computed-price">$${perGaByOz}</span> per Gallon<br>`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
    } else if (selected === 'lbs') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perLbByLb}</span> per pound<br>\
        <span class="computed-price">$${perOzByLb}</span> per ounce`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
      // return false;
    } else if (selected === 'each') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perEaByEa}</span> per each`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
      // return false;
    } else if (selected === 'Liter') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perLtByLt}</span> per liter<br>\
      <span class="computed-price">$${perQtByLt}</span> per Quart<br>\
        <span class='computed-price'>$${perGaByLt}</span> per Gallon`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
      // return false;
    } else if (selected === 'Quart') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perQtByQt}</span> per Quart<br>\
      <span class="computed-price">$${perGaByQt}</span> per Gallon<br>\
        <span class='computed-price'>$${perLtByQt}</span> per Liter`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
      // return false;
    }else if (selected === 'Gallon') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perGaByGa}</span> per Gallon<br>\
        <span class="computed-price">$${perQtByGa}</span> per Quart<br>\
        <span class='computed-price'>$${perLtByGa}</span> per Liter<br>\
        <span class='computed-price'>$${perOzByGa}</span> per Ounce`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
      // return false;
    }

  });
});
