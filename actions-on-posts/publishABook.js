const connection = require('./../database-connection/connection.js').connection;
const Book = require('./../book-structure/book.js').Book;
const express = require('express');
const Promise = require('promise');
const uuidv4 = require('uuid/v4');
const router = express.Router();
const pusher = require('./../realtime-pusher/pusher.js').pusher;


var bookPublishRoute = function() {
  router.route('/').post((request, response) => {
    const book = new Book(request.body);
    const insertData = [book.bookId, book.bookCategory, book.title, book.bookCover, book.bookDescription, book.userId, book.price, book.introduction];
    connection.query('INSERT INTO `Books`(`bookId`, `bookCategory`, `title`, `bookCover`, `bookDescription`, `userId`, `price`, `introduction`,`publishDate`) VALUES(?,?,?,?,?,?,?,?,NOW())', insertData, (error, publishResult, fields) => {
      if (error) {
        response.json(false);

        console.log(error);
      }

      if (!publishResult) {
        response.json(false);
        console.log(error);
      }

      if (publishResult.affectedRows > 0) insertBookContents(response, book, connection);

    });
  });
  return router;
}

async function insertBookContents(response, book, connection) {
  loop: for (var index in book.bookContents) {
    // iterate throgh the book content array and store each book content in the database.
    try {
      var bookContentResult = await connection.query('INSERT INTO `BooksContent`(`bookId`, `chapter`, `chapterTitle`, `chapterNumber`, `chapterId`) VALUES(?,?,?,?,?)', [book.bookId, book.bookContents[index].chapter, book.bookContents[index].chapterTitle, book.bookContents[index].chapterNumber, uuidv4()]);
      console.log('inside inserting book contents');

      if (bookContentResult.affectedRows === 0) {
        console.log('inside inserting book contents');

        response.json(false);
        break loop;
      }
      if (index == book.bookContents.length - 1) {
        console.log('inside inserting book contents');

        await connection.query('INSERT INTO `Posts`(`userId`, `bookId`, `isShared`) VALUES(?,?,?)', [book.userId, book.bookId, false], (error, postResult, fields) => {
          if (error) {
            response.json(false);

            console.log(error);
          }

          if (postResult.affectedRows > 0) {
            console.log('inserting post');

            response.json(true);
            // make a common channle id for eveyone who followed me
            // one follower have to has one common id to get notified by when any of the followed post or share
            pusher.trigger(book.userId, 'PostABook', book);
          } else {
            response.json(false);
          }
        });
      }
    } catch (error) {
      console.log('inside inserting book contents');

      response.json(false);
      break loop;

      console.log(error);
    }
  }
}



module.exports = bookPublishRoute;
