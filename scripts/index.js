'use strict';
/* global bookmarksList, store, api */
// eslint-disable-next-line no-unused-vars

$(document).ready(function() {
  console.log('page ran');
  console.log(store);
  bookmarksList.bindEventListeners();
  bookmarksList.render();

  /*api.getBookmark()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarksList.render();
    });
  
  */
});
  