console.log('app.js loaded');

var app = app || {};

var token = $('#api-token').val();
$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": token
  }
});

var reviews = new app.ReviewCollection();
var reviewPainter = new app.ReviewListView({
  collection: reviews,
  el: $('#review-list')
});
reviews.fetch();

$('form.create-review').on('submit', function(e){
  e.preventDefault();
  var newMessage = $(this).find("#me-message").val();
  reviews.create({message: newMessage});
});
