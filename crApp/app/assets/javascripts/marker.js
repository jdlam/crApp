

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
