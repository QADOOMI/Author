const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();

var searchRoute = function() {
  router.route('/').post(async (request, response) => {

    const searchData = prepareSearchData(request);

    if(typeof searchData === 'string'){
      response.json({searchErrorMessage: 'No data sent(All null)'});
      return;
    }

    await connection.query('SELECT b.*, u.* FROM Users AS u INNER JOIN Books AS b ON b.userId = u.userId WHERE(u.username LIKE ? OR u.email LIKE ? ) OR(b.title LIKE ? OR b.bookDescription LIKE ? ) ORDER BY b.publishDate ASC ', searchData, (error, fetchResult, fields) => {
      if (error) {
        response.json({
          error: error,
          searchResult: null
        });
      }

      if (fetchResult.length > 0) {
        response.json({
          error: null,
          searchResult: fetchResult
        });
      } else {
        response.json({
          error: null,
          searchResult: null
        });
      }
    });
  });
  return router;
}

function prepareSearchData(request) {
  var searchData = {
    username: request.body.username,
    email: request.body.email,
    bookDescription: request.body.bookDescription,
    title: request.body.title
  };


  if (searchData.username != null) {
    searchData.email = '%' + searchData.username + '%';
    searchData.title = '%' + searchData.username + '%';
    searchData.bookDescription = '%' + searchData.username + '%';

  } else if (searchData.email != null) {
    searchData.username = '%' + searchData.email + '%';
    searchData.title = '%' + searchData.email + '%';
    searchData.bookDescription = '%' + searchData.email + '%';

  } else if (searchData.bookDescription != null) {
    searchData.username = '%' + searchData.bookDescription + '%';
    searchData.title = '%' + searchData.bookDescription + '%';
    searchData.email = '%' + searchData.bookDescription + '%';

  } else if (searchData.title != null) {
    searchData.username = '%' + searchData.title + '%';
    searchData.bookDescription = '%' + searchData.title + '%';
    searchData.email = '%' + searchData.title + '%';
  } else {
    return 'No data sent';
  }

  return [searchData.username, searchData.email, searchData.bookDescription, searchData.title];

}

module.exports = searchRoute;
