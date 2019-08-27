'use strict';
/* global store, api $ */

const bookmarksList = (function (){



  function generateAddElements (){
    return `
        <form id="add-form">
            <div>
                <label for="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Enter Title">
            </div>
            <div>
                <label for="rating">Rating</label>
                <input type="number" id="rating" name="rating" max="5" placeholder="Rate it out of 5">
            </div>
            <div>
                <label for="desc">Description</label>
                <input type="text" id="desc" name="desc" placeholder="Enter a description">
            </div>
            <div>
                <label for="url">URL</label>
                <input type="text" name="url" id="url" placeholder="https://www.ncbi.nlm.nih.gov/">
            </div>
            <div class="add-submit-button">
                <input type="submit" name="submit" id="submit" value="Create Bookmark">
            </div>
        </form>`;
  }



  //adds the html to the DOM
  function generateBookmarkElements (bookmark){
    let titleElement = `<span class="bookmarkTitle">${bookmark.title}</span>`;
    let ratingElement = `<span class="bookmarkRating">Rating: ${bookmark.rating}</span>`;

    return `
    <ul class="bookmark-element" data-item-id="${bookmark.id}">
        <li>
            ${titleElement} ${ratingElement}
            <div id="elementExpand" class="expandable">
                <ul>Description: ${bookmark.desc}</ul>
                <ul>Visit: ${bookmark.url}</ul>
            </div>
        </li>
        <button class="delete"><span class="button-label">Delete</span></button>
        <button class="expand"><span class="button-label">Expand</span></button>
    </ul>
        `;

  }

  function generateBookmarkItemString(bookmarksList) {
    const bookmarks = bookmarksList.map((bookmark) => generateBookmarkElements(bookmark));
    return bookmarks.join('');
  }


  function render() {
    let bookmarks = [...store.bookmarks];

    if(store.adding){
      $('.add-form-container').html(generateAddElements);
    }

    console.log('render ran');
    const bookmarkListString = generateBookmarkItemString(bookmarks);
    $('.bookmark-list').html(bookmarkListString);

  }


  //when add button is clicked 
  //add button is removed
  //updates store to make adding: true
  function handlerAddBookmark(){
    console.log('addBookmarkHandler fired');
    $('.add-button').on('click', function() {
      store.adding = true; 
      render();

    });
  }

  //actually adding the information to the api/store
  function handleNewBookmarkSubmit(){
    function serializeJson(form) {
    //new formData is an object containing 
    //keys - which are the 'name' att
    //values - the input values 
      const formData = new FormData(form); 
      const o = {};
      formData.forEach((val, name) => o[name] = val);
      return JSON.stringify(o);
    }

    console.log('adding event listener');
    $('.add-form-container').on('submit', '#add-form', function (event) {
      event.preventDefault();
      let formElement = $('#add-form')[0];
      console.log(serializeJson(formElement)); //{"firstname":"Chitchanok","lastname":"Phiukhao","email":"cphiukhao@yahoo.com"}

      let data = serializeJson(formElement);
      api.createBookmark(data)
        .then(res => res.json()) //converting back to js 
        .then((data) => {
          store.addBookmark(data);
          render();
        });
    });
  }

  function getIdFromElement(bookmark){
    return $(bookmark)
      .closest('.bookmark-element')
      .data('item-id');
  }

  function handlerDelete() {
    $('.bookmark-list').on('click', '.delete', event => {
      console.log('delete button clicked');
      const id = getIdFromElement(event.currentTarget);
      console.log(id);

      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        });

    });
  }


  /*
  function handlerExpand(){
    $('.bookmark-list').on('click', '.expand', function () {
      console.log('expand button working');
      $('#elementExpand').toggle();
      render();
    });
  }
*/

  function bindEventListeners() {
    handlerAddBookmark();
    handleNewBookmarkSubmit();
    handlerDelete();
    //handlerExpand();
  }
 


  return {
    render,
    bindEventListeners
  };

}());