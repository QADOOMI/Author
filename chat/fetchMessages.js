const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const messagesRouter = express.Router();

var fetchMessagesRoute = function() {
  messagesRouter.route('/').post((request, response) => {
    connection.query('SELECT * FROM Messages AS m WHERE (m.senderId = ? AND m.reciverId = ?) OR (m.senderId = ? AND m.reciverId = ?) ORDER BY m.sendDate ASC ', [request.body.senderId, request.body.reciverId, request.body.reciverId, request.body.senderId], (error, fetchResult, fields) => {
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
  return messagesRouter;
}

module.exports = fetchMessagesRoute;
