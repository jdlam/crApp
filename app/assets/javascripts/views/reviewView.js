var app = app || {};

app.ReviewView = Backbone.View.extend({
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
