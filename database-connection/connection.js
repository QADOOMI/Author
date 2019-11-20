const mysql = require('mysql');

const databaseConfiguration = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'mostafabaron123@',
  database: 'Authors',
  multipleStatements: true
};

var pool = mysql.createPool(databaseConfiguration);

pool.getConnection((error, connection) => {
  if (error) {
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (error.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (error.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  } else {
    return connection;
    console.log('connected to database.');
  }
});

exports.connection = pool;
