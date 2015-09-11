console.log('app.js loaded');

var token = $('#api-token').val();
$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": token
  }
});

// Model
var Review = Backbone.Model.extend({});

// Collection
var ReviewCollection = Backbone.Collection.extend({
  model: Review,
  url: '/api/reviews'
});

// Views
var ReviewView = Backbone.View.extend({
  tagName: 'div',
  className: 'review',
  template: _.template( $('#review-template').html() ),
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    'click button.remove': 'removeReview'
  },
  removeReview: function(){
    this.model.destroy();
    this.$el.remove();
  }

});

var ReviewListView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.render);
  },
  render: function(){
    this.$el.empty();
    var reviews = this.collection.models;
    var view;
    for (var i = 0; i < reviews.length; i++) {
      view = new ReviewView({model: reviews[i]});
      view.render();
      this.$el.append( view.$el );
    }
  }
});


var reviews = new ReviewCollection();
var reviewPainter = new ReviewListView({
  collection: reviews,
  el: $('#review-list')
});
reviews.fetch();


$('form.create-review').on('submit', function(e){
  e.preventDefault();
  var newMessage = $(this).find("#me-message").val();
  reviews.create({message: newMessage});
});
