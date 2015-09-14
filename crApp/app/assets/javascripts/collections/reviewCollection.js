var app = app || {};

// Collection

app.BathroomCollection = Backbone.Collection.extend({
  model: Review,
  url: '/api/bathrooms'
});
