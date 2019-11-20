const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();
// this file for fetching shared posts and not shared posts
var fetchPostsRoute = function() {
  router.route('/').post(async (request, response) => {

    await connection.query('SELECT b.bookId, b.title, b.bookCover, b.userId FROM Books AS b LEFT JOIN Users AS u ON u.userId = b.userId WHERE b.bookId IN(SELECT p.bookId FROM Posts AS p LEFT JOIN Books AS b ON b.bookId = p.bookId LEFT JOIN Users AS u ON u.userId = p.userId AND u.userId = ? WHERE p.isShared = ?)', [request.body.userId, request.body.shared], (error, fetchResult, fields) => {
      if (error) {
        response.json(null);
        throw error;
      }
      if (fetchResult.length > 0) {
        response.json(fetchResult);
      } else {
        response.json(null);
      }
    });
  });
  return router;
}

module.exports = fetchPostsRoute;
