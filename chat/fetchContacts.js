const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const contactsRouter = express.Router();

var fetchContactsRoute = function() {
  contactsRouter.route('/').post((request, response) => {
      connection.query('SELECT distinct u.userId ,u.username, u.profileImage, m.message FROM Users AS u INNER JOIN Messages AS m ON u.userId = m.senderId OR u.userId = m.recieverId WHERE m.senderId = ? OR m.recieverId = ? ORDER BY m.sendDate ASC', [request.body.userId, request.body.userId], (error, fetchResult, fields) => {
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
return contactsRouter;
}

module.exports = fetchContactsRoute;
