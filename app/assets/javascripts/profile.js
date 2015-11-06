function getInfo(location) {
  var token = $.ajaxSettings.headers["token"];
  delete $.ajaxSettings.headers["token"];

  $.ajax({
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    data:{address: location, key: 'AIzaSyB6ckRS4H7MN9Ltf6vioD6gwghkdz0NLf4'},
    success: function(data) {
      extractData(data);
    }
  })
  $.ajaxSettings.headers["token"] = token
}

function extractData(data) {
  newLocation = data;
  zipCodeVal = data.results[0].address_components[6].long_name;
  latitudeVal = data.results[0].geometry.location.lat;
  longitudeVal = data.results[0].geometry.location.lng;
  var streetVal = $("#address").val();
  var cityVal = $("#city").val();
  var stateVal = $("#state").val();
  var nameVal = $("#name").val();
  var bathroomObject = {
    bathroom: {
      name: nameVal,
      address: streetVal,
      city: cityVal,
      state: stateVal,
      zip_code: zipCodeVal,
      latitude: latitudeVal,
      longitude: longitudeVal
    }
  }
  createBathroom(bathroomObject);
}

function createBathroom(data) {
  $.ajax({
    method: 'post',
    url: '/api/bathrooms',
    data: data,
    success: function(data) {
      alert('Bathroom was added!!');
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
