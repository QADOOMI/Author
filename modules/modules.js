// authentication
exports.signIn = require('./../authentication/signIn.js')();
exports.signUp = require('./../authentication/signUp.js')();
// actions on books
const authorLibrary = require('./../library-books/bookLibrary.js');
exports.fetchLibraryBooks = authorLibrary.fetchLibraryRoute();
exports.addToLibrary = authorLibrary.addToLibraryRoute();
// publish a book
exports.publishABook = require('./../actions-on-posts/publishABook.js')();
exports.shareABook = require('./../actions-on-posts/shareABook.js')();
// main pages actions
exports.fetchAllBooks = require('./../actions-on-posts/fetchAllBooks.js')();

const booksCategory = require('./../actions-on-posts/fetchSpecificCategory.js');
exports.fetchSpcificBooksCategory = booksCategory.fetchSpcificBooksCategoryRoute();
// books reviews
exports.addReview = require('./../books-reviews/addReview.js')();
exports.fetchReviews = require('./../books-reviews/fetchReviews.js')();
// drfted books
exports.addToDraft = require('./../drafted-books/addToDraft.js')();
exports.fetchDrafted = require('./../drafted-books/fetchDraftedBooks.js')();
// profile actions
exports.fetchPosts = require('./../profile/fetchPosts.js')();
exports.fetchFollowers = require('./../following/fetchFollowers.js')();
// following an author
exports.followAnAuthor = require('./../following/followAnAuthor.js')();
// on cart actions
exports.addToCart = require('./../shopping/addToCart.js')();
exports.fetchCartItems = require('./../shopping/fetchCartItems.js')();
// book content
const bookDetails = require('./../actions-on-posts/fetchBookDetails.js');
exports.fetchBookDetails = bookDetails.fetchBookDetailsRoute();
exports.fetchBookContent = bookDetails.fetchBookContentRoute();
// search for users or books
exports.search = require('./../search-for-all/search.js')();
// fetch all notificaton
exports.fetchNotifications = require('./../chat/fetchNotifications.js')();
// fetch all notificaton
exports.fetchContacts = require('./../chat/fetchContacts.js')();
exports.fetchMessages = require('./../chat/fetchMessages.js')();
// fetch books in feedback
exports.fetchFeedback = require('./../actions-on-posts/feedback.js')();
// update and delete routes
exports.update = require('./../update-data/update.js')();
exports.delete = require('./../delete-actions/delete.js')();
// fetch profile data
exports.fetchProfileInfo = require('./../profile/fetchProfileData.js')();
exports.fetchPosts = require('./../profile/fetchPosts.js')();
// incase existing user trys to sign in from different device
exports.insertNewToken = require('./../authentication/insertNewToken.js')();
