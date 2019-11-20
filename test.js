var bcrypt = require("bcrypt");

bcrypt.hash("mostafabaron123@", 10, (error, encrypted) => {
  console.log(encrypted);
});
