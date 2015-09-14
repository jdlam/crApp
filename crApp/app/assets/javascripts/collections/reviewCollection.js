var app = app || {};

// Collection

app.ReviewCollection = Backbone.Collection.extend({
  model: app.Review,
  url: '/api/reviews'
});
