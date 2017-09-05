function officeEntry (config) {
  var container = $(config.id);
  var template = `
    <div class="well">
    <label for="name">
      <h5>Office Location:</h5>
    </label>
    <input id="searchInput" class="controls colWidth95 marginbelowsm" type="text" placeholder="Enter a location">
    </div>
  `;
  const $template = $(template);
  $template.on('click', 'button', function () {
    config.addOffice($(this).prev().val());
  })
  container.empty();
  container.append($template);
}
