function officeEntry (config) {
  var container = $(config.id);
  var template = `
    <div class="well">
      <label for="name">
        <h5>Office Location:</h5>
      </label>
      <input id='map-input' class="colWidth95 marginbelowsm" type="text" name="name" placeholder="Enter a location" autocomplete="off">
    </div>
  `;
  const $template = $(template);
  container.empty();
  container.append($template);
}