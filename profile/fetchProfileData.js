const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();


var fetchProfileRoute = function() {
  router.route('/').post((request, response) => {
    connection.query('SELECT count(b.bookId) AS booksCount, count(br.bookId) AS reviewsCount, avg(br.rateNumber) AS reviewsAvg, u.* FROM Users AS u LEFT JOIN Books AS b ON b.userId = u.userId LEFT JOIN BooksReview AS br ON br.bookId = b.bookId WHERE u.userId = ?', [request.body.userId, request.body.userId], (error, fetchResult, fields) => {
      if (error) {
        response.json(null);
        console.log('first query error', error);

        return;
      }

      if (fetchResult.length > 0) {
        fetchFollowers(connection, response, request.body.userId, fetchResult);
      } else {
        console.log('no profile data');
        response.json(null);
      }
    });
  });
  return router;
}


async function fetchFollowers(connection, response, followed, author) {
  console.log(author + '\n\n' + followed + '\n\n');

  await connection.query('SELECT u.username, u.profileImage, f.follower FROM Users AS u INNER JOIN Followers AS f ON u.userId = f.follower WHERE f.followed = ?', followed, (error, authorFollowers, fields) => {
    if (error) {
      response.json(null);
      console.log('second query error ', error);

      return;
    }

    if (authorFollowers.length > 0) {
      response.json({
        profileInfo: author[0],
        authorFollowers
      });
    } else {
      console.log('no followers');
      response.json({
        profileInfo: author[0],
        authorFollowers
      });
    }
  });
}
module.exports = fetchProfileRoute;
