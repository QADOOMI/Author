const connection = require("./../database-connection/connection.js").connection;
const express = require("express");
const router = express.Router();
const util = require("util");
const BookMainItemArray = require("./../book-structure/book.js")
  .BookMainItemArray;
const async = require('async');

var fetchAllBooksRoute = function() {
  router.route("/").get((request, response) => {
    const fetchQuery =
      "SELECT b.bookId, b.title,b.bookDescription, b.bookCategory, b.bookCover, b.price, u.username, u.userId, br.rateNumber FROM Books AS b INNER JOIN (SELECT MAX(publishDate) AS publishDate, bookId AS bookId FROM Books WHERE bookCategory = ? GROUP BY bookId ORDER BY publishDate LIMIT 4) AS maxBooks ON b.publishDate = maxBooks.publishDate AND maxBooks.bookId = b.bookId INNER JOIN Users AS u ON u.userId = b.userId LEFT JOIN BooksReview AS br ON br.bookId = b.bookId ORDER BY b.bookCategory ASC";
    const booksCategories = [
      "IT (Information Technology)",
      "Medical",
      "Humor",
      "History",
      "Religious",
      "Engineering",
      "Physics",
      "Chemistry",
      "Biology",
      "Mathematics",
      "Poetry",
      "Science",
      "Food&Cooking",
      "Life Story",
      "Diary",
      "Action",
      "Science Fiction"
    ];

    var fetchedBooks = [];

    async.forEachOf(
      booksCategories,
      function(dataElement, i, inner_callback) {
        connection.query(
          fetchQuery,
          booksCategories[i],
          (error, mainPageBooks, fields) => {
            if (error) {
              response.json(error);
              console.error(error);
              inner_callback(error);
            }
  
            if (mainPageBooks.length > 0) {
              var mainBook = new BookMainItemArray(mainPageBooks);
              fetchedBooks.push(mainBook);
              inner_callback(null);
            }
          
            if(i == booksCategories.length - 1){
              fetchHighRatedBooks(connection, response, fetchedBooks);

            }

          }
        );
      },
      function(err) {
        if (err) {
          //handle the error if the query throws an error
          console.log(err);
        } else {
          console.log('Done With Iteration;');
          //whatever you wanna do after all the iterations are done
        }
      }
    );
  });
  return router;
};

async function fetchHighRatedBooks(connection, response, fetchedBooks) {
  await connection.query(
    "SELECT distinct b.bookId, b.bookCover FROM Books AS b INNER JOIN (SELECT MAX(rateNumber) AS rateNumber, bookId AS bookId FROM BooksReview GROUP BY bookId ORDER BY rateNumber ASC LIMIT 5) AS maxBooks ON b.bookId = maxBooks.bookId",
    (error, highRatedBooks, fields) => {
      if (error) console.log(error);

      if (highRatedBooks.length > 0) {
        response.json({
          fetchedBooks: fetchedBooks,
          highRatedBooks: highRatedBooks
        });
      } else {
        console.log(1 + " X " + highRatedBooks);
      }
    }
  );
}

module.exports = fetchAllBooksRoute;
