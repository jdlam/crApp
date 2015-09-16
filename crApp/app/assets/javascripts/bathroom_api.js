console.log('bathroom_api.js loaded');

var app = app || {};

var token = $('#api-token').val();
$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": token
  }
});

var bathrooms = new app.BathroomCollection();

bathrooms.fetch();