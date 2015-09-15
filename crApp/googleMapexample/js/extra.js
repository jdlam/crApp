//grab form data
  $('#chooseZip').submit(function() { // bind function to submit event of form

  //define and set variables
  var userZip = $("#textZip").val();
  //console.log("This-> " + userCords.latitude);

  var accessURL;

  if(userZip){
    // accessURL = URL to get the bathrooms by zipcode
  } else {
    // accessURL = URL to get the bathrooms by longitude and latitude from current location
  }


    //Use the zip code and return all bathrooms in an area.
    $.ajax({
      type: "GET",
      contentType: "application/json; charset=utf-8",
      url: accessURL,
      dataType: 'jsonp',
      success: function (data) {


        // Depending on the way data is organized we can run a loop on the data and collect info about the bathrooms and store in an array(s)

             //then access the data
              // var latitude =  something
              // var longitude = something

              //set the markers.
              myLatlng = new google.maps.LatLng(latitude,longitude);

              allMarkers = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: //bathroom name,
                html:
                    '<div class="markerPop">' +
                    '<h1>' + /*bathroom name*/ + '</h1>' +
                    '<h3>' + /*bathroom address*/ + '</h3>' +
                    '<p>' + /*bathroom reviews*/  + '</p>' +
                    '<p>' +  /*bathroom notes*/ + '</p>' +
                    '</div>'
              });

              //put all lat long in array
              allLatlng.push(myLatlng);

              //Put the markers in an array
              tempMarkerHolder.push(allMarkers);

              counter++;
              //console.log(counter);
            };

              google.maps.event.addListener(allMarkers, 'click', function () {
                infowindow.setContent(this.html);
                infowindow.open(map, this);
              });


              //console.log(allLatlng);
              //  Make an array of the LatLng's of the markers you want to show
              //  Create a new viewpoint bound
              var bounds = new google.maps.LatLngBounds ();
              //  Go through each...
              for (var i = 0, LtLgLen = allLatlng.length; i < LtLgLen; i++) {
                //  And increase the bounds to take this point
                bounds.extend (allLatlng[i]);
              }
              //  Fit these bounds to the map
              map.fitBounds (bounds);


            }
          });
        }); //end .each
      }
    });

      return false; 
  });
