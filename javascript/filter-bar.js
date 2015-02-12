// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
// The maximum width of the info window is set to 200 pixels.
function CenterControl(controlDiv, map) {
  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  // controlText.innerHTML = $(".filter-bar").prop("outerHTML");
  controlUI.appendChild($(".filter-container").get(0));

  google.maps.event.addDomListener(controlUI, 'click', function(e) {
    if(e.target.id != "selectAll"){
      // return;
      var isAllSelected = true;
      $("[name=select]:checkbox").each(function(){
        if(!$(this).is(':checked')){
          isAllSelected = false;
        }
      });
      $("#selectAll").prop('checked', isAllSelected);
      return;
    }

    var checkboxes = $(this).closest('div').find(':checkbox');
    if($("#selectAll").is(':checked')) {
      checkboxes.prop('checked', true);
    } else {
      checkboxes.prop('checked', false);
    }
  });
}