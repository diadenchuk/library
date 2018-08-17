const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRouter');

const adminRouter = express.Router();
const books = [
  {
    title: 'War and Peace',
    gender: 'Historical Fiction',
    author: 'Lev Tolstoy',
    read: false
  },
  {
    title: 'Les Miserable',
    gender: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
  }];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'libraryApp';
      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');
          const db = client.db(dbName);
          const response = await db.collection('books').insertMany(books);
          res.json(response);
        } catch (error) {
          debug(error);
        }

        client.close();
      }());
    });

  return adminRouter;
}

module.exports = router;
