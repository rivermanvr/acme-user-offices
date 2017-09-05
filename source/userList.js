function userList(config) {
  var container = $(config.id);
  var divStmts = config.users.map(user => {
    var optionStmts = config.offices.map(office => {
      return `
        <option value="${ office.id }" ${ office.id === user.officeId ? ' selected ' : '' }>
          ${ office.name }
        </option>
      `;
    })
    return `
      <div class="well backWhite nomarginTopBot">
        <h5>${ user.name }</h5>
        <select name="${ user.id }" class="colWidth95 marginbelowsm">
          ${optionStmts.join('')}
        </select>
        <button data-id="${user.id}" class="btn btn-warning">remove</button>
      </div>
    `;
  })
  var $divStmts = $(divStmts.join(''));
  $divStmts.on('click', 'button', function () {
    config.removeUser($(this).attr('data-id') * 1);
  })
  $divStmts.on('change', 'select', function () {
    config.selectOffice($(this)[0].name, $(this).val());
  })
  container.empty();
  container.append($divStmts);
}
