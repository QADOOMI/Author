const connection = require("./../database-connection/connection.js").connection;
//const pusher = require("./../realtime-pusher/pusher.js").pusher;
const express = require("express");
const router = express.Router();
const pusherRouter = express.Router();
const stream = require("stream");
const Pusher = require("pusher");

var fetchSpcificBooksCategoryRoute = function() {
  router.route("/").post((request, response) => {
    const pusher = new Pusher({
      appId: "897266",
      key: "f088d9eb66b33753c70d",
      secret: "a754938fc235945b788b",
      cluster: "ap2"
    });

    const fetchQuery =
      "SELECT u.profileImage, u.userId, u.username, b.bookCover, b.title, b.bookDescription,b.publishDate, b.bookId, br.rateNumber FROM Books AS b INNER JOIN Users AS u ON u.userId = b.userId LEFT JOIN BooksReview AS br ON br.bookId = b.bookId WHERE b.bookCategory = ? ORDER BY b.publishDate ASC";
    // test test test test test
    connection.query(
      fetchQuery,
      request.body.category,
      (error, result, fields) => {
        if (!error) {
          if (result.length > 0) {
            response.json(result);
          } else {
            response.json(null);
          }
        } else {
          response.json(null);
        }
      }
    );
  });
  return router;
};

module.exports.fetchSpcificBooksCategoryRoute = fetchSpcificBooksCategoryRoute;
