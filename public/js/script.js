'use strict';

$(function() {

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

  //
  //   var $products = $('#productsInList');
  //   var $stores = $('#storesInList');

  //   var $addProducts = $('#storeLogoProductAdd');
  //   var $chooseStores = $('#currentStores');
  //   var $availableStores = $('#availableStores');
  //   var $addProductName = $('#addProductName');
  //   var $addProductUnit = $('#addProductUnit');
  //   var $addPrice1 = $('#addProductPrice1');
  //   var $addPrice2 = $('#addProductPrice2');
  //   var $addPrice3 = $('#addProductPrice3');
  //

  //
  //
  //   $.ajax({
  //     type: 'GET',
  //     url: '/listproducts',
  //     success: function(products) {
  //       $.each(products, function(i, product) {
  //         $products.append(`<div class="result-row">
  //               						<div class="checkboxes">
  //               							<div class="checkedoff">
  //               								<form action="#" method="get">
  //               									<input type="checkbox" id="deleterow" name="prodchecked">
  //               								</form>
  //               							</div>
  //               							<div class="deleterow">
  //               								<img src="images/icons/icon-delete.png" alt="">
  //               							</div>
  //               						</div>
  //               						<div class="productdescription">
  //               							<div class="productname">${product.name}</div>
  //               							<div class="productsize">${product.size}</div>
  //               						</div>
  //               						<div class="price">$${product.prices[0].price}</div>
  //               						<div class="price">$${product.prices[1].price}</div>
  //               						<div class="price">$${product.prices[2].price}</div>
  //               						<div class="storeEnd"><a href="product-edit.html"><img src="images/icons/icon-edit-pencil-clear.png" width="20px"></a></div>
  //               					</div>`);
  //       });
  //     },
  //     error: function() {
  //       // alert('error with this dealio');
  //     }
  //   });
  //

  //
  //   $.ajax({
  //     type: 'GET',
  //     url: '/liststores',
  //     success: function(stores) {
  //       $.each(stores, function(i, store) {
  //         $addProducts.append(`<span class="storeProductLogo"><img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="${store.name} logo"></span>
  //           `);
  //       });
  //     }
  //   });
  //
  //   $.ajax({
  //     type: 'GET',
  //     url: '/liststores',
  //     success: function(stores) {
  //       $.each(stores, function(i, store) {
  //         $chooseStores.append(`<div class="fav-store">
  //           <div class="fav-store-img">
  //             <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
  //           </div>
  //           <div class="fav-store-name">
  //             ${store.name}
  //           </div>
  //           <div class="fav-store-add">
  //             <a href="#">remove</a>
  //           </div>
  //         </div>
  //           `);
  //       });
  //     }
  //   });
  //
  //   $.ajax({
  //     type: 'GET',
  //     url: '/storedstores',
  //     success: function(stores) {
  //       $.each(stores, function(i, store) {
  //         $availableStores.append(`<div class="fav-store">
  //           <div class="fav-store-img">
  //             <img src="images/icons/grocery/icon-grocery-${store.name.replace(/\s+/g, '').toLowerCase()}.jpg" alt="">
  //           </div>
  //           <div class="fav-store-name">
  //             ${store.name}
  //           </div>
  //           <div class="fav-store-add">
  //             <a href="#">add+</a>
  //           </div>
  //         </div>
  //           `);
  //       });
  //     }
  //   });
  //
  // $('#addItemButton').on('click', function(){
  //   console.log($addProductName.val());
  //   console.log($addProductUnit.val());
  //   console.log($addPrice1.val());
  //   console.log($addPrice2.val());
  //   console.log($addPrice3.val());
  //   var newProd= {
  //     name: $addProductName.val(),
  //     size: $addProductUnit.val(),
  //     prices:[
  //       {price: $addPrice1.val()},
  //       {price: $addPrice2.val()},
  //       {price: $addPrice3.val()}
  //     ]
  //   };

  // $.ajax({
  //   type: 'POST',
  //   url: '/storedproducts',
  //   data: newProd,
  //   success: function(newProd) {
  //     alert(`${newProd.name} Added!`);
  //     console.log(`${newProd} created`);
  //     $('#addProductName').reset();
  //     $('#addProductPrice1').reset();
  //     $('#addProductPrice2').reset();
  //     $('#addProductPrice3').reset();
  //   }
  // });
  //
  //     $.ajax({
  //       type: 'POST',
  //       url: '/listproducts',
  //       data: newProd,
  //       success: function(newProd) {
  //         alert(`${newProd.name} Added!`);
  //         console.log(`${newProd} created`);
  //         $('#addProductName').reset();
  //         $('#addProductPrice1').reset();
  //         $('#addProductPrice2').reset();
  //         $('#addProductPrice3').reset();
  //       }
  //     });
  //
  //   });
  //
  //
  //   // Calculator Section
  //   $('.submit-calc').click(function(e) {
  //     let selected = $('#conversion-selector option:selected').val();
  //     let qty = $('#unitQty').val();
  //     let prc = $('#price').val();
  //     console.log(selected);
  //     console.log(qty);
  //     console.log(prc);
  //     let perOz = (prc / qty).toFixed(2);
  //     console.log(perOz);
  //     let perLb = (perOz * 16).toFixed(2);
  //     console.log(perLb);
  //     let perLbByLb = (prc / qty).toFixed(2);
  //     let perOzByLb = (prc / (qty * 16)).toFixed(2);
  //     let perLtByOz = (prc / (qty / 33.814)).toFixed(2);
  //     let perGByLb = ((prc / qty) * 453.592).toFixed(2);
  //     let perGaByOz = ((prc / qty) * 128).toFixed(2);
  //
  //     e.preventDefault();
  //     document.getElementById('unit-result').innerHTML = '';
  //     if (selected === 'oz') {
  //       document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perLb}</span> per pound<br>\
  //       <span class="computed-price">$${perOz}</span> per ounce<br>\
  //       <span class='computed-price'>$${perLtByOz}</span> per liter<br>\
  //       <span class='computed-price'>$${perGaByOz}</span> per gallon`;
  //       $('html, body').animate({
  //         scrollTop: $(document).height()
  //       }, 'slow');
  //     } else if (selected === 'lbs') {
  //       document.getElementById('unit-result').innerHTML = `<span class="computed-price">$${perLbByLb}</span> per pound<br>\
  //       <span class="computed-price">$${perOzByLb}</span> per ounce<br>\
  //       <span class='computed-price'>$${perGByLb}</span> per gram.`;
  //       $('html, body').animate({
  //         scrollTop: $(document).height()
  //       }, 'slow');
  //       return false;
  //     }
  //   });
  //
  //
  //
  //
  function reverse(bool) {
  	if(typeof bool !== 'boolean'){
  		return "boolean expected"; }else{
  			return !bool;
  		}
  	}

  reverse(4);
  reverse("bluff");
  reverse(true);


});
