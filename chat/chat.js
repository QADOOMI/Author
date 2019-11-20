const express = require('express'),
  app = express(),
  router = express.Router(),
  http = require('http'),
  server = http.createServer(app),
  io = require('socket.io').listen(server),
  pusher = require('./../realtime-pusher/pusher.js').pusher,
  connection = require('./../database-connection/connection.js').connection;

app.route('/').get((req, res) => {

});

(async function() {

  io.on('connection', (socket) => {
    console.log('users connected');

   socket.on('join', function(user) {
      console.log(user.name, ' has joined the chat, id: ' + user.userId);
      socket.broadcast.emit('usersjoinedthechat', user.name + " has joined the chat");

    })

     socket.on('messagedetection', async function(messageData) {
      console.log(messageData.senderId, ' sends ', messageData.message, ' to ', messageData.receiverId);

      await connection.query('INSERT INTO Messages(senderId,receiverId, message, sendDate) VALUES(?, ?, ?,NOW())', [messageData.senderId, messageData.receiverId, messageData.message], (err, result, fields) => {
        if (!err) {
          if (result.affectedRows > 0) {
            io.emit('messageFrom' + messageData.senderId + 'To' + messageData.receiverId, messageData);
            pusher.trigger('messaging', messageData.receiverId, messageData);
            console.log('meesage ', messageData);
          } else {
            console.log('message didn\'t send query no result');
          }
        } else {
          console.log('message didn\'t send error with query ', err);
        }
      });
    })

    socket.on('disconnect', () => {
      console.log(' discconnected from the server');

      socket.broadcast.emit('usersdisconnect', ' users has disconnected');
    })
  });
})();

server.listen(process.env.port || 3000, () => {
  console.log('connected to 3000 port');
});
