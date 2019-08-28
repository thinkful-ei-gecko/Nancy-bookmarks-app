'use strict';
/* global store, api $ */

const bookmarksList = (function (){

  function generateError(message) {
    return `
      <section class="error-content">
        <button id="cancel-error">Close Error Message</button>
        <p>Uh oh! Something went wrong. <span class="error-message">Server says: ${message}</span></p>
      </section>
    `;
  }

  function renderError() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  }

  function generateAddElements (){
    return `
        <form id="add-form">
            <div class="title">
                <label for="title">Title</label>
                <input type="text" id="title" name="title" placeholder="Enter Title" required>
            </div>
            <div class="rating">
                <label for="rating">Rating</label>
                <input type="number" id="rating" name="rating" max="5" placeholder="Rate it out of 5">
            </div>
            <div class="description">
                <label for="desc">Description</label>
                <input type="text" id="desc" name="desc" placeholder="Enter a description">
            </div>
            <div class="url">
                <label for="url">URL</label>
                <input type="text" name="url" id="url" placeholder="https://www.ncbi.nlm.nih.gov/" required>
            </div>
            <div class="submit-cancel-button-container">
                <input type="submit" name="submit" id="submit" value="Create Bookmark">
            </div>
            <div>
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
            <div id="elementExpand" class="hide">
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
    renderError();

    let bookmarks = [...store.bookmarks];
    if(store.filterBy !== 'Filter By Rating'){


/////////////////////// explain logic please       
      bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.filterBy);
    }
    console.log('render ran');
    const bookmarkListString = generateBookmarkItemString(bookmarks);
    $('.bookmark-list').html(bookmarkListString);

  }

  function handlerAddBookmark(){
    console.log('addBookmarkHandler fired');
    $('.add-button').on('click', function() {
      store.adding = true; 
      if(store.adding){
        $('.add-form-container').html(generateAddElements);
      }

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
        .then((data) => {
          store.addBookmark(data);
          formElement.classList.add('hide');
          render();
        })
        .catch((err) => {
          store.setError(err.message);
          renderError();
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

  function handlerFilterByRank() {
    $('.select-button').change(function() {
      let selectVal = $('.select-button').val();
      console.log(selectVal);
      store.setFilterBy(selectVal);
      console.log(store);
      render();

    });
  
  }


  function handlerExpand(){
    $('.bookmark-list').on('click', '.expand', function () {
      console.log('expand button working');
      const closestBookmarkLi = $(this).parent().find('li')[0];

      const expandElement = closestBookmarkLi.children[2];
     
      expandElement.classList.toggle('hide');
     
    });
  }

  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      renderError();
    });
  }


  function bindEventListeners() {
    handlerAddBookmark();
    handleNewBookmarkSubmit();
    handlerDelete();
    handlerFilterByRank();
    handlerExpand();
    handleCloseError();
  }
 


  return {
    render,
    bindEventListeners,
    
  };

}());