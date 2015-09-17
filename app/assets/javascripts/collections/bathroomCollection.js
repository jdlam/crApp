var app = app || {};

// Collection

app.BathroomCollection = Backbone.Collection.extend({
  model: app.Bathroom,
  url: '/api/bathrooms'
});
