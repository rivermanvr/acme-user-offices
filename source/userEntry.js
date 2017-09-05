function userEntry (config) {
  var container = $(config.id);
  var template = `
    <div class="well">
      <label for="name">
        <h5>User Name:</h5>
      </label>
      <input name="name" type="text" class="colWidth95 marginbelowsm" />
      <button class="btn btn-primary" type='submit'>Save</button>
    </div>
  `;
  const $template = $(template);
  $template.on('click', 'button', function () {
    
  })
  container.empty();
  container.append($template);
}