const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require("passport");
const chatApp = require("./chat/chat.js");

app.use(bodyParser.json()); // accept JSON parms
app.use(bodyParser.urlencoded({ extended: false }));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// authentication modules
app.use("/signIn", require("./modules/modules.js").signIn);
app.use("/signUp", require("./modules/modules.js").signUp);

// book actions modules

// publishing a book
app.use("/publishABook", require("./modules/modules.js").publishABook);
app.use("/shareABook", require("./modules/modules.js").shareABook);
// on library books actions
app.use(
  "/fetchLibraryBooks",
  require("./modules/modules.js").fetchLibraryBooks
);
app.use("/addToLibrary", require("./modules/modules.js").addToLibrary);
// on books actions
app.use("/fetchAllBooks", require("./modules/modules.js").fetchAllBooks);
app.use(
  "/fetchSpcificBooksCategory",
  require("./modules/modules.js").fetchSpcificBooksCategory
);
// reviews actions
app.use("/addReview", require("./modules/modules.js").addReview);
app.use("/fetchReviews", require("./modules/modules.js").fetchReviews);
// drafted books actions
app.use("/addToDraft", require("./modules/modules.js").addToDraft);
app.use("/fetchDrafted", require("./modules/modules.js").fetchDrafted);
// for fetching shared posts and not shared posts
app.use("/fetchPosts", require("./modules/modules.js").fetchPosts);
// authors following
app.use("/fetchFollowers", require("./modules/modules.js").fetchFollowers);
app.use("/followAnAuthor", require("./modules/modules.js").followAnAuthor);
// on cart actions
app.use("/fetchCartItems", require("./modules/modules.js").fetchCartItems);
app.use("/addToCart", require("./modules/modules.js").addToCart);
// book details
app.use("/fetchBookDetails", require("./modules/modules.js").fetchBookDetails);
app.use("/fetchBookContent", require("./modules/modules.js").fetchBookContent);
// search for users or books
app.use("/search", require("./modules/modules.js").search);
// book details
app.use("/fetchContacts", require("./modules/modules.js").fetchContacts);
app.use("/fetchMessages", require("./modules/modules.js").fetchMessages);
// fetch notifications
app.use(
  "/fetchNotifications",
  require("./modules/modules.js").fetchNotifications
);
// fetch feedback Books
app.use("/fetchFeedback", require("./modules/modules.js").fetchFeedback);
// book details
app.use("/delete", require("./modules/modules.js").delete);
app.use("/update", require("./modules/modules.js").update);
// user profile details
app.use("/fetchProfileInfo", require("./modules/modules.js").fetchProfileInfo);
// insert new token
app.use("/insertNewToken", require("./modules/modules.js").insertNewToken);
// 
var port = process.env.port;
app.listen(port, () => {
  console.log("server running on " + port);
});
