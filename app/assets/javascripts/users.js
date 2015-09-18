// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require underscore
//= require backbone
//= require models/review
//= require collections/reviewCollection
//= require views/reviewView
//= require views/reviewListView
//= require review_api
//= require turbolinks

console.log('Profile Manifest');



function getInfo(location) {
  console.log('getInfo');
  $.ajax({
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    data:{address: location, key: 'AIzaSyB6ckRS4H7MN9Ltf6vioD6gwghkdz0NLf4'},
    success: function(data) {
      extractData(data);
    }
  })
}

function extractData(data) {
  newLocation = data;
  zipCodeVal = data.results[0].address_components[6].long_name;
  latitudeVal = data.results[0].geometry.location.lat;
  longitudeVal = data.results[0].geometry.location.lng;
  console.log(zip_code);
  console.log(latitude);
  console.log(longitude);
  var streetVal = $("#address").val();
  var cityVal = $("#city").val();
  var stateVal = $("#state").val();
  var nameVal = $("#name").val();
  var bathroomObject = {
    name: nameVal,
    address: streetVal,
    city: cityVal,
    state: stateVal,
    zip_code: zipCodeVal,
    latitude: latitudeVal,
    longitude: longitudeVal
  }
  createBathroom(bathroomObject);
}

function createBathroom(data) {
  $.ajax({
    method: 'post',
    url: '/api/bathrooms',
    data: data,
    success: function(data) {
      alert('Bathroom was created!');
      window.location.reload(true);
    }
  })
}

$('body').css('opacity', '0').fadeTo(1500, 1,'swing');

// -- sidebar slide away hide --
  // -- lives here bc sidebar is global --

     function initMenu() {
      $('#menu ul').hide();
      $('#menu ul').children('.current').parent().show();
      //$('#menu ul:first').show();
      $('#menu li a').click(
        function() {
          var checkElement = $(this).next();
          if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            return false;
            }
          if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#menu ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
            return false;
            }
          }
        );
      }

  $(document).ready(function() {
    initMenu();
  });
