var app = app || {};

app.ReviewListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
    var reviews = this.collection.models;
    var view;
    for (var i = 0; i < reviews.length; i++) {
      view = new app.ReviewView({model: reviews[i]});
      view.render();
      this.$el.append( view.$el );
    }
  }
});
