'use strict';

$(function() {

  var authTokenhas = localStorage.getItem('token');

  if(!authTokenhas) {window.location="register.html"}

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
      url: '/stores',
      success: function(stores) {
        $.each(stores, function(i, store) {
          if (store.sort === 'list'){
          $addProducts.append(`<span class="storeProductLogo"><img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo"></span>
            `);
          }
        });
      }
    });

  $('#addItemButton').on('click', function(e) {
    e.preventDefault();
    var newProd = {
      sort: "list",
      name: $addProductName.val(),
      size: $addProductUnit.val(),
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
    }

    console.log(newProd);

    $.ajax({
      type: 'POST',
      url: '/products',
      data: newProd,
      success: function(newProd) {
        alert(`${newProd.name} Added!`);
        console.log(`${newProd} created`);
        // $('#addProductName').reset();
        // $('#addProductPrice1').reset();
        // $('#addProductPrice2').reset();
        // $('#addProductPrice3').reset();
      }
    });

  });


  // Calculator Section
  $('.submit-calc').click(function(e) {
    let selected = $('#conversion-selector option:selected').val();
    let qty = $('#unitQty').val();
    let prc = $('#price').val();
    console.log(selected);
    console.log(qty);
    console.log(prc);
    let perOz = (prc / qty).toFixed(2);
    console.log(perOz);
    let perLb = (perOz * 16).toFixed(2);
    console.log(perLb);
    let perLbByLb = (prc / qty).toFixed(2);
    let perOzByLb = (prc / (qty * 16)).toFixed(2);
    let perLtByOz = (prc / (qty / 33.814)).toFixed(2);
    let perGByLb = ((prc / qty) * 453.592).toFixed(2);
    let perGaByOz = ((prc / qty) * 128).toFixed(2);

    e.preventDefault();
    document.getElementById('unit-result').innerHTML = '';
    if (selected === 'oz') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perLb}</span> per pound<br>\
        <span class="computed-price">$${perOz}</span> per ounce<br>\
        <span class='computed-price'>$${perLtByOz}</span> per liter<br>\
        <span class='computed-price'>$${perGaByOz}</span> per gallon`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
    } else if (selected === 'lbs') {
      document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perLbByLb}</span> per pound<br>\
        <span class="computed-price">$${perOzByLb}</span> per ounce<br>\
        <span class='computed-price'>$${perGByLb}</span> per gram.`;
      $('html, body').animate({
        scrollTop: $(document).height()
      }, 'slow');
      return false;
    }
  });









});
