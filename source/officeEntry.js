function officeEntry (config) {
  var container = $(config.id);
  var template = `
    <div class="well">
      <label for="locationTextField">
        <h5>Office Location:</h5>
      </label>
      <input id="locationTextField" type="text" size="50" class="marginbelowsm" placeholder="Enter a location">
    </div>
  `;
  function init() {
      var input = document.getElementById('locationTextField');
      var autocomplete = new google.maps.places.Autocomplete(input);
  }
  google.maps.event.addDomListener(window, 'load', init);
  const $template = $(template);
  $template.on('keyup', '#locationTextField', function () {
    config.addOffice($(this).prev().val());
  })
  container.empty();
  container.append($template);
}
