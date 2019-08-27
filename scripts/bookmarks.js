'use strict';
/* global store, api $ */

const bookmarksList = (function (){



  function generateAddElements (bookmark){
    return `
        <form class="add-form">
            <div>
                <label for="title">Title</label>
                <input type="text" id="title" name="title" value="${bookmark.title}" placeholder="Enter Title">
            </div>
            <div>
                <label for="rating">Rating</label>
                <input type="text" id="rating" name="rating" value="${bookmark.rating}" placeholder="Rate it out of 5">
            </div>
            <div>
                <label for="description">Description</label>
                <input type="text" id="description" name="description" value="${bookmark.description}" placeholder="Enter a description">
            </div>
            <div>
                <label for="url">URL</label>
                <input type="text" name="url" id="url" placeholder="https://www.ncbi.nlm.nih.gov/">
            </div>
            <div>
                <input type="submit" name="submit" id="submit" value="Submit Form">
            </div>
        </form>`;
  }



  //adds the html to the DOM
  function generateBookmarkElements (bookmark){
    let titleElement = `<span class="bookmarkTitle">${bookmark.title}</span>`;
    let ratingElement = `<span class="bookmarkRating">Rating: ${bookmark.rating}</span>`;

    return `
    <ul>
        <li class="bookmark-element" data-item-id="${bookmark.id}">
            ${titleElement} ${ratingElement}
            <div class="expandable">
                <ul>Description: ${bookmark.description}</ul>
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
      $('.add-button').remove();
      store.adding = true; 
      render();

    });
  }

  //actually adding the information to the api/store



  function bindEventListeners() {
    handlerAddBookmark();
  }
 


  return {
    render,
    bindEventListeners
  };

}());