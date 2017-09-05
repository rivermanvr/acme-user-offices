function officeEntry (config) {
  var container = $(config.id);
  var template = `
    <div class="well">
    <label for="name">
      <h5>Office Location:</h5>
    </label>
    <input name="name" type="text" class="colWidth95 marginbelowsm" placeholder="Enter: address, city, state..." />
    <button class="btn btn-primary">+</button>
    </div>
  `;
  const $template = $(template);
  $template.on('click', 'button', function () {
    config.addOffice($(this).prev().val());
  })
  container.empty();
  container.append($template);
}
