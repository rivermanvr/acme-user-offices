/* globals userEntry $ */

$(document).ready(() => {
  $.ajax({
    method: 'GET',
    url: '/seed'
  })
  .then(results => {

    //main rendering function
    function renderPageData() {
      renderUserEntry();
    }

    //render userEntry component
    function renderUserEntry() {
      userEntry({
        id: '#userEntry'
      });
      console.log(results);
    }

    //call main rendering function
    renderPageData();
  })

});
