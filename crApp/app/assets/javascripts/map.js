console.log('map script loaded');

var allLatlng = [];
var allMarkers = [];
var infowindow = null;
var tempMarkerHolder = [];
var pos = {};
var map;

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
				lng: position.coords.longitude
			}
			// changes the value of the latitude and longitude hidden value fields
			$('#latitude').val(position.coords.latitude);
			$('#longitude').val(position.coords.longitude);
			generateUserMarker(pos);
		}, function(){
			alert('Error in geolocation');
		})
	} else {
		alert('You must share your location');
	}
}

function generateUserMarker(pos) {
	var myloc = new google.maps.Marker({
    clickable: false,
    icon: new google.maps.MarkerImage('//www.robotwoods.com/dev/misc/bluecircle.png'),
    shadow: null,
    zIndex: 999,
    map: map,
		position: pos,
		opacity: 0.8
	});

	var approximateCircle = new google.maps.Circle({
		strokeColor: '#0099FF',
    strokeOpacity: 0.8,
    strokeWeight: 1.5,
    fillColor: '#00CCFF',
    fillOpacity: 0.35,
    map: map,
    center: pos,
    radius: 150
	});
	console.log('generating user marker');
	console.log(pos);
	console.log(myloc);
}

function locate() {
	var radius = $('#radius').val();
	locateBathrooms(pos, radius);
}

// locates any bathrooms near a given location
function locateBathrooms(pos, radius) {
	console.log('locate bathrooms');
	// AJAX call to get all of the different bathrooms
	$.ajax({
		method: 'get',
		url: '/api/bathrooms/locate',
		data: {coords : { latitude: pos.lat, longitude: pos.lng }, radius: radius},
		success: function(returned_data) {
			// returns the data in an array of object
			console.log(returned_data);
			generateMarkers(returned_data);
		}
	});
}

function chooseZip() {
	var zip_code = $('#textZip').val();
	locateZipCode(zip_code);
	console.log('zip')
}

// locates any bathrooms near a given location
function locateZipCode(zip_code) {
	// AJAX call to get all of the different bathrooms
	$.ajax({
		method: 'get',
		url: '/api/bathrooms/zip_code',
		data: {coords : {zip_code: zip_code}},
		success: function(returned_data) {
			// returns the data in an array of object
			console.log(returned_data);
			generateMarkers(returned_data);
		}
	});
}

function generateMarkers(data) {

// Try this tomorrow - http://stackoverflow.com/questions/24951991/open-only-one-infowindow-at-a-time-google-maps
var infowindow = new google.maps.InfoWindow();
	// parses through each piece of data
  $.each(data, function (index, val) {
		var contentString = '<div class="markerPop">' +
			'<h1>' + val.name + '</h1>' +
			'<h3>' + val.address + '</h3>' +
			'<h3>' + val.city + ', '+ val.state + '</h3>' +
			'</div>';
		// var infowindow = new google.maps.InfoWindow({
		// 	content: contentString
		// });
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
			infowindow.setContent(contentString);
			infowindow.open(map, this);
		});

// 		google.maps.event.addListener(marker, 'click', function () {
//
//     infowindow.setContent('set the infowindow content here');
//     infowindow.open(map, marker);
// });
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

function bindZipSearch() {
	$( "#searchZip" ).click(function() {
		$("#searchZip").hide();
		$(".zipSearch").show();
	});
}

// Document.ready
$(function() {
	geoLocate();
	bindZipSearch();


	//map options
	var mapOptions = {
		zoom: 16,
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

	var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":
	[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
	{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
	{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
	{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
	{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
	{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	console.log('generating map');
	map.setOptions({styles: styles});
});
