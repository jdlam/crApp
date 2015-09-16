console.log('app.js loaded');

var app = app || {};

var token = $('#api-token').val();
$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": token
  }
});

// var bathrooms = new app.BathroomCollection();
// var bathroomPainter = new app.BathroomListView({
//   collection: bathrooms,
//   el: $('#bathroom-list')
// });
//
// bathrooms.fetch();
