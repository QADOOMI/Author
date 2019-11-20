const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();

var fetchDraftedRoute = function() {
  router.route('/').post(async (request, response) => {
    console.log(request.body);
    await connection.query('SELECT b.bookId, b.bookCover, b.title, u.username, u.userId FROM Books AS b LEFT JOIN Users AS u ON u.userId = b.userId WHERE b.bookId IN(SELECT db.bookId FROM DraftedBooks AS db LEFT JOIN Books AS b ON b.bookId = db.bookId LEFT JOIN Users AS u ON u.userId = db.userId AND u.userId = ?)', request.body.userId, (error, fetchResult, fields) => {
      if (error) {
        response.json(null);
        throw error;
      }

      if (fetchResult.length > 0) {
        response.json({fetchDraftedResult: fetchResult});
      } else {
        response.json(null);
      }
    });
  });
  return router;
}

module.exports = fetchDraftedRoute;