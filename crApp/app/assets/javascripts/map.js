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
	locateBathrooms({lat: myloc.position.H, lng: myloc.position.L}, radius);
}

// locates any bathrooms near a given location
function locateBathrooms(pos, radius) {
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
	var zip_code = $('#textZip').val();
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

var infowindow = new google.maps.InfoWindow();
	// parses through each piece of data
  $.each(data, function (index, val) {
		var contentString = '<div class="markerPop">' +
			'<h1>' + val.name + '</h1>' +
			'<h3>' + val.address + '</h3>' +
			'<h3>' + val.city + ',  ' + val.state + '</h3>' +
			'<% @reviews.each do |review| %><%= review.message %><% end %>' +
			'</div>';
		var latitude = val.latitude;
		var longitude = val.longitude;

		//set the markers.
		var myLatLng = new google.maps.LatLng(latitude,longitude);

		currentMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: 'bathroom',
			animation: google.maps.Animation.DROP,
			draggable: true
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

	var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":
	[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},
	{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},
	{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},
	{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},
	{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},
	{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	map.setOptions({styles: styles});
// <<<<<<< HEAD
//
// =======
}


// Document.ready
$(function() {
	geoLocate();
	bindZipSearch();
	initGoogleMaps();
	bindCenter();
// >>>>>>> fea79d5693695113262a2caeb3e6c9c68d921385
});
