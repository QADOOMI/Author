const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();

var fetchFollowersRoute = function() {
  router.route('/').post(async (request, response) => {

    await connection.query('SELECT u.userId, u.username, u.profileImage FROM Users AS u INNER JOIN Followers AS f ON f.follower = u.userId AND f.followed = u.userId WHERE f.followed = ?', request.body.userId, (error, fetchResult, fields) => {
      if (error) {
        response.json({
          error: error,
          fetchFollowersResult: null
        });
        throw error;
      }

      if (fetchResult.length > 0) {
        response.json({
          error: null,
          fetchFollowersResult: fetchResult
        });
      } else {
        response.json({
          error: null,
          fetchFollowersState: false
        });
      }
    });
  });
  return router;
}

module.exports = fetchFollowersRoute;
