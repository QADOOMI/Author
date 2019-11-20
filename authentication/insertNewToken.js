const connection = require("./../database-connection/connection.js").connection;
const express = require("express");
const router = express.Router();

var insertNewTokenRoute = function() {
  router.route("/").post((request, response) => {
    const newToken = request.body;

    const insertTokenQuery =
      "INSERT INTO `UsersToken`(`userId`, `userToken`) VALUES(?,?)";

    connection.query(
      insertTokenQuery,
      [newToken.userId, newToken.userToken],
      (error, insertTokenResult, fields) => {
        if (!error) {
          if (insertTokenResult.affectedRows > 0) {
            response.json(true);
            return;
          } else {
            response.json(false);
          }
        } else {
          console.log(error);
          response.json(false);
        }
      }
    );
  });
  return router;
};

module.exports = insertNewTokenRoute;
