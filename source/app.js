/* globals userEntry $ */

$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/seed'
  })
  .then(results => {
    console.log('initial get: ', results);
    let error1 = false;

    //main rendering function
    function renderPageData() {
      renderUserEntry();
      renderUserList();
    }

    //render userEntry component
    function renderUserEntry() {
      userEntry({
        id: '#userEntry',
        error: error1,
        addUser
      });
    }

    //addUser function (ajax)
    function addUser (name) {
      if (name) {
        $.ajax({
          method: 'POST',
          url: '/users/' + name
        })
        .then(user => {
          results[0].push(user);
          error1 = false;
          renderUserList()
        })
      } else {
        error1 = true;
      }
      renderUserEntry()
    }

    //render userList component
    function renderUserList () {
      userList({
        id: '#userList',
        users: results[0],
        offices: results[1],
        removeUser,
        selectOffice
      });
    }

    //removeUser function (ajax)
    function removeUser (id) {
      $.ajax({
        method: 'DELETE',
        url: '/users/' + id
      })
      .then(() => {
        results[0] = results[0].filter(user => {
          return user.id !== id;
        })
        renderUserList()
      })
    }

    //selectOffice function (ajax)
    function selectOffice (userId, officeId) {
      $.ajax({
        method: 'PUT',
        url: '/users/' + userId + '/office/' + officeId
      })
    }

    //call main rendering function
    renderPageData();
  })

});
