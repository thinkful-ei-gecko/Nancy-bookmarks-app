'use strict';
/* global  */

const api = (function (){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/nancy';

  const getBookmarks = function (){
    return fetch(`${BASE_URL}/bookmarks`);
  };

  const createBookmark = function (data){
    return fetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
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
    getBookmarks,
    createBookmark,
    deleteBookmark
  };
}());