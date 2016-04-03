function initMap() {
  var mapDiv = document.getElementById('map');
  map = new google.maps.Map(mapDiv, {
    center: {
      lat: 33.749,
      lng: -84.388
    },
    zoom: 11
  });
}

function makeMarkers(locs) {

  setMarkers(map);

  function setMarkers(map) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
      url: 'http://labs.google.com/ridefinder/images/mm_20_red.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    for (var i = 0; i < locs.length; i++) {
      var beach = locs[i];
      var marker = new google.maps.Marker({
        position: {
          lat: beach[1],
          lng: beach[2]
        },
        map: map,
        icon: image,
        shape: shape,
        title: beach[0],
        zIndex: beach[3]
      });
    }
  }
}

function Login() {
  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Good to see you, ' + response.name + '.');
      });
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    scope: 'user_events'
  });
}
var test2 = 1;
function getData() {
  FB.api(
    "/me/events?since=" + (Math.floor(new Date().getTime() / 1000)),
    function(response) {
      if (response && !response.error) {
        console.log(response.data);
        test2 = response.data;
        parseData(response.data);
      } else {
        console.log(response);
      }
    }
  );
}

function parseData(data) {
  var gatheringList = [];
  var table = $("<table class='table table-striped' style = 'table-layout: fixed;'></table>");
  for (var i = data.length - 1; i >= 0; i--) {
    console.log(data[i]);
    if (data[i].hasOwnProperty('place')) {
      if (data[i].place.hasOwnProperty('location')){
        if (data[i].place.location.hasOwnProperty('latitude') && data[i].place.location.hasOwnProperty('longitude')){
           gathering = data[i];
           gatheringName = gathering.name;
           latitude = gathering.place.location.latitude;
           longitude = gathering.place.location.longitude;
           identification = gathering.id; //can change to url
           var addRow = [gatheringName, latitude, longitude, identification];
           console.log(addRow);
           gatheringList.push(addRow);
           var url = "http://www.facebook.com/" + gathering.id;
           var tableRow = $("<tr></tr>").append("<td style = 'width: 450px;'><a target = '_blank' href ='" + url +"'>" + gatheringName + " at " + data[i].place.name + "</a></td>");
           table.append(tableRow);
        }
      }
    }
  }
  $('#event-table').html(table);
  makeMarkers(gatheringList);
}
