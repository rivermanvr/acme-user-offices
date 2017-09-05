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

    //filtering out user records (in all results)

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

    //filter out office records

    function officeFilter() {
      //....................................................
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
        userFilter(id * 1);
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
        return getData();
      })
      .then(results => {
        renderUserList();
        renderOfficeList();
      })
    }

    //render officeList component

    function renderOfficeList () {
      console.log('I am in the renderOfficeList function')
      officeList({
        id: '#officeList',
        offices: results[1],
        removeOffice
      })
    }

    //removeOffice function

    function removeOffice (id) {
      console.log('I am in the removeOffice function', id)

      //ajax request.............................................
      //need a then here.........................................
      getData()
      .then(results => {
        renderUserList();
        renderOfficeList();
      })
    }

  })    //.then closure
});     //.ready closure
