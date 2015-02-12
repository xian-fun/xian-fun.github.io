  // This example displays a marker at the center of Australia.
  // When the user clicks the marker, an info window opens.
  // The maximum width of the info window is set to 200 pixels.

  function initialize() {
    var myLatlng = new google.maps.LatLng(34.2667, 108.9000);
    var mapOptions = {
      zoom: 13,
      center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    for (var index = 0; index < entertainmentData.length; index ++) {
      renderMapPoint(entertainmentData[index], map);
    }
}

function renderMapPoint(entity, map) {
  console.log(entity.location.latitude);
  var position = new google.maps.LatLng(entity.location.latitude, entity.location.longtitude);

  var contentString = '<div id="content"><image src='+ entity.image.file_name +'>' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">' + entity.name + '</h1>' +
    '<div id="bodyContent">' +
    '<p> Address: '+ entity.location.address +'' +
    '<br> Phone Number: ' + entity.telephone +
    '</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });

  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: entity.name,
    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
  });
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });

}

google.maps.event.addDomListener(window, 'load', initialize);
