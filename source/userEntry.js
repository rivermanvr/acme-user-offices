function userEntry (config) {
  var container = $(config.id);
  var template = `
    <div class="well">
      <label for="name">
        <h5>User Name:</h5>
      </label>
      <input name="name" type="text" class="colWidth95 marginbelowsm" />
      <button class="btn btn-primary">Save</button>
  `;
  if (config.error) {
    template += '<strong class="tabtorightsm">Please enter a valid name</strong>';
  }
  template += '</div>';
  const $template = $(template);
  $template.on('click', 'button', function () {
    config.addUser($(this).prev().val());
  })
  container.empty();
  container.append($template);
}