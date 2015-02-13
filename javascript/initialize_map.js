  // This example displays a marker at the center of Australia.
  // When the user clicks the marker, an info window opens.
  // The maximum width of the info window is set to 200 pixels.
var allMarkers = {'1':[], '2':[], '3':[], '4':[]};
function initialize() {
    var myLatlng = new google.maps.LatLng(34.233006, 108.897072);
    var mapOptions = {
      zoom: 16,
      center: myLatlng
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    renderThoughtWorks(map);

    for (var index = 0; index < entertainmentData.length; index ++) {
      renderMapPoint(entertainmentData[index], map);
    }

     //add custom control
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);
    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(centerControlDiv);
}
var topInfoWindow;

function renderMapPoint(entity, map) {
  var position = new google.maps.LatLng(entity.location.latitude, entity.location.longitude);

  var contentString = '<div id="content">' +
    '<h1 id="firstHeading" class="firstHeading">' + entity.name + '</h1>' +
    '<div id="bodyContent">' +
    '<div id="summary-info">' +
    '<image src= "images/'+ entity.image.file_name +'">' + '</image>' +
    '<div id="label"> Address: <span>'+ entity.location.address + '</span></div>' +
    '<div id="label"> Phone Number: <span>' + entity.telephone + '</span></div>' +
    '</div>' +
    '<div id="comments">' + initializeComments(entity) +
    '</div>' +
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
    icon: getIconForType(entity.type)
  });
 
  allMarkers[entity.type.toString()].push(marker);

  google.maps.event.addListener(marker, 'click', function () {
    if (topInfoWindow) topInfoWindow.close();
    topInfoWindow = infowindow;
    topInfoWindow.open(map, marker);
  });
}

function initializeComments(entity) {
  var commentsString = '<table>';
  for (var index = 0; index < entity.comments.length; index ++) {
    commentsString += '<tr>' +
        '<td>' +
          '<image src = "images/'+ entity.comments[index].avatar +'"></image>' +
          '<label>' + entity.comments[index].author + '</label>' +
        '</td>' +
        '<td id="comment-content">'+ entity.comments[index].content +'</td>'
      '</tr>'
  }
  commentsString += '</table>'
  return commentsString;
}

function getIconForType(type) {
  if (type == '1') return 'images/food_marker.png';
  if (type == '2') return 'images/play_marker.png';
  if (type == '3') return 'images/travel_marker.png';
  if (type == '4') return 'images/shopping_marker.png';
}

function renderThoughtWorks(map) {
  var position = new google.maps.LatLng(34.1909738, 108.8783634);

  var contentString = '<div id="content">' +
    '<h1 id="firstHeading" class="firstHeading"> ThoughtWorks </h1>' +
    '<div id="bodyContent">' +
    '<div id="summary-info">' +
    'We are a software company and a community of passionate, purpose-led individuals. We think disruptively to deliver technology to address our clients' +
    '<div id="label"> Address: <span> Room 01, 15th Floor, Bldg 1, IT Incubator, 2nd Area of National Service Outsourcing Demonstration Bast, 1st Jinye Rd, Hi-tech Development District, Xian, Shaanxi, China </span></div>' +
    '<div id="label"> Phone Number: <span> +86-029-68659600 </span></div>' +
    '</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200
  });

  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: 'ThoughtWorks',
    icon: 'images/thoughtworks-marker.png'
  });

  google.maps.event.addListener(marker, 'click', function () {
    if (topInfoWindow) topInfoWindow.close();
    topInfoWindow = infowindow;
    topInfoWindow.open(map, marker);
  });

}

google.maps.event.addDomListener(window, 'load', initialize);

