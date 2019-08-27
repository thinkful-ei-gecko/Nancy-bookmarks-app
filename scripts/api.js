'use strict';
/* global $ */

const api = (function (){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/nancy';

  const getBookmark = function (){
    fetch(`${BASE_URL}/bookmarks`);
  };

  const createBookmarkTitle = function (title){
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title})
    });
  };

  const deleteBookmark = function (id){
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'DELETE'
    });
  };

  /*const updateBookmarkInfo = function (id, updateData) {

  }*/
  return {
    getBookmark,
    createBookmarkTitle,
    deleteBookmark
  };
}());