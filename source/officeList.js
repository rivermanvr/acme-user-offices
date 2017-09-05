function officeList(config) {
  var container = $(config.id);
  var divStmts = config.offices.map(office => {
    return `
      <div class="well backWhite nomarginTopBot">
        <h5>${ office.name }</h5>
        <div>latitude: ${ office.lat }</div>
        <div>longitude: ${ office.lng }</div>
        <div><h4><span class="label label-default margintopsm">${ office.users.length } - users</span></h4></div>      
        <button data-id="${office.id}" class="btn btn-danger pull-right">delete</button>
        <br clear="all" />
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
