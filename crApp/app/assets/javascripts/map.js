console.log('map script loaded');

var allLatlng = [];
var allMarkers = [];
var infowindow = null;
var tempMarkerHolder = [];

// locates the user's geo-location
function geoLocate() {
	// if browser supports geo-location, then run the rest
	if(navigator.geolocation) {
		// gets the current position
		console.log('geo locating')
		navigator.geolocation.getCurrentPosition(function(position) {
			// and stores it within pos
			pos = {
				lat: position.coords.latitude,
				long: position.coords.longitude
			}
			// changes the value of the latitude and longitude hidden value fields
			// THIS MAY BE UNNECESSARY
			// COULD REMOVE
			$('#latitude').val(pos.lat);
			$('#longitude').val(pos.long);

			// pulls the radius value from the radius box
			// DEFINITELY UNNECESSARY
			var radius = $('#radius').val();

			// locates the bathrooms nearby
			locateBathrooms(pos, radius);
		})
	}
}

// locates any bathrooms near a given location
function locateBathrooms(pos, radius) {
	// AJAX call to get all of the different bathrooms
	$.ajax({
		method: 'get',
		url: '/api/bathrooms/locate',
		data: {coords : { latitude: pos.lat, longitude: pos.long }, radius: radius},
		success: function(returned_data) {
			// returns the data in an array of object
			console.log(returned_data);
			addingMarkers(returned_data);
		}
	});
}

function addingMarkers(data) {
	// parses through each piece of data
  $.each(data, function (index, val) {
		var contentString = '<div class="markerPop">' +
			'<h1>' + val.name + '</h1>' +
			'<h3>' + val.address + '</h3>' +
			'<h3>' + val.city + ',  ' + val.state + '</h3>' +
			'</div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		var latitude = val.latitude;
		var longitude = val.longitude;

		//set the markers.
		myLatlng = new google.maps.LatLng(latitude,longitude);

		//set the markers.
		myLatlng = new google.maps.LatLng(latitude,longitude);

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
			infowindow.open(map, allMarkers);
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

	//map options
	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(40.740089499999996, -73.9895111),
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
