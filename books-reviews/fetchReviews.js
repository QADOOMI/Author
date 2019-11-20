const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();

var fetchReviewsRoute = function() {
  router.route('/').post(async (request, response) => {

    await connection.query('SELECT * , count(*) AS reviewsCount FROM `BooksReview` WHERE `bookId` = ?', request.body.bookId, (error, fetchResult, fields) => {
      if (error) {
        response.json({
          error: error,
          fetchReviewsState: false,
          fetchReviewsResult: null
        });
        throw error;
      }

      if (fetchResult.length > 0) {
        response.json({
          fetchReviewsState: true,
          fetchReviewsResult: fetchResult
        });
      } else {
        response.json({
          fetchReviewsResult: null,
          fetchReviewsState: false
        });
      }
    });
  });
  return router;
}

module.exports = fetchReviewsRoute;
