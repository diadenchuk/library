const debug = require('debug')('app:bookController');
const { MongoClient } = require('mongodb');

function bookController(nav) {
  function getIndex(req, res) {
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
  }

  // function getById() {

  // }

  // authentication
  function middleware(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  }
  return {
    getIndex,
    middleware
  };
}

module.exports = bookController;
