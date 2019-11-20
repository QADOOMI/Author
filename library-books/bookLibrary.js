const connection = require('./../database-connection/connection.js').connection;
const AddLibraryBook = require('./../book-structure/book.js').AddLibraryBook;
const express = require('express');
const addRouter = express.Router();
const fetchRouter = express.Router();


const addToLibraryRoute = function() {
  addRouter.route('/').post(async (request, response) => {
    console.log(request.body);

    await connection.query('INSERT INTO `BooksLibrary`(`bookId`, `userId`) VALUES(?,?)', [request.body.bookId, request.body.userId], (error, addResult, fields) => {
      if (error) {
        console.log(error);
        return;
      }
      if (addResult.affectedRows > 0) {
        response.json(true);
      } else {
        response.json(false);
      }
    });
  });
  return addRouter;
};

const fetchLibraryRoute = function() {
  fetchRouter.route('/').post((request, response) => {
    const fetchQuery = 'SELECT distinct u.username, u.userId, b.bookId, b.title, b.bookCover FROM BooksLibrary AS bl INNER JOIN Users AS u ON u.userId = bl.userId INNER JOIN Books AS b ON b.bookId = bl.bookId WHERE bl.userId = ?'
    connection.query(fetchQuery, request.body.userId, (error, fetchResult, fields) => {
      if (error) response.json({
        libraryBooks: null,
        error: error
      });

      if (fetchResult.length > 0) {
        console.log(fetchResult);
        response.json({
          libraryBooks: fetchResult
        });
      } else {
        console.log(fetchResult);
        response.json({
          libraryBooks: null
        });
      }
    });
  });

  return fetchRouter;
};

module.exports = {
  addToLibraryRoute,
  fetchLibraryRoute
};
