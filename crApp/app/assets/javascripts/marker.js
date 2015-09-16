

var allLatlng = [];
var allMarkers = [];
var infowindow = null;
var pos;
var userCords;
var tempMarkerHolder = [];


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


// AJAX CALL HERE
// on success do below
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
           '<h3>' + val.city + '</h3>' +
           '<h3>' + val.state + '</h3>' +
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

  //  end AJAX call
