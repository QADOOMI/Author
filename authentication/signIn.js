const connection = require("./../database-connection/connection.js").connection;
const User = require("./../user-structure/user.js").SignInUser;
const FullUser = require("./../user-structure/user.js").SignUpUser;
const express = require("express");
const app = express();
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const passportAuthData = {
  usernameField: "email"
};

var signInRoutes = function() {
  router.route("/").post((request, response) => {
    const userJsonData = request.body;
    var user = new User(userJsonData);

    passport.use(
      new LocalStrategy(passportAuthData, (email, password, done) => {
        console.log("inside LocalStrategy");

        connection.query(
          "SELECT * FROM `Users` where `email` = ?",
          user.email,
          (error, signInResult, fields) => {
            if (!error) {
              // if the user is signedUp and signing in from already exist device
              if (signInResult.length > 0) {
                let pass = request.body.password;
                let token = request.body.token;
                console.log(signInResult[0]);
                var signedInUser = new FullUser(signInResult[0]);

                bcrypt.compare(
                  pass,
                  signInResult[0].password,
                  (error, compareResult) => {
                    if (!error) {
                      // incase the password is correct
                      if (compareResult) {
                        connection.query(
                          "SELECT `userToken` FROM `UsersToken` where `userId` = ? AND `userToken` = ?",
                          [user.userId, token],
                          (error, tokenResult, fields) => {
                            // check if the the user is signing in from  unresgistered device
                            if (tokenResult.length == 0) {
                              signedInUser.token = null;
                              signedInUser.signInMessage = "differentDevice";
                              signedInUser.signInState = false;
                              done(null, signedInUser);

                              // check if the the user is signing in from already resgistered device
                            } else {
                              signedInUser.token = tokenResult;
                              signedInUser.signInMessage = "Exists";
                              signedInUser.signInState = true;

                              done(null, signedInUser);
                            }
                          }
                        );
                        // incase the password is incorrect
                      } else {
                        signedInUser.token = null;
                        signedInUser.signInMessage = "incorrectPassword";
                        signedInUser.signInState = false;
                        done(null, signedInUser);
                      }
                    } else {
                      signedInUser.signInMessage = "errorInCheckingPassword";
                      signedInUser.signInState = false;
                      signedInUser.error = error;
                      done(null, signedInUser);
                    }
                  }
                );
              } else {
                user.signInMessage = "notExists";
                user.signInState = false;
                done(null, user);
              }
            } else {
              user.signInMessage = "notExists";
              user.signInState = false;
              done(null, user);
            }
          }
        );
      })
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.authenticate("local", (err, user, info) => {
      request.login(user, err => {
        if (!err && user.signInState) {
          console.log(user);
          fetchAuthorFollowed(connection, response, user);
        } else {
          response.json({
            user
          });
        }
      });
    })(request, response);
  });
  return router;
};

async function fetchAuthorFollowed(connection, response, user) {
  console.log(user.userId);
  await connection.query(
    "SELECT followed FROM Followers WHERE follower = ?",
    user.userId,
    (error, followedResult, fields) => {
      if (error) {
        console.log(error);
        return;
      }

      if (followedResult.length > 0) {
        user.followed = followedResult;
      }

      response.json({
        user
      });
    }
  );
}

module.exports = signInRoutes;
