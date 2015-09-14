var app = app || {};

// Collection

app.ReviewCollection = Backbone.Collection.extend({
  model: reviews,
  url: '/api/reviews'
});
