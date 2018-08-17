const express = require('express');
// const sql = require('mssql');
const debug = require('debug')('app:bookRouter');
const { MongoClient } = require('mongodb');

const bookRouter = express.Router();

function router(nav) {
  // const books = [
  //   {
  //     title: 'War and Peace',
  //     gender: 'Historical Fiction',
  //     author: 'Lev Tolstoy',
  //     read: false
  //   },
  //   {
  //     title: 'Les Miserable',
  //     gender: 'Historical Fiction',
  //     author: 'Victor Hugo',
  //     read: false
  //   }];

  bookRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.find().toArray();
        res.render('books', {
          nav,
          title: 'library',
          books
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  });

  // bookRouter.route('/:id').get((req, res) => {
  //   const { id } = req.params;

  //   res.render('book', {
  //     nav,
  //     title: 'library',
  //     book: books[id]
  //   });
  // });

  return bookRouter;
}

module.exports = router;
