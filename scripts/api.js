'use strict';
/* global  */

const api = (function (){


  const listApiFetch = function(...args) {

    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };

          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }

        return res.json();
      })
      .then(data => {

        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }

        return data;
      });
  };


  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/nancy';

  const getBookmarks = function (){
    return listApiFetch(`${BASE_URL}/bookmarks`);
  };

  const createBookmark = function (data){
    return listApiFetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
  };

  const deleteBookmark = function (id){
    return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
      method: 'DELETE'
    });
  };


  return {
    getBookmarks,
    createBookmark,
    deleteBookmark
  };
}());