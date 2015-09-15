console.log('review_api.js loaded');

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
  var newBathroomId = $(this).find("#review-bathroom-id").val();
  var newRating = $(this).find("#review-rating").val();
  newBathroomId = parseInt(newBathroomId);
  newRating = parseInt(newRating);
  console.log('haha');
  console.log(newBathroomId);
  console.log(newRating);
  reviews.create({message: newMessage, bathroom_id: newBathroomId, rating: newRating});
});
