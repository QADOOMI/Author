const connection = require("./../database-connection/connection.js").connection;
const uuidv4 = require("uuid/v4");
const express = require("express");
const router = express.Router();

var addToCartRoute = function() {
  router.route("/").post(async (request, response) => {
    var insertData = [uuidv4(), request.body.bookId, request.body.userId];

    await connection.query(
      "INSERT INTO ShoppingCart(itemId, bookId, userId) VALUES(?,?,?)",
      insertData,
      (error, insertResult, fields) => {
        if (error) {
          response.json({
            error: error,
            addToCartMessage: error.sqlMessage,
            addToCartState: false
          });
        }

        if (insertResult.affectedRows > 0) {
          response.json({
            error: null,
            addToCartState: true
          });
        } else {
          response.json({
            error: null,
            addToCartState: false
          });
        }
      }
    );
  });
  return router;
};

module.exports = addToCartRoute;
