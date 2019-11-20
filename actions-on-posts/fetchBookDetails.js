const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const bookDetailsRouter = express.Router();
const bookContentRouter = express.Router();

var fetchBookDetailsRoute = function() {
  bookDetailsRouter.route('/').post((request, response) => {
      connection.query('SELECT b.*, u.userId, u.username, u.profileImage,(SELECT sum(br.rateNumber) FROM BooksReview AS br WHERE br.bookId = ? ) AS rateSum FROM Books AS b INNER JOIN Users AS u ON b.userId = u.userId WHERE b.bookId = ?', [request.body.bookId, request.body.bookId], (error, fetchResult, fields) => {
        if (error) {
          response.json({
            error: error,
            bookDetails: null
          });
          return;
        }

        if (fetchResult.length > 0) {
          response.json({
            error: null,
            bookDetails: fetchResult
          });
        } else {
          response.json({
            error: null,
            bookDetails: null
          });
        }
      });
  });
return bookDetailsRouter;
}

var fetchBookContentRoute = function() {
  bookContentRouter.route('/').post((request, response) => {
    connection.query('SELECT bc.* FROM BooksContent AS bc INNER JOIN Books AS b ON b.bookId = bc.bookId WHERE bc.bookId = ?', [request.body.bookId], (error, fetchResult, fields) => {
      if (error) {
        response.json({
          error: error,
          bookContent: null
        });
        return;
      }

      if (fetchResult.length > 0) {
        response.json({
          error: null,
          bookContent: fetchResult
        });
      } else {
        response.json({
          error: null,
          bookContent: null
        });
      }
    });
  });
  return bookContentRouter;
}

module.exports = {fetchBookDetailsRoute, fetchBookContentRoute};
