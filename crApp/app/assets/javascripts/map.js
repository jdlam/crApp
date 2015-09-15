console.log('map.js is loaded');

function initialize() {
    var loc, map, marker, infobox;

    loc = new google.maps.LatLng(40.6974881, -73.979681);

    map = new google.maps.Map(document.getElementById("map"), {
         zoom: 12,
         center: loc,
         styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"off"},{"lightness":"28"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"weight":"1.17"},{"invert_lightness":true},{"lightness":"100"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-62"},{"lightness":"-11"},{"hue":"#00ff23"},{"weight":"0.58"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"hue":"#12ff00"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":"0.29"},{"gamma":"0.00"},{"lightness":"76"},{"saturation":"-28"}]}]
    });

    marker = new google.maps.Marker({
        map: map,
        position: loc,
        visible: true
    });

    infobox = new InfoBox({
         content: document.getElementById("infobox"),
         disableAutoPan: false,
         maxWidth: 150,
         pixelOffset: new google.maps.Size(-140, 0),
         zIndex: null,
         boxStyle: {
            background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
            opacity: 0.75,
            width: "280px"
        },
        closeBoxMargin: "12px 4px 2px 2px",
        closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
        infoBoxClearance: new google.maps.Size(1, 1)
    });

    google.maps.event.addListener(marker, 'click', function() {
        infobox.open(map, this);
        map.panTo(loc);
    });
}

$(document).ready(function(){
  initialize();
})



// console.log('map js is loaded')
//
// var myMap = myMap || {};
// // var myApp = myApp || {};
//
// myMap.init = function() {
//   this.map;
//   this.currentPosition = new google.maps.LatLng(40.6974881, -73.979681);
//   this.zoom = 12;
//   // this.stylesArray = [
//   //     {
//   //       featureType: "all",
//   //       stylers: [
//   //        { saturation: -80 }
//   //       ]
//   //     },{
//   //       featureType: "road.arterial",
//   //       elementType: "geometry",
//   //       stylers: [
//   //         { hue: "#00ffee" },
//   //         { saturation: 50 }
//   //       ]
//   //     },{http://i.imgur.com/3olShiF.png
//   //       featureType: "poi.business",
//   //       elementType: "labels",
//   //       stylers: [
//   //         { visibility: "off" }
//   //       ]
//   //     }
//   //   ];;
//   this.mapEl = document.getElementById('map');
//   this.map = new google.maps.Map(this.mapEl, {
//     center: this.currentPosition, //this needs to be there or else you'll get a grey screen
//     zoom: this.zoom,
//     styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"off"},{"lightness":"28"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"weight":"1.17"},{"invert_lightness":true},{"lightness":"100"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-62"},{"lightness":"-11"},{"hue":"#00ff23"},{"weight":"0.58"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"hue":"#12ff00"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":"0.29"},{"gamma":"0.00"},{"lightness":"76"},{"saturation":"-28"}]}]
//   })
//   this.marker = new google.maps.Marker({
//     position: this.currentPosition,
//     map: this.map,
//     title: 'Hiiiii',
//     animation: google.maps.Animation.DROP,
//     icon: 'http://i.imgur.com/3olShiF.png'
//   })
// }
//
// myMap.reCenterMap = function() {
//   myMap.map.setCenter( this.currentLatLng );
// }
//
// myMap.updateMarker = function() {
//   myMap.marker.setPosition( this.currentLatLng );
//   myMap.marker.setAnimation( google.maps.Animation.DROP );
// }
//
// // myApp.init = function() {
// //   this.renderCountries();
// // }
// //
// // myApp.renderCountries = function() {
// //   var $countries = $('#countries-list');
// //   $.each( countries, function(i, c) {
// //     var $country = $('<a>').html('<li>' + c.name + '</li>')
// //       .data({ 'lat': c.latitude, 'lng': c.longitude })
// //     myApp.bindCountry( $country );
// //     $countries.append($country);
// //   })
// // }
// //
// // myApp.bindCountry = function( $country ){
// //   $country.on('click', function(e){
// //     var $this = $(this);
// //     myMap.currentLatLng = new google.maps.LatLng( $this.data('lat'), $this.data('lng') );
// //     myMap.reCenterMap();
// //     myMap.updateMarker();
// //     // myMap.map.setCenter ( newLatLng );
// //   });
// // }
// //
// //
// // var bindResizeListener = function() {
// //   window.addEventListener('resize', function(e) {
// //     myMap.reCenterMap();
// //   });
// // }
//
// $(document).ready(function(){
//   myMap.init();
//   // myApp.init();
//   // bindResizeListener();
// })
