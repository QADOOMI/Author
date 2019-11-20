const connection = require('./../database-connection/connection.js').connection;
const notification = require('./../addNotification.js');
const express = require('express');
const router = express.Router();
const pusher = require('./../realtime-pusher/pusher.js').pusher;


var bookShareRoute = function() {
  router.route('/').post((request, response) => {

    const insertData = [request.body.whoSharedId, request.body.bookSharedId, true];
    connection.query('INSERT INTO `Posts`(`userId`, `bookId`, `isShared`) VALUES(?,?,?)', insertData, (error, shareResult, fields) => {
      if (error) {
        response.json({
          error: error,
          shareState: false
        });
      }

      if (shareResult.affectedRows > 0) {
        pusher.trigger('ShareAPostNotification', request.body.bookOwnerId, {
          whoSharedId: request.body.whoSharedId,
          bookSharedId: request.body.bookSharedId,
          message: request.body.whoSharedName + ' shared `' + request.body.bookName + '`'
        });

        notification.addNotification([request.body.whoSharedId, request.body.bookSharedId, request.body.whoSharedName + ' share a book of yours.', request.body.bookOwnerId]);

        response.json({
          error: null,
          shareState: true
        });
      } else {
        response.json({
          error: null,
          shareState: false
        });
      }
    });
  });
  return router;
}

async function addNotification(connction, bookOwnerId, whoSharedId, bookSharedId, whoSharedName) {
  var data = [whoSharedId, bookSharedId, whoSharedName + ' share a book of yours.', bookOwnerId];
  await connection.query('INSERT INTO `Notification`(`notificationFrom`, `bookId`, `notificationMessage`, `notificationTo`) VALUES(?,?,?,?)', data, (error, insertResult, fields) => {
    if (error)
      console.log(error);
    if (insertResult.affectedRows > 0) {
      console.log('row added');
    } else {
      console.log('not added');
    }
  });
}

module.exports = bookShareRoute;
