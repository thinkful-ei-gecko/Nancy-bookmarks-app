'use strict';

let store = (function (){

  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
  }

  //returns the bookmark identified by the id 
  const findById = function (id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  }

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
  };

  const setFilterBy = function (rank) {
    this.filterBy = rank;
  }

  return {

    bookmarks: [],
    error: null,
    filterBy: 'Filter By Rating',

    setError,
    addBookmark,
    findById,
    findAndDelete,
    setFilterBy
  };
 

}());