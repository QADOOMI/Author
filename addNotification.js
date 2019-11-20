const connection = require('./database-connection/connection.js').connection;

async function addNotification(data) {
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

exports.addNotification = addNotification;
