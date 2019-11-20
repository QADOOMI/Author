const connection = require('./../database-connection/connection.js').connection;
const express = require('express');
const router = express.Router();

var addToDraftsRoute = function() {
  router.route('/').post(async (request, response) => {
    const book = new Book(request.body);

    const bookData = [book.bookId, book.bookCategory, book.title, book.bookCover, book.bookDescription, book.userId, book.price, book.introduction];
    await connection.query('INSERT INTO `Books`(`bookId`, `bookCategory`, `title`, `bookCover`, `bookDescription`, `userId`, `price`, `introduction`,`publishDate`) VALUES(?,?,?,?,?,?,?,?,NOW())', bookData, async (error, insertResult, fields) => {
      if (error) {
        response.json(false);
        console.log(error);
      }

      if (insertResult.affectedRows > 0) {
        addToDraft(connection, book, response);
      } else {
        response.json(true);
      }
    });
  });
  return router;
}

async function addToDraft(connection, bookData, response) {
  await connection.query('INSERT INTO `DraftedBooks`(`bookId`, `userId`) VALUES(?,?)', bookData, (error, insertResult, fields) => {
    if (error) {
      response.json(false);
      console.log(error);
    }

    if (insertResult.affectedRows > 0) {
      addBookContents(connection, bookData, )
    } else {
      response.json(true);
    }
  });
}

async function addBookContents(connection, book) {
  loop: for (var index in book.bookContents) {
    // iterate throgh the book content array and store each book content in the database.
    try {
      var bookContentResult = await connection.query('INSERT INTO `BooksContent`(`bookId`, `chapter`, `chapterTitle`, `chapterNumber`, `chapterId`) VALUES(?,?,?,?,?)', [book.bookId, book.bookContents[index].chapter, book.bookContents[index].chapterTitle, book.bookContents[index].chapterNumber, uuidv4()]);
      console.log('inside inserting book contents');

      if (bookContentResult.affectedRows === 0) {
        console.log('inside inserting book contents');

        response.json(
          false
        );
        break loop;
      }
      if (index == book.bookContents.length - 1) {
        console.log('inside inserting book contents');

        await connection.query('INSERT INTO `Posts`(`userId`, `bookId`, `isShared`) VALUES(?,?,?)', [book.userId, book.bookId, false], (error, postResult, fields) => {
          if (error) {
            response.json(
              true
            );

            throw error;
          }

          if (postResult.affectedRows > 0) {
            console.log('inserting post');

            response.json(
              true
            );
            // make a common channle id for eveyone who followed me
            // one follower have to has one common id to get notified by when any of the followed post or share
            pusher.trigger(book.userId, 'PostABook', book);
          } else {
            response.json(
              false
            );
          }
        });
      }
    } catch (error) {
      console.log('inside inserting book contents');

      response.json(
        false
      );
      break loop;

      throw error;
    }
  }
}


module.exports = addToDraftsRoute;
