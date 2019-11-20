const connection = require('./../database-connection/connection.js').connection;
const uuidv4 = require('uuid/v4');
const express = require('express');
const router = express.Router();

var fetchCartItemsRoute = function() {
  router.route('/').post(async (request, response) => {

    await connection.query('SELECT b.bookId, b.title, b.bookCover, b.price, u.userId, u.username, sc.itemId FROM ShoppingCart AS sc INNER JOIN Books AS b ON b.bookId = sc.bookId INNER JOIN Users AS u ON u.userId = sc.userId AND u.userId = ?', request.body.userId, (error, fetchResult, fields) => {
      if (error) {
        response.json({
          error: error,
          fetchCartItems: null
        });
      }
      console.log(fetchResult);

      if (fetchResult.length > 0) {
        response.json({
          error: null,
          fetchCartItems: fetchResult
        });
      } else {
        response.json({
          error: null,
          fetchCartItems: null
        });
      }
    });
  });
  return router;
}

module.exports = fetchCartItemsRoute;
