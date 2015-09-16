console.log('map script loaded');

var allLatlng = [];
var allMarkers = [];
var infowindow = null;
var tempMarkerHolder = [];

function geoLocate() {
	if(navigator.geolocation) {
		console.log('geo locating')
		navigator.geolocation.getCurrentPosition(function(position) {
			pos = {
				lat: position.coords.latitude,
				long: position.coords.longitude
			}
			$('#latitude').val(pos.lat);
			$('#longitude').val(pos.long);

			var radius = $('#radius').val();
			locateBathrooms(pos, radius);
		})
	}
}

function locateBathrooms(pos, radius) {
	$.ajax({
		method: 'get',
		url: '/api/bathrooms/locate',
		data: {coords : { latitude: pos.lat, longitude: pos.long }, radius: radius},
		success: function(returned_data) {
			console.log("bathroom's were located");
			console.log(returned_data);
			addingMarkers(returned_data);
		}
	});
}

function addingMarkers(data) {
	val = data;
  // AJAX CALL HERE
  // on success do below
  $.each(data, function (index, val) {
		var contentString = '<div class="markerPop">' +
		'<h1>' + val.name + '</h1>' +
		'<h3>' + val.address + '</h3>' +
		'<h3>' + val.city + '</h3>' +
		'<h3>' + val.state + '</h3>' +
		'</div>';
		var infowindow = new google.maps.InfoWindow({
	  content: contentString
	 });
     var latitude = val.latitude;
     var longitude = val.longitude;

     //set the markers.
     myLatlng = new google.maps.LatLng(latitude,longitude);

		//  console.log(myLatlng);

     allMarkers = new google.maps.Marker({
       position: myLatlng,
       map: map,
       title: 'bathroom'
     });

     //put all lat long in array
     allLatlng.push(myLatlng);

     //Put the markers in an array
     tempMarkerHolder.push(allMarkers);

     allMarkers.addListener('click', function () {
			 infowindow.close()
       infowindow.open(map, this);
     });
     console.log(allLatlng);
     //  Make an array of the LatLng's of the markers you want to show
     //  Create a new viewpoint bound
     var bounds = new google.maps.LatLngBounds ();
     //  Go through each...
     for (var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
       //  And increase the bounds to take this point
       bounds.extend (allLatlng[i]);
     }
     //  Fit these bounds to the map
     map.fitBounds (bounds);

  }); //end .each

  //  end AJAX call
}

// Document.ready
$(function() {

	$( "#searchZip" ).click(function() {
		$("#searchZip").hide();
		$( ".zipSearch" ).show();
	});


	var allLatlng = []; //returned from the API
	var allMarkers = []; //returned from the API
	var infowindow = null;
	var pos;
	var userCords;
	var tempMarkerHolder = [];

	//map options
	var mapOptions = {
		zoom: 5,
		center: new google.maps.LatLng(37.09024, -100.712891),
		panControl: false,
		panControlOptions: {
			position: google.maps.ControlPosition.BOTTOM_LEFT
		},
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		scaleControl: false

	};

	//Adding infowindow option
	// infowindow = new google.maps.InfoWindow({
	// 	content: "holding..."
	// });

	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
});
