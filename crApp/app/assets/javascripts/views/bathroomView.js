var app = app || {};

app.BathroomView = Backbone.View.extend({
  tagName: 'div',
  className: 'bathroom',
  template: _.template( $('#bathroom-template').html() ),
  render: function(){
    this.$el.empty();
    var html = this.template( this.model.toJSON() );
    var $html = $( html );
    this.$el.append( $html );
  },
  events:{
    'click button.remove': 'removeInfoWindow'
  },
  removeInfoWindow: function(){
  }
});
