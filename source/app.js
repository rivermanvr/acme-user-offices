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
        //add the user to the result array
        error1 = false;
        renderUserList()
      } else {
        error1 = true;
      }
      renderUserEntry()
    }

    //render userList component
    function renderUserList () {
      console.log('in the userList render function')
    }

    //call main rendering function
    renderPageData();
  })

});
