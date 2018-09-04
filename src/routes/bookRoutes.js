const express = require('express');
// const sql = require('mssql');
// const debug = require('debug')('app:bookRouter');
// const { MongoClient } = require('mongodb');
const bookController = require('../controllers/bookController');


const bookRouter = express.Router();

function router(nav) {
  const { getIndex, middleware } = bookController(nav);

  bookRouter.use(middleware);

  bookRouter.route('/').get(getIndex);

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
