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

		var accessURL = '/api/bathrooms';



			$.ajax({
				method: "GET",
				url: accessURL,
				dataType: "jsonp",
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

//
// //
// //
// // function initialize() {
// //     var loc, map, marker, infobox;
// //
// //     loc = new google.maps.LatLng(40.6974881, -73.979681);
// //
// //     map = new google.maps.Map(document.getElementById("map"), {
// //          zoom: 12,
// //          center: loc,
// //          styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"off"},{"lightness":"28"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"weight":"1.17"},{"invert_lightness":true},{"lightness":"100"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-62"},{"lightness":"-11"},{"hue":"#00ff23"},{"weight":"0.58"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"hue":"#12ff00"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":"0.29"},{"gamma":"0.00"},{"lightness":"76"},{"saturation":"-28"}]}]
// //     });
// //
// //     marker = new google.maps.Marker({
// //         map: map,
// //         position: loc,
// //         visible: true
// //     });
// //
// //     infobox = new InfoBox({
// //          content: document.getElementById("infobox"),
// //          disableAutoPan: false,
// //          maxWidth: 150,
// //          pixelOffset: new google.maps.Size(-140, 0),
// //          zIndex: null,
// //          boxStyle: {
// //             background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
// //             opacity: 0.75,
// //             width: "280px"
// //         },
// //         closeBoxMargin: "12px 4px 2px 2px",
// //         closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
// //         infoBoxClearance: new google.maps.Size(1, 1)
// //     });
// //
// //     google.maps.event.addListener(marker, 'click', function() {
// //         infobox.open(map, this);
// //         map.panTo(loc);
// //     });
// // }
// //
// $(document).ready(function(){
//   function initialize() {
//     var Map = Backbone.Model.extend({})
//
//     var MapView = Backbone.View.extend({
//
//         initialize: function() {
//             _.bindAll(this, 'render');
//             this.render();
//         },
//
//         render: function() {
//             var latlng = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'));
//             var options = {
//                 zoom: 6,
//                 center: latlng,
//                 mapTypeId: google.maps.MapTypeId.ROADMAP,
//                 styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"off"},{"lightness":"28"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"weight":"1.17"},{"invert_lightness":true},{"lightness":"100"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-62"},{"lightness":"-11"},{"hue":"#00ff23"},{"weight":"0.58"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"hue":"#12ff00"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":"0.29"},{"gamma":"0.00"},{"lightness":"76"},{"saturation":"-28"}]}]
//             };
//             this.map = new google.maps.Map(this.el, options);
//
//             return this;
//         }
//     });
//
//     var map = new Map({
//         latitude: "-34.397",
//         longitude: "150.644",
//         })
//     var map_view = new MapView({
//         el: $('.map')[0],
//         model: map,
//     });
//
// };
// initialize();
// })
