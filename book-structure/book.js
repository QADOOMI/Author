const uuidv4 = require('uuid/v4');

function Book(bookJsonData) {
  this.bookId = uuidv4();
  this.bookCategory = bookJsonData.bookCategory;
  this.title = bookJsonData.title;
  this.bookCover = bookJsonData.bookCover;
  this.bookDescription = bookJsonData.bookDescription;
  this.userId = bookJsonData.userId;
  this.price = bookJsonData.price;
  this.introduction = bookJsonData.introduction;

  this.bookContents = bookJsonData.bookContents;
}

// for adding to library
function AddLibraryBook(bookId, userId) {
  this.bookId = bookId;
  this.userId = userId;
}

function BookContent(bookContentJsonData) {
  // iterate through array of book content store it in array
  this.chapter = bookContentJsonData.bookContent;
  this.chapterTitle = bookContentJsonData.bookTitle;
  this.chapterNumber = bookContentJsonData.chapterNumber;
  this.chapterId = uuidv4();
}

function BookMainItemArray(booksArray) {
  this.books = [];

  for (var i = 0; i < booksArray.length; i++) {
    this.books.push({
      bookId: booksArray[i].bookId,
      bookCategory: booksArray[i].bookCategory,
      title: booksArray[i].title,
      bookCover: booksArray[i].bookCover,
      bookDescription: booksArray[i].bookDescription,
      userId: booksArray[i].userId,
      price: booksArray[i].price,
      introduction: booksArray[i].introduction,

      userId: booksArray[i].userId,
      username: booksArray[i].username,
      password: booksArray[i].password,
      email: booksArray[i].email,
      birthday: booksArray[i].birthday,
      aboutMe: booksArray[i].aboutMe,
      facebookAccount: booksArray[i].facebookAccount,
      twitterAccount: booksArray[i].twitterAccount,
      linkedinAccount: booksArray[i].linkedInAccount,
      profileImage: booksArray[i].profileImage,
      token: booksArray[i].token,
      rateNumber: booksArray[i].rateNumber

    });
  }
}

function FeedbackBook(books) {
  this.books = [];

  for (var i = 0; i < books.length; i++) {
    this.books.push({
      bookId: books[i].bookId,
      bookCategory: books[i].bookCategory,
      title: books[i].title,
      bookCover: books[i].bookCover,
      bookDescription: books[i].bookDescription,
      userId: books[i].userId,
      price: books[i].price,
      publishDate: books[i].publishDate,
      sharedOrNot: books[i].sharedOrNot,
      username: books[i].username,
      profileImage: books[i].profileImage,
      bookMarked: books[i].bookMarked,
      isShared: books[i].isShared,
      bookReviews: null
    });
  }
}

function BookMainItem(bookContentJsonData) {
  this.bookId = bookContentJsonData.bookId;
  this.bookCategory = bookContentJsonData.bookCategory;
  this.title = bookContentJsonData.title;
  this.bookCover = bookContentJsonData.bookCover;
  this.bookDescription = bookContentJsonData.bookDescription;
  this.userId = bookContentJsonData.userId;
  this.price = bookContentJsonData.price;
  this.introduction = bookContentJsonData.introduction;

  this.userId = bookContentJsonData.userId;
  this.username = bookContentJsonData.username;
  this.password = bookContentJsonData.password;
  this.email = bookContentJsonData.email;
  this.birthday = bookContentJsonData.birthday;
  this.aboutMe = bookContentJsonData.aboutMe;
  this.facebookAccount = bookContentJsonData.facebookAccount;
  this.twitterAccount = bookContentJsonData.twitterAccount;
  this.linkedinAccount = bookContentJsonData.linkedInAccount;
  this.profileImage = bookContentJsonData.profileImage;
  this.token = bookContentJsonData.token;

  this.bookReviews = [];
}

function BookReview(reviewJson) {
  this.rateNumber = reviewJson.rateNumber;
  this.rateMessage = reviewJson.rateMessage;
}

exports.BookMainItemArray = BookMainItemArray;
exports.BookReview = BookReview;
exports.BookMainItem = BookMainItem;
exports.Book = Book;
exports.AddLibraryBook = AddLibraryBook;
exports.FeedbackBook = FeedbackBook;
