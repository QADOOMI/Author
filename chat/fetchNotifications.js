const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const notificationRouter = express.Router();

var fetchNotificationsRoute = function() {
  notificationRouter.route('/').post((request, response) => {
      connection.query('SELECT n.* ,b.title, u.userId ,u.username, u.profileImage FROM Notification AS n INNER JOIN Users AS u ON u.userId = n.notificationFrom INNER JOIN Books AS b ON b.bookId = n.bookId WHERE n.notificationTo = ?', request.body.userId, (error, fetchResult, fields) => {
        if (error) {
          response.json(null);
          return;
        }

        if (fetchResult.length > 0) {
          response.json(fetchResult);
        } else {
          response.json(null);
        }
      });
  });
return notificationRouter;
}

module.exports = fetchNotificationsRoute;
