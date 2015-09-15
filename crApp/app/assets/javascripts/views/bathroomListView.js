var app = app || {};

app.BathroomListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
    var bathrooms = this.collection.models;
    var view;
    for (var i = 0; i < bathrooms.length; i++) {
      view = new app.BathroomView({model: bathrooms[i]});
      view.render();
      this.$el.append( view.$el );
    }
  }
});
