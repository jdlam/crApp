var MapView = Backbone.View.extend({
  initialize: function() {
    this.render();
  },
  render: function(){
    this.map = new L.Map(this.el, {attributionControl: false})
    .setView(new L.LatLng([39, -77.4]), 7);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    this.markers = new L.LayerGroup().addTo(this.map);
    return this;
  }
});
