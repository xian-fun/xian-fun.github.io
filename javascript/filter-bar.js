// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
// The maximum width of the info window is set to 200 pixels.
var selectedCategories = {'1': true, '2': true, '3': true, '4': true};

$('[name=select]:checkbox').bind('click', function(){
});

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

      target = $(e.target);
      selectedCategories[target.val()] = target.is(':checked');
    }
    else{
      var checkboxes = $(this).closest('div').find(':checkbox');
      var selectAll = $("#selectAll").is(':checked');
      checkboxes.prop('checked', selectAll);
      for(var ele in selectedCategories)
      {
        selectedCategories[ele] = selectAll;
      }
    }
    reloadData(selectedCategories);
  });
}

var reloadData = function(selectedCategories){
  for(value in selectedCategories){
    for (var i = 0; i < allMarkers[value].length; i++) {
      allMarkers[value][i].setVisible(selectedCategories[value]);
    }
  }
};
