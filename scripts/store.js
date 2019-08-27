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
  /*function findAndUpdate(id, newData) {
    let foundBookmark = store.bookmarks.find(bookmark => bookmark.id === id);
    Object.assign(foundBookmark, newData);
  }*/


  return {

    bookmarks: [
      {
        id: 1,
        title: 'Genetics Article',
        description: 'NGS at work description',
        url: 'http://www.bio.com',
        rating: 4,
        expanded: false,
      }
    ],
    adding: false,
    showError: '',
    filterBy: '',

    addBookmark,
    findById,
    findAndDelete,
    // findAndUpdate
  };
 

}());