function userList(config) {
  var container = $(config.id);
  var divStmts = config.users.map(user => {
    return `
      <div class="well backWhite nomarginTopBot">
        <h5>${ user.name }</h5>
        <select class="colWidth95 marginbelowsm"></select>
        <button data-id="${user.id}" class="btn btn-warning">remove</button>
      </div>
    `;
  })
  var $divStmts = $(divStmts.join(''));
  $divStmts.on('click', 'button', function () {
    config.removeUser($(this).attr('data-id') * 1);
  })
  container.empty();
  container.append($divStmts);
}
