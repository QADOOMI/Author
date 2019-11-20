const connection = require('./../database-connection/connection.js').connection;
const pusher = require('./../realtime-pusher/pusher.js').pusher;
const notification = require('./../addNotification.js');
const express = require('express');
const router = express.Router();

var followingRoute = function() {
  router.route('/').post(async (request, response) => {

    var insertData = [request.body.follower, request.body.followed];

    await connection.query('INSERT INTO Followers(follower, followed) VALUES(?,?)', insertData, (error, insertResult, fields) => {
      if (error) {
        response.json({
          error: error,
          followingMessage: error.sqlMessage,
          followingState: false
        });
      }

      if (insertResult.affectedRows > 0) {
        pusher.trigger('FollowNotification', request.body.follower, {
          followerId: request.body.follower,
          followerName: request.body.followerName,
          message: request.body.followerName + ' followed you.'
        });

        response.json({
          error: null,
          followingState: true
        });

        var data = [request.body.follower, null, request.body.followerName + ' followed you.', request.body.followed];
        notification.addNotification(data);

      } else {
        response.json({
          error: null,
          followingState: false
        });
      }
    });
  });
  return router;
}

async function addNotifications(connction, followed, followerId, followerName) {
  var data = [followerId, null, followerName + ' followed you.', followed];
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

module.exports = followingRoute;
