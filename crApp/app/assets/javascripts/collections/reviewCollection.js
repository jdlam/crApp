var app = app || {};

// Collection

app.ReviewCollection = Backbone.Collection.extend({
  model: Review,
  url: '/api/review'
});
