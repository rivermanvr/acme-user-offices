/* globals userEntry userList $ */

$(document).ready(() => {
  function getData () {
    return   $.ajax({
      method: 'GET',
      url: '/data'
    })
  }
  getData()
  .then(results => {
    console.log('initial get: ', results);
    let error1 = false;

    //main rendering function

    function renderPageData() {
      renderUserEntry();
      renderUserList();
      renderOfficeList();
    }

    //call main rendering function

    renderPageData();

    //filtering out deleted user records

    function userFilter(id) {
      results[0] = results[0].filter(user => {
        return user.id !== id;
      })
      results[1].forEach(office => {
        office.users = office.users.filter(user => {
          return user.id !== id;
        })
      })
    }

    //correct records on user office change

    function userOfficeFilter(userId, officeId) {
      results[0].forEach(user => {
        if (user.id === userId) user.officeId = officeId;
      })
      let userObj = { id: userId }
      results[1].forEach(office => {
        office.users = office.users.filter(user => {
          return user.id !== userId;
        })
        if (userId !== 0 && office.id === officeId) office.users.push(userObj);
      })
    }

    //filtering out deleted office records

    function officeFilter(id) {
      results[1] = results[1].filter(office => {
        return office.id !== id;
      })
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
        id = id * 1;
        userFilter(id);
        renderUserList();
        renderOfficeList();
      })
    }

    //selectOffice function (ajax)

    function selectOffice (userId, officeId) {
      $.ajax({
        method: 'PUT',
        url: '/users/' + userId + '/office/' + officeId
      })
      .then(() => {
        userOfficeFilter(userId * 1, officeId * 1);
        renderUserList();
        renderOfficeList();
      })
    }

    //render officeList component

    function renderOfficeList () {
      officeList({
        id: '#officeList',
        offices: results[1],
        removeOffice
      })
    }

    //removeOffice function

    function removeOffice (id) {
      $.ajax({
        method: 'DELETE',
        url: '/offices/' + id
      })
      .then(() => {
        id = id * 1;
        officeFilter(id);
        renderUserList();
        renderOfficeList();
      })
    }

  })
});
