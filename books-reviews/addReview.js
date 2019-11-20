const connection = require('./../database-connection/connection.js').connection;
const pusher = require('./../realtime-pusher/pusher.js').pusher;
const notification = require('./../addNotification.js');
const express = require('express');
const router = express.Router();

var addReviewRoute = function() {
  router.route('/').post(async (request, response) => {

    var insertData = [request.body.bookId, request.body.rateMessage, request.body.rateNumber, request.body.userId];

    await connection.query('INSERT INTO BooksReview(bookId, rateMessage, rateNumber, userId) VALUES(?,?,?,?)', insertData, (error, insertResult, fields) => {
      if (error) {
        response.json({
          error: error,
          addReviewMessage: error.sqlMessage,
          addReviewState: false
        });
        return;
      }

      if (insertResult.affectedRows > 0) {
        pusher.trigger('ReviewNotification', request.body.reviewedOnUserId, {
          reviewerId: request.body.reviewerId,
          reviewerName: request.body.reviewerName,
          reviewerImage: request.body.reviewerImage,
          reviewedBookTitle: request.body.reviewedBookTitle,
          reviewedBookId: request.body.reviewedBookId
        });

        var data = [request.body.reviewerId, request.body.reviewedBookId, request.body.reviewerName + ' followed you.', request.body.reviewedOnUserId];
        notification.addNotification(data);

        response.json({
          error: null,
          addReview: true
        });
      } else {
        response.json({
          error: null,
          addReview: false
        });
      }
    });
  });
  return router;
}

module.exports = addReviewRoute;
