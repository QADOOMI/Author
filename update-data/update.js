const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();
// this route to update user data, reviews.
var updateRoute = function() {
  router.route('/').post(async (request, response) => {
    console.log(request.body);
    await connection.query(request.body.query, (error, updateResult, fields) => {
      if (error) {
        response.json(
          false
        );
        console.log(error);
        return;
      }

      if (updateResult.affectedRows > 0) {
        response.json(
          true
        );
      } else {
        response.json(
          false
        );
      }
    });
  });
  return router;
}

module.exports = updateRoute;
