const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const FeedbackBook = require('./../book-structure/book.js').FeedbackBook;
const feedbackRouter = express.Router();

var fetchFeedbackRoute = function() {
  feedbackRouter.route('/').post((request, response) => {

    var queryValuesSymbols = '';
    for (var i = 0; i < request.body.length; i++) {
      if (i == request.body.length - 1) {
        queryValuesSymbols = queryValuesSymbols + '?';
        break;
      }
      queryValuesSymbols = queryValuesSymbols + '?,';
    }

    var query = 'SELECT b.bookId, b.bookCover, b.title, b.bookCategory, b.bookDescription, b.price, b.publishDate ,p.userId \'sharedOrNot\', u.userId, u.username, u.profileImage, IF(lb.bookId IS NOT NULL, true, false) \'bookMarked\', p.isShared FROM Books AS b LEFT JOIN Posts AS p ON b.bookId = p.bookId INNER JOIN Users AS u ON u.userId = b.userId LEFT JOIN BooksLibrary AS lb ON lb.bookId = b.bookId WHERE b.userId IN(' + queryValuesSymbols + ') ORDER BY b.bookCategory DESC';

    connection.query(query, request.body, async (error, fetchResult, fields) => {
      if (error) {
        console.log(error);
        return;
      }

      var feedbackBooks = null;

      if (fetchResult.length > 0) {
       feedbackBooks = new FeedbackBook(fetchResult);

        fetchReviews(connection, response, feedbackBooks);
      } else {

        feedbackBooks = fetchResult;
        response.json({
          feedbackBooks
        });
      }
    });
  });
  return feedbackRouter;
}

function fetchReviews(connection, response, feedbackBooks) {

  for (var i = 0; i < feedbackBooks.books.length; i++) {
    const index = i;

    connection.query('SELECT br.rateNumber, br.rateMessage FROM BooksReview AS br WHERE br.bookId = ?', feedbackBooks.books[i].bookId, async (error, bookReviews, fields) => {
      if (error)
        console.log(error);

      if (bookReviews.length > 0) {
        feedbackBooks.books[index].bookReviews = bookReviews;

        if (index == feedbackBooks.books.length - 1) {
          response.json({
            feedbackBooks
          });
        }
      } else {

        if (index == feedbackBooks.books.length - 1) {
          response.json({
            feedbackBooks
          });
        }
      }
    });
  }
}

module.exports = fetchFeedbackRoute;
