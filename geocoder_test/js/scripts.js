// Key = AIzaSyB6ckRS4H7MN9Ltf6vioD6gwghkdz0NLf4

// URL = https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyB6ckRS4H7MN9Ltf6vioD6gwghkdz0NLf4

newLocation = [];

$(document).ready(function(){
  $('form').on('submit', function(e){
    e.preventDefault();
    var street = $(this).find("#address").val();
    var city = $(this).find("#city").val();
    var state = $(this).find("#state").val();
    var address = street + ', ' + city + ', ' + state;
    console.log(address)
    locate(address)
  });
})

var locate = function(location) {
  $.ajax({
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    data:{address: location, key: 'AIzaSyB6ckRS4H7MN9Ltf6vioD6gwghkdz0NLf4'},
    success: function(data) {
      extractData(data);
    }
  })
}

var extractData = function(data) {
  newLocation = data;
  zip_code = data.results[0].address_components[6].long_name;
  latitude = data.results[0].geometry.location.lat;
  longitude = data.results[0].geometry.location.lng;
  console.log(zip_code);
  console.log(latitude);
  console.log(longitude);
}

var stateList = new Array("AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY");
