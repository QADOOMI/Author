const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();
// this route for delete user accounts, posts, cart item, book in library and book in draft.
var deleteRoute = function() {
  router.route('/').post(async (request, response) => {
    console.log(request.body);
    await connection.query(request.body.query, request.body.id, (error, deleteResult, fields) => {
      if (error) {
        response.json(false);
        return;
      }

      if (deleteResult.affectedRows > 0) {
        response.json(true);
      } else {
        response.json(false);
      }
    });
  });
  return router;
}

module.exports = deleteRoute;
