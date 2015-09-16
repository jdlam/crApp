console.log('map.js is loaded');



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

		//Start geolocation

		if (navigator.geolocation) {

			function error(err) {
				console.warn('ERROR(' + err.code + '): ' + err.message);
			}

			function success(pos){
				userCords = pos.coords;

				//return userCords;
			}

			// Get the user's current position
			navigator.geolocation.getCurrentPosition(success, error);
			//console.log(pos.latitude + " " + pos.longitude);
			} else {
				alert('Geolocation is not supported in your browser');
			}

		//End Geo location

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
	infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});

	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	//grab form data
    $('#chooseZip').submit(function() { // bind function to submit event of form

		//define and set variables
		// var userZip = $("#textZip").val();
		//console.log("This-> " + userCords.latitude);

		var accessURL = 'http://localhost:3000/api/bathrooms';



			$.ajax({
				method: "GET",
				url: accessURL,
				dataType: "json",
				success: function (data) {

// http://api.jquery.com/jquery.each/
					 $.each(data, function (val) {
						  var latitude = val.latitude
						  var longitude = val.longitude


								//set the markers.
								myLatlng = new google.maps.LatLng(latitude,longitude);

								allMarkers = new google.maps.Marker({
									position: myLatlng,
									map: map,
									title: val.name,
									html:
											'<div class="markerPop">' +
											'<h1>' + val.name + '</h1>' +
											'<h3>' + val.address + '</h3>' +
											'<p>' + val.city + '</p>' +
											'<p>' + val.state + '</p>' +
											'</div>'
								});

								//put all lat long in array
								allLatlng.push(myLatlng);

								//Put the markers in an array
								tempMarkerHolder.push(allMarkers);




								google.maps.event.addListener(allMarkers, 'click', function () {
									infowindow.setContent(this.html);
									infowindow.open(map, this);
								});


								//console.log(allLatlng);
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

	}
		});
       return false; //  prevent the form from submitting

});

});
