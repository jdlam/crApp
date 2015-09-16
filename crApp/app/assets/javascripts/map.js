console.log('map.js is loaded');

//
//
// function initialize() {
//     var loc, map, marker, infobox;
//
//     loc = new google.maps.LatLng(40.6974881, -73.979681);
//
//     map = new google.maps.Map(document.getElementById("map"), {
//          zoom: 12,
//          center: loc,
//          styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"off"},{"lightness":"28"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"weight":"1.17"},{"invert_lightness":true},{"lightness":"100"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-62"},{"lightness":"-11"},{"hue":"#00ff23"},{"weight":"0.58"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"hue":"#12ff00"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":"0.29"},{"gamma":"0.00"},{"lightness":"76"},{"saturation":"-28"}]}]
//     });
//
//     marker = new google.maps.Marker({
//         map: map,
//         position: loc,
//         visible: true
//     });
//
//     infobox = new InfoBox({
//          content: document.getElementById("infobox"),
//          disableAutoPan: false,
//          maxWidth: 150,
//          pixelOffset: new google.maps.Size(-140, 0),
//          zIndex: null,
//          boxStyle: {
//             background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
//             opacity: 0.75,
//             width: "280px"
//         },
//         closeBoxMargin: "12px 4px 2px 2px",
//         closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
//         infoBoxClearance: new google.maps.Size(1, 1)
//     });
//
//     google.maps.event.addListener(marker, 'click', function() {
//         infobox.open(map, this);
//         map.panTo(loc);
//     });
// }
//
$(document).ready(function(){
  function initialize() {
    var Map = Backbone.Model.extend({})

    var MapView = Backbone.View.extend({

        initialize: function() {
            _.bindAll(this, 'render');
            this.render();
        },

        render: function() {
            var latlng = new google.maps.LatLng(this.model.get('latitude'), this.model.get('longitude'));
            var options = {
                zoom: 6,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{"featureType":"all","elementType":"geometry","stylers":[{"visibility":"off"},{"lightness":"28"}]},{"featureType":"all","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"weight":"1.17"},{"invert_lightness":true},{"lightness":"100"}]},{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-62"},{"lightness":"-11"},{"hue":"#00ff23"},{"weight":"0.58"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"hue":"#12ff00"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"visibility":"off"},{"hue":"#ff0000"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"},{"weight":"0.29"},{"gamma":"0.00"},{"lightness":"76"},{"saturation":"-28"}]}]
            };
            this.map = new google.maps.Map(this.el, options);

            return this;
        }
    });

    var map = new Map({
        latitude: "-34.397",
        longitude: "150.644",
        })
    var map_view = new MapView({
        el: $('.map')[0],
        model: map,
    });

};
initialize();
})
