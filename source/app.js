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
    let error1 = false;

    //main rendering function

    function renderPageData() {
      renderUserEntry();
      renderUserList();
      renderOfficeList();
      renderOfficeEntry();
    }

    //call main rendering function

    renderPageData();

    // Need to initialize the map 

    initMap()

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

    // render officeEntry component

    function renderOfficeEntry () {
      officeEntry({
        id: '#officeEntry'
      })
    }

    //officeEntry listener

    function initMap() {
      var input = document.getElementById('map-input');
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', function() {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
    
        var officeObj = {
          name: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        addOffice(officeObj);
      });
    }

    //addOffice function (ajax)

    function addOffice (officeObj) {
      $.ajax({
        url: '/offices',
        method: 'POST',
        data: obj
      })
      .then(office => {
        results[1] = results[1].concat(office);
        renderOfficeList();
        renderOfficeEntry();
        renderUserList();
      })
    }

  })
});
