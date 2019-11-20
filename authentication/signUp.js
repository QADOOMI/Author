const connection = require('./../database-connection/connection.js').connection;
const User = require('./../user-structure/user.js').SignUpUser;
const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

var signUpRoutes = function() {
  router.route('/').post((request, response) => {
    const userJsonData = request.body;

    userJsonData.userId = uuidv4();

    var user = new User(userJsonData);

    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, (error, hash) => {
      const insertUserQuery = 'INSERT INTO `Users`(`userId`, `username`, `password`, `email`, `birthday`, `aboutMe`, `facebookAccount`, `twitterAccount`, `linkedinAccount`, `profileImage`) VALUES(?,?,?,?,?,?,?,?,?,?);';
      const finalInsertQuery = insertUserQuery + 'INSERT INTO `UsersToken`(`userId`, `userToken`) VALUES(?,?)';
      var signUpResult = connection.query(finalInsertQuery, [user.userId, user.username, hash, user.email, user.birthday, user.aboutMe, user.facebookAccount, user.twitterAccount, user.linkedInAccount, user.profileImage, user.userId, user.token], (error, signUpResult, fields) => {
        if (!error) {
          if (signUpResult[0].affectedRows > 0 && signUpResult[1].affectedRows > 0) {
            console.log(signUpResult[0], signUpResult[1]);
            response.json("Account created.");
            return;
          }
          response.json("Something went wrong try again.");
          return;
        }
        if (error.code === 'ER_DUP_ENTRY') {
          if (error.code.includes('username_')) {
            response.json("This username already taken.");
          } else if (error.code.includes('email_')) {
            response.json("This email already registered.");
          }
          console.error(error);
        }

      });
    });
  });
  return router;
};

module.exports = signUpRoutes;
