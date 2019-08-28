'use strict';

let store = (function (){


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
  /*function findAndUpdate(id, newData) {
    let foundBookmark = store.bookmarks.find(bookmark => bookmark.id === id);
    Object.assign(foundBookmark, newData);
  }*/

  /*
  const error = function(errorMessage){
      this.showError = //error message
  }
  */

  return {

    bookmarks: [],
    adding: false,
    showError: '',
    filterBy: 'ALL',

    addBookmark,
    findById,
    findAndDelete,
    setFilterBy
    // findAndUpdate
  };
 

}());