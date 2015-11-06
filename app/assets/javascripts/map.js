console.log('map script loaded');

var infowindow = null;
var allLatlng = [];
var pos = {};
var map;
var center;
var myloc;

// locates the user's geo-location
function geoLocate() {
	// if browser supports geo-location, then run the rest
	if(navigator.geolocation) {
		// gets the current position
		navigator.geolocation.getCurrentPosition(function(position) {
			// and stores it within pos
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			}
			console.log('lat and lng binded');
			console.log(pos);
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
	myloc = new google.maps.Marker({
		draggable: true,
    clickable: false,
    icon: new google.maps.MarkerImage('//www.robotwoods.com/dev/misc/bluecircle.png',
                new google.maps.Size(14, 14),
                new google.maps.Point(0, 0),
                new google.maps.Point(7, 7)),
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

	myloc.addListener('drag', function() {
		approximateCircle.setCenter(myloc.position);
	})
}

function locate() {
	allLatlng = [];
	var radius = $('#radius').val();
	console.log(myloc)
	locateBathrooms({lat: myloc.position.lat(), lng: myloc.position.lng()}, radius);
}

// locates any bathrooms near a given location
function locateBathrooms(pos, radius) {
	console.log(pos, radius);
	// AJAX call to get all of the different bathrooms
	$.ajax({
		method: 'get',
		url: '/api/bathrooms/locate',
		data: {coords : { latitude: pos.lat, longitude: pos.lng }, radius: radius},
		success: function(returned_data) {
			// returns the data in an array of object
			generateMarkers(returned_data);
		}
	});
}


function chooseZip() {
	var zip_code = $('#textZip').val() + $('#textZip2').val();
	locateZipCode(zip_code);
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
			generateMarkers(returned_data);
		}
	});
}

function generateMarkers(data) {


	// Try this tomorrow - http://stackoverflow.com/questions/24951991/open-only-one-infowindow-at-a-time-google-maps
	var infowindow = new google.maps.InfoWindow();

	// parses through each piece of data
	$.each(data, function (index, val) {
		console.log(val);
		var currentRating;
		if (val.reviews.length > 0) {
			// console.log(val.reviews);
			avgRating = 'Avg Rating: ' + Number(val.avg_rating).toFixed(1) + '/5'
		} else {
			console.log('no reviews yet')
			avgRating = 'No Ratings...'
		}

		var contentString = '<div class="markerPop">' +
			'<h1>' + val.name + '</h1>' +
			'<h3>' + avgRating + '</h3>' +
			'<span>' + val.address + '</span>' +
			'<br />' +
			'<span>' + val.city + ',  ' + val.state + '</span>' +
			'</div>';
		var latitude = val.latitude;
		var longitude = val.longitude;
		// findReviews(val.id, contentString);
		// console.log(content);




		//set the markers.
		var myLatLng = new google.maps.LatLng(latitude,longitude);
		currentMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'bathroom',
			animation: google.maps.Animation.DROP
		});

		//put all lat long in array
		allLatlng.push(myLatLng);

		currentMarker.addListener('click', function () {
			infowindow.setContent(contentString);
			infowindow.open(map, this);
		});

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
};

function calculateCenter() {
	center = pos;
}

function bindCenter() {
	google.maps.event.addDomListener(map, 'idle', function() {
		calculateCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);
	});
}

function initGoogleMaps() {



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

	var styles = [{"featureType": "water","elementType": "labels.text","stylers": [{"visibility": "simplified"},{"invert_lightness": false},{"color": "#004963"},{"weight": 8}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"invert_lightness": false},{"color": "#b7ebeb"},{"saturation": -53},{"lightness": 2}]},{"featureType": "landscape.man_made","elementType": "geometry","stylers": [{"visibility": "on"},{"invert_lightness": false},{"hue": "#767878"},{"saturation": -93},{"lightness": 56}]},{"featureType": "landscape.man_made","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"color": "#b8dbe0"},{"saturation": -7},{"lightness": 33}]},{"featureType": "poi","elementType": "all","stylers": [{"visibility": "simplified"},{"saturation": -1}]},{"featureType": "poi.park","elementType": "geometry.fill","stylers": [{"color": "#d1e6d7"}]},{"featureType": "poi.sports_complex","elementType": "all","stylers": [{"saturation": -100},{"lightness": 61}]},{"featureType": "poi.school","elementType": "all","stylers": [{"visibility": "off"},{"saturation": -100},{"lightness": 80}]},{"featureType": "poi.place_of_worship","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "poi.business","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "administrative.land_parcel","elementType": "labels.text","stylers": [{"visibility": "simplified"},{"color": "#d74340"},{"saturation": -32}]},{"featureType": "transit.line","elementType": "all","stylers": [{"visibility": "off"}]},{"featureType": "transit.station.rail","elementType": "labels.text.fill","stylers": [{"color": "#d74340"}]},{"featureType": "transit.station.rail","elementType": "labels.icon","stylers": [{"visibility": "simplified"},{"lightness": 0},{"gamma": 2.05}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"lightness": 100}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"saturation": -100},{"lightness": 78}]},{"featureType": "road.highway","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 40}]},{"featureType": "road.arterial","elementType": "geometry.stroke","stylers": [{"saturation": -100},{"lightness": 54}]},{"featureType": "road.local","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"saturation": -100},{"lightness": 28}]},{"featureType": "road.local","elementType": "geometry.fill","stylers": [{"color": "#ffffff"}]}]

	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	map.setOptions({styles: styles});

}


// Document.ready
$(function() {
	geoLocate();
	bindZipSearch();
	initGoogleMaps();
	bindCenter();
});
