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
  var locs = [
    ['Bondi Beach', 33.760, -84.274856, 4],
    ['Coogee Beach', 33.923036, -84.259052, 5],
    ['Cronulla Beach', 34.028249, -84.157507, 3],
    ['Manly Beach', 33.80010128657071, -84.28747820854187, 2],
    ['Maroubra Beach', 33.950198, -84.259302, 1]
  ];
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

function test() {
  FB.api(
    "/me/events",
    function(response) {
      if (response && !response.error) {
        parseData(response.data);
      }
    }
  );
}
function parseData(data) {



  makeMarkers(data);
}