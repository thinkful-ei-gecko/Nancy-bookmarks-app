'use strict';
/* global bookmarksList, store, api */
// eslint-disable-next-line no-unused-vars

$(document).ready(function() {
  console.log('page ran');
  bookmarksList.bindEventListeners();
  api.getBookmarks()
    .then(res => res.json())
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarksList.render();

    })
    .catch(err => console.log(err.message));


  /*api.getBookmark()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
      bookmarksList.render();
    });
  
  */
});
  